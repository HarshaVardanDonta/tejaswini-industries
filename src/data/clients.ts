const PLACEHOLDER_LOGO =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuClHyFTU9imr2v9RviJ4JiQn2E3Y_17ukXodZoZimiISf81g5MRfpltaihyifdb7sa9A8byPH9eVopdaygd2o0WjuBKkjMqoV4Tp3j2iVpi1DYzGKaSxnlIco007n_08P89DhMBUO96SinYCcp-XHG4HTGJ_iqPVH4yulnTYaYmpLJnMOrgrPYnReZSGqiSsbDkXQe7ZFF68lQIHk6xiM-RUqufLpOUtRSdQvQJO-H7HLzRMonBnkE1HH2Aatlpo6pmK-cdoOdc_1M'

export type ClientMetric = {
  value: string
  label: string
  icon: string
}

export type ClientLogo = {
  name: string
  image: string
}

export type ClientTestimonial = {
  title: string
  tag: string
  quote: string
  author: string
  organization: string
  accent: 'secondary' | 'primary'
}

export const clientsPage = {
  hero: {
    eyebrow: 'OUR INDUSTRIAL PARTNERS & IMPACT',
    title: 'POWERING INDUSTRIAL PROGRESS THROUGH STRATEGIC PARTNERSHIPS.',
    description:
      "Tejaswini Industries delivers uncompromising precision and ISO-certified reliability to the world's most demanding engineering environments. We forge lasting alliances built on technical excellence and structural integrity.",
    credentials: [
      { label: 'CERTIFICATION', value: 'ISO 9001:2015' },
      { label: 'ENGINEERING STANDARD', value: 'MIL-SPEC COMPLIANT' },
    ],
  },
  metrics: [
    { value: '500+', label: 'PROJECTS DELIVERED', icon: 'precision_manufacturing' },
    { value: '15+', label: 'COUNTRIES SERVED', icon: 'public' },
    { value: '99.9%', label: 'COMPLIANCE RATING', icon: 'verified' },
  ] satisfies ClientMetric[],
  logos: {
    title: 'TRUSTED BY INDUSTRY LEADERS',
    subtitle: 'INDUSTRIAL SECTOR PARTNERS',
    items: Array.from({ length: 12 }, (_, index) => ({
      name: `Industrial partner ${index + 1}`,
      image: PLACEHOLDER_LOGO,
    })) satisfies ClientLogo[],
  },
  testimonials: {
    title: 'TECHNICAL TESTIMONIALS',
    subtitle: 'PROJECT VALIDATION',
    items: [
      {
        title: 'Optimizing Power Distribution for Infrastructure Projects',
        tag: '250 kVA Installation',
        quote:
          "Tejaswini's custom transformers met our rigorous thermal and efficiency specifications without compromise. Their adherence to ISO standards during the manufacturing process ensured seamless integration into our state-level grid expansion. A highly reliable engineering partner.",
        author: 'ARVIND K., SENIOR ELECTRICAL ENGINEER',
        organization: 'State Power Corporation',
        accent: 'secondary',
      },
      {
        title: 'High-Voltage Substation Deployment',
        tag: '33kV / 11kV Substation',
        quote:
          'The structural integrity and calibration precision of the units provided by Tejaswini Industries exceeded our baseline metrics. Their technical team demonstrated exceptional competence during the installation and testing phases in challenging environmental conditions.',
        author: 'DR. MEERA R., CHIEF OF OPERATIONS',
        organization: 'National Grid Infrastructure Ltd.',
        accent: 'primary',
      },
    ] satisfies ClientTestimonial[],
  },
}
