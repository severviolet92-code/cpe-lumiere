import type { KBSeedArticle } from './types'

/** Santé (health) + Politiques (policies) — fictional demo content. */
export const santePolitiquesArticles: KBSeedArticle[] = [
  // ---------------- Santé ----------------
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Mon enfant fait de la fièvre : puis-je l’amener au CPE ?',
      answer: [
        'Non — un enfant fiévreux (38,5 °C et plus, température rectale) doit rester à la maison jusqu’à 24 heures sans fièvre, sans médicament. Si la fièvre apparaît au CPE, nous vous appelons et l’enfant doit être récupéré dans l’heure.',
      ],
      keywords: ['fièvre', 'température', 'malade', 'amener'],
    },
    en: {
      question: 'My child has a fever — can they come to the CPE?',
      answer: [
        'No — a child with fever (38.5 °C or higher, rectal) must stay home until 24 hours fever-free without medication. If fever starts at the CPE, we call you and the child must be picked up within the hour.',
      ],
      keywords: ['fever', 'temperature', 'sick', 'bring'],
    },
  },
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Quels symptômes exigent que mon enfant reste à la maison ?',
      answer: [
        'Fièvre, vomissements ou diarrhée dans les dernières 24 heures, éruption cutanée non diagnostiquée, conjonctivite purulente non traitée, ou tout état qui empêche l’enfant de suivre les activités du groupe (y compris jouer dehors).',
        'En cas de doute, appelez-nous avant de venir — nous vous répondrons franchement.',
      ],
      keywords: ['symptômes', 'exclusion', 'vomissement', 'diarrhée', 'rester maison'],
    },
    en: {
      question: 'Which symptoms mean my child must stay home?',
      answer: [
        'Fever, vomiting or diarrhea in the last 24 hours, an undiagnosed rash, untreated purulent conjunctivitis, or any condition that prevents the child from following group activities (including playing outside).',
        'When in doubt, call us before coming — we will give you a straight answer.',
      ],
      keywords: ['symptoms', 'exclusion', 'vomiting', 'diarrhea', 'stay home'],
    },
  },
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Que se passe-t-il si mon enfant tombe malade pendant la journée ?',
      answer: [
        'Nous l’isolons confortablement avec un adulte, nous vous appelons immédiatement et nous notons ses symptômes. Vous (ou une personne autorisée) devez venir le chercher dans un délai raisonnable — habituellement une heure.',
      ],
      keywords: ['malade pendant la journée', 'appel', 'chercher', 'symptômes'],
    },
    en: {
      question: 'What happens if my child gets sick during the day?',
      answer: [
        'We settle them comfortably with an adult, call you immediately and note their symptoms. You (or an authorized person) must pick them up within a reasonable time — usually one hour.',
      ],
      keywords: ['sick during day', 'call', 'pickup', 'symptoms'],
    },
  },
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Pouvez-vous administrer un médicament à mon enfant ?',
      answer: [
        'Oui, sous conditions strictes : ordonnance médicale, autorisation écrite signée du parent, médicament dans son contenant d’origine étiqueté au nom de l’enfant. L’administration est consignée dans un registre.',
        'L’acétaminophène (fièvre) et l’insectifuge suivent les protocoles du ministère, avec votre autorisation écrite.',
      ],
      keywords: ['médicament', 'ordonnance', 'administrer', 'autorisation'],
    },
    en: {
      question: 'Can you give my child medication?',
      answer: [
        'Yes, under strict conditions: a medical prescription, signed written parental authorization, medication in its original container labelled with the child’s name. Every administration is logged.',
        'Acetaminophen (fever) and insect repellent follow the ministry protocols, with your written authorization.',
      ],
      keywords: ['medication', 'prescription', 'administer', 'authorization'],
    },
  },
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Le carnet de vaccination est-il obligatoire ?',
      answer: [
        'La vaccination n’est pas légalement obligatoire au Québec, mais nous demandons une copie du carnet au dossier : en cas d’éclosion d’une maladie évitable par la vaccination, la santé publique peut exiger le retrait temporaire des enfants non protégés.',
      ],
      keywords: ['vaccin', 'vaccination', 'carnet', 'obligatoire'],
    },
    en: {
      question: 'Is the vaccination record mandatory?',
      answer: [
        'Vaccination is not legally mandatory in Québec, but we ask for a copy of the record in the file: during an outbreak of a vaccine-preventable disease, public health can require unprotected children to stay home temporarily.',
      ],
      keywords: ['vaccine', 'vaccination', 'record', 'mandatory'],
    },
  },
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Comment gérez-vous les poux ?',
      answer: [
        'Sans drame : les poux ne sont pas une maladie. Si nous en détectons, nous vous avisons discrètement le jour même et une note anonyme est envoyée au groupe. L’enfant revient dès qu’un traitement est commencé — aucune exclusion prolongée.',
      ],
      keywords: ['poux', 'lentes', 'tête', 'traitement'],
    },
    en: {
      question: 'How do you handle head lice?',
      answer: [
        'Without drama: lice are not an illness. If we detect them, we notify you discreetly the same day and an anonymous note goes to the group. The child returns as soon as treatment has started — no extended exclusion.',
      ],
      keywords: ['lice', 'nits', 'head', 'treatment'],
    },
  },
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Que faites-vous en cas de blessure mineure ?',
      answer: [
        'Premiers soins immédiats par l’équipe (toute l’équipe est certifiée), consignation dans le registre des incidents et rapport remis au parent le soir même avec explication. Pour tout coup à la tête, nous vous appelons immédiatement, même si l’enfant semble bien.',
      ],
      keywords: ['blessure', 'bobo', 'incident', 'premiers soins'],
    },
    en: {
      question: 'What do you do for a minor injury?',
      answer: [
        'Immediate first aid by the team (everyone is certified), an entry in the incident log, and a report given to the parent that evening with an explanation. For any bump to the head, we call you immediately, even if the child seems fine.',
      ],
      keywords: ['injury', 'boo-boo', 'incident', 'first aid'],
    },
  },
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Et en cas d’urgence médicale sérieuse ?',
      answer: [
        'Nous appelons le 911, puis les parents, dans cet ordre. Un membre de l’équipe accompagne l’enfant en tout temps, y compris dans l’ambulance si nécessaire, avec sa fiche d’identification et ses informations médicales.',
      ],
      keywords: ['urgence', '911', 'ambulance', 'hôpital'],
    },
    en: {
      question: 'And in a serious medical emergency?',
      answer: [
        'We call 911, then the parents, in that order. A team member stays with the child at all times, including in the ambulance if needed, with their ID sheet and medical information.',
      ],
      keywords: ['emergency', '911', 'ambulance', 'hospital'],
    },
  },
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Comment prévenez-vous la propagation des microbes ?',
      answer: [
        'Lavage des mains systématique (arrivée, avant les repas, après les jeux extérieurs et les mouchages), désinfection quotidienne des jouets et surfaces, aération des locaux et application des mesures de la santé publique en cas d’éclosion.',
      ],
      keywords: ['microbes', 'hygiène', 'lavage des mains', 'désinfection'],
    },
    en: {
      question: 'How do you prevent the spread of germs?',
      answer: [
        'Systematic handwashing (arrival, before meals, after outdoor play and nose-wiping), daily disinfection of toys and surfaces, room ventilation, and public-health measures during outbreaks.',
      ],
      keywords: ['germs', 'hygiene', 'handwashing', 'disinfection'],
    },
  },
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Avisez-vous les parents en cas de maladie contagieuse dans le groupe ?',
      answer: [
        'Oui. Dès qu’un cas de maladie contagieuse à déclaration (varicelle, pieds-mains-bouche, gastro, etc.) est confirmé dans un groupe, une note est envoyée aux parents du groupe — sans jamais identifier l’enfant concerné.',
      ],
      keywords: ['contagieux', 'éclosion', 'varicelle', 'avis aux parents'],
    },
    en: {
      question: 'Do you notify parents of contagious illness in the group?',
      answer: [
        'Yes. As soon as a reportable contagious illness (chickenpox, hand-foot-mouth, gastro, etc.) is confirmed in a group, a notice goes to the group’s parents — never identifying the child concerned.',
      ],
      keywords: ['contagious', 'outbreak', 'chickenpox', 'parent notice'],
    },
  },
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Mon enfant a besoin d’un ÉpiPen : comment ça se passe ?',
      answer: [
        'L’auto-injecteur est fourni par le parent, identifié au nom de l’enfant, rangé hors de portée des enfants mais immédiatement accessible à l’équipe — y compris lors des sorties. Toute l’équipe est formée pour l’administrer, et la date d’expiration est vérifiée chaque mois.',
      ],
      keywords: ['épipen', 'auto-injecteur', 'anaphylaxie', 'allergie grave'],
    },
    en: {
      question: 'My child needs an EpiPen — how does that work?',
      answer: [
        'The auto-injector is provided by the parent, labelled with the child’s name, stored out of children’s reach but immediately accessible to the team — including on outings. The whole team is trained to administer it, and the expiry date is checked monthly.',
      ],
      keywords: ['epipen', 'auto-injector', 'anaphylaxis', 'severe allergy'],
    },
  },
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Appliquez-vous de la crème solaire ?',
      answer: [
        'Oui — avec votre autorisation écrite (donnée une fois à l’inscription), nous appliquons la crème solaire fournie par le CPE avant chaque sortie estivale. Si votre enfant a besoin d’une crème particulière, fournissez-la identifiée à son nom.',
      ],
      keywords: ['crème solaire', 'soleil', 'protection', 'été'],
    },
    en: {
      question: 'Do you apply sunscreen?',
      answer: [
        'Yes — with your written authorization (given once at registration), we apply CPE-provided sunscreen before every summer outing. If your child needs a specific cream, provide it labelled with their name.',
      ],
      keywords: ['sunscreen', 'sun', 'protection', 'summer'],
    },
  },
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Comment gérez-vous les siestes des enfants qui ne dorment plus ?',
      answer: [
        'Le repos reste obligatoire (c’est une exigence réglementaire et un vrai besoin), mais pas le sommeil : après 45 minutes calmes sur son matelas, un enfant éveillé peut regarder des livres ou faire un jeu silencieux. Personne n’est forcé de dormir.',
      ],
      keywords: ['sieste', 'ne dort plus', 'repos', 'obligatoire'],
    },
    en: {
      question: 'What about naps for children who no longer sleep?',
      answer: [
        'Rest remains required (a regulatory requirement and a real need), but sleep does not: after 45 calm minutes on their mat, an awake child may look at books or play quietly. No one is forced to sleep.',
      ],
      keywords: ['nap', 'no longer sleeps', 'rest', 'mandatory'],
    },
  },
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Comment les poupons sont-ils couchés ?',
      answer: [
        'Sur le dos, dans un lit de bébé individuel conforme, sans couverture lourde ni objets mous — les pratiques de sommeil sécuritaire recommandées par la santé publique. Une surveillance visuelle et physique régulière est assurée pendant tout le sommeil.',
      ],
      keywords: ['sommeil sécuritaire', 'poupon', 'dos', 'lit de bébé'],
    },
    en: {
      question: 'How are infants put to sleep?',
      answer: [
        'On their backs, in an individual compliant crib, without heavy blankets or soft objects — the safe-sleep practices recommended by public health. Regular visual and physical checks continue throughout sleep.',
      ],
      keywords: ['safe sleep', 'infant', 'back', 'crib'],
    },
  },
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Un enfant qui a vomi peut-il revenir le lendemain ?',
      answer: [
        'Il faut 24 heures sans vomissement ni diarrhée, avec une alimentation normale reprise, avant le retour. Cette règle protège tout le groupe — et votre enfant, qui a besoin de récupérer.',
      ],
      keywords: ['vomi', 'gastro', 'retour', '24 heures'],
    },
    en: {
      question: 'Can a child who vomited return the next day?',
      answer: [
        'A child needs 24 hours without vomiting or diarrhea, with normal eating resumed, before returning. This rule protects the whole group — and your child, who needs to recover.',
      ],
      keywords: ['vomit', 'gastro', 'return', '24 hours'],
    },
  },
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Prenez-vous la température des enfants systématiquement ?',
      answer: [
        'Non — uniquement quand l’état de l’enfant le justifie (joues rouges, léthargie, comportement inhabituel). Le résultat et l’heure sont notés et communiqués au parent.',
      ],
      keywords: ['température', 'thermomètre', 'vérification', 'quand'],
    },
    en: {
      question: 'Do you take children’s temperature systematically?',
      answer: [
        'No — only when the child’s condition warrants it (flushed cheeks, lethargy, unusual behaviour). The result and time are noted and shared with the parent.',
      ],
      keywords: ['temperature', 'thermometer', 'check', 'when'],
    },
  },
  {
    category: 'Santé',
    audience: 'portal',
    fr: {
      question: 'Mon enfant a des médicaments au dossier : comment vérifier ce qui est autorisé ?',
      answer: [
        'Les autorisations en vigueur (acétaminophène, insectifuge, crème, médicaments prescrits) figurent dans le dossier signé à l’inscription. Pour vérifier ou modifier une autorisation, passez au bureau — la mise à jour se fait le jour même.',
      ],
      keywords: ['autorisation', 'vérifier', 'dossier', 'médicaments autorisés'],
    },
    en: {
      question: 'How do I check which medications are authorized in my child’s file?',
      answer: [
        'Current authorizations (acetaminophen, insect repellent, creams, prescribed medications) are in the file signed at registration. To check or change an authorization, stop by the office — updates are same-day.',
      ],
      keywords: ['authorization', 'check', 'file', 'authorized medication'],
    },
  },
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Que faites-vous lors des canicules ?',
      answer: [
        'Sorties tôt le matin, jeux d’eau et zones ombragées, hydratation fréquente, activités calmes aux heures chaudes et locaux rafraîchis. En cas d’avertissement de chaleur extrême, les sorties sont écourtées ou annulées.',
      ],
      keywords: ['canicule', 'chaleur', 'été', 'hydratation'],
    },
    en: {
      question: 'What do you do during heat waves?',
      answer: [
        'Early-morning outings, water play and shaded areas, frequent hydration, calm activities in the hot hours and cooled rooms. Under an extreme-heat warning, outings are shortened or cancelled.',
      ],
      keywords: ['heat wave', 'heat', 'summer', 'hydration'],
    },
  },
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'L’équipe est-elle formée en premiers soins ?',
      answer: [
        'Oui — chaque membre du personnel éducateur détient une certification de secourisme adaptée à la petite enfance (incluant la RCR et la gestion de l’étouffement), renouvelée aux trois ans comme l’exige la réglementation.',
      ],
      keywords: ['premiers soins', 'rcr', 'secourisme', 'formation'],
    },
    en: {
      question: 'Is the team trained in first aid?',
      answer: [
        'Yes — every educator holds an early-childhood-adapted first-aid certification (including CPR and choking response), renewed every three years as regulations require.',
      ],
      keywords: ['first aid', 'cpr', 'certification', 'training'],
    },
  },
  {
    category: 'Santé',
    audience: 'public',
    fr: {
      question: 'Comment soutenez-vous le développement du langage ?',
      answer: [
        'Par la lecture quotidienne, les comptines, la verbalisation des routines et des ateliers de langage intégrés au jeu. Si une inquiétude apparaît, l’éducatrice vous en parle tôt et peut vous orienter vers les ressources du CLSC — jamais de diagnostic maison.',
      ],
      keywords: ['langage', 'parole', 'retard', 'orthophonie'],
    },
    en: {
      question: 'How do you support language development?',
      answer: [
        'Through daily reading, rhymes, verbalized routines and language-rich play. If a concern appears, the educator raises it with you early and can point you to CLSC resources — never a homemade diagnosis.',
      ],
      keywords: ['language', 'speech', 'delay', 'speech therapy'],
    },
  },

  // ---------------- Politiques ----------------
  {
    category: 'Politiques',
    audience: 'public',
    fr: {
      question: 'Quoi mettre dans le sac de mon enfant chaque jour ?',
      answer: [
        'Vêtements de rechange complets identifiés, vêtements selon la météo (nous sortons tous les jours), doudou pour la sieste et, pour les poupons, couches et crème. L’hiver : deuxième paire de mitaines et bas de rechange. Tout doit être identifié au nom de l’enfant.',
      ],
      keywords: ['sac', 'quoi apporter', 'rechange', 'vêtements'],
    },
    en: {
      question: 'What goes in my child’s bag every day?',
      answer: [
        'A full set of labelled spare clothes, weather-appropriate clothing (we go outside daily), a comfort item for nap and, for infants, diapers and cream. In winter: a second pair of mittens and spare socks. Everything labelled with the child’s name.',
      ],
      keywords: ['bag', 'what to bring', 'spare', 'clothes'],
    },
  },
  {
    category: 'Politiques',
    audience: 'public',
    fr: {
      question: 'Publiez-vous des photos des enfants ?',
      answer: [
        'Jamais sur le site public : aucune photo permettant d’identifier un enfant n’y est publiée. Le partage de photos avec les familles se fait uniquement dans le portail privé, avec le consentement écrit des parents, et chaque photo est vérifiée avant publication.',
      ],
      keywords: ['photos', 'publier', 'consentement', 'image'],
    },
    en: {
      question: 'Do you publish photos of the children?',
      answer: [
        'Never on the public website: no photo that could identify a child is published there. Photo sharing with families happens only in the private portal, with written parental consent, and every photo is reviewed before publishing.',
      ],
      keywords: ['photos', 'publish', 'consent', 'image'],
    },
  },
  {
    category: 'Politiques',
    audience: 'public',
    fr: {
      question: 'Quelle est votre approche de la discipline ?',
      answer: [
        'Une intervention démocratique, jamais punitive : nous nommons l’émotion, offrons des choix, réparons plutôt que punissons. Aucune punition corporelle, aucune mesure dégradante — c’est la loi, et c’est surtout notre conviction.',
      ],
      keywords: ['discipline', 'punition', 'conséquence', 'intervention'],
    },
    en: {
      question: 'What is your approach to discipline?',
      answer: [
        'Democratic guidance, never punitive: we name the emotion, offer choices, repair rather than punish. No corporal punishment, no degrading measures — it is the law, and above all our conviction.',
      ],
      keywords: ['discipline', 'punishment', 'consequence', 'guidance'],
    },
  },
  {
    category: 'Politiques',
    audience: 'public',
    fr: {
      question: 'Que faites-vous quand un enfant mord ou frappe ?',
      answer: [
        'Les morsures et les coups font partie du développement normal avant 3 ans. Nous protégeons d’abord les enfants, puis nous accompagnons : mots pour remplacer le geste, observation des déclencheurs, plan avec les parents si le comportement persiste. Les deux familles sont informées, sans jamais nommer l’autre enfant.',
      ],
      keywords: ['mord', 'morsure', 'frappe', 'agressif'],
    },
    en: {
      question: 'What do you do when a child bites or hits?',
      answer: [
        'Biting and hitting are part of normal development before age 3. We protect the children first, then coach: words to replace the gesture, observing triggers, a plan with parents if it persists. Both families are informed, without ever naming the other child.',
      ],
      keywords: ['bites', 'biting', 'hits', 'aggressive'],
    },
  },
  {
    category: 'Politiques',
    audience: 'public',
    fr: {
      question: 'Les jouets de la maison sont-ils permis ?',
      answer: [
        'La doudou et le toutou de sieste, oui — ils sont précieux. Les autres jouets restent à la maison : ils créent des conflits, se perdent et peuvent présenter des risques pour les plus petits. Des journées spéciales « montre et raconte » sont parfois organisées chez les grands.',
      ],
      keywords: ['jouets', 'maison', 'toutou', 'apporter jouet'],
    },
    en: {
      question: 'Are toys from home allowed?',
      answer: [
        'The nap blanket and plush, yes — they are precious. Other toys stay home: they create conflicts, get lost and can be hazards for the youngest. Special show-and-tell days are sometimes organized for the older groups.',
      ],
      keywords: ['toys', 'home', 'plush', 'bring toy'],
    },
  },
  {
    category: 'Politiques',
    audience: 'public',
    fr: {
      question: 'Comment mon enfant doit-il être habillé ?',
      answer: [
        'Confortable et salissable : nos journées incluent peinture, sable et gazon. Prévoyez des chaussures qui tiennent bien au pied pour la cour et adaptez les couches de vêtements à la saison. L’hiver, habit de neige complet obligatoire.',
      ],
      keywords: ['habillé', 'vêtements', 'habit de neige', 'chaussures'],
    },
    en: {
      question: 'How should my child be dressed?',
      answer: [
        'Comfortable and mess-friendly: our days include paint, sand and grass. Provide shoes that stay on well for the yard and layer according to season. In winter, a full snowsuit is required.',
      ],
      keywords: ['dressed', 'clothes', 'snowsuit', 'shoes'],
    },
  },
  {
    category: 'Politiques',
    audience: 'portal',
    fr: {
      question: 'Comment modifier mes coordonnées ou les personnes autorisées ?',
      answer: [
        'Écrivez à l’administration ou passez au bureau : la mise à jour des numéros d’urgence et des personnes autorisées à récupérer votre enfant se fait le jour même. Une pièce d’identité est exigée pour toute personne inconnue de l’équipe.',
      ],
      keywords: ['coordonnées', 'personnes autorisées', 'urgence', 'modifier'],
    },
    en: {
      question: 'How do I update my contact details or authorized pick-up people?',
      answer: [
        'Write to the administration or stop by the office: emergency numbers and authorized pick-up people are updated the same day. Photo ID is required for anyone the team does not know.',
      ],
      keywords: ['contact details', 'authorized people', 'emergency', 'update'],
    },
  },
  {
    category: 'Politiques',
    audience: 'public',
    fr: {
      question: 'Comment la sécurité des lieux est-elle assurée ?',
      answer: [
        'Portes verrouillées en tout temps avec code d’accès familial, registre des visiteurs, cour clôturée conforme aux normes, inspections régulières du matériel et exercices d’évacuation pratiqués avec les enfants plusieurs fois par année.',
      ],
      keywords: ['sécurité', 'porte', 'code', 'clôture', 'évacuation'],
    },
    en: {
      question: 'How is the facility kept secure?',
      answer: [
        'Doors locked at all times with a family access code, visitor log, fenced yard meeting standards, regular equipment inspections and evacuation drills practised with the children several times a year.',
      ],
      keywords: ['security', 'door', 'code', 'fence', 'evacuation'],
    },
  },
  {
    category: 'Politiques',
    audience: 'public',
    fr: {
      question: 'Le personnel fait-il l’objet de vérifications ?',
      answer: [
        'Oui — la loi l’exige et nous l’appliquons sans exception : vérification d’absence d’empêchement (antécédents judiciaires) pour chaque personne travaillant au CPE, renouvelée aux trois ans, y compris les stagiaires et le personnel de soutien.',
      ],
      keywords: ['antécédents', 'vérification', 'empêchement', 'personnel'],
    },
    en: {
      question: 'Are staff background-checked?',
      answer: [
        'Yes — the law requires it and we apply it without exception: an absence-of-impediment (criminal background) check for every person working at the CPE, renewed every three years, including interns and support staff.',
      ],
      keywords: ['background check', 'verification', 'impediment', 'staff'],
    },
  },
  {
    category: 'Politiques',
    audience: 'public',
    fr: {
      question: 'Comment déposer un commentaire ou une plainte ?',
      answer: [
        'Parlez d’abord à l’éducatrice ou à la direction — la plupart des situations se règlent par une conversation. Pour une plainte formelle, la procédure écrite est disponible au bureau et la plainte peut aussi être adressée au ministère de la Famille. Aucune plainte n’a de conséquence sur le service offert à votre enfant.',
      ],
      keywords: ['plainte', 'commentaire', 'insatisfaction', 'procédure'],
    },
    en: {
      question: 'How do I make a comment or complaint?',
      answer: [
        'Speak first with the educator or the direction — most situations resolve through a conversation. For a formal complaint, the written procedure is available at the office, and complaints can also go to the ministère de la Famille. No complaint ever affects the service your child receives.',
      ],
      keywords: ['complaint', 'comment', 'dissatisfaction', 'procedure'],
    },
  },
  {
    category: 'Politiques',
    audience: 'public',
    fr: {
      question: 'Quelle est votre politique sur les écrans ?',
      answer: [
        'Aucun écran au quotidien. Les activités sont concrètes et sensorielles — c’est ce dont le cerveau des 0-5 ans a besoin. Une projection exceptionnelle (film de Noël, par exemple) peut avoir lieu une ou deux fois par année, annoncée aux parents.',
      ],
      keywords: ['écran', 'télévision', 'tablette', 'film'],
    },
    en: {
      question: 'What is your screen policy?',
      answer: [
        'No screens in daily life. Activities are concrete and sensory — what 0-5 brains need. An exceptional screening (a holiday movie, for example) may happen once or twice a year, announced to parents.',
      ],
      keywords: ['screen', 'television', 'tablet', 'movie'],
    },
  },
  {
    category: 'Politiques',
    audience: 'public',
    fr: {
      question: 'Comment communiquez-vous avec les parents au quotidien ?',
      answer: [
        'Le contact direct matin et soir d’abord ; le portail parents pour les annonces, activités, photos et documents ; le courriel pour les communications importantes ; le téléphone pour tout ce qui est urgent ou délicat. Jamais d’information sensible par texto.',
      ],
      keywords: ['communication', 'contact', 'nouvelles', 'portail'],
    },
    en: {
      question: 'How do you communicate with parents day to day?',
      answer: [
        'Direct contact at drop-off and pickup first; the parent portal for announcements, activities, photos and documents; email for important communications; phone for anything urgent or sensitive. Never sensitive information by text.',
      ],
      keywords: ['communication', 'contact', 'news', 'portal'],
    },
  },
  {
    category: 'Politiques',
    audience: 'public',
    fr: {
      question: 'Qu’est-ce que la politique d’expulsion ? Un enfant peut-il être renvoyé ?',
      answer: [
        'La fin d’entente à l’initiative du CPE est un dernier recours extrêmement rare, encadré par la loi, seulement après un plan d’accompagnement documenté avec la famille et les ressources externes. Notre travail est d’accompagner chaque enfant, pas de trier.',
      ],
      keywords: ['expulsion', 'renvoi', 'fin d’entente', 'exclusion'],
    },
    en: {
      question: 'What is the expulsion policy? Can a child be removed?',
      answer: [
        'CPE-initiated termination is an extremely rare last resort, regulated by law, only after a documented support plan with the family and outside resources. Our job is to support every child, not to sort them.',
      ],
      keywords: ['expulsion', 'removal', 'termination', 'exclusion'],
    },
  },
  {
    category: 'Politiques',
    audience: 'public',
    fr: {
      question: 'Comment sont protégés les renseignements personnels de ma famille ?',
      answer: [
        'Selon la Loi 25 : collecte limitée au nécessaire, accès restreint au personnel concerné, conservation sécurisée, et destruction des dossiers selon le calendrier légal. La direction agit comme responsable de la protection des renseignements personnels. Aucune donnée n’est vendue ni partagée à des fins commerciales.',
      ],
      keywords: ['renseignements personnels', 'loi 25', 'confidentialité', 'données'],
    },
    en: {
      question: 'How is my family’s personal information protected?',
      answer: [
        'Per Québec’s Law 25: collection limited to what is necessary, access restricted to relevant staff, secure storage, and file destruction per the legal schedule. The direction acts as privacy officer. No data is ever sold or shared commercially.',
      ],
      keywords: ['personal information', 'law 25', 'privacy', 'data'],
    },
  },
  {
    category: 'Politiques',
    audience: 'portal',
    fr: {
      question: 'Un parent séparé peut-il recevoir les communications lui aussi ?',
      answer: [
        'Oui. Les deux parents titulaires de l’autorité parentale reçoivent les communications et peuvent avoir chacun leur accès au portail, sauf ordonnance du tribunal contraire déposée au dossier. Informez la direction de toute situation particulière.',
      ],
      keywords: ['séparé', 'garde partagée', 'deux parents', 'communications'],
    },
    en: {
      question: 'Can a separated parent also receive communications?',
      answer: [
        'Yes. Both parents holding parental authority receive communications and can each have portal access, unless a court order on file says otherwise. Inform the direction of any particular situation.',
      ],
      keywords: ['separated', 'shared custody', 'both parents', 'communications'],
    },
  },
  {
    category: 'Politiques',
    audience: 'public',
    fr: {
      question: 'Les parents peuvent-ils s’impliquer dans le CPE ?',
      answer: [
        'Oui, et c’est encouragé ! Le conseil d’administration est composé majoritairement de parents élus à l’assemblée générale annuelle. Il y a aussi des occasions ponctuelles : accompagnement de sorties, corvées de jardinage, fêtes de saison.',
      ],
      keywords: ['implication', 'conseil d’administration', 'bénévole', 'participer'],
    },
    en: {
      question: 'Can parents get involved in the CPE?',
      answer: [
        'Yes, and it is encouraged! The board of directors has a majority of parents elected at the annual general meeting. There are also one-off occasions: chaperoning outings, garden work parties, seasonal celebrations.',
      ],
      keywords: ['involvement', 'board', 'volunteer', 'participate'],
    },
  },
  {
    category: 'Politiques',
    audience: 'public',
    fr: {
      question: 'Que se passe-t-il si j’oublie de venir chercher mon enfant ?',
      answer: [
        'Nous tentons de vous joindre, puis les contacts d’urgence, dans l’ordre du dossier. Un membre de l’équipe reste avec votre enfant en tout temps — il ne sera jamais laissé seul. Les frais de retard prévus s’appliquent. (Politique de démonstration.)',
      ],
      keywords: ['oubli', 'chercher', 'retard fermeture', 'urgence'],
    },
    en: {
      question: 'What happens if I forget to pick up my child?',
      answer: [
        'We try to reach you, then the emergency contacts, in file order. A team member stays with your child at all times — they will never be left alone. The scheduled late fees apply. (Demonstration policy.)',
      ],
      keywords: ['forgot', 'pickup', 'late closing', 'emergency'],
    },
  },
  {
    category: 'Politiques',
    audience: 'public',
    fr: {
      question: 'Une personne en état d’ébriété peut-elle récupérer un enfant ?',
      answer: [
        'La sécurité de l’enfant prime : si l’équipe a un motif raisonnable de croire que la personne ne peut pas assurer la sécurité de l’enfant, elle propose d’appeler un autre contact autorisé et peut, si nécessaire, contacter les autorités. C’est une obligation légale de protection.',
      ],
      keywords: ['ébriété', 'facultés affaiblies', 'sécurité départ', 'refus'],
    },
    en: {
      question: 'Can someone who is impaired pick up a child?',
      answer: [
        'The child’s safety comes first: if the team has reasonable grounds to believe the person cannot keep the child safe, they offer to call another authorized contact and can, if necessary, contact the authorities. This is a legal duty of protection.',
      ],
      keywords: ['impaired', 'intoxicated', 'pickup safety', 'refusal'],
    },
  },
  {
    category: 'Politiques',
    audience: 'public',
    fr: {
      question: 'Avez-vous une politique d’intégration progressive pour les nouveaux enfants ?',
      answer: [
        'Oui — elle est remise à l’inscription : présences courtes qui s’allongent sur une à deux semaines, parent disponible, éducatrice de référence stable et communication quotidienne renforcée pendant la période d’adaptation.',
      ],
      keywords: ['intégration progressive', 'adaptation', 'politique', 'nouveaux'],
    },
    en: {
      question: 'Do you have a gradual-integration policy for new children?',
      answer: [
        'Yes — provided at registration: short visits lengthening over one to two weeks, an available parent, a stable reference educator and reinforced daily communication during the adaptation period.',
      ],
      keywords: ['gradual integration', 'adaptation', 'policy', 'new children'],
    },
  },
  {
    category: 'Politiques',
    audience: 'portal',
    fr: {
      question: 'Comment fonctionne le calendrier de la rentrée et des transitions de groupe ?',
      answer: [
        'Fin août, chaque famille reçoit le calendrier de transition : dates de passage au nouveau groupe, visites de familiarisation et rencontre avec la nouvelle éducatrice. Les transitions sont étalées sur deux semaines pour rester douces.',
      ],
      keywords: ['rentrée', 'transition', 'calendrier', 'nouveau groupe'],
    },
    en: {
      question: 'How does the re-entry and group-transition calendar work?',
      answer: [
        'In late August, each family receives the transition calendar: dates for moving to the new group, familiarization visits and a meeting with the new educator. Transitions are spread over two weeks to stay gentle.',
      ],
      keywords: ['re-entry', 'transition', 'calendar', 'new group'],
    },
  },
]
