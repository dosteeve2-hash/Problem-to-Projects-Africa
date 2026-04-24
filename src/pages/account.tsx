import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Button,
  Card,
  Input,
  Textarea,
  Tabs,
  Alert,
  Divider,
} from "@/components/ui/design-system";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@exemple.com",
    phone: "+226 XX XX XX XX",
    bio: "Entrepreneur passionné par l'innovation et l'impact social",
    location: "Ouagadougou, Burkina Faso",
    company: "Mes Projets",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    projectUpdates: true,
    weeklyDigest: true,
    marketingEmails: false,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (key: string) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key as keyof typeof notificationSettings],
    }));
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Problem to Project Africa"
              width={40}
              height={40}
              className="w-10 h-10"
            />
            <h1 className="text-lg font-bold text-primary-800 hidden sm:block">
              Problem to Project Africa
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-neutral-600 hover:text-foreground px-3 py-2 rounded-lg transition"
            >
              Dashboard
            </Link>
            <Link
              href="/account"
              className="text-primary-800 font-semibold hover:bg-primary-50 px-3 py-2 rounded-lg transition"
            >
              Compte
            </Link>
            <Button variant="secondary" size="sm">
              Déconnexion
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground">Mon Compte</h2>
          <p className="text-neutral-600 mt-1">
            Gérez vos informations personnelles et vos préférences
          </p>
        </div>

        {/* Tabs */}
        <Tabs
          tabs={[
            {
              id: "profile",
              label: "Profil",
              content: <ProfileTab profileData={profileData} onChange={handleProfileChange} />,
            },
            {
              id: "password",
              label: "Mot de passe",
              content: (
                <PasswordTab passwordData={passwordData} onChange={handlePasswordChange} />
              ),
            },
            {
              id: "notifications",
              label: "Notifications",
              content: (
                <NotificationsTab
                  settings={notificationSettings}
                  onChange={handleNotificationChange}
                />
              ),
            },
            {
              id: "billing",
              label: "Facturation",
              content: <BillingTab />,
            },
            {
              id: "danger",
              label: "Danger",
              content: <DangerTab />,
            },
          ]}
        />
      </main>
    </div>
  );
}

