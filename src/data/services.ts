import { images } from '../constants/images'

export type ServiceOffering = {
  id: string
  title: string
  description: string
  icon: string
  iconBg: 'blue-light' | 'red-light'
  accent?: 'secondary'
  features: string[]
}

export type ProcessStep = {
  step: string
  title: string
  description: string
  icon: string
  highlight?: boolean
}

export const servicesPage = {
  hero: {
    image: images.services.hero,
    imageAlt: 'Industrial machinery and power station interior',
    eyebrow: 'Core Expertise',
    title: 'Industrial Engineering Services & Turnkey Solutions',
    description:
      'Delivering precision-engineered solutions for high-voltage infrastructure, complex installations, and critical maintenance operations. ISO 9001:2015 certified excellence.',
  },
  coreServices: [
    {
      id: 'turnkey-electrical',
      title: 'Turnkey Electrical Projects',
      description:
        'End-to-end execution of complex electrical infrastructure, from conceptual design to final commissioning. We handle HT/LT installations, control panels, and complete grid integration.',
      icon: 'electric_bolt',
      iconBg: 'blue-light' as const,
      features: ['Substation Design & Erection', 'Industrial Plant Wiring'],
    },
    {
      id: 'liaisoning',
      title: 'TGSPDCL / TSSPDCL Liaisoning',
      description:
        'Expert navigation of regulatory requirements and statutory approvals. We streamline the process for new connections, load enhancements, and compliance certifications.',
      icon: 'assignment_turned_in',
      iconBg: 'red-light' as const,
      accent: 'secondary' as const,
      features: ['CEIG Approvals', 'Statutory Clearances'],
    },
    {
      id: 'maintenance',
      title: 'Maintenance & Retrofitting',
      description:
        'Preventative maintenance and system upgrades to ensure minimal downtime and maximum operational efficiency for existing industrial infrastructure.',
      icon: 'build_circle',
      iconBg: 'blue-light' as const,
      features: ['AMC Services', 'Panel Retrofitting'],
    },
  ] satisfies ServiceOffering[],
  processSteps: [
    {
      step: '01',
      title: 'Consultation',
      description: 'Site assessment & requirement analysis.',
      icon: 'forum',
    },
    {
      step: '02',
      title: 'Design',
      description: 'Engineering schematics & approval planning.',
      icon: 'design_services',
    },
    {
      step: '03',
      title: 'Installation',
      description: 'Precision execution by certified engineers.',
      icon: 'precision_manufacturing',
      highlight: true,
    },
    {
      step: '04',
      title: 'Testing',
      description: 'Rigorous safety & performance validation.',
      icon: 'fact_check',
    },
    {
      step: '05',
      title: 'Handover',
      description: 'Final documentation & operational training.',
      icon: 'task_alt',
    },
  ] satisfies ProcessStep[],
  capabilities: {
    featured: {
      image: images.services.ehvSubstation,
      imageAlt: 'EHV Substation equipment',
      title: 'EHV Substations (Up to 132kV)',
      description:
        'Complete civil, structural, and electrical engineering for Extra High Voltage substations, including testing and commissioning.',
    },
    internalElectrification: {
      icon: 'cable',
      title: 'Internal Electrification',
      description:
        'Industrial power distribution, lighting grids, and sophisticated cable management systems.',
    },
    structural: {
      icon: 'architecture',
      title: 'Structural Fabrications',
      description:
        'Custom steel structures for equipment mounting and support.',
    },
    energyAuditing: {
      icon: 'analytics',
      title: 'Energy Auditing',
      description:
        'System analysis and optimization for power quality and efficiency.',
    },
  },
  cta: {
    title: 'Request a Technical Consultation',
    description:
      'Engage our engineering team to discuss your project requirements, scope, and technical specifications.',
  },
} as const
