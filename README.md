# ♿ MakeItAccessible — Audit d'Accessibilité Web Automatisé

> Application full-stack qui analyse automatiquement l'accessibilité d'un site web selon le référentiel **RGAA 4.1.2** (Référentiel Général d'Amélioration de l'Accessibilité), en s'appuyant sur **Playwright**, **axe-core** et une architecture de tests modulaire.

---

## 🎯 Objectif du Projet

Ce projet est avant tout **éducatif**. Il a pour vocation de maîtriser :

- Les **appels API** REST entre un front Next.js et un back Node.js/Express
- L'écriture et l'orchestration de **tests automatisés** (Playwright + axe-core)
- La **gestion d'état** avec Redux Toolkit et la persistance des données
- La gestion d'une **base de données** MongoDB (modèles, requêtes, relations)
- L'**authentification** utilisateur (inscription, connexion, JWT)
- Le **travail en équipe** (Git, conventions, découpage des tâches)

L'application permet à **n'importe qui** de soumettre l'URL d'un site web et de lancer un audit d'accessibilité automatisé — **sans inscription nécessaire**. La création d'un compte permet de retrouver l'historique de ses audits passés.

---

## 🧱 Architecture Générale

```
┌──────────────────────────────────────────────────────────────┐
│                  CLIENT — Next.js (:3001)                    │
│            Redux Toolkit · Ant Design · CSS Modules          │
│                                                              │
│  ┌────────────┐  ┌──────────────┐  ┌───────────────────────┐│
│  │  Accueil   │  │ Inscription /│  │   Rapport d'audit     ││
│  │  (Analyse) │  │ Connexion    │  │   (par catégorie)     ││
│  │  URL input │  │              │  │   ✅ ❌ ⚠️            ││
│  │  + Générer │  │              │  │                       ││
│  └─────┬──────┘  └──────────────┘  └──────────▲────────────┘│
│        │                                      │             │
└────────┼──────────────────────────────────────┼─────────────┘
         │ POST /api/audit                      │ GET /api/audit/:id
         ▼                                      │
┌──────────────────────────────────────────────────────────────┐
│                 SERVEUR — Express (:5000)                     │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                   Routes API (/api)                    │  │
│  │                                                        │  │
│  │  Public :                    Protégé (JWT) :           │  │
│  │  POST /auth/register         GET /audits/me            │  │
│  │  POST /auth/login            GET /audit/:id (si owner) │  │
│  │  POST /audit ← libre                                  │  │
│  │  GET  /audit/:id ← libre                              │  │
│  └────────────────────────┬───────────────────────────────┘  │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │           Contrôleur d'audit (audit.controller.js)     │  │
│  │           Appelle runAllTests(url)                     │  │
│  └────────────────────────┬───────────────────────────────┘  │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │              runAllTests.js (orchestrateur)            │  │
│  │                                                        │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────┐ │  │
│  │  │ 1.Image │ │ 2.Cadre │ │ 3.Coule │ │ 4.Multiméd. │ │  │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────────┘ │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────┐ │  │
│  │  │ 5.Table │ │ 6.Liens │ │ 7.Scrip │ │ 8.Éléments  │ │  │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────────┘ │  │
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────┐ │  │
│  │  │ 9.Struc │ │10.Prése │ │11.Formu │ │ 12.Navigat. │ │  │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────────┘ │  │
│  │  ┌───────────┐                                        │  │
│  │  │13.Consult │  ← chaque module = 1 fichier           │  │
│  │  └───────────┘    retourne { passed, failed, N/A }    │  │
│  └────────────────────────────────────────────────────────┘  │
│                           │                                  │
│                    Playwright + axe-core                     │
│               (navigateur headless + analyse DOM)            │
│                                                              │
└──────────────────────────┬───────────────────────────────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │    MongoDB      │
                  │                 │
                  │  • users        │
                  │  • audits       │
                  └─────────────────┘
```

---

## 📁 Structure du Projet

