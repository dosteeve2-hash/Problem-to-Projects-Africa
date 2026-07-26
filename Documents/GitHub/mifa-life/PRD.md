# PRD — MIFA Life

## Résumé exécutif
MIFA Life est un SaaS de finance et micro-assurance conçu pour les PME africaines. Il appartient à l'écosystème FORGE Afrika et cible un marché massivement sous-servi : les petites entreprises et entrepreneurs africains qui n'ont pas accès aux produits financiers et assurantiels des banques traditionnelles. MIFA Life leur offre un guichet numérique unique pour gérer leur trésorerie, accéder à de la micro-assurance et construire un historique financier crédible.

## Motivation originale
> "SaaS finance / micro-assurance pour PME africaines. FORGE Afrika."
> — Steve Donald Compaore

La motivation est ancrée dans la stratégie pioche de FORGE Afrika : les PME africaines ont besoin d'argent et de protection pour investir dans leur transformation. MIFA Life est l'outil financier de l'écosystème — il ne prête pas lui-même mais donne aux PME les données et la structure pour accéder au crédit et à l'assurance.

## Vision et ambition
Devenir la "Stripe africaine" pour les PME — simple, accessible sur mobile, sans paperasse. Un entrepreneur de Ouagadougou, Abidjan ou Dakar doit pouvoir créer son compte en 3 minutes et avoir accès à des services financiers qui lui sont normalement refusés par les banques formelles. MIFA Life s'inscrit dans la Phase 1 de FORGE Afrika (logiciels) avec un objectif de monétisation directe via abonnements et commissions.

## Problème résolu
Les PME africaines (TPE/PME informelles et semi-formelles) font face à trois blocages financiers majeurs :
1. **Pas d'historique financier** — sans données structurées, elles ne peuvent pas accéder au crédit bancaire.
2. **Pas de micro-assurance accessible** — les assureurs formels ont des minimum de primes inaccessibles pour les petites entreprises.
3. **Gestion de trésorerie manuelle** — carnets et Excel, sans visibilité sur les flux réels.

MIFA Life résout ces trois problèmes en un seul outil.

## Utilisateurs cibles
- TPE et PME africaines (commerce, artisanat, services, transformation) — 1 à 20 employés
- Entrepreneurs individuels (commerçants, artisans, prestataires)
- Coopératives souhaitant un outil financier collectif
- Agents Orange Money / Wave souhaitant formaliser leur activité

## Fonctionnalités clés (MVP)
- **Tableau de bord financier** — vue consolidée trésorerie, recettes, dépenses, solde prévisionnel
- **Gestion des encaissements** — enregistrement des paiements reçus (espèces, OM, Wave, virement)
- **Gestion des dépenses** — catégorisation, notes, pièces jointes photo
- **Module micro-assurance** — consultation des offres disponibles, souscription simplifiée (partenariat avec assureurs locaux)
- **Rapports financiers** — bilan mensuel/annuel exportable PDF pour dossier crédit
- **Historique de crédit** — score interne basé sur les données de gestion

## Stack technique
```
Frontend    Next.js 15 (App Router) + TypeScript strict + Tailwind CSS
UI          shadcn/ui + Framer Motion
Auth/DB     Supabase SSR (getUser() côté serveur, jamais getSession())
Paiements   Orange Money, Wave (webhooks)
Déploiement Vercel
Charte      Navy #0A1628, Gold #D4AF37, Cyan #00BCD4
Montants    Intl.NumberFormat('fr-FR') + ' FCFA'
```

## Intégration écosystème FORGE Afrika
MIFA Life est le bras financier de l'écosystème. Connexions directes :
- **CompTrack** → partage des données de revenus/dépenses pour enrichir le scoring
- **SUGU** → les commerçants utilisant SUGU peuvent connecter leur compte MIFA Life pour un bilan automatique
- **TAAMA** → les PMEs industrielles utilisant TAAMA peuvent accéder à du financement via leur historique MIFA Life
- **ValueChain Connect** → les transactions B2B peuvent être traitées via MIFA Life

## Feuille de route
### Phase 1 — Comptabilité PME (MVP)
Tableau de bord, encaissements, dépenses, rapports PDF. SaaS B2C avec abonnement mensuel (5 000-10 000 FCFA/mois).

### Phase 2 — Micro-assurance
Partenariats assureurs locaux (SONAR BF, Allianz Afrique). Interface de souscription et gestion des sinistres.

### Phase 3 — Accès au crédit
Scoring propriétaire basé sur l'historique MIFA Life. Partenariats avec fonds d'investissement (PROPARCO, BIO, DEG) et fintech de crédit africaines.

## Métriques de succès
- Nombre de PME actives (cible Phase 1 : 200 PMEs)
- MRR (cible Phase 1 fin : 1M FCFA/mois)
- Taux de rétention mensuel > 80%
- Nombre de contrats micro-assurance souscrits via la plateforme
- Montant de crédit obtenu par les utilisateurs grâce au scoring MIFA Life

## Contraintes et décisions clés
- Conformité réglementaire : les activités d'assurance nécessitent un agrément CIMA (zone francophone) — MIFA Life agit comme intermédiaire, pas comme assureur direct.
- Sécurité des données financières : chiffrement bout-en-bout, RLS Supabase strict, aucune donnée financière en clair dans les logs.
- Accessibilité mobile-first : 80% des utilisateurs cibles accèdent via smartphone, connexion intermittente.
- Multi-devise : FCFA (XOF) prioritaire, extension GHS, NGN en Phase 2.

---
*PRD rédigé par Claude (COO) sur instruction de Steve Donald Compaore (PDG FORGE Afrika)*
*Dernière mise à jour : 2026-07-25*
