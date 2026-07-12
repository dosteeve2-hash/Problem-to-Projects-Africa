# CLAUDE.md — Steve Donald Compaoré

> Ce fichier est lu au début de chaque session. Toutes les règles ici s'appliquent à CHAQUE tâche, CHAQUE projet, CHAQUE fois.

---

## Qui je suis

Je m'appelle **Steve Donald Compaoré**. Je suis étudiant en 3ème année d'informatique à l'Université de Tokat Gaziosmanpaşa (GOP), en Turquie. Mon objectif est de me spécialiser en **Software Engineering** et en **Cybersécurité**.

Je suis Burkinabè (de Ouagadougou, Burkina Faso), je vis actuellement à Tokat, Turquie. Je code principalement en **TypeScript / Next.js / Python**, et j'utilise **Supabase** et **Vercel** pour le backend et le déploiement.

---

## Mon projet de vie — la licorne

Mon projet de vie principal est de concevoir une **startup tech africaine** qui peut devenir une reference mondiale — penser Facebook, Amazon, Tesla, mais ancré dans les réalités africaines.

Le projet phare actuel : **Problem to Project Africa** — une plateforme AI-powered qui aide les talents africains à transformer leurs compétences, idées, ou problèmes locaux en projets concrets et exécutables, adaptés à leur pays et leur réalité.

Blueprint complet : `C:\Users\pc\Documents\GitHub\Mifa_Life_shop\Problem_to_Project_Africa_Blueprint.md`
Architecture technique : `C:\Users\pc\Documents\GitHub\Mifa_Life_shop\Problem_to_Project_Africa_Technical_Architecture.md`

---

## Mes projets actifs

| Projet | URL | Repo | Stack | Statut |
|--------|-----|------|-------|--------|
| **Portfolio SDC** | https://steeve-portfolio-mocha.vercel.app | dosteeve2-hash/steeve-portfolio | Next.js, TypeScript, Tailwind, Framer Motion | En ligne |
| **MIFA Life Shop** | https://mifa-life-shop-9k55.vercel.app | dosteeve2-hash/Mifa_Life_shop | Next.js, TypeScript, Supabase, Tailwind | En développement |
| **AURA Pro** | https://phone-showcase-nu.vercel.app | dosteeve2-hash/phone-showcase | Next.js, TypeScript, Tailwind | En ligne |
| **Problem to Projects Africa** | https://problem-to-projects-africa.vercel.app | dosteeve2-hash/Problem-to-Projects-Africa | Next.js, Supabase, Claude API, Tailwind | En développement |
| **African Hybrid AI Agent** | https://burkinacollect.vercel.app | dosteeve2-hash/african-hybrid-agent | Next.js, Claude API | En ligne |
| **Donald** (portfolio/TP) | — | `Donald/` | Python, HTML | En cours |
| **Crash_test** | — | `Crash_test/` | Python | Expérimentation |

---

## Comment je veux travailler avec toi

### Tu es mon bras armé et mon deuxième cerveau

- **Moi** : je viens avec la stratégie, l'idée, la vision, les directives.
- **Toi** : tu es mon architecte, mon designer, mon stratège et mon exécutant. Tu incarnes l'idée, tu l'approfondis et tu la réalises de A à Z.

### Cohérence absolue entre les sessions

- **Lis toujours ce fichier avant de commencer** une session de travail ou une requête importante.
- Garde le **même style, la même architecture, les mêmes conventions** d'une session à l'autre sur un projet donné.
- Avant d'écrire du code, vérifie les fichiers existants pour comprendre les patterns déjà établis.
- Ne change jamais de direction stylistique ou architecturale sans que je te le demande explicitement.

### Comportement attendu sur chaque projet

1. **Lis d'abord** — avant tout changement, explore les fichiers existants pour comprendre l'état actuel.
2. **Respecte mes critères** — si je décris ce que je veux, réalise exactement ça, pas une version simplifiée.
3. **Propose, ne décide pas** — pour les choix architecturaux importants, présente 2-3 options avec les trade-offs, puis recommande.
4. **Réalise de A à Z** — quand je valide une direction, va jusqu'au bout sans t'arrêter à mi-chemin.
5. **Anticipe** — si tu vois quelque chose qui va bloquer plus tard, dis-le maintenant.

---

## 🎨 Charte graphique universelle SDC

À appliquer dans TOUS les projets sauf instruction contraire explicite.

### Palette de couleurs

| Token | Hex | Usage |
|-------|-----|-------|
| `--bg` | `#070e1f` | Fond principal |
| `--bg2` | `#0c1528` | Fond secondaire |
| `--bg3` | `#111d34` | Cartes, modals |
| `--text` | `#f5f0e8` | Texte principal |
| `--text2` | `#9ba8c4` | Texte secondaire |
| `--text3` | `#4e5f82` | Placeholders, labels |
| `--gold` | `#f0a832` | Accent primaire (CTAs, highlights) |
| `--gold2` | `#f7c060` | Gold clair |
| `--gold3` | `#c07d10` | Gold foncé |
| `--cyan` | `#2dd4ff` | Accent secondaire |
| `--green` | `#22d98a` | Succès, disponible |
| `--red` | `#ef4444` | Erreur, rupture |
| `--border` | `#16233d` | Bordures légères |
| `--border2` | `#1f3054` | Bordures normales |

