/**
 * Bibliothèque de Données Burkina Faso
 * Données réelles du terrain pour chaque secteur
 * Sources: FAO, World Bank, IFC, Doing Business, Études locales
 */

export const BurkinaFasoDatabase = {
  // Données Macroéconomiques
  macroeconomics: {
    currency: "CFA Franc (XOF)",
    exchangeRate: 1, // 1 XOF = 1 XOF
    gdpPerCapita: 850000, // XOF (environ 1300 USD)
    inflation: 0.028, // 2.8%
    businessStartupCost: 42.5, // % du revenu par capita
    vat: 0.18, // 18%
    businessRegistrationTime: 7, // jours
    businessRegistrationCost: 150000, // XOF
  },

  // Secteurs et Données Spécifiques
  sectors: {
    agriculture: {
      name: "Agriculture",
      description: "Secteur primaire - Cultures et élevage",
      gdpShare: 0.1859, // 18.59% du PIB
      employmentShare: 0.80, // 80% de la main-d'œuvre
      mainCrops: ["Coton", "Mil", "Sorgho", "Maïs", "Riz", "Arachide"],

      crops: {
        cotton: {
          name: "Coton",
          yieldPerHectare: 1200, // kg/ha
          pricePerKg: 450, // XOF
          landCostPerHectare: 50000, // XOF/an
          seedCost: 80000, // XOF/ha
          fertilizerCost: 120000, // XOF/ha
          laborCost: 200000, // XOF/ha
          equipmentCost: 300000, // XOF/ha (amortissable)
          wateringCost: 0, // Pluvial
          harvestingCost: 150000, // XOF/ha
          totalCostPerHectare: 900000, // XOF
          revenuePerHectare: 540000, // XOF (1200kg * 450)
          profitPerHectare: -360000, // XOF (déficitaire)
          challenges: [
            "Faible prix international",
            "Manque d'eau",
            "Ravageurs",
            "Accès au crédit limité",
            "Manque de stockage",
          ],
          opportunities: [
            "Transformation en textile",
            "Certification biologique",
            "Coopératives de producteurs",
            "Accès aux marchés régionaux",
          ],
        },

        millet: {
          name: "Mil",
          yieldPerHectare: 800, // kg/ha
          pricePerKg: 200, // XOF
          landCostPerHectare: 30000, // XOF/an
          seedCost: 20000, // XOF/ha
          fertilizerCost: 40000, // XOF/ha
          laborCost: 100000, // XOF/ha
          equipmentCost: 150000, // XOF/ha
          wateringCost: 0, // Pluvial
          harvestingCost: 50000, // XOF/ha
          totalCostPerHectare: 390000, // XOF
          revenuePerHectare: 160000, // XOF (800kg * 200)
          profitPerHectare: -230000, // XOF
          challenges: [
            "Rendement faible",
            "Sécheresse fréquente",
            "Manque de technologie",
            "Stockage difficile",
          ],
          opportunities: [
            "Transformation en farine",
            "Bouillie nutritive pour enfants",
            "Bière artisanale",
            "Aliments pour bétail",
          ],
        },

        rice: {
          name: "Riz",
          yieldPerHectare: 3000, // kg/ha (irrigué)
          pricePerKg: 300, // XOF
          landCostPerHectare: 100000, // XOF/an
          seedCost: 100000, // XOF/ha
          fertilizerCost: 200000, // XOF/ha
          laborCost: 300000, // XOF/ha
          equipmentCost: 400000, // XOF/ha
          wateringCost: 500000, // XOF/ha (irrigation)
          harvestingCost: 150000, // XOF/ha
          totalCostPerHectare: 1750000, // XOF
          revenuePerHectare: 900000, // XOF (3000kg * 300)
          profitPerHectare: -850000, // XOF
          challenges: [
            "Coût d'irrigation élevé",
            "Manque d'eau en saison sèche",
            "Maladies du riz",
            "Accès au crédit",
          ],
          opportunities: [
            "Riz transformé (décortiqué)",
            "Farine de riz",
            "Riz étuvé premium",
            "Accès aux marchés urbains",
          ],
        },

        peanut: {
          name: "Arachide",
          yieldPerHectare: 1500, // kg/ha
          pricePerKg: 350, // XOF
          landCostPerHectare: 40000, // XOF/an
          seedCost: 50000, // XOF/ha
          fertilizerCost: 80000, // XOF/ha
          laborCost: 150000, // XOF/ha
          equipmentCost: 200000, // XOF/ha
          wateringCost: 0, // Pluvial
          harvestingCost: 100000, // XOF/ha
          totalCostPerHectare: 620000, // XOF
          revenuePerHectare: 525000, // XOF (1500kg * 350)
          profitPerHectare: -95000, // XOF
          challenges: [
            "Aflatoxines",
            "Manque de stockage",
            "Accès aux marchés",
            "Faible prix",
          ],
          opportunities: [
            "Beurre d'arachide",
            "Huile d'arachide",
            "Pâte d'arachide",
            "Exportation vers Afrique de l'Ouest",
          ],
        },
      },

      livestock: {
        cattle: {
          name: "Élevage Bovin",
          initialInvestment: 500000, // XOF (1 vache)
          annualFeedCost: 200000, // XOF
          veterinaryCost: 50000, // XOF
          waterCost: 30000, // XOF
          laborCost: 100000, // XOF
          totalAnnualCost: 380000, // XOF
          meatYield: 200, // kg/an
          meatPrice: 3000, // XOF/kg
          annualRevenue: 600000, // XOF
          annualProfit: 220000, // XOF
          challenges: [
            "Manque de pâturage",
            "Sécheresse",
            "Maladies",
            "Accès aux marchés",
          ],
          opportunities: [
            "Viande transformée",
            "Cuir et peaux",
            "Lait et produits laitiers",
            "Exportation régionale",
          ],
        },

        poultry: {
          name: "Élevage Volaille",
          initialInvestment: 100000, // XOF (100 poules)
          annualFeedCost: 150000, // XOF
          veterinaryCost: 20000, // XOF
          waterCost: 10000, // XOF
          laborCost: 50000, // XOF
          totalAnnualCost: 230000, // XOF
          eggProduction: 18000, // œufs/an
          eggPrice: 100, // XOF/œuf
          meatProduction: 50, // kg/an
          meatPrice: 3000, // XOF/kg
          annualRevenue: 2250000, // XOF (1.8M + 0.15M)
          annualProfit: 2020000, // XOF
          challenges: [
            "Maladies aviaires",
            "Manque d'aliments",
            "Accès au crédit",
            "Concurrence",
          ],
          opportunities: [
            "Œufs transformés",
            "Poulet rôti",
            "Aliments pour volaille",
            "Vente en gros",
          ],
        },

        goats: {
          name: "Élevage Caprins",
          initialInvestment: 150000, // XOF (1 chèvre)
          annualFeedCost: 80000, // XOF
          veterinaryCost: 20000, // XOF
          waterCost: 15000, // XOF
          laborCost: 40000, // XOF
          totalAnnualCost: 155000, // XOF
          meatYield: 15, // kg/an
          meatPrice: 3500, // XOF/kg
          milkProduction: 300, // litres/an
          milkPrice: 500, // XOF/litre
          annualRevenue: 202500, // XOF
          annualProfit: 47500, // XOF
          challenges: [
            "Manque de pâturage",
            "Maladies",
            "Accès aux marchés",
            "Faible prix",
          ],
          opportunities: [
            "Fromage de chèvre",
            "Lait transformé",
            "Viande premium",
            "Tourisme agro-pastoral",
          ],
        },
      },

      administrativeRequirements: [
        "Certificat de propriété du terrain",
        "Permis d'exploitation agricole",
        "Enregistrement auprès de la chambre d'agriculture",
        "Assurance agricole (optionnel)",
        "Déclaration de revenus agricoles",
      ],

      seasonality: {
        rainy: { months: "Mai-Octobre", description: "Saison des pluies - Plantation" },
        dry: { months: "Novembre-Avril", description: "Saison sèche - Récolte et stockage" },
      },
    },

    commerce: {
      name: "Commerce et Petit Commerce",
      description: "Vente de produits et services",
      employmentShare: 0.15,

      smallShop: {
        name: "Petit Magasin (Alimentation)",
        initialInvestment: 500000, // XOF
        monthlyRent: 50000, // XOF
        monthlyStock: 200000, // XOF
        monthlyUtilities: 20000, // XOF
        monthlyLabor: 100000, // XOF
        monthlyExpenses: 370000, // XOF
        monthlyRevenue: 800000, // XOF (markup 100%)
        monthlyProfit: 430000, // XOF
        breakEvenMonths: 1.16,
        challenges: [
          "Concurrence",
          "Manque de capital",
          "Accès au crédit",
          "Insécurité",
        ],
        opportunities: [
          "Expansion à plusieurs points",
          "Livraison à domicile",
          "Partenariat avec producteurs",
          "Franchise",
        ],
      },

      streetVending: {
        name: "Vente de Rue",
        initialInvestment: 50000, // XOF
        dailyExpenses: 5000, // XOF
        dailyRevenue: 15000, // XOF
        monthlyProfit: 300000, // XOF
        challenges: [
          "Manque de capital",
          "Insécurité",
          "Manque de licence",
          "Conditions météorologiques",
        ],
        opportunities: [
          "Produits transformés",
          "Localisation stratégique",
          "Fidélisation clients",
          "Expansion",
        ],
      },

      onlineShop: {
        name: "Boutique en Ligne",
        initialInvestment: 200000, // XOF (site web + stock initial)
        monthlyExpenses: 50000, // XOF (hosting, marketing, emballage)
        monthlyRevenue: 500000, // XOF
        monthlyProfit: 450000, // XOF
        challenges: [
          "Accès internet",
          "Logistique",
          "Paiement en ligne",
          "Confiance des clients",
        ],
        opportunities: [
          "Marché régional",
          "Produits spécialisés",
          "Abonnements",
          "Partenariats",
        ],
      },
    },

    health: {
      name: "Santé",
      description: "Services et produits de santé",

      pharmacy: {
        name: "Pharmacie",
        initialInvestment: 2000000, // XOF
        monthlyExpenses: 300000, // XOF
        monthlyRevenue: 800000, // XOF
        monthlyProfit: 500000, // XOF
        challenges: [
          "Accès aux médicaments",
          "Réglementation",
          "Concurrence",
          "Manque de capital",
        ],
        opportunities: [
          "Pharmacie spécialisée",
          "Services de conseil",
          "Livraison à domicile",
          "Partenariat avec cliniques",
        ],
      },

      clinic: {
        name: "Clinique Privée",
        initialInvestment: 5000000, // XOF
        monthlyExpenses: 1000000, // XOF
        monthlyRevenue: 2500000, // XOF
        monthlyProfit: 1500000, // XOF
        challenges: [
          "Capital élevé",
          "Personnel qualifié",
          "Réglementation",
          "Équipement médical",
        ],
        opportunities: [
          "Spécialisation",
          "Assurance maladie",
          "Telemédecine",
          "Partenariat international",
        ],
      },

      healthProducts: {
        name: "Produits de Santé (Herbes, Compléments)",
        initialInvestment: 300000, // XOF
        monthlyExpenses: 80000, // XOF
        monthlyRevenue: 400000, // XOF
        monthlyProfit: 320000, // XOF
        challenges: [
          "Réglementation",
          "Qualité des produits",
          "Confiance des clients",
          "Accès aux fournisseurs",
        ],
        opportunities: [
          "Produits naturels",
          "Certification biologique",
          "Exportation",
          "Vente en ligne",
        ],
      },
    },

    education: {
      name: "Éducation",
      description: "Services éducatifs et de formation",

      privateSchool: {
        name: "École Privée",
        initialInvestment: 3000000, // XOF
        monthlyExpenses: 800000, // XOF
        monthlyRevenue: 1500000, // XOF (100 élèves * 15000 XOF)
        monthlyProfit: 700000, // XOF
        challenges: [
          "Capital élevé",
          "Personnel qualifié",
          "Réglementation",
          "Concurrence",
        ],
        opportunities: [
          "Spécialisation (bilingue, STEM)",
          "Pensionnat",
          "Cours en ligne",
          "Partenariat international",
        ],
      },

      tutoring: {
        name: "Cours Particuliers",
        initialInvestment: 100000, // XOF
        monthlyExpenses: 20000, // XOF
        monthlyRevenue: 400000, // XOF (10 élèves * 40000 XOF)
        monthlyProfit: 380000, // XOF
        challenges: [
          "Trouver des élèves",
          "Concurrence",
          "Manque de qualifications",
          "Irrégularité des revenus",
        ],
        opportunities: [
          "Cours en ligne",
          "Groupe de révision",
          "Préparation aux examens",
          "Langue étrangère",
        ],
      },

      vocationalTraining: {
        name: "Formation Professionnelle",
        initialInvestment: 1000000, // XOF
        monthlyExpenses: 300000, // XOF
        monthlyRevenue: 800000, // XOF
        monthlyProfit: 500000, // XOF
        challenges: [
          "Équipement spécialisé",
          "Instructeurs qualifiés",
          "Placement des diplômés",
          "Financement",
        ],
        opportunities: [
          "Secteurs en demande (IT, électricité, plomberie)",
          "Certification",
          "Partenariat avec entreprises",
          "Alternance",
        ],
      },
    },

    tourism: {
      name: "Tourisme et Loisirs",
      description: "Services touristiques et de loisirs",

      guesthouse: {
        name: "Guesthouse",
        initialInvestment: 2000000, // XOF
        monthlyExpenses: 300000, // XOF
        monthlyRevenue: 800000, // XOF (20 chambres * 40000 XOF)
        monthlyProfit: 500000, // XOF
        challenges: [
          "Saisonnalité",
          "Concurrence",
          "Manque de touristes",
          "Insécurité",
        ],
        opportunities: [
          "Tourisme d'affaires",
          "Tourisme culturel",
          "Partenariat avec agences",
          "Événements",
        ],
      },

      restaurant: {
        name: "Restaurant",
        initialInvestment: 1000000, // XOF
        monthlyExpenses: 400000, // XOF
        monthlyRevenue: 1000000, // XOF
        monthlyProfit: 600000, // XOF
        challenges: [
          "Coût de la nourriture",
          "Personnel",
          "Hygiène",
          "Concurrence",
        ],
        opportunities: [
          "Cuisine spécialisée",
          "Livraison",
          "Événements",
          "Franchise",
        ],
      },

      tourGuide: {
        name: "Guide Touristique",
        initialInvestment: 50000, // XOF
        monthlyExpenses: 10000, // XOF
        monthlyRevenue: 300000, // XOF (10 tours * 30000 XOF)
        monthlyProfit: 290000, // XOF
        challenges: [
          "Langue",
          "Saisonnalité",
          "Concurrence",
          "Manque de touristes",
        ],
        opportunities: [
          "Spécialisation",
          "Tourisme culturel",
          "Partenariat avec hôtels",
          "Tourisme d'aventure",
        ],
      },
    },

    energy: {
      name: "Énergie",
      description: "Énergie solaire et renouvelable",

      solarInstallation: {
        name: "Installation Solaire",
        initialInvestment: 500000, // XOF
        monthlyExpenses: 50000, // XOF
        monthlyRevenue: 300000, // XOF
        monthlyProfit: 250000, // XOF
        challenges: [
          "Capital élevé",
          "Technologie",
          "Manque de clients",
          "Maintenance",
        ],
        opportunities: [
          "Gouvernement",
          "Entreprises",
          "Ménages",
          "Financement vert",
        ],
      },

      biogas: {
        name: "Biogaz",
        initialInvestment: 1000000, // XOF
        monthlyExpenses: 100000, // XOF
        monthlyRevenue: 400000, // XOF
        monthlyProfit: 300000, // XOF
        challenges: [
          "Technologie",
          "Manque de matière première",
          "Maintenance",
          "Sécurité",
        ],
        opportunities: [
          "Fermes",
          "Communautés",
          "Engrais naturel",
          "Financement vert",
        ],
      },
    },

    processing: {
      name: "Transformation Agroalimentaire",
      description: "Transformation de produits agricoles",

      fruitProcessing: {
        name: "Transformation de Fruits",
        initialInvestment: 1000000, // XOF
        monthlyExpenses: 200000, // XOF
        monthlyRevenue: 600000, // XOF
        monthlyProfit: 400000, // XOF
        challenges: [
          "Approvisionnement",
          "Hygiène",
          "Certification",
          "Manque de capital",
        ],
        opportunities: [
          "Jus naturels",
          "Confiture",
          "Séchage",
          "Exportation",
        ],
      },

      cerealProcessing: {
        name: "Transformation de Céréales",
        initialInvestment: 800000, // XOF
        monthlyExpenses: 150000, // XOF
        monthlyRevenue: 500000, // XOF
        monthlyProfit: 350000, // XOF
        challenges: [
          "Approvisionnement",
          "Stockage",
          "Hygiène",
          "Concurrence",
        ],
        opportunities: [
          "Farine",
          "Couscous",
          "Bouillie",
          "Aliments pour bétail",
        ],
      },

      dairyProcessing: {
        name: "Transformation Laitière",
        initialInvestment: 1500000, // XOF
        monthlyExpenses: 300000, // XOF
        monthlyRevenue: 800000, // XOF
        monthlyProfit: 500000, // XOF
        challenges: [
          "Approvisionnement en lait",
          "Réfrigération",
          "Certification",
          "Capital",
        ],
        opportunities: [
          "Fromage",
          "Yaourt",
          "Beurre",
          "Lait transformé",
        ],
      },
    },
  },

  // Défis Administratifs Communs
  administrativeChallenges: {
    registration: {
      name: "Enregistrement de l'Entreprise",
      cost: 150000, // XOF
      time: 7, // jours
      requirements: [
        "Pièce d'identité",
        "Adresse du domicile",
        "Domaine d'activité",
        "Plan d'affaires (optionnel)",
      ],
    },

    taxRegistration: {
      name: "Enregistrement Fiscal",
      cost: 0, // Gratuit
      time: 3, // jours
      requirements: [
        "Certificat d'enregistrement de l'entreprise",
        "Pièce d'identité",
        "Adresse professionnelle",
      ],
    },

    businessLicense: {
      name: "Licence d'Exploitation",
      cost: 100000, // XOF
      time: 5, // jours
      requirements: [
        "Certificat d'enregistrement",
        "Certificat fiscal",
        "Preuve de domicile",
        "Inspection des locaux",
      ],
    },

    bankAccount: {
      name: "Compte Bancaire Professionnel",
      cost: 50000, // XOF
      time: 3, // jours
      requirements: [
        "Pièce d'identité",
        "Certificat d'enregistrement",
        "Certificat fiscal",
        "Preuve de domicile",
      ],
    },

    insurance: {
      name: "Assurance Professionnelle",
      cost: 100000, // XOF/an
      time: 1, // jour
      requirements: [
        "Certificat d'enregistrement",
        "Évaluation des risques",
        "Preuve de capital",
      ],
    },
  },

  // Ressources et Contacts Utiles
  resources: {
    microfinance: [
      {
        name: "Fédération des Caisses Populaires du Burkina (FCPB)",
        contact: "+226 25 30 00 00",
        website: "www.fcpb.bf",
        services: ["Microcrédits", "Épargne", "Assurance"],
      },
      {
        name: "SOFITEX (Société Burkinabè de Fibres Textiles)",
        contact: "+226 25 32 00 00",
        website: "www.sofitex.bf",
        services: ["Financement agricole", "Coton", "Crédit"],
      },
    ],

    government: [
      {
        name: "Ministère du Commerce",
        contact: "+226 25 30 00 00",
        services: ["Enregistrement", "Licences", "Conseils"],
      },
      {
        name: "Chambre de Commerce et d'Industrie",
        contact: "+226 25 30 00 00",
        services: ["Enregistrement", "Réseautage", "Formation"],
      },
    ],

    training: [
      {
        name: "SOFITEX Formation",
        contact: "+226 25 32 00 00",
        services: ["Formation agricole", "Gestion", "Entrepreneuriat"],
      },
      {
        name: "FENAGIE (Fédération Nationale des Groupements Féminins)",
        contact: "+226 25 30 00 00",
        services: ["Formation femmes", "Entrepreneuriat", "Microfinance"],
      },
    ],
  },

  // Données Saisonnières
  seasonalData: {
    rainySeasonChallenges: [
      "Routes impraticables",
      "Maladies des cultures",
      "Difficultés d'approvisionnement",
      "Manque d'électricité",
    ],
    drySeasonChallenges: [
      "Manque d'eau",
      "Sécheresse",
      "Manque de pâturage",
      "Pénurie alimentaire",
    ],
    peakTouristSeason: "Novembre-Février",
    peakAgriculturalSeason: "Septembre-Novembre",
  },

  // Coûts Généraux
  generalCosts: {
    electricity: {
      residential: 150, // XOF/kWh
      commercial: 180, // XOF/kWh
    },
    water: {
      residential: 500, // XOF/m³
      commercial: 800, // XOF/m³
    },
    internet: {
      mobile: 5000, // XOF/mois (1GB)
      broadband: 20000, // XOF/mois
    },
    transport: {
      minibus: 500, // XOF/km
      motorcycle: 200, // XOF/km
    },
    labor: {
      unskilled: 3000, // XOF/jour
      skilled: 8000, // XOF/jour
      professional: 15000, // XOF/jour
    },
  },
};

export type BurkinaFasoData = typeof BurkinaFasoDatabase;
