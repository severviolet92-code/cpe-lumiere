/**
 * Demo seed — the real CPE is named « La Voie lactée », but EVERYTHING else here
 * is FICTIONAL demonstration content: no real address, phone, email, staff,
 * policy, child, or parent is referenced. Placeholders are clearly labelled and
 * will be replaced by the director's verified information after approval.
 * Every document is flagged `demoSeed: true`; remove with `npm run seed:clear`.
 */
import 'dotenv/config'
import { getPayload, type Payload } from 'payload'

import config from '../payload.config'
import { makeDemoPdf } from './demoPdf'
import { renderIllustration, renderPortrait } from './illustrations'
import { kbSeedArticles } from './kb'
import { rt } from './richText'

const DEMO_DIRECTOR_EMAIL = 'direction@voielactee-demo.example'
const DEMO_DIRECTOR_PASSWORD = 'Lumiere-Demo-2026!'
const DEMO_PARENT_A_EMAIL = 'famille.tremblay@voielactee-demo.example' // groupe : Les Papillons
const DEMO_PARENT_B_EMAIL = 'famille.nguyen@voielactee-demo.example' // groupes : Les Poussins + Les Explorateurs
const DEMO_PARENT_PASSWORD = 'Parent-Demo-2026!'

const day = (offset: number) => new Date(Date.now() + offset * 86400000).toISOString().slice(0, 10)

async function uploadIllustration(
  payload: Payload,
  theme: string,
  altFr: string,
  altEn: string,
): Promise<number> {
  const data = await renderIllustration(theme)
  const doc = await payload.create({
    collection: 'media',
    locale: 'fr',
    data: { alt: altFr, demoSeed: true },
    file: { data, mimetype: 'image/png', name: `demo-${theme}.png`, size: data.length },
  })
  await payload.update({ collection: 'media', id: doc.id, locale: 'en', data: { alt: altEn } })
  return doc.id as number
}

async function uploadPortrait(payload: Payload, index: number, name: string): Promise<number> {
  const data = await renderPortrait(index)
  const doc = await payload.create({
    collection: 'media',
    locale: 'fr',
    data: { alt: `Avatar illustré — ${name}`, demoSeed: true },
    file: { data, mimetype: 'image/png', name: `demo-portrait-${index}.png`, size: data.length },
  })
  await payload.update({
    collection: 'media',
    id: doc.id,
    locale: 'en',
    data: { alt: `Illustrated avatar — ${name}` },
  })
  return doc.id as number
}

