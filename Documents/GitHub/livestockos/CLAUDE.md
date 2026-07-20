# LivestockOS — Instructions Claude

## Stack
- Next.js 15 App Router + TypeScript strict (0 `any`)
- Supabase SSR : TOUJOURS `getUser()`, JAMAIS `getSession()`
- Charte : Navy #0A1628, Gold #D4AF37, Cyan #00BCD4
- Montants FCFA : `new Intl.NumberFormat('fr-FR').format(n) + ' FCFA'`

## Règles obligatoires
- `npm run build` 0 erreurs avant chaque push
- Co-authored-by: Claude <claude@anthropic.com> dans chaque commit

## Contexte produit
SaaS gestion de l'élevage pour PME africaines. FORGE Afrika.

## Règles IA sécurité (CRITIQUE)

- Rate limit sur TOUS les endpoints AI : 20 req/user/heure max
- Ne jamais passer l'input user dans le system prompt — toujours : <user_input>${input}</user_input>
- God File anti-pattern : 1 fichier = 1 responsabilité, découper à 250 lignes
- Ne jamais modifier .env, .env.local, .env.production directement
