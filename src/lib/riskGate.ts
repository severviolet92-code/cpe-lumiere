import { normalize } from './kbSearch'

/**
 * High-risk topic gate for the parent assistant (architecture rule: the
 * assistant never invents information AND never lets a plausible-looking
 * FAQ match stand in for a human on topics where being wrong is dangerous).
 * Checked on accent-stripped, lowercased text BEFORE retrieval runs — a
 * match short-circuits straight to a fixed redirect, regardless of whether
 * some article might otherwise seem to answer it.
 */
export type RiskCategory =
  | 'medication'
  | 'injury'
  | 'legal'
  | 'complaint'
  | 'pickup-authorization'
  | 'abuse'
  | 'emergency'

const PATTERNS: Record<RiskCategory, RegExp> = {
  medication: /\b(medicament|medication|posologie|dosage|dose|pilule|pill|antibiotique|antibiotic|ordonnance|prescription|epipen|overdose|surdose)\b/,
  injury: /\b(blessure|blesse|injury|injured|fracture|broke|broken|saignement|bleeding|commotion|concussion|hopital|hospital|urgence medicale|ambulance)\b/,
  legal: /\b(garde partagee|garde exclusive|custody|divorce|separation|avocat|lawyer|tribunal|court|ordonnance de la cour|court order|dpj|youth protection)\b/,
  complaint: /\b(plainte|complaint|poursuite|lawsuit|sue|maltraitance|negligence|inconduite|misconduct|renvoyer un employe|fire an employee)\b/,
  'pickup-authorization': /\b(qui peut venir chercher|who can pick up|personne non autorisee|unauthorized person|retirer la garde|remove custody|enlever mon enfant|take my child)\b/,
  abuse: /\b(abus|abuse|maltraite|mistreat|neglige|neglect|violence|agression|assault)\b/,
  emergency: /\b(urgence|emergency|danger immediat|immediate danger|au secours|help now|appel au 911|call 911)\b/,
}

export function detectRiskCategory(query: string): RiskCategory | null {
  const text = normalize(query)
  for (const [category, pattern] of Object.entries(PATTERNS) as [RiskCategory, RegExp][]) {
    if (pattern.test(text)) return category
  }
  return null
}

export const GATED_MESSAGE = {
  fr: 'Cette question touche un sujet qui exige l’attention directe de l’équipe du CPE (santé, sécurité, situation légale ou familiale). Je ne peux pas y répondre de façon fiable. Communiquez directement avec l’administration — c’est plus sûr pour vous et pour votre enfant.',
  en: 'This question touches on a topic that needs the direct attention of the CPE team (health, safety, or a legal or family situation). I can’t answer it reliably. Please contact the administration directly — it’s safer for you and your child.',
} as const
