import { complementsArticles } from './complements'
import { inscriptionFraisArticles } from './inscriptionFrais'
import { repasHoraireArticles } from './repasHoraire'
import { santePolitiquesArticles } from './santePolitiques'
import type { KBSeedArticle } from './types'
import { vieGeneraleArticles } from './vieGenerale'

export type { KBSeedArticle } from './types'

/** The full knowledge base seeded for the assistant (~200 bilingual Q&As). */
export const kbSeedArticles: KBSeedArticle[] = [
  ...inscriptionFraisArticles,
  ...repasHoraireArticles,
  ...santePolitiquesArticles,
  ...vieGeneraleArticles,
  ...complementsArticles,
]
