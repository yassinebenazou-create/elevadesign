import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react'
import { translations, type LanguageCode, type ProjectText } from './translations'
import type { Project } from '../types/project'

type I18nContextValue = {
  language: LanguageCode
  setLanguage: (language: LanguageCode) => void
  t: (typeof translations)[LanguageCode]
  projectText: (project: Project) => ProjectText
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined)

const storageKey = 'eleva-language'
const supportedLanguages: LanguageCode[] = ['en', 'es', 'fr', 'it']

function isLanguageCode(value: string | null): value is LanguageCode {
  return supportedLanguages.includes(value as LanguageCode)
}

function translateLocation(value: string, language: LanguageCode) {
  const lower = value.toLowerCase()

  if (lower.includes('maroc')) {
    return translations[language].labels.morocco
  }

  if (lower.includes('renseigner')) {
    return translations[language].labels.unknown
  }

  return value
}

function translateYear(value: string, language: LanguageCode) {
  return value.toLowerCase().includes('renseigner') ? translations[language].labels.unknown : value
}

function translateCategory(value: string, language: LanguageCode) {
  const filters = translations[language].projects.filters
  const lower = value.toLowerCase()

  if (lower.includes('habillage')) return filters.wall
  if (lower.includes('commercial')) return language === 'fr' ? 'Design commercial' : filters.commercial
  if (lower.includes('résidentielle') || lower.includes('residentielle') || lower.includes('sidentielle')) return filters.residential
  if (lower.includes('intérieur') || lower.includes('interieur') || lower.includes('intã') || lower.includes('int')) return language === 'fr' ? 'Design intérieur' : filters.interior
  if (lower.includes('extérieur') || lower.includes('exterieur') || lower.includes('extã') || lower.includes('ext')) {
    return language === 'fr'
      ? 'Aménagement extérieur'
      : language === 'es'
        ? 'Exterior'
        : language === 'it'
          ? 'Esterni'
          : 'Outdoor'
  }
  if (lower.includes('architecture')) return language === 'fr' ? 'Architecture' : 'Architecture'

  return value
}

function projectType(project: Project, language: LanguageCode) {
  const lower = project.type.toLowerCase()

  if (language === 'fr') {
    return translateYear(project.type, language)
  }

  if (lower.includes('villa')) return language === 'es' ? 'Villa contemporánea' : language === 'it' ? 'Villa contemporanea' : 'Contemporary villa'
  if (lower.includes('bureau')) return language === 'es' ? 'Oficina profesional' : language === 'it' ? 'Ufficio professionale' : 'Professional office'
  if (lower.includes('restaurant')) return 'Restaurant'
  if (lower.includes('chambre')) return language === 'es' ? 'Dormitorio privado' : language === 'it' ? 'Camera privata' : 'Private bedroom'
  if (lower.includes('salon')) return language === 'es' ? 'Salón residencial' : language === 'it' ? 'Living residenziale' : 'Residential living room'
  if (lower.includes('résidence') || lower.includes('residence') || lower.includes('sidence')) return language === 'es' ? 'Residencia privada' : language === 'it' ? 'Residenza privata' : 'Private residence'
  if (lower.includes('commercial')) return language === 'es' ? 'Espacio comercial' : language === 'it' ? 'Spazio commerciale' : 'Commercial space'
  if (lower.includes('mural')) return language === 'es' ? 'Revestimiento mural' : language === 'it' ? 'Rivestimento murale' : 'Wall cladding'

  return translateYear(project.type, language)
}

