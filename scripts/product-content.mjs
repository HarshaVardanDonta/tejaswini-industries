/**
 * SEO and AEO content for the products pages.
 *
 * scripts/seed-documents.mjs spreads these fields onto the `productCategory`
 * documents and builds the `productsPage` document from `productsPageContent`.
 * Facts here come from the existing catalogue copy and from the owner. Anything
 * not listed (prices, certificate numbers, lead times, loss values, client
 * names, TGSPDCL/TSSPDCL product approval) is deliberately left out.
 *
 * Paragraph and bullet text supports [link text](/path) and **bold**.
 * FAQ answers are plain text because they are also published as FAQPage JSON-LD.
 */
import { photo } from './blog-posts.mjs'

const GUIDE = {
  is1180: 'is-1180-energy-efficiency-levels-explained',
  core: 'amorphous-core-vs-crgo-core-distribution-transformer',
  tap: 'oltc-vs-off-circuit-tap-changer-distribution-transformer',
  kva: 'how-to-choose-transformer-kva-rating-for-your-load',
  inspection: 'distribution-transformer-inspection-checklist-before-dispatch-and-at-site',
}

const figure = (shot, caption, maxWidth = 'md') => ({
  image: { _type: 'imageWithUrl', url: shot.url, alt: shot.alt },
  caption,
  width: shot.width,
  height: shot.height,
  maxWidth,
})

const row = (label, value) => ({ label, value })


/**
 * Maximum total losses from IS 1180 (Part 1) as amended by Amendment No. 4 (March 2021),
 * Table 6, "Maximum Total Losses up to 11 kV Class Transformers". Three-phase ratings from
 * 250 to 2000 kVA. Copied from the amendment text (see /workspace/seo/research/is1180.txt).
 * These are the limits the standard allows, not Tejaswini guaranteed or tested values.
 */
const LOSS_TABLES = [
  {
    "caption": "Maximum total loss in watts at 100 % load, by IS 1180 (Part 1) energy efficiency level (three-phase, 11 kV class)",
    "headers": [
      "Rating (kVA)",
      "Impedance (%)",
      "Level 1",
      "Level 2",
      "Level 3",
      "Level 4",
      "Level 5"
    ],
    "rows": [
      [
        "250",
        "4.50",
        "2,930",
        "2,700",
        "2,488",
        "2,293",
        "2,113"
      ],
      [
        "315",
        "4.50",
        "3,100",
        "2,750",
        "2,440",
        "2,164",
        "1,920"
      ],
      [
        "400",
        "4.50",
        "3,450",
        "3,330",
        "3,214",
        "3,102",
        "2,994"
      ],
      [
        "500",
        "4.50",
        "4,300",
        "4,100",
        "3,909",
        "3,727",
        "3,554"
      ],
      [
        "630",
        "4.50",
        "5,300",
        "4,850",
        "4,438",
        "4,061",
        "3,717"
      ],
      [
        "800",
        "5.00",
        "6,403",
        "5,838",
        "5,323",
        "4,853",
        "4,425"
      ],
      [
        "1,000",
        "5.00",
        "7,700",
        "7,000",
        "6,364",
        "5,785",
        "5,259"
      ],
      [
        "1,250",
        "5.00",
        "9,200",
        "8,400",
        "7,670",
        "7,003",
        "6,394"
      ],
      [
        "1,600",
        "6.25",
        "11,800",
        "11,300",
        "10,821",
        "10,363",
        "9,924"
      ],
      [
        "2,000",
        "6.25",
        "15,000",
        "14,100",
        "13,254",
        "12,459",
        "11,711"
      ]
    ]
  },
  {
    "caption": "Maximum total loss in watts at 50 % load, by IS 1180 (Part 1) energy efficiency level (three-phase, 11 kV class)",
    "headers": [
      "Rating (kVA)",
      "Impedance (%)",
      "Level 1",
      "Level 2",
      "Level 3",
      "Level 4",
      "Level 5"
    ],
    "rows": [
      [
        "250",
        "4.50",
        "980",
        "920",
        "864",
        "811",
        "761"
      ],
      [
        "315",
        "4.50",
        "1,025",
        "955",
        "890",
        "829",
        "772"
      ],
      [
        "400",
        "4.50",
        "1,225",
        "1,150",
        "1,080",
        "1,013",
        "951"
      ],
      [
        "500",
        "4.50",
        "1,510",
        "1,430",
        "1,354",
        "1,282",
        "1,215"
      ],
      [
        "630",
        "4.50",
        "1,860",
        "1,745",
        "1,637",
        "1,536",
        "1,441"
      ],
      [
        "800",
        "5.00",
        "2,287",
        "2,147",
        "2,015",
        "1,892",
        "1,776"
      ],
      [
        "1,000",
        "5.00",
        "2,790",
        "2,620",
        "2,460",
        "2,310",
        "2,170"
      ],
      [
        "1,250",
        "5.00",
        "3,300",
        "3,220",
        "3,142",
        "3,066",
        "2,991"
      ],
      [
        "1,600",
        "6.25",
        "4,200",
        "3,970",
        "3,753",
        "3,547",
        "3,353"
      ],
      [
        "2,000",
        "6.25",
        "5,050",
        "4,790",
        "4,543",
        "4,309",
        "4,088"
      ]
    ]
  }
]

