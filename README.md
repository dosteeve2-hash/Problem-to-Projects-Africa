# Problem to Project Africa 🌍

> **Transforme ton problème en projet concret — propulsé par Claude AI**

[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?logo=next.js&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-auth%20%2B%20db-3ecf8e?logo=supabase&logoColor=white)](https://supabase.com)
[![Anthropic](https://img.shields.io/badge/Claude-AI-d97757?logo=anthropic&logoColor=white)](https://www.anthropic.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed-Vercel-000?logo=vercel&logoColor=white)](https://vercel.com)

---

## Vision

**P2P Africa** (Problem to Project Africa) est une plateforme AI-powered qui aide les talents africains à transformer leurs observations, compétences et idées en projets concrets et exécutables.

La plupart des outils d'IA génèrent des conseils génériques. P2P Africa est construit différemment : il connaît les réalités économiques, infrastructurelles et sociales de **9 pays africains**, et génère des projets adaptés au contexte local — pas des copies de startups Silicon Valley.

**Notre conviction :** L'Afrique regorge de talent. Ce qui manque, c'est un pont entre l'observation d'un problème et l'exécution d'une solution. P2P Africa est ce pont.

---

## Fonctionnalités

### 3 modes d'entrée
- 🔧 **Mode Compétences** — Tu sais ce que tu sais faire, P2P trouve le projet qui te correspond
- 💡 **Mode Idée** — Tu as une idée brute, P2P la valide et la structure
- ⚠️ **Mode Problème** — Tu as observé un manque, P2P le transforme en opportunité

### Ce que tu reçois
- Titre et pitch du projet
- Analyse de faisabilité locale
- Stack technique recommandée
- Scope MVP détaillé
- Roadmap 30 jours
- Score d'impact estimé

### Architecture contextualisée
- Connaissance de 9 pays africains : Côte d'Ivoire, Sénégal, Burkina Faso, Mali, Cameroun, RDC, Kenya, Ghana, Nigeria
- Prise en compte des réalités locales : accès internet, bancarisation, infrastructures
- Modèles économiques adaptés (mobile money, agents distributeurs, etc.)

---

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 + Tailwind CSS 4 + Framer Motion |
| AI | Anthropic Claude SDK (`@anthropic-ai/sdk`) |
| Auth & DB | Supabase (SSR) |
| Icons | Lucide React |
| Fonts | Playfair Display · Outfit · JetBrains Mono |
| Deploy | Vercel |

---

## Structure du projet

```
src/
├── app/
│   ├── page.tsx               # Landing page (sections marketing)
│   ├── layout.tsx             # Root layout + metadata + polices
│   ├── globals.css            # Variables CSS (palette SDC)
│   ├── about/                 # Page À propos
│   ├── how-it-works/          # Comment ça marche
│   ├── start/                 # Wizard multi-étapes (compétences / idée / problème)
│   │   ├── skills/
│   │   ├── idea/
│   │   └── problem/
│   ├── results/               # Affichage du projet généré
│   ├── dashboard/             # Dashboard utilisateur (auth)
│   ├── auth/                  # Callbacks Supabase
│   └── api/                   # Routes API (Claude AI)
├── components/
│   ├── marketing/             # Sections de la landing page
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── MethodSection.tsx  # Différenciateurs vs IA générique
│   │   ├── UseCases.tsx
│   │   ├── ImpactSection.tsx  # Stats animées
│   │   ├── CountriesSection.tsx
│   │   ├── SectorGrid.tsx
│   │   └── CTASection.tsx
│   ├── forms/                 # Wizards de saisie
│   ├── results/               # Rendu du projet généré
│   ├── dashboard/             # Composants du dashboard
│   └── ui/                    # Composants réutilisables (Button, Navbar, Footer…)
├── lib/
│   ├── ai/                    # Prompts Claude + parsing
│   ├── context/               # Données pays africains
│   ├── db/                    # Helpers Supabase
│   └── supabase/              # Client/server Supabase
└── types/                     # Types TypeScript globaux
```

---

## Palette de design (SDC)

```css
--bg:     #070e1f   /* fond principal */
--bg2:    #0c1528   /* fond sections alternées */
--bg3:    #111d34   /* fond cartes */
--gold:   #f0a832   /* couleur principale — accents, CTA */
--cyan:   #2dd4ff   /* couleur secondaire */
--green:  #22d98a   /* succès, mode idée */
--text:   #f5f0e8   /* texte principal */
--text2:  #9ba8c4   /* texte secondaire */
--border: #16233d   /* bordures subtiles */
```

---

## Installation locale

### Prérequis
- Node.js 20+
- Un projet Supabase
- Une clé API Anthropic

### Setup

```bash
# Cloner le repo
git clone https://github.com/dosteeve2-hash/problem-to-project-africa.git
cd problem-to-project-africa

# Installer les dépendances
npm install

# Variables d'environnement
cp .env.local.example .env.local
# Remplir NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, ANTHROPIC_API_KEY

# Lancer le dev server
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

### Base de données Supabase

Dans le dashboard Supabase > SQL Editor, coller le contenu de `supabase/migrations/001_initial_schema.sql`.

---

## Variables d'environnement

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de ton projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé publique Supabase |
| `ANTHROPIC_API_KEY` | Clé API Anthropic (Claude) |

---

## Déploiement

```bash
npm run build   # Build de production
npm run start   # Démarrer le serveur
```

Le projet est configuré pour Vercel (`vercel.json`). Un push sur `main` déclenche un déploiement automatique.

---

## Roadmap

- [x] 3 modes d'entrée (compétences / idée / problème)
- [x] Génération de projet par Claude AI
- [x] Auth Supabase + dashboard
- [x] Support 9 pays africains
- [ ] Export PDF du projet généré
- [ ] Partage public de projet
- [ ] Communauté & upvotes
- [ ] Version mobile native
- [ ] Support 20+ pays africains

---

## Auteur

**Steeve Donald Compaore** — [@dosteeve2-hash](https://github.com/dosteeve2-hash)

---

## Licence

MIT — utilise, forke, contribue.