async function run() {
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'groups',
    where: { demoSeed: { equals: true } },
    limit: 1,
  })
  if (existing.docs.length > 0) {
    console.log('Demo seed already present — run `npm run seed:clear` first to re-seed.')
    process.exit(0)
  }

  console.log('Seeding fictional demo content for « La Voie lactée »…')

  // ---- Demo admin account (director role) ----
  const users = await payload.find({
    collection: 'users',
    where: { email: { equals: DEMO_DIRECTOR_EMAIL } },
    limit: 1,
  })
  if (users.docs.length === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: DEMO_DIRECTOR_EMAIL,
        password: DEMO_DIRECTOR_PASSWORD,
        name: 'Direction (démo)',
        role: 'director',
      },
    })
  }

  // ---- Groups: 6 months to 5 years ----
  const groupDefs = [
    {
      fr: {
        name: 'Les Poussins',
        ageRange: '6 à 18 mois',
        description:
          'La pouponnière : un cocon calme où chaque bébé garde son propre rythme de boires, de siestes et de découvertes sensorielles, avec une éducatrice pour cinq poupons.',
      },
      en: {
        name: 'Les Poussins',
        ageRange: '6 to 18 months',
        description:
          'The infant room: a calm cocoon where each baby keeps their own rhythm of feeds, naps and sensory discoveries, with one educator for five infants.',
      },
      color: 'miel',
    },
    {
      fr: {
        name: 'Les Lapinots',
        ageRange: '18 mois à 2 ans',
        description:
          'L’âge des premiers pas assurés et des premiers mots : on grimpe, on transvide, on imite — et on apprend à vivre ensemble, un « à ton tour » à la fois.',
      },
      en: {
        name: 'Les Lapinots',
        ageRange: '18 months to 2 years',
        description:
          'The age of confident first steps and first words: climbing, pouring, imitating — and learning to live together, one “your turn” at a time.',
      },
      color: 'ciel',
    },
    {
      fr: {
        name: 'Les Papillons',
        ageRange: '2 à 3 ans',
        description:
          'Le grand bond du langage et de l’imaginaire : jeux symboliques, comptines, premiers ateliers de peinture et apprentissage de la propreté, chacun à son rythme.',
      },
      en: {
        name: 'Les Papillons',
        ageRange: '2 to 3 years',
        description:
          'The great leap of language and imagination: pretend play, rhymes, first painting workshops and toilet learning, each at their own pace.',
      },
      color: 'lavande',
    },
    {
      fr: {
        name: 'Les Renardeaux',
        ageRange: '3 à 4 ans',
        description:
          'Curieux et débordants d’énergie : projets de groupe, jeux coopératifs, sciences pour tout-petits et grandes explorations dans la cour et le quartier.',
      },
      en: {
        name: 'Les Renardeaux',
        ageRange: '3 to 4 years',
        description:
          'Curious and bursting with energy: group projects, cooperative games, toddler science and big explorations in the yard and neighbourhood.',
      },
      color: 'terracotta',
    },
    {
      fr: {
        name: 'Les Explorateurs',
        ageRange: '4 à 5 ans',
        description:
          'La dernière année avant la maternelle : autonomie, responsabilités, jeux de règles, motricité fine — tout ce qu’il faut pour partir vers l’école la tête haute.',
      },
      en: {
        name: 'Les Explorateurs',
        ageRange: '4 to 5 years',
        description:
          'The last year before kindergarten: autonomy, responsibilities, rule games, fine motor skills — everything needed to head off to school standing tall.',
      },
      color: 'sauge',
    },
  ] as const

  const groupIds: number[] = []
  for (const [i, g] of groupDefs.entries()) {
    const doc = await payload.create({
      collection: 'groups',
      locale: 'fr',
      data: { ...g.fr, color: g.color, order: i, active: true, demoSeed: true },
    })
    await payload.update({ collection: 'groups', id: doc.id, locale: 'en', data: g.en })
    groupIds.push(doc.id as number)
  }
  const [poussins, lapinots, papillons, renardeaux, explorateurs] = groupIds

  // ---- Site settings (name is real; every coordinate is a labelled placeholder) ----
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'fr',
    data: {
      cpeName: 'CPE La Voie lactée',
      tagline: 'Un petit monde chaleureux où chaque enfant brille à sa façon.',
      phone: '418 555-0123 (démo)',
      email: 'bonjour@voielactee-demo.example',
      address: '123, rue de la Démonstration (adresse fictive)\nQuébec (Québec)  G0X 0X0',
      hours: 'Lundi au vendredi, de 7 h à 18 h (horaire de démonstration)',
      permitNote:
        'Site de démonstration — les coordonnées et politiques affichées sont fictives et seront remplacées par les informations vérifiées du CPE.',
    },
  })
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'en',
    data: {
      tagline: 'A warm little world where every child shines in their own way.',
      hours: 'Monday to Friday, 7 a.m. to 6 p.m. (demonstration hours)',
      permitNote:
        'Demonstration site — the contact details and policies shown are fictional and will be replaced with the CPE’s verified information.',
    },
  })

  // ---- Home page ----
  await payload.updateGlobal({
    slug: 'home-page',
    locale: 'fr',
    data: {
      heroTitle: 'Grandir ici, entouré de lumière.',
      heroSubtitle:
        'Au CPE La Voie lactée, chaque enfant de 6 mois à 5 ans découvre, joue et s’épanouit à son rythme — dans la confiance et la douceur.',
      introTitle: 'Un milieu de vie pensé pour les tout-petits',
      introText:
        'Des éducatrices attentives, des locaux baignés de lumière et des journées riches en découvertes : voici ce qui attend votre enfant, semaine après semaine.',
      highlights: [
        {
          title: 'Des liens qui rassurent',
          text: 'Chaque enfant est accueilli par une éducatrice de référence qui connaît son rythme, ses habitudes et ses petites victoires.',
        },
        {
          title: 'Jouer, c’est apprendre',
          text: 'Notre programme éducatif s’appuie sur le jeu libre et l’exploration — la façon la plus naturelle de grandir avant 5 ans.',
        },
        {
          title: 'Des repas cuisinés sur place',
          text: 'Une cuisine maison, des menus équilibrés et une attention réelle portée aux allergies de chacun.',
        },
      ],
    },
  })
  await payload.updateGlobal({
    slug: 'home-page',
    locale: 'en',
    data: {
      heroTitle: 'Growing up here, surrounded by light.',
      heroSubtitle:
        'At CPE La Voie lactée, every child from 6 months to 5 years discovers, plays and blossoms at their own pace — with confidence and gentleness.',
      introTitle: 'A living environment designed for little ones',
      introText:
        'Attentive educators, light-filled rooms and weeks full of discoveries: this is what awaits your child.',
      highlights: [
        {
          title: 'Bonds that reassure',
          text: 'Each child is welcomed by a reference educator who knows their rhythm, their habits and their little victories.',
        },
        {
          title: 'Playing is learning',
          text: 'Our educational program is built on free play and exploration — the most natural way to grow before age 5.',
        },
        {
          title: 'Meals cooked on site',
          text: 'Home-style cooking, balanced menus, and genuine attention to each child’s allergies.',
        },
      ],
    },
  })

  // ---- About page ----
  await payload.updateGlobal({
    slug: 'about-page',
    locale: 'fr',
    data: {
      intro:
        'Le CPE La Voie lactée accueille des enfants de 6 mois à 5 ans dans un milieu lumineux, à échelle d’enfant, où chaque espace a été pensé pour la découverte. (Description de démonstration.)',
      mission:
        'Offrir à chaque enfant un milieu de vie chaleureux, sécuritaire et stimulant, où il grandit à son rythme, entouré d’adultes stables qui croient en lui — et offrir à chaque famille un partenaire de confiance, jour après jour.',
      history: rt(
        'Le CPE La Voie lactée est né du rêve d’un groupe de parents du quartier : un milieu de garde à échelle humaine, où la douceur compte autant que la pédagogie. (Récit fictif de démonstration.)',
        'Depuis, la petite équipe fondatrice est devenue une équipe stable d’une quinzaine de personnes, la cour s’est enrichie d’un potager et de grands modules de bois, et des centaines d’enfants ont fait ici leurs premiers pas, leurs premières amitiés et leurs premiers « moi capable ! ».',
        'Le CPE demeure ce qu’il était au premier jour : un organisme sans but lucratif gouverné par les parents, enraciné dans son quartier.',
      ),
      pedagogy: rt(
        'Notre approche s’inspire du programme éducatif « Accueillir la petite enfance » du ministère de la Famille. L’enfant est l’acteur principal de son développement : nous préparons un environnement riche, puis nous l’accompagnons dans ses explorations plutôt que de les diriger.',
        'Chaque groupe suit le rythme de ses enfants — les poupons ont leurs propres routines de sommeil et de repas, et les plus grands construisent doucement leur autonomie en vue de la maternelle.',
      ),
      values: [
        { title: 'La douceur', text: 'Un climat calme et prévisible, où l’on prend le temps.' },
        { title: 'Le respect du rythme', text: 'Chaque enfant grandit à sa façon — nous nous adaptons à lui, pas l’inverse.' },
        { title: 'La curiosité', text: 'Des invitations à explorer, dedans comme dehors, à chaque saison.' },
        { title: 'La collaboration avec les familles', text: 'Les parents sont nos premiers partenaires, chaque jour.' },
      ],
      facilities: rt(
        'Des locaux lumineux adaptés à chaque groupe d’âge, une salle de motricité, une cuisine sur place et une cour extérieure ombragée avec espaces distincts pour les poupons et les plus grands. (Description de démonstration.)',
      ),
    },
  })
  await payload.updateGlobal({
    slug: 'about-page',
    locale: 'en',
    data: {
      intro:
        'CPE La Voie lactée welcomes children aged 6 months to 5 years in a bright, child-scaled environment where every space was designed for discovery. (Demonstration description.)',
      mission:
        'To offer every child a warm, safe and stimulating living environment where they grow at their own pace, surrounded by stable adults who believe in them — and to offer every family a trusted partner, day after day.',
      history: rt(
        'CPE La Voie lactée was born from the dream of a group of neighbourhood parents: a human-scale childcare setting where gentleness matters as much as pedagogy. (Fictional demonstration story.)',
        'Since then, the small founding team has grown into a stable team of about fifteen people, the yard has gained a vegetable garden and big wooden structures, and hundreds of children have taken their first steps, made their first friendships and shouted their first “I did it!” here.',
        'The CPE remains what it was on day one: a non-profit governed by parents, rooted in its neighbourhood.',
      ),
      pedagogy: rt(
        'Our approach is inspired by the ministère de la Famille’s educational program “Accueillir la petite enfance”. The child is the main actor of their own development: we prepare a rich environment, then accompany their explorations rather than directing them.',
        'Each group follows its children’s rhythm — infants keep their own sleep and meal routines, while the older ones gently build the autonomy they will need for kindergarten.',
      ),
      values: [
        { title: 'Gentleness', text: 'A calm, predictable climate where we take our time.' },
        { title: 'Respect for each rhythm', text: 'Every child grows in their own way — we adapt to them, not the other way around.' },
        { title: 'Curiosity', text: 'Invitations to explore, indoors and out, in every season.' },
        { title: 'Partnership with families', text: 'Parents are our first partners, every single day.' },
      ],
      facilities: rt(
        'Bright rooms adapted to each age group, a motor-skills room, an on-site kitchen, and a shaded outdoor yard with separate areas for infants and older children. (Demonstration description.)',
      ),
    },
  })

  // ---- Life page ----
  await payload.updateGlobal({
    slug: 'life-page',
    locale: 'fr',
    data: {
      intro:
        'Une journée à La Voie lactée suit un rythme régulier et rassurant, ajusté à chaque groupe d’âge — voici à quoi elle ressemble pour les plus grands. (Horaire de démonstration.)',
      dailySchedule: [
        { time: '7 h', moment: 'Accueil en douceur et jeux calmes' },
        { time: '8 h 30', moment: 'Collation et causerie du matin' },
        { time: '9 h', moment: 'Ateliers, jeu libre et exploration' },
        { time: '10 h 30', moment: 'Jeux extérieurs, beau temps comme neige' },
        { time: '11 h 30', moment: 'Dîner cuisiné sur place' },
        { time: '12 h 45', moment: 'Sieste et repos, chacun son rythme' },
        { time: '15 h', moment: 'Collation de l’après-midi' },
        { time: '15 h 30', moment: 'Jeux libres et retour au calme' },
        { time: '17 h', moment: 'Départs et au revoir' },
      ],
      groupsIntro:
        'Cinq groupes, un par étape : chaque local, chaque routine et chaque activité est pensé pour l’âge des enfants qui y vivent.',
      development: rt(
        'Nous suivons le programme éducatif « Accueillir la petite enfance » : l’enfant apprend par le jeu, dans tous les domaines à la fois — physique et moteur, cognitif, langagier, social et affectif.',
        'Concrètement : la motricité fine se construit dans la pâte à modeler et les perles, le langage dans les histoires et les causeries, les mathématiques dans les blocs et les recettes, et la confiance en soi dans chaque « moi capable ! » entendu et encouragé.',
        'Deux fois par année, le dossier éducatif de votre enfant vous présente un portrait de son développement, appuyé sur les observations quotidiennes de son éducatrice.',
      ),
      meals: rt(
        'Tous les repas et collations sont préparés sur place. Les menus, affichés chaque semaine, suivent le Guide alimentaire canadien et sont adaptés aux allergies et intolérances de chaque enfant.',
        'Les poupons suivent leur propre horaire de boires et de purées, en continuité avec les habitudes de la maison.',
      ),
      naps: rt(
        'Après le dîner, chaque groupe retrouve son dortoir : lumière tamisée, musique douce, doudous. Les enfants qui ne dorment plus se reposent avec des livres après 45 minutes — le repos est un besoin, le sommeil n’est jamais forcé.',
        'À la pouponnière, chaque bébé dort selon son propre horaire, sur le dos, dans son lit individuel, selon les pratiques de sommeil sécuritaire.',
      ),
      outdoor: rt(
        'Dehors deux fois par jour, en toute saison : la cour clôturée offre des zones distinctes pour les poupons et les grands, un potager, des modules de bois et de l’ombre pour l’été.',
        'L’hiver ne nous arrête pas — glissade, châteaux de neige et peinture sur neige remplacent le carré de sable. Seules les conditions extrêmes nous gardent à l’intérieur, où la salle de motricité prend le relais.',
      ),
      activities: rt(
        'Peinture, bacs sensoriels, musique, yoga des petits, jardinage dans la cour et grandes marches d’exploration : nos activités varient au fil des saisons et suivent les intérêts des enfants.',
        'Chaque semaine comprend aussi des moments de psychomotricité en salle de motricité, pour bouger, grimper et sauter en toute sécurité.',
      ),
      safety: rt(
        'Portes verrouillées avec code d’accès familial, cour conforme et inspectée, exercices d’évacuation réguliers, personnel entièrement certifié en premiers soins et vérification d’absence d’empêchement pour chaque adulte du milieu.',
        'Les ratios réglementaires sont respectés en tout temps, y compris pendant les sorties, où ils sont volontairement renforcés. En cas d’incident, même mineur, vous êtes informés le jour même.',
      ),
    },
  })
  await payload.updateGlobal({
    slug: 'life-page',
    locale: 'en',
    data: {
      intro:
        'A day at La Voie lactée follows a steady, reassuring rhythm, adjusted for each age group — here is what it looks like for the older children. (Demonstration schedule.)',
      dailySchedule: [
        { time: '7 a.m.', moment: 'Gentle arrival and quiet play' },
        { time: '8:30', moment: 'Snack and morning circle' },
        { time: '9 a.m.', moment: 'Workshops, free play and exploration' },
        { time: '10:30', moment: 'Outdoor play, sunshine or snow' },
        { time: '11:30', moment: 'Lunch cooked on site' },
        { time: '12:45', moment: 'Nap and rest, each at their own pace' },
        { time: '3 p.m.', moment: 'Afternoon snack' },
        { time: '3:30', moment: 'Free play and winding down' },
        { time: '5 p.m.', moment: 'Departures and goodbyes' },
      ],
      groupsIntro:
        'Five groups, one per stage: every room, routine and activity is designed for the age of the children living there.',
      development: rt(
        'We follow the educational program “Accueillir la petite enfance”: children learn through play, across every domain at once — physical and motor, cognitive, language, social and emotional.',
        'Concretely: fine motor skills grow in playdough and beads, language in stories and circle time, mathematics in blocks and recipes, and self-confidence in every encouraged “I did it!”.',
        'Twice a year, your child’s educational file gives you a portrait of their development, grounded in their educator’s daily observations.',
      ),
      meals: rt(
        'All meals and snacks are prepared on site. Weekly menus follow Canada’s Food Guide and are adapted to each child’s allergies and intolerances.',
        'Infants keep their own schedule of bottles and purées, in continuity with home routines.',
      ),
      naps: rt(
        'After lunch, each group settles into its rest area: dimmed lights, soft music, comfort blankets. Children who no longer sleep rest with books after 45 minutes — rest is a need, sleep is never forced.',
        'In the infant room, each baby sleeps on their own schedule, on their back, in their individual crib, following safe-sleep practices.',
      ),
      outdoor: rt(
        'Outside twice a day, in every season: the fenced yard has separate areas for infants and older children, a vegetable garden, wooden structures and summer shade.',
        'Winter does not stop us — sliding, snow castles and snow painting replace the sandbox. Only extreme conditions keep us inside, where the motor-skills room takes over.',
      ),
      activities: rt(
        'Painting, sensory bins, music, toddler yoga, gardening in the yard and long exploration walks: our activities change with the seasons and follow the children’s interests.',
        'Every week also includes gross-motor time in the motor-skills room — moving, climbing and jumping safely.',
      ),
      safety: rt(
        'Doors locked with a family access code, a compliant and inspected yard, regular evacuation drills, fully first-aid-certified staff and a background check for every adult in the building.',
        'Regulatory ratios are respected at all times, including on outings, where they are deliberately reinforced. In case of any incident, even minor, you are informed the same day.',
      ),
    },
  })

  // ---- Admission page ----
  await payload.updateGlobal({
    slug: 'admission-page',
    locale: 'fr',
    data: {
      intro: rt(
        'Comme tous les CPE du Québec, La Voie lactée accueille les enfants à partir du guichet unique La Place 0-5. Voici comment cela fonctionne, sans mystère.',
      ),
      steps: [
        {
          title: 'Inscrivez votre enfant sur La Place 0-5',
          text: 'L’inscription au guichet unique est gratuite et peut se faire dès la grossesse. Sélectionnez les installations qui vous conviennent, dont le CPE La Voie lactée.',
        },
        {
          title: 'Nous vous contactons quand une place se libère',
          text: 'Les places sont offertes selon la liste du guichet et notre politique d’admission. Nous vous joignons directement — inutile de nous relancer.',
        },
        {
          title: 'Visite et rencontre',
          text: 'Avant l’entrée, vous visitez le CPE, rencontrez l’équipe et remplissez le dossier de votre enfant ensemble.',
        },
        {
          title: 'Intégration progressive',
          text: 'Les premiers jours se font en douceur, avec des présences courtes qui s’allongent selon le rythme de votre enfant.',
        },
      ],
      laPlaceUrl: 'https://www.laplace0-5.com',
      note: 'La contribution parentale est le tarif réduit fixé par le gouvernement du Québec.',
    },
  })
  await payload.updateGlobal({
    slug: 'admission-page',
    locale: 'en',
    data: {
      intro: rt(
        'Like every CPE in Québec, La Voie lactée admits children through the single waiting list La Place 0-5. Here is how it works — no mystery.',
      ),
      steps: [
        {
          title: 'Register your child on La Place 0-5',
          text: 'Registration on the single waiting list is free and can be done as early as pregnancy. Select the facilities that suit you, including CPE La Voie lactée.',
        },
        {
          title: 'We contact you when a spot opens',
          text: 'Spots are offered according to the waiting list and our admission policy. We reach out to you directly — no need to follow up.',
        },
        {
          title: 'Visit and meeting',
          text: 'Before the first day, you visit the CPE, meet the team, and complete your child’s file together.',
        },
        {
          title: 'Gradual integration',
          text: 'The first days are gentle, with short visits that lengthen at your child’s pace.',
        },
      ],
      note: 'The parental contribution is the reduced rate set by the Québec government.',
    },
  })

  // ---- Careers page ----
  await payload.updateGlobal({
    slug: 'careers-page',
    locale: 'fr',
    data: {
      intro: rt(
        'Travailler à La Voie lactée, c’est rejoindre une petite équipe stable qui se soutient, dans un milieu où la qualité passe avant la cadence. Nous cherchons des personnes qui aiment profondément la petite enfance — et nous prenons soin d’elles. (Contenu de démonstration.)',
      ),
      perks: [
        { text: 'Salaire selon l’échelle du réseau des CPE' },
        { text: 'Régime de retraite et assurances collectives' },
        { text: 'Ratio respecté, remplacements planifiés' },
        { text: 'Budget annuel de formation continue' },
        { text: 'Équipe stable et direction à l’écoute' },
      ],
    },
  })
  await payload.updateGlobal({
    slug: 'careers-page',
    locale: 'en',
    data: {
      intro: rt(
        'Working at La Voie lactée means joining a small, stable team that supports one another, in a place where quality comes before speed. We look for people who deeply love early childhood — and we take care of them. (Demonstration content.)',
      ),
      perks: [
        { text: 'Salary on the CPE network scale' },
        { text: 'Pension plan and group insurance' },
        { text: 'Respected ratios, planned substitutions' },
        { text: 'Annual continuing-education budget' },
        { text: 'Stable team and a director who listens' },
      ],
    },
  })

  // ---- FAQ ----
  const faqs = [
    {
      category: 'admission',
      audience: 'public',
      fr: {
        question: 'Comment inscrire mon enfant au CPE ?',
        answer: rt(
          'Toutes les admissions passent par le guichet unique La Place 0-5 (laplace0-5.com). Inscrivez-y votre enfant gratuitement et sélectionnez le CPE La Voie lactée ; nous vous contactons directement lorsqu’une place correspondant à son âge se libère.',
        ),
      },
      en: {
        question: 'How do I register my child at the CPE?',
        answer: rt(
          'All admissions go through the single waiting list La Place 0-5 (laplace0-5.com). Register your child there for free and select CPE La Voie lactée; we contact you directly when a spot matching their age opens.',
        ),
      },
    },
    {
      category: 'admission',
      audience: 'public',
      fr: {
        question: 'À partir de quel âge accueillez-vous les enfants ?',
        answer: rt('Nous accueillons les enfants de 6 mois jusqu’à leur entrée à la maternelle, vers 5 ans.'),
      },
      en: {
        question: 'From what age do you welcome children?',
        answer: rt('We welcome children from 6 months old until they start kindergarten, around age 5.'),
      },
    },
    {
      category: 'quotidien',
      audience: 'public',
      fr: {
        question: 'Que dois-je apporter chaque jour ?',
        answer: rt(
          'Des vêtements de rechange identifiés, des couches si votre enfant en porte, sa doudou ou son toutou pour la sieste, et des vêtements adaptés à la météo — nous sortons dehors tous les jours ou presque.',
        ),
      },
      en: {
        question: 'What should I bring every day?',
        answer: rt(
          'Labelled spare clothes, diapers if your child wears them, their comfort blanket or plush for nap time, and weather-appropriate clothing — we go outside nearly every day.',
        ),
      },
    },
    {
      category: 'quotidien',
      audience: 'public',
      fr: {
        question: 'Quelles sont vos heures d’ouverture ?',
        answer: rt('Le CPE est ouvert du lundi au vendredi, de 7 h à 18 h. (Horaire de démonstration.)'),
      },
      en: {
        question: 'What are your opening hours?',
        answer: rt('The CPE is open Monday to Friday, 7 a.m. to 6 p.m. (Demonstration hours.)'),
      },
    },
    {
      category: 'sante',
      audience: 'public',
      fr: {
        question: 'Que se passe-t-il si mon enfant est malade ?',
        answer: rt(
          'Pour protéger tous les enfants, un enfant fiévreux ou contagieux doit rester à la maison. Si des symptômes apparaissent pendant la journée, nous vous appelons pour venir le chercher. Notre politique complète est remise à l’inscription.',
        ),
      },
      en: {
        question: 'What happens if my child is sick?',
        answer: rt(
          'To protect all the children, a child with a fever or a contagious illness must stay home. If symptoms appear during the day, we call you to pick them up. Our full policy is provided at registration.',
        ),
      },
    },
    {
      category: 'alimentation',
      audience: 'public',
      fr: {
        question: 'Les repas sont-ils fournis ? Gérez-vous les allergies ?',
        answer: rt(
          'Oui — le dîner et deux collations sont cuisinés sur place chaque jour. Les allergies et intolérances sont consignées au dossier de l’enfant et affichées en cuisine ; les menus sont adaptés en conséquence.',
        ),
      },
      en: {
        question: 'Are meals provided? How do you handle allergies?',
        answer: rt(
          'Yes — lunch and two snacks are cooked on site daily. Allergies and intolerances are recorded in the child’s file and posted in the kitchen; menus are adapted accordingly.',
        ),
      },
    },
    {
      category: 'general',
      audience: 'public',
      fr: {
        question: 'Quel est le tarif ?',
        answer: rt(
          'Le CPE offre des places à contribution réduite : le tarif quotidien est fixé par le gouvernement du Québec et indexé chaque année.',
        ),
      },
      en: {
        question: 'What does it cost?',
        answer: rt(
          'The CPE offers reduced-contribution spots: the daily rate is set by the Québec government and indexed every year.',
        ),
      },
    },
    {
      category: 'general',
      audience: 'public',
      fr: {
        question: 'Publiez-vous des photos des enfants ?',
        answer: rt(
          'Jamais sur le site public. Le partage de photos avec les parents, s’il a lieu, se fait uniquement avec le consentement écrit des parents et par des canaux privés et sécurisés.',
        ),
      },
      en: {
        question: 'Do you publish photos of the children?',
        answer: rt(
          'Never on the public website. If photos are shared with parents at all, it is only with written parental consent and through private, secure channels.',
        ),
      },
    },
    {
      category: 'quotidien',
      audience: 'portal',
      fr: {
        question: 'Comment signaler une absence ?',
        answer: rt(
          'Téléphonez-nous ou écrivez-nous avant 9 h le matin même. Pour une absence prolongée (vacances, maladie), prévenez l’éducatrice de votre groupe dès que possible.',
        ),
      },
      en: {
        question: 'How do I report an absence?',
        answer: rt(
          'Call or email us before 9 a.m. that morning. For a longer absence (vacation, illness), let your group’s educator know as soon as possible.',
        ),
      },
    },
    {
      category: 'admission',
      audience: 'public',
      fr: {
        question: 'Combien de temps dure l’attente pour une place ?',
        answer: rt(
          'Impossible de le promettre : tout dépend des départs et de l’âge de votre enfant. La pouponnière est la plus demandée. Inscrivez-vous tôt sur La Place 0-5 et gardez vos choix à jour — nous contactons les familles dès qu’une place s’ouvre.',
        ),
      },
      en: {
        question: 'How long is the wait for a spot?',
        answer: rt(
          'Impossible to promise: it depends on departures and your child’s age. The infant room is in highest demand. Register early on La Place 0-5 and keep your choices up to date — we contact families as soon as a spot opens.',
        ),
      },
    },
    {
      category: 'admission',
      audience: 'public',
      fr: {
        question: 'Comment se déroule la première journée ?',
        answer: rt(
          'En douceur, et jamais seule : la première journée fait partie d’une intégration progressive planifiée avec vous, avec des présences courtes qui s’allongent au rythme de votre enfant.',
        ),
      },
      en: {
        question: 'What does the first day look like?',
        answer: rt(
          'Gentle, and never alone: the first day is part of a gradual integration planned with you, with short visits that lengthen at your child’s pace.',
        ),
      },
    },
    {
      category: 'quotidien',
      audience: 'public',
      fr: {
        question: 'Mon enfant fait-il la sieste tous les jours ?',
        answer: rt(
          'Une période de repos suit le dîner pour tous les groupes. Les enfants qui ne dorment plus se reposent avec des livres après 45 minutes — le sommeil n’est jamais forcé. Les poupons dorment selon leur propre horaire.',
        ),
      },
      en: {
        question: 'Does my child nap every day?',
        answer: rt(
          'A rest period follows lunch for every group. Children who no longer sleep rest with books after 45 minutes — sleep is never forced. Infants sleep on their own schedule.',
        ),
      },
    },
    {
      category: 'quotidien',
      audience: 'public',
      fr: {
        question: 'Les enfants jouent-ils dehors en hiver ?',
        answer: rt(
          'Oui, presque tous les jours ! Seul le froid extrême (−25 °C et moins avec le vent) nous garde à l’intérieur. Un habit de neige complet et des mitaines de rechange sont indispensables.',
        ),
      },
      en: {
        question: 'Do children play outside in winter?',
        answer: rt(
          'Yes, nearly every day! Only extreme cold (−25 °C and below with wind chill) keeps us inside. A full snowsuit and spare mittens are essential.',
        ),
      },
    },
    {
      category: 'sante',
      audience: 'public',
      fr: {
        question: 'Donnez-vous des médicaments aux enfants ?',
        answer: rt(
          'Seulement sur ordonnance, avec autorisation écrite signée, dans le contenant d’origine identifié. Chaque administration est consignée dans un registre. L’acétaminophène suit le protocole du ministère.',
        ),
      },
      en: {
        question: 'Do you give children medication?',
        answer: rt(
          'Prescription only, with signed written authorization, in the original labelled container. Every administration is logged. Acetaminophen follows the ministry protocol.',
        ),
      },
    },
    {
      category: 'sante',
      audience: 'public',
      fr: {
        question: 'L’équipe est-elle formée en premiers soins ?',
        answer: rt(
          'Oui — toute l’équipe détient une certification de secourisme adaptée à la petite enfance (RCR et étouffement compris), renouvelée aux trois ans, et est formée à l’administration de l’auto-injecteur.',
        ),
      },
      en: {
        question: 'Is the team trained in first aid?',
        answer: rt(
          'Yes — the whole team holds early-childhood-adapted first-aid certification (including CPR and choking response), renewed every three years, and is trained in auto-injector use.',
        ),
      },
    },
    {
      category: 'alimentation',
      audience: 'public',
      fr: {
        question: 'Le CPE est-il sans arachides ?',
        answer: rt(
          'Oui, entièrement sans arachides et sans noix. C’est pourquoi aucune nourriture de la maison n’entre au CPE — y compris les gâteaux d’anniversaire : la cuisine prépare une surprise sécuritaire pour chaque fête.',
        ),
      },
      en: {
        question: 'Is the CPE peanut-free?',
        answer: rt(
          'Yes, entirely peanut- and nut-free. That is why no food from home enters the CPE — including birthday cakes: the kitchen prepares a safe surprise for every celebration.',
        ),
      },
    },
    {
      category: 'alimentation',
      audience: 'public',
      fr: {
        question: 'Où trouver le menu ?',
        answer: rt(
          'Sur la page Cuisine et nutrition du site, affiché à l’entrée du CPE, et en PDF téléchargeable dans la section Documents du portail parents. La rotation change au fil des saisons.',
        ),
      },
      en: {
        question: 'Where can I find the menu?',
        answer: rt(
          'On the website’s Kitchen & nutrition page, posted at the CPE entrance, and as a downloadable PDF in the portal’s Documents section. The rotation changes with the seasons.',
        ),
      },
    },
    {
      category: 'general',
      audience: 'public',
      fr: {
        question: 'Comment fonctionne le portail parents ?',
        answer: rt(
          'Chaque famille inscrite reçoit un accès créé par l’administration (aucune inscription libre). Vous vous connectez par mot de passe ou par lien magique reçu par courriel, et vous y trouvez activités, annonces, photos et documents propres aux groupes de votre enfant.',
        ),
      },
      en: {
        question: 'How does the parent portal work?',
        answer: rt(
          'Every enrolled family receives access created by the administration (no self-registration). You sign in with a password or an emailed magic link, and find activities, announcements, photos and documents specific to your child’s groups.',
        ),
      },
    },
    {
      category: 'general',
      audience: 'public',
      fr: {
        question: 'Le CPE embauche-t-il ?',
        answer: rt(
          'Les postes ouverts sont affichés sur la page Carrières, où vous pouvez postuler en ligne avec votre CV — les candidatures spontanées sont toujours bienvenues.',
        ),
      },
      en: {
        question: 'Is the CPE hiring?',
        answer: rt(
          'Open positions are posted on the Careers page, where you can apply online with your CV — spontaneous applications are always welcome.',
        ),
      },
    },
  ] as const

  for (const [i, f] of faqs.entries()) {
    const doc = await payload.create({
      collection: 'faq-entries',
      locale: 'fr',
      data: {
        ...f.fr,
        category: f.category,
        audience: f.audience,
        order: i,
        demoSeed: true,
        _status: 'published',
      },
    })
    await payload.update({
      collection: 'faq-entries',
      id: doc.id,
      locale: 'en',
      data: { ...f.en, _status: 'published' },
    })
  }

  // ---- Help centre: categories + knowledge base articles (parent assistant) ----
  console.log('Seeding help centre…')
  const kbCategoryDefs = [
    { fr: 'Inscription', en: 'Registration', icon: '📝' },
    { fr: 'Frais et paiements', en: 'Fees & payments', icon: '💰' },
    { fr: 'Activités', en: 'Activities', icon: '🎨' },
    { fr: 'Repas', en: 'Meals', icon: '🍎' },
    { fr: 'Horaire', en: 'Schedule', icon: '🕖' },
    { fr: 'Politiques', en: 'Policies', icon: '📋' },
    { fr: 'Santé', en: 'Health', icon: '🩺' },
    { fr: 'Événements', en: 'Events', icon: '🎉' },
    { fr: 'Informations générales', en: 'General information', icon: 'ℹ️' },
  ] as const

  const kbCategoryIds: Record<string, number> = {}
  for (const [i, c] of kbCategoryDefs.entries()) {
    const doc = await payload.create({
      collection: 'kb-categories',
      locale: 'fr',
      data: { name: c.fr, icon: c.icon, order: i, demoSeed: true },
    })
    await payload.update({ collection: 'kb-categories', id: doc.id, locale: 'en', data: { name: c.en } })
    kbCategoryIds[c.fr] = doc.id as number
  }

  console.log(`Seeding ${kbSeedArticles.length} knowledge-base articles…`)
  for (const a of kbSeedArticles) {
    const doc = await payload.create({
      collection: 'kb-articles',
      locale: 'fr',
      data: {
        question: a.fr.question,
        answer: rt(...a.fr.answer),
        keywords: a.fr.keywords.map((term) => ({ term })),
        category: kbCategoryIds[a.category],
        audience: a.audience,
        enabled: true,
        demoSeed: true,
        _status: 'published',
      },
    })
    await payload.update({
      collection: 'kb-articles',
      id: doc.id,
      locale: 'en',
      data: {
        question: a.en.question,
        answer: rt(...a.en.answer),
        keywords: a.en.keywords.map((term) => ({ term })),
        _status: 'published',
      },
    })
  }

  // ---- Closures (full demo year ahead) ----
  const year = new Date().getFullYear()
  const closures = [
    { fr: 'Journée pédagogique', en: 'Pedagogical day', start: `${year}-08-21` },
    { fr: 'Fête du Travail', en: 'Labour Day', start: `${year}-09-07` },
    { fr: 'Action de grâce', en: 'Thanksgiving', start: `${year}-10-12` },
    { fr: 'Journée pédagogique', en: 'Pedagogical day', start: `${year}-11-13` },
    { fr: 'Congé des Fêtes', en: 'Holiday break', start: `${year}-12-24`, end: `${year + 1}-01-04` },
    { fr: 'Journée pédagogique', en: 'Pedagogical day', start: `${year + 1}-02-12` },
    { fr: 'Vendredi saint', en: 'Good Friday', start: `${year + 1}-04-02` },
    { fr: 'Lundi de Pâques', en: 'Easter Monday', start: `${year + 1}-04-05` },
    { fr: 'Journée nationale des patriotes', en: 'National Patriots’ Day', start: `${year + 1}-05-24` },
    { fr: 'Fête nationale du Québec', en: 'Québec National Holiday', start: `${year + 1}-06-24` },
    { fr: 'Fête du Canada', en: 'Canada Day', start: `${year + 1}-07-01` },
  ]
  for (const c of closures) {
    const doc = await payload.create({
      collection: 'closure-dates',
      locale: 'fr',
      data: { label: c.fr, startDate: c.start, endDate: c.end, demoSeed: true },
    })
    await payload.update({ collection: 'closure-dates', id: doc.id, locale: 'en', data: { label: c.en } })
  }

  // ---- Team (fictional, consent flagged for demo) ----
  console.log('Seeding team…')
  type TeamMember = {
    name: string
    department: 'administration' | 'educators' | 'kitchen' | 'specialists'
    fr: { jobTitle: string; bio: string }
    en: { jobTitle: string; bio: string }
  }
  const team: TeamMember[] = [
    // Administration
    {
      name: 'Marie-Claude Demers (démo)',
      department: 'administration',
      fr: { jobTitle: 'Directrice générale', bio: 'Éducatrice de formation, elle veille depuis quinze ans à ce que chaque famille se sente chez elle. Elle connaît le prénom de chaque enfant — et celui de chaque doudou. (Profil fictif de démonstration.)' },
      en: { jobTitle: 'Executive Director', bio: 'An educator by training, she has spent fifteen years making sure every family feels at home. She knows every child’s name — and every comfort blanket’s too. (Fictional demonstration profile.)' },
    },
    {
      name: 'Amina Berrada (démo)',
      department: 'administration',
      fr: { jobTitle: 'Directrice adjointe', bio: 'Elle orchestre le quotidien du CPE — horaires, remplacements et mille petites attentions. Rien ne lui échappe, surtout pas un anniversaire. (Profil fictif de démonstration.)' },
      en: { jobTitle: 'Assistant Director', bio: 'She orchestrates the CPE’s daily life — schedules, substitutions, and a thousand small kindnesses. Nothing escapes her, least of all a birthday. (Fictional demonstration profile.)' },
    },
    {
      name: 'Sophie Lachance (démo)',
      department: 'administration',
      fr: { jobTitle: 'Agente de soutien administratif', bio: 'Première voix au téléphone et premier sourire au bureau : dossiers, factures et relevés passent entre ses mains expertes. (Profil fictif de démonstration.)' },
      en: { jobTitle: 'Administrative Support Officer', bio: 'First voice on the phone and first smile at the office: files, invoices and statements all pass through her expert hands. (Fictional demonstration profile.)' },
    },
    // Educators
    {
      name: 'Julie Tremblay-Roy (démo)',
      department: 'educators',
      fr: { jobTitle: 'Éducatrice — Les Poussins', bio: 'Spécialiste des tout-petits depuis douze ans, elle transforme chaque routine en moment de complicité — et endort les poupons les plus résistants. (Profil fictif de démonstration.)' },
      en: { jobTitle: 'Educator — Les Poussins', bio: 'A specialist of the very young for twelve years, she turns every routine into a moment of connection — and settles the most nap-resistant infants. (Fictional demonstration profile.)' },
    },
    {
      name: 'Camille Fortin (démo)',
      department: 'educators',
      fr: { jobTitle: 'Éducatrice — Les Poussins', bio: 'Douce et patiente, elle chante toute la journée — les poupons ont chacun leur chanson d’accueil personnalisée. (Profil fictif de démonstration.)' },
      en: { jobTitle: 'Educator — Les Poussins', bio: 'Gentle and patient, she sings all day long — each infant has their own personalized welcome song. (Fictional demonstration profile.)' },
    },
    {
      name: 'Noémie Bélanger (démo)',
      department: 'educators',
      fr: { jobTitle: 'Éducatrice — Les Lapinots', bio: 'Reine des bacs sensoriels et des parcours à quatre pattes, elle accompagne les premiers pas et les premiers mots avec un enthousiasme contagieux. (Profil fictif de démonstration.)' },
      en: { jobTitle: 'Educator — Les Lapinots', bio: 'Queen of sensory bins and crawling courses, she cheers on first steps and first words with contagious enthusiasm. (Fictional demonstration profile.)' },
    },
    {
      name: 'Fatima El Amrani (démo)',
      department: 'educators',
      fr: { jobTitle: 'Éducatrice — Les Lapinots', bio: 'Passionnée de littérature jeunesse, elle a monté le coin lecture le plus douillet du CPE. Ses marionnettes sont célèbres. (Profil fictif de démonstration.)' },
      en: { jobTitle: 'Educator — Les Lapinots', bio: 'Passionate about children’s literature, she built the coziest reading corner in the CPE. Her puppets are famous. (Fictional demonstration profile.)' },
    },
    {
      name: 'Alexandra Petrov (démo)',
      department: 'educators',
      fr: { jobTitle: 'Éducatrice — Les Papillons', bio: 'Artiste dans l’âme, elle fait peindre, coller et modeler tout ce qui passe. Les murs du local des Papillons sont sa galerie préférée. (Profil fictif de démonstration.)' },
      en: { jobTitle: 'Educator — Les Papillons', bio: 'An artist at heart, she gets everything painted, glued and sculpted. The Papillons’ walls are her favourite gallery. (Fictional demonstration profile.)' },
    },
    {
      name: 'Émilie Gagnon-Côté (démo)',
      department: 'educators',
      fr: { jobTitle: 'Éducatrice — Les Renardeaux', bio: 'Toujours dehors, beau temps mauvais temps : ses expéditions « exploration du quartier » sont légendaires chez les 3-4 ans. (Profil fictif de démonstration.)' },
      en: { jobTitle: 'Educator — Les Renardeaux', bio: 'Always outside, rain or shine: her neighbourhood-exploration expeditions are legendary among the 3-4s. (Fictional demonstration profile.)' },
    },
    {
      name: 'Marc-Antoine Dubois (démo)',
      department: 'educators',
      fr: { jobTitle: 'Éducateur — Les Explorateurs', bio: 'Ancien animateur de camps, il prépare les futurs écoliers avec des projets fous : fusées en carton, restaurants imaginaires et grands débats de 5 ans. (Profil fictif de démonstration.)' },
      en: { jobTitle: 'Educator — Les Explorateurs', bio: 'A former camp counsellor, he preps future schoolkids with wild projects: cardboard rockets, imaginary restaurants and great five-year-old debates. (Fictional demonstration profile.)' },
    },
    {
      name: 'Rosalie Bergeron (démo)',
      department: 'educators',
      fr: { jobTitle: 'Éducatrice volante', bio: 'Elle connaît tous les groupes et tous les enfants : c’est elle qui assure la continuité pendant les pauses, les rencontres et les imprévus. (Profil fictif de démonstration.)' },
      en: { jobTitle: 'Floating Educator', bio: 'She knows every group and every child: she is the continuity during breaks, meetings and the unexpected. (Fictional demonstration profile.)' },
    },
    // Kitchen
    {
      name: 'Gabriel Sansregret (démo)',
      department: 'kitchen',
      fr: { jobTitle: 'Cuisinier', bio: 'Derrière ses potages et ses muffins se cache la personne la plus populaire du CPE. Son velouté de courge convertit même les plus sceptiques. (Profil fictif de démonstration.)' },
      en: { jobTitle: 'Cook', bio: 'Behind his soups and muffins hides the most popular person at the CPE. His squash soup converts even the sceptics. (Fictional demonstration profile.)' },
    },
    {
      name: 'Linh Pham (démo)',
      department: 'kitchen',
      fr: { jobTitle: 'Aide-cuisinière', bio: 'Gardienne des fiches d’allergies et des collations parfaites, elle connaît par cœur les goûts (et les dégoûts) de chaque groupe. (Profil fictif de démonstration.)' },
      en: { jobTitle: 'Kitchen Assistant', bio: 'Guardian of the allergy sheets and perfect snacks, she knows every group’s tastes (and distastes) by heart. (Fictional demonstration profile.)' },
    },
    // Specialists & support
    {
      name: 'Véronique Simard (démo)',
      department: 'specialists',
      fr: { jobTitle: 'Éducatrice spécialisée — soutien à l’inclusion', bio: 'Elle accompagne les enfants qui ont besoin d’un coup de pouce supplémentaire et fait le pont avec les professionnels externes. Sa règle d’or : chaque enfant a sa place. (Profil fictif de démonstration.)' },
      en: { jobTitle: 'Special-Needs Educator — Inclusion Support', bio: 'She supports children who need an extra hand and bridges with outside professionals. Her golden rule: every child belongs. (Fictional demonstration profile.)' },
    },
    {
      name: 'Nadia Kaddouri (démo)',
      department: 'specialists',
      fr: { jobTitle: 'Conseillère pédagogique', bio: 'Elle nourrit la réflexion de l’équipe : observation des groupes, coaching et formation continue. C’est elle qui garde le programme éducatif bien vivant. (Profil fictif de démonstration.)' },
      en: { jobTitle: 'Pedagogical Advisor', bio: 'She feeds the team’s practice: group observation, coaching and continuing education. She keeps the educational program alive and well. (Fictional demonstration profile.)' },
    },
    {
      name: 'Denis Lavoie (démo)',
      department: 'specialists',
      fr: { jobTitle: 'Responsable de l’entretien', bio: 'Locaux impeccables, jouets désinfectés, cour sécuritaire : son travail discret est la base de tout le reste. Les enfants l’adorent — il répare aussi les tricycles. (Profil fictif de démonstration.)' },
      en: { jobTitle: 'Maintenance Manager', bio: 'Spotless rooms, disinfected toys, a safe yard: his quiet work underpins everything else. The children adore him — he fixes tricycles too. (Fictional demonstration profile.)' },
    },
  ]
  for (const [i, m] of team.entries()) {
    const photo = await uploadPortrait(payload, i, m.name)
    const doc = await payload.create({
      collection: 'staff-profiles',
      locale: 'fr',
      data: {
        name: m.name,
        ...m.fr,
        department: m.department,
        photo,
        consent: true,
        order: i,
        demoSeed: true,
        _status: 'published',
      },
    })
    await payload.update({ collection: 'staff-profiles', id: doc.id, locale: 'en', data: { ...m.en, _status: 'published' } })
  }

  // ---- Job openings ----
  const jobs = [
    {
      schedule: 'full' as const,
      fr: {
        title: 'Éducatrice ou éducateur qualifié·e — groupe 3-4 ans',
        description: rt(
          'Poste permanent à temps plein (36 h/semaine) auprès des Renardeaux, notre groupe de 3-4 ans débordant d’énergie. Vous rejoignez une équipe stable, appuyée par une conseillère pédagogique, dans un milieu où la qualité passe avant la cadence. (Affichage de démonstration.)',
          'Entrée en poste dès que possible. Salaire selon l’échelle du réseau des CPE, régime de retraite et assurances collectives.',
        ),
        qualifications: rt(
          'DEC en techniques d’éducation à l’enfance ou AEC reconnue avec expérience ; cours de secourisme adapté à la petite enfance à jour ; absence d’empêchement vérifiée. La douceur, la fiabilité et le plaisir sincère d’être avec les enfants comptent autant que le diplôme.',
        ),
      },
      en: {
        title: 'Qualified educator — 3-4 year-old group',
        description: rt(
          'Permanent full-time position (36 h/week) with the Renardeaux, our energy-filled 3-4 group. You join a stable team, supported by a pedagogical advisor, in a place where quality comes before speed. (Demonstration posting.)',
          'Start as soon as possible. Salary on the CPE network scale, pension plan and group insurance.',
        ),
        qualifications: rt(
          'DEC in early childhood education or recognized AEC with experience; up-to-date early-childhood first-aid course; verified background check. Gentleness, reliability and genuine joy in being with children matter as much as the diploma.',
        ),
      },
    },
    {
      schedule: 'part' as const,
      fr: {
        title: 'Aide-cuisinier·ère — temps partiel',
        description: rt(
          'De 9 h à 14 h, du lundi au vendredi, vous secondez notre cuisinier : préparation des collations, service des dîners, hygiène de la cuisine et gestion des fiches d’allergies. (Affichage de démonstration.)',
        ),
        qualifications: rt(
          'Formation en hygiène et salubrité alimentaire (MAPAQ) ou volonté de l’obtenir rapidement ; expérience en cuisine de collectivité un atout ; rigueur absolue avec les allergènes.',
        ),
      },
      en: {
        title: 'Kitchen assistant — part-time',
        description: rt(
          'From 9 a.m. to 2 p.m., Monday to Friday, you support our cook: snack preparation, lunch service, kitchen hygiene and allergy-sheet management. (Demonstration posting.)',
        ),
        qualifications: rt(
          'MAPAQ food-hygiene training or willingness to obtain it quickly; institutional-kitchen experience an asset; absolute rigour with allergens.',
        ),
      },
    },
    {
      schedule: 'sub' as const,
      fr: {
        title: 'Éducatrice ou éducateur — banque de remplacement',
        description: rt(
          'Horaires variables selon vos disponibilités, dans tous les groupes. Une belle porte d’entrée pour découvrir notre équipe — plusieurs de nos permanentes ont commencé ici. (Affichage de démonstration.)',
        ),
        qualifications: rt(
          'Formation en éducation à l’enfance (complétée ou en cours) ; secourisme à jour ; disponibilité d’au moins deux jours par semaine appréciée.',
        ),
      },
      en: {
        title: 'Educator — substitute bank',
        description: rt(
          'Variable hours based on your availability, across all groups. A great way to get to know our team — several of our permanent educators started here. (Demonstration posting.)',
        ),
        qualifications: rt(
          'Early-childhood-education training (completed or in progress); current first aid; availability of at least two days a week appreciated.',
        ),
      },
    },
    {
      schedule: 'part' as const,
      fr: {
        title: 'Éducatrice spécialisée — soutien à l’inclusion (remplacement de congé)',
        description: rt(
          'Remplacement d’un congé parental (3 jours/semaine, un an) : accompagnement individualisé d’enfants à besoins particuliers, collaboration avec les familles et les partenaires externes (CLSC, ergothérapie, orthophonie). (Affichage de démonstration.)',
        ),
        qualifications: rt(
          'DEC en techniques d’éducation spécialisée ou l’équivalent ; expérience auprès des 0-5 ans ; connaissance du réseau de la santé et des services sociaux un atout.',
        ),
      },
      en: {
        title: 'Special-needs educator — inclusion support (leave replacement)',
        description: rt(
          'Parental-leave replacement (3 days/week, one year): individualized support for children with special needs, collaboration with families and outside partners (CLSC, occupational therapy, speech therapy). (Demonstration posting.)',
        ),
        qualifications: rt(
          'DEC in special-care counselling or equivalent; experience with ages 0-5; knowledge of the health and social services network an asset.',
        ),
      },
    },
  ]
  const jobIds: number[] = []
  for (const j of jobs) {
    const doc = await payload.create({
      collection: 'job-openings',
      locale: 'fr',
      data: { ...j.fr, schedule: j.schedule, demoSeed: true, _status: 'published' },
    })
    await payload.update({ collection: 'job-openings', id: doc.id, locale: 'en', data: { ...j.en, _status: 'published' } })
    jobIds.push(doc.id as number)
  }

  // ---- Demo job applications (what the director sees when someone applies) ----
  const applicationDefs = [
    {
      name: 'Laurence Bédard (démo)',
      email: 'laurence.bedard@exemple-demo.example',
      phone: '418 555-0147 (démo)',
      jobOpening: jobIds[0],
      message:
        'Bonjour, éducatrice qualifiée (DEC 2019) avec cinq ans d’expérience en CPE, je serais ravie de rencontrer votre équipe pour le poste auprès des 3-4 ans. (Candidature fictive de démonstration.)',
    },
    {
      name: 'Karim Ouellet (démo)',
      email: 'karim.ouellet@exemple-demo.example',
      phone: undefined,
      jobOpening: undefined, // spontaneous application
      message:
        'Étudiant en techniques d’éducation à l’enfance (2e année), disponible les lundis et vendredis pour des remplacements. (Candidature fictive de démonstration.)',
    },
  ]
  for (const a of applicationDefs) {
    const cv = makeDemoPdf(`CV — ${a.name}`, ['Curriculum vitae fictif de demonstration.'])
    await payload.create({
      collection: 'job-applications',
      data: {
        name: a.name,
        email: a.email,
        phone: a.phone,
        message: a.message,
        jobOpening: a.jobOpening,
        demoSeed: true,
      },
      file: { data: cv, mimetype: 'application/pdf', name: `cv-demo-${a.name.split(' ')[0].toLowerCase()}.pdf`, size: cv.length },
    })
  }

  // ---- Activity illustrations ----
  console.log('Generating demo illustrations…')
  const img = {
    piscine: await uploadIllustration(payload, 'piscine', 'Illustration : journée de jeux d’eau', 'Illustration: water play day'),
    zoo: await uploadIllustration(payload, 'zoo', 'Illustration : sortie au zoo', 'Illustration: zoo outing'),
    parc: await uploadIllustration(payload, 'parc', 'Illustration : sortie au parc', 'Illustration: park outing'),
    peinture: await uploadIllustration(payload, 'peinture', 'Illustration : atelier de peinture', 'Illustration: painting workshop'),
    musique: await uploadIllustration(payload, 'musique', 'Illustration : éveil musical', 'Illustration: musical awakening'),
    jardinage: await uploadIllustration(payload, 'jardinage', 'Illustration : jardinage dans la cour', 'Illustration: gardening in the yard'),
    histoires: await uploadIllustration(payload, 'histoires', 'Illustration : l’heure du conte', 'Illustration: story time'),
    motricite: await uploadIllustration(payload, 'motricite', 'Illustration : parcours de motricité', 'Illustration: motor-skills course'),
    pique_nique: await uploadIllustration(payload, 'pique_nique', 'Illustration : pique-nique', 'Illustration: picnic'),
    ferme: await uploadIllustration(payload, 'ferme', 'Illustration : visite à la ferme', 'Illustration: farm visit'),
    pommes: await uploadIllustration(payload, 'pommes', 'Illustration : sortie au verger', 'Illustration: orchard outing'),
    citrouilles: await uploadIllustration(payload, 'citrouilles', 'Illustration : fête des citrouilles', 'Illustration: pumpkin celebration'),
    neige: await uploadIllustration(payload, 'neige', 'Illustration : plaisirs d’hiver', 'Illustration: winter fun'),
    cabane: await uploadIllustration(payload, 'cabane', 'Illustration : cabane à sucre', 'Illustration: sugar shack'),
    bricolage: await uploadIllustration(payload, 'bricolage', 'Illustration : atelier de bricolage', 'Illustration: craft workshop'),
    sciences: await uploadIllustration(payload, 'sciences', 'Illustration : petites sciences', 'Illustration: little science'),
    biblio: await uploadIllustration(payload, 'biblio', 'Illustration : sortie à la bibliothèque', 'Illustration: library outing'),
    velo: await uploadIllustration(payload, 'velo', 'Illustration : journée vélos et trottinettes', 'Illustration: bike and scooter day'),
    spectacle: await uploadIllustration(payload, 'spectacle', 'Illustration : spectacle des enfants', 'Illustration: children’s show'),
    fete: await uploadIllustration(payload, 'fete', 'Illustration : fête au CPE', 'Illustration: party at the CPE'),
    repas: await uploadIllustration(payload, 'repas', 'Illustration : assiette équilibrée', 'Illustration: balanced plate'),
    soupe: await uploadIllustration(payload, 'soupe', 'Illustration : potage maison', 'Illustration: homemade soup'),
    muffins: await uploadIllustration(payload, 'muffins', 'Illustration : muffins maison', 'Illustration: homemade muffins'),
  }

  // ---- Activities (mix of public showcase and portal-only) ----
  const activities: {
    date: string
    endDate?: string
    visibility: 'public' | 'portal'
    image: number
    groups: number[]
    fr: { title: string; description: ReturnType<typeof rt>; importantNote?: string; checklist?: { item: string }[] }
    en: { title: string; description: ReturnType<typeof rt>; importantNote?: string; checklist?: { item: string }[] }
  }[] = [
    {
      date: day(3),
      visibility: 'public',
      image: img.piscine,
      groups: [papillons, renardeaux, explorateurs],
      fr: {
        title: 'Journée de jeux d’eau',
        description: rt('Toute la matinée, la cour se transforme en petite plage : jeux d’eau, bulles géantes et parcours arrosé pour les plus braves.'),
        importantNote: 'Appliquez la crème solaire avant l’arrivée. Les jeux d’eau seront remis au lendemain en cas de pluie.',
        checklist: [{ item: 'Maillot de bain' }, { item: 'Serviette' }, { item: 'Gourde d’eau' }, { item: 'Chapeau ou casquette' }],
      },
      en: {
        title: 'Water play day',
        description: rt('All morning, the yard becomes a little beach: water games, giant bubbles and a splash course for the bravest.'),
        importantNote: 'Apply sunscreen before arrival. Water games move to the next day in case of rain.',
        checklist: [{ item: 'Swimsuit' }, { item: 'Towel' }, { item: 'Water bottle' }, { item: 'Hat or cap' }],
      },
    },
    {
      date: day(6),
      visibility: 'public',
      image: img.zoo,
      groups: [renardeaux, explorateurs],
      fr: {
        title: 'Sortie au zoo',
        description: rt('Grande sortie en autobus pour rencontrer les girafes, les loutres et les flamants roses. Départ après la collation du matin, retour pour la sieste.'),
        importantNote: 'Le formulaire d’autorisation de sortie doit être signé au plus tard la veille.',
        checklist: [{ item: 'Chaussures confortables' }, { item: 'Chapeau' }, { item: 'Vêtements selon la météo' }],
      },
      en: {
        title: 'Zoo outing',
        description: rt('A big bus outing to meet the giraffes, otters and flamingos. Departure after morning snack, back in time for nap.'),
        importantNote: 'The outing authorization form must be signed no later than the day before.',
        checklist: [{ item: 'Comfortable shoes' }, { item: 'Hat' }, { item: 'Weather-appropriate clothes' }],
      },
    },
    {
      date: day(8),
      visibility: 'public',
      image: img.peinture,
      groups: [lapinots, papillons],
      fr: {
        title: 'Atelier grand format : peindre comme les grands',
        description: rt('Chevalets géants, pinceaux, éponges et beaucoup de couleurs : un atelier d’expression libre inspiré des ateliers d’artistes.'),
        checklist: [{ item: 'Vêtements qui peuvent se salir' }],
      },
      en: {
        title: 'Big-format workshop: painting like the grown-ups',
        description: rt('Giant easels, brushes, sponges and lots of colour: a free-expression workshop inspired by artists’ studios.'),
        checklist: [{ item: 'Clothes that can get messy' }],
      },
    },
    {
      date: day(10),
      visibility: 'public',
      image: img.pique_nique,
      groups: [poussins, lapinots],
      fr: {
        title: 'Pique-nique des tout-petits au parc',
        description: rt('Petite promenade en poussettes jusqu’au parc voisin, collation sur la grande couverture et retour avant la sieste.'),
        checklist: [{ item: 'Chapeau' }, { item: 'Vêtements de rechange' }],
      },
      en: {
        title: 'Little ones’ picnic at the park',
        description: rt('A short stroller walk to the nearby park, snack on the big blanket, and back before nap time.'),
        checklist: [{ item: 'Hat' }, { item: 'Spare clothes' }],
      },
    },
    {
      date: day(13),
      visibility: 'public',
      image: img.musique,
      groups: [poussins, lapinots, papillons, renardeaux, explorateurs],
      fr: {
        title: 'Éveil musical avec instruments',
        description: rt('Une musicienne invitée fait découvrir tambourins, maracas et petites percussions à tous les groupes, chacun à son tour.'),
      },
      en: {
        title: 'Musical awakening with instruments',
        description: rt('A guest musician introduces tambourines, maracas and small percussion to every group, one at a time.'),
      },
    },
    {
      date: day(15),
      visibility: 'portal',
      image: img.jardinage,
      groups: [papillons],
      fr: {
        title: 'Jardinage : on plante nos fines herbes',
        description: rt('Les Papillons mettent les mains dans la terre : basilic, menthe et ciboulette rejoindront le potager de la cour.'),
        checklist: [{ item: 'Vêtements qui peuvent se salir' }],
      },
      en: {
        title: 'Gardening: planting our herbs',
        description: rt('The Papillons get their hands in the soil: basil, mint and chives join the yard’s vegetable garden.'),
        checklist: [{ item: 'Clothes that can get messy' }],
      },
    },
    {
      date: day(17),
      visibility: 'portal',
      image: img.histoires,
      groups: [poussins],
      fr: {
        title: 'L’heure du conte en pyjama',
        description: rt('Matinée douce pour les Poussins : histoires, marionnettes et chansons dans le coin lecture.'),
        checklist: [{ item: 'Pyjama confortable' }, { item: 'Doudou' }],
      },
      en: {
        title: 'Story time in pyjamas',
        description: rt('A gentle morning for the Poussins: stories, puppets and songs in the reading corner.'),
        checklist: [{ item: 'Comfortable pyjamas' }, { item: 'Comfort blanket' }],
      },
    },
    {
      date: day(21),
      visibility: 'public',
      image: img.motricite,
      groups: [renardeaux, explorateurs],
      fr: {
        title: 'Grand parcours de motricité',
        description: rt('Tunnels, cerceaux, poutres et trampoline doux : un parcours géant installé dans la salle de motricité pour bouger, grimper et sauter.'),
      },
      en: {
        title: 'Giant motor-skills course',
        description: rt('Tunnels, hoops, beams and a soft trampoline: a giant course set up in the motor-skills room to move, climb and jump.'),
      },
    },
    {
      date: day(5),
      visibility: 'portal',
      image: img.biblio,
      groups: [papillons, renardeaux],
      fr: {
        title: 'Sortie à la bibliothèque du quartier',
        description: rt('Marche jusqu’à la bibliothèque pour l’heure du conte animée par la bibliothécaire, puis choix d’un livre à rapporter au local.'),
        importantNote: 'Départ à 9 h 15 — merci d’arriver avant 9 h ce matin-là.',
        checklist: [{ item: 'Chaussures de marche' }, { item: 'Chapeau' }],
      },
      en: {
        title: 'Outing to the neighbourhood library',
        description: rt('A walk to the library for story time with the librarian, then each child picks a book to bring back to the room.'),
        importantNote: 'Departure at 9:15 — please arrive before 9 that morning.',
        checklist: [{ item: 'Walking shoes' }, { item: 'Hat' }],
      },
    },
    {
      date: day(9),
      visibility: 'portal',
      image: img.sciences,
      groups: [explorateurs],
      fr: {
        title: 'Petites sciences : volcans et potions',
        description: rt('Bicarbonate, vinaigre et colorants : les Explorateurs font éruption ! Une matinée d’expériences pour apprendre à observer, prédire et s’émerveiller.'),
        checklist: [{ item: 'Vêtements qui peuvent se salir' }],
      },
      en: {
        title: 'Little science: volcanoes and potions',
        description: rt('Baking soda, vinegar and food colouring: the Explorateurs erupt! A morning of experiments to practise observing, predicting and marvelling.'),
        checklist: [{ item: 'Clothes that can get messy' }],
      },
    },
    {
      date: day(12),
      visibility: 'public',
      image: img.velo,
      groups: [renardeaux, explorateurs],
      fr: {
        title: 'Journée vélos et trottinettes',
        description: rt('La cour se transforme en circuit : draisiennes, tricycles et trottinettes du CPE, panneaux de signalisation rigolos et « permis de conduire » remis à la fin.'),
        importantNote: 'Les vélos de la maison restent à la maison — le CPE fournit tout l’équipement, casques compris.',
      },
      en: {
        title: 'Bike and scooter day',
        description: rt('The yard becomes a circuit: CPE balance bikes, tricycles and scooters, silly road signs and a “driver’s licence” awarded at the end.'),
        importantNote: 'Bikes from home stay home — the CPE provides all the equipment, helmets included.',
      },
    },
    {
      date: day(14),
      visibility: 'portal',
      image: img.bricolage,
      groups: [lapinots],
      fr: {
        title: 'Bricolage : le mobile des papillons',
        description: rt('Papier de soie, cartons colorés et beaucoup de colle : chaque Lapinot repartira avec son mobile à suspendre au-dessus du lit.'),
        checklist: [{ item: 'Vêtements qui peuvent se salir' }],
      },
      en: {
        title: 'Craft: the butterfly mobile',
        description: rt('Tissue paper, coloured cardboard and lots of glue: every Lapinot will leave with a mobile to hang above their bed.'),
        checklist: [{ item: 'Clothes that can get messy' }],
      },
    },
    {
      date: day(19),
      visibility: 'public',
      image: img.ferme,
      groups: [poussins, lapinots, papillons, renardeaux, explorateurs],
      fr: {
        title: 'La petite ferme mobile en visite',
        description: rt('Lapins, chèvres naines, poules et un poney très patient s’installent dans la cour pour la journée. Chaque groupe aura son moment de visite, adapté à son âge.'),
        importantNote: 'Lavage des mains obligatoire après chaque contact avec les animaux — l’équipe y veille.',
      },
      en: {
        title: 'The little mobile farm visits',
        description: rt('Rabbits, dwarf goats, hens and a very patient pony settle into the yard for the day. Each group gets its own age-appropriate visit slot.'),
        importantNote: 'Mandatory handwashing after every animal contact — the team makes sure of it.',
      },
    },
    {
      date: day(24),
      visibility: 'public',
      image: img.fete,
      groups: [poussins, lapinots, papillons, renardeaux, explorateurs],
      fr: {
        title: 'Kermesse d’été des familles',
        description: rt('Jeux gonflables, maquillage, épluchette et limonade : la grande fête d’été du CPE, en fin d’après-midi, familles bienvenues !'),
        importantNote: 'De 15 h 30 à 18 h dans la cour. En cas de pluie, remise au lendemain.',
      },
      en: {
        title: 'Families’ summer fair',
        description: rt('Bouncy games, face painting, corn roast and lemonade: the CPE’s big summer party, late afternoon, families welcome!'),
        importantNote: 'From 3:30 to 6 p.m. in the yard. Moved to the next day in case of rain.',
      },
    },
    {
      date: day(31),
      visibility: 'portal',
      image: img.soupe,
      groups: [renardeaux],
      fr: {
        title: 'Atelier cuisine : la soupe du potager',
        description: rt('Les Renardeaux récoltent les légumes du potager de la cour, les lavent, les coupent (avec les couteaux d’apprentissage !) et préparent la soupe que tout le CPE mangera au dîner.'),
        checklist: [{ item: 'Vêtements qui peuvent se salir' }],
      },
      en: {
        title: 'Cooking workshop: garden soup',
        description: rt('The Renardeaux harvest the yard garden’s vegetables, wash them, cut them (with learning knives!) and make the soup the whole CPE will eat at lunch.'),
        checklist: [{ item: 'Clothes that can get messy' }],
      },
    },
    {
      date: day(45),
      visibility: 'public',
      image: img.pommes,
      groups: [papillons, renardeaux, explorateurs],
      fr: {
        title: 'Sortie au verger',
        description: rt('Le grand classique de septembre : cueillette de pommes, tour de tracteur et collation au milieu des pommiers. Les pommes cueillies deviendront compote maison la semaine suivante.'),
        importantNote: 'Autorisation de sortie requise. Transport en autobus scolaire.',
        checklist: [{ item: 'Chaussures fermées' }, { item: 'Vêtements chauds en couches' }],
      },
      en: {
        title: 'Orchard outing',
        description: rt('The great September classic: apple picking, a tractor ride and a snack among the apple trees. The apples become homemade applesauce the following week.'),
        importantNote: 'Outing authorization required. School-bus transport.',
        checklist: [{ item: 'Closed shoes' }, { item: 'Warm layered clothes' }],
      },
    },
    {
      date: day(80),
      visibility: 'public',
      image: img.citrouilles,
      groups: [poussins, lapinots, papillons, renardeaux, explorateurs],
      fr: {
        title: 'Semaine des citrouilles et des costumes',
        description: rt('Décoration de citrouilles (sans couteaux !), chasse aux bonbons-collants dans la cour et défilé de costumes entre les groupes. Les costumes de la maison sont bienvenus toute la semaine.'),
        importantNote: 'Pas de masques couvrant le visage ni d’accessoires pointus, s’il vous plaît.',
      },
      en: {
        title: 'Pumpkin and costume week',
        description: rt('Pumpkin decorating (no knives!), a sticker-treat hunt in the yard and a costume parade between groups. Costumes from home are welcome all week.'),
        importantNote: 'No face-covering masks or pointy accessories, please.',
      },
    },
    {
      date: day(150),
      visibility: 'public',
      image: img.neige,
      groups: [lapinots, papillons, renardeaux, explorateurs],
      fr: {
        title: 'Grand carnaval d’hiver',
        description: rt('Sculptures sur neige, peinture sur neige, glissade et chocolat chaud servi dehors : une semaine pour aimer l’hiver comme les enfants savent le faire.'),
        checklist: [{ item: 'Habit de neige complet' }, { item: 'Deuxième paire de mitaines' }],
      },
      en: {
        title: 'Big winter carnival',
        description: rt('Snow sculptures, snow painting, sliding and hot chocolate served outside: a week for loving winter the way children do.'),
        checklist: [{ item: 'Full snowsuit' }, { item: 'Second pair of mittens' }],
      },
    },
  ]

  for (const a of activities) {
    const doc = await payload.create({
      collection: 'activities',
      locale: 'fr',
      data: {
        title: a.fr.title,
        description: a.fr.description,
        importantNote: a.fr.importantNote,
        checklist: a.fr.checklist,
        date: a.date,
        endDate: a.endDate,
        visibility: a.visibility,
        image: a.image,
        groups: a.groups,
        demoSeed: true,
        _status: 'published',
      },
    })
    await payload.update({
      collection: 'activities',
      id: doc.id,
      locale: 'en',
      data: {
        title: a.en.title,
        description: a.en.description,
        importantNote: a.en.importantNote,
        checklist: a.en.checklist,
        _status: 'published',
      },
    })
  }

  // ---- Gallery: past activities (consent-confirmed demo illustrations) ----
  // Mix of public photos (website gallery) and portal-only photos, some
  // group-scoped — so the demo shows every visibility tier in action.
  console.log('Seeding gallery…')
  const galleryDefs: {
    theme: string
    at: string
    fr: string
    en: string
    visibility: 'public' | 'portal'
    groups?: number[]
  }[] = [
    { theme: 'parc', at: day(-6), visibility: 'public', fr: 'Cerfs-volants au parc — que du vent et des sourires', en: 'Kites at the park — nothing but wind and smiles' },
    { theme: 'peinture', at: day(-12), visibility: 'public', fr: 'Nos artistes ont repeint le mois de juin', en: 'Our artists repainted the month of June' },
    { theme: 'jardinage', at: day(-19), visibility: 'public', fr: 'Les premières pousses du potager', en: 'The vegetable garden’s first sprouts' },
    { theme: 'musique', at: day(-26), visibility: 'public', fr: 'Fanfare improvisée dans la salle de motricité', en: 'Improvised fanfare in the motor-skills room' },
    { theme: 'histoires', at: day(-33), visibility: 'public', fr: 'L’heure du conte sous les étoiles en feutrine', en: 'Story time under felt stars' },
    { theme: 'motricite', at: day(-40), visibility: 'public', fr: 'Le grand parcours des petits champions', en: 'The little champions’ big course' },
    { theme: 'piscine', at: day(-3), visibility: 'public', fr: 'Première canicule, premiers jeux d’eau', en: 'First heat wave, first water games' },
    { theme: 'velo', at: day(-15), visibility: 'public', fr: 'Le grand prix de draisiennes de la cour', en: 'The yard’s balance-bike grand prix' },
    { theme: 'ferme', at: day(-60), visibility: 'public', fr: 'La visite de la petite ferme — coup de cœur pour le poney', en: 'The little farm’s visit — the pony stole every heart' },
    { theme: 'cabane', at: day(-120), visibility: 'public', fr: 'Cabane à sucre : la tire sur neige fait l’unanimité', en: 'Sugar shack: maple taffy wins unanimously' },
    { theme: 'neige', at: day(-160), visibility: 'public', fr: 'Notre bonhomme de neige record (presque deux étages !)', en: 'Our record snowman (almost two storeys!)' },
    { theme: 'spectacle', at: day(-30), visibility: 'public', fr: 'Le spectacle de fin d’année des Explorateurs', en: 'The Explorateurs’ year-end show' },
    // Portal-only, group-scoped photos (parents of these groups only)
    { theme: 'bricolage', at: day(-8), visibility: 'portal', groups: [papillons], fr: 'Papillons : les mobiles prennent leur envol', en: 'Papillons: the mobiles take flight' },
    { theme: 'sciences', at: day(-10), visibility: 'portal', groups: [explorateurs], fr: 'Explorateurs : éruption contrôlée en classe de sciences', en: 'Explorateurs: controlled eruption in science class' },
    { theme: 'pique_nique', at: day(-22), visibility: 'portal', groups: [poussins], fr: 'Poussins : premier pique-nique sur la grande couverture', en: 'Poussins: first picnic on the big blanket' },
    { theme: 'muffins', at: day(-17), visibility: 'portal', fr: 'Atelier muffins : toute une équipe en cuisine !', en: 'Muffin workshop: quite the kitchen crew!' },
  ]
  for (const g of galleryDefs) {
    const data = await renderIllustration(g.theme)
    const doc = await payload.create({
      collection: 'gallery-photos',
      locale: 'fr',
      data: {
        caption: g.fr,
        takenAt: g.at,
        visibility: g.visibility,
        groups: g.groups,
        consentConfirmed: true,
        demoSeed: true,
        _status: 'published',
      },
      file: { data, mimetype: 'image/png', name: `demo-galerie-${g.theme}.png`, size: data.length },
    })
    await payload.update({
      collection: 'gallery-photos',
      id: doc.id,
      locale: 'en',
      data: { caption: g.en, _status: 'published' },
    })
  }

  // ---- Demo parent accounts (fictional families) ----
  const parentDefs = [
    { email: DEMO_PARENT_A_EMAIL, name: 'Famille Tremblay (démo)', language: 'fr' as const, groups: [papillons] },
    { email: DEMO_PARENT_B_EMAIL, name: 'Famille Nguyen (démo)', language: 'fr' as const, groups: [poussins, explorateurs] },
  ]
  for (const p of parentDefs) {
    await payload.create({
      collection: 'parents',
      data: { ...p, password: DEMO_PARENT_PASSWORD, active: true, demoSeed: true },
    })
  }

  // ---- Demo documents (tiny generated PDFs, clearly fictional) ----
  const docDefs = [
    { key: 'guide', fr: 'Guide des parents (démo)', en: 'Parent guide (demo)', category: 'guides' as const, audience: 'public' as const },
    {
      key: 'menu',
      fr: 'Menu des 4 prochaines semaines (démo)',
      en: 'Menu for the next 4 weeks (demo)',
      category: 'menus' as const,
      audience: 'public' as const,
      lines: [
        'Semaine 1 : potage de courge, macaroni au boeuf, tofu croustillant, pain de saumon, omelette du jardin.',
        'Semaine 2 : soupe alphabet, poulet au citron, chili doux vegetarien, couscous aux legumes, quesadillas.',
        'Semaine 3 : creme de brocoli, pates sauce rosee, boulettes de dinde, riz frit aux oeufs, pizza maison.',
        'Semaine 4 : soupe poulet et nouilles, saute de porc a l erable, dahl de lentilles, poisson pane maison, hachis.',
        'Collations : fruits frais, fromage, muffins maison, crudites et houmous, yogourt et granola.',
      ],
    },
    { key: 'maladie', fr: 'Politique en cas de maladie (démo)', en: 'Illness policy (demo)', category: 'politiques' as const, audience: 'portal' as const },
    { key: 'integration', fr: 'Politique d’intégration progressive (démo)', en: 'Gradual-integration policy (demo)', category: 'politiques' as const, audience: 'public' as const },
    { key: 'effets', fr: 'Liste des effets à apporter (démo)', en: 'What-to-bring checklist (demo)', category: 'guides' as const, audience: 'public' as const },
    { key: 'calendrier', fr: 'Calendrier annuel des fermetures (démo)', en: 'Annual closure calendar (demo)', category: 'general' as const, audience: 'public' as const },
    { key: 'regie', fr: 'Régie interne (démo)', en: 'Internal rules (demo)', category: 'politiques' as const, audience: 'portal' as const },
  ]
  const documentIdsByKey: Record<string, number> = {}
  for (const d of docDefs) {
    const pdf = makeDemoPdf(d.fr, 'lines' in d ? (d.lines as string[]) : [])
    const doc = await payload.create({
      collection: 'documents',
      locale: 'fr',
      data: { title: d.fr, category: d.category, audience: d.audience, demoSeed: true },
      file: {
        data: pdf,
        mimetype: 'application/pdf',
        name: `${d.key}-demo.pdf`,
        size: pdf.length,
      },
    })
    await payload.update({ collection: 'documents', id: doc.id, locale: 'en', data: { title: d.en } })
    documentIdsByKey[d.key] = doc.id as number
  }
  const menuDocId = documentIdsByKey['menu']
  const policyDocId = documentIdsByKey['maladie']

  // ---- Nutrition page (kitchen section) ----
  await payload.updateGlobal({
    slug: 'nutrition-page',
    locale: 'fr',
    data: {
      intro:
        'Chaque midi, une soixantaine de petites assiettes quittent notre cuisine — préparées sur place, le matin même, par une équipe qui connaît chaque allergie et chaque petit appétit. (Contenu de démonstration.)',
      philosophy: rt(
        'Notre philosophie tient en trois mots : frais, simple, ensemble. Frais, parce que tout est cuisiné sur place à partir d’aliments de base, en suivant le Guide alimentaire canadien et le cadre « Gazelle et Potiron ». Simple, parce que les enfants n’ont pas besoin d’assiettes compliquées — ils ont besoin de vrais aliments, présentés avec constance.',
        'Ensemble, parce que le repas est un moment d’apprentissage : on se sert soi-même, on goûte à son rythme, on jase — et personne n’est jamais forcé de finir son assiette. L’adulte décide de ce qui est offert ; l’enfant décide de la quantité qu’il mange.',
      ),
      weeklyMenu: [
        { day: 'Lundi', snackAm: 'Quartiers de pomme et fromage', lunch: 'Potage de courge, macaroni au bœuf et légumes, yogourt', snackPm: 'Muffin maison à la banane, lait' },
        { day: 'Mardi', snackAm: 'Crudités et houmous', lunch: 'Poulet au citron, riz, brocoli vapeur, compote maison', snackPm: 'Galettes d’avoine, lait' },
        { day: 'Mercredi', snackAm: 'Melon et bleuets', lunch: 'Chili doux végétarien, pain de blé, salade de concombre', snackPm: 'Yogourt et granola' },
        { day: 'Jeudi', snackAm: 'Bananes et céréales sèches', lunch: 'Pain de saumon, purée de pommes de terre, petits pois', snackPm: 'Fromage et craquelins' },
        { day: 'Vendredi', snackAm: 'Oranges en quartiers', lunch: 'Omelette du jardin, patates grelots rôties, salade de fruits', snackPm: 'Pouding au riz maison' },
      ],
      allergies: rt(
        'Le CPE est un milieu entièrement sans arachides et sans noix. Chaque allergie ou intolérance est consignée au dossier de l’enfant, affichée en cuisine avec photo, et communiquée à toute l’équipe — y compris les remplaçantes.',
        'Les enfants allergiques mangent le même repas que les autres, adapté : jamais un menu « à part ». Toute l’équipe est formée à l’administration de l’auto-injecteur, et les protocoles sont revus chaque année.',
        'Pour cette raison, aucune nourriture de la maison n’entre au CPE — y compris les gâteaux d’anniversaire (la cuisine prépare une surprise sécuritaire pour chaque fête).',
      ),
      menuDocument: menuDocId,
      photos: [img.repas, img.soupe, img.muffins],
    },
  })
  await payload.updateGlobal({
    slug: 'nutrition-page',
    locale: 'en',
    data: {
      intro:
        'Every noon, some sixty little plates leave our kitchen — prepared on site that very morning by a team that knows every allergy and every little appetite. (Demonstration content.)',
      philosophy: rt(
        'Our philosophy fits in three words: fresh, simple, together. Fresh, because everything is cooked on site from basic ingredients, following Canada’s Food Guide and the “Gazelle et Potiron” framework. Simple, because children do not need complicated plates — they need real food, offered consistently.',
        'Together, because mealtime is a learning moment: serving yourself, tasting at your own pace, chatting — and no one is ever forced to finish their plate. The adult decides what is offered; the child decides how much to eat.',
      ),
      weeklyMenu: [
        { day: 'Monday', snackAm: 'Apple wedges and cheese', lunch: 'Squash soup, beef and vegetable macaroni, yogurt', snackPm: 'Homemade banana muffin, milk' },
        { day: 'Tuesday', snackAm: 'Veggies and hummus', lunch: 'Lemon chicken, rice, steamed broccoli, homemade applesauce', snackPm: 'Oat cookies, milk' },
        { day: 'Wednesday', snackAm: 'Melon and blueberries', lunch: 'Mild vegetarian chili, whole-wheat bread, cucumber salad', snackPm: 'Yogurt and granola' },
        { day: 'Thursday', snackAm: 'Bananas and dry cereal', lunch: 'Salmon loaf, mashed potatoes, green peas', snackPm: 'Cheese and crackers' },
        { day: 'Friday', snackAm: 'Orange wedges', lunch: 'Garden omelette, roasted baby potatoes, fruit salad', snackPm: 'Homemade rice pudding' },
      ],
      allergies: rt(
        'The CPE is an entirely peanut- and nut-free environment. Every allergy or intolerance is recorded in the child’s file, posted in the kitchen with a photo, and shared with the whole team — including substitutes.',
        'Children with allergies eat the same meal as everyone else, adapted: never a menu “apart”. The entire team is trained in auto-injector administration, and protocols are reviewed yearly.',
        'For this reason, no food from home enters the CPE — including birthday cakes (the kitchen prepares a safe surprise for every celebration).',
      ),
    },
  })

  // ---- Announcements & news centre (every kind represented) ----
  console.log('Seeding news centre…')
  type AnnouncementSeed = {
    fr: { title: string; body: ReturnType<typeof rt> }
    en: { title: string; body: ReturnType<typeof rt> }
    kind: 'news' | 'event' | 'reminder' | 'holiday'
    scope: 'cpe' | 'groups'
    groups?: number[]
    pinned?: boolean
    archived?: boolean
    eventDate?: string
    publishAt?: string
    expiresAt?: string
    image?: number
    attachments?: number[]
  }

  const announcementDefs: AnnouncementSeed[] = [
    {
      kind: 'reminder',
      scope: 'cpe',
      pinned: true,
      fr: {
        title: 'Rappel : photos de groupe la semaine prochaine',
        body: rt('La photographe sera au CPE mardi prochain en avant-midi. Le formulaire de consentement doit être signé au préalable.'),
      },
      en: {
        title: 'Reminder: group photos next week',
        body: rt('The photographer will be at the CPE next Tuesday morning. The consent form must be signed beforehand.'),
      },
    },
    {
      kind: 'reminder',
      scope: 'groups',
      groups: [papillons],
      fr: {
        title: 'Papillons : chapeau obligatoire cette semaine',
        body: rt('Avec la vague de chaleur annoncée, merci de laisser un chapeau identifié au vestiaire de votre enfant toute la semaine.'),
      },
      en: {
        title: 'Papillons: hat required this week',
        body: rt('With the announced heat wave, please leave a labelled hat in your child’s cubby all week.'),
      },
    },
    {
      kind: 'news',
      scope: 'cpe',
      image: img.histoires,
      fr: {
        title: 'Bienvenue à Camille, nouvelle éducatrice (démo)',
        body: rt(
          'Nous accueillons Camille (personnage fictif de démonstration) dans l’équipe des Lapinots. Passionnée de littérature jeunesse, elle animera aussi l’heure du conte du vendredi.',
        ),
      },
      en: {
        title: 'Welcome Camille, our new educator (demo)',
        body: rt(
          'We welcome Camille (a fictional demonstration character) to the Lapinots team. Passionate about children’s literature, she will also lead Friday story time.',
        ),
      },
    },
    {
      kind: 'event',
      scope: 'cpe',
      eventDate: day(12),
      image: img.pique_nique,
      fr: {
        title: 'Pique-nique des familles au parc',
        body: rt(
          'Toutes les familles sont invitées à notre grand pique-nique annuel. Apportez votre couverture — le CPE fournit les collations et les jeux !',
        ),
      },
      en: {
        title: 'Family picnic at the park',
        body: rt(
          'All families are invited to our big annual picnic. Bring your blanket — the CPE provides snacks and games!',
        ),
      },
    },
    {
      kind: 'news',
      scope: 'cpe',
      attachments: [menuDocId],
      fr: {
        title: 'Nouveau menu de saison',
        body: rt('Le menu des quatre prochaines semaines est en ligne. Vous le trouverez aussi dans la section Documents.'),
      },
      en: {
        title: 'New seasonal menu',
        body: rt('The menu for the next four weeks is online. You will also find it in the Documents section.'),
      },
    },
    {
      kind: 'holiday',
      scope: 'cpe',
      expiresAt: day(35),
      fr: {
        title: 'Fermeture : journée pédagogique',
        body: rt('Le CPE sera fermé pour la journée pédagogique. Consultez le calendrier des fermetures pour l’année complète.'),
      },
      en: {
        title: 'Closure: pedagogical day',
        body: rt('The CPE will be closed for the pedagogical day. See the closure calendar for the full year.'),
      },
    },
    {
      // Scheduled in the future: parents must NOT see this one yet.
      kind: 'news',
      scope: 'cpe',
      publishAt: new Date(Date.now() + 7 * 86400000).toISOString(),
      fr: {
        title: 'Inscriptions à la sortie d’hiver (à venir)',
        body: rt('Les détails de la sortie d’hiver seront annoncés ici la semaine prochaine.'),
      },
      en: {
        title: 'Winter outing registration (coming up)',
        body: rt('Details of the winter outing will be announced here next week.'),
      },
    },
    {
      kind: 'event',
      scope: 'cpe',
      eventDate: day(24),
      image: img.fete,
      fr: {
        title: 'Kermesse d’été : familles bienvenues !',
        body: rt(
          'Jeux gonflables, maquillage, épluchette et limonade dans la cour, de 15 h 30 à 18 h. Confirmez votre présence sur la feuille au vestiaire — on prévoit les épis en conséquence !',
        ),
      },
      en: {
        title: 'Summer fair: families welcome!',
        body: rt(
          'Bouncy games, face painting, corn roast and lemonade in the yard, 3:30 to 6 p.m. Confirm on the sheet at the cubbies — we plan the corn accordingly!',
        ),
      },
    },
    {
      kind: 'news',
      scope: 'groups',
      groups: [poussins],
      image: img.pique_nique,
      fr: {
        title: 'Poussins : les photos du premier pique-nique sont en ligne',
        body: rt(
          'Les souvenirs du premier pique-nique des Poussins vous attendent dans la section Photos du portail. Bonne visite !',
        ),
      },
      en: {
        title: 'Poussins: first-picnic photos are online',
        body: rt(
          'Memories from the Poussins’ first picnic await you in the portal’s Photos section. Enjoy!',
        ),
      },
    },
    {
      // Archived: browsable in the portal archive section.
      kind: 'news',
      scope: 'cpe',
      archived: true,
      attachments: [policyDocId],
      fr: {
        title: 'Retour sur la rentrée',
        body: rt('Merci à toutes les familles pour une rentrée tout en douceur. La politique en cas de maladie mise à jour reste jointe pour référence.'),
      },
      en: {
        title: 'Looking back on the start of the year',
        body: rt('Thank you to every family for such a smooth start. The updated illness policy remains attached for reference.'),
      },
    },
  ]

  for (const a of announcementDefs) {
    const doc = await payload.create({
      collection: 'announcements',
      locale: 'fr',
      data: {
        title: a.fr.title,
        body: a.fr.body,
        kind: a.kind,
        scope: a.scope,
        groups: a.groups,
        pinned: a.pinned ?? false,
        archived: a.archived ?? false,
        eventDate: a.eventDate,
        publishAt: a.publishAt,
        expiresAt: a.expiresAt,
        image: a.image,
        attachments: a.attachments,
        demoSeed: true,
        _status: 'published',
      },
    })
    await payload.update({
      collection: 'announcements',
      id: doc.id,
      locale: 'en',
      data: { title: a.en.title, body: a.en.body, _status: 'published' },
    })
  }

  // ---- Email campaigns (draft + scheduled examples; nothing is sent by the seed) ----
  const campaignDraft = await payload.create({
    collection: 'email-campaigns',
    locale: 'fr',
    data: {
      title: 'Bienvenue de la nouvelle éducatrice (démo)',
      subject: 'Une nouvelle éducatrice se joint aux Lapinots',
      body: rt(
        'Bonjour,',
        'Nous sommes heureux d’accueillir Camille (personnage fictif de démonstration) dans l’équipe des Lapinots. Elle animera notamment l’heure du conte du vendredi.',
        'Tous les détails se trouvent dans le portail parents.',
      ),
      audience: 'all',
      status: 'draft',
      demoSeed: true,
    },
  })
  await payload.update({
    collection: 'email-campaigns',
    id: campaignDraft.id,
    locale: 'en',
    data: {
      subject: 'A new educator joins the Lapinots',
      body: rt(
        'Hello,',
        'We are delighted to welcome Camille (a fictional demonstration character) to the Lapinots team. Among other things, she will lead Friday story time.',
        'All the details are in the parent portal.',
      ),
    },
  })

  const campaignScheduled = await payload.create({
    collection: 'email-campaigns',
    locale: 'fr',
    data: {
      title: 'Rappel pique-nique (démo, planifiée)',
      subject: 'Rappel : pique-nique des familles ce samedi',
      body: rt(
        'Bonjour,',
        'Petit rappel : le grand pique-nique des familles a lieu ce samedi au parc. Apportez votre couverture — le CPE fournit collations et jeux !',
      ),
      audience: 'all',
      status: 'scheduled',
      scheduledAt: new Date(Date.now() + 2 * 86400000).toISOString(),
      demoSeed: true,
    },
  })
  await payload.update({
    collection: 'email-campaigns',
    id: campaignScheduled.id,
    locale: 'en',
    data: {
      subject: 'Reminder: family picnic this Saturday',
      body: rt(
        'Hello,',
        'A quick reminder: the big family picnic takes place this Saturday at the park. Bring your blanket — the CPE provides snacks and games!',
      ),
    },
  })

  console.log('')
  console.log('✔ Demo seed complete — « CPE La Voie lactée » (all content fictional, flagged demoSeed).')
  console.log('')
  console.log(`  Admin (demo director): ${DEMO_DIRECTOR_EMAIL}`)
  console.log(`  Password:              ${DEMO_DIRECTOR_PASSWORD}`)
  console.log('')
  console.log(`  Portal parent A (Papillons):            ${DEMO_PARENT_A_EMAIL}`)
  console.log(`  Portal parent B (Poussins+Explorateurs): ${DEMO_PARENT_B_EMAIL}`)
  console.log(`  Parent password:                        ${DEMO_PARENT_PASSWORD}`)
  console.log('')
  console.log('  Remove all demo content later with: npm run seed:clear')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