const LOSS_NOTE =
  'Source: IS 1180 (Part 1), Amendment No. 4 (March 2021), Table 6. Total loss is no-load loss plus load loss. These are the maximum values the standard permits for the 11 kV class, not guaranteed or tested values for a Tejaswini unit; the guaranteed losses for an order are stated in the quotation. Higher loss values apply to the 22 kV and 33 kV classes. Three-phase ratings below 250 kVA are not shown here; see the standard.'

/** Owner photo used as the distribution transformer hero. */
export const distributionHero = {
  url: photo.frontWide.url,
  alt: 'Front view of an oil-filled distribution transformer made by Tejaswini Industries, with a TEJASWINI-branded conservator tank, three HV bushings on the top cover, red LV terminals and radiator banks on both sides, standing in a workshop bay.',
}

export const productSeoContent = {
  /* ------------------------------------------------------------ distribution */
  'distribution-transformers': {
    metaTitle: 'Distribution Transformers, Hyderabad',
    metaDescription:
      'BIS-approved oil-cooled distribution transformers, 100 to 2000 kVA, 11/22/33 kV, CRGO or amorphous core, copper or aluminium winding. Made in Hyderabad.',
    shortAnswer:
      'A distribution transformer steps medium-voltage supply down for local use. Tejaswini Industries makes BIS-approved, oil-cooled (ONAN) distribution transformers from 100 kVA to 2000 kVA at 11, 22 and 33 kV at its works in Mallapur, Hyderabad, with CRGO or amorphous cores, copper or aluminium windings and off-load or on-load tap changers.',
    heroFacts: ["100 to 2000 kVA", "11 / 22 / 33 kV", "Oil-cooled (ONAN)", "BIS-approved"],
    quoteChecklist: ["kVA rating and number of phases", "HV and LV voltage", "IS 1180 efficiency level, or the guaranteed losses you need", "Tap changer (OFTC or OLTC), with tap range and step", "Winding (copper or aluminium) and core (CRGO or amorphous)", "HV and LV terminations", "Delivery location"],
    sections: [
      {
        id: 'what-is-a-distribution-transformer',
        title: 'What is a distribution transformer?',
        paragraphs: [
          'A distribution transformer is the last transformer between the medium-voltage network and the people who use the power. It takes supply at 11 kV, 22 kV or 33 kV and delivers it at a lower voltage for factories, buildings and local networks.',
          'The units we build are oil-cooled. The core and windings sit in a tank of insulating oil, and the oil carries heat to the tank surface and radiators. This is called ONAN: oil natural, air natural. Units are single-phase or three-phase, with primary voltage up to 33 kV and secondary voltage from 433 V to 11,000 V.',
        ],
        figure: figure(
          photo.sideWide,
          'Side view of an oil-filled distribution transformer in the workshop. The photo shows the build, not a particular rating.',
        ),
      },
      {
        id: 'where-are-distribution-transformers-used',
        title: 'Where are distribution transformers used?',
        paragraphs: [
          'Distribution transformers supply industrial plants, commercial buildings, apartment complexes, infrastructure projects and utility distribution feeders. Our customers are MEP consultants, EPC and electrical contractors, industries, infrastructure developers and utilities, mostly across India.',
        ],
      },
      {
        id: 'distribution-transformer-specifications-and-standards',
        title: 'What are the key specifications and standards?',
        paragraphs: [
          'The table lists what we publish for the range. IS 1180 (Part 1) is the Indian standard for oil-immersed distribution transformers, and our units are BIS-approved. The guaranteed losses and efficiency level for an order are stated in the quotation, so ask for them when you enquire. For what the levels mean, read [IS 1180 energy efficiency levels explained](/blogs/' +
            GUIDE.is1180 +
            ').',
        ],
        table: true,
        extraTables: LOSS_TABLES,
        extraTablesNote: LOSS_NOTE,
      },
      {
        id: 'how-to-choose-a-distribution-transformer',
        title: 'How do I choose a distribution transformer?',
        paragraphs: [
          'Start with the kVA rating, which comes from your connected load, demand factor, power factor and growth. The [kVA rating guide](/blogs/' +
            GUIDE.kva +
            ') walks through it with a worked example. Then choose the core, winding and tap changer.',
          '**Core.** Both CRGO (cold-rolled grain-oriented steel) and amorphous metal cores are built. Amorphous generally has lower no-load loss, and the tank is often larger for the same rating. The [amorphous vs CRGO guide](/blogs/' +
            GUIDE.core +
            ') compares them.',
          '**Winding.** Copper has higher conductivity, so the conductor is smaller for the same current. Aluminium conductors are larger in cross-section and the winding is lighter.',
          '**Tap changer.** An off-load tap changer (OFTC) is changed with the transformer isolated. An on-load tap changer (OLTC) can be changed while the unit is in service. See [OLTC vs off-circuit tap changer](/blogs/' +
            GUIDE.tap +
            ').',
        ],
        options: true,
        figure: figure(
          photo.coreWide,
          'Wound core sections, packed in the workshop. The photo does not show whether the core is CRGO or amorphous.',
        ),
      },
      {
        id: 'why-buy-from-tejaswini-industries-hyderabad',
        title: 'Why buy a distribution transformer from Tejaswini Industries in Hyderabad?',
        paragraphs: [
          'We make the transformers ourselves at Mallapur, Hyderabad, so the rating, core, winding and tap changer are specified with the manufacturer directly. The company is ISO 9001:2015 certified, and the site states that every product passes a multi-stage quality check before deployment.',
          'Before a unit leaves, you can check it against our [pre-dispatch and site inspection checklist](/blogs/' +
            GUIDE.inspection +
            '). Transformer repair and electrical turnkey projects are also offered; see [services](/services).',
        ],
      },
    ],
    specsTable: [
      row('Rating range', '100 kVA to 2000 kVA'),
      row('Voltage class', '11 kV, 22 kV and 33 kV'),
      row('Phases', 'Single-phase or three-phase'),
      row('Primary voltage', 'Up to 33 kV'),
      row('Secondary voltage', '433 V to 11,000 V'),
      row('Cooling', 'ONAN (oil natural, air natural)'),
      row('Core', 'CRGO or amorphous'),
      row('Winding', 'Aluminium (Al) or copper (Cu)'),
      row('Tap changer', 'Off-load (OFTC) or on-load (OLTC)'),
      row('Approvals', 'BIS-approved; ISO 9001:2015 certified company'),
    ],
    faqs: [
      {
        question: 'What kVA ratings of distribution transformer do you make?',
        answer:
          'Tejaswini Industries makes oil-cooled distribution transformers from 100 kVA to 2000 kVA at 11 kV, 22 kV and 33 kV. The right rating depends on your connected load, demand factor, power factor and growth. Send those with your enquiry and we will confirm the rating in the quotation.',
      },
      {
        question: 'Do you make copper-wound and aluminium-wound transformers?',
        answer:
          'Yes. Both windings are offered across the range. Copper has higher conductivity, so its conductor is smaller for the same current. Aluminium has lower conductivity, so the conductor is larger in cross-section, and the winding is lighter.',
      },
      {
        question: 'What is the difference between a CRGO and an amorphous core?',
        answer:
          'CRGO is cold-rolled grain-oriented silicon steel. Amorphous metal is a thin metallic-glass ribbon that generally has lower no-load loss, though the tank is often larger for the same rating. Both cores are built here. Loss values for your rating are given in the quotation.',
      },
      {
        question: 'Should I choose an OLTC or an off-load tap changer?',
        answer:
          'An off-load tap changer is operated with the transformer isolated. An on-load tap changer can be operated while the transformer is in service, which suits supplies where voltage must be adjusted without an outage. Both are available. State your tap range and step on the enquiry.',
      },
      {
        question: 'Are your distribution transformers BIS-approved?',
        answer:
          'Yes, Tejaswini Industries makes BIS-approved distribution transformers, and the company is ISO 9001:2015 certified. IS 1180 (Part 1) is the Indian standard for oil-immersed distribution transformers. Ask for the certificate details and guaranteed losses when you request a quotation.',
      },
      {
        question: 'How do I get a quotation for a distribution transformer?',
        answer:
          'Send the kVA rating, HV and LV voltage, tap changer type, winding and core preference and the site location through the contact form, or call or WhatsApp +91 92480 30362. The works are at Mallapur, Hyderabad, Telangana.',
      },
    ],
    relatedGuides: [GUIDE.is1180, GUIDE.core, GUIDE.tap, GUIDE.kva, GUIDE.inspection],
    relatedProducts: ['dry-type-transformers', 'ht-panels', 'lt-panels', 'rmus'],
  },

  /* ---------------------------------------------------------------- dry type */
  'dry-type-transformers': {
    metaTitle: 'Dry Type Transformers, Hyderabad',
    metaDescription:
      'VPI dry-type transformers up to 2000 kVA with insulation class F or H and protection up to IP56, made by Tejaswini Industries in Hyderabad.',
    shortAnswer:
      'A dry-type transformer uses no insulating liquid, which makes it suited to indoor installations where fire safety matters. Tejaswini Industries makes VPI (vacuum pressure impregnated) dry-type transformers up to 2000 kVA at Mallapur, Hyderabad, with insulation class F (155 °C) or H (180 °C) and protection up to IP56.',
    heroFacts: ["VPI type", "Up to 2000 kVA", "Insulation class F / H", "Protection up to IP56"],
    quoteChecklist: ["kVA rating and number of phases", "Primary and secondary voltage", "Insulation class (F or H)", "Enclosure protection needed (up to IP56)", "Where it will be installed", "Delivery location"],
    sections: [
      {
        id: 'what-is-a-dry-type-transformer',
        title: 'What is a dry-type transformer?',
        paragraphs: [
          'In a dry-type transformer the windings and core are not immersed in oil or any other insulating liquid. Without oil there is nothing to leak or burn, so the unit is less prone to fire hazard and is easy to maintain.',
          'We make the VPI type. In vacuum pressure impregnation the windings are impregnated with resin under vacuum and pressure, which gives void-free insulation and high mechanical strength.',
        ],
      },
      {
        id: 'where-are-dry-type-transformers-used',
        title: 'Where are dry-type transformers used?',
        paragraphs: [
          'Dry-type transformers are chosen for indoor installations where fire safety is paramount, such as electrical rooms inside buildings and plants. Our customers include MEP consultants, EPC and electrical contractors and industries, mostly across India.',
        ],
      },
      {
        id: 'dry-type-transformer-specifications',
        title: 'What are the key specifications?',
        paragraphs: [
          'Insulation class F allows a winding temperature of 155 °C and class H allows 180 °C. IP56 is an enclosure rating: protected against dust and against powerful water jets.',
        ],
        table: true,
      },
      {
        id: 'how-to-choose-a-dry-type-transformer',
        title: 'How do I choose a dry-type transformer?',
        paragraphs: [
          'Choose a dry-type unit when the transformer will sit indoors, close to people or equipment, and the priority is to avoid oil. For outdoor or yard installations, an oil-cooled [distribution transformer](/products/distribution-transformers) is the usual alternative.',
          'To size the unit, work out your maximum demand and power factor as described in the [kVA rating guide](/blogs/' +
            GUIDE.kva +
            '). Then state the primary and secondary voltage, the insulation class you need, the enclosure protection you need and where it will be installed.',
        ],
      },
      {
        id: 'why-buy-dry-type-from-tejaswini-industries-hyderabad',
        title: 'Why buy a dry-type transformer from Tejaswini Industries in Hyderabad?',
        paragraphs: [
          'The units are made at our works in Mallapur, Hyderabad, by a company that is ISO 9001:2015 certified. You can specify the rating, insulation class and enclosure directly with the manufacturer. Transformer repair and electrical turnkey projects are also offered; see [services](/services).',
        ],
      },
    ],
    specsTable: [
      row('Type', 'VPI (vacuum pressure impregnated)'),
      row('Rating', 'Up to 2000 kVA'),
      row('Insulation class', 'F (155 °C) and H (180 °C)'),
      row('Protection', 'Up to IP56'),
      row('Insulation', 'Void-free, with high mechanical strength'),
      row('Cooling medium', 'No insulating liquid'),
    ],
    faqs: [
      {
        question: 'What is a VPI dry-type transformer?',
        answer:
          'VPI stands for vacuum pressure impregnated. The windings are impregnated with resin under vacuum and pressure, which gives void-free insulation and high mechanical strength. The transformer uses no insulating liquid.',
      },
      {
        question: 'What is the largest dry-type transformer you make?',
        answer:
          'Tejaswini Industries makes VPI dry-type transformers up to 2000 kVA. Send the rating, voltage and installation location with your enquiry for a quotation.',
      },
      {
        question: 'What do insulation class F and H mean?',
        answer:
          'They are temperature classes for the insulation system. Class F is rated for 155 °C and class H for 180 °C. Both are offered, so state the class you need on the enquiry.',
      },
      {
        question: 'When should I choose a dry-type transformer instead of an oil-cooled one?',
        answer:
          'Choose dry-type for indoor installations where fire safety is the priority, because there is no oil to leak or burn. Oil-cooled distribution transformers are the usual choice for outdoor installations. We make both.',
      },
      {
        question: 'What does IP56 protection mean?',
        answer:
          'IP56 is an enclosure rating. The 5 means protected against dust, and the 6 means protected against powerful water jets. Our dry-type transformers are offered with protection up to IP56.',
      },
    ],
    relatedGuides: [GUIDE.kva],
    relatedProducts: ['distribution-transformers', 'lt-panels', 'ht-panels'],
  },

  /* --------------------------------------------------------------- HT panels */
  'ht-panels': {
    metaTitle: 'HT Panels with VCB, Hyderabad',
    metaDescription:
      'HT switchgear panels with vacuum circuit breakers rated 630-2000 A, 12/28/75 kV insulation, up to 26.3 kA rms. Made in Hyderabad.',
    shortAnswer:
      'HT panels are high-voltage switchgear that protect and control industrial circuits. Tejaswini Industries builds HT panels in Hyderabad with vacuum circuit breakers rated 630 to 2000 A, insulation level 12/28/75 kV and short-circuit capacity up to 26.3 kA rms, fitted with current and potential transformers and metering.',
    heroFacts: ["VCB 630 to 2000 A", "Insulation 12/28/75 kV", "Up to 26.3 kA rms"],
    quoteChecklist: ["Single-line diagram, or a list of incomers and feeders", "System voltage", "Breaker current rating and fault level", "Protection (relays, fuses) and metering needed", "Earth switch needed or not", "Delivery location"],
    sections: [
      {
        id: 'what-is-an-ht-panel',
        title: 'What is an HT panel?',
        paragraphs: [
          'An HT (high tension) panel is a switchgear assembly that switches, protects and measures a high-voltage circuit. Ours incorporate vacuum circuit breakers, current transformers, potential transformers and metering, with tripping by means of fuses and relays.',
        ],
      },
      {
        id: 'where-are-ht-panels-used',
        title: 'Where are HT panels used?',
        paragraphs: [
          'HT panels are used for the protection and control of high-voltage industrial circuits, for example where supply comes into a plant and where it is fed on to transformers and large loads. Our customers include industries, EPC and electrical contractors, MEP consultants and utilities.',
        ],
      },
      {
        id: 'ht-panel-specifications-and-standards',
        title: 'What are the key specifications and standards?',
        paragraphs: [
          'The table lists the published ratings. The design is compact and rugged, arc quenching is tested according to IS standards, and standard electrical and mechanical materials are used as per IS/IEC specification. A mechanically interlocked earth switch is available as an extra accessory.',
        ],
        table: true,
      },
      {
        id: 'how-to-choose-an-ht-panel',
        title: 'How do I choose an HT panel?',
        paragraphs: [
          'Start from your single-line diagram. Note the system voltage, the rated current of each incomer and feeder, the fault level the panel must withstand, and the protection you need (relays and fuses). Then state the instruments you want, such as ammeter and voltmeter with selector switches, and whether you need the earth switch.',
          'If the panel will feed a transformer, see our [distribution transformers](/products/distribution-transformers). For secondary distribution, compare it with a [ring main unit](/products/rmus).',
        ],
      },
      {
        id: 'why-buy-ht-panels-from-tejaswini-industries-hyderabad',
        title: 'Why buy HT panels from Tejaswini Industries in Hyderabad?',
        paragraphs: [
          'The panels are built in Hyderabad by a company that is ISO 9001:2015 certified, and the same company makes the transformers, RMUs and LT panels that connect to them. Electrical turnkey projects are also offered; see [services](/services).',
        ],
      },
    ],
    specsTable: [
      row('Vacuum circuit breaker rating', '630 to 2000 A'),
      row('Insulation level', '12/28/75 kV'),
      row('Rated short-circuit capacity', 'Up to 26.3 kA (rms)'),
      row('Current transformer accuracy class', '1 to 5P10'),
      row('Potential transformer accuracy class', '1'),
      row('Metering', 'Ammeter and voltmeter with selector switches'),
      row('Tripping', 'By fuses and relays'),
      row('Earth switch', 'Mechanically interlocked, available as an extra accessory'),
    ],
    faqs: [
      {
        question: 'What is an HT panel?',
        answer:
          'An HT panel is switchgear that protects, controls and measures a high-voltage circuit. Ours include vacuum circuit breakers, current and potential transformers and metering, with tripping by fuses and relays.',
      },
      {
        question: 'What ratings do your HT panels have?',
        answer:
          'Vacuum circuit breaker rating of 630 to 2000 A, insulation level 12/28/75 kV and rated short-circuit capacity up to 26.3 kA rms. Current transformers are accuracy class 1 to 5P10 and potential transformers are class 1.',
      },
      {
        question: 'What does an insulation level of 12/28/75 kV mean?',
        answer:
          'In the usual IEC convention it describes a 12 kV class panel that withstands 28 kV at power frequency and 75 kV lightning impulse. Confirm the values for your system voltage on the quotation.',
      },
      {
        question: 'Is an earth switch included in the HT panel?',
        answer:
          'A mechanically interlocked earth switch is available as an extra accessory. State on the enquiry if you need it.',
      },
      {
        question: 'What should I send to get a quotation for an HT panel?',
        answer:
          'Send the single-line diagram or a list of incomers and feeders, the system voltage, breaker current rating, fault level, protection and metering you need. Use the contact form or call or WhatsApp +91 92480 30362.',
      },
      {
        question: 'Can I buy the transformer and panels from the same company?',
        answer:
          'Yes. Tejaswini Industries makes distribution transformers, dry-type transformers, HT panels, LT panels, RMUs and APFC panels, and also takes up electrical turnkey projects.',
      },
    ],
    relatedGuides: [],
    relatedProducts: ['distribution-transformers', 'rmus', 'lt-panels'],
  },

  /* --------------------------------------------------------------- LT panels */
  'lt-panels': {
    metaTitle: 'LT Distribution Panels, Hyderabad',
    metaDescription:
      'LT distribution panels with a solid busbar system and on-load protected switching, made in Hyderabad. APFC panels also available.',
    shortAnswer:
      'LT panels are low-voltage distribution boards that route power and protect circuits inside a plant or building. Tejaswini Industries builds all types of LT distribution panels in Hyderabad, with a solid busbar system, on-load protected switching and no direct access to live parts. APFC (power factor correction) panels are also part of the range.',
    heroFacts: ["All types of LT panels", "Solid busbar system", "On-load protected switching", "APFC panels also offered"],
    quoteChecklist: ["Incoming supply and current rating", "Number and rating of outgoing feeders", "Fault level", "Metering needed", "APFC requirement and target power factor", "Delivery location"],
    sections: [
      {
        id: 'what-is-an-lt-panel',
        title: 'What is an LT panel?',
        paragraphs: [
          'An LT (low tension) panel is a distribution board on the low-voltage side of the supply. It receives power, usually from a transformer, and routes it to outgoing circuits through switching and protection devices.',
        ],
      },
      {
        id: 'where-are-lt-panels-used',
        title: 'Where are LT panels used?',
        paragraphs: [
          'LT panels provide power routing and circuit protection for complex facility networks and heavy machinery clusters. Typical buyers are industries, EPC and electrical contractors and MEP consultants.',
        ],
      },
      {
        id: 'lt-panel-features',
        title: 'What are the key features?',
        paragraphs: [
          'The panels are designed for easy operation and maintenance and to take little space. The table lists the construction features we publish. A numerical busbar rating is not listed on this page; state the current you need and we will confirm it in the quotation.',
        ],
        table: true,
      },
      {
        id: 'how-to-choose-an-lt-panel',
        title: 'How do I choose an LT panel?',
        paragraphs: [
          'List the incoming supply, the number and current rating of outgoing feeders, the fault level and the metering you need. If the panel will sit on the secondary of a transformer, work out the full-load current first; the [kVA rating guide](/blogs/' +
            GUIDE.kva +
            ') shows how. Say if you also need an APFC panel.',
          'Panels and transformers can come from one supplier: see [distribution transformers](/products/distribution-transformers) and [dry-type transformers](/products/dry-type-transformers).',
        ],
      },
      {
        id: 'why-buy-lt-panels-from-tejaswini-industries-hyderabad',
        title: 'Why buy LT panels from Tejaswini Industries in Hyderabad?',
        paragraphs: [
          'The panels are made in Hyderabad by a company that is ISO 9001:2015 certified, alongside transformers, HT panels and RMUs. Electrical turnkey projects are also offered; see [services](/services).',
        ],
      },
    ],
    specsTable: [
      row('Types', 'All types of LT distribution panels'),
      row('Busbar', 'Solid busbar system, which avoids loose connections'),
      row('Switching', 'On-load protected switching system'),
      row('Live parts', 'Not directly accessible'),
      row('Enclosure', 'Protection against bird nesting, leakage through bushing and corrosion'),
      row('Footprint', 'Consumes less space'),
      row('Other panels', 'APFC panels also offered'),
    ],
    faqs: [
      {
        question: 'What is an LT panel?',
        answer:
          'An LT panel is a low-voltage distribution board. It takes incoming power, usually from a transformer, and routes it to outgoing circuits with switching and protection devices.',
      },
      {
        question: 'What types of LT panel do you make?',
        answer:
          'Tejaswini Industries makes all types of LT distribution panels at Hyderabad. Send the incomer rating, number of feeders and protection you need for a quotation.',
      },
      {
        question: 'What is a solid busbar system?',
        answer:
          'A solid busbar system uses rigid busbars for the main connections. Our LT panels use it to avoid loose connections and to support reliable long-term operation.',
      },
      {
        question: 'Do you make APFC panels?',
        answer:
          'Yes. An APFC (automatic power factor correction) panel switches capacitors in and out to keep the power factor near its target. Send your load and target power factor and we will quote against it.',
      },
      {
        question: 'Are live parts accessible in your LT panels?',
        answer:
          'No. The panels are designed so that live parts are not directly accessible, and they include protection against bird nesting, leakage through bushing and corrosion.',
      },
      {
        question: 'How do I request an LT panel quotation?',
        answer:
          'Use the contact form, or call or WhatsApp +91 92480 30362, with the incoming supply, feeder list, fault level and any metering or APFC requirement.',
      },
    ],
    relatedGuides: [GUIDE.kva],
    relatedProducts: ['distribution-transformers', 'dry-type-transformers', 'ht-panels'],
  },

  /* -------------------------------------------------------------------- RMUs */
  rmus: {
    metaTitle: 'Ring Main Units (RMU), Hyderabad',
    metaDescription:
      '11 kV and 33 kV ring main units: load break switch, SFU and VCB versions, 630 A and 26.3 kA with earth switch. Made in Hyderabad.',
    shortAnswer:
      'A ring main unit (RMU) is compact, sealed medium-voltage switchgear used in secondary distribution networks. Tejaswini Industries makes 11 kV and 33 kV RMUs in Hyderabad as load break switch or switch-fuse units and as vacuum circuit breaker versions, including 630 A, 26.3 kA load break switches with earth switch and interlock.',
    heroFacts: ["11 kV and 33 kV", "Load break switch, SFU or VCB", "630 A, 26.3 kA load break switch"],
    quoteChecklist: ["System voltage (11 kV or 33 kV)", "Number and type of ways", "SFU or VCB on the transformer feeder", "Indoor or outdoor use", "Earth fault indicator needed or not", "Delivery location"],
    sections: [
      {
        id: 'what-is-a-ring-main-unit',
        title: 'What is a ring main unit?',
        paragraphs: [
          'A ring main unit is a compact, enclosed and sealed switchgear used for medium-voltage power distribution. It is an assembly of the switching, protection and metering devices needed, so it only needs installation and cable connection, which greatly reduces commissioning time.',
        ],
      },
      {
        id: 'where-are-rmus-used',
        title: 'Where are RMUs used?',
        paragraphs: [
          'RMUs are widely used in distribution systems, where they switch and protect cable feeders and the transformers connected to them. Indoor and outdoor types are available. Our customers include utilities, infrastructure developers, EPC and electrical contractors and industries.',
        ],
      },
      {
        id: 'rmu-specifications-and-standards',
        title: 'What are the key specifications?',
        paragraphs: [
          'The table lists the published options. A self-powered protection device with a microprocessor-based numerical relay provides over-current and earth fault protection.',
        ],
        table: true,
      },
      {
        id: 'how-to-choose-an-rmu',
        title: 'How do I choose an RMU?',
        paragraphs: [
          'State the system voltage (11 kV or 33 kV), the number and type of ways you need (ring cable switches and transformer feeders), and whether the transformer feeder should be protected by a fuse (SFU) or a vacuum circuit breaker. Add whether the unit is for indoor or outdoor use and whether you need an earth fault indicator.',
          'The transformer on the feeder is covered under [distribution transformers](/products/distribution-transformers). For incoming HT switchgear in a plant, see [HT panels](/products/ht-panels).',
        ],
      },
      {
        id: 'why-buy-rmus-from-tejaswini-industries-hyderabad',
        title: 'Why buy RMUs from Tejaswini Industries in Hyderabad?',
        paragraphs: [
          'RMUs are made in Hyderabad by a company that is ISO 9001:2015 certified, and the same works builds the transformers and panels they connect to. Electrical turnkey projects are also offered; see [services](/services).',
        ],
      },
    ],
    specsTable: [
      row('Voltage', '11 kV and 33 kV'),
      row('Switching options', 'Load break switch or SFU; vacuum circuit breaker (VCB, optional)'),
      row('Load break switch', '630 A, 26.3 kA, with earth switch and interlock'),
      row('Fault indication', 'Earth fault indicator with CBCT as per the electricity board standard'),
      row('Protection', 'Self-powered microprocessor-based numerical relay: over-current and earth fault'),
      row('Installation', 'Indoor and outdoor types'),
    ],
    faqs: [
      {
        question: 'What is a ring main unit (RMU)?',
        answer:
          'An RMU is compact, enclosed and sealed medium-voltage switchgear with the switching and protection devices in one package. It only needs installation and cable connection.',
      },
      {
        question: 'What voltages do your RMUs cover?',
        answer:
          'Tejaswini Industries makes ring main units for 11 kV and 33 kV, as load break switch or SFU units and as vacuum circuit breaker versions.',
      },
      {
        question: 'What is the difference between an SFU and a VCB unit?',
        answer:
          'An SFU is a switch-fuse unit, where a fuse protects the transformer feeder. A VCB version uses a vacuum circuit breaker with a relay instead. Both are offered, and the VCB type is optional.',
      },
      {
        question: 'Do you make indoor and outdoor RMUs?',
        answer:
          'Yes, both indoor and outdoor types of ring main units are available. State where it will be installed on the enquiry.',
      },
      {
        question: 'What is an earth fault indicator with CBCT?',
        answer:
          'An earth fault indicator shows that an earth fault has passed through the feeder. It works from a CBCT, a core-balance current transformer, and is supplied as per the electricity board standard.',
      },
      {
        question: 'What do I need to send to get an RMU quotation?',
        answer:
          'Send the voltage, the number and type of ways, whether you want SFU or VCB, indoor or outdoor use, and the site location through the contact form, or call or WhatsApp +91 92480 30362.',
      },
    ],
    relatedGuides: [],
    relatedProducts: ['distribution-transformers', 'ht-panels', 'lt-panels'],
  },
}