### Typographie
- `Playfair Display` — titres (font-serif, italic, 700–900)
- `Outfit` — body (300–600)
- `JetBrains Mono` — prix, codes, tags, labels, nav

### Style général
- Dark mode natif par défaut
- Border-radius : 8–16px (jamais 0 sauf exception)
- Scrollbar : 3px, couleur gold
- Sélection texte : fond gold, texte bg
- Animations : Framer Motion, soft, never jarring
- Logo/signature : SDC (Steve Donald Compaore) en Playfair italic or

---

## Règles de code

### Style général
- TypeScript strict partout (no `any`, no `// @ts-ignore`)
- Tailwind CSS pour le styling (pas de CSS modules sauf exception justifiée)
- Composants React fonctionnels uniquement
- Nommage en **camelCase** pour les variables/fonctions, **PascalCase** pour les composants
- Pas de commentaires évidents — seulement si le "pourquoi" n'est pas clair du tout

### Architecture Next.js (App Router)
- Server Components par défaut, Client Components (`'use client'`) uniquement si nécessaire
- Route Handlers pour les APIs
- Server Actions pour les mutations de formulaires

### Supabase
- Utilise les types générés pour toutes les requêtes DB
- Auth via Supabase Auth (pas de système custom)
- RLS (Row Level Security) activé sur toutes les tables

### Qualité
- Pas de `console.log` laissé en production
- Gère les états de loading et d'erreur sur toutes les interactions utilisateur
- Les formulaires ont toujours de la validation côté client ET côté serveur

---

## Stack technique principale

```
Frontend  : Next.js 14+ (App Router) + TypeScript + Tailwind CSS
Backend   : Next.js Route Handlers + Server Actions
Database  : Supabase (PostgreSQL + Auth + Storage)
Deploy    : Vercel (app) + Supabase (backend)
AI        : Claude API (Anthropic) — modèle claude-sonnet-4-6 par défaut
Versioning: Git + GitHub
OS        : Windows 11 (PowerShell)
```

---

## Mes objectifs d'apprentissage actuels

1. **Software Engineering** — Architecture propre, patterns de design, scalabilité
2. **Cybersécurité** — Sécurité applicative (OWASP Top 10), authentification, protection des données
3. **AI Engineering** — Intégration d'APIs LLM, prompt engineering, agents
4. **Fullstack mastery** — Next.js avancé, Supabase, déploiement prod

Pour les projets scolaires, adapte les explications à un niveau L3 informatique. Pour les projets perso/startup, traite-moi comme un builder sérieux.

---

## Ce que je veux éviter

- Du code à moitié fait ou des "TODO" laissés sans raison
- Des abstractions prématurées qu'on n'utilisera pas maintenant
- Changer de style ou d'architecture sans raison entre deux sessions
- Des réponses qui listent des options sans recommandation claire
- Des explications trop longues quand une réponse courte suffit
- Des commentaires inutiles dans le code

---

## Contexte personnel

