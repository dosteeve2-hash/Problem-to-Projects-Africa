import { BURKINA_FASO_CONTEXT } from "./burkina-context"
import { SENEGAL_CONTEXT } from "./senegal-context"
import { COTE_IVOIRE_CONTEXT } from "./cote-ivoire-context"
import { MALI_CONTEXT } from "./mali-context"

const GENERIC_AFRICA_CONTEXT = `
## Contexte Africain Général

### Défis communs
- Accès limité aux services financiers formels
- Infrastructure numérique en développement
- Mobile money comme levier principal d'inclusion financière
- Forte économie informelle et rurale
- Jeunesse nombreuse et connectée

### Opportunités transversales
- Sauter des étapes technologiques (leapfrogging)
- Solutions adaptées au mobile-first
- Impact social fort possible
- Marchés sous-servis avec forte demande latente
`

const COUNTRY_CONTEXTS: Record<string, string> = {
  BF: BURKINA_FASO_CONTEXT,
  SN: SENEGAL_CONTEXT,
  CI: COTE_IVOIRE_CONTEXT,
  ML: MALI_CONTEXT,
  NE: `## Niger\n- Économie agropastorale, enclavement fort\n- Uranium (ressource stratégique)\n- Mobile money en croissance\n- Défis: sécheresse, sécurité alimentaire, éducation`,
  GH: `## Ghana\n- Économie anglophone stable, cedi en difficulté\n- Hub tech d'Afrique de l'Ouest anglophone\n- FinTech avancé (MTN MoMo, AirtelTigo)\n- Cacao, or, pétrole offshore`,
  CM: `## Cameroun\n- Bilinguisme (fr/en), porte vers l'Afrique centrale\n- Agriculture diversifiée, pétrole\n- Orange Money, MTN MoMo bien implantés\n- Yaoundé (administrative) vs Douala (économique)`,
  NG: `## Nigeria\n- 1ère économie africaine, 220M habitants\n- FinTech le plus avancé d'Afrique (Flutterwave, Paystack)\n- Lagos = Silicon Valley africaine\n- Forte diaspora, culture d'entrepreneuriat`,
  KE: `## Kenya\n- M-Pesa: modèle mondial de mobile money\n- Nairobi = hub tech d'Afrique de l'Est\n- Agriculture, tourisme, services\n- Écosystème startup très développé (iHub)`,
}

export function getCountryContext(countryCode: string): string {
  return COUNTRY_CONTEXTS[countryCode] ?? GENERIC_AFRICA_CONTEXT
}
