# GitHub & Vercel Setup Guide

**Objectif**: Configurer le projet pour CI/CD avec GitHub Actions et déploiement automatique sur Vercel.

---

## 📦 Étape 1: Configuration GitHub

### 1.1 Créer/Préparer le Repository

```bash
# Si le repo n'existe pas encore
cd "c:\Users\pc\Documents\problem to project africa"
git init
git add .
git commit -m "Initial commit: MVP setup with CI/CD config"

# Créer le repo sur GitHub puis:
git remote add origin https://github.com/YOUR_USERNAME/problem-to-project-africa.git
git branch -M main
git push -u origin main

# Créer la branche develop
git checkout -b develop
git push -u origin develop
```

### 1.2 Vérifier les fichiers Git

```bash
# Vérifier .gitignore
cat .gitignore

# Devrait inclure:
# .env.local ← IMPORTANT: Jamais commiter les secrets
# node_modules/
# .next/
# .vercel/
```

### 1.3 Configurer les branches

Sur GitHub → Settings → Branches:

**Main branch protection** (optionnel mais recommandé):
- ✅ Require pull request reviews before merging
- ✅ Require status checks to pass (ci.yml)
- ✅ Include administrators

---

## 🔄 Étape 2: CI/CD Pipeline (GitHub Actions)

### 2.1 Vérifier le workflow

Le fichier `.github/workflows/ci.yml` est déjà créé.

Pour tester le pipeline:

```bash
# Faire un changement et pousser
git add SETUP_COMPLETE.md
git commit -m "test: Verify CI pipeline works"
git push origin develop
```

Aller à GitHub → Actions → Vérifier que le workflow a démarré.

### 2.2 Secrets GitHub (optionnel pour avancé)

Si vous voulez que GitHub Actions push vers Vercel:

1. GitHub → Settings → Secrets and variables → Actions
2. Créer les secrets:
   ```
   VERCEL_TOKEN = [depuis https://vercel.com/account/tokens]
   VERCEL_ORG_ID = [depuis dashboard Vercel]
   VERCEL_PROJECT_ID = [depuis dashboard Vercel]
   ```

---

## 🚀 Étape 3: Déploiement Vercel

### 3.1 Option A: Via CLI (Recommandé - Plus rapide)

```bash
# Installer Vercel CLI
npm install -g vercel

# Se connecter
vercel login

# Déployer depuis le répertoire du projet
cd "c:\Users\pc\Documents\problem to project africa"
vercel

# Suivre les instructions interactives:
# - Scope: [votre account]
# - Link to existing project?: No
# - Project name: problem-to-project-africa
# - Framework: Next.js
# - Root: ./
# - Build: npm run build
# - Output: .next
```

Après deployment:
```
https://problem-to-project-africa.vercel.app ← URL de production
```

### 3.2 Option B: Via Dashboard Vercel

1. Aller à https://vercel.com/new
2. Cliquer "Import Git Repository"
3. Chercher et sélectionner `problem-to-project-africa`
4. Configuration:
   - Framework: Next.js
   - Build Command: `npm run build`
   - Install Command: `npm install`
5. Variables d'environnement (voir 3.3)
6. Cliquer "Deploy"

### 3.3 Variables d'environnement Vercel

Dans Vercel Dashboard → Project Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL = https://mdurvhxdbnpuouumkczq.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Important**: Scope = All Environments (Production, Preview, Development)

### 3.4 Configurer les Domains (optionnel)

Pour custom domain:
1. Vercel → Project Settings → Domains
2. Ajouter: `yourdomain.com`
3. Suivre les instructions DNS

---

## 🔐 Étape 4: Configuration Supabase OAuth

### 4.1 Redirect URLs pour callbacks

Aller à Supabase Dashboard → Authentication → URL Configuration:

```
Redirect URLs:
- http://localhost:3000/auth/callback (local)
- https://problem-to-project-africa.vercel.app/auth/callback (production)
```

### 4.2 Configurer les OAuth Providers

Dans Supabase → Auth → Providers, configurer au moins un:

**GitHub OAuth** (exemple):
1. Aller à GitHub → Settings → Developer settings → OAuth Apps
2. Créer "New OAuth App"
   - Application name: Problem to Project Africa
   - Homepage URL: https://your-domain
   - Authorization callback URL: https://your-supabase-url/auth/v1/callback
3. Copier Client ID et Secret
4. Coller dans Supabase → GitHub Provider

**Google OAuth** (alternative plus simple):
1. Aller à Google Cloud Console → Credentials
2. Créer OAuth 2.0 Client ID (Web)
3. Copier credentials vers Supabase

### 4.3 Tester l'authentification

```bash
# Localement
npm run dev
# Aller à http://localhost:3000/login

# Sur Vercel
# Aller à https://problem-to-project-africa.vercel.app/login
# Tester Signup et Login
```

---

## 🔄 Étape 5: Flux de Déploiement

### Schéma de branches

```
main (production) ← Pull Request
  ↑
develop (staging)
  ↑
feature/xyz (features)
```

### Workflow type

```bash
# 1. Créer une feature branch
git checkout -b feature/new-feature develop

# 2. Faire des changements
# ... code ...
git add .
git commit -m "feat: Add new feature"

# 3. Push et créer PR
git push origin feature/new-feature

# 4. GitHub Actions teste automatiquement
# (lint, type check, build)

# 5. Si tout passe, merger la PR
# (via GitHub web interface ou CLI)

# 6. Main branch auto-déployé sur Vercel
# (webhook automatique)
```

### Statut des déploiements

Vérifier dans:
- **GitHub Actions**: Pour les tests (`.github/workflows/ci.yml`)
- **Vercel Deployments**: Pour l'état du déploiement

---

## ✅ Checklist Finale

### GitHub Setup
- [ ] Repository créé et configuré
- [ ] Code pushé sur main et develop
- [ ] `.gitignore` inclut `.env.local`
- [ ] `.github/workflows/ci.yml` est actif

### Vercel Setup
- [ ] Projet Vercel créé
- [ ] Repository GitHub lié
- [ ] Variables d'environnement configurées
- [ ] Déploiement réussi
- [ ] URL accessible

### Supabase OAuth
- [ ] Redirect URLs configurées
- [ ] Au moins 1 OAuth provider configuré
- [ ] Test d'authentification réussi

### CI/CD
- [ ] Workflow GitHub Actions déclenché
- [ ] Tous les checks passent
- [ ] Vercel se déploie automatiquement

---

## 🐛 Dépannage

### Vercel Build Fails
```
Solution:
1. npm run build fonctionne localement?
2. Variables Vercel configurées?
3. Pas de secrets committes?
```

### GitHub Actions Fails
```
Vérifier les logs:
GitHub → Actions → [Workflow] → [Run] → [Job]
```

### Supabase Auth not working
```
Vérifier:
1. Redirect URL exacte dans Supabase
2. OAuth credentials correctes
3. Bien dans la bonne URL (localhost vs vercel)
```

---

## 📚 Documentation rapide

- [Vercel Next.js Guide](https://vercel.com/docs/frameworks/nextjs)
- [GitHub Actions for Node.js](https://github.com/actions/setup-node)
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)

---

**Status**: ✅ Prêt à déployer!