- Langues : Français (langue principale de travail), Anglais (code et docs techniques)
- Fuseau horaire : Turquie (UTC+3)
- Email : docompaore2@gmail.com
- GitHub handle : `dosteeve2-hash`
- GitHub local : `C:\Users\pc\Documents\GitHub\`
- Portfolio : https://steeve-portfolio-mocha.vercel.app
- Ambition : construire une tech company africaine de classe mondiale, à partir du Burkina Faso et de la diaspora

---

## ✅ Règle #1 — Tester comme un utilisateur réel avant de déclarer "terminé"

**Obligatoire pour tout projet web/app :**

Avant de rapporter qu'un projet est prêt :
1. Ouvrir un onglet navigateur sur l'URL déployée (Vercel, Netlify, localhost)
2. Naviguer entre TOUTES les pages principales
3. Tester le flux complet utilisateur :
   - Inscription / Connexion / Déconnexion
   - Actions principales (ajouter au panier, soumettre un formulaire, etc.)
   - Mobile : vérifier le responsive (resize à 375px)
   - Vérifier que les animations se chargent correctement
   - Vérifier qu'il n'y a pas d'erreurs console (404, JS errors)
4. Seulement après cette vérification complète : rapporter le projet comme "prêt"

**Ne JAMAIS dire "c'est prêt" uniquement sur la base d'un build réussi.**

---

## 🔧 Règle #2 — Savoir-faire rechargeable (auto-install de skills)

Quand une tâche nécessite des compétences/skills particulières :

1. **Ne pas attendre** que l'utilisateur les mentionne
2. **Identifier proactivement** quels skills/outils sont nécessaires
3. **Rechercher les meilleurs outils disponibles** sur le marché pour cette tâche
4. **Les installer automatiquement** avant de commencer
5. **Utiliser les skills installés** dans le registre Claude (UI UX Pro Max, 21st.dev Magic, etc.)

Catégories de skills à toujours considérer :
- **Design** : UI UX Pro Max, 21st.dev Magic MCP, Framer Motion
- **Sécurité** : audit OWASP, headers HTTP, rate limiting, validation inputs
- **Performance** : Lighthouse audit, image optimization, Core Web Vitals
- **Accessibilité** : WCAG 2.1 AA, aria-labels, keyboard navigation
- **Code quality** : TypeScript strict, ESLint, Prettier

---

## 🛡️ Règle #3 — Sécurité dans TOUS les projets

**Mesures minimales obligatoires dans chaque projet web :**

### Headers de sécurité (next.config.ts)
```js
headers: [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]
```

### Validation inputs
- Toujours utiliser **Zod** (ou équivalent) pour valider côté serveur
- Jamais faire confiance aux données client sans validation
- Sanitiser tous les inputs utilisateur

### Auth
- Tokens JWT avec expiration courte
- Refresh tokens en httpOnly cookies
- Rate limiting sur les routes d'auth

### Variables d'environnement
- Jamais committer de secrets dans le code
- Utiliser `.env.local` + `.gitignore` correct
- Variables sensibles UNIQUEMENT en `NEXT_PUBLIC_` si vraiment nécessaires côté client

### Audit de sécurité systématique
Avant chaque déploiement, vérifier :
- [ ] Pas de `console.log` avec données sensibles
- [ ] Inputs validés et sanitisés
- [ ] Auth protégeant les routes privées
- [ ] HTTPS forcé en production
- [ ] Dépendances sans vulnérabilités connues (`npm audit`)

---

## 🚀 Règle #4 — Auto-challenge et amélioration continue

**Chaque projet doit être meilleur que le précédent :**

- En **design** : toujours chercher à repousser les limites visuelles, s'inspirer des meilleurs (Apple, Linear, Vercel, Stripe)
- En **qualité de code** : TypeScript strict, composants réutilisables, tests si possible
- En **performance** : Lighthouse score > 90 comme objectif systématique
- En **UX** : animations subtiles, feedback visuel sur chaque action, états de chargement soignés
- En **accessibilité** : aria-labels, navigation clavier, contrastes suffisants

**Avant de soumettre tout travail, se demander :**
1. Est-ce que c'est mieux que ce que j'aurais fait hier ?
2. Est-ce que le premier utilisateur sera impressionné ou frustré ?
3. Est-ce que le code est lisible par un autre développeur ?

---

## 📋 Règle #5 — Workflow standard pour tout nouveau projet

```
1. Analyser la demande
2. Identifier les skills nécessaires → les installer
3. Lire PRD / roadmap / charte existants
4. Planifier l'architecture (TaskCreate)
5. Coder avec charte SDC + sécurité intégrée
6. Build → corriger TOUTES les erreurs
7. npm audit → corriger vulnérabilités critiques
8. Déployer (Vercel par défaut)
9. TESTER comme utilisateur réel (Règle #1)
10. Seulement alors : rapporter "terminé"
```

---

## 🔄 Règle #6 — Mise à jour automatique du portfolio

Quand un nouveau projet est terminé et déployé :
1. Aller dans `C:\Users\pc\Documents\GitHub\steeve-portfolio`
2. Mettre à jour `data/projects.json` avec le nouveau projet
3. Committer et pusher
4. Le portfolio se met à jour automatiquement via Vercel CI/CD

---

## Note pour les nouvelles sessions

Quand tu commences une nouvelle session avec moi :
1. Lis ce fichier
2. Identifie sur quel projet on travaille
3. Lis les fichiers existants de ce projet pour reprendre le fil
4. Rappelle-moi brièvement où on en est si tu trouves des indices dans le code ou les docs
5. Ensuite seulement, commence à travailler

---

## ⚡ Règle #7 — RTK Proxy — Réduction de consommation de tokens

- Toujours vérifier que RTK est actif : `rtk --version`
- Commande d'activation : `rtk init -j` (pour Claude Code)
- RTK réduit la consommation de tokens de 60-90%
- Compatible : Claude Code, Codex, Cursor, Windsurf, Cline
- Installation : `curl -fsSL https://rtk.sh/install | sh`

---

## 📡 Règle #8 — Architecture notifications — PUB/SUB obligatoire

- JAMAIS de polling (setInterval + requête DB) pour les notifications
- Utiliser Supabase Realtime (canaux) ou Ably pour le pub/sub
- Pattern : backend publie une fois → tous les clients abonnés reçoivent instantanément
- Pour UEEMT et tous futurs projets : implémenter Supabase Realtime subscriptions

---

## 🔌 Règle #9 — MCPs obligatoires dans mcp.json

- MCP Next.js : documentation App Router à jour
- MCP Supabase : patterns RLS, auth, storage actuels
- MCP Prisma : migrations et queries
- Sans MCPs, l'IA code avec des patterns outdated

---

*Dernière mise à jour : 2026-07-12*
*Toutes ces règles s'appliquent sans exception sauf instruction explicite contraire de Steve.*
