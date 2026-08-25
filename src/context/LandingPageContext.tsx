import { createContext, useContext } from 'react'

import { images } from '../constants/images'

export type LandingPageData = {
  hero: {
    image: string
    imageAlt: string
    badgePrimary: string
    badgeSecondary: string
    title: string
    description: string
    primaryCta: string
    secondaryCta: string
  }
  companyIntro: {
    title: string
    paragraphs: string[]
    image: string
    imageAlt: string
    stats: { value: string; label: string }[]
  }
  portfolio: {
    eyebrow: string
    title: string
    linkLabel: string
    items: {
      title: string
      description?: string
      image: string
      imageAlt: string
      size: 'large' | 'small'
      overlayPrimary?: boolean
    }[]
  }
  technicalSupremacy: {
    title: string
    features: {
      icon: string
      title: string
      description: string
      accent: 'primary' | 'secondary'
    }[]
  }
  ctaBanner: {
    title: string
    description: string
    buttonLabel: string
  }
}

export const defaultLandingPageData: LandingPageData = {
  hero: {
    image: images.hero,
    imageAlt:
      'Tejaswini branded power transformer secured on a flatbed truck at an industrial delivery yard',
    badgePrimary: 'ISO 9001:2015',
    badgeSecondary: 'BIS Certified',
    title: 'Precision Engineering.\nUncompromising Power.',
    description:
      'Tejaswini Industries delivers industrial-grade transformers, control panels, and critical infrastructure solutions engineered for absolute reliability in high-demand environments.',
    primaryCta: 'Contact Us',
    secondaryCta: 'Call Now',
  },
  companyIntro: {
    title: 'Engineering Authority',
    paragraphs: [
      'Established with a commitment to unyielding quality, Tejaswini Industries stands at the forefront of electrical manufacturing. We specialize in the design, fabrication, and commissioning of heavy-duty transformers and power distribution networks.',
      'Our facilities operate under stringent ISO 9001:2015 standards, ensuring every unit deployed is a testament to our technical rigor and operational excellence. We build the backbone of industrial power.',
    ],
    image: images.facility,
    imageAlt: 'Technicians assembling an electrical control panel in a manufacturing facility',
    stats: [
      { value: '25+', label: 'Years Experience' },
      { value: '10k+', label: 'Units Deployed' },
    ],
  },
  portfolio: {
    eyebrow: 'Core Solutions',
    title: 'Industrial Portfolio',
    linkLabel: 'View All Products',
    items: [
      {
        title: 'Power Transformers',
        description:
          'High-capacity distribution and power transformers engineered for minimal loss and maximum durability in extreme conditions.',
        image: images.transformers,
        imageAlt: 'Power transformers',
        size: 'large',
      },
      {
        title: 'Control Panels',
        image: images.controlPanels,
        imageAlt: 'Control panels',
        size: 'small',
      },
      {
        title: 'Ring Main Units',
        image: images.rmu,
        imageAlt: 'Ring main units',
        size: 'small',
        overlayPrimary: true,
      },
    ],
  },
  technicalSupremacy: {
    title: 'Technical Supremacy',
    features: [
      {
        icon: 'architecture',
        title: 'Precision Design',
        description:
          'Engineered utilizing advanced CAD systems, ensuring structural integrity and optimal thermal dynamics for every unit fabricated.',
        accent: 'primary',
      },
      {
        icon: 'verified_user',
        title: 'Rigorous Testing',
        description:
          'Every product undergoes a multi-stage quality assurance protocol, simulating extreme operational loads prior to deployment.',
        accent: 'secondary',
      },
      {
        icon: 'support_agent',
        title: 'Lifeline Support',
        description:
          'Dedicated field service teams provide rapid-response maintenance and lifecycle support, minimizing critical downtime.',
        accent: 'primary',
      },
    ],
  },
  ctaBanner: {
    title: 'Require Custom Engineering?',
    description: 'Consult with our technical sales team for specialized industrial solutions.',
    buttonLabel: 'Contact Engineering',
  },
}

const LandingPageContext = createContext<LandingPageData>(defaultLandingPageData)

export function LandingPageProvider({
  value,
  children,
}: {
  value: LandingPageData
  children: React.ReactNode
}) {
  return <LandingPageContext.Provider value={value}>{children}</LandingPageContext.Provider>
}

export function useLandingPageData() {
  return useContext(LandingPageContext)
}