function ProfileTab({
  profileData,
  onChange,
}: {
  profileData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="space-y-6">
      {/* Avatar */}
      <Card>
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-800 to-accent-500 flex items-center justify-center text-white text-2xl font-bold">
            JD
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-2">Photo de profil</h3>
            <p className="text-sm text-neutral-600 mb-4">
              Téléchargez une photo pour personnaliser votre profil
            </p>
            <Button variant="secondary" size="sm">
              Changer la photo
            </Button>
          </div>
        </div>
      </Card>

      {/* Informations Personnelles */}
      <Card>
        <h3 className="text-lg font-bold text-foreground mb-6">Informations Personnelles</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="Prénom"
            name="firstName"
            value={profileData.firstName}
            onChange={onChange}
          />
          <Input
            label="Nom"
            name="lastName"
            value={profileData.lastName}
            onChange={onChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="Email"
            type="email"
            name="email"
            value={profileData.email}
            onChange={onChange}
          />
          <Input
            label="Téléphone"
            name="phone"
            value={profileData.phone}
            onChange={onChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Input
            label="Localisation"
            name="location"
            value={profileData.location}
            onChange={onChange}
          />
          <Input
            label="Entreprise/Projet"
            name="company"
            value={profileData.company}
            onChange={onChange}
          />
        </div>

        <Textarea
          label="Biographie"
          name="bio"
          value={profileData.bio}
          onChange={onChange}
          placeholder="Parlez-nous de vous..."
          rows={4}
        />

        <div className="mt-6 flex gap-3">
          <Button variant="primary">Enregistrer les Modifications</Button>
          <Button variant="secondary">Annuler</Button>
        </div>
      </Card>
    </div>
  );
}

function PasswordTab({
  passwordData,
  onChange,
}: {
  passwordData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <Card>
      <h3 className="text-lg font-bold text-foreground mb-6">Changer le Mot de Passe</h3>

      <Alert variant="info" title="Sécurité">
        Utilisez un mot de passe fort et unique pour protéger votre compte.
      </Alert>

      <div className="space-y-4 mt-6">
        <Input
          label="Mot de passe actuel"
          type="password"
          name="currentPassword"
          value={passwordData.currentPassword}
          onChange={onChange}
          placeholder="••••••••"
        />

        <Input
          label="Nouveau mot de passe"
          type="password"
          name="newPassword"
          value={passwordData.newPassword}
          onChange={onChange}
          placeholder="••••••••"
          helperText="Minimum 8 caractères, avec majuscules, minuscules et chiffres"
        />

        <Input
          label="Confirmer le mot de passe"
          type="password"
          name="confirmPassword"
          value={passwordData.confirmPassword}
          onChange={onChange}
          placeholder="••••••••"
        />

        <div className="flex gap-3 pt-4">
          <Button variant="primary">Mettre à Jour le Mot de Passe</Button>
          <Button variant="secondary">Annuler</Button>
        </div>
      </div>
    </Card>
  );
}

function NotificationsTab({
  settings,
  onChange,
}: {
  settings: any;
  onChange: (key: string) => void;
}) {
  return (
    <Card>
      <h3 className="text-lg font-bold text-foreground mb-6">Préférences de Notifications</h3>

      <div className="space-y-4">
        {[
          {
            key: "emailNotifications",
            label: "Notifications par Email",
            description: "Recevez des notifications importantes par email",
          },
          {
            key: "projectUpdates",
            label: "Mises à Jour de Projets",
            description: "Soyez informé des mises à jour de vos projets",
          },
          {
            key: "weeklyDigest",
            label: "Résumé Hebdomadaire",
            description: "Recevez un résumé hebdomadaire de votre activité",
          },
          {
            key: "marketingEmails",
            label: "Emails Marketing",
            description: "Recevez les dernières nouvelles et offres spéciales",
          },
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg">
            <div>
              <h4 className="font-semibold text-foreground">{item.label}</h4>
              <p className="text-sm text-neutral-600">{item.description}</p>
            </div>
            <input
              type="checkbox"
              checked={settings[item.key]}
              onChange={() => onChange(item.key)}
              className="w-5 h-5 rounded border-neutral-300 text-primary-800 cursor-pointer"
            />
          </div>
        ))}
      </div>

      <div className="flex gap-3 pt-6">
        <Button variant="primary">Enregistrer les Préférences</Button>
        <Button variant="secondary">Annuler</Button>
      </div>
    </Card>
  );
}

function BillingTab() {
  return (
    <Card>
      <h3 className="text-lg font-bold text-foreground mb-6">Facturation</h3>

      <Alert variant="success" title="Plan Gratuit">
        Vous utilisez actuellement le plan gratuit. Toutes les fonctionnalités de base sont
        incluses.
      </Alert>

      <div className="mt-6 space-y-4">
        <div className="p-4 border border-neutral-200 rounded-lg">
          <h4 className="font-semibold text-foreground mb-2">Plan Actuel</h4>
          <p className="text-sm text-neutral-600 mb-4">Plan Gratuit - Accès illimité</p>
          <Button variant="secondary">Voir les Plans Premium</Button>
        </div>

        <Divider />

        <div>
          <h4 className="font-semibold text-foreground mb-4">Historique de Facturation</h4>
          <p className="text-sm text-neutral-600">
            Aucune transaction. Vous utilisez le plan gratuit.
          </p>
        </div>
      </div>
    </Card>
  );
}

function DangerTab() {
  return (
    <Card variant="error">
      <h3 className="text-lg font-bold text-error-800 mb-6">Zone Dangereuse</h3>

      <Alert variant="error" title="Attention">
        Les actions dans cette section sont irréversibles. Procédez avec prudence.
      </Alert>

      <div className="space-y-4 mt-6">
        <div className="p-4 border border-error-200 rounded-lg">
          <h4 className="font-semibold text-error-800 mb-2">Supprimer le Compte</h4>
          <p className="text-sm text-error-700 mb-4">
            Supprimer définitivement votre compte et toutes vos données.
          </p>
          <Button variant="danger">Supprimer le Compte</Button>
        </div>

        <div className="p-4 border border-error-200 rounded-lg">
          <h4 className="font-semibold text-error-800 mb-2">Exporter les Données</h4>
          <p className="text-sm text-error-700 mb-4">
            Téléchargez une copie de toutes vos données.
          </p>
          <Button variant="secondary">Exporter les Données</Button>
        </div>
      </div>
    </Card>
  );
}
