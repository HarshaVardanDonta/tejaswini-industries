import { images } from '../constants/images'

export const corporateProfilePage = {
  hero: {
    image: images.corporateProfile.hero,
    imageAlt: 'Industrial substation and power infrastructure',
    badge: 'ISO 9001:2015 Certified Excellence',
    title: 'Precision Engineering for',
    titleHighlight: 'Global Power Infrastructure',
    description:
      'Delivering robust, IS/IEC compliant distribution transformers and turnkey high-voltage solutions designed for unyielding performance in critical industrial environments.',
    stats: [
      { value: '25+', label: 'Years Expertise' },
      { value: '10k+', label: 'Deployments' },
      { value: '100%', label: 'IS/IEC Compliant' },
      { value: '24/7', label: 'Support Grid', accent: true },
    ],
  },
  profile: {
    image: images.corporateProfile.engineering,
    imageAlt: 'Engineering blueprints and precision tools',
    eyebrow: 'Corporate Profile',
    title: 'Forging Reliability in Power Distribution',
    paragraphs: [
      'Tejaswini Industries stands as a cornerstone in the manufacturing and deployment of high-grade electrical infrastructure. With a relentless focus on precision engineering, we design systems that form the backbone of industrial complexes, utility grids, and commercial hubs globally.',
      'Our state-of-the-art manufacturing facility is calibrated to deliver zero-defect products, ensuring every transformer and turnkey solution exceeds stringent international standards for efficiency and durability.',
    ],
    highlights: [
      {
        icon: 'factory',
        title: 'Advanced Manufacturing',
        description:
          'Equipped with automated winding and vacuum drying technologies.',
      },
      {
        icon: 'engineering',
        title: 'Custom Engineering',
        description:
          'Tailored technical specifications to meet specific load demands.',
      },
    ],
    established: 'Established 1998',
  },
} as const
