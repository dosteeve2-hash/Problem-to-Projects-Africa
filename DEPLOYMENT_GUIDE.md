# Guide de Déploiement - Problem to Project Africa

## 📋 Table des Matières

1. [Prérequis](#prérequis)
2. [Configuration Locale](#configuration-locale)
3. [Déploiement Web (Vercel)](#déploiement-web-vercel)
4. [Déploiement Mobile (Expo)](#déploiement-mobile-expo)
5. [Configuration Supabase](#configuration-supabase)
6. [Variables d'Environnement](#variables-denvironnement)
7. [Tests et Validation](#tests-et-validation)
8. [Monitoring et Support](#monitoring-et-support)

---

## 🔧 Prérequis

### Outils Requis
- Node.js 18+ et npm/pnpm
- Git
- Compte Supabase
- Compte Vercel
- Compte Expo (pour mobile)
- Docker (optionnel, pour développement local)

### Comptes Externes
- **Supabase** : Base de données et authentification
- **Vercel** : Hébergement web
- **Expo** : Distribution mobile
- **SendGrid** (optionnel) : Emails
- **Stripe** (optionnel) : Paiements

---

## 🚀 Configuration Locale

### 1. Cloner le Repository

```bash
git clone https://github.com/yourusername/problem-to-project-africa.git
cd problem-to-project-africa
```

### 2. Installer les Dépendances

```bash
# Web
cd web
npm install
# ou
pnpm install

# Mobile
cd ../mobile
npm install
```

### 3. Configurer les Variables d'Environnement

```bash
# Web
cp .env.example .env.local
# Éditer .env.local avec vos valeurs

# Mobile
cp .env.example .env.local
# Éditer .env.local avec vos valeurs
```

### 4. Démarrer le Développement Local

```bash
# Web (http://localhost:3000)
npm run dev

# Mobile (http://localhost:8081)
npm run dev
```

---

## 🌐 Déploiement Web (Vercel)

### 1. Créer un Projet Vercel

```bash
# Installer Vercel CLI
npm install -g vercel

# Déployer
vercel
```

### 2. Configurer les Variables d'Environnement

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add API_SECRET_KEY
# ... ajouter toutes les variables
```

### 3. Configurer le Domaine

1. Aller sur https://vercel.com/dashboard
2. Sélectionner le projet
3. Aller à Settings → Domains
4. Ajouter votre domaine personnalisé

### 4. Configurer les Redirections

```javascript
// vercel.json
{
  "redirects": [
    {
      "source": "/api/:path*",
      "destination": "https://api.problemtoproject.africa/:path*"
    }
  ]
}
```

### 5. Déployer

```bash
git push origin main
# Vercel déploiera automatiquement
```

---

## 📱 Déploiement Mobile (Expo)

### 1. Configurer Expo

```bash
# Installer Expo CLI
npm install -g expo-cli

# Se connecter
expo login
```

### 2. Configurer app.config.ts

```typescript
export default {
  name: "Problem to Project Africa",
  slug: "problem-to-project-africa",
  version: "1.0.0",
  // ... autres configurations
};
```

### 3. Générer les Builds

```bash
# iOS
eas build --platform ios

# Android
eas build --platform android

# Web
expo export --platform web
```

### 4. Publier sur les App Stores

```bash
# Google Play
eas submit --platform android

# App Store
eas submit --platform ios
```

---

## 🗄️ Configuration Supabase

### 1. Créer un Projet Supabase

1. Aller sur https://supabase.com
2. Créer un nouveau projet
3. Attendre que la base de données soit prête

### 2. Exécuter les Migrations

```bash
# Installer Supabase CLI
npm install -g supabase

# Connecter au projet
supabase link --project-ref your-project-ref

# Exécuter les migrations
supabase migration up
```

### 3. Configurer l'Authentification

1. Aller à Authentication → Providers
2. Activer Email/Password
3. Configurer les fournisseurs OAuth (Google, GitHub)

### 4. Configurer les Politiques RLS

Les politiques RLS sont déjà configurées dans les migrations. Vérifier :

```sql
-- Vérifier les politiques
SELECT * FROM pg_policies WHERE tablename = 'projects';
```

### 5. Configurer les Webhooks (optionnel)

```bash
# Pour les notifications en temps réel
supabase functions deploy notify-user
```

---

## 🔐 Variables d'Environnement

### Web (.env.local)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# API
NEXT_PUBLIC_API_URL=https://api.problemtoproject.africa
API_SECRET_KEY=your-secret-key

# Email
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your-sendgrid-key

# Analytics
NEXT_PUBLIC_GA_ID=your-ga-id

# App
NEXT_PUBLIC_APP_NAME=Problem to Project Africa
NEXT_PUBLIC_APP_URL=https://problemtoproject.africa
NODE_ENV=production
```

### Mobile (.env.local)

```env
# Supabase
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# API
EXPO_PUBLIC_API_URL=https://api.problemtoproject.africa

# App
EXPO_PUBLIC_APP_NAME=Problem to Project Africa
NODE_ENV=production
```

---

## ✅ Tests et Validation

### 1. Tests Unitaires

```bash
npm run test
```

### 2. Tests d'Intégration

```bash
npm run test:integration
```

### 3. Tests E2E

```bash
npm run test:e2e
```

### 4. Vérifier les Builds

```bash
# Web
npm run build
npm run start

# Mobile
eas build --platform ios --local
eas build --platform android --local
```

### 5. Validation de Sécurité

```bash
# Vérifier les dépendances
npm audit

# Vérifier les secrets
git secrets --scan
```

---

## 📊 Monitoring et Support

### 1. Configurer le Monitoring

```bash
# Sentry pour les erreurs
npm install @sentry/nextjs
npm install @sentry/react-native

# Configurer dans les fichiers
```

### 2. Logs et Debugging

```bash
# Vercel
vercel logs

# Supabase
supabase logs --follow

# Mobile
expo logs
```

### 3. Performance

```bash
# Web Vitals
npm run analyze

# Bundle Size
npm run bundle-analyze
```

### 4. Support et Documentation

- **Documentation** : https://docs.problemtoproject.africa
- **Support** : support@problemtoproject.africa
- **Issues** : https://github.com/yourusername/problem-to-project-africa/issues

---

## 🔄 Pipeline CI/CD

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run test
      - uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 📝 Checklist de Déploiement

- [ ] Toutes les variables d'environnement configurées
- [ ] Base de données Supabase prête
- [ ] Tests passent avec succès
- [ ] Build web génère sans erreurs
- [ ] Build mobile génère sans erreurs
- [ ] Domaine personnalisé configuré
- [ ] SSL/HTTPS activé
- [ ] Monitoring configuré
- [ ] Backups configurés
- [ ] Documentation mise à jour

---

## 🆘 Dépannage

### Problème : Erreur de connexion Supabase

```bash
# Vérifier les credentials
echo $NEXT_PUBLIC_SUPABASE_URL
echo $NEXT_PUBLIC_SUPABASE_ANON_KEY

# Tester la connexion
curl -X GET https://your-project.supabase.co/rest/v1/projects \
  -H "apikey: your-anon-key"
```

### Problème : Build échoue

```bash
# Nettoyer et reconstruire
rm -rf .next
npm run build

# Vérifier les logs
npm run build -- --debug
```

### Problème : Mobile ne se connecte pas

```bash
# Vérifier les logs Expo
expo logs

# Réinstaller les dépendances
rm -rf node_modules
npm install

# Reconstruire
eas build --platform android --local
```

---

## 📞 Support

Pour toute question ou problème :

- **Email** : support@problemtoproject.africa
- **Chat** : https://problemtoproject.africa/support
- **GitHub Issues** : https://github.com/yourusername/problem-to-project-africa/issues

---

## 📄 Licence

© 2026 Problem to Project Africa. Tous droits réservés.
