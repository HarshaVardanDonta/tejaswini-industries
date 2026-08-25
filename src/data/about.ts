import { images } from '../constants/images'

export const aboutPage = {
  hero: {
    title: 'Engineering Authority Since 2011',
    description:
      'Tejaswini Industries stands at the forefront of industrial precision, delivering robust solutions for power utilities, infrastructure, and heavy manufacturing sectors globally.',
    image: images.about.hero,
    imageAlt:
      'Advanced industrial manufacturing facility with precision-engineered transformers',
  },
  overview: {
    title: 'Defining Precision',
    paragraphs: [
      'Established with a commitment to uncompromising quality, Tejaswini Industries has evolved into a premier engineering powerhouse. Our foundation is built on rigorous standards and a relentless pursuit of customer satisfaction in complex industrial environments.',
      'Operating under strict ISO 9001:2015 protocols, every component engineered in our facilities undergoes exhaustive validation. We view quality not as a metric, but as an inherent property of our manufacturing DNA.',
    ],
    isoImage: images.about.isoCertificate,
    isoImageAlt: 'ISO 9001:2015 certification document on an industrial workbench',
    highlights: [
      { icon: 'precision_manufacturing', label: 'Unmatched Quality' },
      { icon: 'handshake', label: 'Trusted Partnerships' },
    ],
  },
  visionMission: [
    {
      icon: 'visibility',
      title: 'Our Vision',
      description:
        'To be the global benchmark in precision engineering, driving industrial progress through innovative manufacturing methodologies and unwavering reliability.',
      variant: 'vision' as const,
    },
    {
      icon: 'my_location',
      title: 'Our Mission',
      description:
        "To engineer and deliver superior industrial solutions that empower our clients' operations, maintaining the highest standards of safety, quality, and technical excellence.",
      variant: 'mission' as const,
    },
  ],
  infrastructure: {
    title: 'Infrastructure',
    subtitle:
      'State-of-the-art manufacturing facilities located in the industrial hub of Hyderabad.',
    facilityImage: images.about.facility,
    facilityImageAlt:
      'Modern industrial facility interior with CNC machines in Hyderabad',
    features: [
      {
        icon: 'factory',
        title: 'Advanced Machinery',
        description:
          'Equipped with highly calibrated CNC machines and automated assembly lines ensuring micro-millimeter precision.',
        variant: 'primary' as const,
      },
      {
        icon: 'science',
        title: 'Testing Labs',
        description:
          'In-house NDT (Non-Destructive Testing) and material analysis laboratories guaranteeing structural integrity before deployment.',
        variant: 'default' as const,
      },
      {
        icon: 'inventory_2',
        title: 'High-Capacity Storage',
        description:
          'Climate-controlled warehousing ensuring raw materials and finished goods remain uncontaminated.',
        variant: 'default' as const,
      },
    ],
  },
  sectors: {
    title: 'Sectors We Empower',
    items: [
      { icon: 'electric_bolt', label: 'Power Utilities' },
      { icon: 'domain', label: 'Industrial Plants' },
      { icon: 'solar_power', label: 'Solar Farms' },
      { icon: 'architecture', label: 'Infrastructure' },
    ],
  },
  cta: {
    title: 'Partner with Engineering Excellence',
    description:
      'Discuss your technical specifications with our engineering team today.',
    buttonLabel: 'Contact Us',
  },
}
