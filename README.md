# CPE Lumière — Site web (maquette statique temporaire)

> ⚠️ **Ceci est une maquette de démonstration indépendante**, publiée séparément
> sur cette branche `gh-pages`. Le vrai projet CPE (Next.js + Payload CMS,
> nom de code « Lumière ») vit sur la branche `main` et n'est pas affecté par
> cette page. Ne pas fusionner cette branche dans `main`.

Site vitrine statique pour le **CPE Lumière**, un centre de la petite enfance
(service de garde éducatif québécois pour les enfants de 0 à 5 ans).

## Aperçu

- **`index.html`** — Accueil : mission, groupes d'âge, chiffres clés, témoignages.
- **`programme.html`** — Programme éducatif inspiré d'*Accueillir la petite enfance*,
  journée type et alimentation.
- **`inscription.html`** — Étapes d'inscription via La Place 0-5, tarification
  subventionnée et FAQ.
- **`equipe.html`** — Présentation de l'équipe et ratios éducatrice-enfants.
- **`contact.html`** — Coordonnées, heures d'ouverture et formulaire de contact (démo).
- **`404.html`** — Page d'erreur.

## Technologie

Site 100 % statique, sans étape de compilation ni dépendance :

- HTML sémantique et accessible (skip link, ARIA, contrastes).
- CSS maison (`assets/css/styles.css`) : design responsive, palette chaleureuse
  (soleil, corail, sarcelle), variables CSS.
- JavaScript léger (`assets/js/main.js`) : menu mobile, apparitions au défilement,
  démo du formulaire. Aucune bibliothèque externe.
- Police Nunito via Google Fonts, avec repli sur les polices système.

## Lancer localement

N'importe quel serveur statique fonctionne :

```bash
python3 -m http.server 8000
# puis ouvrir http://localhost:8000
```

## Déployer sur GitHub Pages

1. Dans les paramètres du dépôt : **Settings → Pages**.
2. Source : *Deploy from a branch*, branche `main`, dossier `/ (root)`.
3. Le site sera publié à `https://<votre-compte>.github.io/cpe-lumiere/`.

## À personnaliser avant la mise en ligne

Le contenu utilise des **coordonnées fictives** clairement identifiées :

- [ ] Adresse, téléphone et courriel (pied de page de chaque page et `contact.html`).
- [ ] Nombre de places au permis et noms des groupes (`index.html`).
- [ ] Brancher le formulaire de contact à un service d'envoi
      (Formspree, Netlify Forms, etc.) — il est actuellement en mode démonstration.
- [ ] Intégrer une carte réelle dans `contact.html`.
- [ ] Vérifier le tarif de la contribution réduite en vigueur sur
      [Québec.ca](https://www.quebec.ca/famille-et-soutien-aux-personnes/enfance/garderies-et-services-de-garde).
