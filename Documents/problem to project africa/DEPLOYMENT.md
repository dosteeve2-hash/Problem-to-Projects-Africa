# Déploiement et Configuration - Problem to Project Africa

## 📋 Table des matières
1. [Variables d'environnement](#variables-denvironnement)
2. [Déploiement local](#déploiement-local)
3. [Déploiement Vercel](#déploiement-vercel)
4. [Configuration GitHub](#configuration-github)
5. [Configuration Supabase](#configuration-supabase)
6. [Dépannage](#dépannage)

---

## Variables d'environnement

### Fichier `.env.local` (À créer localement)

```bash
# Supabase - OBLIGATOIRE
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# AI Provider (optionnel)
# Options: "claude" | "ollama" | (vide pour moteur local)
AI_PROVIDER=

# Claude (si AI_PROVIDER=claude)
ANTHROPIC_API_KEY=

# Ollama (si AI_PROVIDER=ollama)
OLLAMA_BASE_URL=http://localhost:11434
```

⚠️ **IMPORTANT**: Ne commitez JAMAIS le `.env.local` - il est dans `.gitignore`

---

## Déploiement local

### Prérequis
- Node.js 20+ 
- npm 10+
- `.env.local` configuré avec les credentials Supabase

### Démarrer le serveur de développement

```bash
npm install
npm run dev
```

L'app sera disponible à `http://localhost:3000`

### Build de production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

---

## Déploiement Vercel

### 1. Préparation

```bash
# Vérifier que tout compile
npm run build

# Commit et push sur GitHub
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Configuration Vercel

#### Option A : Via CLI (Recommandé)

```bash
# Installer Vercel CLI si nécessaire
npm i -g vercel

# Déployer
vercel

# (Suivre les instructions interactives)
```

#### Option B : Via Dashboard Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Cliquer "New Project"
3. Importer le repo GitHub
4. Ajouter les variables d'environnement:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - (Optionnel) `ANTHROPIC_API_KEY`

5. Cliquer "Deploy"

### 3. Variables d'environnement Vercel

Les variables doivent être configurées dans "Settings → Environment Variables":

```
NEXT_PUBLIC_SUPABASE_URL = [votre-url-supabase]
NEXT_PUBLIC_SUPABASE_ANON_KEY = [votre-clé-anon]
```

Les variables commençant par `NEXT_PUBLIC_` sont exposées au client (c'est intentionnel pour Supabase).

### 4. Secrets GitHub Actions (optionnel)

Si vous voulez que GitHub Actions push vers Vercel:

1. Aller à "GitHub → Settings → Secrets and variables → Actions"
2. Ajouter:
   - `VERCEL_TOKEN` (de `vercel tokens`)
   - `VERCEL_ORG_ID` (du dashboard Vercel)
   - `VERCEL_PROJECT_ID` (du dashboard Vercel)

---

## Configuration GitHub

### 1. Structure des branches

```
main → Production (auto-déployé sur Vercel)
develop → Staging
feature/* → Features individuelles
```

### 2. Workflows disponibles

- **CI Pipeline** (`.github/workflows/ci.yml`):
  - ✅ Lint (ESLint)
  - ✅ Type check (TypeScript)
  - ✅ Build test
  - ✅ Security audit

Déclenché sur:
- Push sur `main` ou `develop`
- Pull requests

### 3. Configurer GitHub

```bash
# Créer le repo s'il n'existe pas
git init
git add .
git commit -m "Initial commit"

# Ajouter le remote (remplacer USER/REPO)
git remote add origin https://github.com/USER/problem-to-project-africa.git
git branch -M main
git push -u origin main
```

---

## Configuration Supabase

### 1. Vérifier les migrations

Les migrations SQL doivent être appliquées:

```bash
# Les fichiers sont dans supabase/migrations/
supabase migration list  # Si vous avez Supabase CLI

# Ou vérifier manuellement dans le dashboard Supabase:
# - Tables: user_profiles, recommendation_sessions, project_recommendations, etc.
# - RLS policies: Activées sur les tables sensibles
```

### 2. Configurer OAuth (Authentification)

1. Aller à [Supabase Dashboard](https://app.supabase.com) → Votre projet
2. **Auth → Providers**
3. Configurer les providers souhaités:
   - ✅ Email/Password (gratuit)
   - GitHub, Google, etc. (avec setup OAuth)

### 3. Callback URLs

Ajouter dans Supabase Auth settings:
```
Redirect URLs:
- http://localhost:3000/auth/callback
- https://your-vercel-domain.vercel.app/auth/callback
```

### 4. RLS (Row Level Security)

Les policies RLS sont déjà configurées:
- ✅ `user_profiles`: Chaque utilisateur ne voit que ses données
- ✅ `recommendation_sessions`: Isolé par `auth.uid()`
- ✅ `country_contexts`: Lecture publique, write admin only

Vérifier dans "SQL Editor → RLS Policies"

---

## Dépannage

### Problème: Build échoue avec erreur TypeScript

**Solution:**
```bash
npm install
npx tsc --noEmit
npm run build
```

### Problème: Erreur Supabase "Invalid API key"

**Cause:** `.env.local` non configuré ou credentials invalides

**Solution:**
1. Vérifier le `.env.local` existe
2. Copier les values correctes depuis Supabase Dashboard
3. Relancer `npm run dev`

### Problème: Pages protégées accessible sans authentification

**Vérifier:**
1. Le middleware (`src/middleware.ts`) est actif
2. Les routes protégées sont listées dans le matcher
3. Supabase session est valide

### Problème: Vercel deployment fails

**Vérifications:**
1. `npm run build` réussit localement
2. Variables d'environnement configurées dans Vercel
3. Pas de secrets committes dans `.env.local`

---

## Checklist déploiement

- [ ] `.env.local` configuré localement
- [ ] `npm run build` réussit
- [ ] `npm run lint` pas d'erreurs
- [ ] GitHub repo créé et configuré
- [ ] `.github/workflows/ci.yml` actif
- [ ] Supabase migrations appliquées
- [ ] Supabase OAuth configuré
- [ ] Vercel projet créé
- [ ] Variables Vercel configurées
- [ ] Callback URLs configurées dans Supabase
- [ ] Test complet: Signup → Intake → Recommend → Dashboard

---

## Ressources utiles

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
