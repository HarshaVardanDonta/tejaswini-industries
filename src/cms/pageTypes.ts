export type ServicesPageData = {
  hero: {
    image: string
    imageAlt: string
    eyebrow: string
    title: string
    description: string
  }
  coreServices: {
    id: string
    title: string
    description: string
    icon: string
    iconBg: 'blue-light' | 'red-light'
    accent?: 'secondary'
    features: string[]
  }[]
  processSteps: {
    step: string
    title: string
    description: string
    icon: string
    highlight?: boolean
  }[]
  capabilities: {
    featured: { image: string; imageAlt: string; title: string; description: string }
    internalElectrification: { icon: string; title: string; description: string }
    structural: { icon: string; title: string; description: string }
    energyAuditing: { icon: string; title: string; description: string }
  }
  cta: { title: string; description: string }
}

export type AboutPageData = {
  hero: { title: string; description: string; image: string; imageAlt: string }
  overview: {
    title: string
    paragraphs: string[]
    isoImage: string
    isoImageAlt: string
    highlights: { icon: string; label: string }[]
  }
  visionMission: {
    icon: string
    title: string
    description: string
    variant: 'vision' | 'mission'
  }[]
  infrastructure: {
    title: string
    subtitle: string
    facilityImage: string
    facilityImageAlt: string
    features: {
      icon: string
      title: string
      description: string
      variant: 'primary' | 'default'
    }[]
  }
  sectors: { title: string; items: { icon: string; label: string }[] }
  cta: { title: string; description: string; buttonLabel: string }
}

export type ContactPageData = {
  hero: { title: string; description: string }
  infoCards: { icon: string; title: string; lines: string[]; mono: boolean }[]
  whatsapp: { title: string; description: string; buttonLabel: string }
  map: { image: string; imageAlt: string; label: string }
  form: { title: string; submitLabel: string }
  inquiryTypes: { value: string; label: string }[]
}

export type CorporateProfilePageData = {
  hero: {
    image: string
    imageAlt: string
    badge: string
    title: string
    titleHighlight: string
    description: string
    stats: { value: string; label: string; accent?: boolean }[]
  }
  profile: {
    image: string
    imageAlt: string
    eyebrow: string
    title: string
    paragraphs: string[]
    highlights: { icon: string; title: string; description: string }[]
    established: string
  }
}
