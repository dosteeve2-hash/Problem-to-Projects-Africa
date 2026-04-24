import type { RecommendationMode } from "@/lib/types/recommendation";

export type ProjectTemplate = {
  id: string;
  sector: string;
  mode: RecommendationMode;
  title: string;
  concept: string;
  problem: string;
  localRelevance: string;
  mvpSummary: string;
  topFeatures: string[];
  skillsToLearn: string[];
  nextStep: string;
  tags: string[];
};

export const projectCatalog: ProjectTemplate[] = [
  // ─── Agriculture ───────────────────────────────────────────
  {
    id: "agri-crop-loss",
    sector: "Agriculture",
    mode: "problem",
    title: "Reseau de signalement des pertes de recoltes",
    concept:
      "Un workflow leger de signalement pour remonter les pertes de recoltes et coordonner les reponses plus vite.",
    problem:
      "Les petits producteurs n'ont pas de visibilite sur les causes recurrentes de pertes et la coordination de reponse est lente.",
    localRelevance:
      "Au Burkina Faso, la resilience agricole depend d'outils pratiques qui fonctionnent meme avec une connectivite faible.",
    mvpSummary:
      "Commencer avec un flux de signalement via WhatsApp ou SMS pour une communaute agricole, plus un tableau de bord operateur simple.",
    topFeatures: [
      "Signalement de probleme par message",
      "Journal d'incidents par village",
      "Tableau de bord hebdomadaire",
    ],
    skillsToLearn: ["Recherche terrain", "Design de workflow", "Integration SMS ou messagerie"],
    nextStep:
      "Interviewer 5 agriculteurs ou coordinateurs dans une zone cible pour cartographier le processus actuel de signalement.",
    tags: ["terrain", "sms", "communaute", "coordination", "rural"],
  },
  {
    id: "agri-market-price",
    sector: "Agriculture",
    mode: "skills",
    title: "Outil de suivi des prix du marche local",
    concept:
      "Un service simple qui collecte et diffuse les prix des denrees sur les marches locaux pour aider les producteurs a mieux vendre.",
    problem:
      "Les agriculteurs vendent souvent a perte faute de visibilite sur les prix pratiques dans les marches voisins.",
    localRelevance:
      "La transparence des prix est un levier concret pour ameliorer les revenus agricoles au Burkina Faso.",
    mvpSummary:
      "Collecte manuelle des prix sur 3 marches, diffusion hebdomadaire par SMS ou groupe WhatsApp.",
    topFeatures: [
      "Collecte de prix par contributeurs terrain",
      "Diffusion SMS/WhatsApp hebdomadaire",
      "Comparaison entre marches",
    ],
    skillsToLearn: ["Collecte de donnees", "Operations terrain", "Design mobile"],
    nextStep:
      "Identifier 3 marches proches et lister les 5 produits les plus echanges pour commencer la collecte.",
    tags: ["prix", "marche", "sms", "donnees", "rural", "commerce"],
  },
  {
    id: "agri-irrigation",
    sector: "Agriculture",
    mode: "idea",
    title: "Calendrier d'irrigation communautaire",
    concept:
      "Un outil de planification partage pour coordonner l'acces a l'eau entre plusieurs exploitations sur un meme perimetre irrigue.",
    problem:
      "L'acces a l'eau est souvent source de conflits et de gaspillage quand il n'y a pas de coordination.",
    localRelevance:
      "Au Burkina Faso, les perimetres irrigues communautaires necessitent une gestion collective structuree.",
    mvpSummary:
      "Un tableau de planning papier+WhatsApp pour un perimetre irrigue avec rotation des tours d'eau.",
    topFeatures: [
      "Planning de rotation",
      "Notifications de tour d'eau",
      "Suivi de consommation",
    ],
    skillsToLearn: ["Gestion de ressources", "Coordination communautaire", "Design de planning"],
    nextStep:
      "Rencontrer le responsable d'un perimetre irrigue pour comprendre comment les tours d'eau sont actuellement geres.",
    tags: ["eau", "communaute", "planning", "rural", "coordination"],
  },

  // ─── Education ─────────────────────────────────────────────
  {
    id: "edu-revision",
    sector: "Education",
    mode: "skills",
    title: "Compagnon de revision low-bandwidth pour etudiants",
    concept:
      "Un service de soutien scolaire qui envoie des rappels de revision et du contenu via des canaux mobiles legers.",
    problem:
      "Beaucoup d'etudiants ont besoin d'aide structuree mais ne peuvent pas dependre de plateformes lourdes.",
    localRelevance:
      "Le soutien scolaire au Burkina Faso beneficie de modeles low-cost et low-data qui rejoignent les etudiants ou ils sont.",
    mvpSummary:
      "Lancer avec un examen cible, un calendrier hebdomadaire et du contenu court par SMS ou web leger.",
    topFeatures: [
      "Plan de revision hebdomadaire",
      "Exercices courts quotidiens",
      "Check-ins de progression",
    ],
    skillsToLearn: ["Design pedagogique", "Structuration de contenu", "Test produit"],
    nextStep:
      "Choisir un public d'examen cible et esquisser une sequence de revision de 7 jours qu'ils utiliseraient vraiment.",
    tags: ["education", "mobile", "sms", "etudiant", "examen"],
  },
  {
    id: "edu-mentoring",
    sector: "Education",
    mode: "problem",
    title: "Plateforme de mise en relation mentors-etudiants",
    concept:
      "Un systeme simple de matching entre etudiants en difficulte et mentors benevoles dans leur domaine.",
    problem:
      "Les etudiants manquent d'orientation et de modeles accessibles dans leur domaine d'etudes.",
    localRelevance:
      "Au Burkina Faso, le mentorat informel existe mais n'est pas structure ni accessible a grande echelle.",
    mvpSummary:
      "Un formulaire d'inscription + matching manuel par domaine + suivi par WhatsApp pour 20 premiers binomes.",
    topFeatures: [
      "Inscription mentors et mentees",
      "Matching par domaine et ville",
      "Suivi des sessions",
    ],
    skillsToLearn: ["Design de matching", "Community management", "Suivi d'engagement"],
    nextStep:
      "Recruter 5 mentors benevoles dans un domaine et tester le processus de matching avec 5 etudiants.",
    tags: ["mentorat", "communaute", "matching", "etudiant"],
  },
  {
    id: "edu-local-content",
    sector: "Education",
    mode: "idea",
    title: "Bibliotheque de cours adaptes au contexte local",
    concept:
      "Une collection de micro-cours crees par des enseignants locaux, adaptes au programme burkinabe et accessibles hors ligne.",
    problem:
      "Les contenus educatifs en ligne sont souvent deconnectes du programme national et necessitent une bonne connexion.",
    localRelevance:
      "Des contenus pedagogiques alignes sur le programme burkinabe et accessibles offline auraient un impact direct.",
    mvpSummary:
      "5 enseignants creent 10 micro-cours (texte + audio) pour une matiere, distribues sur carte SD ou WhatsApp.",
    topFeatures: [
      "Micro-cours texte + audio",
      "Distribution offline (carte SD)",
      "Alignement programme national",
    ],
    skillsToLearn: ["Creation de contenu", "Design pedagogique", "Distribution offline"],
    nextStep:
      "Contacter 3 enseignants d'une matiere et leur proposer de creer un premier micro-cours pilote.",
    tags: ["contenu", "offline", "enseignant", "programme"],
  },

  // ─── Sante / Health ────────────────────────────────────────
  {
    id: "health-appointment",
    sector: "Sante",
    mode: "idea",
    title: "Coordinateur de rendez-vous et suivi pour cliniques locales",
    concept:
      "Une couche de coordination pour les rappels, reprogrammations et suivis manques dans les petits centres de sante.",
    problem:
      "Le suivi patient se casse souvent parce que les rappels et la planification sont inconsistants.",
    localRelevance:
      "Au Burkina Faso, de petites ameliorations operationnelles comptent plus que des plateformes complexes.",
    mvpSummary:
      "Commencer avec un workflow pour une clinique, focalise sur les rappels et le suivi manuel.",
    topFeatures: [
      "Liste de rappels de visites",
      "Suivi des rendez-vous manques",
      "Tableau de statut patient",
    ],
    skillsToLearn: ["Design de service", "Bases de confidentialite donnees", "Cartographie de workflow"],
    nextStep:
      "Valider le workflow de rappel actuel avec un membre du personnel d'une clinique et documenter ou les patients decrochent.",
    tags: ["sante", "clinique", "rappel", "suivi", "operations"],
  },
  {
    id: "health-pharma-stock",
    sector: "Sante",
    mode: "skills",
    title: "Alerte de rupture de stock pour pharmacies rurales",
    concept:
      "Un outil simple qui permet aux pharmacies rurales de signaler leurs ruptures de stock pour faciliter le reapprovisionnement.",
    problem:
      "Les pharmacies rurales manquent regulierement de medicaments essentiels sans pouvoir le signaler efficacement.",
    localRelevance:
      "L'acces aux medicaments en zone rurale au Burkina Faso est un enjeu de sante publique majeur.",
    mvpSummary:
      "Un formulaire SMS/WhatsApp de signalement + un tableau centralise des ruptures pour un district sanitaire.",
    topFeatures: [
      "Signalement de rupture par SMS",
      "Tableau de bord des ruptures par zone",
      "Alertes aux fournisseurs",
    ],
    skillsToLearn: ["Logistique sante", "Design de formulaire", "Gestion de donnees"],
    nextStep:
      "Visiter 3 pharmacies rurales pour comprendre comment elles gerent actuellement les ruptures de stock.",
    tags: ["pharmacie", "stock", "rural", "sante", "sms"],
  },
  {
    id: "health-community-worker",
    sector: "Sante",
    mode: "problem",
    title: "Suivi de tournees des agents de sante communautaire",
    concept:
      "Un outil leger pour aider les agents de sante communautaire a planifier et reporter leurs visites terrain.",
    problem:
      "Les agents de sante communautaire font des tournees sans outil de suivi, rendant la coordination et le reporting difficiles.",
    localRelevance:
      "Les agents de sante communautaire sont un pilier du systeme de sante burkinabe, mais manquent d'outils simples.",
    mvpSummary:
      "Un carnet de tournee digital leger (PWA offline) pour un groupe de 10 agents dans un district.",
    topFeatures: [
      "Check-list de visite",
      "Rapport de tournee simplifie",
      "Sync quand connecte",
    ],
    skillsToLearn: ["PWA/offline-first", "UX terrain", "Design de check-list"],
    nextStep:
      "Accompagner un agent de sante communautaire pendant une journee de tournee pour observer son processus.",
    tags: ["agent", "terrain", "offline", "tournee", "rural"],
  },

  // ─── Commerce informel ────────────────────────────────────
  {
    id: "commerce-inventory",
    sector: "Commerce informel",
    mode: "skills",
    title: "Outil de suivi de stock pour detaillants informels",
    concept:
      "Un outil simple de visibilite sur les stocks pour aider les petits commercants a reduire les ruptures.",
    problem:
      "Les detaillants informels gerent leurs stocks manuellement et decouvrent les ruptures trop tard.",
    localRelevance:
      "Le petit commerce au Burkina Faso a besoin d'outils qui s'integrent aux routines informelles.",
    mvpSummary:
      "Commencer avec 10 produits, un rituel hebdomadaire de restock, et des alertes via interface mobile simple.",
    topFeatures: [
      "Saisie de stock",
      "Alertes de stock bas",
      "Resume hebdomadaire de restock",
    ],
    skillsToLearn: ["Interviews marchands", "Pensee operations", "UI mobile simple"],
    nextStep:
      "Observer la routine hebdomadaire de stock d'un marchand et lister les 3 moments les plus douloureux.",
    tags: ["stock", "commerce", "mobile", "marchand", "operations"],
  },
  {
    id: "commerce-tontine",
    sector: "Commerce informel",
    mode: "problem",
    title: "Gestionnaire de tontine digitale",
    concept:
      "Un outil simple pour suivre les cotisations, les tours et les paiements dans les groupes de tontine.",
    problem:
      "Les tontines sont gerees sur papier ou de memoire, ce qui cree des conflits et des pertes.",
    localRelevance:
      "La tontine est un pilier de l'epargne informelle au Burkina Faso, mais souffre d'un manque de transparence.",
    mvpSummary:
      "Un groupe WhatsApp structure + un tableau de suivi partage pour une tontine de 10 a 20 membres.",
    topFeatures: [
      "Suivi des cotisations",
      "Calendrier des tours",
      "Historique des paiements",
    ],
    skillsToLearn: ["Finance informelle", "Design de confiance", "Gestion de groupe"],
    nextStep:
      "Rejoindre ou observer une tontine existante pour comprendre comment les cotisations et tours sont geres.",
    tags: ["tontine", "epargne", "confiance", "groupe", "finance"],
  },
  {
    id: "commerce-whatsapp-catalog",
    sector: "Commerce informel",
    mode: "idea",
    title: "Catalogue WhatsApp pour commercants locaux",
    concept:
      "Un generateur de mini-catalogues produits partageables sur WhatsApp pour les petits commercants.",
    problem:
      "Les commercants utilisent deja WhatsApp mais n'ont pas de moyen structure de presenter leurs produits.",
    localRelevance:
      "WhatsApp est le canal dominant au Burkina Faso. Un outil qui s'y integre a plus de chances d'adoption.",
    mvpSummary:
      "Un formulaire web simple qui genere une image ou PDF catalogue a partager directement sur WhatsApp.",
    topFeatures: [
      "Saisie de produits avec photo",
      "Generation de catalogue image/PDF",
      "Partage WhatsApp direct",
    ],
    skillsToLearn: ["Generation d'images", "UX mobile", "Compression de fichiers"],
    nextStep:
      "Demander a 5 commercants comment ils presentent actuellement leurs produits sur WhatsApp.",
    tags: ["whatsapp", "catalogue", "image", "commercant", "mobile"],
  },

  // ─── Energie ───────────────────────────────────────────────
  {
    id: "energie-outage",
    sector: "Energie",
    mode: "problem",
    title: "Tableau de suivi des coupures d'electricite",
    concept:
      "Un outil communautaire de signalement et de visibilite sur les coupures de courant dans un quartier.",
    problem:
      "Les coupures recurrentes creent de l'incertitude et une mauvaise coordination de reponse.",
    localRelevance:
      "L'instabilite energetique affecte directement la vie quotidienne et la continuite des activites au Burkina Faso.",
    mvpSummary:
      "Piloter un tableau d'incidents de quartier avec un canal de signalement et un rythme de mise a jour partage.",
    topFeatures: [
      "Capture de signalement de coupure",
      "Mises a jour de statut par zone",
      "Digest communautaire ou operateur",
    ],
    skillsToLearn: ["Operations communautaires", "Structuration de donnees", "Communication parties prenantes"],
    nextStep:
      "Definir un quartier cible et tester si les residents signaleraient des coupures via un canal simple.",
    tags: ["electricite", "coupure", "communaute", "signalement", "quartier"],
  },
  {
    id: "energie-solar-sizing",
    sector: "Energie",
    mode: "skills",
    title: "Calculateur solaire simplifie pour menages",
    concept:
      "Un outil simple qui aide les menages a estimer la taille du kit solaire dont ils ont besoin selon leurs appareils.",
    problem:
      "Les menages achetent des kits solaires inadaptes faute d'information sur le dimensionnement.",
    localRelevance:
      "Le solaire est en forte croissance au Burkina Faso mais les erreurs de dimensionnement sont frequentes.",
    mvpSummary:
      "Un formulaire web ou USSD qui prend la liste des appareils et calcule la puissance necessaire.",
    topFeatures: [
      "Saisie des appareils electriques",
      "Calcul de puissance necessaire",
      "Recommandation de kit",
    ],
    skillsToLearn: ["Bases de l'energie solaire", "Calculs de dimensionnement", "UX formulaire"],
    nextStep:
      "Lister les 10 appareils les plus courants dans un menage burkinabe et leur consommation.",
    tags: ["solaire", "calcul", "menage", "energie", "formulaire"],
  },
  {
    id: "energie-battery-coop",
    sector: "Energie",
    mode: "idea",
    title: "Cooperative de recharge de batteries",
    concept:
      "Un modele de station de recharge partagee pour batteries de telephones et petits appareils dans les zones sans electricite fiable.",
    problem:
      "Dans les zones a electricite instable, la recharge de telephone est un probleme quotidien couteux.",
    localRelevance:
      "La recharge de telephone est un service essentiel au Burkina Faso, surtout dans les zones periurbaines et rurales.",
    mvpSummary:
      "Un point de recharge solaire avec un systeme de tickets et un suivi papier+digital des clients.",
    topFeatures: [
      "Gestion des tickets de recharge",
      "Suivi du parc batterie",
      "Comptabilite simplifiee",
    ],
    skillsToLearn: ["Modele economique", "Operations terrain", "Gestion de micro-entreprise"],
    nextStep:
      "Estimer le nombre de personnes qui paient pour recharger leur telephone dans un quartier cible.",
    tags: ["recharge", "solaire", "cooperative", "terrain", "micro-entreprise"],
  },

  // ─── Logistique ────────────────────────────────────────────
  {
    id: "logistique-delivery",
    sector: "Logistique",
    mode: "idea",
    title: "Tableau de coordination de livraisons urbaines",
    concept:
      "Un workflow simple de dispatch et de visibilite pour les commercants gerant des livraisons dispersees.",
    problem:
      "Les petits commerces peinent a coordonner clairement leurs livraisons quand le transport est fragmente.",
    localRelevance:
      "La logistique urbaine au Burkina Faso depend souvent de coordination informelle.",
    mvpSummary:
      "Commencer avec un cluster de marchands, un tableau de dispatch et un rituel quotidien de coordination.",
    topFeatures: [
      "File d'attente de livraisons",
      "Assignation de livreur",
      "Suivi de statut",
    ],
    skillsToLearn: ["Cartographie d'operations", "Outillage admin basique", "Validation utilisateur"],
    nextStep:
      "Cartographier un processus de livraison actuel de la commande a la livraison pour un commerce local.",
    tags: ["livraison", "dispatch", "urbain", "coordination", "commerce"],
  },
  {
    id: "logistique-colis-rural",
    sector: "Logistique",
    mode: "problem",
    title: "Reseau de depot-relais pour colis ruraux",
    concept:
      "Un systeme de points relais dans les villages pour recevoir et redistribuer les colis venant de la ville.",
    problem:
      "Les habitants des zones rurales n'ont pas d'adresse de livraison et recoivent difficilement leurs colis.",
    localRelevance:
      "Le e-commerce et les envois de la diaspora sont en croissance mais la livraison rurale reste un probleme majeur au Burkina Faso.",
    mvpSummary:
      "Identifier 5 boutiques-relais dans des villages, avec un systeme de notification par SMS a l'arrivee du colis.",
    topFeatures: [
      "Enregistrement de colis",
      "Notification SMS au destinataire",
      "Suivi de retrait",
    ],
    skillsToLearn: ["Logistique du dernier kilometre", "Partenariats terrain", "Design de processus"],
    nextStep:
      "Identifier 3 villages ou le probleme de reception de colis est le plus aigu et contacter des boutiquiers potentiels.",
    tags: ["colis", "rural", "relais", "sms", "dernier-kilometre"],
  },
  {
    id: "logistique-transport-sharing",
    sector: "Logistique",
    mode: "skills",
    title: "Mise en relation pour transport partage de marchandises",
    concept:
      "Un service de matching entre commercants qui ont des marchandises a transporter et des vehicules qui font deja le trajet.",
    problem:
      "Les vehicules circulent souvent a moitie vides entre les villes pendant que des marchandises attendent un transport.",
    localRelevance:
      "Optimiser les trajets existants est une approche realiste et low-cost pour le Burkina Faso.",
    mvpSummary:
      "Un groupe WhatsApp structure par axe routier + un coordinateur qui matche les demandes et les offres.",
    topFeatures: [
      "Publication de trajet disponible",
      "Demande de transport",
      "Matching par axe routier",
    ],
    skillsToLearn: ["Marketplace design", "Coordination humaine", "Logistique inter-urbaine"],
    nextStep:
      "Identifier un axe routier frequent (ex: Ouaga-Bobo) et interviewer 5 transporteurs sur leurs trajets a vide.",
    tags: ["transport", "matching", "marchandise", "inter-urbain", "optimisation"],
  },
];
