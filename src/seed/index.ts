/**
 * Demo seed — ENTIRELY FICTIONAL content for the demo CPE « Les Lucioles ».
 * No real person, child, address, or CPE is referenced anywhere.
 * Every document is flagged `demoSeed: true`; remove it all with `npm run seed:clear`.
 */
import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { rt } from './richText'

const DEMO_DIRECTOR_EMAIL = 'direction@lucioles-demo.example'
const DEMO_DIRECTOR_PASSWORD = 'Lumiere-Demo-2026!'

async function run() {
  const payload = await getPayload({ config })

  const existing = await payload.find({
    collection: 'groups',
    where: { demoSeed: { equals: true } },
    limit: 1,
  })
  if (existing.docs.length > 0) {
    console.log('Demo seed already present — nothing to do. Run `npm run seed:clear` first to re-seed.')
    process.exit(0)
  }

  console.log('Seeding fictional demo content…')

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
    groupIds.push(doc.id)
  }

  // ---- Site settings ----
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'fr',
    data: {
      cpeName: 'CPE Les Lucioles',
      tagline: 'Un petit monde chaleureux où l’on grandit entouré de lumière.',
      phone: '418 555-0123',
      email: 'bonjour@lucioles-demo.example',
      address: '123, rue de l’Aubépine\nQuébec (Québec)  G1A 0A0',
      hours: 'Lundi au vendredi, de 7 h à 18 h',
      permitNote: 'CPE fictif de démonstration — contenu entièrement fictif.',
    },
  })
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'en',
    data: {
      tagline: 'A warm little world where children grow up surrounded by light.',
      hours: 'Monday to Friday, 7 a.m. to 6 p.m.',
      permitNote: 'Fictional demonstration CPE — all content is fictional.',
    },
  })

  // ---- Home page ----
  await payload.updateGlobal({
    slug: 'home-page',
    locale: 'fr',
    data: {
      heroTitle: 'Grandir ici, entouré de lumière.',
      heroSubtitle:
        'Un CPE chaleureux où chaque enfant, de 6 mois à 5 ans, découvre, joue et s’épanouit à son rythme — dans la confiance et la douceur.',
      introTitle: 'Un milieu de vie pensé pour les tout-petits',
      introText:
        'Chez Les Lucioles, les journées sont douces et bien rythmées : des éducatrices attentives, des locaux baignés de lumière et une cour où l’on explore en toute sécurité.',
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
        'A warm CPE where every child, from 6 months to 5 years, discovers, plays and blossoms at their own pace — with confidence and gentleness.',
      introTitle: 'A living environment designed for little ones',
      introText:
        'At Les Lucioles, days are gentle and well paced: attentive educators, light-filled rooms, and a yard made for safe exploring.',
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
        'Le CPE Les Lucioles accueille 60 enfants de 6 mois à 5 ans dans un bâtiment lumineux, à échelle d’enfant, où chaque espace a été pensé pour la découverte.',
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
        'Cinq locaux lumineux adaptés à chaque groupe d’âge, une salle de motricité, une cuisine sur place et une cour extérieure ombragée avec espaces distincts pour les poupons et les plus grands.',
      ),
    },
  })
  await payload.updateGlobal({
    slug: 'about-page',
    locale: 'en',
    data: {
      intro:
        'CPE Les Lucioles welcomes 60 children aged 6 months to 5 years in a bright, child-scaled building where every space was designed for discovery.',
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
        'Five bright rooms adapted to each age group, a motor-skills room, an on-site kitchen, and a shaded outdoor yard with separate areas for infants and older children.',
      ),
    },
  })

  // ---- Life page ----
  await payload.updateGlobal({
    slug: 'life-page',
    locale: 'fr',
    data: {
      intro:
        'Une journée aux Lucioles suit un rythme régulier et rassurant, ajusté à chaque groupe d’âge — voici à quoi elle ressemble pour les plus grands.',
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
        'Tous les repas et collations sont préparés sur place par notre cuisinière. Les menus, affichés chaque semaine, suivent le Guide alimentaire canadien et sont adaptés aux allergies et intolérances de chaque enfant.',
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
        'A day at Les Lucioles follows a steady, reassuring rhythm, adjusted for each age group — here is what it looks like for the older children.',
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
        'All meals and snacks are prepared on site by our cook. Weekly menus follow Canada’s Food Guide and are adapted to each child’s allergies and intolerances.',
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
        'Comme tous les CPE du Québec, Les Lucioles accueille les enfants à partir du guichet unique La Place 0-5. Voici comment cela fonctionne, sans mystère.',
      ),
      steps: [
        {
          title: 'Inscrivez votre enfant sur La Place 0-5',
          text: 'L’inscription au guichet unique est gratuite et peut se faire dès la grossesse. Sélectionnez les installations qui vous conviennent, dont le CPE Les Lucioles.',
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
        'Like every CPE in Québec, Les Lucioles admits children through the single waiting list La Place 0-5. Here is how it works — no mystery.',
      ),
      steps: [
        {
          title: 'Register your child on La Place 0-5',
          text: 'Registration on the single waiting list is free and can be done as early as pregnancy. Select the facilities that suit you, including CPE Les Lucioles.',
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
        'Travailler aux Lucioles, c’est rejoindre une petite équipe stable qui se soutient, dans un milieu où la qualité passe avant la cadence. Nous cherchons des personnes qui aiment profondément la petite enfance — et nous prenons soin d’elles.',
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
        'Working at Les Lucioles means joining a small, stable team that supports one another, in a place where quality comes before speed. We look for people who deeply love early childhood — and we take care of them.',
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
      fr: {
        question: 'Comment inscrire mon enfant au CPE ?',
        answer: rt(
          'Toutes les admissions passent par le guichet unique La Place 0-5 (laplace0-5.com). Inscrivez-y votre enfant gratuitement et sélectionnez le CPE Les Lucioles ; nous vous contactons directement lorsqu’une place correspondant à son âge se libère.',
        ),
      },
      en: {
        question: 'How do I register my child at the CPE?',
        answer: rt(
          'All admissions go through the single waiting list La Place 0-5 (laplace0-5.com). Register your child there for free and select CPE Les Lucioles; we contact you directly when a spot matching their age opens.',
        ),
      },
    },
    {
      category: 'admission',
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
      fr: {
        question: 'Quelles sont vos heures d’ouverture ?',
        answer: rt('Le CPE est ouvert du lundi au vendredi, de 7 h à 18 h.'),
      },
      en: {
        question: 'What are your opening hours?',
        answer: rt('The CPE is open Monday to Friday, 7 a.m. to 6 p.m.'),
      },
    },
    {
      category: 'sante',
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
  ] as const

  for (const [i, f] of faqs.entries()) {
    const doc = await payload.create({
      collection: 'faq-entries',
      locale: 'fr',
      data: {
        ...f.fr,
        category: f.category,
        audience: 'public',
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

  // ---- Closures (relative to today so the demo always shows upcoming dates) ----
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

  // ---- Team (fictional, consent flagged true for demo) ----
  const team = [
    {
      name: 'Marie-Claude Demers',
      fr: { jobTitle: 'Directrice générale', bio: 'Éducatrice de formation, elle veille depuis quinze ans à ce que chaque famille se sente chez elle aux Lucioles.' },
      en: { jobTitle: 'Executive Director', bio: 'An educator by training, she has spent fifteen years making sure every family feels at home at Les Lucioles.' },
    },
    {
      name: 'Amina Berrada',
      fr: { jobTitle: 'Directrice adjointe', bio: 'Elle orchestre le quotidien du CPE — horaires, remplacements et mille petites attentions.' },
      en: { jobTitle: 'Assistant Director', bio: 'She orchestrates the CPE’s daily life — schedules, substitutions, and a thousand small kindnesses.' },
    },
    {
      name: 'Julie Tremblay-Roy',
      fr: { jobTitle: 'Éducatrice — poupons', bio: 'Spécialiste des tout-petits, elle transforme chaque routine en moment de complicité.' },
      en: { jobTitle: 'Educator — infants', bio: 'A specialist of the very young, she turns every routine into a moment of connection.' },
    },
    {
      name: 'Gabriel Sansregret',
      fr: { jobTitle: 'Cuisinier', bio: 'Derrière ses potages et ses muffins se cache la personne la plus populaire du CPE.' },
      en: { jobTitle: 'Cook', bio: 'Behind his soups and muffins hides the most popular person at the CPE.' },
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
          'Poste permanent à temps plein auprès du groupe des 3-4 ans. Nous cherchons une personne qualifiée (DEC ou AEC en éducation à l’enfance), douce et fiable, qui a envie de s’installer durablement dans une équipe qui se soutient.',
        ),
      },
      en: {
        title: 'Qualified educator',
        description: rt(
          'Permanent full-time position with the 3–4 year-old group. We are looking for a qualified person (DEC or AEC in early childhood education), gentle and reliable, ready to settle into a team that supports one another.',
        ),
      },
    },
    {
      schedule: 'sub' as const,
      fr: {
        title: 'Éducatrice ou éducateur — banque de remplacement',
        description: rt(
          'Horaires variables selon vos disponibilités. Une belle porte d’entrée pour découvrir notre équipe et notre milieu.',
        ),
      },
      en: {
        title: 'Educator — substitute bank',
        description: rt(
          'Variable hours based on your availability. A great way to get to know our team and our environment.',
        ),
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

  // ---- Sample activities & announcements (admin/portal demo only — never public) ----
  const in7 = new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10)
  const in14 = new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10)

  const actA = await payload.create({
    collection: 'activities',
    locale: 'fr',
    data: {
      title: 'Journée de l’eau',
      groups: [groupIds[2], groupIds[3], groupIds[4]],
      date: in7,
      description: rt('Jeux d’eau dans la cour toute la matinée — prévoir de la crème solaire appliquée avant l’arrivée.'),
      checklist: [{ item: 'Maillot de bain' }, { item: 'Serviette' }, { item: 'Gourde d’eau' }, { item: 'Chapeau' }],
      demoSeed: true,
      _status: 'published',
    },
  })
  await payload.update({
    collection: 'activities',
    id: actA.id,
    locale: 'en',
    data: {
      title: 'Water Day',
      description: rt('Water games in the yard all morning — please apply sunscreen before arrival.'),
      checklist: [{ item: 'Swimsuit' }, { item: 'Towel' }, { item: 'Water bottle' }, { item: 'Hat' }],
      _status: 'published',
    },
  })

  const actB = await payload.create({
    collection: 'activities',
    locale: 'fr',
    data: {
      title: 'Pique-nique des Poussins au parc',
      groups: [groupIds[0], groupIds[1]],
      date: in14,
      description: rt('Petite sortie au parc voisin avec les poussettes — retour avant la sieste.'),
      checklist: [{ item: 'Chapeau' }, { item: 'Vêtements de rechange' }],
      demoSeed: true,
      _status: 'published',
    },
  })
  await payload.update({
    collection: 'activities',
    id: actB.id,
    locale: 'en',
    data: {
      title: 'Poussins picnic at the park',
      description: rt('A short stroller outing to the nearby park — back before nap time.'),
      checklist: [{ item: 'Hat' }, { item: 'Spare clothes' }],
      _status: 'published',
    },
  })

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
  console.log('✔ Demo seed complete (all documents flagged demoSeed: true).')
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
