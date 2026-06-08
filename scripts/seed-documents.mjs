/** @typedef {import('./seed-images.json')} SeedImages */

export function img(url, alt = '') {
  return { _type: 'imageWithUrl', url, alt }
}

export function slug(value) {
  return { _type: 'slug', current: value }
}

function spec(label, value) {
  return { _type: 'spec', label, value }
}

/**
 * @param {SeedImages} images
 * @returns {Record<string, unknown>[]}
 */
export function buildDocuments(images) {
  return [
    {
      _id: 'adminCredentials',
      _type: 'adminCredentials',
      username: 'admin',
      password: 'changeme',
    },

    {
      _id: 'landingPage',
      _type: 'landingPage',
      hero: {
        image: img(
          images.hero,
          'Tejaswini branded power transformer secured on a flatbed truck at an industrial delivery yard'
        ),
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
        image: img(
          images.facility,
          'Technicians assembling an electrical control panel in a manufacturing facility'
        ),
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
            image: img(images.transformers, 'Power transformers'),
            size: 'large',
          },
          {
            title: 'Control Panels',
            image: img(images.controlPanels, 'Control panels'),
            size: 'small',
          },
          {
            title: 'Ring Main Units',
            image: img(images.rmu, 'Ring main units'),
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
    },

    {
      _id: 'servicesPage',
      _type: 'servicesPage',
      hero: {
        image: img(images.services.hero, 'Industrial machinery and power station interior'),
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
          iconBg: 'blue-light',
          features: ['Substation Design & Erection', 'Industrial Plant Wiring'],
        },
        {
          id: 'liaisoning',
          title: 'TGSPDCL / TSSPDCL Liaisoning',
          description:
            'Expert navigation of regulatory requirements and statutory approvals. We streamline the process for new connections, load enhancements, and compliance certifications.',
          icon: 'assignment_turned_in',
          iconBg: 'red-light',
          accent: 'secondary',
          features: ['CEIG Approvals', 'Statutory Clearances'],
        },
        {
          id: 'maintenance',
          title: 'Maintenance & Retrofitting',
          description:
            'Preventative maintenance and system upgrades to ensure minimal downtime and maximum operational efficiency for existing industrial infrastructure.',
          icon: 'build_circle',
          iconBg: 'blue-light',
          features: ['AMC Services', 'Panel Retrofitting'],
        },
      ],
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
      ],
      capabilities: {
        featured: {
          image: img(images.services.ehvSubstation, 'EHV Substation equipment'),
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
          description: 'Custom steel structures for equipment mounting and support.',
        },
        energyAuditing: {
          icon: 'analytics',
          title: 'Energy Auditing',
          description: 'System analysis and optimization for power quality and efficiency.',
        },
      },
      cta: {
        title: 'Request a Technical Consultation',
        description:
          'Engage our engineering team to discuss your project requirements, scope, and technical specifications.',
      },
    },

    {
      _id: 'aboutPage',
      _type: 'aboutPage',
      hero: {
        title: 'Engineering Authority Since 2011',
        description:
          'Tejaswini Industries stands at the forefront of industrial precision, delivering robust solutions for power utilities, infrastructure, and heavy manufacturing sectors globally.',
        image: img(
          images.about.hero,
          'Advanced industrial manufacturing facility with precision-engineered transformers'
        ),
      },
      overview: {
        title: 'Defining Precision',
        paragraphs: [
          'Established with a commitment to uncompromising quality, Tejaswini Industries has evolved into a premier engineering powerhouse. Our foundation is built on rigorous standards and a relentless pursuit of customer satisfaction in complex industrial environments.',
          'Operating under strict ISO 9001:2015 protocols, every component engineered in our facilities undergoes exhaustive validation. We view quality not as a metric, but as an inherent property of our manufacturing DNA.',
        ],
        isoImage: img(
          images.about.isoCertificate,
          'ISO 9001:2015 certification document on an industrial workbench'
        ),
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
          variant: 'vision',
        },
        {
          icon: 'my_location',
          title: 'Our Mission',
          description:
            "To engineer and deliver superior industrial solutions that empower our clients' operations, maintaining the highest standards of safety, quality, and technical excellence.",
          variant: 'mission',
        },
      ],
      infrastructure: {
        title: 'Infrastructure',
        subtitle:
          'State-of-the-art manufacturing facilities located in the industrial hub of Hyderabad.',
        facilityImage: img(
          images.about.facility,
          'Modern industrial facility interior with CNC machines in Hyderabad'
        ),
        features: [
          {
            icon: 'factory',
            title: 'Advanced Machinery',
            description:
              'Equipped with highly calibrated CNC machines and automated assembly lines ensuring micro-millimeter precision.',
            variant: 'primary',
          },
          {
            icon: 'science',
            title: 'Testing Labs',
            description:
              'In-house NDT (Non-Destructive Testing) and material analysis laboratories guaranteeing structural integrity before deployment.',
            variant: 'default',
          },
          {
            icon: 'inventory_2',
            title: 'High-Capacity Storage',
            description:
              'Climate-controlled warehousing ensuring raw materials and finished goods remain uncontaminated.',
            variant: 'default',
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
        description: 'Discuss your technical specifications with our engineering team today.',
        buttonLabel: 'Contact Us',
      },
    },

    {
      _id: 'contactPage',
      _type: 'contactPage',
      hero: {
        title: 'Get in Touch',
        description:
          'Precision engineering requires clear communication. Connect with our technical consultants for robust industrial solutions, turnkey projects, and expert electrical liaisoning.',
      },
      infoCards: [
        {
          icon: 'domain',
          title: 'Corporate Office',
          lines: [
            '3-13-109/1/1, FCI Road, Suryanagar',
            'Mallapur, Hyderabad - 500076, Telangana, India',
          ],
          mono: false,
        },
        {
          icon: 'call',
          title: 'Direct Contact',
          lines: ['+91 9248030365', 'info@tejaswiniindustries.com'],
          mono: true,
        },
        {
          icon: 'schedule',
          title: 'Operating Hours',
          lines: ['Mon - Sat: 9:00 AM - 5:30 PM', 'Sun: Closed'],
          mono: false,
        },
      ],
      whatsapp: {
        title: 'Technical Support Chat',
        description:
          'Connect directly with our engineering team via WhatsApp for immediate technical assistance.',
        buttonLabel: 'Start Chat',
      },
      map: {
        image: img(
          images.contact.map,
          'Satellite map view of an industrial park with a facility marker'
        ),
        label: 'Hyderabad, Telangana',
      },
      form: {
        title: 'Project Inquiry Form',
        submitLabel: 'Submit Inquiry',
      },
      inquiryTypes: [
        { value: 'product', label: 'Product Inquiry' },
        { value: 'turnkey', label: 'Turnkey Project' },
        { value: 'liaisoning', label: 'Liaisoning Service' },
        { value: 'others', label: 'Others' },
      ],
    },

    {
      _id: 'corporateProfilePage',
      _type: 'corporateProfilePage',
      hero: {
        image: img(images.corporateProfile.hero, 'Industrial substation and power infrastructure'),
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
        image: img(images.corporateProfile.engineering, 'Engineering blueprints and precision tools'),
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
            description: 'Equipped with automated winding and vacuum drying technologies.',
          },
          {
            icon: 'engineering',
            title: 'Custom Engineering',
            description: 'Tailored technical specifications to meet specific load demands.',
          },
        ],
        established: 'Established 1998',
      },
    },

    {
      _id: 'distribution-transformers',
      _type: 'productCategory',
      id: 'distribution-transformers',
      title: 'Distribution Transformers',
      description:
        'High-efficiency distribution units designed to step down voltage for local commercial and industrial grid applications. Built with robust enclosures for extended operational lifespan.',
      image: img(
        images.products.distribution,
        'Heavy-duty industrial distribution transformer in a modern warehouse'
      ),
      technicalSpecs: [
        'Range: 100 KVA to 5000 KVA',
        'Voltage Class: 11 KV, 22 KV, 33 KV',
        'Cooling: ONAN',
        'Taping: OFF Load Tap Changer / On load Tap changer',
      ],
      bodyParagraphs: [
        'Distribution transformers for industrial application are available in 3 or 1 phase version with primary voltages of up to 33 KV and secondary voltages ranging from 433 to 11000 V. The capacity range is up to 10000 KVA.',
        'Our manufacturing facilities are located in Hyderabad. Power transformers up to 63 MVA 132 KV Class are regularly manufactured and supplied.',
        'The company has achieved ISO 9001 certification for all its transformers with regular internal and external quality audits.',
      ],
    },
    {
      _id: 'power-transformers',
      _type: 'productCategory',
      id: 'power-transformers',
      title: 'Power Transformers',
      description:
        'Heavy-duty transformers engineered for high-voltage transmission networks. Delivering supreme reliability and handling immense loads with minimal energy loss.',
      image: img(images.products.power, 'Large power transformer at an outdoor substation'),
      technicalSpecs: [
        'Copper foil winding technology for high current sections',
        'Sustaining short circuit forces without distortion in LV windings',
        'Hot spot in LV windings regulated',
        'Minimal stray losses and reduced total copper losses',
      ],
      bodyParagraphs: [
        'A power transformer transfers energy between two or more circuits through electromagnetic induction, efficiently changing AC voltages from one level to another within power networks.',
      ],
    },
    {
      _id: 'dry-type-transformers',
      _type: 'productCategory',
      id: 'dry-type-transformers',
      title: 'Dry Type Transformers',
      description:
        'Environmentally safe, liquid-free transformers ideal for indoor installations where fire safety is paramount. Low maintenance and highly reliable.',
      image: img(images.products.dryType, 'Dry-type transformer in a clean electrical control room'),
      technicalSpecs: [
        'VPI type up to 2.5 MVA',
        'Insulation grade F (155 °C) and H (180 °C)',
        'Protection up to IP56',
        'High mechanical strength with void-free insulation',
      ],
      bodyParagraphs: [
        'Dry type transformers use no insulating liquid. Windings and core are kept within a sealed tank pressurized with air, offering easy maintenance and reduced fire hazard.',
      ],
    },
    {
      _id: 'ht-panels',
      _type: 'productCategory',
      id: 'ht-panels',
      title: 'HT Panels',
      description:
        'High Tension switchgear panels designed for the protection and control of high-voltage industrial circuits, ensuring operational safety and system stability.',
      image: img(images.products.htPanels, 'Row of high tension electrical control panels'),
      technicalSpecs: [
        'Vacuum Circuit Breaker rating 630–2000 A',
        'Current Transformer ACC: 1–5p10',
        'Insulation level: 12/28/75 kV',
      ],
      bodyParagraphs: [
        'HT panels incorporate vacuum circuit breakers, CTs, PTs, and comprehensive metering for safe high-voltage industrial operation.',
      ],
    },
    {
      _id: 'lt-panels',
      _type: 'productCategory',
      id: 'lt-panels',
      title: 'LT Panels',
      description:
        'Low Tension distribution boards providing critical power routing and circuit protection for complex facility networks and heavy machinery clusters.',
      image: img(images.products.ltPanels, 'Low tension distribution panels in a factory setting'),
      technicalSpecs: [
        'All types of LT distribution panels',
        'Solid busbar system — no loose connections',
        'On-load protected switching system',
        'Live parts not directly accessible',
      ],
      bodyParagraphs: [
        'LT panels provide critical power routing and circuit protection for complex facility networks and heavy machinery clusters.',
      ],
    },
    {
      _id: 'rmus',
      _type: 'productCategory',
      id: 'rmus',
      title: 'RMUs',
      description:
        'Compact, fully enclosed Ring Main Units for secondary distribution networks. Offering superior protection in minimal spatial footprints.',
      image: img(images.products.rmu, 'Compact ring main unit switchgear'),
      technicalSpecs: [
        'Load Break Switches or SFU: 11 KV and 33 KV',
        'Vacuum Circuit Breakers: 11 KV and 33 KV',
        'Load Break Switch 630 A, 26.3 kA with Earth Switch and Interlock',
        'Earth Fault Indicator with CBCT as per EB Standard',
      ],
      bodyParagraphs: [
        'Ring Main Units are compact, enclosed switchgear for medium voltage distribution — a complete package requiring only installation and cable connection.',
      ],
    },

    {
      _id: 'mega-solar-park',
      _type: 'project',
      id: 'mega-solar-park',
      title: 'Mega Solar Park Substation',
      category: 'transformers',
      categoryLabel: 'Transformer',
      sector: 'Solar Farm Infrastructure',
      location: 'Gujarat',
      image: img(
        images.projects.solarSubstation,
        'Massive industrial electrical transformer in a modern factory'
      ),
      accent: true,
      specs: [spec('Capacity', '500 MVA'), spec('Voltage', '400/220 kV')],
    },
    {
      _id: 'cement-plant-control',
      _type: 'project',
      id: 'cement-plant-control',
      title: 'Cement Plant Main Control',
      category: 'ht-panels',
      categoryLabel: 'HT Panels',
      sector: 'Cement Manufacturing',
      location: 'Maharashtra',
      image: img(
        images.projects.cementControl,
        'Row of HT electrical control panels in a manufacturing facility'
      ),
      specs: [spec('Panels Installed', '24 Units'), spec('Standard', 'IEC 62271')],
    },
    {
      _id: 'steel-mill-routing',
      _type: 'project',
      id: 'steel-mill-routing',
      title: 'Steel Mill Power Routing',
      category: 'installations',
      categoryLabel: 'Installation',
      sector: 'Heavy Metallurgy',
      location: 'Odisha',
      image: img(
        images.projects.steelRouting,
        'Complex electrical cabling inside an industrial installation'
      ),
      specs: [spec('Scope', 'Full Turnkey'), spec('Completion', '2023-Q2')],
    },

    {
      _id: 'PRJ-24-091',
      _type: 'commissionRow',
      id: 'PRJ-24-091',
      sector: 'Textile Manufacturing',
      deliverable: '2500kVA Distribution Transformer',
      location: 'Surat',
      status: 'active',
    },
    {
      _id: 'PRJ-24-088',
      _type: 'commissionRow',
      id: 'PRJ-24-088',
      sector: 'Automotive Assembly',
      deliverable: 'Complete HT/LT Panel Suite',
      location: 'Pune',
      status: 'closed',
    },
    {
      _id: 'PRJ-23-112',
      _type: 'commissionRow',
      id: 'PRJ-23-112',
      sector: 'Petrochemicals',
      deliverable: 'Flameproof Substation Installation',
      location: 'Jamnagar',
      status: 'closed',
    },

    {
      _id: 'optimizing-core-performance',
      _type: 'blogPost',
      id: 'optimizing-core-performance',
      slug: slug('optimizing-core-performance'),
      title: 'Optimizing Core Performance in High-Voltage Transformers',
      excerpt:
        'A comprehensive analysis of advanced cooling methodologies and magnetic core optimizations designed to extend lifecycle and improve efficiency in heavy industrial applications.',
      category: 'transformers',
      categoryLabel: 'TRANSFORMERS',
      date: 'OCT 24, 2024',
      author: 'DR. ARVIND RAO',
      authorRole: 'CHIEF ENGINEER',
      authorImage: img(images.blogs.author, 'Professional headshot of chief engineer'),
      image: img(
        images.blogs.featured,
        'High-voltage transformer in a modern manufacturing facility'
      ),
      featured: true,
    },

    {
      _id: 'transformer-maintenance',
      _type: 'blogPost',
      id: 'transformer-maintenance',
      slug: slug('transformer-maintenance-guide'),
      title: 'Maximizing Efficiency: A Guide to Distribution Transformer Maintenance',
      excerpt:
        'Proactive maintenance protocols for oil-immersed distribution transformers—visual inspections, dielectric testing, and ISO-compliant field checklists.',
      category: 'maintenance',
      categoryLabel: 'MAINTENANCE',
      date: 'OCT 24, 2024',
      author: 'ENG. RAJESH KUMAR',
      image: img(
        images.blogs.detailHero,
        'Distribution transformer maintenance in a manufacturing facility'
      ),
      featured: false,
      breadcrumbLabel: 'Transformer Maintenance',
      readTime: '8 min read',
      intro:
        'Distribution transformers are the critical backbone of industrial power systems. Proactive maintenance is not merely a recommendation; it is an operational imperative to prevent catastrophic failures and ensure continuous high-performance output.',
      sections: [
        {
          id: 'routine-visual-inspections',
          title: '1. Routine Visual Inspections',
          paragraphs: [
            'Visual inspections form the first line of defense in transformer maintenance. These should be conducted strictly according to a documented schedule. Key indicators of potential issues include oil leaks around gaskets or valves, discoloration of the tank surface indicating localized overheating, and physical damage to bushings or cooling fins.',
          ],
          subsections: [
            {
              id: 'key-inspection-checkpoints',
              title: 'Key Inspection Checkpoints',
              checklist: [
                {
                  label: 'Oil Levels & Leaks:',
                  text: 'Verify conservator oil levels and inspect all welded joints and valves.',
                },
                {
                  label: 'Silica Gel Breather:',
                  text: 'Ensure the gel is blue (active) and replace if it turns pink (saturated).',
                },
                {
                  label: 'Bushing Condition:',
                  text: 'Check for cracks, tracking marks, or significant dirt accumulation.',
                },
              ],
            },
          ],
        },
        {
          id: 'technical-maintenance-schedule',
          title: '2. Technical Maintenance Schedule',
          paragraphs: [
            'Adhering to a standardized maintenance grid is vital for operational compliance and equipment longevity. Below is the recommended industrial standard schedule for oil-immersed distribution transformers.',
          ],
          table: {
            headers: ['Component', 'Inspection Action', 'Frequency', 'Tolerance limit'],
            rows: [
              {
                cells: ['Oil BDV Test', 'Dielectric strength measurement', 'Annual', '> 40 kV (min)'],
              },
              {
                cells: [
                  'Earth Resistance',
                  'Megger testing of neutral/body earth',
                  'Bi-Annual',
                  '< 1.0 Ohm',
                ],
              },
              {
                cells: [
                  'Buchholz Relay',
                  'Gas accumulation check & float operation',
                  'Quarterly',
                  'Zero Gas',
                ],
              },
              {
                cells: [
                  'Winding Resistance',
                  'Bridge method measurement per phase',
                  '3 Years',
                  '± 2% variation',
                ],
              },
            ],
          },
          alert: {
            title: 'Critical Action Warning',
            message:
              'Never attempt oil sampling or internal inspections while the transformer is energized. Ensure comprehensive isolation and grounding protocols are executed prior to physical intervention.',
          },
        },
      ],
      tableOfContents: [
        { id: 'routine-visual-inspections', label: 'Routine Visual Inspections', indent: false },
        { id: 'key-inspection-checkpoints', label: 'Key Inspection Checkpoints', indent: true },
        {
          id: 'technical-maintenance-schedule',
          label: 'Technical Maintenance Schedule',
          indent: false,
        },
      ],
      relatedProduct: {
        title: 'Oil Immersed Series T-500',
        capacity: 'Cap: 500kVA - 2500kVA',
        image: img(images.blogs.relatedOilImmersed, 'Oil immersed industrial transformer thumbnail'),
        href: '/products/distribution-transformers',
      },
    },

    {
      _id: 'arc-flash-standards',
      _type: 'blogPost',
      id: 'arc-flash-standards',
      slug: slug('arc-flash-standards'),
      title: 'Revised Arc Flash Hazard Safety Standards Q4',
      excerpt:
        'Critical updates to personal protective equipment requirements and boundary calculations for low-voltage panels.',
      category: 'electrical-safety',
      categoryLabel: 'ALERT • SAFETY',
      date: 'OCT 15, 2024',
      author: 'COMPLIANCE TEAM',
      image: img(images.blogs.safety, 'Industrial warehouse with electrical components'),
      accent: true,
      alertMeta: true,
      featured: false,
    },
    {
      _id: 'iso-audit',
      _type: 'blogPost',
      id: 'iso-audit',
      slug: slug('iso-audit'),
      title: 'ISO 9001:2015 Audit Preparation Guidelines',
      excerpt:
        'A structured checklist for manufacturing floors to ensure seamless compliance during upcoming certification renewal audits.',
      category: 'industry-news',
      categoryLabel: 'INDUSTRY NEWS',
      date: 'OCT 10, 2024',
      author: 'QA DEPT',
      image: img(images.blogs.industryNews, 'Technical blueprint on digital drafting screen'),
      featured: false,
    },
    {
      _id: 'cable-routing',
      _type: 'blogPost',
      id: 'cable-routing',
      slug: slug('cable-routing'),
      title: 'Cable Routing Standards for Heavy Load Centers',
      excerpt:
        'Best practices for tray management and separation protocols to minimize electromagnetic interference in dense installations.',
      category: 'electrical-safety',
      categoryLabel: 'ELECTRICAL SAFETY',
      date: 'OCT 05, 2024',
      author: 'DR. ARVIND RAO',
      image: img(images.blogs.electricalSafety, 'Heavy gauge electrical cables in steel conduit'),
      featured: false,
    },

    {
      _id: 'trending-01',
      _type: 'trendingArticle',
      rank: '01',
      title: 'Copper vs Aluminum Windings: A Cost-Benefit Analysis',
      readTime: '5 MIN READ',
      order: 0,
    },
    {
      _id: 'trending-02',
      _type: 'trendingArticle',
      rank: '02',
      title: 'Navigating the New Substation Clearance Regulations',
      readTime: '8 MIN READ',
      order: 1,
    },
    {
      _id: 'trending-03',
      _type: 'trendingArticle',
      rank: '03',
      title: 'Troubleshooting Harmonic Distortion in Industrial Grids',
      readTime: '12 MIN READ',
      order: 2,
    },
    {
      _id: 'trending-04',
      _type: 'trendingArticle',
      rank: '04',
      title: 'The Future of Dry-Type Transformers',
      readTime: '4 MIN READ',
      order: 3,
    },
  ]
}
