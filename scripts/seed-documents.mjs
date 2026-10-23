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
      _id: 'siteSettings',
      _type: 'siteSettings',
      addressLines: [
        '3-13-109/1/1, FCI Road, Suryanagar',
        'Mallapur, Hyderabad - 500076, Telangana, India',
      ],
      streetAddress: '3-13-109/1/1, FCI Road, Suryanagar, Mallapur',
      postalCode: '500076',
      locality: 'Hyderabad',
      region: 'Telangana',
      country: 'IN',
      lat: 17.4454786,
      lng: 78.5800202,
      mapsUrl:
        'https://www.google.com/maps/dir/?api=1&destination=17.4454786,78.5800202&travelmode=driving',
      phone: '+91 92480 30362',
      phoneHref: 'tel:+919248030362',
      email: 'info@tejaswiniindustries.com',
      whatsappNumber: '919248030362',
      whatsappNote: 'Calls and WhatsApp both use +91 92480 30362.',
      hours: ['Mon - Sat: 9:00 AM - 5:30 PM', 'Sun: Closed'],
      opens: '09:00',
      closes: '17:30',
    },

    {
      _id: 'landingPage',
      _type: 'landingPage',
      hero: {
        image: img(
          images.hero,
          'Tejaswini distribution transformer secured on a flatbed truck at an industrial delivery yard'
        ),
        badgePrimary: 'ISO 9001:2015',
        badgeSecondary: 'BIS Certified',
        title: 'Distribution Transformer Manufacturer\nin Hyderabad',
        description:
          'Tejaswini Industries manufactures distribution transformers in Hyderabad, Telangana. The distribution range is 100 kVA to 2000 kVA at 11 kV, 22 kV and 33 kV, with ONAN cooling, CRGO or amorphous cores, aluminium or copper windings, and off-load or on-load tap changers. The factory is at Mallapur.',
        primaryCta: 'Contact Us',
        secondaryCta: 'Call Now',
      },
      companyIntro: {
        title: 'Engineering Authority',
        paragraphs: [
          'Tejaswini Industries builds distribution transformers, dry-type transformers, HT panels, LT panels and ring main units at Mallapur, Hyderabad. Buyers in Hyderabad and the rest of Telangana can request a quotation with kVA, voltage and project location.',
          'Our facilities operate under stringent ISO 9001:2015 standards, ensuring every unit deployed is a testament to our technical rigor and operational excellence. The site also shows a BIS Certified mark. We build the backbone of industrial power.',
        ],
        image: img(
          images.facility,
          'Technicians assembling an electrical control panel in a manufacturing facility'
        ),
        stats: [
          { value: '2011', label: 'Established' },
          { value: '10k+', label: 'Units Deployed' },
        ],
      },
      portfolio: {
        eyebrow: 'Core Solutions',
        title: 'Industrial Portfolio',
        linkLabel: 'View All Products',
        items: [
          {
            title: 'Distribution Transformers',
            description:
              'Distribution transformers from 100 kVA to 2000 kVA, with CRGO or amorphous cores and aluminium or copper windings, built in Hyderabad.',
            image: img(images.transformers, 'Distribution transformers'),
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
        title: 'Electrical Services for Hyderabad and Telangana',
        description:
          'Turnkey HT/LT installation, maintenance and TGSPDCL / TSSPDCL liaisoning from the Hyderabad works. ISO 9001:2015 certified processes. Liaisoning is a service; this site does not state a utility product approval.',
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
          title: 'Substation Engineering',
          description:
            'Civil, structural, and electrical engineering for substations, including testing and commissioning. Distribution transformers manufactured here stay within 100 kVA to 2000 kVA.',
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
        title: 'Request a Transformer Quote in Telangana',
        description:
          'Call +91 92480 30362, email info@tejaswiniindustries.com, or send the inquiry form with kVA, voltage, company, role and the project location in Telangana. The office is at Mallapur, Hyderabad - 500076.',
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
          lines: ['+91 92480 30362', 'info@tejaswiniindustries.com'],
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
          { value: '2011', label: 'Established' },
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
        established: 'Established 2011',
      },
    },

    {
      _id: 'distribution-transformers',
      _type: 'productCategory',
      id: 'distribution-transformers',
      title: 'Distribution Transformers in Hyderabad',
      description:
        'Distribution transformers made in Hyderabad, 100 kVA to 2000 kVA, 11/22/33 kV, ONAN, with CRGO or amorphous cores and aluminium or copper windings.',
      image: img(
        images.products.distribution,
        'Heavy-duty industrial distribution transformer in a modern warehouse'
      ),
      technicalSpecs: [
        'Range: 100 kVA to 2000 kVA',
        'Voltage Class: 11 kV, 22 kV, 33 kV',
        'Cooling: ONAN',
        'Core: CRGO or amorphous',
        'Winding: aluminium (Al) or copper (Cu)',
        'Taping: OFF Load Tap Changer / On load Tap changer',
      ],
      bodyParagraphs: [
        'Distribution transformers for projects in Hyderabad and Telangana are built in 1 or 3 phase, with primary voltages up to 33 kV and secondary voltages from 433 V to 11000 V. The top rating is 2000 kVA. The low end of the published range remains 100 kVA.',
        'Cores are CRGO (cold-rolled grain-oriented steel) or amorphous metal. Windings are aluminium (Al) or copper (Cu). ISO 9001 certification is stated for the transformers, with internal and external quality audits. No efficiency-star rating is published.',
        'Cooling is ONAN (oil natural, air natural). Tap changers are off-load or on-load. Apartment and factory kVA is not published as a sizing chart; send connected load with the inquiry.',
      ],
    },
    {
      _id: 'dry-type-transformers',
      _type: 'productCategory',
      id: 'dry-type-transformers',
      title: 'Dry Type Transformers in Hyderabad',
      description:
        'VPI dry-type transformers from Hyderabad, up to 2000 kVA, insulation class F (155 °C) and H (180 °C), protection up to IP56.',
      image: img(images.products.dryType, 'Dry-type transformer in a clean electrical control room'),
      technicalSpecs: [
        'VPI type up to 2000 kVA',
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
      title: 'HT Panels in Hyderabad',
      description:
        'High-tension panels built in Hyderabad, with vacuum circuit breakers rated 630–2000 A and insulation level 12/28/75 kV.',
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
      title: 'LT Panels in Hyderabad',
      description:
        'Low-tension distribution panels from Hyderabad, with a solid busbar system, on-load protected switching, and no direct access to live parts.',
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
      title: 'Ring Main Units in Hyderabad',
      description:
        '11 kV and 33 kV ring main units from Hyderabad, including 630 A, 26.3 kA load-break switches with earth switch and interlock.',
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
      _id: 'serviceAreasPage',
      _type: 'serviceAreasPage',
      title: 'Transformer Supply in Hyderabad and Telangana',
      description:
        'Distribution transformers, panels and ring main units made at Mallapur, Hyderabad, for projects in Hyderabad and Telangana.',
      paragraphs: [
        'Tejaswini Industries manufactures distribution transformers at 3-13-109/1/1, FCI Road, Suryanagar, Mallapur, Hyderabad 500076, Telangana. The distribution range is 100 kVA to 2000 kVA, with CRGO or amorphous cores and aluminium or copper windings, plus dry-type transformers, HT panels, LT panels and ring main units.',
        'Enquiries for industrial, commercial, apartment and infrastructure projects in Hyderabad and elsewhere in Telangana are taken on the contact form. The form asks for kVA, voltage, company, role and project location. A site outside the published address is confirmed when the quotation is prepared. This page does not list districts the company has not named.',
        'The project list also includes references outside Telangana (Gujarat, Maharashtra and Odisha, including Surat, Pune and Jamnagar). Those are published installations, not a claim that every district is covered.',
      ],
      areas: [
        {
          name: 'Hyderabad',
          detail:
            'Factory and corporate office at Mallapur, on FCI Road, Suryanagar. Call +91 92480 30362. Hours published on the site are Monday to Saturday, 9:00 AM to 5:30 PM.',
        },
        {
          name: 'Telangana',
          detail:
            'Projects elsewhere in Telangana are quoted from the Hyderabad works. Name the town or site on the inquiry. TGSPDCL / TSSPDCL liaisoning is offered as a service and is not described as a product approval.',
        },
      ],
    },

    {
      _id: 'faqs',
      _type: 'faqSet',
      items: [
        {
          id: 'home-who',
          page: 'home',
          question: 'Who is the distribution transformer manufacturer in Hyderabad?',
          answer:
            'Tejaswini Industries manufactures distribution transformers at Mallapur, Hyderabad, Telangana (3-13-109/1/1, FCI Road, Suryanagar, PIN 500076). The range is 100 kVA to 2000 kVA at 11 kV, 22 kV and 33 kV, with ONAN cooling, CRGO or amorphous cores, aluminium or copper windings, and off-load or on-load tap changers. Call or WhatsApp +91 92480 30362.',
        },
        {
          id: 'home-kva',
          page: 'home',
          question: 'What kVA is published for apartments and factories?',
          answer:
            'The distribution range is 100 kVA to 2000 kVA. There is no published chart that converts flats or a factory load into kVA. Send the connected load, voltage and Telangana location on the inquiry form so the rating can be confirmed in the quotation.',
        },
        {
          id: 'home-winding',
          page: 'home',
          question: 'Do the transformers use copper or aluminium windings?',
          answer:
            'Distribution transformers are wound in aluminium or copper, on a CRGO core or an amorphous core, from 100 kVA to 2000 kVA. Aluminium conducts less well than copper, so an aluminium conductor is larger in cross-section for the same current and the winding is lighter. Copper is the higher-conductivity choice. No price difference and no efficiency-star rating are published.',
        },
        {
          id: 'home-tap',
          page: 'home',
          question: 'What is the difference between OLTC and OFTC here?',
          answer:
            'The distribution specification lists both an off-load tap changer and an on-load tap changer. Off-load is changed with the transformer isolated. On-load is the listed option for changing taps in service. Tap range and step size are not published.',
        },
        {
          id: 'home-certs',
          page: 'home',
          question: 'Which certifications and utility approvals are stated?',
          answer:
            'The site shows ISO 9001:2015 and BIS Certified marks, and the corporate profile says products are IS/IEC compliant. Certificate numbers are not published. TGSPDCL / TSSPDCL liaisoning is a service. The site does not say a transformer is TSSPDCL-approved.',
        },
        {
          id: 'home-lead',
          page: 'home',
          question: 'What is the lead time and delivery time inside Telangana?',
          answer:
            'Lead time and a delivery promise are not published. The factory is in Hyderabad. The quotation states the schedule after the kVA, voltage and site are known.',
        },
        {
          id: 'home-test',
          page: 'home',
          question: 'What inspection and testing is described?',
          answer:
            'The site says every product goes through a multi-stage quality check before deployment, and that in-house NDT and material analysis are part of the Hyderabad facility. The maintenance article for oil-immersed units lists visual checks, oil BDV (annual, above 40 kV), earth resistance, Buchholz relay and winding resistance. It also says not to sample oil or open a unit while it is energized.',
        },
        {
          id: 'home-quote',
          page: 'home',
          question: 'How do I request a quote?',
          answer:
            'Use the contact form. It asks for name, company, role, email, kVA, voltage, project location in Telangana and the technical requirement. Calls and WhatsApp both use +91 92480 30362.',
        },
        {
          id: 'dist-range',
          page: 'distribution-transformers',
          question: 'What ratings are published for distribution transformers?',
          answer:
            '100 kVA to 2000 kVA, voltage class 11 kV, 22 kV and 33 kV, cooling ONAN, off-load or on-load tap changer. Cores are CRGO or amorphous. Windings are aluminium (Al) or copper (Cu). Units are single- or three-phase, with primary voltage up to 33 kV and secondary voltage from 433 V to 11000 V. The order rating is the one on the quotation.',
        },
        {
          id: 'oil-what',
          page: 'distribution-transformers',
          question: 'What does oil-cooled mean on this site?',
          answer:
            'The catalogue lists cooling as ONAN, which is oil-natural, air-natural. The maintenance guide describes the same family as oil-immersed distribution transformers. Oil volume and a loss guarantee are not published.',
        },
        {
          id: 'oltc-choice',
          page: 'distribution-transformers',
          question: 'Can I specify OLTC or off-load tap changer?',
          answer:
            'Yes. The distribution specification lists both. The site does not publish which one is standard, the tap range, or the number of positions. Write the requirement on the inquiry.',
        },
        {
          id: 'crgo-what',
          page: 'distribution-transformers',
          question: 'What is a CRGO core?',
          answer:
            'CRGO is cold-rolled grain-oriented silicon steel. The grain direction is aligned so magnetic loss along the rolling direction is lower than in non-oriented electrical steel. These distribution transformers are 100 kVA to 2000 kVA, with aluminium or copper windings, at 11 kV, 22 kV and 33 kV. No loss wattage or efficiency-star rating is published.',
        },
        {
          id: 'amorphous-vs-crgo',
          page: 'distribution-transformers',
          question: 'How does an amorphous core compare with CRGO?',
          answer:
            'Amorphous metal is a thin metallic-glass ribbon. It generally has lower no-load loss and lower hysteresis loss than CRGO steel. The ribbon is more brittle, and the tank is often larger for the same rating. Both cores are built here, with aluminium or copper windings, from 100 kVA to 2000 kVA. This site does not publish a loss comparison in watts, a percentage saving, or an efficiency-star rating.',
        },
        {
          id: 'crgo-vs-amorphous',
          page: 'distribution-transformers',
          question: 'When is CRGO used instead of an amorphous core?',
          answer:
            'Both cores are manufactured for the same distribution band, 100 kVA to 2000 kVA, 11/22/33 kV, ONAN, with aluminium or copper windings. CRGO is grain-oriented silicon steel. Amorphous metal generally has lower no-load loss and is more brittle. The site does not publish a rule that assigns one core to a kVA band.',
        },
        {
          id: 'al-vs-cu',
          page: 'distribution-transformers',
          question: 'How does aluminium winding compare with copper?',
          answer:
            'Both windings are offered on CRGO and amorphous distribution transformers from 100 kVA to 2000 kVA. Aluminium has lower electrical conductivity than copper, so the conductor cross-section is larger for the same current, and the winding is lighter. Copper is the smaller, higher-conductivity conductor. No price difference and no efficiency-star rating are published.',
        },
        {
          id: 'winding-range',
          page: 'distribution-transformers',
          question: 'Which ratings can be aluminium or copper wound?',
          answer:
            'The distribution range is 100 kVA to 2000 kVA at 11 kV, 22 kV and 33 kV, ONAN cooling, off-load or on-load tap changer, on a CRGO or amorphous core, with an aluminium or copper winding. The factory is at Mallapur, Hyderabad.',
        },
        {
          id: 'ht-rating',
          page: 'ht-panels',
          question: 'What HT panel ratings are published?',
          answer:
            'Vacuum circuit breaker rating 630–2000 A, current transformer accuracy class 1–5P10, insulation level 12/28/75 kV. Short-circuit text on the longer product note says up to 26.3 kA rms. Panels are made in Hyderabad.',
        },
        {
          id: 'lt-what',
          page: 'lt-panels',
          question: 'What is stated for LT panels?',
          answer:
            'LT distribution panels use a solid busbar system, on-load protected switching, and keep live parts from direct access. A numerical busbar rating is not published. They are made in Hyderabad.',
        },
        {
          id: 'areas-where',
          page: 'service-areas',
          question: 'Which places in Telangana are named?',
          answer:
            'The only address published is the Mallapur, Hyderabad factory and office, PIN 500076. Other Telangana sites are accepted as inquiry locations and confirmed on the quote. The site does not publish a list of industrial estates.',
        },
      ],
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
      deliverable: 'Distribution transformer',
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
        capacity: 'Up to 2000 kVA',
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
