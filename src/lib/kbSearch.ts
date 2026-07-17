/**
 * Keyword search engine for the parent assistant.
 * No AI: deterministic, accent-insensitive keyword matching with a bilingual
 * synonym map and transparent ranking. Runs in memory — a CPE knowledge base
 * is a few hundred articles at most, so a request-time scan stays instant.
 */

/** Lowercase, strip accents and punctuation. « Où sont les REÇUS? » → "ou sont les recus" */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, ' ')
    .replace(/[^a-z0-9\s-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Words too common to carry meaning — never scored. */
const STOPWORDS = new Set([
  // fr
  'le', 'la', 'les', 'un', 'une', 'des', 'du', 'de', 'a', 'au', 'aux', 'et', 'ou',
  'est', 'sont', 'je', 'tu', 'il', 'elle', 'on', 'nous', 'vous', 'ils', 'mon', 'ma',
  'mes', 'son', 'sa', 'ses', 'votre', 'vos', 'notre', 'nos', 'ce', 'cette', 'ces',
  'que', 'qui', 'quoi', 'dans', 'pour', 'par', 'pas', 'ne', 'se', 'en', 'y', 'd', 'l',
  'quand', 'comment', 'combien', 'quel', 'quelle', 'quels', 'quelles', 'faire', 'faut',
  // en
  'the', 'a', 'an', 'of', 'to', 'and', 'or', 'is', 'are', 'i', 'my', 'our', 'your',
  'in', 'for', 'on', 'at', 'do', 'does', 'can', 'what', 'when', 'how', 'much', 'many',
  'where', 'we', 'you', 'it', 'this', 'that', 'be', 'will', 'with',
])

/**
 * Bilingual synonym groups. Every variant is folded to the first (canonical)
 * term before scoring, so « prix » finds an article whose keyword is « frais »
 * and “fee” finds it too. Admin-entered keywords remain the primary signal;
 * this map is a safety net for common phrasings.
 */
const SYNONYM_GROUPS: string[][] = [
  ['frais', 'tarif', 'tarifs', 'prix', 'cout', 'couts', 'paiement', 'paiements', 'facture', 'contribution', 'fee', 'fees', 'cost', 'costs', 'price', 'payment', 'rate', 'recu', 'recus', 'receipt', 'receipts', 'impot', 'impots', 'tax', 'taxes', 'releve', 'releves'],
  ['inscription', 'inscrire', 'admission', 'place', 'places', 'attente', 'registration', 'register', 'enrol', 'enroll', 'enrolment', 'enrollment', 'waitlist', 'waiting'],
  ['repas', 'diner', 'dine', 'collation', 'collations', 'menu', 'menus', 'nourriture', 'manger', 'meal', 'meals', 'lunch', 'snack', 'snacks', 'food', 'eat'],
  ['allergie', 'allergies', 'allergique', 'intolerance', 'intolerances', 'allergy', 'allergic', 'epipen'],
  ['horaire', 'horaires', 'heures', 'heure', 'ouverture', 'fermeture', 'schedule', 'hours', 'opening', 'closing', 'time'],
  ['fermeture', 'fermetures', 'ferie', 'feries', 'conge', 'conges', 'vacances', 'closure', 'closures', 'holiday', 'holidays', 'closed', 'vacation'],
  ['maladie', 'malade', 'fievre', 'sante', 'medicament', 'medicaments', 'sick', 'sickness', 'illness', 'ill', 'fever', 'health', 'medication', 'medicine'],
  ['activite', 'activites', 'sortie', 'sorties', 'evenement', 'evenements', 'fete', 'fetes', 'calendrier', 'agenda', 'activity', 'activities', 'outing', 'outings', 'event', 'events', 'party', 'trip', 'calendar'],
  ['politique', 'politiques', 'reglement', 'reglements', 'regle', 'regles', 'policy', 'policies', 'rule', 'rules'],
  ['absence', 'absences', 'absent', 'retard', 'retards', 'late', 'lateness'],
  ['vetement', 'vetements', 'habits', 'habillement', 'clothing', 'clothes', 'dress'],
  ['sieste', 'siestes', 'dodo', 'sommeil', 'nap', 'naps', 'sleep', 'rest'],
  ['poupon', 'poupons', 'bebe', 'bebes', 'couche', 'couches', 'infant', 'infants', 'baby', 'babies', 'diaper', 'diapers'],
  ['parent', 'parents', 'famille', 'familles', 'family', 'families'],
  ['portail', 'compte', 'connexion', 'passe', 'portal', 'account', 'login', 'password'],
]

const SYNONYM_INDEX = new Map<string, string>()
for (const group of SYNONYM_GROUPS) {
  for (const term of group) SYNONYM_INDEX.set(term, group[0])
}

/** Fold a normalized word to its canonical synonym (or itself). */
export function canonical(word: string): string {
  return SYNONYM_INDEX.get(word) ?? word
}

export type TokenPair = { raw: string; canon: string }

/**
 * Normalize → split → drop stopwords. Each token keeps its raw form alongside
 * its canonical synonym, so an exact word match can outrank a synonym match.
 */
export function tokenize(text: string): TokenPair[] {
  return normalize(text)
    .split(/[\s-]+/)
    .filter((w) => w.length > 1 && !STOPWORDS.has(w))
    .map((raw) => ({ raw, canon: canonical(raw) }))
}

/** Extract plain text from a serialized Lexical tree (answers, for scoring only). */
export function lexicalPlainText(node: unknown): string {
  if (!node || typeof node !== 'object') return ''
  const record = node as { text?: string; children?: unknown[]; root?: unknown }
  if (record.root) return lexicalPlainText(record.root)
  const own = typeof record.text === 'string' ? record.text : ''
  const children = Array.isArray(record.children)
    ? record.children.map(lexicalPlainText).join(' ')
    : ''
  return [own, children].filter(Boolean).join(' ')
}

export type SearchableArticle = {
  id: number
  question: string
  keywords: string[]
  categoryName: string
  answerText: string
}

export type RankedResult = { id: number; score: number }

/** Does the query talk about events/outings? Drives the assistant's event chips. */
export function hasEventIntent(query: string): boolean {
  return tokenize(query).some((token) => token.canon === 'activite')
}

/** True when a document token matches a query token (exact, or prefix for longer words). */
function tokensMatch(docToken: string, queryToken: string): boolean {
  if (docToken === queryToken) return true
  if (queryToken.length >= 4 && docToken.startsWith(queryToken)) return true
  if (docToken.length >= 4 && queryToken.startsWith(docToken)) return true
  return false
}

const WEIGHT = { keyword: 6, question: 3, category: 2, answer: 1 } as const
/** A synonym-only match is worth less than the exact word the parent typed. */
const SYNONYM_FACTOR = 0.7

/**
 * Rank articles against a free-text query.
 * Score = field-weighted matches × query coverage, so an article matching every
 * word of the question outranks one matching a single word; admin keywords
 * outrank incidental mentions in an answer; and an exact word match outranks
 * a match found only through the synonym map.
 */
export function rankArticles(query: string, articles: SearchableArticle[]): RankedResult[] {
  const queryTokens = tokenize(query)
  if (queryTokens.length === 0) return []

  const results: RankedResult[] = []
  for (const article of articles) {
    const fields: { tokens: TokenPair[]; weight: number }[] = [
      { tokens: article.keywords.flatMap(tokenize), weight: WEIGHT.keyword },
      { tokens: tokenize(article.question), weight: WEIGHT.question },
      { tokens: tokenize(article.categoryName), weight: WEIGHT.category },
      { tokens: tokenize(article.answerText), weight: WEIGHT.answer },
    ]

    let score = 0
    let matched = 0
    for (const queryToken of queryTokens) {
      let best = 0
      for (const field of fields) {
        if (best >= field.weight) break // fields are ordered by weight
        if (field.tokens.some((docToken) => tokensMatch(docToken.raw, queryToken.raw))) {
          best = field.weight
        } else if (
          field.tokens.some((docToken) => tokensMatch(docToken.canon, queryToken.canon))
        ) {
          best = Math.max(best, field.weight * SYNONYM_FACTOR)
        }
      }
      if (best > 0) {
        matched += 1
        score += best
      }
    }

    if (matched > 0) {
      results.push({ id: article.id, score: score * (matched / queryTokens.length) })
    }
  }

  return results.sort((a, b) => b.score - a.score)
}
