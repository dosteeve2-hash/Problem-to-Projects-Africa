# Plan d'implémentation : Polish UX, Navigation Mobile, Explore & Footer

## Objectif
Reprendre et finaliser les tâches commencées par Verdant concernant l'amélioration de l'UX globale de l'application MVP `Problem to Project Africa`.
Les objectifs principaux sont :
1. Finaliser le composant Header pour avoir un vrai menu mobile riche et fonctionnel.
2. Harmoniser la traduction des secteurs ("Health" vers "Sante") dans le catalogue et la page d'exploration.
3. Intégrer le Footer sur les pages principales.
4. Mettre à jour la page de résultats pour inclure des liens vers les détails des projets.

## Modifications Proposées

### Navigation Mobile & Header
#### [MODIFY] src/components/marketing/site-header.tsx
- Améliorer l'UX du menu mobile existant (transparence, animations si nécessaire, intégration correcte du bouton d'authentification).
- S'assurer que le menu se ferme correctement au clic et couvre le bon espace.

### Harmonisation du catalogue
#### [MODIFY] src/lib/recommendation/catalog.ts
- Remplacer `sector: "Health"` par `sector: "Sante"` pour correspondre à la constante `SUPPORTED_SECTORS` dans [src/lib/product.ts](file:///c:/Users/pc/Documents/problem%20to%20project%20africa/src/lib/product.ts).

### Footer
#### [MODIFY] src/app/modes/page.tsx, src/app/intake/page.tsx, src/app/results/page.tsx
- Ajouter `<SiteFooter />` en bas de chaque section principale ou layout approprié pour garantir l'uniformité du design.

### Page des Résultats
#### [MODIFY] src/components/results/results-client.tsx
- Transformer les blocs d'idées de projets et le projet recommandé en composants cliquables (via `Link`) qui redirigent vers `/project/[id]`.

## Vérification
### Vérification Fonctionnelle Manuelle
- Démarrer le serveur de développement via `npm run dev` en arrière-plan.
- Utiliser un sous-agent de navigateur (`browser_subagent`) pour :
  - Parcourir la page d'accueil en résolution mobile et vérifier l'ouverture/fermeture du menu.
  - Parcourir la page [Explore](file:///c:/Users/pc/Documents/problem%20to%20project%20africa/src/app/explore/page.tsx#8-74) et vérifier que la section "Sante" affiche bien les 3 projets de santé.
  - Soumettre un flux (en "mockant" ou naviguant) jusqu'à la page [Results](file:///c:/Users/pc/Documents/problem%20to%20project%20africa/src/app/results/page.tsx#4-14) et vérifier que les projets listés sont cliquables.
  - Vérifier la présence du Footer sur chaque page principale visitée.