const projectDescriptions: Partial<Record<LanguageCode, Record<string, Partial<ProjectText>>>> = {
  en: {
    'residence-ivoire': {
      shortDescription:
        'A contemporary residence remodel combining natural light, warm materials and custom furniture.',
      description:
        'Conceived as a bright and fluid residence, Résidence Ivoire balances sober volumes, warm materials and precisely drawn details. The project favours clear circulation, generous natural light and a contemporary atmosphere that remains soft in everyday life.',
    },
    'villa-horizon': {
      shortDescription:
        'A modern villa opened onto its garden, with large glazed bays, a pool and elegant outdoor living areas.',
      description:
        'Villa Horizon develops a continuous relationship between interiors, terrace and garden. Its clean architectural lines allow light, perspectives and outdoor spaces to shape the experience of the home.',
    },
    'maison-neroli': {
      shortDescription:
        'A refined commercial interior combining natural textures, ambient lighting and contemporary furniture.',
      description:
        'Maison Néroli imagines an enveloping commercial space where first impression matters as much as everyday comfort. Natural textures, measured contrasts and warm lighting create a refined identity.',
    },
  },
  es: {
    'residence-ivoire': {
      shortDescription:
        'Reforma de una residencia contemporánea con líneas depuradas, luz natural, materiales cálidos y mobiliario a medida.',
      description:
        'Pensada como una residencia luminosa y fluida, Résidence Ivoire pone en diálogo volúmenes sobrios, materiales cálidos y detalles dibujados con precisión.',
    },
    'villa-horizon': {
      shortDescription:
        'Concepción de una villa moderna abierta al jardín, con grandes ventanales, piscina y exteriores elegantes.',
      description:
        'Villa Horizon desarrolla una relación continua entre interior, terraza y jardín. Las líneas arquitectónicas limpias dejan que la luz y las perspectivas estructuren la experiencia.',
    },
    'maison-neroli': {
      shortDescription:
        'Creación de un espacio comercial refinado que combina texturas naturales, iluminación ambiental y mobiliario contemporáneo.',
      description:
        'Maison Néroli imagina un espacio comercial envolvente donde la primera impresión cuenta tanto como el confort de uso.',
    },
  },
  it: {
    'residence-ivoire': {
      shortDescription:
        'Riprogettazione di una residenza contemporanea dalle linee pulite, con luce naturale, materiali caldi e arredi su misura.',
      description:
        'Pensata come una residenza luminosa e fluida, Résidence Ivoire mette in dialogo volumi sobri, materiali caldi e dettagli disegnati con precisione.',
    },
    'villa-horizon': {
      shortDescription:
        'Progettazione di una villa moderna aperta sul giardino, con grandi vetrate, piscina e spazi esterni eleganti.',
      description:
        'Villa Horizon sviluppa una relazione continua tra interno, terrazza e giardino. Le linee architettoniche pulite lasciano che luce e prospettive guidino l’esperienza.',
    },
    'maison-neroli': {
      shortDescription:
        'Creazione di uno spazio commerciale raffinato con texture naturali, illuminazione d’ambiente e arredi contemporanei.',
      description:
        'Maison Néroli immagina uno spazio commerciale avvolgente dove la prima impressione conta quanto il comfort d’uso.',
    },
  },
}

export function I18nProvider({ children }: PropsWithChildren) {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    if (typeof window === 'undefined') return 'fr'

    const storedLanguage = window.localStorage.getItem(storageKey)
    return isLanguageCode(storedLanguage) ? storedLanguage : 'fr'
  })

  const setLanguage = (nextLanguage: LanguageCode) => {
    setLanguageState(nextLanguage)
    window.localStorage.setItem(storageKey, nextLanguage)
  }

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const value = useMemo<I18nContextValue>(() => {
    const t = translations[language]

    return {
      language,
      setLanguage,
      t,
      projectText: (project) => {
        const translatedProject = projectDescriptions[language]?.[project.slug]

        return {
          category: translateCategory(project.category, language),
          location: translateLocation(project.location, language),
          year: translateYear(project.year, language),
          type: projectType(project, language),
          shortDescription:
            translatedProject?.shortDescription ??
            (language === 'fr' ? project.shortDescription : t.projectFallback),
          description:
            translatedProject?.description ??
            (language === 'fr' ? project.description : t.projectFallback),
        }
      },
    }
  }, [language])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)

  if (!context) {
    throw new Error('useI18n must be used inside I18nProvider')
  }

  return context
}