```
MakeItAccessible/
│
├── MakeItAccessible-front/              # Front-end Next.js
│   ├── pages/
│   │   ├── _app.js                      # Point d'entrée Next (Provider Redux + Ant)
│   │   └── index.js                     # Page d'accueil
│   ├── components/
│   │   ├── Analyse.js                   # Formulaire URL + bouton "Analyser mon site"
│   │   ├── Header.js                    # Barre de navigation
│   │   └── ...
│   ├── reducers/
│   │   └── user.js                      # Slice Redux (auth, infos utilisateur)
│   ├── styles/
│   │   ├── globals.css                  # Styles globaux
│   │   ├── Home.module.css              # Styles page d'accueil
│   │   └── Header.module.css            # Styles header
│   ├── public/
│   │   └── images/                      # Assets statiques
│   ├── jest.config.js                   # Configuration Jest
│   ├── next.config.js                   # Configuration Next.js
│   └── package.json
│
├── MakeItAccessible-back/               # Back-end Node.js / Express
│   ├── routes/
│   │   ├── auth.routes.js               # POST /register, POST /login
│   │   └── audit.routes.js              # POST /audit, GET /audit/:id, GET /audits/me
│   ├── controllers/
│   │   ├── auth.controller.js           # Logique inscription / connexion
│   │   └── audit.controller.js          # Lance l'audit, sauvegarde, retourne le rapport
│   ├── models/
│   │   ├── User.js                      # Schéma utilisateur (Mongoose)
│   │   └── Audit.js                     # Schéma rapport d'audit (Mongoose)
│   ├── middlewares/
│   │   ├── auth.middleware.js            # Vérification JWT
│   │   └── optionalAuth.middleware.js    # Attache le user si connecté, sinon continue
│   ├── tests/                           # Module de tests RGAA
│   │   ├── runAllTests.js               # Orchestrateur — appelle chaque catégorie
│   │   ├── categories/
│   │   │   ├── images.test.js           #  1. Images
│   │   │   ├── cadres.test.js           #  2. Cadres
│   │   │   ├── couleurs.test.js         #  3. Couleurs
│   │   │   ├── multimedia.test.js       #  4. Multimédia
│   │   │   ├── tableaux.test.js         #  5. Tableaux
│   │   │   ├── liens.test.js            #  6. Liens
│   │   │   ├── scripts.test.js          #  7. Scripts
│   │   │   ├── obligatoires.test.js     #  8. Éléments obligatoires
│   │   │   ├── structure.test.js        #  9. Structuration de l'information
│   │   │   ├── presentation.test.js     # 10. Présentation de l'information
│   │   │   ├── formulaires.test.js      # 11. Formulaires
│   │   │   ├── navigation.test.js       # 12. Navigation
│   │   │   └── consultation.test.js     # 13. Consultation
│   │   └── helpers/
│   │       ├── browser.js               # Initialisation Playwright (launch, newPage)
│   │       └── axeAnalyzer.js           # Injection et exécution axe-core
│   ├── config/
│   │   └── connection.js                        # Connexion MongoDB
│   └── app.js                        # Point d'entrée Express
│
├── .gitignore
└── README.md
```

---

## ⚙️ Stack Technique

### Front-end

| Technologie                    | Rôle                                                    |
|:-------------------------------|:--------------------------------------------------------|
| **Next.js 12**                 | Framework React avec SSR, routing par fichier, API routes |
| **Redux Toolkit** + react-redux | Gestion d'état centralisée (auth, données)              |
| **redux-persist**              | Persistance du state Redux (token, session)             |
| **Ant Design (antd)**          | Bibliothèque de composants UI (boutons, formulaires, layout, notifications) |
| **CSS Modules**                | Styles scopés par composant (`*.module.css`)            |
| **Font Awesome**               | Icônes                                                  |
| **moment.js**                  | Formatage des dates                                     |
| **Jest + Testing Library**     | Tests unitaires front                                   |

### Back-end

| Technologie                    | Rôle                                                    |
|:-------------------------------|:--------------------------------------------------------|
| **Node.js + Express**          | API REST, orchestration des tests                       |
| **Playwright**                 | Navigation headless, accès au DOM des pages cibles      |
| **axe-core**                   | Moteur de détection des violations d'accessibilité      |
| **MongoDB + Mongoose**         | Stockage utilisateurs, audits, rapports                 |
| **JWT (jsonwebtoken) + bcrypt** | Inscription, connexion, protection des routes           |

---

## 📡 Endpoints API

### Authentification

| Méthode | Route               | Auth    | Description                                    |
|:--------|:---------------------|:--------|:-----------------------------------------------|
| POST    | `/api/auth/register` | —       | Inscription (email, password)                  |
| POST    | `/api/auth/login`    | —       | Connexion → retourne un JWT                    |

### Audit

