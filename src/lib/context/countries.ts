import type { CountryMetadata } from "@/types"

export const SUPPORTED_COUNTRIES: CountryMetadata[] = [
  {
    code: "BF",
    name: "Burkina Faso",
    flag: "🇧🇫",
    city_examples: ["Ouagadougou", "Bobo-Dioulasso", "Koudougou", "Ouahigouya"],
    language: "fr",
  },
  {
    code: "SN",
    name: "Sénégal",
    flag: "🇸🇳",
    city_examples: ["Dakar", "Thiès", "Saint-Louis", "Ziguinchor"],
    language: "fr",
  },
  {
    code: "CI",
    name: "Côte d'Ivoire",
    flag: "🇨🇮",
    city_examples: ["Abidjan", "Bouaké", "Yamoussoukro", "San-Pédro"],
    language: "fr",
  },
  {
    code: "ML",
    name: "Mali",
    flag: "🇲🇱",
    city_examples: ["Bamako", "Sikasso", "Ségou", "Mopti"],
    language: "fr",
  },
  {
    code: "NE",
    name: "Niger",
    flag: "🇳🇪",
    city_examples: ["Niamey", "Zinder", "Maradi", "Agadez"],
    language: "fr",
  },
  {
    code: "GH",
    name: "Ghana",
    flag: "🇬🇭",
    city_examples: ["Accra", "Kumasi", "Tamale", "Takoradi"],
    language: "en",
  },
  {
    code: "CM",
    name: "Cameroun",
    flag: "🇨🇲",
    city_examples: ["Douala", "Yaoundé", "Bafoussam", "Garoua"],
    language: "fr",
  },
  {
    code: "NG",
    name: "Nigeria",
    flag: "🇳🇬",
    city_examples: ["Lagos", "Abuja", "Kano", "Ibadan"],
    language: "en",
  },
  {
    code: "KE",
    name: "Kenya",
    flag: "🇰🇪",
    city_examples: ["Nairobi", "Mombasa", "Kisumu", "Nakuru"],
    language: "en",
  },
]

export function getCountryByCode(code: string): CountryMetadata | undefined {
  return SUPPORTED_COUNTRIES.find((c) => c.code === code)
}
