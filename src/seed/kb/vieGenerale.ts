import type { KBSeedArticle } from './types'

/** Activités + Événements + Informations générales — fictional demo content. */
export const vieGeneraleArticles: KBSeedArticle[] = [
  // ---------------- Activités ----------------
  {
    category: 'Activités',
    audience: 'public',
    fr: {
      question: 'Quel genre d’activités faites-vous avec les enfants ?',
      answer: [
        'Peinture et bricolage, bacs sensoriels, musique, yoga des petits, psychomotricité, jardinage, cuisine, sciences pour tout-petits, marches d’exploration et grands jeux extérieurs. Les activités suivent les saisons et — surtout — les intérêts des enfants.',
      ],
      keywords: ['activités', 'quoi faire', 'programme', 'ateliers'],
    },
    en: {
      question: 'What kinds of activities do you do with the children?',
      answer: [
        'Painting and crafts, sensory bins, music, toddler yoga, gross-motor play, gardening, cooking, toddler science, exploration walks and big outdoor games. Activities follow the seasons and — above all — the children’s interests.',
      ],
      keywords: ['activities', 'what to do', 'program', 'workshops'],
    },
  },
  {
    category: 'Activités',
    audience: 'public',
    fr: {
      question: 'Sur quel programme éducatif vous appuyez-vous ?',
      answer: [
        '« Accueillir la petite enfance », le programme éducatif du ministère de la Famille. Son principe central : l’enfant apprend par le jeu, et il est le premier acteur de son développement. Nous préparons l’environnement, puis nous observons et accompagnons.',
      ],
      keywords: ['programme éducatif', 'pédagogie', 'accueillir la petite enfance', 'jeu'],
    },
    en: {
      question: 'What educational program do you follow?',
      answer: [
        '“Accueillir la petite enfance”, the ministère de la Famille’s educational program. Its core principle: children learn through play and are the primary actors of their own development. We prepare the environment, then observe and support.',
      ],
      keywords: ['educational program', 'pedagogy', 'accueillir la petite enfance', 'play'],
    },
  },
  {
    category: 'Activités',
    audience: 'public',
    fr: {
      question: 'Faites-vous des sorties à l’extérieur du CPE ?',
      answer: [
        'Oui : parc voisin, bibliothèque, ferme, verger, cabane à sucre selon la saison. Chaque sortie exige une autorisation signée, un ratio renforcé et une trousse de premiers soins. Les détails (destination, heure, quoi apporter) sont publiés dans le portail parents.',
      ],
      keywords: ['sortie', 'excursion', 'autobus', 'parc'],
    },
    en: {
      question: 'Do you go on outings outside the CPE?',
      answer: [
        'Yes: the nearby park, the library, the farm, the orchard, the sugar shack in season. Every outing requires a signed authorization, a reinforced ratio and a first-aid kit. Details (destination, time, what to bring) are posted in the parent portal.',
      ],
      keywords: ['outing', 'field trip', 'bus', 'park'],
    },
  },
  {
    category: 'Activités',
    audience: 'public',
    fr: {
      question: 'Qu’est-ce que le jeu libre et pourquoi est-il si présent ?',
      answer: [
        'Le jeu libre, c’est l’enfant qui choisit quoi, avec qui et comment jouer. C’est là qu’il développe créativité, langage, autorégulation et habiletés sociales. Notre rôle : offrir un environnement riche et des invitations au jeu, pas un horaire d’adulte.',
      ],
      keywords: ['jeu libre', 'pourquoi', 'apprendre', 'jouer'],
    },
    en: {
      question: 'What is free play and why is it so central?',
      answer: [
        'Free play means the child chooses what, with whom and how to play. That is where creativity, language, self-regulation and social skills grow. Our role: offer a rich environment and play invitations, not an adult’s timetable.',
      ],
      keywords: ['free play', 'why', 'learning', 'play'],
    },
  },
  {
    category: 'Activités',
    audience: 'public',
    fr: {
      question: 'Y a-t-il des activités physiques tous les jours ?',
      answer: [
        'Oui — deux périodes extérieures par jour (ou presque) et des séances régulières en salle de motricité : parcours, danse, ballons, yoga. Les tout-petits ont besoin d’au moins trois heures d’activité physique par jour, et notre horaire est bâti en conséquence.',
      ],
      keywords: ['activité physique', 'bouger', 'motricité', 'sport'],
    },
    en: {
      question: 'Is there physical activity every day?',
      answer: [
        'Yes — two outdoor periods daily (or nearly) plus regular motor-room sessions: obstacle courses, dance, balls, yoga. Young children need at least three hours of physical activity a day, and our schedule is built accordingly.',
      ],
      keywords: ['physical activity', 'movement', 'motor skills', 'sport'],
    },
  },
  {
    category: 'Activités',
    audience: 'public',
    fr: {
      question: 'Les activités sont-elles différentes pour chaque groupe d’âge ?',
      answer: [
        'Oui. Les poupons explorent par les sens (textures, sons, coucou-caché) ; les 2-3 ans imitent et manipulent ; les 4-5 ans mènent des projets, jouent à des jeux de règles et préparent la maternelle. Une même thématique se décline différemment dans chaque local.',
      ],
      keywords: ['âge', 'différent', 'adapté', 'groupe'],
    },
    en: {
      question: 'Are activities different for each age group?',
      answer: [
        'Yes. Infants explore through the senses (textures, sounds, peekaboo); 2-3s imitate and manipulate; 4-5s run projects, play rule games and prepare for kindergarten. The same theme unfolds differently in each room.',
      ],
      keywords: ['age', 'different', 'adapted', 'group'],
    },
  },
  {
    category: 'Activités',
    audience: 'portal',
    fr: {
      question: 'Comment savoir quoi apporter pour une activité spéciale ?',
      answer: [
        'Chaque activité publiée dans le portail comprend sa liste « À apporter » (maillot, chapeau, vêtements salissables…) et ses consignes importantes. Un rappel est affiché au vestiaire la veille. En cas de doute, demandez à l’éducatrice le matin.',
      ],
      keywords: ['quoi apporter', 'liste', 'maillot', 'préparer'],
    },
    en: {
      question: 'How do I know what to bring for a special activity?',
      answer: [
        'Every activity posted in the portal includes its “to bring” list (swimsuit, hat, messy clothes…) and important instructions. A reminder is posted at the cubbies the day before. When unsure, ask the educator in the morning.',
      ],
      keywords: ['what to bring', 'list', 'swimsuit', 'prepare'],
    },
  },
  {
    category: 'Activités',
    audience: 'public',
    fr: {
      question: 'Les enfants jouent-ils dehors même en hiver ?',
      answer: [
        'Absolument — la neige est un immense terrain de jeu : glissade, châteaux, peinture sur neige, marches en raquettes pour les grands. Seul le froid extrême (−25 °C et moins avec le vent) nous garde à l’intérieur. Un habit de neige complet et des mitaines de rechange sont indispensables.',
      ],
      keywords: ['hiver', 'neige', 'froid', 'dehors hiver'],
    },
    en: {
      question: 'Do children play outside even in winter?',
      answer: [
        'Absolutely — snow is a giant playground: sliding, castles, snow painting, snowshoe walks for the older ones. Only extreme cold (−25 °C and below with wind) keeps us in. A full snowsuit and spare mittens are essential.',
      ],
      keywords: ['winter', 'snow', 'cold', 'outside winter'],
    },
  },
  {
    category: 'Activités',
    audience: 'public',
    fr: {
      question: 'Faites-vous de l’anglais ou d’autres langues ?',
      answer: [
        'Le quotidien se vit en français, langue du milieu. Chansons et comptines font parfois une place à d’autres langues, et la langue parlée à la maison est toujours valorisée — le bilinguisme familial est une richesse, jamais un problème.',
      ],
      keywords: ['anglais', 'langues', 'bilinguisme', 'francisation'],
    },
    en: {
      question: 'Do you teach English or other languages?',
      answer: [
        'Daily life happens in French, the language of the setting. Songs and rhymes sometimes make room for other languages, and the language spoken at home is always valued — family bilingualism is an asset, never a problem.',
      ],
      keywords: ['english', 'languages', 'bilingualism', 'french'],
    },
  },
  {
    category: 'Activités',
    audience: 'public',
    fr: {
      question: 'Comment sont choisies les thématiques d’activités ?',
      answer: [
        'À partir des observations des éducatrices : ce qui allume les enfants devient projet. Une flaque d’eau devient une semaine sur la pluie ; une fourmilière, un projet insectes. Les saisons et les fêtes offrent aussi leurs rendez-vous naturels.',
      ],
      keywords: ['thématique', 'thème', 'projet', 'choisir'],
    },
    en: {
      question: 'How are activity themes chosen?',
      answer: [
        'From the educators’ observations: whatever lights the children up becomes a project. A puddle becomes a week about rain; an anthill, an insect project. Seasons and holidays offer their natural moments too.',
      ],
      keywords: ['theme', 'topic', 'project', 'choose'],
    },
  },
  {
    category: 'Activités',
    audience: 'portal',
    fr: {
      question: 'Mon enfant peut-il être dispensé d’une sortie ?',
      answer: [
        'Oui. Si vous préférez qu’il ne participe pas, dites-le simplement : il passera la journée avec un autre groupe au CPE. Aucune justification requise, aucun impact — mais parlez-nous de vos inquiétudes, elles nous aident à mieux préparer les sorties.',
      ],
      keywords: ['dispense', 'sortie', 'ne pas participer', 'refuser sortie'],
    },
    en: {
      question: 'Can my child be excused from an outing?',
      answer: [
        'Yes. If you prefer they not take part, just say so: they will spend the day with another group at the CPE. No justification needed, no impact — but share your concerns, they help us prepare outings better.',
      ],
      keywords: ['excused', 'outing', 'not participate', 'opt out'],
    },
  },
  {
    category: 'Activités',
    audience: 'public',
    fr: {
      question: 'Les enfants font-ils du bricolage à rapporter à la maison ?',
      answer: [
        'Oui, régulièrement — et si l’œuvre du jour est une explosion de gouache encore humide, elle sèche au vestiaire avant de voyager. Mais nous valorisons le processus plus que le produit : certains chefs-d’œuvre sont éphémères (tours de blocs, châteaux de sable).',
      ],
      keywords: ['bricolage', 'rapporter', 'dessin', 'création'],
    },
    en: {
      question: 'Do children make crafts to bring home?',
      answer: [
        'Yes, regularly — and if today’s work is a still-wet paint explosion, it dries at the cubby before travelling. But we value process over product: some masterpieces are ephemeral (block towers, sandcastles).',
      ],
      keywords: ['craft', 'bring home', 'drawing', 'creation'],
    },
  },
  {
    category: 'Activités',
    audience: 'public',
    fr: {
      question: 'Y a-t-il de la musique au programme ?',
      answer: [
        'Tous les jours : chansons de routine, comptines, exploration d’instruments de percussion, danse. Une musicienne invitée anime aussi des ateliers d’éveil musical quelques fois par année. (Programmation de démonstration.)',
      ],
      keywords: ['musique', 'éveil musical', 'chanson', 'instruments'],
    },
    en: {
      question: 'Is music part of the program?',
      answer: [
        'Every day: routine songs, rhymes, percussion exploration, dance. A guest musician also leads musical-awakening workshops a few times a year. (Demonstration programming.)',
      ],
      keywords: ['music', 'musical awakening', 'song', 'instruments'],
    },
  },
  {
    category: 'Activités',
    audience: 'public',
    fr: {
      question: 'Comment le développement de la motricité fine est-il travaillé ?',
      answer: [
        'Par le jeu, jamais par des « exercices » : pâte à modeler, enfilage de perles, pinces et transvasements, dessin, découpage chez les grands. Ces gestes préparent naturellement l’écriture — sans crayon forcé avant que la main soit prête.',
      ],
      keywords: ['motricité fine', 'écriture', 'découpage', 'dessin'],
    },
    en: {
      question: 'How is fine motor development supported?',
      answer: [
        'Through play, never “exercises”: playdough, bead threading, tongs and pouring, drawing, cutting for the older ones. These gestures naturally prepare writing — no forced pencil before the hand is ready.',
      ],
      keywords: ['fine motor', 'writing', 'cutting', 'drawing'],
    },
  },
  {
    category: 'Activités',
    audience: 'public',
    fr: {
      question: 'Les activités de la semaine sont-elles affichées quelque part ?',
      answer: [
        'Le fil des activités à venir est publié sur la page Activités du site (sélection publique) et, pour tout le détail par groupe, dans le portail parents. Un tableau hebdomadaire est aussi affiché à la porte de chaque local.',
      ],
      keywords: ['semaine', 'affiché', 'programme', 'calendrier'],
    },
    en: {
      question: 'Are the week’s activities posted anywhere?',
      answer: [
        'Upcoming activities are published on the website’s Activities page (public selection) and, with full per-group detail, in the parent portal. A weekly board is also posted at each room’s door.',
      ],
      keywords: ['week', 'posted', 'program', 'calendar'],
    },
  },

  // ---------------- Événements ----------------
  {
    category: 'Événements',
    audience: 'public',
    fr: {
      question: 'Comment être informé des événements et sorties à venir ?',
      answer: [
        'Les événements sont publiés dans la section Annonces du portail parents, et les sorties propres à votre groupe apparaissent dans Activités. Les annonces importantes sont doublées d’un courriel.',
      ],
      keywords: ['événement', 'informé', 'annonces', 'calendrier'],
    },
    en: {
      question: 'How do I stay informed about upcoming events and outings?',
      answer: [
        'Events are published in the portal’s Announcements section, and your group’s outings appear under Activities. Important announcements are also sent by email.',
      ],
      keywords: ['event', 'informed', 'announcements', 'calendar'],
    },
  },
  {
    category: 'Événements',
    audience: 'public',
    fr: {
      question: 'Organisez-vous des événements pour les familles ?',
      answer: [
        'Oui, plusieurs fois par année : pique-nique des familles, fête de la rentrée, portes ouvertes, spectacle de fin d’année et fête de départ des futurs écoliers. Ce sont des moments précieux pour tisser la communauté du CPE.',
      ],
      keywords: ['événements familles', 'fête', 'pique-nique', 'spectacle'],
    },
    en: {
      question: 'Do you organize family events?',
      answer: [
        'Yes, several times a year: the family picnic, the back-to-school party, open house, the year-end show and the send-off party for future schoolchildren. Precious moments for weaving the CPE community together.',
      ],
      keywords: ['family events', 'party', 'picnic', 'show'],
    },
  },
  {
    category: 'Événements',
    audience: 'public',
    fr: {
      question: 'Fêtez-vous les anniversaires des enfants ?',
      answer: [
        'Oui — chaque enfant est fêté avec son groupe : chanson, couronne et surprise préparée par la cuisine (sans allergène). Merci de ne pas envoyer de gâteau ni de cadeaux : la fête, c’est l’attention du groupe.',
      ],
      keywords: ['anniversaire', 'fête', 'gâteau', 'célébration'],
    },
    en: {
      question: 'Do you celebrate children’s birthdays?',
      answer: [
        'Yes — every child is celebrated with their group: a song, a crown and an allergen-safe surprise from the kitchen. Please do not send cake or gifts: the celebration is the group’s attention.',
      ],
      keywords: ['birthday', 'party', 'cake', 'celebration'],
    },
  },
  {
    category: 'Événements',
    audience: 'public',
    fr: {
      question: 'Soulignez-vous les fêtes comme Noël et l’Halloween ?',
      answer: [
        'Oui, de façon inclusive et simple : costumes et cueillette de citrouilles à l’automne, bricolages et chansons en décembre, cabane à sucre au printemps. Chaque famille est la bienvenue de partager ses propres traditions avec le groupe.',
      ],
      keywords: ['noël', 'halloween', 'fêtes', 'traditions'],
    },
    en: {
      question: 'Do you mark holidays like Christmas and Halloween?',
      answer: [
        'Yes, simply and inclusively: costumes and pumpkin picking in the fall, crafts and songs in December, the sugar shack in spring. Every family is welcome to share its own traditions with the group.',
      ],
      keywords: ['christmas', 'halloween', 'holidays', 'traditions'],
    },
  },
  {
    category: 'Événements',
    audience: 'portal',
    fr: {
      question: 'Les parents peuvent-ils assister aux sorties comme accompagnateurs ?',
      answer: [
        'Pour certaines grandes sorties, oui — l’appel aux accompagnateurs est lancé dans les Annonces. Une vérification d’absence d’empêchement est requise pour accompagner régulièrement ; pour une sortie ponctuelle, les règles vous sont expliquées à l’inscription comme bénévole.',
      ],
      keywords: ['accompagnateur', 'bénévole', 'sortie parent', 'aider'],
    },
    en: {
      question: 'Can parents chaperone outings?',
      answer: [
        'For some big outings, yes — the call for chaperones goes out in Announcements. A background check is required for regular chaperoning; for a one-off outing, the rules are explained when you sign up as a volunteer.',
      ],
      keywords: ['chaperone', 'volunteer', 'parent outing', 'help'],
    },
  },
  {
    category: 'Événements',
    audience: 'portal',
    fr: {
      question: 'Où trouver les photos prises pendant un événement ?',
      answer: [
        'Dans la section Photos du portail parents, quelques jours après l’événement. Seules les photos vérifiées (aucun enfant identifiable sans consentement) y sont déposées, et l’accès est réservé aux familles concernées.',
      ],
      keywords: ['photos événement', 'souvenirs', 'galerie', 'voir photos'],
    },
    en: {
      question: 'Where do I find photos taken during an event?',
      answer: [
        'In the portal’s Photos section, a few days after the event. Only reviewed photos (no identifiable child without consent) are posted, and access is limited to the families concerned.',
      ],
      keywords: ['event photos', 'memories', 'gallery', 'see photos'],
    },
  },
  {
    category: 'Événements',
    audience: 'public',
    fr: {
      question: 'Qu’est-ce que la fête des finissants ?',
      answer: [
        'En juin, les Explorateurs qui partent vers la maternelle vivent leur grande journée : diplômes rigolos, spectacle préparé en secret et pique-nique avec les familles. Un rite de passage attendu toute l’année !',
      ],
      keywords: ['finissants', 'graduation', 'maternelle', 'juin'],
    },
    en: {
      question: 'What is the graduation party?',
      answer: [
        'In June, the Explorateurs heading to kindergarten get their big day: playful diplomas, a secretly rehearsed show and a picnic with families. A rite of passage awaited all year!',
      ],
      keywords: ['graduation', 'grads', 'kindergarten', 'june'],
    },
  },
  {
    category: 'Événements',
    audience: 'public',
    fr: {
      question: 'Y a-t-il une assemblée générale des parents ?',
      answer: [
        'Oui, chaque automne : présentation du rapport annuel, élection des parents au conseil d’administration et période de questions. Chaque famille membre a droit de vote — votre voix compte réellement dans un CPE.',
      ],
      keywords: ['assemblée générale', 'aga', 'conseil', 'vote'],
    },
    en: {
      question: 'Is there an annual general meeting for parents?',
      answer: [
        'Yes, every fall: annual report, election of parents to the board and a question period. Every member family gets a vote — your voice genuinely counts in a CPE.',
      ],
      keywords: ['general meeting', 'agm', 'board', 'vote'],
    },
  },
  {
    category: 'Événements',
    audience: 'portal',
    fr: {
      question: 'Comment confirmer ma présence à un événement familial ?',
      answer: [
        'Chaque invitation publiée dans les Annonces précise le mode de confirmation : réponse par courriel ou feuille d’inscription au vestiaire. Confirmer tôt nous aide à prévoir collations et matériel.',
      ],
      keywords: ['confirmer', 'rsvp', 'présence', 'inscription événement'],
    },
    en: {
      question: 'How do I RSVP for a family event?',
      answer: [
        'Each invitation posted in Announcements states how to confirm: by email reply or the sign-up sheet at the cubbies. Confirming early helps us plan snacks and materials.',
      ],
      keywords: ['confirm', 'rsvp', 'attendance', 'event signup'],
    },
  },
  {
    category: 'Événements',
    audience: 'public',
    fr: {
      question: 'Faites-vous une journée portes ouvertes ?',
      answer: [
        'Oui, une fois par année, généralement au printemps : visite des locaux, rencontre de l’équipe et réponses à toutes vos questions sur l’admission. La date est annoncée sur le site et la page d’accueil. (Programmation de démonstration.)',
      ],
      keywords: ['portes ouvertes', 'visite', 'découvrir', 'admission'],
    },
    en: {
      question: 'Do you hold an open house?',
      answer: [
        'Yes, once a year, usually in spring: tour the rooms, meet the team and get answers to all your admission questions. The date is announced on the website and home page. (Demonstration programming.)',
      ],
      keywords: ['open house', 'visit', 'discover', 'admission'],
    },
  },

  // ---------------- Informations générales ----------------
  {
    category: 'Informations générales',
    audience: 'public',
    fr: {
      question: 'Qu’est-ce qu’un CPE, au juste ?',
      answer: [
        'Un centre de la petite enfance : un service de garde éducatif sans but lucratif, titulaire d’un permis du ministère de la Famille, administré par un conseil d’administration majoritairement composé de parents, offrant des places à contribution réduite.',
      ],
      keywords: ['cpe', 'définition', 'centre petite enfance', 'garderie'],
    },
    en: {
      question: 'What exactly is a CPE?',
      answer: [
        'A centre de la petite enfance: a non-profit educational childcare service, licensed by the ministère de la Famille, governed by a parent-majority board, offering reduced-contribution spots.',
      ],
      keywords: ['cpe', 'definition', 'early childhood centre', 'daycare'],
    },
  },
  {
    category: 'Informations générales',
    audience: 'public',
    fr: {
      question: 'Quelle est la différence entre un CPE et une garderie privée ?',
      answer: [
        'Le CPE est sans but lucratif et gouverné par les parents ; les surplus retournent aux services. Les exigences de qualification du personnel et le programme éducatif encadré sont au cœur du modèle. Les garderies privées peuvent être subventionnées ou non, avec des modèles variables.',
      ],
      keywords: ['différence', 'garderie privée', 'subventionnée', 'comparaison'],
    },
    en: {
      question: 'What is the difference between a CPE and a private daycare?',
      answer: [
        'A CPE is non-profit and parent-governed; surpluses go back into services. Staff-qualification requirements and the structured educational program are central to the model. Private daycares may or may not be subsidized, with varying models.',
      ],
      keywords: ['difference', 'private daycare', 'subsidized', 'comparison'],
    },
  },
  {
    category: 'Informations générales',
    audience: 'public',
    fr: {
      question: 'Les éducatrices sont-elles qualifiées ?',
      answer: [
        'Oui — la réglementation exige qu’au moins deux membres du personnel de garde sur trois soient qualifiés (DEC ou AEC en éducation à l’enfance), et notre équipe dépasse ce seuil. La formation continue fait partie de la vie du CPE. (Description de démonstration.)',
      ],
      keywords: ['qualifiées', 'diplôme', 'dec', 'formation'],
    },
    en: {
      question: 'Are the educators qualified?',
      answer: [
        'Yes — regulations require at least two out of three childcare staff to be qualified (DEC or AEC in early childhood education), and our team exceeds that threshold. Continuing education is part of CPE life. (Demonstration description.)',
      ],
      keywords: ['qualified', 'diploma', 'dec', 'training'],
    },
  },
  {
    category: 'Informations générales',
    audience: 'public',
    fr: {
      question: 'Combien d’enfants fréquentent le CPE ?',
      answer: [
        'Notre permis autorise environ 60 places réparties en cinq groupes, des poupons aux 4-5 ans. Une taille humaine : tout le monde se connaît par son prénom. (Capacité de démonstration.)',
      ],
      keywords: ['combien d’enfants', 'places', 'capacité', 'taille'],
    },
    en: {
      question: 'How many children attend the CPE?',
      answer: [
        'Our permit allows about 60 spots across five groups, from infants to 4-5s. A human scale: everyone knows everyone by name. (Demonstration capacity.)',
      ],
      keywords: ['how many children', 'spots', 'capacity', 'size'],
    },
  },
  {
    category: 'Informations générales',
    audience: 'public',
    fr: {
      question: 'Comment joindre l’administration ?',
      answer: [
        'Par téléphone au 418 555-0123 (démo) ou par courriel à bonjour@voielactee-demo.example. Le bureau est ouvert de 8 h à 17 h en semaine. Pour tout ce qui concerne la journée en cours, appelez plutôt que d’écrire.',
      ],
      keywords: ['joindre', 'téléphone', 'courriel', 'contact'],
    },
    en: {
      question: 'How do I reach the administration?',
      answer: [
        'By phone at 418 555-0123 (demo) or by email at bonjour@voielactee-demo.example. The office is open 8 a.m. to 5 p.m. on weekdays. For anything about the current day, call rather than write.',
      ],
      keywords: ['reach', 'phone', 'email', 'contact'],
    },
  },
  {
    category: 'Informations générales',
    audience: 'public',
    fr: {
      question: 'Où êtes-vous situés ? Y a-t-il du stationnement ?',
      answer: [
        'Au 123, rue de la Démonstration à Québec (adresse fictive de démonstration). Un débarcadère de 15 minutes longe le bâtiment pour les arrivées et départs, et du stationnement gratuit se trouve dans les rues voisines.',
      ],
      keywords: ['adresse', 'situé', 'stationnement', 'débarcadère'],
    },
    en: {
      question: 'Where are you located? Is there parking?',
      answer: [
        'At 123 rue de la Démonstration in Québec City (fictional demonstration address). A 15-minute drop-off zone runs along the building for arrivals and departures, and free street parking is nearby.',
      ],
      keywords: ['address', 'located', 'parking', 'drop-off zone'],
    },
  },
  {
    category: 'Informations générales',
    audience: 'public',
    fr: {
      question: 'Le CPE est-il accessible aux poussettes et aux personnes à mobilité réduite ?',
      answer: [
        'Oui : entrée de plain-pied, rampe d’accès, espace poussettes au vestiaire et salle d’eau adaptée. Signalez tout besoin particulier et nous ajusterons ce qu’il faut. (Description de démonstration.)',
      ],
      keywords: ['accessible', 'poussette', 'mobilité réduite', 'rampe'],
    },
    en: {
      question: 'Is the CPE stroller- and wheelchair-accessible?',
      answer: [
        'Yes: step-free entrance, access ramp, stroller area at the cubbies and an adapted washroom. Tell us about any particular need and we will adjust as required. (Demonstration description.)',
      ],
      keywords: ['accessible', 'stroller', 'reduced mobility', 'ramp'],
    },
  },
  {
    category: 'Informations générales',
    audience: 'public',
    fr: {
      question: 'Comment accéder au portail parents ?',
      answer: [
        'Cliquez sur « Portail parents » dans le menu du site, puis connectez-vous avec votre courriel — par mot de passe ou par lien magique reçu par courriel. Les comptes sont créés par l’administration à l’inscription de votre enfant ; il n’y a pas d’inscription libre.',
      ],
      keywords: ['portail', 'connexion', 'accès', 'compte'],
    },
    en: {
      question: 'How do I access the parent portal?',
      answer: [
        'Click “Parent portal” in the site menu, then sign in with your email — using a password or a magic link sent by email. Accounts are created by the administration when your child is enrolled; there is no self-registration.',
      ],
      keywords: ['portal', 'sign in', 'access', 'account'],
    },
  },
  {
    category: 'Informations générales',
    audience: 'public',
    fr: {
      question: 'J’ai oublié mon mot de passe du portail : que faire ?',
      answer: [
        'Utilisez l’onglet « Lien magique » de la page de connexion : entrez votre courriel et cliquez sur le lien reçu — aucun mot de passe requis. Si votre courriel a changé, contactez l’administration pour mettre le compte à jour.',
      ],
      keywords: ['mot de passe oublié', 'lien magique', 'connexion', 'réinitialiser'],
    },
    en: {
      question: 'I forgot my portal password — what do I do?',
      answer: [
        'Use the “Magic link” tab on the sign-in page: enter your email and click the link you receive — no password needed. If your email changed, contact the administration to update the account.',
      ],
      keywords: ['forgot password', 'magic link', 'sign in', 'reset'],
    },
  },
  {
    category: 'Informations générales',
    audience: 'portal',
    fr: {
      question: 'Que trouve-t-on dans le portail parents ?',
      answer: [
        'Les activités à venir de vos groupes (avec les listes de préparation), les annonces et événements du CPE, les photos partagées, les documents (menus, politiques, relevés) et le centre d’aide avec l’assistant de questions.',
      ],
      keywords: ['portail contenu', 'sections', 'quoi trouver', 'fonctionnalités'],
    },
    en: {
      question: 'What is in the parent portal?',
      answer: [
        'Your groups’ upcoming activities (with preparation lists), CPE announcements and events, shared photos, documents (menus, policies, statements) and the help centre with the question assistant.',
      ],
      keywords: ['portal content', 'sections', 'what’s inside', 'features'],
    },
  },
  {
    category: 'Informations générales',
    audience: 'public',
    fr: {
      question: 'Dans quelle langue communiquez-vous avec les familles ?',
      answer: [
        'Le français est la langue du CPE. Le site et le portail sont aussi offerts en anglais, et nous faisons preuve de souplesse dans les échanges individuels pour que chaque famille comprenne bien tout ce qui concerne son enfant.',
      ],
      keywords: ['langue', 'français', 'anglais', 'communication'],
    },
    en: {
      question: 'In which language do you communicate with families?',
      answer: [
        'French is the CPE’s language. The website and portal are also available in English, and we stay flexible in individual exchanges so every family fully understands everything about their child.',
      ],
      keywords: ['language', 'french', 'english', 'communication'],
    },
  },
  {
    category: 'Informations générales',
    audience: 'public',
    fr: {
      question: 'Qui dirige le CPE ?',
      answer: [
        'La directrice générale assure la gestion quotidienne, appuyée par une directrice adjointe. Les grandes orientations sont votées par le conseil d’administration, composé majoritairement de parents élus. (Organisation de démonstration.)',
      ],
      keywords: ['direction', 'directrice', 'qui dirige', 'organisation'],
    },
    en: {
      question: 'Who runs the CPE?',
      answer: [
        'The executive director handles daily management, supported by an assistant director. Major orientations are voted by the board of directors, mostly elected parents. (Demonstration organization.)',
      ],
      keywords: ['direction', 'director', 'who runs', 'organization'],
    },
  },
  {
    category: 'Informations générales',
    audience: 'public',
    fr: {
      question: 'Le CPE embauche-t-il ? Comment postuler ?',
      answer: [
        'Les postes ouverts sont affichés sur la page Carrières du site, où vous pouvez postuler en ligne avec votre CV — y compris par candidature spontanée. Nous répondons à toutes les candidatures.',
      ],
      keywords: ['emploi', 'embauche', 'postuler', 'carrière'],
    },
    en: {
      question: 'Is the CPE hiring? How do I apply?',
      answer: [
        'Open positions are posted on the website’s Careers page, where you can apply online with your CV — including spontaneous applications. We reply to every application.',
      ],
      keywords: ['job', 'hiring', 'apply', 'career'],
    },
  },
  {
    category: 'Informations générales',
    audience: 'public',
    fr: {
      question: 'Puis-je faire un stage ou du bénévolat au CPE ?',
      answer: [
        'Nous accueillons des stagiaires en éducation à l’enfance en partenariat avec les cégeps de la région. Toute personne œuvrant auprès des enfants — stagiaire ou bénévole — passe la vérification d’absence d’empêchement au préalable.',
      ],
      keywords: ['stage', 'stagiaire', 'bénévolat', 'cégep'],
    },
    en: {
      question: 'Can I intern or volunteer at the CPE?',
      answer: [
        'We host early-childhood-education interns in partnership with regional CEGEPs. Anyone working with the children — intern or volunteer — passes the background check first.',
      ],
      keywords: ['internship', 'intern', 'volunteer', 'cegep'],
    },
  },
  {
    category: 'Informations générales',
    audience: 'public',
    fr: {
      question: 'Comment le CPE est-il financé ?',
      answer: [
        'Principalement par des subventions du ministère de la Famille, complétées par la contribution réduite des parents. Le budget est présenté aux parents à l’assemblée générale annuelle — la transparence fait partie du modèle.',
      ],
      keywords: ['financement', 'subvention', 'budget', 'argent'],
    },
    en: {
      question: 'How is the CPE funded?',
      answer: [
        'Mainly by ministère de la Famille subsidies, complemented by the parents’ reduced contribution. The budget is presented to parents at the annual general meeting — transparency is part of the model.',
      ],
      keywords: ['funding', 'subsidy', 'budget', 'money'],
    },
  },
  {
    category: 'Informations générales',
    audience: 'portal',
    fr: {
      question: 'Comment fonctionne l’assistant du centre d’aide ?',
      answer: [
        'Posez votre question en français ou en anglais : l’assistant répond uniquement à partir des informations officielles publiées par le CPE — il n’invente jamais rien. S’il ne trouve pas, il vous invite à écrire à l’équipe. Pour toute question urgente ou délicate, contactez directement l’administration.',
      ],
      keywords: ['assistant', 'centre d’aide', 'chatbot', 'questions'],
    },
    en: {
      question: 'How does the help-centre assistant work?',
      answer: [
        'Ask your question in French or English: the assistant answers only from the official information published by the CPE — it never makes anything up. If it cannot find an answer, it invites you to write to the team. For anything urgent or sensitive, contact the administration directly.',
      ],
      keywords: ['assistant', 'help centre', 'chatbot', 'questions'],
    },
  },
  {
    category: 'Informations générales',
    audience: 'public',
    fr: {
      question: 'Avez-vous une liste d’attente interne en plus de La Place 0-5 ?',
      answer: [
        'Non — la loi impose de passer par le guichet unique La Place 0-5, et c’est la seule liste que nous utilisons. Aucun paiement ni « réservation » ne peut accélérer l’accès à une place.',
      ],
      keywords: ['liste interne', 'passe-droit', 'réservation', 'attente'],
    },
    en: {
      question: 'Do you keep an internal waiting list besides La Place 0-5?',
      answer: [
        'No — the law requires going through the single waiting list La Place 0-5, and it is the only list we use. No payment or “reservation” can speed up access to a spot.',
      ],
      keywords: ['internal list', 'favouritism', 'reservation', 'waiting'],
    },
  },
  {
    category: 'Informations générales',
    audience: 'public',
    fr: {
      question: 'Que faire si je déménage en cours d’année ?',
      answer: [
        'Rien ne change tant que vous pouvez continuer à venir au CPE : il n’y a aucune exigence de territoire. Pensez simplement à mettre à jour vos coordonnées au dossier et sur La Place 0-5.',
      ],
      keywords: ['déménagement', 'territoire', 'adresse', 'changement'],
    },
    en: {
      question: 'What if we move during the year?',
      answer: [
        'Nothing changes as long as you can keep coming to the CPE: there is no territorial requirement. Just remember to update your contact details in the file and on La Place 0-5.',
      ],
      keywords: ['moving', 'territory', 'address', 'change'],
    },
  },
  {
    category: 'Informations générales',
    audience: 'public',
    fr: {
      question: 'Mon employeur demande une attestation de fréquentation : pouvez-vous la fournir ?',
      answer: [
        'Oui — écrivez à l’administration en précisant ce que le document doit contenir (dates, jours de fréquentation) et nous vous le remettrons en quelques jours ouvrables.',
      ],
      keywords: ['attestation', 'fréquentation', 'employeur', 'document'],
    },
    en: {
      question: 'My employer needs an attendance attestation — can you provide it?',
      answer: [
        'Yes — write to the administration stating what the document must contain (dates, attendance days) and we will provide it within a few business days.',
      ],
      keywords: ['attestation', 'attendance', 'employer', 'document'],
    },
  },
  {
    category: 'Informations générales',
    audience: 'public',
    fr: {
      question: 'Le site web du CPE publie-t-il des renseignements sur les enfants ?',
      answer: [
        'Jamais. Le site public ne contient ni nom d’enfant, ni photo permettant d’en identifier un, ni horaire précis de groupe. Les informations sensibles vivent uniquement dans le portail privé et sécurisé des familles.',
      ],
      keywords: ['site web', 'vie privée', 'enfants', 'photos publiques'],
    },
    en: {
      question: 'Does the CPE website publish information about the children?',
      answer: [
        'Never. The public site contains no child’s name, no photo that could identify one, and no precise group schedule. Sensitive information lives only in the families’ private, secure portal.',
      ],
      keywords: ['website', 'privacy', 'children', 'public photos'],
    },
  },
]
