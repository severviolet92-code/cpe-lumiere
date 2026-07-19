/**
 * Seed knowledge-base article: FR is canonical, EN mirrors it.
 * `answer` paragraphs are plain strings — the seed converts them to Lexical
 * rich text with rt(). `category` must match a kbCategoryDefs FR name.
 * All content is fictional demonstration material for « La Voie lactée ».
 */
export type KBSeedArticle = {
  category:
    | 'Inscription'
    | 'Frais et paiements'
    | 'Activités'
    | 'Repas'
    | 'Horaire'
    | 'Politiques'
    | 'Santé'
    | 'Événements'
    | 'Informations générales'
  audience: 'public' | 'portal'
  fr: { question: string; answer: string[]; keywords: string[] }
  en: { question: string; answer: string[]; keywords: string[] }
}
