import type { KBSeedArticle } from './types'

/** Inscription (admission) + Frais et paiements — fictional demo content. */
export const inscriptionFraisArticles: KBSeedArticle[] = [
  // ---------------- Inscription ----------------
  {
    category: 'Inscription',
    audience: 'public',
    fr: {
      question: 'Comment inscrire mon enfant au CPE ?',
      answer: [
        'Toutes les admissions passent par le guichet unique La Place 0-5 (laplace0-5.com). Inscrivez-y votre enfant gratuitement et sélectionnez le CPE La Voie lactée parmi vos choix.',
        'Lorsqu’une place correspondant à l’âge de votre enfant se libère, nous vous contactons directement — inutile de nous relancer.',
      ],
      keywords: ['inscription', 'inscrire', 'admission', 'la place 0-5', 'guichet'],
    },
    en: {
      question: 'How do I register my child at the CPE?',
      answer: [
        'All admissions go through the single waiting list La Place 0-5 (laplace0-5.com). Register your child there for free and select CPE La Voie lactée among your choices.',
        'When a spot matching your child’s age opens, we contact you directly — no need to follow up.',
      ],
      keywords: ['register', 'registration', 'admission', 'la place 0-5', 'waiting list'],
    },
  },
  {
    category: 'Inscription',
    audience: 'public',
    fr: {
      question: 'À partir de quel âge accueillez-vous les enfants ?',
      answer: ['Nous accueillons les enfants de 6 mois jusqu’à leur entrée à la maternelle, vers 5 ans. Cinq groupes couvrent chaque tranche d’âge.'],
      keywords: ['âge', 'bébé', 'poupon', 'maternelle', '6 mois'],
    },
    en: {
      question: 'From what age do you welcome children?',
      answer: ['We welcome children from 6 months old until they start kindergarten, around age 5. Five groups cover each age range.'],
      keywords: ['age', 'baby', 'infant', 'kindergarten', '6 months'],
    },
  },
  {
    category: 'Inscription',
    audience: 'public',
    fr: {
      question: 'Quand devrais-je inscrire mon enfant sur La Place 0-5 ?',
      answer: [
        'Le plus tôt possible — l’inscription peut se faire dès la grossesse. La date d’inscription influence l’ordre de la liste d’attente, et les délais peuvent être longs, surtout pour la pouponnière.',
      ],
      keywords: ['quand', 'liste d’attente', 'grossesse', 'délai'],
    },
    en: {
      question: 'When should I put my child on La Place 0-5?',
      answer: [
        'As early as possible — you can register during pregnancy. The registration date affects your position on the waiting list, and waits can be long, especially for the infant room.',
      ],
      keywords: ['when', 'waiting list', 'pregnancy', 'delay'],
    },
  },
  {
    category: 'Inscription',
    audience: 'public',
    fr: {
      question: 'L’inscription sur La Place 0-5 est-elle payante ?',
      answer: ['Non. L’inscription au guichet unique La Place 0-5 est entièrement gratuite, en tout temps. Méfiez-vous de tout site qui demanderait des frais.'],
      keywords: ['gratuit', 'payant', 'frais d’inscription', 'coût'],
    },
    en: {
      question: 'Does registering on La Place 0-5 cost anything?',
      answer: ['No. Registration on the single waiting list La Place 0-5 is entirely free, at all times. Beware of any site that asks for fees.'],
      keywords: ['free', 'cost', 'registration fee', 'price'],
    },
  },
  {
    category: 'Inscription',
    audience: 'public',
    fr: {
      question: 'Comment fonctionne la liste d’attente ?',
      answer: [
        'Les places sont offertes à partir de la liste du guichet unique, selon notre politique d’admission : priorité aux fratries d’enfants déjà inscrits et aux transferts internes, puis selon la date d’inscription et l’âge requis pour le groupe où une place se libère.',
      ],
      keywords: ['liste d’attente', 'priorité', 'rang', 'attente'],
    },
    en: {
      question: 'How does the waiting list work?',
      answer: [
        'Spots are offered from the single waiting list according to our admission policy: priority to siblings of enrolled children and internal transfers, then by registration date and the age required for the group where a spot opens.',
      ],
      keywords: ['waiting list', 'priority', 'rank', 'wait'],
    },
  },
  {
    category: 'Inscription',
    audience: 'public',
    fr: {
      question: 'Les fratries ont-elles priorité ?',
      answer: [
        'Oui. Les frères et sœurs d’enfants déjà inscrits au CPE ont priorité selon notre politique d’admission. Mentionnez la fratrie à la direction pour que votre dossier soit repéré au guichet.',
      ],
      keywords: ['fratrie', 'frère', 'sœur', 'priorité', 'deuxième enfant'],
    },
    en: {
      question: 'Do siblings get priority?',
      answer: [
        'Yes. Brothers and sisters of children already enrolled have priority under our admission policy. Tell the direction about the sibling so your file is flagged on the waiting list.',
      ],
      keywords: ['sibling', 'brother', 'sister', 'priority', 'second child'],
    },
  },
  {
    category: 'Inscription',
    audience: 'public',
    fr: {
      question: 'Puis-je visiter le CPE avant d’accepter une place ?',
      answer: [
        'Oui — c’est même une étape prévue. Avant l’entrée de votre enfant, nous vous invitons à visiter les lieux, rencontrer l’équipe et poser toutes vos questions. Les visites se font sur rendez-vous pour ne pas perturber les groupes.',
      ],
      keywords: ['visite', 'visiter', 'rendez-vous', 'rencontre'],
    },
    en: {
      question: 'Can I visit the CPE before accepting a spot?',
      answer: [
        'Yes — it is a planned step. Before your child starts, we invite you to visit, meet the team and ask all your questions. Visits are by appointment so groups are not disrupted.',
      ],
      keywords: ['visit', 'tour', 'appointment', 'meeting'],
    },
  },
  {
    category: 'Inscription',
    audience: 'public',
    fr: {
      question: 'Quels documents dois-je fournir à l’inscription ?',
      answer: [
        'À la signature de l’entente de services : le certificat de naissance de l’enfant, son carnet de vaccination, les coordonnées complètes des parents et des personnes autorisées, et tout document médical pertinent (allergies, conditions particulières).',
      ],
      keywords: ['documents', 'certificat de naissance', 'vaccination', 'dossier'],
    },
    en: {
      question: 'What documents do I need to provide at registration?',
      answer: [
        'When signing the service agreement: the child’s birth certificate, vaccination record, full contact details for parents and authorized persons, and any relevant medical document (allergies, particular conditions).',
      ],
      keywords: ['documents', 'birth certificate', 'vaccination', 'file'],
    },
  },
  {
    category: 'Inscription',
    audience: 'public',
    fr: {
      question: 'Comment se passe l’intégration progressive ?',
      answer: [
        'Les premiers jours se font en douceur : de courtes présences (une heure ou deux) qui s’allongent progressivement sur une à deux semaines, selon le rythme de votre enfant. Un parent reste disponible durant cette période.',
        'L’éducatrice de référence vous propose un horaire d’intégration personnalisé lors de la rencontre d’accueil.',
      ],
      keywords: ['intégration', 'adaptation', 'premiers jours', 'début'],
    },
    en: {
      question: 'How does gradual integration work?',
      answer: [
        'The first days are gentle: short visits (an hour or two) that gradually lengthen over one to two weeks, following your child’s pace. A parent stays available during this period.',
        'The reference educator proposes a personalized integration schedule at the welcome meeting.',
      ],
      keywords: ['integration', 'adaptation', 'first days', 'start'],
    },
  },
  {
    category: 'Inscription',
    audience: 'public',
    fr: {
      question: 'Mon enfant n’est pas propre : est-ce un problème pour l’inscription ?',
      answer: [
        'Pas du tout. L’apprentissage de la propreté fait partie du développement normal et nous accompagnons chaque enfant à son rythme, en continuité avec ce que vous faites à la maison. Aucun enfant n’est refusé pour cette raison.',
      ],
      keywords: ['propreté', 'couches', 'petit pot', 'toilette'],
    },
    en: {
      question: 'My child is not potty-trained — is that a problem for admission?',
      answer: [
        'Not at all. Toilet learning is part of normal development and we support each child at their own pace, in continuity with what you do at home. No child is refused for this reason.',
      ],
      keywords: ['potty', 'diapers', 'toilet training', 'potty-trained'],
    },
  },
  {
    category: 'Inscription',
    audience: 'public',
    fr: {
      question: 'Accueillez-vous les enfants à besoins particuliers ?',
      answer: [
        'Oui. Nous croyons à l’inclusion et travaillons avec les familles et les professionnels qui entourent l’enfant (CLSC, ergothérapeute, orthophoniste) pour préparer un accueil adapté. Parlez-en à la direction dès le premier contact pour que nous planifiions ensemble.',
      ],
      keywords: ['besoins particuliers', 'handicap', 'inclusion', 'intégration'],
    },
    en: {
      question: 'Do you welcome children with special needs?',
      answer: [
        'Yes. We believe in inclusion and work with the family and the professionals around the child (CLSC, occupational therapist, speech therapist) to prepare a suitable welcome. Mention it to the direction at first contact so we can plan together.',
      ],
      keywords: ['special needs', 'disability', 'inclusion', 'integration'],
    },
  },
  {
    category: 'Inscription',
    audience: 'public',
    fr: {
      question: 'Offrez-vous des places à temps partiel ?',
      answer: [
        'Notre offre est principalement à temps plein (5 jours). Des ententes à temps partiel peuvent exceptionnellement être envisagées lorsque deux familles peuvent se partager une place — informez-vous auprès de la direction. (Politique de démonstration.)',
      ],
      keywords: ['temps partiel', '3 jours', 'partage de place', 'mi-temps'],
    },
    en: {
      question: 'Do you offer part-time spots?',
      answer: [
        'Our offer is mainly full-time (5 days). Part-time arrangements can exceptionally be considered when two families can share a spot — ask the direction. (Demonstration policy.)',
      ],
      keywords: ['part-time', '3 days', 'shared spot', 'half-time'],
    },
  },
  {
    category: 'Inscription',
    audience: 'public',
    fr: {
      question: 'Dans quel groupe mon enfant sera-t-il placé ?',
      answer: [
        'Le groupe dépend de l’âge de l’enfant au moment de l’entrée : Les Poussins (6-18 mois), Les Lapinots (18 mois-2 ans), Les Papillons (2-3 ans), Les Renardeaux (3-4 ans) et Les Explorateurs (4-5 ans). Les passages d’un groupe à l’autre se font principalement à la rentrée d’automne.',
      ],
      keywords: ['groupe', 'classement', 'âge', 'poussins', 'explorateurs'],
    },
    en: {
      question: 'Which group will my child be placed in?',
      answer: [
        'The group depends on the child’s age at entry: Les Poussins (6-18 months), Les Lapinots (18 months-2 years), Les Papillons (2-3 years), Les Renardeaux (3-4 years) and Les Explorateurs (4-5 years). Group transitions happen mainly at the fall re-entry.',
      ],
      keywords: ['group', 'placement', 'age', 'poussins', 'explorateurs'],
    },
  },
  {
    category: 'Inscription',
    audience: 'public',
    fr: {
      question: 'Quel est le ratio éducatrice-enfants ?',
      answer: [
        'Nous respectons les ratios prescrits par le ministère de la Famille : 1 éducatrice pour 5 poupons, 1 pour 8 enfants de 18 mois à 4 ans, et 1 pour 10 enfants de 4-5 ans.',
      ],
      keywords: ['ratio', 'nombre d’enfants', 'éducatrice', 'encadrement'],
    },
    en: {
      question: 'What is the educator-to-child ratio?',
      answer: [
        'We follow the ratios set by the ministère de la Famille: 1 educator per 5 infants, 1 per 8 children aged 18 months to 4 years, and 1 per 10 children aged 4-5.',
      ],
      keywords: ['ratio', 'number of children', 'educator', 'supervision'],
    },
  },
  {
    category: 'Inscription',
    audience: 'public',
    fr: {
      question: 'Puis-je choisir l’éducatrice de mon enfant ?',
      answer: [
        'Les enfants sont regroupés par âge et chaque groupe a son éducatrice attitrée ; il n’est donc pas possible de choisir. Chaque enfant bénéficie toutefois d’une éducatrice de référence stable qui apprend à bien le connaître.',
      ],
      keywords: ['choisir', 'éducatrice', 'référence', 'attitrée'],
    },
    en: {
      question: 'Can I choose my child’s educator?',
      answer: [
        'Children are grouped by age and each group has its assigned educator, so choosing is not possible. Every child does, however, have a stable reference educator who gets to know them well.',
      ],
      keywords: ['choose', 'educator', 'reference', 'assigned'],
    },
  },
  {
    category: 'Inscription',
    audience: 'public',
    fr: {
      question: 'Que se passe-t-il si je refuse une place offerte ?',
      answer: [
        'Vous pouvez refuser une offre sans perdre votre inscription au guichet, mais votre dossier pourrait redescendre dans la liste selon les règles de La Place 0-5. Si votre situation a changé, pensez à mettre vos choix à jour.',
      ],
      keywords: ['refuser', 'offre', 'place offerte', 'refus'],
    },
    en: {
      question: 'What happens if I decline an offered spot?',
      answer: [
        'You can decline an offer without losing your waiting-list registration, but your file may move down the list under La Place 0-5 rules. If your situation changed, remember to update your choices.',
      ],
      keywords: ['decline', 'offer', 'refuse', 'spot'],
    },
  },
  {
    category: 'Inscription',
    audience: 'public',
    fr: {
      question: 'Acceptez-vous les enfants en cours d’année ?',
      answer: [
        'Oui, dès qu’une place se libère dans le groupe correspondant à l’âge de l’enfant — les départs en cours d’année sont rares mais possibles. La majorité des entrées se font toutefois à la rentrée d’automne.',
      ],
      keywords: ['cours d’année', 'entrée', 'janvier', 'place libre'],
    },
    en: {
      question: 'Do you accept children mid-year?',
      answer: [
        'Yes, as soon as a spot opens in the group matching the child’s age — mid-year departures are rare but possible. Most entries still happen at the fall re-entry.',
      ],
      keywords: ['mid-year', 'entry', 'january', 'open spot'],
    },
  },
  {
    category: 'Inscription',
    audience: 'public',
    fr: {
      question: 'Comment résilier l’entente de services si nous partons ?',
      answer: [
        'Un avis écrit est demandé au moins deux semaines à l’avance. La résiliation suit les règles de la Loi sur la protection du consommateur — aucun frais de pénalité abusif ne peut être exigé. Les détails figurent dans votre entente de services. (Politique de démonstration.)',
      ],
      keywords: ['résiliation', 'départ', 'quitter', 'annuler', 'préavis'],
    },
    en: {
      question: 'How do I terminate the service agreement if we leave?',
      answer: [
        'Written notice is requested at least two weeks in advance. Termination follows Québec consumer-protection rules — no abusive penalty can be charged. Details are in your service agreement. (Demonstration policy.)',
      ],
      keywords: ['termination', 'leaving', 'cancel', 'notice'],
    },
  },
  {
    category: 'Inscription',
    audience: 'public',
    fr: {
      question: 'Mon enfant fréquente un autre milieu : puis-je transférer au CPE ?',
      answer: [
        'Oui. Gardez votre inscription active sur La Place 0-5 avec le CPE La Voie lactée dans vos choix : nous offrons les places selon la liste, peu importe le milieu actuel de l’enfant.',
      ],
      keywords: ['transfert', 'changement', 'garderie', 'milieu familial'],
    },
    en: {
      question: 'My child attends another daycare — can we transfer to the CPE?',
      answer: [
        'Yes. Keep your registration active on La Place 0-5 with CPE La Voie lactée among your choices: we offer spots from the list regardless of the child’s current setting.',
      ],
      keywords: ['transfer', 'change', 'daycare', 'home daycare'],
    },
  },
  {
    category: 'Inscription',
    audience: 'public',
    fr: {
      question: 'Y a-t-il une rencontre avant la première journée ?',
      answer: [
        'Oui — une rencontre d’accueil est prévue avec la direction et l’éducatrice de référence : visite des lieux, présentation des routines, remise du guide des parents et planification de l’intégration progressive.',
      ],
      keywords: ['rencontre', 'accueil', 'première journée', 'préparation'],
    },
    en: {
      question: 'Is there a meeting before the first day?',
      answer: [
        'Yes — a welcome meeting is planned with the direction and the reference educator: tour of the facility, overview of routines, the parent guide, and planning of the gradual integration.',
      ],
      keywords: ['meeting', 'welcome', 'first day', 'preparation'],
    },
  },
  {
    category: 'Inscription',
    audience: 'portal',
    fr: {
      question: 'Comment préparer la transition de mon enfant vers le groupe suivant ?',
      answer: [
        'Quelques semaines avant le passage, l’enfant fait de courtes visites dans son futur local avec son éducatrice actuelle. Vous recevrez une communication détaillée avant chaque transition, et une rencontre peut être organisée avec la nouvelle éducatrice sur demande.',
      ],
      keywords: ['transition', 'changement de groupe', 'passage', 'nouveau local'],
    },
    en: {
      question: 'How do you prepare my child’s move to the next group?',
      answer: [
        'A few weeks before the move, the child makes short visits to their future room with their current educator. You will receive detailed communication before each transition, and a meeting with the new educator can be arranged on request.',
      ],
      keywords: ['transition', 'group change', 'move', 'new room'],
    },
  },
  {
    category: 'Inscription',
    audience: 'public',
    fr: {
      question: 'Préparez-vous les enfants pour la maternelle ?',
      answer: [
        'Oui. Chez Les Explorateurs (4-5 ans), tout le programme vise l’autonomie : s’habiller seul, prendre soin de ses choses, jouer en groupe, développer le langage et la motricité fine. Nous suivons le dossier éducatif de l’enfant, transmis aux parents avant l’entrée scolaire.',
      ],
      keywords: ['maternelle', 'école', 'préparation', 'autonomie'],
    },
    en: {
      question: 'Do you prepare children for kindergarten?',
      answer: [
        'Yes. In the Explorateurs group (4-5), the whole program targets autonomy: dressing alone, caring for belongings, playing in a group, developing language and fine motor skills. We maintain the child’s educational file, shared with parents before school entry.',
      ],
      keywords: ['kindergarten', 'school', 'preparation', 'autonomy'],
    },
  },
  {
    category: 'Inscription',
    audience: 'public',
    fr: {
      question: 'Qu’est-ce que le dossier éducatif de l’enfant ?',
      answer: [
        'C’est un portrait périodique du développement de votre enfant, prévu par la loi : deux fois par année, l’éducatrice y consigne ses observations sur les différents domaines de développement. Il vous est remis et expliqué, et il vous appartient.',
      ],
      keywords: ['dossier éducatif', 'portrait', 'développement', 'observation'],
    },
    en: {
      question: 'What is the child’s educational file?',
      answer: [
        'It is a periodic portrait of your child’s development, required by law: twice a year, the educator records observations across the developmental domains. It is given to you, explained, and belongs to you.',
      ],
      keywords: ['educational file', 'portrait', 'development', 'observation'],
    },
  },
  {
    category: 'Inscription',
    audience: 'public',
    fr: {
      question: 'Le CPE est-il titulaire d’un permis du ministère ?',
      answer: [
        'Oui — comme tout CPE, La Voie lactée détient un permis du ministère de la Famille, est inspecté régulièrement et est administré par un conseil d’administration composé majoritairement de parents. (Mention de démonstration.)',
      ],
      keywords: ['permis', 'ministère', 'inspection', 'conseil d’administration'],
    },
    en: {
      question: 'Is the CPE licensed by the ministry?',
      answer: [
        'Yes — like every CPE, La Voie lactée holds a permit from the ministère de la Famille, is inspected regularly, and is governed by a board of directors with a parent majority. (Demonstration note.)',
      ],
      keywords: ['permit', 'license', 'ministry', 'inspection', 'board'],
    },
  },

  // ---------------- Frais et paiements ----------------
  {
    category: 'Frais et paiements',
    audience: 'public',
    fr: {
      question: 'Quel est le tarif quotidien ?',
      answer: [
        'Le CPE offre des places à contribution réduite : le tarif de base quotidien est fixé et indexé chaque année par le gouvernement du Québec. Il couvre la garde, les repas, les collations et les activités régulières.',
      ],
      keywords: ['tarif', 'prix', 'coût', 'contribution réduite', 'combien'],
    },
    en: {
      question: 'What is the daily rate?',
      answer: [
        'The CPE offers reduced-contribution spots: the basic daily rate is set and indexed yearly by the Québec government. It covers care, meals, snacks and regular activities.',
      ],
      keywords: ['rate', 'price', 'cost', 'reduced contribution', 'how much'],
    },
  },
  {
    category: 'Frais et paiements',
    audience: 'public',
    fr: {
      question: 'Quels modes de paiement acceptez-vous ?',
      answer: [
        'Le paiement se fait par prélèvement bancaire préautorisé (recommandé) ou par chèque. Les modalités exactes sont établies à la signature de l’entente de services. (Modalités de démonstration.)',
      ],
      keywords: ['paiement', 'prélèvement', 'chèque', 'virement'],
    },
    en: {
      question: 'What payment methods do you accept?',
      answer: [
        'Payment is by pre-authorized bank debit (recommended) or by cheque. Exact terms are set when signing the service agreement. (Demonstration terms.)',
      ],
      keywords: ['payment', 'debit', 'cheque', 'transfer'],
    },
  },
  {
    category: 'Frais et paiements',
    audience: 'public',
    fr: {
      question: 'Quand recevrai-je mon relevé 24 pour les impôts ?',
      answer: [
        'Le relevé 24 (frais de garde) est remis à chaque famille au plus tard le dernier jour de février pour l’année précédente. Il est déposé dans la section Documents du portail parents et envoyé par courriel.',
      ],
      keywords: ['relevé 24', 'impôts', 'reçu fiscal', 'déclaration'],
    },
    en: {
      question: 'When will I get my Relevé 24 for taxes?',
      answer: [
        'The Relevé 24 (childcare expenses) is issued to every family by the last day of February for the previous year. It is posted in the Documents section of the parent portal and sent by email.',
      ],
      keywords: ['releve 24', 'taxes', 'tax receipt', 'return'],
    },
  },
  {
    category: 'Frais et paiements',
    audience: 'public',
    fr: {
      question: 'Dois-je payer les jours d’absence ou de vacances ?',
      answer: [
        'Oui — la contribution réduite est payable pour chaque jour prévu à l’entente, que l’enfant soit présent ou non (maladie, vacances). C’est la règle applicable à toutes les places subventionnées : la place demeure réservée à votre enfant.',
      ],
      keywords: ['absence', 'vacances', 'payer', 'maladie', 'remboursement'],
    },
    en: {
      question: 'Do I pay for absence or vacation days?',
      answer: [
        'Yes — the reduced contribution is payable for every day in the agreement, whether the child attends or not (illness, vacation). This is the rule for all subsidized spots: the spot remains reserved for your child.',
      ],
      keywords: ['absence', 'vacation', 'pay', 'sick day', 'refund'],
    },
  },
  {
    category: 'Frais et paiements',
    audience: 'public',
    fr: {
      question: 'Dois-je payer les jours fériés et les fermetures ?',
      answer: [
        'Les jours fériés prévus au calendrier sont payables comme des jours ordinaires. En cas de fermeture exceptionnelle décidée par le CPE (par exemple un bris majeur), les règles de l’entente de services s’appliquent. (Politique de démonstration.)',
      ],
      keywords: ['férié', 'fermeture', 'congé', 'payer'],
    },
    en: {
      question: 'Do I pay for statutory holidays and closures?',
      answer: [
        'Calendar statutory holidays are payable like ordinary days. For an exceptional closure decided by the CPE (e.g. a major breakdown), the service-agreement rules apply. (Demonstration policy.)',
      ],
      keywords: ['holiday', 'closure', 'pay', 'statutory'],
    },
  },
  {
    category: 'Frais et paiements',
    audience: 'public',
    fr: {
      question: 'Y a-t-il des frais supplémentaires en plus du tarif de base ?',
      answer: [
        'Le tarif couvre l’essentiel : repas, collations, matériel et activités régulières. Seuls des extras optionnels clairement annoncés (photo scolaire, certaines grandes sorties) peuvent entraîner un coût additionnel, toujours communiqué à l’avance — jamais d’obligation.',
      ],
      keywords: ['frais supplémentaires', 'extra', 'sortie', 'coût additionnel'],
    },
    en: {
      question: 'Are there extra fees beyond the basic rate?',
      answer: [
        'The rate covers the essentials: meals, snacks, materials and regular activities. Only clearly announced optional extras (school photo, certain big outings) may cost more, always communicated in advance — never mandatory.',
      ],
      keywords: ['extra fees', 'extras', 'outing', 'additional cost'],
    },
  },
  {
    category: 'Frais et paiements',
    audience: 'public',
    fr: {
      question: 'Que se passe-t-il si je viens chercher mon enfant après 18 h ?',
      answer: [
        'Des frais de retard s’appliquent après l’heure de fermeture, selon la politique remise à l’inscription. En cas d’imprévu, appelez-nous : l’important est que l’équipe sache quand vous arriverez et que votre enfant soit rassuré. (Politique de démonstration.)',
      ],
      keywords: ['retard', 'frais de retard', '18 h', 'fermeture'],
    },
    en: {
      question: 'What happens if I pick up my child after 6 p.m.?',
      answer: [
        'Late fees apply after closing time, per the policy provided at registration. If something unexpected happens, call us: what matters is that the team knows when you will arrive and that your child is reassured. (Demonstration policy.)',
      ],
      keywords: ['late', 'late fee', '6 pm', 'closing'],
    },
  },
  {
    category: 'Frais et paiements',
    audience: 'public',
    fr: {
      question: 'Le tarif est-il admissible aux crédits d’impôt ?',
      answer: [
        'La contribution réduite de base n’est pas admissible au crédit d’impôt pour frais de garde (elle est déjà subventionnée). Le relevé 24 que nous émettons indique les montants admissibles, le cas échéant. Consultez Revenu Québec ou votre comptable pour votre situation.',
      ],
      keywords: ['crédit d’impôt', 'déduction', 'revenu québec', 'admissible'],
    },
    en: {
      question: 'Is the rate eligible for tax credits?',
      answer: [
        'The basic reduced contribution is not eligible for the childcare tax credit (it is already subsidized). The Relevé 24 we issue shows eligible amounts, if any. Check with Revenu Québec or your accountant for your situation.',
      ],
      keywords: ['tax credit', 'deduction', 'revenu quebec', 'eligible'],
    },
  },
  {
    category: 'Frais et paiements',
    audience: 'portal',
    fr: {
      question: 'Comment modifier mes informations bancaires pour le prélèvement ?',
      answer: [
        'Écrivez à l’administration ou passez au bureau avec un spécimen de chèque ou un formulaire de votre institution. Le changement prend effet au cycle de prélèvement suivant.',
      ],
      keywords: ['banque', 'prélèvement', 'compte', 'spécimen'],
    },
    en: {
      question: 'How do I update my banking information for the debit?',
      answer: [
        'Write to the administration or stop by the office with a void cheque or a form from your bank. The change takes effect at the next debit cycle.',
      ],
      keywords: ['bank', 'debit', 'account', 'void cheque'],
    },
  },
  {
    category: 'Frais et paiements',
    audience: 'portal',
    fr: {
      question: 'Que faire si un prélèvement a échoué ?',
      answer: [
        'Communiquez rapidement avec l’administration pour convenir d’une reprise. Des frais bancaires peuvent s’appliquer en cas de provision insuffisante, selon l’entente de services. (Politique de démonstration.)',
      ],
      keywords: ['prélèvement échoué', 'provision', 'nsf', 'paiement refusé'],
    },
    en: {
      question: 'What if a debit payment failed?',
      answer: [
        'Contact the administration quickly to arrange a retry. Bank fees may apply for insufficient funds, per the service agreement. (Demonstration policy.)',
      ],
      keywords: ['failed payment', 'nsf', 'insufficient funds', 'declined'],
    },
  },
  {
    category: 'Frais et paiements',
    audience: 'public',
    fr: {
      question: 'Le deuxième enfant bénéficie-t-il d’un rabais ?',
      answer: [
        'La contribution réduite est la même pour chaque enfant — c’est le programme gouvernemental qui la fixe. Certains programmes d’aide gouvernementaux peuvent toutefois s’appliquer à votre famille ; renseignez-vous auprès de Retraite Québec et de Revenu Québec.',
      ],
      keywords: ['rabais', 'deuxième enfant', 'fratrie', 'réduction'],
    },
    en: {
      question: 'Is there a discount for a second child?',
      answer: [
        'The reduced contribution is the same for each child — the government program sets it. Some government assistance programs may apply to your family; check with Retraite Québec and Revenu Québec.',
      ],
      keywords: ['discount', 'second child', 'sibling', 'reduction'],
    },
  },
  {
    category: 'Frais et paiements',
    audience: 'public',
    fr: {
      question: 'Quand la facturation est-elle émise ?',
      answer: [
        'La facturation est mensuelle : un état de compte est déposé dans le portail parents au début de chaque mois pour le mois courant, et le prélèvement a lieu à la date convenue à l’entente. (Modalités de démonstration.)',
      ],
      keywords: ['facture', 'état de compte', 'mensuel', 'facturation'],
    },
    en: {
      question: 'When are invoices issued?',
      answer: [
        'Billing is monthly: a statement is posted in the parent portal at the start of each month for the current month, and the debit happens on the date agreed in the agreement. (Demonstration terms.)',
      ],
      keywords: ['invoice', 'statement', 'monthly', 'billing'],
    },
  },
  {
    category: 'Frais et paiements',
    audience: 'public',
    fr: {
      question: 'Qu’arrive-t-il en cas de retard de paiement ?',
      answer: [
        'Nous communiquons d’abord avec vous pour comprendre la situation et convenir d’une entente. En cas de défaut répété et sans entente, l’entente de services peut être résiliée selon les règles applicables — c’est toujours le dernier recours. Parlez-nous tôt de toute difficulté.',
      ],
      keywords: ['retard de paiement', 'défaut', 'entente', 'difficulté'],
    },
    en: {
      question: 'What happens if a payment is late?',
      answer: [
        'We first reach out to understand the situation and agree on an arrangement. In case of repeated default with no arrangement, the service agreement can be terminated under applicable rules — always the last resort. Talk to us early about any difficulty.',
      ],
      keywords: ['late payment', 'default', 'arrangement', 'difficulty'],
    },
  },
  {
    category: 'Frais et paiements',
    audience: 'public',
    fr: {
      question: 'Les sorties spéciales sont-elles incluses dans le tarif ?',
      answer: [
        'La plupart des sorties sont entièrement couvertes par le CPE. Pour de rares grandes sorties (transport en autobus, site payant), une contribution volontaire peut être demandée — toujours annoncée à l’avance, et aucun enfant n’est exclu pour des raisons financières.',
      ],
      keywords: ['sortie', 'autobus', 'coût sortie', 'contribution'],
    },
    en: {
      question: 'Are special outings included in the rate?',
      answer: [
        'Most outings are fully covered by the CPE. For rare big outings (bus transport, paid site), a voluntary contribution may be requested — always announced in advance, and no child is ever excluded for financial reasons.',
      ],
      keywords: ['outing', 'bus', 'outing cost', 'contribution'],
    },
  },
  {
    category: 'Frais et paiements',
    audience: 'public',
    fr: {
      question: 'Fournissez-vous les couches ou dois-je les apporter ?',
      answer: [
        'Les parents fournissent les couches, la crème de change et, s’il y a lieu, le lait maternisé. Le CPE fournit les gants, débarbouillettes et tout le reste du matériel d’hygiène. (Politique de démonstration.)',
      ],
      keywords: ['couches', 'crème', 'fournir', 'lait'],
    },
    en: {
      question: 'Do you provide diapers or do I bring them?',
      answer: [
        'Parents provide diapers, diaper cream and, if applicable, formula. The CPE provides gloves, washcloths and all other hygiene supplies. (Demonstration policy.)',
      ],
      keywords: ['diapers', 'cream', 'provide', 'formula'],
    },
  },
  {
    category: 'Frais et paiements',
    audience: 'public',
    fr: {
      question: 'Comment obtenir une copie d’un reçu ou d’un état de compte ?',
      answer: [
        'Tous vos documents financiers (états de compte, relevé 24) sont déposés dans la section Documents du portail parents. Pour une copie antérieure ou un duplicata, écrivez à l’administration — nous répondons en quelques jours ouvrables.',
      ],
      keywords: ['reçu', 'copie', 'duplicata', 'état de compte'],
    },
    en: {
      question: 'How do I get a copy of a receipt or statement?',
      answer: [
        'All your financial documents (statements, Relevé 24) are posted in the Documents section of the parent portal. For an older copy or a duplicate, write to the administration — we reply within a few business days.',
      ],
      keywords: ['receipt', 'copy', 'duplicate', 'statement'],
    },
  },
  {
    category: 'Frais et paiements',
    audience: 'public',
    fr: {
      question: 'La contribution réduite change-t-elle selon mon revenu ?',
      answer: [
        'Non — dans le réseau des CPE, la contribution réduite de base est la même pour toutes les familles, peu importe le revenu. Elle est fixée par le gouvernement et indexée le 1er janvier de chaque année.',
      ],
      keywords: ['revenu', 'contribution', 'même prix', 'indexation'],
    },
    en: {
      question: 'Does the reduced contribution vary with my income?',
      answer: [
        'No — in the CPE network, the basic reduced contribution is the same for all families regardless of income. It is set by the government and indexed on January 1 each year.',
      ],
      keywords: ['income', 'contribution', 'same price', 'indexing'],
    },
  },
  {
    category: 'Frais et paiements',
    audience: 'public',
    fr: {
      question: 'Offrez-vous des reçus pour les régimes d’assurance ou employeurs ?',
      answer: [
        'Les documents standards (état de compte mensuel, relevé 24) suffisent pour la plupart des programmes. Si votre employeur ou un programme exige une attestation particulière, écrivez à l’administration et nous la préparerons.',
      ],
      keywords: ['attestation', 'employeur', 'assurance', 'preuve de garde'],
    },
    en: {
      question: 'Do you provide receipts for insurance plans or employers?',
      answer: [
        'Standard documents (monthly statement, Relevé 24) are enough for most programs. If your employer or a program requires a specific attestation, write to the administration and we will prepare it.',
      ],
      keywords: ['attestation', 'employer', 'insurance', 'proof of care'],
    },
  },
  {
    category: 'Frais et paiements',
    audience: 'public',
    fr: {
      question: 'Qui décide du montant de la contribution réduite ?',
      answer: [
        'Le gouvernement du Québec. Le CPE ne fixe pas ce montant et ne peut exiger de frais obligatoires supplémentaires pour les services de base — c’est encadré par la loi.',
      ],
      keywords: ['gouvernement', 'montant', 'loi', 'qui décide'],
    },
    en: {
      question: 'Who decides the reduced-contribution amount?',
      answer: [
        'The Québec government. The CPE does not set this amount and cannot charge mandatory extra fees for basic services — this is regulated by law.',
      ],
      keywords: ['government', 'amount', 'law', 'who decides'],
    },
  },
  {
    category: 'Frais et paiements',
    audience: 'portal',
    fr: {
      question: 'Puis-je payer plusieurs mois à l’avance ?',
      answer: [
        'Le prélèvement mensuel est la formule standard, mais si vous préférez payer d’avance (par exemple avant un long voyage), écrivez à l’administration pour convenir des modalités.',
      ],
      keywords: ['avance', 'payer d’avance', 'plusieurs mois', 'voyage'],
    },
    en: {
      question: 'Can I pay several months in advance?',
      answer: [
        'Monthly debit is the standard, but if you prefer to prepay (for example before a long trip), write to the administration to arrange it.',
      ],
      keywords: ['advance', 'prepay', 'several months', 'trip'],
    },
  },
  {
    category: 'Frais et paiements',
    audience: 'public',
    fr: {
      question: 'Le CPE est-il un organisme à but lucratif ?',
      answer: [
        'Non. Un CPE est un organisme sans but lucratif administré par un conseil d’administration composé majoritairement de parents utilisateurs. Chaque dollar est réinvesti dans la qualité des services aux enfants.',
      ],
      keywords: ['obnl', 'but lucratif', 'conseil', 'parents'],
    },
    en: {
      question: 'Is the CPE a for-profit business?',
      answer: [
        'No. A CPE is a non-profit organization governed by a board with a majority of parent users. Every dollar is reinvested in the quality of services for the children.',
      ],
      keywords: ['non-profit', 'for-profit', 'board', 'parents'],
    },
  },
]
