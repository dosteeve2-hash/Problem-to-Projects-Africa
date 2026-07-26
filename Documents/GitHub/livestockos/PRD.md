# PRD — LivestockOS

## Résumé exécutif
LivestockOS est un SaaS de gestion de l'élevage conçu pour les PME africaines — éleveurs semi-industriels, fermes laitières, unités avicoles. Il digitalise le suivi du cheptel, la santé animale, la production (lait, œufs, viande), les coûts d'alimentation et les ventes. LivestockOS fait partie de l'écosystème FORGE Afrika et alimente ValueChain Connect avec les offres de produits animaux (viande, lait, œufs) certifiés et traçables.

## Motivation originale
> "SaaS gestion de l'élevage pour PME africaines. FORGE Afrika."
> — Contexte produit issu de CLAUDE.md

L'élevage est une composante essentielle de la transformation alimentaire africaine (laiteries, boucheries industrielles, aviculture). Les éleveurs semi-industriels africains n'ont aucun outil numérique adapté à leur réalité (connexion intermittente, faible informatisation, FCFA, langues locales). LivestockOS comble ce vide.

## Vision et ambition
Être le "Herdwatch africain" — l'outil numérique de référence pour les éleveurs africains qui veulent professionnaliser leur activité et accéder aux marchés formels (supermarchés, exportateurs, laiteries industrielles). À terme, LivestockOS doit être le point d'entrée de l'élevage dans l'écosystème FORGE Afrika — du pâturage à l'assiette.

## Problème résolu
1. **Traçabilité zéro** — sans registre structuré, impossible de certifier l'origine d'un animal ou d'un lot de lait.
2. **Gestion sanitaire manuelle** — vaccinations oubliées, traitements mal dosés, épidémies non détectées à temps.
3. **Rentabilité opaque** — les éleveurs ne savent pas si leur activité est rentable (coût alimentation vs ventes).
4. **Accès aux marchés limité** — les acheteurs formels (laiteries, supermarchés) exigent une traçabilité que l'éleveur traditionnel ne peut pas fournir.

## Utilisateurs cibles
- **Éleveurs semi-industriels** — bovins laitiers, ovins, caprins, volaille (50 à 500 têtes)
- **Fermes avicoles** — suivi des cohortes de poulets de chair, poules pondeuses
- **Responsables vétérinaires** — suivi des interventions sanitaires
- **Acheteurs** — via ValueChain Connect, accèdent aux lots avec certificats sanitaires

## Fonctionnalités clés (MVP)

### Module Cheptel
- Registre individuel de chaque animal (espèce, race, date naissance, origine)
- Tags et QR codes par animal
- Groupes/troupeaux pour la gestion collective

### Module Santé animale
- Calendrier de vaccination automatique
- Alertes rappels (vaccin, déparasitage)
- Journal vétérinaire (interventions, traitements, coûts)
- Alertes épidémiques (symptômes enregistrés → alerte si seuil dépassé)

### Module Production
- Saisie quotidienne (lait en litres, œufs, poids vifs)
- Suivi par animal ou par cohorte
- Tendances production (Recharts)

### Module Alimentation
- Rations par espèce et stade
- Coût d'alimentation journalier
- Stock d'aliments et alertes rupture

### Module Ventes
- Enregistrement des ventes (animal vivant, lait, œufs, viande)
- Prix marché vs prix obtenu
- Bilan financier élevage

### Module Certifications
- Fiche sanitaire par animal/lot exportable
- Carnet de vaccination exportable PDF

## Stack technique
```
Frontend    Next.js 15 (App Router) + TypeScript strict + Tailwind CSS
Auth/DB     Supabase SSR (getUser() côté serveur, jamais getSession())
UI          shadcn/ui + Framer Motion
Déploiement Vercel
Charte      Navy #0A1628, Gold #D4AF37, Cyan #00BCD4
Montants    Intl.NumberFormat('fr-FR') + ' FCFA'
```

## Intégration écosystème FORGE Afrika
- **LivestockOS → ValueChain Connect** : les éleveurs peuvent lister leurs animaux et produits directement sur le marketplace B2B
- **LivestockOS → TAAMA** : les laiteries et abattoirs industriels utilisant TAAMA reçoivent les lots directement depuis LivestockOS
- **LivestockOS → CompTrack** : les données financières (coûts, ventes) s'exportent vers CompTrack
- **LivestockOS → FORGE Afrika HQ** : métriques (cheptel total, production lait/œufs) remontées au dashboard groupe

## Feuille de route
### Phase 1 — Registre cheptel + santé
Enregistrement animaux, calendrier vaccinations, alertes sanitaires. SaaS B2C/B2B, abonnement mensuel.

### Phase 2 — Production + alimentation
Saisie production quotidienne, gestion stocks aliments, bilan financier élevage.

### Phase 3 — Ventes + certifications
Module ventes, fiches sanitaires exportables, connexion ValueChain Connect.

### Phase 4 — Analytics + expansion CEDEAO
Dashboard performances élevage, benchmarking (anonymisé), expansion Mali, Côte d'Ivoire, Sénégal.

## Métriques de succès
- Nombre d'élevages actifs (cible Phase 1 : 20 élevages pilotes)
- Nombre d'animaux enregistrés
- % de vaccinations à jour (cible > 90% pour les élevages actifs)
- Réduction de la mortalité animale (mesure qualitative retours terrain)
- MRR (cible Phase 2 fin : 300 000 FCFA/mois)

## Contraintes et décisions clés
- **Mobile-first** — les éleveurs saisissent depuis le terrain, souvent avec 3G/Edge ; interface légère obligatoire
- **Offline partiel** — les saisies quotidiennes (lait, œufs) doivent fonctionner sans connexion et syncer après
- **Multi-espèces** — l'architecture doit supporter bovins, ovins, caprins, volaille sans multiplier les tables ; schema flexible
- **Sécurité** — les données de santé animale sont sensibles pour les certifications export ; RLS strict, aucune donnée partagée entre élevages sans consentement explicite
- **`npm run build` 0 erreurs** avant chaque push

---
*PRD rédigé par Claude (COO) sur instruction de Steve Donald Compaore (PDG FORGE Afrika)*
*Dernière mise à jour : 2026-07-25*