// Firestore does not allow nested arrays, so table rows are stored as { cells }.
for (const content of Object.values(productSeoContent)) {
  for (const section of content.sections) {
    if (section.extraTables) {
      section.extraTables = section.extraTables.map((table) => ({
        ...table,
        rows: table.rows.map((cells) => ({ cells })),
      }))
    }
  }
}

/** Products index page (`productsPage` document). */
export const productsPageContent = {
  _id: 'productsPage',
  _type: 'productsPage',
  metaTitle: 'Transformers and Panels, Hyderabad',
  metaDescription:
    'Distribution and dry-type transformers, HT and LT panels and ring main units made by Tejaswini Industries at Mallapur, Hyderabad.',
  shortAnswer:
    'Tejaswini Industries is a transformer and switchgear manufacturer at Mallapur, Hyderabad, Telangana. It makes BIS-approved distribution transformers, dry-type transformers, HT panels, LT panels, ring main units and APFC panels, and is ISO 9001:2015 certified. Customers are MEP consultants, EPC and electrical contractors, industries, infrastructure developers and utilities, mostly across India.',
  sections: [
    {
      id: 'what-products-does-tejaswini-industries-make',
      title: 'What products does Tejaswini Industries make?',
      paragraphs: ['The product range, each with its own page of specifications and questions:'],
      bullets: [
        '[Distribution transformers](/products/distribution-transformers): oil-cooled, 100 kVA to 2000 kVA, 11/22/33 kV, CRGO or amorphous core, copper or aluminium winding, OFTC or OLTC.',
        '[Dry-type transformers](/products/dry-type-transformers): VPI type up to 2000 kVA, insulation class F or H, protection up to IP56.',
        '[HT panels](/products/ht-panels): vacuum circuit breakers rated 630 to 2000 A, insulation level 12/28/75 kV.',
        '[LT panels](/products/lt-panels): LT distribution panels with a solid busbar system; APFC panels also offered.',
        '[Ring main units](/products/rmus): 11 kV and 33 kV, load break switch, SFU or VCB versions.',
      ],
      closing: [
        'Transformer repair and electrical turnkey projects are also offered; see [services](/services).',
      ],
    },
    {
      id: 'who-buys-from-tejaswini-industries',
      title: 'Who buys from Tejaswini Industries?',
      paragraphs: [
        'Our customers are MEP consultants, EPC and electrical contractors, industries, infrastructure developers and utilities, mostly across India. Projects in Hyderabad and the rest of Telangana are supplied from the works at Mallapur.',
      ],
    },
    {
      id: 'how-to-choose-the-right-product',
      title: 'How do I choose the right product?',
      paragraphs: ['Match the product to where it sits in the supply chain:'],
      bullets: [
        'Stepping 11, 22 or 33 kV supply down for use: a [distribution transformer](/products/distribution-transformers), or a [dry-type transformer](/products/dry-type-transformers) for indoor rooms where fire safety is the priority.',
        'Switching and protecting a high-voltage circuit in a plant: [HT panels](/products/ht-panels).',
        'Switching cable feeders and transformer feeders in a distribution network: [ring main units](/products/rmus).',
        'Distributing low-voltage power to loads: [LT panels](/products/lt-panels).',
      ],
      closing: [
        'For sizing and specification help, read the guides on [choosing the kVA rating](/blogs/how-to-choose-transformer-kva-rating-for-your-load), [IS 1180 efficiency levels](/blogs/is-1180-energy-efficiency-levels-explained), [amorphous vs CRGO cores](/blogs/amorphous-core-vs-crgo-core-distribution-transformer) and [OLTC vs off-circuit tap changers](/blogs/oltc-vs-off-circuit-tap-changer-distribution-transformer).',
      ],
    },
    {
      id: 'why-buy-from-a-hyderabad-manufacturer',
      title: 'Why buy transformers and panels from a Hyderabad manufacturer?',
      paragraphs: [
        'Everything on this page is made by Tejaswini Industries itself at Mallapur, Hyderabad, so you specify rating, voltage and options with the manufacturer. The company is ISO 9001:2015 certified and the site states a multi-stage quality check before deployment. To ask for a quotation, [contact us](/contact) or call or WhatsApp +91 92480 30362.',
      ],
    },
  ],
  faqs: [
    {
      question: 'What products does Tejaswini Industries manufacture?',
      answer:
        'Distribution transformers, dry-type transformers, HT panels, LT panels, ring main units and APFC panels, at Mallapur, Hyderabad, Telangana. The company also offers transformer repair and electrical turnkey projects.',
    },
    {
      question: 'Is Tejaswini Industries a manufacturer or a trader?',
      answer:
        'Tejaswini Industries is a manufacturer. The transformers and panels are made at its works at 3-13-109/1/1, FCI Road, Suryanagar, Mallapur, Hyderabad 500076.',
    },
    {
      question: 'Which certifications does Tejaswini Industries have?',
      answer:
        'The company is ISO 9001:2015 certified and makes BIS-approved distribution transformers. Ask for certificate details when you request a quotation.',
    },
    {
      question: 'Who are the customers of Tejaswini Industries?',
      answer:
        'MEP consultants, EPC and electrical contractors, industries, infrastructure developers and utilities, mostly across India.',
    },
    {
      question: 'What range of distribution transformers do you offer?',
      answer:
        'Oil-cooled distribution transformers from 100 kVA to 2000 kVA at 11 kV, 22 kV and 33 kV, with CRGO or amorphous cores, copper or aluminium windings and off-load or on-load tap changers.',
    },
    {
      question: 'How do I request a quotation?',
      answer:
        'Use the contact form with the product, rating, voltage and site location, or call or WhatsApp +91 92480 30362.',
    },
  ],
  relatedGuides: [GUIDE.kva, GUIDE.is1180, GUIDE.core, GUIDE.tap],
}
