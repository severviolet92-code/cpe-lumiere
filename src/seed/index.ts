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
import { renderIllustration } from './illustrations'
import { rt } from './richText'

const DEMO_DIRECTOR_EMAIL = 'direction@voielactee-demo.example'
const DEMO_DIRECTOR_PASSWORD = 'Lumiere-Demo-2026!'

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
    { fr: { name: 'Les Poussins', ageRange: '6 à 18 mois' }, en: { name: 'Les Poussins', ageRange: '6 to 18 months' }, color: 'miel' },
    { fr: { name: 'Les Lapinots', ageRange: '18 mois à 2 ans' }, en: { name: 'Les Lapinots', ageRange: '18 months to 2 years' }, color: 'ciel' },
    { fr: { name: 'Les Papillons', ageRange: '2 à 3 ans' }, en: { name: 'Les Papillons', ageRange: '2 to 3 years' }, color: 'lavande' },
    { fr: { name: 'Les Renardeaux', ageRange: '3 à 4 ans' }, en: { name: 'Les Renardeaux', ageRange: '3 to 4 years' }, color: 'terracotta' },
    { fr: { name: 'Les Explorateurs', ageRange: '4 à 5 ans' }, en: { name: 'Les Explorateurs', ageRange: '4 to 5 years' }, color: 'sauge' },
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
      meals: rt(
        'Tous les repas et collations sont préparés sur place. Les menus, affichés chaque semaine, suivent le Guide alimentaire canadien et sont adaptés aux allergies et intolérances de chaque enfant.',
        'Les poupons suivent leur propre horaire de boires et de purées, en continuité avec les habitudes de la maison.',
      ),
      activities: rt(
        'Peinture, bacs sensoriels, musique, yoga des petits, jardinage dans la cour et grandes marches d’exploration : nos activités varient au fil des saisons et suivent les intérêts des enfants.',
        'Chaque semaine comprend aussi des moments de psychomotricité en salle de motricité, pour bouger, grimper et sauter en toute sécurité.',
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
      meals: rt(
        'All meals and snacks are prepared on site. Weekly menus follow Canada’s Food Guide and are adapted to each child’s allergies and intolerances.',
        'Infants keep their own schedule of bottles and purées, in continuity with home routines.',
      ),
      activities: rt(
        'Painting, sensory bins, music, toddler yoga, gardening in the yard and long exploration walks: our activities change with the seasons and follow the children’s interests.',
        'Every week also includes gross-motor time in the motor-skills room — moving, climbing and jumping safely.',
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

  // ---- Closures ----
  const year = new Date().getFullYear()
  const closures = [
    { fr: 'Journée pédagogique', en: 'Pedagogical day', start: `${year}-08-21` },
    { fr: 'Fête du Travail', en: 'Labour Day', start: `${year}-09-07` },
    { fr: 'Action de grâce', en: 'Thanksgiving', start: `${year}-10-12` },
    { fr: 'Congé des Fêtes', en: 'Holiday break', start: `${year}-12-24`, end: `${year + 1}-01-04` },
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
  const team = [
    {
      name: 'Marie-Claude Demers (démo)',
      fr: { jobTitle: 'Directrice générale', bio: 'Éducatrice de formation, elle veille depuis quinze ans à ce que chaque famille se sente chez elle. (Profil fictif de démonstration.)' },
      en: { jobTitle: 'Executive Director', bio: 'An educator by training, she has spent fifteen years making sure every family feels at home. (Fictional demonstration profile.)' },
    },
    {
      name: 'Amina Berrada (démo)',
      fr: { jobTitle: 'Directrice adjointe', bio: 'Elle orchestre le quotidien du CPE — horaires, remplacements et mille petites attentions. (Profil fictif de démonstration.)' },
      en: { jobTitle: 'Assistant Director', bio: 'She orchestrates the CPE’s daily life — schedules, substitutions, and a thousand small kindnesses. (Fictional demonstration profile.)' },
    },
    {
      name: 'Julie Tremblay-Roy (démo)',
      fr: { jobTitle: 'Éducatrice — poupons', bio: 'Spécialiste des tout-petits, elle transforme chaque routine en moment de complicité. (Profil fictif de démonstration.)' },
      en: { jobTitle: 'Educator — infants', bio: 'A specialist of the very young, she turns every routine into a moment of connection. (Fictional demonstration profile.)' },
    },
    {
      name: 'Gabriel Sansregret (démo)',
      fr: { jobTitle: 'Cuisinier', bio: 'Derrière ses potages et ses muffins se cache la personne la plus populaire du CPE. (Profil fictif de démonstration.)' },
      en: { jobTitle: 'Cook', bio: 'Behind his soups and muffins hides the most popular person at the CPE. (Fictional demonstration profile.)' },
    },
  ]
  for (const [i, m] of team.entries()) {
    const doc = await payload.create({
      collection: 'staff-profiles',
      locale: 'fr',
      data: { name: m.name, ...m.fr, consent: true, order: i, demoSeed: true, _status: 'published' },
    })
    await payload.update({ collection: 'staff-profiles', id: doc.id, locale: 'en', data: { ...m.en, _status: 'published' } })
  }

  // ---- Job openings ----
  const jobs = [
    {
      schedule: 'full' as const,
      fr: {
        title: 'Éducatrice ou éducateur qualifié·e',
        description: rt(
          'Poste permanent à temps plein auprès du groupe des 3-4 ans. Nous cherchons une personne qualifiée (DEC ou AEC en éducation à l’enfance), douce et fiable. (Affichage de démonstration.)',
        ),
      },
      en: {
        title: 'Qualified educator',
        description: rt(
          'Permanent full-time position with the 3–4 year-old group. We are looking for a qualified person (DEC or AEC in early childhood education), gentle and reliable. (Demonstration posting.)',
        ),
      },
    },
    {
      schedule: 'sub' as const,
      fr: {
        title: 'Éducatrice ou éducateur — banque de remplacement',
        description: rt('Horaires variables selon vos disponibilités. Une belle porte d’entrée pour découvrir notre équipe. (Affichage de démonstration.)'),
      },
      en: {
        title: 'Educator — substitute bank',
        description: rt('Variable hours based on your availability. A great way to get to know our team. (Demonstration posting.)'),
      },
    },
  ]
  for (const j of jobs) {
    const doc = await payload.create({
      collection: 'job-openings',
      locale: 'fr',
      data: { ...j.fr, schedule: j.schedule, demoSeed: true, _status: 'published' },
    })
    await payload.update({ collection: 'job-openings', id: doc.id, locale: 'en', data: { ...j.en, _status: 'published' } })
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
  console.log('Seeding gallery…')
  const galleryDefs = [
    { theme: 'parc', at: day(-6), fr: 'Cerfs-volants au parc — que du vent et des sourires', en: 'Kites at the park — nothing but wind and smiles' },
    { theme: 'peinture', at: day(-12), fr: 'Nos artistes ont repeint le mois de juin', en: 'Our artists repainted the month of June' },
    { theme: 'jardinage', at: day(-19), fr: 'Les premières pousses du potager', en: 'The vegetable garden’s first sprouts' },
    { theme: 'musique', at: day(-26), fr: 'Fanfare improvisée dans la salle de motricité', en: 'Improvised fanfare in the motor-skills room' },
    { theme: 'histoires', at: day(-33), fr: 'L’heure du conte sous les étoiles en feutrine', en: 'Story time under felt stars' },
    { theme: 'motricite', at: day(-40), fr: 'Le grand parcours des petits champions', en: 'The little champions’ big course' },
  ]
  for (const g of galleryDefs) {
    const data = await renderIllustration(g.theme)
    const doc = await payload.create({
      collection: 'gallery-photos',
      locale: 'fr',
      data: {
        caption: g.fr,
        takenAt: g.at,
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

  // ---- Announcement ----
  const ann = await payload.create({
    collection: 'announcements',
    locale: 'fr',
    data: {
      title: 'Rappel : photos de groupe la semaine prochaine',
      body: rt('La photographe sera au CPE mardi prochain en avant-midi. Le formulaire de consentement doit être signé au préalable.'),
      scope: 'cpe',
      pinned: true,
      demoSeed: true,
      _status: 'published',
    },
  })
  await payload.update({
    collection: 'announcements',
    id: ann.id,
    locale: 'en',
    data: {
      title: 'Reminder: group photos next week',
      body: rt('The photographer will be at the CPE next Tuesday morning. The consent form must be signed beforehand.'),
      _status: 'published',
    },
  })

  console.log('')
  console.log('✔ Demo seed complete — « CPE La Voie lactée » (all content fictional, flagged demoSeed).')
  console.log('')
  console.log(`  Admin (demo director): ${DEMO_DIRECTOR_EMAIL}`)
  console.log(`  Password:              ${DEMO_DIRECTOR_PASSWORD}`)
  console.log('')
  console.log('  Remove all demo content later with: npm run seed:clear')
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
