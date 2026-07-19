# Gestion des comptes — CPE La Voie lactée (démo)

> Comment les comptes sont créés, activés et gérés dans la plateforme.
> Deux rôles complètement distincts : **l'administration** (directrice / personnel) et **les parents**.
> Version anglaise résumée à la fin. / English summary at the end.

---

## 1. Les deux espaces, les deux rôles

| | Administration (directrice) | Parents |
|---|---|---|
| **Espace** | Panneau d'administration — `/admin` | Portail parents — `/portail` |
| **Collection de comptes** | `users` (rôles : `director`, `staff`, `developer`) | `parents` (collection séparée — jamais un compte admin) |
| **Création du compte** | Par un compte directeur/développeur existant | **Uniquement par l'administration** — aucune auto-inscription |
| **Ce qu'ils voient** | Tout : contenu, comptes, candidatures, journaux | Seulement le contenu **publié** visé par les groupes de **leur** enfant |
| **Durée de session** | Session admin Payload standard | 8 heures |

La séparation est appliquée **côté serveur** (`src/access/index.ts`) : un parent ne peut jamais lire les données d'un autre groupe, la liste des autres parents, les comptes admin, les candidatures ni les journaux — peu importe l'URL ou l'API utilisée.

## 2. Ce que la directrice peut faire (dans `/admin`)

- **Gérer les parents** : créer / désactiver un compte parent, changer son courriel, ses groupes, sa langue de communication, réinitialiser son mot de passe (champ *Mot de passe* de la fiche parent).
- **Gérer les groupes** : créer les groupes d'âge, leurs couleurs et descriptions.
- **Téléverser des photos** : galerie (consentement obligatoire avant publication — bloqué côté serveur sinon), visibilité `portail` par défaut, portée par groupe optionnelle.
- **Publier des activités** : privées (portail) par défaut ; rendre une activité publique est un choix explicite.
- **Publier des annonces / nouvelles / événements / rappels** : jamais publics — réservés au portail ; épinglage, planification (`publier à`), archivage.
- **Gérer les documents** : PDF (menus, politiques, relevés), audience `public` ou `portail`.
- **Envoyer des notifications et campagnes courriel** : toujours en deux étapes (aperçu des destinataires → confirmation), toutes journalisées.
- **Consulter les candidatures** (page Carrières) et le **journal des questions** posées à l'assistant.

## 3. Cycle de vie d'un compte parent

1. **Création** — À l'inscription de l'enfant, la directrice crée le compte dans `/admin` → *Parents* : courriel du parent, nom de famille affiché, groupe(s) de l'enfant, langue. Un mot de passe initial peut être défini et transmis de vive voix, **ou** le parent utilise directement le lien magique (recommandé).
2. **Activation** — Le compte est actif dès que la case *Actif* est cochée (par défaut). Le parent se connecte sur `/portail` :
   - **Option A — mot de passe** fourni par l'administration ;
   - **Option B — lien magique** : le parent entre son courriel, reçoit un lien valable 15 minutes, à usage unique. Aucun mot de passe à retenir.
3. **Gestion courante** — Changement de groupe de l'enfant (transition annuelle) : la directrice met à jour le champ *Groupes* ; l'accès du parent suit automatiquement. Changement de courriel : mise à jour de la fiche.
4. **Mot de passe oublié** — Le parent utilise le lien magique (autonome), ou la directrice définit un nouveau mot de passe dans la fiche. *(Note : demander un lien magique remplace l'ancien mot de passe — comportement attendu.)*
5. **Départ de la famille** — Décocher *Actif* (accès coupé immédiatement, historique conservé) puis supprimer le compte une fois le dossier clos, selon le calendrier de conservation (Loi 25).

## 4. Comptes de démonstration (créés par `npm run seed`)

| Rôle | Courriel | Mot de passe |
|---|---|---|
| Directrice (admin) | `direction@voielactee-demo.example` | `Lumiere-Demo-2026!` |
| Parent A (Papillons) | `famille.tremblay@voielactee-demo.example` | `Parent-Demo-2026!` |
| Parent B (Poussins + Explorateurs) | `famille.nguyen@voielactee-demo.example` | `Parent-Demo-2026!` |

Connectez-vous avec les deux comptes parents pour constater que chacun ne voit **que** les activités, photos et annonces de ses propres groupes.

## 5. Règles de sécurité non négociables

- Aucune auto-inscription ; aucune donnée d'enfant dans le système (pas de fiches enfants — seulement des groupes).
- Un parent n'est jamais un utilisateur admin ; les deux collections sont étanches.
- Le filtrage par groupe vit dans la couche d'accès serveur, pas dans l'interface.
- Toute photo publiée exige la confirmation de consentement (bloqué serveur sinon).
- Tout envoi de notification est confirmé en deux étapes et journalisé.

---

## English summary

Two fully separate roles: **Administration** (`/admin`, `users` collection — director/staff manage parents, children groups, photos, activities, announcements, documents, password resets, account creation) and **Parents** (`/portail`, separate `parents` collection — they only see published content targeted at their own child's groups: activities, photos, announcements, documents, calendar, help centre).

Parent account lifecycle: created by the administration only (no self-registration) → activated via the *Active* flag → parent signs in with a password or a single-use 15-minute **magic link** → group changes are handled by editing the parent's *Groups* field → forgotten passwords are solved by magic link or an admin reset → when a family leaves, uncheck *Active*, then delete per the retention schedule (Law 25).

All group scoping, consent gating and role separation are enforced **server-side** in `src/access/index.ts` — never only in the UI.