| Méthode | Route               | Auth          | Description                                    |
|:--------|:---------------------|:--------------|:-----------------------------------------------|
| POST    | `/api/audit`         | Optionnelle   | Lance un audit sur l'URL fournie. Si connecté, l'audit est rattaché au compte |
| GET     | `/api/audit/:id`     | —             | Récupère le rapport complet d'un audit         |
| GET     | `/api/audits/me`     | Obligatoire   | Liste les audits de l'utilisateur connecté     |

### Exemple de requête — Lancer un audit

```bash
curl -X POST http://localhost:5000/api/audit \
  -H "Content-Type: application/json" \
  -d '{ "url": "https://example.com" }'
```

### Exemple de réponse

```json
{
  "auditId": "665f1a2b3c4d5e6f7a8b9c0d",
  "status": "completed",
  "url": "https://example.com",
  "summary": {
    "total": 106,
    "passed": 42,
    "failed": 18,
    "notTestable": 46
  }
}
```

---

## 🔀 Flux de Fonctionnement

### Scénario 1 — Utilisateur anonyme

```
1. Arrive sur la page d'accueil (index.js → composant Analyse)
2. Saisit une URL → clique "Analyser mon site"
3. POST /api/audit { url } → le back lance Playwright + axe-core
4. Le back sauvegarde le rapport en BDD (sans userId)
5. Le front reçoit l'auditId → redirige vers /report/[auditId]
6. La page Report fetch GET /api/audit/:id et affiche les résultats
```

### Scénario 2 — Utilisateur connecté

```
Même flux, mais :
- Le JWT est envoyé via le header Authorization (stocké par redux-persist)
- Le middleware optionalAuth attache req.user
- L'audit est sauvegardé avec le userId
- L'utilisateur retrouve ses audits dans "Mes audits" (GET /api/audits/me)
```

### Orchestration des tests côté back

Le fichier `runAllTests.js` est le **chef d'orchestre**. Il importe et appelle séquentiellement chaque fichier de catégorie, puis agrège les résultats :

```javascript
// MakeItAccessible-back/tests/runAllTests.js — principe simplifié

const categories = [
  { name: 'Images',        run: require('./categories/images.test') },
  { name: 'Cadres',        run: require('./categories/cadres.test') },
  { name: 'Couleurs',      run: require('./categories/couleurs.test') },
  // ... jusqu'à 13. Consultation
];

async function runAllTests(url) {
  const browser = await launchBrowser();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });

  const results = [];

  for (const category of categories) {
    const categoryResult = await category.run(page);
    results.push({ category: category.name, ...categoryResult });
  }

  await browser.close();
  return results;
}
```

Chaque fichier de catégorie retourne un objet au format standardisé :

```javascript
// Retour de images.test.js (exemple)
{
  passed:      [{ criterion: '1.1', description: 'Alternative textuelle présente', details: '12 images vérifiées' }],
  failed:      [{ criterion: '1.3', description: 'Alternative textuelle pertinente', details: '3 images avec alt vide' }],
  notTestable: [{ criterion: '1.6', description: 'Légende d\'image liée', reason: 'Vérification humaine requise' }]
}
```

---

## 🗃️ Modèles de Données (MongoDB)

### User

```javascript
{
  _id:       ObjectId,
  email:     String,        // unique, requis
  password:  String,        // hashé avec bcrypt
  createdAt: Date           // Date.now par défaut
}
```

### Audit

```javascript
{
  _id:        ObjectId,
  userId:     ObjectId | null,  // réf. vers User — null si audit anonyme
  url:        String,           // URL du site audité
  createdAt:  Date,
  status:     String,           // "pending" | "running" | "completed" | "error"
  errorMsg:   String | null,    // message si status = "error"
  summary: {
    total:       Number,        // nombre total de critères évalués
    passed:      Number,
    failed:      Number,
    notTestable: Number,
    score:       Number         // pourcentage (passed / (passed + failed)) * 100
  },
  results: [
    {
      category:    String,                              // ex: "Images"
      passed:      [{ criterion, description, details }],
      failed:      [{ criterion, description, details }],
      notTestable: [{ criterion, description, reason }]
    }
  ]
}
```

---

## 📋 Les 13 Catégories RGAA Testées

