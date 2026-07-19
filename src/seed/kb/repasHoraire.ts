import type { KBSeedArticle } from './types'

/** Repas (meals) + Horaire (schedule) — fictional demo content. */
export const repasHoraireArticles: KBSeedArticle[] = [
  // ---------------- Repas ----------------
  {
    category: 'Repas',
    audience: 'public',
    fr: {
      question: 'Les repas sont-ils fournis ?',
      answer: [
        'Oui — le dîner et deux collations sont préparés sur place chaque jour par notre équipe de cuisine, à partir d’aliments frais. Le déjeuner n’est pas servi : les enfants arrivent déjeunés.',
      ],
      keywords: ['repas', 'dîner', 'fournis', 'collation', 'cuisine'],
    },
    en: {
      question: 'Are meals provided?',
      answer: [
        'Yes — lunch and two snacks are prepared on site daily by our kitchen team from fresh ingredients. Breakfast is not served: children arrive having eaten.',
      ],
      keywords: ['meals', 'lunch', 'provided', 'snack', 'kitchen'],
    },
  },
  {
    category: 'Repas',
    audience: 'public',
    fr: {
      question: 'Où trouver le menu de la semaine ?',
      answer: [
        'Le menu est affiché à l’entrée du CPE, publié sur la page Cuisine et nutrition du site, et déposé chaque mois en PDF dans la section Documents du portail parents. Il suit une rotation de quatre semaines adaptée aux saisons.',
      ],
      keywords: ['menu', 'semaine', 'affiché', 'rotation'],
    },
    en: {
      question: 'Where can I find the weekly menu?',
      answer: [
        'The menu is posted at the CPE entrance, published on the website’s Kitchen & nutrition page, and uploaded monthly as a PDF in the portal’s Documents section. It follows a four-week rotation adapted to the seasons.',
      ],
      keywords: ['menu', 'week', 'posted', 'rotation'],
    },
  },
  {
    category: 'Repas',
    audience: 'public',
    fr: {
      question: 'Que faire si mon enfant a une allergie alimentaire ?',
      answer: [
        'Informez la direction dès que possible : l’allergie est consignée au dossier, affichée en cuisine (photo et consignes) et communiquée à toute l’équipe. Les menus sont adaptés pour que votre enfant mange un repas équivalent, jamais « à part ».',
        'Le CPE est un milieu sans arachides ni noix.',
      ],
      keywords: ['allergie', 'intolérance', 'arachides', 'noix', 'épipen'],
    },
    en: {
      question: 'What if my child has a food allergy?',
      answer: [
        'Tell the direction as soon as possible: the allergy is recorded in the file, posted in the kitchen (photo and instructions) and shared with the whole team. Menus are adapted so your child eats an equivalent meal, never “apart”.',
        'The CPE is a peanut- and nut-free environment.',
      ],
      keywords: ['allergy', 'intolerance', 'peanut', 'nuts', 'epipen'],
    },
  },
  {
    category: 'Repas',
    audience: 'public',
    fr: {
      question: 'Le CPE est-il un milieu sans arachides ?',
      answer: [
        'Oui. Aucune arachide ni noix n’entre dans nos recettes ni dans le bâtiment. Merci de ne jamais envoyer de nourriture de la maison, y compris pour les anniversaires — c’est ainsi que nous protégeons les enfants allergiques.',
      ],
      keywords: ['arachides', 'noix', 'sans arachides', 'interdit'],
    },
    en: {
      question: 'Is the CPE peanut-free?',
      answer: [
        'Yes. No peanuts or nuts enter our recipes or the building. Please never send food from home, including for birthdays — that is how we protect children with allergies.',
      ],
      keywords: ['peanuts', 'nuts', 'peanut-free', 'forbidden'],
    },
  },
  {
    category: 'Repas',
    audience: 'public',
    fr: {
      question: 'Offrez-vous des menus végétariens ou sans porc ?',
      answer: [
        'Oui. Les restrictions alimentaires familiales (végétarisme, sans porc, etc.) sont respectées : indiquez-les au dossier de votre enfant et la cuisine prépare une substitution équivalente les jours concernés.',
      ],
      keywords: ['végétarien', 'sans porc', 'religion', 'restriction'],
    },
    en: {
      question: 'Do you offer vegetarian or pork-free menus?',
      answer: [
        'Yes. Family dietary restrictions (vegetarian, pork-free, etc.) are respected: note them in your child’s file and the kitchen prepares an equivalent substitution on the days concerned.',
      ],
      keywords: ['vegetarian', 'pork-free', 'religion', 'restriction'],
    },
  },
  {
    category: 'Repas',
    audience: 'public',
    fr: {
      question: 'Comment gérez-vous les purées et les boires des poupons ?',
      answer: [
        'Les poupons suivent leur propre horaire, en continuité avec la maison : vous nous indiquez les quantités, les textures et les heures habituelles, et l’éducatrice tient un journal quotidien des boires, purées, siestes et changements de couche.',
        'Le lait maternel est accepté et manipulé selon un protocole strict (identification, réfrigération).',
      ],
      keywords: ['purée', 'boire', 'biberon', 'poupon', 'lait maternel'],
    },
    en: {
      question: 'How do you handle infant purées and bottles?',
      answer: [
        'Infants keep their own schedule, in continuity with home: you tell us the usual amounts, textures and times, and the educator keeps a daily log of bottles, purées, naps and diaper changes.',
        'Breast milk is accepted and handled under a strict protocol (labelling, refrigeration).',
      ],
      keywords: ['puree', 'bottle', 'infant', 'breast milk', 'feeding'],
    },
  },
  {
    category: 'Repas',
    audience: 'public',
    fr: {
      question: 'Qui prépare les repas ?',
      answer: [
        'Notre cuisinier et son équipe préparent tout sur place, dans la cuisine du CPE, en suivant les normes du MAPAQ. Les menus sont élaborés selon le Guide alimentaire canadien et le cadre de référence « Gazelle et Potiron » pour la petite enfance.',
      ],
      keywords: ['cuisinier', 'cuisine', 'qui prépare', 'mapaq'],
    },
    en: {
      question: 'Who prepares the meals?',
      answer: [
        'Our cook and his team prepare everything on site, in the CPE’s kitchen, following MAPAQ food-safety standards. Menus follow Canada’s Food Guide and the early-childhood reference framework “Gazelle et Potiron”.',
      ],
      keywords: ['cook', 'kitchen', 'who prepares', 'mapaq'],
    },
  },
  {
    category: 'Repas',
    audience: 'public',
    fr: {
      question: 'Que contient une collation type ?',
      answer: [
        'Toujours au moins deux groupes alimentaires : fruits frais et fromage, crudités et houmous, muffin maison et lait… Les collations sont pensées pour soutenir l’énergie sans couper l’appétit du repas suivant.',
      ],
      keywords: ['collation', 'exemple', 'contenu', 'fruits'],
    },
    en: {
      question: 'What is in a typical snack?',
      answer: [
        'Always at least two food groups: fresh fruit and cheese, veggies and hummus, homemade muffin and milk… Snacks are designed to sustain energy without spoiling the next meal.',
      ],
      keywords: ['snack', 'example', 'content', 'fruit'],
    },
  },
  {
    category: 'Repas',
    audience: 'public',
    fr: {
      question: 'Mon enfant est difficile à table : comment gérez-vous cela ?',
      answer: [
        'Sans pression ni chantage. L’enfant décide de la quantité qu’il mange ; l’adulte décide de ce qui est offert — c’est le partage des responsabilités recommandé en petite enfance. Un aliment refusé est représenté régulièrement, sans commentaire, car il faut souvent plusieurs expositions avant qu’il soit accepté.',
      ],
      keywords: ['difficile', 'mange pas', 'refuse', 'sélectif'],
    },
    en: {
      question: 'My child is a picky eater — how do you handle it?',
      answer: [
        'Without pressure or bargaining. The child decides how much they eat; the adult decides what is offered — the division of responsibility recommended in early childhood. A refused food is offered again regularly, without comment, since it often takes many exposures before acceptance.',
      ],
      keywords: ['picky', 'won’t eat', 'refuses', 'selective'],
    },
  },
  {
    category: 'Repas',
    audience: 'public',
    fr: {
      question: 'Puis-je envoyer un lunch de la maison ?',
      answer: [
        'Non — pour la sécurité des enfants allergiques et l’équité entre les enfants, toute la nourriture est fournie par le CPE. Les seules exceptions sont encadrées par un protocole (condition médicale documentée, lait maternel, préparation spécifique pour poupon).',
      ],
      keywords: ['lunch', 'maison', 'apporter nourriture', 'boîte à lunch'],
    },
    en: {
      question: 'Can I send a lunch from home?',
      answer: [
        'No — for the safety of children with allergies and fairness among children, all food is provided by the CPE. The only exceptions are protocol-managed (documented medical condition, breast milk, specific infant formula).',
      ],
      keywords: ['lunch', 'home', 'bring food', 'lunchbox'],
    },
  },
  {
    category: 'Repas',
    audience: 'public',
    fr: {
      question: 'Comment saurai-je ce que mon enfant a mangé ?',
      answer: [
        'Pour les poupons, le journal quotidien détaille chaque boire et purée. Pour les plus grands, l’éducatrice vous fait un retour verbal au départ et note tout appétit inhabituel. Le menu du jour est toujours affiché à l’entrée.',
      ],
      keywords: ['mangé', 'appétit', 'journal', 'quantité'],
    },
    en: {
      question: 'How will I know what my child ate?',
      answer: [
        'For infants, the daily log details every bottle and purée. For older children, the educator gives you a verbal recap at pickup and notes any unusual appetite. The day’s menu is always posted at the entrance.',
      ],
      keywords: ['ate', 'appetite', 'log', 'amount'],
    },
  },
  {
    category: 'Repas',
    audience: 'public',
    fr: {
      question: 'Servez-vous du jus aux enfants ?',
      answer: [
        'Non. Les enfants boivent de l’eau à volonté toute la journée et du lait aux repas et collations, conformément aux recommandations en petite enfance. Les fruits sont servis entiers plutôt qu’en jus.',
      ],
      keywords: ['jus', 'eau', 'lait', 'boisson'],
    },
    en: {
      question: 'Do you serve juice?',
      answer: [
        'No. Children drink water freely all day and milk at meals and snacks, in line with early-childhood recommendations. Fruit is served whole rather than as juice.',
      ],
      keywords: ['juice', 'water', 'milk', 'drink'],
    },
  },
  {
    category: 'Repas',
    audience: 'public',
    fr: {
      question: 'Comment sont introduits les nouveaux aliments chez les poupons ?',
      answer: [
        'Toujours en concertation avec vous : un nouvel aliment est d’abord introduit à la maison, puis intégré au CPE une fois que vous nous confirmez qu’il est bien toléré. Nous suivons la même progression que votre famille.',
      ],
      keywords: ['introduction', 'nouvel aliment', 'dme', 'diversification'],
    },
    en: {
      question: 'How are new foods introduced for infants?',
      answer: [
        'Always in coordination with you: a new food is first introduced at home, then added at the CPE once you confirm it is well tolerated. We follow your family’s progression.',
      ],
      keywords: ['introduction', 'new food', 'blw', 'diversification'],
    },
  },
  {
    category: 'Repas',
    audience: 'public',
    fr: {
      question: 'Que servez-vous lors des anniversaires ?',
      answer: [
        'La cuisine prépare une surprise maison (gâteau ou muffins) sans allergène, pour que chaque enfant puisse fêter avec son groupe en toute sécurité. Merci de ne pas apporter de gâteau de l’extérieur.',
      ],
      keywords: ['anniversaire', 'gâteau', 'fête', 'surprise'],
    },
    en: {
      question: 'What do you serve for birthdays?',
      answer: [
        'The kitchen prepares an allergen-safe homemade surprise (cake or muffins) so every child can celebrate with their group safely. Please do not bring outside cake.',
      ],
      keywords: ['birthday', 'cake', 'party', 'surprise'],
    },
  },
  {
    category: 'Repas',
    audience: 'public',
    fr: {
      question: 'Les enfants participent-ils à des activités culinaires ?',
      answer: [
        'Oui ! Ateliers de muffins, dégustations à l’aveugle, potager de fines herbes dans la cour : cuisiner et goûter font partie des apprentissages. Ces activités respectent évidemment toutes les restrictions alimentaires du groupe.',
      ],
      keywords: ['cuisiner', 'atelier culinaire', 'potager', 'goûter'],
    },
    en: {
      question: 'Do the children do cooking activities?',
      answer: [
        'Yes! Muffin workshops, blind tastings, the herb garden in the yard: cooking and tasting are part of learning. These activities of course respect every dietary restriction in the group.',
      ],
      keywords: ['cooking', 'culinary workshop', 'garden', 'tasting'],
    },
  },
  {
    category: 'Repas',
    audience: 'public',
    fr: {
      question: 'Comment l’heure du dîner se déroule-t-elle ?',
      answer: [
        'Le dîner est servi vers 11 h 30 dans chaque local, en petit groupe, dans le calme. Les enfants se servent eux-mêmes autant que possible (autonomie), goûtent à leur rythme et personne n’est forcé de finir son assiette.',
      ],
      keywords: ['dîner', 'déroulement', 'heure du repas', 'autonomie'],
    },
    en: {
      question: 'What does lunchtime look like?',
      answer: [
        'Lunch is served around 11:30 in each room, in small groups, calmly. Children serve themselves as much as possible (autonomy), taste at their own pace, and no one is forced to finish their plate.',
      ],
      keywords: ['lunch', 'routine', 'mealtime', 'autonomy'],
    },
  },
  {
    category: 'Repas',
    audience: 'portal',
    fr: {
      question: 'Mon enfant suit une diète médicale : qui dois-je aviser ?',
      answer: [
        'La direction, avec le document de votre professionnel de la santé. Un plan alimentaire individuel est alors préparé avec la cuisine et affiché pour l’équipe. Toute mise à jour médicale doit nous être transmise rapidement.',
      ],
      keywords: ['diète', 'médicale', 'prescription', 'plan alimentaire'],
    },
    en: {
      question: 'My child has a medical diet — whom do I notify?',
      answer: [
        'The direction, with the document from your health professional. An individual food plan is then prepared with the kitchen and posted for the team. Any medical update must reach us quickly.',
      ],
      keywords: ['diet', 'medical', 'prescription', 'food plan'],
    },
  },
  {
    category: 'Repas',
    audience: 'public',
    fr: {
      question: 'D’où viennent les aliments servis au CPE ?',
      answer: [
        'Nous privilégions les fournisseurs locaux et les fruits et légumes de saison lorsque c’est possible, avec un budget géré pour maximiser la fraîcheur. Les menus d’hiver et d’été diffèrent pour suivre les arrivages. (Description de démonstration.)',
      ],
      keywords: ['local', 'provenance', 'fournisseur', 'saison'],
    },
    en: {
      question: 'Where does the CPE’s food come from?',
      answer: [
        'We favour local suppliers and seasonal produce whenever possible, with a budget managed to maximize freshness. Winter and summer menus differ to follow what is available. (Demonstration description.)',
      ],
      keywords: ['local', 'source', 'supplier', 'seasonal'],
    },
  },
  {
    category: 'Repas',
    audience: 'public',
    fr: {
      question: 'Limitez-vous le sucre et les aliments transformés ?',
      answer: [
        'Oui. Les desserts sont surtout à base de fruits ou de produits laitiers, les recettes sont maison et les aliments ultra-transformés sont l’exception. L’eau est la boisson de base entre les repas.',
      ],
      keywords: ['sucre', 'dessert', 'transformé', 'santé'],
    },
    en: {
      question: 'Do you limit sugar and processed foods?',
      answer: [
        'Yes. Desserts are mostly fruit- or dairy-based, recipes are homemade, and ultra-processed foods are the exception. Water is the default drink between meals.',
      ],
      keywords: ['sugar', 'dessert', 'processed', 'healthy'],
    },
  },
  {
    category: 'Repas',
    audience: 'public',
    fr: {
      question: 'Un membre de l’équipe est-il formé pour les réactions allergiques ?',
      answer: [
        'Toute l’équipe est formée en premiers soins pour la petite enfance, incluant l’administration d’un auto-injecteur (EpiPen). Les auto-injecteurs des enfants allergiques sont accessibles, identifiés et vérifiés régulièrement.',
      ],
      keywords: ['épipen', 'réaction', 'anaphylaxie', 'premiers soins'],
    },
    en: {
      question: 'Is the team trained for allergic reactions?',
      answer: [
        'The whole team holds early-childhood first-aid training, including auto-injector (EpiPen) administration. Allergic children’s auto-injectors are accessible, labelled and checked regularly.',
      ],
      keywords: ['epipen', 'reaction', 'anaphylaxis', 'first aid'],
    },
  },

  // ---------------- Horaire ----------------
  {
    category: 'Horaire',
    audience: 'public',
    fr: {
      question: 'Quelles sont les heures d’ouverture ?',
      answer: [
        'Le CPE est ouvert du lundi au vendredi, de 7 h à 18 h. (Horaire de démonstration.) Les arrivées se font idéalement avant 9 h 30 pour que votre enfant profite pleinement des activités du groupe.',
      ],
      keywords: ['heures', 'ouverture', 'fermeture', 'horaire'],
    },
    en: {
      question: 'What are the opening hours?',
      answer: [
        'The CPE is open Monday to Friday, 7 a.m. to 6 p.m. (Demonstration hours.) Ideally arrive before 9:30 a.m. so your child fully enjoys the group’s activities.',
      ],
      keywords: ['hours', 'opening', 'closing', 'schedule'],
    },
  },
  {
    category: 'Horaire',
    audience: 'public',
    fr: {
      question: 'À quoi ressemble une journée type ?',
      answer: [
        'Accueil en douceur dès 7 h, collation et causerie vers 8 h 30, ateliers et jeu libre en matinée, jeux extérieurs vers 10 h 30, dîner à 11 h 30, sieste en début d’après-midi, collation à 15 h, puis jeux calmes jusqu’aux départs.',
        'Chaque groupe adapte ce rythme à son âge — les poupons suivent leur propre horaire.',
      ],
      keywords: ['journée type', 'routine', 'horaire du jour', 'déroulement'],
    },
    en: {
      question: 'What does a typical day look like?',
      answer: [
        'Gentle arrival from 7 a.m., snack and circle time around 8:30, workshops and free play in the morning, outdoor play around 10:30, lunch at 11:30, nap in early afternoon, snack at 3 p.m., then quiet play until departures.',
        'Each group adapts this rhythm to its age — infants follow their own schedule.',
      ],
      keywords: ['typical day', 'routine', 'daily schedule', 'flow'],
    },
  },
  {
    category: 'Horaire',
    audience: 'public',
    fr: {
      question: 'Y a-t-il une heure limite d’arrivée le matin ?',
      answer: [
        'Aucune heure limite formelle, mais nous recommandons d’arriver avant 9 h 30 : après, le groupe est souvent dehors ou en atelier, et l’intégration au milieu de l’activité est plus difficile pour l’enfant. Prévenez-nous si vous arrivez plus tard (rendez-vous médical, etc.).',
      ],
      keywords: ['heure limite', 'arrivée', 'matin', 'retard matin'],
    },
    en: {
      question: 'Is there a morning arrival deadline?',
      answer: [
        'No formal deadline, but we recommend arriving before 9:30 a.m.: after that, the group is often outside or in a workshop, and joining mid-activity is harder for the child. Let us know if you arrive later (medical appointment, etc.).',
      ],
      keywords: ['deadline', 'arrival', 'morning', 'late morning'],
    },
  },
  {
    category: 'Horaire',
    audience: 'public',
    fr: {
      question: 'Quand le CPE est-il fermé pendant l’année ?',
      answer: [
        'Le CPE est fermé les jours fériés du Québec, deux semaines pendant le congé des Fêtes et lors de quelques journées pédagogiques annoncées longtemps d’avance. Le calendrier complet des fermetures est publié sur le site et dans le portail. (Calendrier de démonstration.)',
      ],
      keywords: ['fermé', 'fermetures', 'congés', 'calendrier', 'férié'],
    },
    en: {
      question: 'When is the CPE closed during the year?',
      answer: [
        'The CPE is closed on Québec statutory holidays, for two weeks over the holiday break, and on a few pedagogical days announced well in advance. The full closure calendar is published on the site and in the portal. (Demonstration calendar.)',
      ],
      keywords: ['closed', 'closures', 'holidays', 'calendar'],
    },
  },
  {
    category: 'Horaire',
    audience: 'public',
    fr: {
      question: 'Fermez-vous pendant les vacances de la construction ?',
      answer: [
        'Non — le CPE reste ouvert pendant les vacances de la construction. Beaucoup de familles prennent leurs vacances à ce moment : signalez les absences prévues pour nous aider à planifier l’été. (Politique de démonstration.)',
      ],
      keywords: ['construction', 'vacances', 'été', 'juillet'],
    },
    en: {
      question: 'Do you close during the construction holiday?',
      answer: [
        'No — the CPE stays open during Québec’s construction holiday. Many families vacation then: report planned absences to help us organize the summer. (Demonstration policy.)',
      ],
      keywords: ['construction holiday', 'vacation', 'summer', 'july'],
    },
  },
  {
    category: 'Horaire',
    audience: 'portal',
    fr: {
      question: 'Comment signaler une absence ou un retard ?',
      answer: [
        'Téléphonez-nous ou écrivez-nous avant 9 h le matin même. Pour une absence prolongée (vacances, maladie), prévenez l’éducatrice de votre groupe dès que possible — cela nous aide à planifier les repas et les activités.',
      ],
      keywords: ['absence', 'retard', 'signaler', 'aviser'],
    },
    en: {
      question: 'How do I report an absence or lateness?',
      answer: [
        'Call or email us before 9 a.m. that morning. For a longer absence (vacation, illness), tell your group’s educator as soon as possible — it helps us plan meals and activities.',
      ],
      keywords: ['absence', 'late', 'report', 'notify'],
    },
  },
  {
    category: 'Horaire',
    audience: 'public',
    fr: {
      question: 'Que se passe-t-il en cas de tempête de neige ?',
      answer: [
        'Le CPE ferme rarement pour la météo. Si une fermeture exceptionnelle est nécessaire (tempête majeure, avis des autorités), vous êtes avisés tôt le matin par courriel et par annonce dans le portail. En cas de fermeture hâtive en cours de journée, nous appelons chaque famille.',
      ],
      keywords: ['tempête', 'neige', 'fermeture urgence', 'météo'],
    },
    en: {
      question: 'What happens during a snowstorm?',
      answer: [
        'The CPE rarely closes for weather. If an exceptional closure is needed (major storm, authorities’ advisory), you are notified early in the morning by email and portal announcement. For an early closure during the day, we call every family.',
      ],
      keywords: ['storm', 'snow', 'emergency closure', 'weather'],
    },
  },
  {
    category: 'Horaire',
    audience: 'public',
    fr: {
      question: 'À quelle heure est la sieste ?',
      answer: [
        'La période de repos commence vers 12 h 45, après le dîner et une transition calme (histoire, musique douce). Les enfants qui ne dorment plus se reposent avec des livres ou des jeux calmes après 45 minutes. Les poupons dorment selon leur propre horaire.',
      ],
      keywords: ['sieste', 'repos', 'heure sieste', 'dodo'],
    },
    en: {
      question: 'What time is nap time?',
      answer: [
        'Rest time starts around 12:45, after lunch and a calm transition (story, soft music). Children who no longer sleep rest with books or quiet games after 45 minutes. Infants sleep on their own schedule.',
      ],
      keywords: ['nap', 'rest', 'nap time', 'sleep'],
    },
  },
  {
    category: 'Horaire',
    audience: 'public',
    fr: {
      question: 'Puis-je venir chercher mon enfant pendant la sieste ?',
      answer: [
        'Oui, mais si possible privilégiez avant 12 h 45 ou après 15 h : un départ au milieu du dortoir réveille les autres enfants. Prévenez l’éducatrice le matin pour qu’elle prépare votre enfant en douceur.',
      ],
      keywords: ['chercher', 'sieste', 'départ hâtif', 'rendez-vous'],
    },
    en: {
      question: 'Can I pick up my child during nap time?',
      answer: [
        'Yes, but if possible aim for before 12:45 or after 3 p.m.: a departure in the middle of the rest period wakes the other children. Tell the educator in the morning so she can prepare your child gently.',
      ],
      keywords: ['pickup', 'nap', 'early pickup', 'appointment'],
    },
  },
  {
    category: 'Horaire',
    audience: 'public',
    fr: {
      question: 'Les enfants sortent-ils dehors tous les jours ?',
      answer: [
        'Oui, deux fois par jour ou presque, en toute saison. Seules les conditions extrêmes nous gardent à l’intérieur : froid sous −25 °C avec le vent, pluie forte, orage, smog ou chaleur accablante. Habillez votre enfant en conséquence chaque matin.',
      ],
      keywords: ['dehors', 'extérieur', 'tous les jours', 'hiver'],
    },
    en: {
      question: 'Do the children go outside every day?',
      answer: [
        'Yes, twice a day or nearly, in every season. Only extreme conditions keep us inside: below −25 °C with wind chill, heavy rain, thunderstorms, smog or extreme heat. Dress your child accordingly each morning.',
      ],
      keywords: ['outside', 'outdoor', 'every day', 'winter'],
    },
  },
  {
    category: 'Horaire',
    audience: 'public',
    fr: {
      question: 'Comment se passent l’accueil du matin et le départ du soir ?',
      answer: [
        'Le matin, un membre de l’équipe accueille votre enfant et note toute consigne du jour (médicament autorisé, personne différente au départ, etc.). Le soir, l’éducatrice vous fait un retour sur la journée. Les portes sont sécurisées : chaque famille utilise son code d’accès. (Description de démonstration.)',
      ],
      keywords: ['accueil', 'départ', 'matin', 'soir', 'code'],
    },
    en: {
      question: 'How do morning drop-off and evening pickup work?',
      answer: [
        'In the morning, a team member welcomes your child and notes any instruction for the day (authorized medication, different pickup person, etc.). In the evening, the educator gives you a recap of the day. Doors are secured: each family uses its access code. (Demonstration description.)',
      ],
      keywords: ['drop-off', 'pickup', 'morning', 'evening', 'code'],
    },
  },
  {
    category: 'Horaire',
    audience: 'portal',
    fr: {
      question: 'Une autre personne vient chercher mon enfant : que faire ?',
      answer: [
        'Avisez-nous le matin même (verbalement, par téléphone ou par courriel) et assurez-vous que la personne figure dans la liste des personnes autorisées au dossier. Une pièce d’identité avec photo est exigée pour toute personne que l’équipe ne connaît pas — sans exception.',
      ],
      keywords: ['personne autorisée', 'chercher', 'grand-parent', 'identité'],
    },
    en: {
      question: 'Someone else is picking up my child — what do I do?',
      answer: [
        'Tell us that morning (verbally, by phone or by email) and make sure the person is on the authorized list in the file. Photo ID is required for anyone the team does not know — no exceptions.',
      ],
      keywords: ['authorized person', 'pickup', 'grandparent', 'id'],
    },
  },
  {
    category: 'Horaire',
    audience: 'public',
    fr: {
      question: 'Mon horaire de travail change : puis-je modifier les heures de garde ?',
      answer: [
        'L’entente de services couvre la plage complète d’ouverture (7 h à 18 h) : vous pouvez déposer et récupérer votre enfant à l’heure qui vous convient à l’intérieur de cette plage, sans modification de l’entente.',
      ],
      keywords: ['horaire travail', 'modifier heures', 'plage', 'flexible'],
    },
    en: {
      question: 'My work schedule changed — can I adjust care hours?',
      answer: [
        'The service agreement covers the full opening range (7 a.m. to 6 p.m.): you may drop off and pick up at whatever time suits you within that range, with no amendment needed.',
      ],
      keywords: ['work schedule', 'change hours', 'range', 'flexible'],
    },
  },
  {
    category: 'Horaire',
    audience: 'public',
    fr: {
      question: 'Qu’est-ce qu’une journée pédagogique au CPE ?',
      answer: [
        'C’est une journée de fermeture consacrée à la formation de l’équipe : premiers soins, programme éducatif, prévention. Ces journées (deux ou trois par année) sont annoncées des mois d’avance pour que les familles s’organisent. (Politique de démonstration.)',
      ],
      keywords: ['journée pédagogique', 'formation', 'fermeture', 'équipe'],
    },
    en: {
      question: 'What is a pedagogical day at the CPE?',
      answer: [
        'It is a closure day devoted to team training: first aid, educational program, prevention. These days (two or three per year) are announced months ahead so families can plan. (Demonstration policy.)',
      ],
      keywords: ['pedagogical day', 'training', 'closure', 'team'],
    },
  },
  {
    category: 'Horaire',
    audience: 'public',
    fr: {
      question: 'Proposez-vous de la garde le soir ou la fin de semaine ?',
      answer: [
        'Non — notre permis couvre la garde de jour en semaine, de 7 h à 18 h. Aucun service de soir, de nuit ou de fin de semaine n’est offert.',
      ],
      keywords: ['soir', 'fin de semaine', 'nuit', 'week-end'],
    },
    en: {
      question: 'Do you offer evening or weekend care?',
      answer: [
        'No — our permit covers weekday daytime care, 7 a.m. to 6 p.m. No evening, night or weekend service is offered.',
      ],
      keywords: ['evening', 'weekend', 'night', 'care'],
    },
  },
  {
    category: 'Horaire',
    audience: 'portal',
    fr: {
      question: 'Comment connaître les activités prévues pour le groupe de mon enfant ?',
      answer: [
        'La section Activités du portail parents montre tout ce qui s’en vient pour vos groupes : sorties, ateliers, listes de choses à apporter et consignes particulières. Les événements pour toutes les familles apparaissent aussi dans les Annonces.',
      ],
      keywords: ['activités prévues', 'groupe', 'programme', 'quoi apporter'],
    },
    en: {
      question: 'How do I know what activities are planned for my child’s group?',
      answer: [
        'The portal’s Activities section shows everything coming up for your groups: outings, workshops, what-to-bring lists and special instructions. Events for all families also appear in Announcements.',
      ],
      keywords: ['planned activities', 'group', 'program', 'what to bring'],
    },
  },
  {
    category: 'Horaire',
    audience: 'public',
    fr: {
      question: 'Les poupons suivent-ils le même horaire que les grands ?',
      answer: [
        'Non. À la pouponnière, chaque bébé garde son propre rythme de boires, de siestes et de jeux, établi avec vous et ajusté au fil des semaines. L’horaire de groupe ne s’applique que graduellement, vers 18 mois.',
      ],
      keywords: ['poupon', 'horaire bébé', 'rythme', 'sieste bébé'],
    },
    en: {
      question: 'Do infants follow the same schedule as older children?',
      answer: [
        'No. In the infant room, each baby keeps their own rhythm of feeds, naps and play, set with you and adjusted over the weeks. The group schedule only applies gradually, around 18 months.',
      ],
      keywords: ['infant', 'baby schedule', 'rhythm', 'baby nap'],
    },
  },
  {
    category: 'Horaire',
    audience: 'public',
    fr: {
      question: 'Comment sont annoncés les changements d’horaire exceptionnels ?',
      answer: [
        'Par annonce dans le portail parents (avec courriel pour les changements importants) et par affichage à l’entrée. Les fermetures planifiées figurent au calendrier publié en début d’année.',
      ],
      keywords: ['changement', 'exceptionnel', 'annonce', 'avis'],
    },
    en: {
      question: 'How are exceptional schedule changes announced?',
      answer: [
        'By portal announcement (with email for important changes) and by a notice at the entrance. Planned closures are on the calendar published at the start of the year.',
      ],
      keywords: ['change', 'exceptional', 'announcement', 'notice'],
    },
  },
]
