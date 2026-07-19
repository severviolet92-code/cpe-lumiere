import type { KBSeedArticle } from './types'

/** Complementary practical questions across all categories — fictional demo content. */
export const complementsArticles: KBSeedArticle[] = [
  // Santé — complements
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Mon enfant a le nez qui coule : peut-il venir quand même ?',
      answer: [
        'Oui — un simple rhume sans fièvre, avec un état général normal, ne justifie pas une exclusion. Les petits nez coulent une bonne partie de l’hiver ; nous mouchons, lavons les mains et la vie continue.',
      ],
      keywords: ['nez qui coule', 'rhume', 'venir', 'exclusion'],
    },
    en: {
      question: 'My child has a runny nose — can they still come?',
      answer: [
        'Yes — a simple cold without fever, with a normal general condition, does not justify exclusion. Little noses run most of the winter; we wipe, wash hands, and life goes on.',
      ],
      keywords: ['runny nose', 'cold', 'come', 'exclusion'],
    },
  },
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Que faites-vous lors des journées de smog ou de mauvaise qualité de l’air ?',
      answer: [
        'Nous suivons les avis d’Environnement Canada : sorties écourtées ou remplacées par de la motricité intérieure, fenêtres fermées et attention accrue aux enfants asthmatiques selon leur plan d’action.',
      ],
      keywords: ['smog', 'qualité de l’air', 'feux de forêt', 'asthme'],
    },
    en: {
      question: 'What do you do on smog or poor-air-quality days?',
      answer: [
        'We follow Environment Canada advisories: shortened outings or indoor gross-motor play instead, windows closed and extra attention to asthmatic children per their action plans.',
      ],
      keywords: ['smog', 'air quality', 'wildfires', 'asthma'],
    },
  },
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Comment gérez-vous un enfant asthmatique ?',
      answer: [
        'Avec un plan d’action écrit fourni par votre médecin : pompes identifiées et accessibles (y compris en sortie), personnel formé à leur administration, et registre de chaque utilisation communiqué au parent le jour même.',
      ],
      keywords: ['asthme', 'pompe', 'ventolin', 'plan d’action'],
    },
    en: {
      question: 'How do you manage a child with asthma?',
      answer: [
        'With a written action plan from your doctor: labelled, accessible inhalers (including on outings), staff trained to administer them, and a log of every use shared with the parent the same day.',
      ],
      keywords: ['asthma', 'inhaler', 'ventolin', 'action plan'],
    },
  },
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Un enfant qui prend des antibiotiques peut-il fréquenter le CPE ?',
      answer: [
        'Oui, dès que son état général le permet et qu’il n’est plus contagieux selon les délais reconnus (souvent 24 heures après le début du traitement, selon la maladie). Apportez l’ordonnance et l’autorisation signée pour que nous donnions les doses du midi.',
      ],
      keywords: ['antibiotiques', 'traitement', 'contagieux', 'retour'],
    },
    en: {
      question: 'Can a child on antibiotics attend the CPE?',
      answer: [
        'Yes, as soon as their general condition allows and they are no longer contagious per recognized delays (often 24 hours after treatment starts, depending on the illness). Bring the prescription and signed authorization so we can give the midday doses.',
      ],
      keywords: ['antibiotics', 'treatment', 'contagious', 'return'],
    },
  },
  {
    category: 'Santé',
    audience: 'portal',
    fr: {
      question: 'Comment serai-je informé si mon enfant s’est blessé pendant la journée ?',
      answer: [
        'Pour toute blessure, même mineure, un rapport d’incident écrit vous est remis au départ et l’éducatrice vous explique ce qui s’est passé. Pour un coup à la tête ou une blessure plus sérieuse, nous vous appelons immédiatement.',
      ],
      keywords: ['blessé', 'rapport', 'incident', 'informé'],
    },
    en: {
      question: 'How will I know if my child was hurt during the day?',
      answer: [
        'For any injury, even minor, a written incident report is given to you at pickup and the educator explains what happened. For a head bump or anything more serious, we call you immediately.',
      ],
      keywords: ['hurt', 'report', 'incident', 'informed'],
    },
  },
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Quelle est votre politique sur les moustiques et l’insectifuge ?',
      answer: [
        'En saison, avec votre autorisation écrite, un insectifuge adapté à l’âge est appliqué avant les sorties boisées, selon le protocole du ministère. Vous pouvez aussi fournir votre propre produit identifié.',
      ],
      keywords: ['moustiques', 'insectifuge', 'chasse-moustiques', 'piqûres'],
    },
    en: {
      question: 'What is your mosquito and insect-repellent policy?',
      answer: [
        'In season, with your written authorization, an age-appropriate repellent is applied before wooded outings, following the ministry protocol. You may also provide your own labelled product.',
      ],
      keywords: ['mosquitoes', 'repellent', 'bug spray', 'bites'],
    },
  },
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Comment accompagnez-vous l’apprentissage de la propreté ?',
      answer: [
        'À son rythme, jamais sous pression, et toujours en cohérence avec la maison : dites-nous quand vous commencez et nous suivons la même approche. Petites toilettes adaptées, encouragements, et zéro honte en cas d’accident — des rechanges suffisent.',
      ],
      keywords: ['propreté', 'petit pot', 'toilette', 'apprentissage'],
    },
    en: {
      question: 'How do you support toilet learning?',
      answer: [
        'At the child’s pace, never under pressure, and always consistent with home: tell us when you start and we follow the same approach. Child-sized toilets, encouragement, and zero shame for accidents — spare clothes are all it takes.',
      ],
      keywords: ['potty training', 'potty', 'toilet', 'learning'],
    },
  },
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Que faire si mon enfant vit une période difficile (déménagement, séparation, deuil) ?',
      answer: [
        'Dites-le-nous, même brièvement : comprendre ce que vit l’enfant nous permet d’ajuster notre accompagnement (plus de câlins, routines rassurantes, patience avec les régressions). Tout reste confidentiel au sein de l’équipe concernée.',
      ],
      keywords: ['séparation', 'deuil', 'difficile', 'changement famille'],
    },
    en: {
      question: 'What if my child is going through a hard time (move, separation, loss)?',
      answer: [
        'Tell us, even briefly: understanding what the child is living through lets us adjust our support (more hugs, reassuring routines, patience with regressions). Everything stays confidential within the team concerned.',
      ],
      keywords: ['separation', 'grief', 'hard time', 'family change'],
    },
  },
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Les émotions des enfants sont-elles prises au sérieux ?',
      answer: [
        'C’est le cœur de notre travail : les crises et gros chagrins sont accueillis, jamais punis. Nous aidons l’enfant à nommer ce qu’il ressent et à retrouver son calme — coin doux, respiration, présence de l’adulte. C’est ainsi que se construit l’autorégulation.',
      ],
      keywords: ['émotions', 'crise', 'colère', 'pleurs'],
    },
    en: {
      question: 'Are children’s emotions taken seriously?',
      answer: [
        'It is the heart of our work: meltdowns and big sorrows are welcomed, never punished. We help the child name what they feel and settle again — cozy corner, breathing, adult presence. That is how self-regulation is built.',
      ],
      keywords: ['emotions', 'meltdown', 'anger', 'crying'],
    },
  },
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Mon poupon fait ses dents et est grognon : dois-je le garder à la maison ?',
      answer: [
        'Non — la poussée dentaire n’est pas une maladie. Prévenez simplement l’éducatrice, qui offrira anneaux de dentition réfrigérés et bras supplémentaires. Si une vraie fièvre s’ajoute (38,5 °C+), les règles habituelles de fièvre s’appliquent.',
      ],
      keywords: ['dents', 'poussée dentaire', 'grognon', 'poupon'],
    },
    en: {
      question: 'My infant is teething and cranky — should I keep them home?',
      answer: [
        'No — teething is not an illness. Just tell the educator, who will offer chilled teething rings and extra arms. If a true fever appears (38.5 °C+), the usual fever rules apply.',
      ],
      keywords: ['teeth', 'teething', 'cranky', 'infant'],
    },
  },

  // Repas — complements
  {
    category: 'Repas',
    audience: 'public',
    fr: {
      question: 'Proposez-vous des repas adaptés aux poupons qui commencent les solides ?',
      answer: [
        'Oui — le menu du jour est décliné en textures adaptées : purées lisses, purées texturées ou petits morceaux, selon l’étape de votre bébé, convenue avec vous. La progression se fait au même rythme qu’à la maison.',
      ],
      keywords: ['solides', 'purées', 'textures', 'bébé'],
    },
    en: {
      question: 'Do you adapt meals for infants starting solids?',
      answer: [
        'Yes — the day’s menu comes in adapted textures: smooth purées, textured purées or small pieces, matching your baby’s stage as agreed with you. Progression follows the same pace as home.',
      ],
      keywords: ['solids', 'purees', 'textures', 'baby'],
    },
  },
  {
    category: 'Repas',
    audience: 'public',
    fr: {
      question: 'Mon enfant boit-il assez d’eau pendant la journée ?',
      answer: [
        'L’eau est offerte en continu : gourdes identifiées accessibles en tout temps dans le local et dans la cour, et rappels réguliers de l’éducatrice, surtout l’été. Vous récupérez la gourde chaque soir pour la laver.',
      ],
      keywords: ['eau', 'gourde', 'hydratation', 'boire'],
    },
    en: {
      question: 'Does my child drink enough water during the day?',
      answer: [
        'Water is available continuously: labelled bottles accessible at all times in the room and yard, with regular reminders from the educator, especially in summer. You take the bottle home each evening to wash it.',
      ],
      keywords: ['water', 'bottle', 'hydration', 'drink'],
    },
  },
  {
    category: 'Repas',
    audience: 'portal',
    fr: {
      question: 'Le menu affiché a changé aujourd’hui : pourquoi ?',
      answer: [
        'Il arrive qu’une livraison manque ou qu’un imprévu force une substitution — toujours par un plat équivalent respectant les mêmes restrictions alimentaires. Les substitutions sont notées sur le menu affiché à l’entrée.',
      ],
      keywords: ['menu changé', 'substitution', 'différent', 'pourquoi'],
    },
    en: {
      question: 'Today’s posted menu changed — why?',
      answer: [
        'Sometimes a delivery is missed or something unexpected forces a substitution — always with an equivalent dish respecting the same dietary restrictions. Substitutions are noted on the menu posted at the entrance.',
      ],
      keywords: ['menu change', 'substitution', 'different', 'why'],
    },
  },
  {
    category: 'Repas',
    audience: 'public',
    fr: {
      question: 'Puis-je allaiter au CPE ?',
      answer: [
        'Bien sûr — vous êtes chez vous. Un fauteuil confortable est disponible à la pouponnière pour allaiter à l’arrivée, au départ ou sur l’heure du midi. Le lait maternel exprimé est accueilli selon notre protocole d’identification et de réfrigération.',
      ],
      keywords: ['allaiter', 'allaitement', 'lait maternel', 'pouponnière'],
    },
    en: {
      question: 'Can I breastfeed at the CPE?',
      answer: [
        'Of course — this is your place too. A comfortable chair is available in the infant room for nursing at drop-off, pickup or lunchtime. Expressed breast milk is welcomed under our labelling and refrigeration protocol.',
      ],
      keywords: ['breastfeed', 'nursing', 'breast milk', 'infant room'],
    },
  },

  // Horaire — complements
  {
    category: 'Horaire',
    audience: 'portal',
    fr: {
      question: 'Nous partons en vacances deux semaines : que dois-je faire ?',
      answer: [
        'Signalez les dates à l’éducatrice et à l’administration dès qu’elles sont connues. La place reste réservée et la contribution demeure payable ; au retour, prévoyez une journée ou deux d’adaptation — c’est normal après une pause.',
      ],
      keywords: ['vacances', 'partir', 'deux semaines', 'aviser'],
    },
    en: {
      question: 'We are going on vacation for two weeks — what should I do?',
      answer: [
        'Give the dates to the educator and administration as soon as you know them. The spot stays reserved and the contribution remains payable; on return, expect a day or two of readjustment — normal after a break.',
      ],
      keywords: ['vacation', 'away', 'two weeks', 'notify'],
    },
  },
  {
    category: 'Horaire',
    audience: 'public',
    fr: {
      question: 'Le vendredi est-il une journée comme les autres ?',
      answer: [
        'Oui — même horaire, mêmes repas, mêmes sorties. Le vendredi a toutefois ses petits rituels selon les groupes : heure du conte spéciale, retour sur la semaine en causerie, choix de la chanson préférée. (Description de démonstration.)',
      ],
      keywords: ['vendredi', 'journée', 'rituel', 'semaine'],
    },
    en: {
      question: 'Is Friday a day like any other?',
      answer: [
        'Yes — same schedule, meals and outings. Fridays do have their little rituals by group: special story time, a circle-time look back at the week, picking the favourite song. (Demonstration description.)',
      ],
      keywords: ['friday', 'day', 'ritual', 'week'],
    },
  },

  // Politiques — complements
  {
    category: 'Politiques',
    audience: 'public',
    fr: {
      question: 'Comment les objets perdus sont-ils gérés ?',
      answer: [
        'Un bac d’objets perdus se trouve au vestiaire — jetez-y un œil régulièrement. L’identification au nom de l’enfant (vêtements, gourdes, doudous) évite 95 % des pertes. Les objets non réclamés sont donnés en fin de saison.',
      ],
      keywords: ['objets perdus', 'perdu', 'vêtements perdus', 'identification'],
    },
    en: {
      question: 'How are lost items handled?',
      answer: [
        'A lost-and-found bin sits at the cubbies — check it regularly. Labelling with the child’s name (clothes, bottles, blankets) prevents 95% of losses. Unclaimed items are donated at season’s end.',
      ],
      keywords: ['lost and found', 'lost', 'lost clothes', 'labelling'],
    },
  },
  {
    category: 'Politiques',
    audience: 'public',
    fr: {
      question: 'Puis-je téléphoner pendant la journée pour prendre des nouvelles ?',
      answer: [
        'Oui, sans gêne — surtout pendant la période d’intégration. Privilégiez la fin de matinée ou l’après-sieste : l’équipe pourra vous répondre plus longuement qu’en plein cœur d’une routine.',
      ],
      keywords: ['nouvelles', 'téléphoner', 'appeler', 'journée'],
    },
    en: {
      question: 'Can I call during the day to check in?',
      answer: [
        'Yes, without hesitation — especially during the integration period. Late morning or after nap works best: the team can give you a fuller answer than in the middle of a routine.',
      ],
      keywords: ['check in', 'call', 'phone', 'day'],
    },
  },
  {
    category: 'Politiques',
    audience: 'public',
    fr: {
      question: 'Quelle est votre politique sur les bijoux et petits objets ?',
      answer: [
        'Pas de bijoux ni de petits objets au CPE : risque d’étouffement pour les plus petits, de perte et de blessure au jeu. Les attaches-suces sécuritaires font exception à la pouponnière.',
      ],
      keywords: ['bijoux', 'collier', 'petits objets', 'étouffement'],
    },
    en: {
      question: 'What is your policy on jewellery and small objects?',
      answer: [
        'No jewellery or small objects at the CPE: choking risk for the youngest, plus loss and play injuries. Safety pacifier clips are the exception in the infant room.',
      ],
      keywords: ['jewellery', 'necklace', 'small objects', 'choking'],
    },
  },
  {
    category: 'Politiques',
    audience: 'portal',
    fr: {
      question: 'Comment donner une consigne particulière pour la journée ?',
      answer: [
        'Dites-la à la personne qui accueille votre enfant le matin — elle la note au registre du groupe. Pour les consignes importantes (médicament, départ différent), doublez d’un courriel afin qu’il en reste une trace écrite.',
      ],
      keywords: ['consigne', 'note', 'journée', 'message équipe'],
    },
    en: {
      question: 'How do I give a special instruction for the day?',
      answer: [
        'Tell the person welcoming your child in the morning — they note it in the group log. For important instructions (medication, different pickup), also send an email so there is a written trace.',
      ],
      keywords: ['instruction', 'note', 'day', 'message team'],
    },
  },
  {
    category: 'Politiques',
    audience: 'public',
    fr: {
      question: 'Comment gérez-vous les conflits entre enfants ?',
      answer: [
        'Nous accompagnons plutôt que d’arbitrer : mettre des mots sur le besoin de chacun, chercher une solution ensemble, réparer si nécessaire. Apprendre à résoudre un conflit est une compétence — les petites frictions quotidiennes sont des occasions, pas des drames.',
      ],
      keywords: ['conflit', 'chicane', 'dispute', 'résolution'],
    },
    en: {
      question: 'How do you handle conflicts between children?',
      answer: [
        'We coach rather than referee: putting words on each child’s need, finding a solution together, repairing if needed. Conflict resolution is a skill — small daily frictions are opportunities, not dramas.',
      ],
      keywords: ['conflict', 'squabble', 'argument', 'resolution'],
    },
  },
  {
    category: 'Politiques',
    audience: 'public',
    fr: {
      question: 'Une éducatrice est absente : qui s’occupe du groupe ?',
      answer: [
        'Une remplaçante connue du CPE (notre banque de remplacement) prend le relais, avec le cahier de bord du groupe : routines, particularités, allergies. La stabilité est notre priorité — nous privilégions toujours les mêmes visages.',
      ],
      keywords: ['remplaçante', 'absente', 'remplacement', 'stabilité'],
    },
    en: {
      question: 'An educator is absent — who takes care of the group?',
      answer: [
        'A substitute known to the CPE (our substitute bank) steps in, with the group logbook: routines, particularities, allergies. Stability is our priority — we always favour familiar faces.',
      ],
      keywords: ['substitute', 'absent', 'replacement', 'stability'],
    },
  },
  {
    category: 'Politiques',
    audience: 'public',
    fr: {
      question: 'Puis-je visiter le local de mon enfant ?',
      answer: [
        'Aux arrivées et départs, vous entrez dans le vestiaire et pouvez échanger avec l’éducatrice à la porte du local. Pour une visite plus longue (voir le fonctionnement, allaiter, période d’intégration), entendez-vous avec l’équipe — la porte n’est jamais fermée aux parents.',
      ],
      keywords: ['visiter', 'local', 'entrer', 'accès parent'],
    },
    en: {
      question: 'Can I visit my child’s room?',
      answer: [
        'At drop-off and pickup you enter the cubby area and can talk with the educator at the room door. For a longer visit (seeing how things run, nursing, integration period), arrange it with the team — the door is never closed to parents.',
      ],
      keywords: ['visit', 'room', 'enter', 'parent access'],
    },
  },
  {
    category: 'Politiques',
    audience: 'public',
    fr: {
      question: 'Comment se passent les rencontres parents-éducatrice ?',
      answer: [
        'Deux fois par année, autour du dossier éducatif de votre enfant : ses forces, ses découvertes, ses défis. En dehors de ces rencontres, vous pouvez en demander une en tout temps — quinze minutes au bon moment valent mieux qu’une inquiétude qui traîne.',
      ],
      keywords: ['rencontre', 'parents-éducatrice', 'suivi', 'rendez-vous'],
    },
    en: {
      question: 'How do parent-educator meetings work?',
      answer: [
        'Twice a year, around your child’s educational file: strengths, discoveries, challenges. Outside those, you can request a meeting anytime — fifteen minutes at the right moment beats a worry that lingers.',
      ],
      keywords: ['meeting', 'parent-educator', 'follow-up', 'appointment'],
    },
  },

  // Inscription / Frais — complements
  {
    category: 'Inscription',
    audience: 'public',
    fr: {
      question: 'Mon enfant aura 5 ans en cours d’année : peut-il rester au CPE ?',
      answer: [
        'Oui — un enfant fréquente le CPE jusqu’à son entrée à la maternelle, même s’il a déjà eu 5 ans. L’admissibilité scolaire (1er octobre) détermine le moment du départ, pas l’anniversaire.',
      ],
      keywords: ['5 ans', 'rester', 'maternelle', 'admissibilité'],
    },
    en: {
      question: 'My child turns 5 mid-year — can they stay at the CPE?',
      answer: [
        'Yes — a child attends the CPE until kindergarten entry, even after turning 5. School eligibility (October 1st) determines the departure, not the birthday.',
      ],
      keywords: ['age 5', 'stay', 'kindergarten', 'eligibility'],
    },
  },
  {
    category: 'Inscription',
    audience: 'public',
    fr: {
      question: 'Offrez-vous une période d’essai ?',
      answer: [
        'L’intégration progressive joue ce rôle : les premières semaines permettent à tous — enfant, parents, équipe — de valider que tout se passe bien. L’entente de services peut être résiliée selon les règles normales si le milieu ne convient pas.',
      ],
      keywords: ['essai', 'période d’essai', 'tester', 'convenir'],
    },
    en: {
      question: 'Is there a trial period?',
      answer: [
        'Gradual integration plays that role: the first weeks let everyone — child, parents, team — confirm things are going well. The service agreement can be terminated under the normal rules if the setting is not the right fit.',
      ],
      keywords: ['trial', 'trial period', 'test', 'fit'],
    },
  },
  {
    category: 'Frais et paiements',
    audience: 'public',
    fr: {
      question: 'Que couvre exactement la contribution réduite ?',
      answer: [
        'La garde éducative durant les heures d’ouverture, le dîner et deux collations, le matériel éducatif et d’hygiène de base (sauf couches), et les activités régulières. Bref : une journée complète, sans frais cachés.',
      ],
      keywords: ['couvre', 'inclus', 'contribution', 'quoi inclus'],
    },
    en: {
      question: 'What exactly does the reduced contribution cover?',
      answer: [
        'Educational care during opening hours, lunch and two snacks, basic educational and hygiene supplies (except diapers), and regular activities. In short: a full day, no hidden fees.',
      ],
      keywords: ['covers', 'included', 'contribution', 'what’s included'],
    },
  },
  {
    category: 'Frais et paiements',
    audience: 'portal',
    fr: {
      question: 'Où trouver mes états de compte dans le portail ?',
      answer: [
        'Dans la section Documents, catégorie « Général » : chaque état de compte mensuel y est déposé en PDF, ainsi que le relevé 24 annuel en février. Vous recevez un courriel à chaque nouveau dépôt.',
      ],
      keywords: ['état de compte', 'portail', 'documents', 'trouver'],
    },
    en: {
      question: 'Where do I find my statements in the portal?',
      answer: [
        'In the Documents section, “General” category: each monthly statement is posted as a PDF, along with the annual Relevé 24 in February. You receive an email at every new upload.',
      ],
      keywords: ['statement', 'portal', 'documents', 'find'],
    },
  },

  // Activités / Événements / Général — complements
  {
    category: 'Activités',
    audience: 'public',
    fr: {
      question: 'Les enfants font-ils la sieste dehors l’été ?',
      answer: [
        'Non — la sieste se fait toujours à l’intérieur, dans le calme du dortoir de chaque groupe. L’été, les locaux sont rafraîchis et la routine du repos reste identique, ce qui rassure les enfants.',
      ],
      keywords: ['sieste dehors', 'été', 'dortoir', 'repos'],
    },
    en: {
      question: 'Do children nap outside in summer?',
      answer: [
        'No — naps always happen indoors, in each group’s quiet rest area. In summer the rooms are cooled and the rest routine stays identical, which reassures the children.',
      ],
      keywords: ['outdoor nap', 'summer', 'rest area', 'rest'],
    },
  },
  {
    category: 'Activités',
    audience: 'public',
    fr: {
      question: 'Avez-vous une salle de motricité intérieure ?',
      answer: [
        'Oui — une grande salle dédiée avec modules à grimper, poutres, tunnels, ballons et trampoline doux. Chaque groupe y a ses périodes réservées chaque semaine, précieuses les jours de pluie ou de grand froid.',
      ],
      keywords: ['salle de motricité', 'gymnase', 'intérieur', 'grimper'],
    },
    en: {
      question: 'Do you have an indoor motor-skills room?',
      answer: [
        'Yes — a large dedicated room with climbing modules, beams, tunnels, balls and a soft trampoline. Each group has weekly reserved slots, precious on rainy or very cold days.',
      ],
      keywords: ['motor room', 'gym', 'indoor', 'climbing'],
    },
  },
  {
    category: 'Événements',
    audience: 'public',
    fr: {
      question: 'Comment se déroule la photo de groupe annuelle ?',
      answer: [
        'Une photographe professionnelle vient une fois par année. Seuls les enfants dont les parents ont signé le consentement sont photographiés ; l’achat des photos est entièrement optionnel. Les dates sont annoncées plusieurs semaines d’avance.',
      ],
      keywords: ['photo de groupe', 'photographe', 'photo scolaire', 'consentement'],
    },
    en: {
      question: 'How does the annual group photo work?',
      answer: [
        'A professional photographer comes once a year. Only children whose parents signed the consent form are photographed; buying photos is entirely optional. Dates are announced weeks in advance.',
      ],
      keywords: ['group photo', 'photographer', 'school photo', 'consent'],
    },
  },
  {
    category: 'Événements',
    audience: 'portal',
    fr: {
      question: 'J’ai manqué une annonce importante : où retrouver les anciennes annonces ?',
      answer: [
        'Dans la section Annonces du portail, cliquez sur « Voir les annonces précédentes » : les annonces archivées y restent consultables. Les annonces critiques sont toujours doublées d’un courriel.',
      ],
      keywords: ['annonce manquée', 'archives', 'anciennes annonces', 'retrouver'],
    },
    en: {
      question: 'I missed an important announcement — where are past announcements?',
      answer: [
        'In the portal’s Announcements section, click “Browse previous announcements”: archived announcements remain available there. Critical announcements are always doubled by email.',
      ],
      keywords: ['missed announcement', 'archives', 'past announcements', 'find'],
    },
  },
  {
    category: 'Informations générales',
    audience: 'public',
    fr: {
      question: 'Que faire en cas de désaccord avec une décision du CPE ?',
      answer: [
        'Commencez par en parler à la direction — la plupart des malentendus se dissipent avec le contexte. Si le désaccord persiste, la procédure de plainte écrite s’applique, et le conseil d’administration peut être saisi. Le respect mutuel demeure la règle dans tous les échanges.',
      ],
      keywords: ['désaccord', 'contester', 'décision', 'recours'],
    },
    en: {
      question: 'What if I disagree with a CPE decision?',
      answer: [
        'Start by talking with the direction — most misunderstandings dissolve with context. If the disagreement persists, the written complaint procedure applies, and the board can be seized. Mutual respect remains the rule in every exchange.',
      ],
      keywords: ['disagreement', 'contest', 'decision', 'recourse'],
    },
  },
  {
    category: 'Informations générales',
    audience: 'public',
    fr: {
      question: 'Le CPE ferme-t-il définitivement ses portes un jour ? Comment serais-je avisé ?',
      answer: [
        'Aucune fermeture n’est envisagée — un CPE est une institution stable de son quartier. Toute décision majeure de ce type relèverait du conseil d’administration et serait communiquée aux familles longtemps d’avance, avec un accompagnement pour la relocalisation.',
      ],
      keywords: ['fermeture définitive', 'fermer', 'avenir', 'stabilité'],
    },
    en: {
      question: 'Could the CPE ever close permanently? How would I know?',
      answer: [
        'No closure is contemplated — a CPE is a stable neighbourhood institution. Any major decision of that kind would belong to the board and be communicated to families long in advance, with relocation support.',
      ],
      keywords: ['permanent closure', 'close', 'future', 'stability'],
    },
  },
  {
    category: 'Informations générales',
    audience: 'portal',
    fr: {
      question: 'Puis-je changer la langue des communications que je reçois ?',
      answer: [
        'Oui — votre préférence de langue (français ou anglais) est enregistrée à votre compte parent et s’applique aux courriels automatiques. Écrivez à l’administration pour la modifier ; le portail lui-même se consulte dans les deux langues en tout temps.',
      ],
      keywords: ['langue', 'préférence', 'courriels', 'changer langue'],
    },
    en: {
      question: 'Can I change the language of the communications I receive?',
      answer: [
        'Yes — your language preference (French or English) is stored on your parent account and applies to automated emails. Write to the administration to change it; the portal itself can be browsed in both languages at any time.',
      ],
      keywords: ['language', 'preference', 'emails', 'change language'],
    },
  },
  {
    category: 'Informations générales',
    audience: 'public',
    fr: {
      question: 'Proposez-vous une infolettre ?',
      answer: [
        'Les familles inscrites reçoivent les communications importantes par courriel automatiquement. Pas d’infolettre publique pour l’instant — le site et la page Activités présentent tout ce qui peut l’être publiquement.',
      ],
      keywords: ['infolettre', 'newsletter', 'courriel', 'abonnement'],
    },
    en: {
      question: 'Do you have a newsletter?',
      answer: [
        'Enrolled families automatically receive important communications by email. No public newsletter for now — the website and Activities page show everything that can be public.',
      ],
      keywords: ['newsletter', 'mailing', 'email', 'subscribe'],
    },
  },
]