| #  | Thématique                        | Exemples de vérifications                                      |
|:---|:----------------------------------|:---------------------------------------------------------------|
| 1  | Images                            | Alt text présent, pertinence des alternatives                  |
| 2  | Cadres                            | Attribut `title` sur les `<iframe>`                            |
| 3  | Couleurs                          | Contraste suffisant, info non transmise uniquement par la couleur |
| 4  | Multimédia                        | Sous-titres, audiodescription, contrôles accessibles           |
| 5  | Tableaux                          | En-têtes, attributs `scope`, légendes                          |
| 6  | Liens                             | Intitulés explicites, liens identiques → même destination      |
| 7  | Scripts                           | Composants JS accessibles au clavier et aux lecteurs d'écran   |
| 8  | Éléments obligatoires             | Langue de la page, `<title>`, doctype, validité du code        |
| 9  | Structuration de l'information    | Hiérarchie des titres, listes, landmarks ARIA                  |
| 10 | Présentation de l'information     | CSS vs attributs de présentation, lisibilité au zoom           |
| 11 | Formulaires                       | Labels associés, messages d'erreur, regroupement               |
| 12 | Navigation                        | Skip links, plan du site, navigation cohérente                 |
| 13 | Consultation                      | Pas de piège clavier, contrôle des limites de temps            |

R�férence complète : [accessibilite.numerique.gouv.fr/methode/criteres-et-tests](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/)

---

## 🚀 Installation & Lancement

### Prérequis

- Node.js ≥ 18
- MongoDB (local ou Atlas)
- npm ou yarn

### Variables d'environnement

#### Back — `MakeItAccessible-back/.env`

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/makeitaccessible
JWT_SECRET=une_clé_secrète_longue_et_aléatoire
JWT_EXPIRES_IN=7d
HEADLESS=true
```

#### Front — `MakeItAccessible-front/.env.local`

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Mise en route

```bash
# 1. Cloner le dépôt
git clone https://github.com/votre-equipe/MakeItAccessible.git
cd MakeItAccessible

# 2. Installer les dépendances
cd MakeItAccessible-back && npm install
cd ../MakeItAccessible-front && npm install

# 3. Installer le navigateur Playwright
cd ../MakeItAccessible-back && npx playwright install chromium

# 4. Configurer les .env (voir ci-dessus)

# 5. Lancer MongoDB (si local)
mongod

# 6. Lancer le back (terminal 1)
cd MakeItAccessible-back && npm run dev

# 7. Lancer le front (terminal 2)
cd MakeItAccessible-front && npm run dev
```

Le front sera accessible sur **http://localhost:3001** et le back sur **http://localhost:5000**.

### Debugger avec VS Code

Le fichier `.vscode/launch.json` est fourni à la racine du projet avec 3 configurations :

- **Next.js: debug front** — lance `npm run dev` et attache Chrome avec les breakpoints
- **Next.js: debug server-side** — debug du SSR et des API routes Next
- **Back Express: debug** — debug du serveur Express

Pour l'utiliser : ouvrir le panneau Run and Debug (`Ctrl+Shift+D`) → choisir la config → lancer.

---

## 🗺️ Roadmap / Backlog

Le projet se découpe en phases progressives. Chaque phase construit sur la précédente et introduit un concept clé.

### Phase 1 — Fondations `[Semaine 1]`

> **Objectif : un back qui tourne, une BDD connectée, un front qui communique avec.**

- [ ] Initialiser Express avec une route `GET /api/health → { status: "ok" }`
- [ ] Connecter MongoDB avec Mongoose (`config/db.js`)
- [ ] Vérifier que le front Next.js existant tourne (`npm run dev` sur le port 3001)
- [ ] Premier appel API depuis le composant `Analyse.js` vers le back
- [ ] Configurer les variables d'environnement (`.env` back, `.env.local` front)
- [ ] Initialiser le repo Git + `.gitignore` + conventions de branches

**Concept clé : communication client-serveur, connexion BDD, CORS**

**Répartition suggérée :**

| Membre | Tâche                                             |
|:-------|:--------------------------------------------------|
| Dev 1  | Init Express + route health + CORS                |
| Dev 2  | Connexion MongoDB + script de test de connexion   |
| Dev 3  | Appel API depuis Analyse.js (fetch/axios)         |
| Dev 4  | Setup Git, .env, .gitignore, scripts npm, docs    |

---

### Phase 2 — Authentification `[Semaine 2]`

> **Objectif : inscription, connexion, token stocké dans Redux.**

- [ ] Créer le modèle `User` (Mongoose)
- [ ] Route `POST /api/auth/register` — hashage bcrypt, validation email
- [ ] Route `POST /api/auth/login` — vérification mot de passe, génération JWT
- [ ] Middleware `auth.middleware.js` (vérifie le JWT dans le header)
- [ ] Middleware `optionalAuth.middleware.js` (attache le user si connecté, sinon `next()`)
- [ ] Pages Next.js : inscription + connexion (composants Ant Design)
- [ ] Compléter le reducer `user.js` — stocker le token et les infos utilisateur dans Redux
- [ ] Configurer `redux-persist` pour garder la session après refresh
- [ ] Boutons "Inscription" / "Connexion" dans le Header.js

**Concept clé : JWT, bcrypt, middleware Express, Redux Toolkit, redux-persist**

**Répartition suggérée :**

| Membre | Tâche                                              |
|:-------|:---------------------------------------------------|
| Dev 1  | Modèle User + route register                      |
| Dev 2  | Route login + middlewares auth                     |
| Dev 3  | Pages Register/Login (Ant Design forms)            |
| Dev 4  | Reducer user.js + redux-persist + Header           |

---

### Phase 3 — Premier test d'accessibilité `[Semaine 3]`

> **Objectif : lancer Playwright + axe-core sur une URL et récupérer un résultat brut.**

- [ ] Installer Playwright et `@axe-core/playwright` côté back
- [ ] Écrire un script standalone : ouvrir une page, exécuter axe, afficher les violations
- [ ] Créer `helpers/browser.js` — lancement / fermeture propre du navigateur
- [ ] Créer `helpers/axeAnalyzer.js` — injection axe-core, formatage des résultats
- [ ] Comprendre la structure de sortie d'axe-core (`violations`, `passes`, `incomplete`, `inapplicable`)
- [ ] Tester manuellement sur 2-3 sites (un accessible, un mauvais, un complexe)
- [ ] Documenter le mapping entre les règles axe-core et les critères RGAA

**Concept clé : Playwright headless, injection de scripts, analyse du DOM**

**Répartition suggérée :**

| Membre | Tâche                                                |
|:-------|:-----------------------------------------------------|
| Dev 1  | Installation Playwright + script standalone          |
| Dev 2  | Helper browser.js (lancement, config, fermeture)     |
| Dev 3  | Helper axeAnalyzer.js (injection, formatage)         |
| Dev 4  | Tests manuels + doc mapping axe-core → RGAA          |

---

### Phase 4 — Architecture de tests modulaire `[Semaines 4-5]`

> **Objectif : 13 fichiers de tests (un par catégorie RGAA), orchestrés par `runAllTests.js`.**

- [ ] Créer `runAllTests.js` — le chef d'orchestre
- [ ] Définir le format de retour standard (`passed`, `failed`, `notTestable`)
- [ ] Commencer par les catégories les plus automatisables :
  - [ ] `obligatoires.test.js` (8) — doctype, lang, title
  - [ ] `images.test.js` (1) — présence de alt, images décoratives
  - [ ] `liens.test.js` (6) — intitulés, liens vides
  - [ ] `structure.test.js` (9) — hiérarchie titres, landmarks
- [ ] Mapper les règles axe-core vers les critères RGAA correspondants
- [ ] Ajouter les catégories restantes progressivement
- [ ] Gérer les cas `notTestable` (quand seul un humain peut juger)

**Concept clé : modularité, pattern d'orchestration, mapping axe-core ↔ RGAA**

**Répartition suggérée :**

| Membre | Tâche                                              |
|:-------|:---------------------------------------------------|
| Dev 1  | runAllTests.js + format standard + catégories 8, 9  |
| Dev 2  | Catégories 1, 2, 3                                  |
| Dev 3  | Catégories 5, 6, 7                                  |
| Dev 4  | Catégories 4, 10, 11, 12, 13                        |

---

### Phase 5 — Route d'audit complète `[Semaine 6]`

> **Objectif : le front envoie une URL → le back audite → sauvegarde → le front affiche.**

- [ ] Créer le modèle `Audit` (Mongoose) avec le schéma complet
- [ ] Route `POST /api/audit` — reçoit l'URL, lance `runAllTests`, sauvegarde en BDD
- [ ] Route `GET /api/audit/:id` — retourne le rapport complet
- [ ] Route `GET /api/audits/me` — liste les audits de l'utilisateur connecté
- [ ] Brancher le `handleSubmit` du composant `Analyse.js` sur `POST /api/audit`
- [ ] Créer la page `/report/[id].js` (Next.js dynamic route) pour afficher le rapport
- [ ] Composants Ant Design : `Collapse` par catégorie, `Tag` pour ✅❌⚠️, `Progress` pour le score
- [ ] Gestion du loading avec `Spin` ou `Skeleton` d'Ant Design pendant l'audit

**Concept clé : requêtes asynchrones longues, modélisation BDD, routing dynamique Next.js**

**Répartition suggérée :**

| Membre | Tâche                                               |
|:-------|:-----------------------------------------------------|
| Dev 1  | Modèle Audit + route POST /audit                    |
| Dev 2  | Routes GET /audit/:id + GET /audits/me               |
| Dev 3  | Brancher Analyse.js + redirection vers le rapport    |
| Dev 4  | Page rapport (Collapse, Tags, Progress, Score)       |

---

### Phase 6 — Enrichissement & Robustesse `[Semaine 7]`

> **Objectif : fiabiliser et rendre l'app agréable.**

- [ ] Page "Mes audits" — historique avec date, URL, score, lien vers le rapport
- [ ] Gestion d'erreurs back : URL invalide, timeout Playwright, site inaccessible, DNS fail
- [ ] Gestion d'erreurs front : notifications Ant Design (`message.error()`), retry, fallback
- [ ] Limiter la durée d'un audit (timeout global configurable)
- [ ] Validation des entrées (URL bien formée, sanitization)
- [ ] Détail par critère RGAA dans le rapport (accordéon `Collapse.Panel`)
- [ ] Responsive design (Ant Design `Grid` + media queries)

**Concept clé : gestion d'erreurs robuste, validation, UX**

---

### Phase 7 — Pour aller plus loin `[Bonus]`

> **Objectif : explorer des sujets avancés si le temps le permet.**

- [ ] File d'attente pour les audits (BullMQ + Redis) pour gérer la charge
- [ ] WebSocket ou SSE pour afficher la progression en temps réel
- [ ] Comparaison entre deux audits du même site (évolution dans le temps)
- [ ] Export du rapport en PDF
- [ ] Tests unitaires back (Jest) + tests composants front (Testing Library — déjà installé)
- [ ] CI/CD avec GitHub Actions (lint + tests à chaque push)
- [ ] Dockeriser le projet (docker-compose : front + back + mongo)
- [ ] Déploiement (Vercel pour le front, Render pour le back)

**Concept clé : queues, temps réel, CI/CD, conteneurisation**

---

## 🤝 Conventions d'Équipe

### Branches Git

```
main              ← production, toujours stable
├── develop       ← branche d'intégration
│   ├── feat/auth-register      ← nouvelles fonctionnalités
│   ├── feat/test-images
│   ├── fix/audit-timeout       ← corrections de bugs
│   └── refactor/api-routes     ← refactoring
```

### Commits

Format : `type(scope): description`

```
feat(auth): ajouter la route POST /register
fix(audit): gérer le timeout Playwright à 30s
refactor(tests): extraire le helper axeAnalyzer
docs(readme): ajouter la roadmap phase 4
style(header): aligner les boutons de navigation
```

### Pull Requests

Chaque PR doit être relue par **au moins 1** autre membre de l'équipe avant merge dans `develop`.

---

## 📚 Ressources

- [RGAA 4.1.2 — Critères et tests](https://accessibilite.numerique.gouv.fr/methode/criteres-et-tests/)
- [RGAA — Glossaire](https://accessibilite.numerique.gouv.fr/methode/glossaire/)
- [Documentation Playwright](https://playwright.dev/docs/intro)
- [axe-core — GitHub](https://github.com/dequelabs/axe-core)
- [@axe-core/playwright](https://www.npmjs.com/package/@axe-core/playwright)
- [Mongoose — Documentation](https://mongoosejs.com/docs/)
- [Express.js — Guide](https://expressjs.com/fr/)
- [Next.js 12 — Documentation](https://nextjs.org/docs)
- [Ant Design — Composants](https://ant.design/components/overview)
- [Redux Toolkit — Guide](https://redux-toolkit.js.org/tutorials/quick-start)
- [JWT.io — Débugger](https://jwt.io/)

---

## 🧑‍💻 Équipe

| Membre   | Rôle principal                  |
|:---------|:--------------------------------|
| Dev 1    | _à compléter_                   |
| Dev 2    | _à compléter_                   |
| Dev 3    | _à compléter_                   |
| Dev 4    | _à compléter_                   |

---

*Ce projet n'a pas vocation à remplacer un audit RGAA manuel réalisé par un expert. Certains critères nécessitent une évaluation humaine et ne peuvent pas être entièrement automatisés.*
