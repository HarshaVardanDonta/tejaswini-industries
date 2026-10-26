/**
 * Blog articles for the Tejaswini Industries site.
 *
 * Source of truth for the baked blog content. scripts/seed-documents.mjs turns
 * these into `blogPost` documents, so they reach src/cms/active-content.ts
 * (prerendered HTML) and, through `npm run seed:firestore`, the admin panel.
 *
 * Paragraph text supports two inline marks: [link text](/path) and **bold**.
 * Photos are the owner's own, optimised copies live in public/images/blog/.
 */

const PUBLISHED = '2026-10-26'
const AUTHOR = 'Tejaswini Industries'
const PRODUCT_HREF = '/products/distribution-transformers'

export const photo = {
  frontWide: {
    url: '/images/blog/distribution-transformer-front-view-conservator-bushings-wide.webp',
    alt: 'Front view of an oil-filled distribution transformer with a TEJASWINI-branded conservator tank, three HV bushings on the top cover, red LV terminals and a radiator bank on each side, standing in a workshop bay.',
    width: 768,
    height: 432,
  },
  frontFull: {
    url: '/images/blog/distribution-transformer-front-view-conservator-bushings-full.webp',
    alt: 'Front view of an oil-filled distribution transformer in a workshop: conservator tank with a TEJASWINI nameplate, a blue silica gel breather, three HV bushings, four red LV terminals and radiator panels on both sides.',
    width: 768,
    height: 1024,
  },
  sideWide: {
    url: '/images/blog/oil-filled-distribution-transformer-side-view-wide.webp',
    alt: 'Oil-filled distribution transformer seen from the side in a workshop, with a TEJASWINI-branded conservator tank above the tank, a blue silica gel breather, radiator fins and a grey side-mounted cabinet.',
    width: 724,
    height: 407,
  },
  sideFull: {
    url: '/images/blog/oil-filled-distribution-transformer-side-view-full.webp',
    alt: 'Side view of an oil-filled distribution transformer on a workshop floor: TEJASWINI-branded conservator, blue silica gel breather, HV bushings on the top cover, radiator banks and a grey side-mounted cabinet.',
    width: 724,
    height: 962,
  },
  coreWide: {
    url: '/images/blog/wound-core-sections-packed-on-pallet-wide.webp',
    alt: 'Wound transformer core sections made of rolled steel strip, bound with tape and packed in plastic on a pallet in a workshop.',
    width: 768,
    height: 432,
  },
  radiatorsWide: {
    url: '/images/blog/primed-transformer-radiator-panels-stacked-wide.webp',
    alt: 'Stacked transformer radiator panels with a red-brown coating, with their header pipes visible, stored in a workshop.',
    width: 768,
    height: 432,
  },
  radiatorsFull: {
    url: '/images/blog/primed-transformer-radiator-panels-stacked-full.webp',
    alt: 'Four transformer radiator panels with a red-brown coating stacked one above the other in a workshop, header pipes visible on each panel.',
    width: 768,
    height: 1024,
  },
}

const cta = {
  title: 'Need a distribution transformer quote?',
  text: 'Send your kVA rating, HV and LV voltage, tap changer requirement and site location. Tejaswini Industries will reply with a quote for oil-filled distribution transformers from 100 kVA to 2000 kVA.',
}

const relatedProduct = {
  title: 'Distribution Transformers',
  capacity: '100 kVA to 2000 kVA',
  image: photo.frontWide,
  href: PRODUCT_HREF,
}

export const blogArticles = [
  /* ------------------------------------------------------------------ 1 */
  {
    slug: 'is-1180-energy-efficiency-levels-explained',
    title: 'IS 1180 Energy Efficiency Levels Explained: What to Specify for a Distribution Transformer',
    breadcrumbLabel: 'IS 1180 Efficiency Levels',
    metaTitle: 'IS 1180 Efficiency Levels Explained',
    metaDescription:
      'What IS 1180 (Part 1) covers, how its five energy efficiency levels relate to BEE stars, and what to write in a distribution transformer specification.',
    category: 'standards',
    categoryLabel: 'Standards & Efficiency',
    featured: true,
    cover: photo.frontWide,
    heroCaption:
      'An oil-filled distribution transformer in the workshop, front view. The photo shows the build, not a particular efficiency level or rating.',
    excerpt:
      'IS 1180 (Part 1) is the Indian standard for oil-immersed distribution transformers up to 2500 kVA. Here is what it covers, what the efficiency levels mean, and what to write in your specification.',
    intro:
      'IS 1180 (Part 1) is the Bureau of Indian Standards specification for oil-immersed distribution transformers up to and including 2500 kVA at system voltages up to 33 kV. It limits the total losses of each rating at 50 % and 100 % load, and groups those limits into energy efficiency levels. After Amendment No. 4 (March 2021) there are five levels, matching BEE labels from 1 star to 5 stars, and a higher level means lower permitted losses.',
    sections: [
      {
        id: 'what-is-1180-part-1',
        title: 'What IS 1180 (Part 1) covers',
        paragraphs: [
          'The full title is "Outdoor/Indoor Type Oil Immersed Distribution Transformers up to and including 2500 kVA, 33 kV, Part 1: Mineral Oil Immersed". The current text is the Fourth Revision of 2014, and it has been amended four times since (2016, 2017, 2019 and 2021). Part 3 of the same series, IS 1180 (Part 3), covers transformers filled with natural or synthetic ester liquid instead of mineral oil.',
          'The standard lists preferred ratings. For three-phase units above 200 kVA they are 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000 and 2500 kVA, and for units up to 200 kVA they run from 16 to 200 kVA. It also sets out voltage ratios, tapping ranges, bushings, fittings, tank strength, the tests a transformer must pass and the markings it must carry.',
          'IS 1180 is not the standard for power transformers. Those fall under the IS 2026 series, which IS 1180 also refers to for general requirements such as temperature rise and insulation levels. For a [distribution transformer](/products/distribution-transformers) in the 100 kVA to 2000 kVA range, IS 1180 is the document your specification should name.',
        ],
      },
      {
        id: 'total-loss',
        title: 'What "maximum total loss" means',
        paragraphs: [
          'A transformer wastes energy in two ways. **No-load loss** is the energy used by the core whenever the transformer is energised, loaded or not. **Load loss** is the heat produced in the windings and other parts by the current, and it rises roughly with the square of the load.',
          'IS 1180 does not limit the two separately. It gives one figure for each rating and level: the maximum total loss in watts, which is the no-load loss plus the load loss, at a reference temperature of 75 °C. Two figures are given per level, one at 50 % load and one at 100 % load.',
        ],
        subsections: [
          {
            id: 'why-two-loading-points',
            title: 'Why there are two loading points',
            paragraphs: [
              'Most distribution transformers run below full load for most of the year. A limit at 50 % load rewards a low no-load loss, because the core loss is a large part of the total at that loading. A limit at 100 % load keeps the winding losses in check. A design has to meet both.',
              'The published tables apply to transformers of the 11 kV class. For 22 kV and 33 kV classes the standard allows higher loss values, so do not compare a 33 kV offer against the 11 kV table.',
            ],
          },
        ],
      },
      {
        id: 'five-levels',
        title: 'The five energy efficiency levels and BEE stars',
        paragraphs: [
          'The original 2014 text had three levels. Amendment No. 4 replaced that with five, numbered 1 to 5 and corresponding to 1-star to 5-star transformers as labelled by the Bureau of Energy Efficiency. Level 1 allows the highest losses and Level 5 the lowest.',
          'The table shows how far apart the levels are for one rating. These figures are the maximum total losses for a 500 kVA three-phase transformer of the 11 kV class, taken from Table 6 of Amendment No. 4.',
        ],
        table: {
          headers: ['Level (BEE star)', 'Max total loss at 50 % load', 'Max total loss at 100 % load'],
          rows: [
            ['Level 1 (1 star)', '1,510 W', '4,300 W'],
            ['Level 2 (2 star)', '1,430 W', '4,100 W'],
            ['Level 3 (3 star)', '1,354 W', '3,909 W'],
            ['Level 4 (4 star)', '1,282 W', '3,727 W'],
            ['Level 5 (5 star)', '1,215 W', '3,554 W'],
          ],
        },
        closing: [
          'Because the numbering changed between the 2014 text and the 2021 amendment, always write the level together with the edition and amendment in the purchase order, or state the loss values in watts. "Level 1" on its own can be read two ways by two readers.',
          'BEE star labelling is a separate scheme from the BIS licence, with its own rules on which transformers must carry a label. If your buyer is a utility or a government department, its tender documents usually say which level or star rating is required.',
        ],
      },
      {
        id: 'choosing-a-level',
        title: 'How to choose a level',
        paragraphs: [
          'If a tender or utility specification names a level, that settles it. If the choice is yours, treat it as a lifetime cost question, not just a purchase price question.',
          'No-load loss is paid for every hour the transformer is energised, which is 8,760 hours in a year. Every 100 W of no-load loss avoided is 876 kWh a year (100 W × 8,760 h). Load loss depends on how heavily the transformer is loaded, so it matters most for units that run close to full load for long periods. Multiply the loss difference between two offers by your tariff and your expected years of service, then compare it with the difference in price.',
          'A transformer on a lightly loaded feeder gains most from a low no-load loss. A transformer that runs near its rating through most shifts gains most from low winding losses. The [amorphous versus CRGO core guide](/blogs/amorphous-core-vs-crgo-core-distribution-transformer) explains how the core material affects the first of those.',
        ],
      },
      {
        id: 'writing-the-specification',
        title: 'What to write in the specification',
        paragraphs: [
          'A specification that only says "BIS approved" leaves too much open. These are the lines that remove ambiguity:',
        ],
        bullets: [
          'The standard, part, edition and amendment, for example IS 1180 (Part 1) with Amendment No. 4.',
          'The energy efficiency level, or the guaranteed maximum losses in watts at 50 % and 100 % load.',
          'Rating in kVA, number of phases, HV and LV voltage, and vector group.',
          'Tap changer type and range. See the [OLTC versus off-circuit tap changer guide](/blogs/oltc-vs-off-circuit-tap-changer-distribution-transformer).',
          'Winding material (aluminium or copper) and core material (CRGO or amorphous), if you have a preference.',
          'The test reports you expect with the delivery, and whether you or your consultant will witness the tests.',
        ],
        closing: [
          'Ask each supplier to state the guaranteed losses in its offer, and check them against the table for the level you want. Tejaswini Industries makes oil-filled distribution transformers from 100 kVA to 2000 kVA in Hyderabad, with CRGO or amorphous cores, aluminium or copper windings, and off-circuit or on-load tap changers. Send your specification with the level you need and we will tell you what we can offer against it.',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is IS 1180?',
        answer:
          'IS 1180 is the Indian standard for distribution transformers. Part 1 covers oil-immersed transformers filled with mineral oil, up to and including 2500 kVA and 33 kV. It sets ratings, fittings, tests and the maximum total losses for each energy efficiency level.',
      },
      {
        question: 'Which IS 1180 efficiency level is the most efficient?',
        answer:
          'After Amendment No. 4 (2021), Level 5 allows the lowest losses and is the most efficient. Level 1 allows the highest losses. The levels correspond to BEE labels of 1 star to 5 stars. Check the edition and amendment you are quoting, because the 2014 text used three levels.',
      },
      {
        question: 'Is the IS 1180 level the same as the BEE star rating?',
        answer:
          'They are matched: Levels 1 to 5 correspond to 1-star to 5-star transformers. BEE star labelling is a separate scheme with its own rules on which transformers need a label, so confirm what your buyer or utility requires.',
      },
      {
        question: 'Does IS 1180 apply to transformers above 2500 kVA?',
        answer:
          'No. IS 1180 (Part 1) stops at 2500 kVA and 33 kV. Larger power transformers are covered by the IS 2026 series.',
      },
    ],
  },

  /* ------------------------------------------------------------------ 2 */
  {
    slug: 'amorphous-core-vs-crgo-core-distribution-transformer',
    title: 'Amorphous Core vs CRGO Core Distribution Transformers: Losses, Cost and When Each Fits',
    breadcrumbLabel: 'Amorphous vs CRGO Core',
    metaTitle: 'Amorphous vs CRGO Core Transformers',
    metaDescription:
      'How amorphous and CRGO cores differ in no-load loss, price and suitability, and how to decide which one suits the way your distribution transformer is loaded.',
    category: 'selection',
    categoryLabel: 'Selection Guides',
    cover: photo.coreWide,
    heroCaption:
      'Wound core sections made of rolled steel strip, packed in plastic on a pallet in the workshop. The photo does not show which core material or rating these sections are for.',
    excerpt:
      'Amorphous cores cut no-load loss but cost more to buy. CRGO is the usual choice. Which one pays off depends on how your transformer is loaded.',
    intro:
      'An amorphous core usually gives a much lower no-load loss than a CRGO core, at a higher purchase price. Published studies commonly report no-load loss reductions of roughly 50 % to 70 %, depending on the design and what it is compared with. The saving matters most on a transformer that stays energised all year and carries a light load. A transformer that runs near full load for long hours gains less, because its losses come mostly from the windings.',
    sections: [
      {
        id: 'what-the-core-does',
        title: 'What the core does and why its material matters',
        paragraphs: [
          'The core carries the magnetic flux that links the primary and secondary windings. Every time the transformer is energised, the core is being magnetised and demagnetised 50 times a second, and that wastes a little energy as heat. This is the no-load loss, and it is there whether the transformer carries 5 % of its rating or 95 %.',
          'Core material is the main thing that sets the size of that loss. The two materials used in oil-filled [distribution transformers](/products/distribution-transformers) are CRGO and amorphous metal.',
        ],
      },
      {
        id: 'crgo',
        title: 'CRGO core',
        paragraphs: [
          'CRGO stands for cold-rolled grain-oriented silicon steel. It is rolled into thin sheets with a crystal structure that guides the magnetic flux along the rolling direction. IS 3024 is the Indian standard for grain-oriented electrical steel sheet and strip.',
          'CRGO is the established choice for distribution transformers. Manufacturers know it well, it is widely available, and a CRGO transformer costs less to buy than an amorphous one of the same rating. Better grades of CRGO lower the loss further, at a higher steel price.',
        ],
      },
      {
        id: 'amorphous',
        title: 'Amorphous core',
        paragraphs: [
          'Amorphous metal is made by cooling molten alloy so quickly that it does not form a crystal structure. It is produced as a very thin ribbon, about a tenth of the thickness of silicon steel sheet. The non-crystalline structure and the thin ribbon both reduce the energy lost in magnetising the core.',
          'The trade-offs are cost and handling. The ribbon is more expensive and harder to work with than steel sheet, which is why amorphous transformers cost more. Some designs also end up larger or heavier for the same rating, and some sources note a higher inrush current when the transformer is energised, which is worth discussing if the upstream protection settings are tight.',
        ],
      },
      {
        id: 'comparison',
        title: 'Side-by-side comparison',
        paragraphs: [
          'Core material changes the no-load loss. It does not set the load loss, which depends on the winding design and conductor. Aluminium or copper windings are a separate choice from the core.',
        ],
        table: {
          headers: ['Point', 'CRGO core', 'Amorphous core'],
          rows: [
            ['No-load loss', 'Higher', 'Much lower; published studies often report about 50 % to 70 % less'],
            ['Load loss', 'Set by the windings', 'Set by the windings'],
            ['Purchase price', 'Lower', 'Higher'],
            ['Size and weight', 'Usually more compact', 'Can be larger or heavier for the same rating'],
            ['Best fit', 'Transformers loaded heavily for long hours, or where first cost decides', 'Transformers energised all year with light or variable load'],
          ],
        },
      },
      {
        id: 'when-amorphous-pays-off',
        title: 'When an amorphous core pays off',
        paragraphs: [
          'The payback comes from the energy saved on no-load loss. A transformer is energised for 8,760 hours in a year, so each 100 W of no-load loss saved avoids 876 kWh a year. Multiply that by your tariff, then divide the extra purchase price by the yearly saving to get a simple payback period in years.',
          'The calculation favours amorphous cores where the transformer is lightly loaded much of the time: a feeder serving mostly daytime load, a site with long idle periods, or a transformer sized with generous spare capacity. It also favours them where the tariff is high and the transformer is expected to serve for many years.',
        ],
        subsections: [
          {
            id: 'when-crgo-is-the-better-choice',
            title: 'When CRGO is the better choice',
            paragraphs: [
              'If the transformer carries close to its rating through two or three shifts a day, winding losses dominate and the no-load saving is a smaller share of the total. If the budget is fixed, or the foundation, plinth or room is tight on space and weight, CRGO is often the practical answer.',
            ],
          },
        ],
        figure: {
          ...photo.sideFull,
          caption:
            'A finished oil-filled distribution transformer in the workshop. The core sits inside the tank under the top cover, so its material cannot be told from the outside. Always state it in the specification.',
          maxWidth: 'md',
        },
      },
      {
        id: 'core-and-is-1180',
        title: 'Core material and the IS 1180 efficiency levels',
        paragraphs: [
          'IS 1180 (Part 1) limits the maximum total loss for each efficiency level. It does not require a particular core material. A manufacturer can meet a level with CRGO or with amorphous metal, and the higher levels are generally easier to reach with a low-loss core. The [IS 1180 efficiency levels guide](/blogs/is-1180-energy-efficiency-levels-explained) explains how to read the loss tables.',
          'Tejaswini Industries builds oil-filled distribution transformers from 100 kVA to 2000 kVA in Hyderabad with either CRGO or amorphous cores, and with aluminium or copper windings. Send us the rating, voltage, how the transformer will be loaded and the efficiency level you need, and we will confirm the options for your rating in the quote.',
        ],
      },
    ],
    faqs: [
      {
        question: 'Is an amorphous core transformer better than a CRGO transformer?',
        answer:
          'It has a lower no-load loss, so it wastes less energy when lightly loaded or idle. It also costs more to buy. Whether it is better depends on how the transformer is loaded, your tariff and how long you expect it to serve.',
      },
      {
        question: 'How much lower are the losses with an amorphous core?',
        answer:
          'Published studies commonly report no-load loss reductions of roughly 50 % to 70 % compared with grain-oriented silicon steel, depending on the design. The exact figure for a given transformer should come from the guaranteed loss values in the manufacturer offer.',
      },
      {
        question: 'Does the core material change the load loss?',
        answer:
          'No. Load loss comes mainly from the current in the windings, so it depends on the winding design and on whether the windings are aluminium or copper.',
      },
      {
        question: 'Can I get both core types from Tejaswini Industries?',
        answer:
          'Tejaswini Industries offers CRGO and amorphous cores on its distribution transformers from 100 kVA to 2000 kVA. Availability for a specific rating and voltage is confirmed in the quote.',
      },
    ],
  },

  /* ------------------------------------------------------------------ 3 */
  {
    slug: 'oltc-vs-off-circuit-tap-changer-distribution-transformer',
    title: 'OLTC vs Off-Circuit Tap Changer (OFTC): Which Distribution Transformer Do You Need?',
    breadcrumbLabel: 'OLTC vs Off-Circuit Tap Changer',
    metaTitle: 'OLTC vs Off-Circuit Tap Changer',
    metaDescription:
      'The difference between an on-load tap changer (OLTC) and an off-circuit or off-load tap changer (OFTC) on a distribution transformer, and when the extra cost is justified.',
    category: 'selection',
    categoryLabel: 'Selection Guides',
    cover: photo.sideWide,
    heroCaption:
      'A finished oil-filled distribution transformer in the workshop, seen from the side. The tap changer type depends on the order, and this photo is not a statement about what this unit has.',
    excerpt:
      'An OLTC changes the voltage ratio while the transformer is carrying load. An off-circuit tap changer needs the transformer switched off. Here is how to choose.',
    intro:
      'A tap changer adjusts the turns ratio of a transformer so its secondary voltage can be corrected. An off-circuit tap changer, also written OFTC, OCTC or off-load tap changer, can only be moved when the transformer is de-energised. An on-load tap changer (OLTC) changes tap while the transformer is carrying load, usually under an automatic voltage regulator. Choose an OLTC when the supply voltage varies enough to need regular correction. Choose an off-circuit tap changer when you can set the tap once and leave it.',
    sections: [
      {
        id: 'what-a-tap-changer-does',
        title: 'What a tap changer does',
        paragraphs: [
          'The voltage on the low-voltage side of a transformer depends on the incoming voltage and on the turns ratio. If the incoming 11 kV or 33 kV supply runs high or low, the secondary voltage follows it. A tap changer lets you add or remove turns on the high-voltage winding so the secondary voltage comes back to where your equipment needs it.',
          'The names cause confusion because the same device is called by several. "Off-circuit", "off-load" and "de-energised" tap changer, and the abbreviations OCTC and OFTC, all mean a tap changer that must be moved with the transformer isolated. The Tejaswini Industries site uses "off-load".',
        ],
      },
      {
        id: 'off-circuit-tap-changer',
        title: 'Off-circuit tap changer (OFTC)',
        paragraphs: [
          'This is the standard fitting on distribution transformers. A handle or selector on the tank is moved to a different tap position with the transformer isolated from both the HV and LV sides. It is simple, has few moving parts and needs little attention.',
          'IS 1180 (Part 1) gives the standard off-circuit tapping range on the HV winding. For three-phase transformers up to 200 kVA it is +2.5 % to −5 % in steps of 2.5 %. For ratings above 200 kVA up to 2500 kVA it is +5 % to −10 % in steps of 2.5 %. Other ranges and steps can be agreed between buyer and supplier.',
        ],
        subsections: [
          {
            id: 'changing-a-tap-safely',
            title: 'Changing an off-circuit tap safely',
            paragraphs: [
              'Never move an off-circuit tap changer while the transformer is energised. Isolate and earth both sides under your site permit-to-work procedure, lock the handle in the new position, check that the position indicator matches, measure the secondary voltage when the transformer is re-energised, and record the tap used. Only qualified electrical staff should do this.',
            ],
          },
        ],
      },
      {
        id: 'on-load-tap-changer',
        title: 'On-load tap changer (OLTC)',
        paragraphs: [
          'An OLTC changes tap without interrupting the load. It does this with a switching mechanism that moves from one tap to the next while current keeps flowing, usually driven by a motor and controlled by a voltage regulating relay that holds the secondary voltage inside a set band.',
          'IS 1180 notes that on-load tap changers may be provided on ratings of 500 kVA and above, for example for HV variation from +5 % to −15 %. The step size and control arrangement should be written into the specification.',
          'The extra capability brings extra cost, extra parts and extra maintenance. The switching mechanism, its oil and its contacts need periodic inspection, and the drive and control circuit need a reliable auxiliary supply.',
        ],
      },
      {
        id: 'side-by-side',
        title: 'Side-by-side comparison',
        paragraphs: [],
        table: {
          headers: ['Point', 'Off-circuit (OFTC)', 'On-load (OLTC)'],
          rows: [
            ['When it can be changed', 'Only with the transformer isolated', 'While carrying load'],
            ['Typical control', 'Manual handle or selector', 'Motor drive, often automatic'],
            ['Cost', 'Lower', 'Higher'],
            ['Maintenance', 'Minimal', 'Periodic inspection of the mechanism and oil'],
            ['Best when', 'Supply voltage is stable and set once', 'Supply voltage swings and an outage to change tap is costly'],
          ],
        },
      },
      {
        id: 'how-to-decide',
        title: 'How to decide',
        paragraphs: [
          'Start by measuring the incoming voltage over a few weeks, at different times of day and different seasons. If it stays inside a narrow band, an off-circuit tap changer set at commissioning is enough, and a planned shutdown once a year can adjust it.',
          'An OLTC makes sense when the HV supply swings widely during the day, when the site is at the end of a long feeder, or when the process load cannot tolerate voltage excursions and cannot be stopped to change a tap. It is also worth considering where load grows by stages and the voltage drop changes with it.',
          'If only a few sensitive loads are affected, a voltage stabiliser at those loads can be cheaper than an OLTC on the whole transformer. An OLTC corrects the whole LV bus, so it is the better answer when the entire site needs a steadier voltage.',
        ],
      },
      {
        id: 'what-to-state',
        title: 'What to state in the order',
        paragraphs: ['Whichever type you choose, put these points in the specification:'],
        bullets: [
          'Tap changer type: off-circuit with external handle and locking, or on-load.',
          'Which winding is tapped (normally HV), the total range and the step size.',
          'For an OLTC: manual or automatic control, the auxiliary supply voltage, and any remote position indication.',
          'Where the tap position indicator should be readable from.',
        ],
        closing: [
          'Tejaswini Industries offers both off-load and on-load tap changer options on its [distribution transformers](/products/distribution-transformers), from 100 kVA to 2000 kVA. For rating-specific advice, [send us your voltage readings and rating](/contact) and we will suggest a tap arrangement in the quote. Related reading: [how to choose the kVA rating](/blogs/how-to-choose-transformer-kva-rating-for-your-load).',
        ],
      },
    ],
    faqs: [
      {
        question: 'What is the difference between OLTC and OFTC?',
        answer:
          'An OFTC (off-circuit or off-load tap changer) can only be moved when the transformer is switched off. An OLTC (on-load tap changer) changes tap while the transformer carries load, usually automatically.',
      },
      {
        question: 'Is OCTC the same as OFTC?',
        answer:
          'Yes. OCTC (off-circuit tap changer), OFTC and off-load tap changer all describe a tap changer that must be operated with the transformer de-energised.',
      },
      {
        question: 'Can an off-circuit tap changer be changed while the transformer is live?',
        answer:
          'No. It is not designed to break current and operating it live can cause arcing and serious damage. Isolate and earth the transformer first.',
      },
      {
        question: 'Does an OLTC need more maintenance?',
        answer:
          'Yes. The switching mechanism, its oil and the motor drive need periodic inspection, which an off-circuit tap changer does not.',
      },
    ],
  },

  /* ------------------------------------------------------------------ 4 */
  {
    slug: 'how-to-choose-transformer-kva-rating-for-your-load',
    title: 'How to Choose the kVA Rating of a Distribution Transformer for Your Load',
    breadcrumbLabel: 'Choosing the kVA Rating',
    metaTitle: 'How to Choose a Transformer kVA Rating',
    metaDescription:
      'A step-by-step method to size a distribution transformer from connected load, demand factor, power factor and growth, with a worked example and the standard IS 1180 ratings.',
    category: 'selection',
    categoryLabel: 'Selection Guides',
    cover: photo.radiatorsWide,
    heroCaption:
      'Stacked radiator panels in the workshop. Radiators carry away the heat produced by the transformer losses, which is why sustained overload shortens transformer life.',
    excerpt:
      'Work from connected load to demand, convert kW to kVA with the power factor, add room for growth, then pick the next standard rating.',
    intro:
      'To choose a transformer rating, take your maximum demand in kW, divide it by the power factor to get kVA, add a margin for growth and motor starting, and select the next standard rating above that figure. The rating must cover the demand you expect, not the sum of every nameplate on site. A transformer that is too small overheats and ages quickly. One that is far too large costs more and wastes energy in no-load loss.',
    sections: [
      {
        id: 'kva-and-kw',
        title: 'kVA, kW and power factor',
        paragraphs: [
          'A transformer is rated in kVA because its heating depends on the current it carries, and current depends on apparent power, not only on the useful power in kW. The two are linked by the power factor: kW = kVA × power factor, so kVA = kW ÷ power factor.',
          'A load of 100 kW at a power factor of 0.9 needs 111 kVA, and the same 100 kW at a power factor of 0.8 needs 125 kVA. Improving the power factor with correction capacitors reduces the kVA the transformer must supply.',
        ],
      },
      {
        id: 'sizing-steps',
        title: 'Five steps to size the transformer',
        paragraphs: [],
        subsections: [
          {
            id: 'step-connected-load',
            title: '1. List the connected load',
            paragraphs: [
              'Add up the rated kW of motors, lighting, air conditioning, process equipment and everything else that will be fed from the transformer. Include loads you will add in the next phase if they are planned.',
            ],
          },
          {
            id: 'step-demand-factor',
            title: '2. Apply a demand factor',
            paragraphs: [
              'Not everything runs at once or at full rating. The demand factor is the ratio of the maximum demand to the connected load. Use your own operating data or your consultant figure. If you have a utility maximum demand record from a similar plant, use that.',
            ],
          },
          {
            id: 'step-power-factor',
            title: '3. Convert to kVA',
            paragraphs: [
              'Divide the maximum demand in kW by the power factor at the transformer. Use the power factor you will actually achieve, including the effect of any capacitor bank.',
            ],
          },
          {
            id: 'step-margin',
            title: '4. Allow for growth and starting loads',
            paragraphs: [
              'Add a margin for expected growth. Check the largest motor: a direct-on-line start draws several times the running current and can pull the voltage down. Large motors, variable-speed drives and other non-linear loads may justify a larger rating or a different design, so discuss them with the manufacturer.',
            ],
          },
          {
            id: 'step-standard-rating',
            title: '5. Pick the next standard rating',
            paragraphs: [
              'IS 1180 (Part 1) lists the preferred ratings. For three-phase transformers above 200 kVA they are 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000 and 2500 kVA. Up to 200 kVA they run from 16 to 200 kVA, including 100 and 160. Choose the first standard rating at or above your calculated kVA.',
            ],
          },
        ],
      },
      {
        id: 'worked-example',
        title: 'A worked example',
        paragraphs: [
          'The numbers below are assumed only to show the arithmetic. They are not a recommendation for your site.',
        ],
        table: {
          headers: ['Step', 'Calculation', 'Result'],
          rows: [
            ['Connected load', 'Given', '320 kW'],
            ['Maximum demand', '320 kW × 0.8 demand factor', '256 kW'],
            ['Apparent power', '256 kW ÷ 0.9 power factor', '284 kVA'],
            ['With 20 % growth', '284 kVA × 1.2', '341 kVA'],
            ['Standard rating', 'Next standard rating above 341 kVA', '400 kVA'],
          ],
        },
        closing: [
          'Going one step down to 315 kVA would leave the transformer running above its rating at the assumed peak. Going up to 500 kVA would add cost and no-load loss for capacity that the stated growth does not need.',
        ],
        figure: {
          ...photo.frontFull,
          caption:
            'Front view of an oil-filled distribution transformer in the workshop. The rating is on the nameplate, and it should match the kVA you specified.',
          maxWidth: 'md',
        },
      },
      {
        id: 'full-load-current',
        title: 'Check the full-load current',
        paragraphs: [
          'Once you have a rating, check the current it implies so that the LV breaker, cables or busbars are sized correctly. Tejaswini Industries also builds [LT panels](/products/lt-panels) for the low-voltage side. For a three-phase transformer, full-load current in amperes is kVA × 1000 ÷ (√3 × line voltage in volts).',
          'For a 500 kVA transformer with a 433 V no-load secondary, that is about 667 A on the LV side. Use the actual rated voltage from the nameplate, and let your electrical designer size the protection, because overload and short-circuit settings depend on the whole installation.',
        ],
      },
      {
        id: 'too-small-too-large',
        title: 'What happens if you get it wrong',
        paragraphs: [
          'Running a transformer above its rating for long periods raises winding and oil temperatures, and insulation ages faster as temperature rises. Loading guides such as IS 2026 (Part 7) describe how much overload a transformer can take for how long, but they are for planned emergencies, not for routine operation.',
          'An oversized transformer is safe but wasteful. Its core is energised all the time, so a bigger core means a bigger no-load loss, and it costs more to buy. For a short list of loss and tap changer choices once the rating is fixed, read the guides on [IS 1180 efficiency levels](/blogs/is-1180-energy-efficiency-levels-explained) and the [OLTC versus off-circuit tap changer](/blogs/oltc-vs-off-circuit-tap-changer-distribution-transformer).',
          'Tejaswini Industries makes oil-filled [distribution transformers](/products/distribution-transformers) from 100 kVA to 2000 kVA in Hyderabad and supplies projects across Telangana. For an indoor room where fire safety is the priority, ask about our [dry-type transformers](/products/dry-type-transformers) as well. If you are unsure about the rating, [send us your connected load, power factor and site details](/contact) and we will review them with you before you commit to a size.',
        ],
      },
    ],
    faqs: [
      {
        question: 'How do I convert kW to kVA for a transformer?',
        answer:
          'Divide the kW by the power factor. For example, 100 kW at a power factor of 0.9 is about 111 kVA. Choose a standard transformer rating at or above that figure, with a margin for growth.',
      },
      {
        question: 'What size transformer do I need for a 100 kW load?',
        answer:
          'At a power factor of 0.9, a 100 kW maximum demand is about 111 kVA. That is above the 100 kVA standard rating, so the next standard rating, 160 kVA, would be the usual choice, and more if you expect growth or large motor starts.',
      },
      {
        question: 'Should I add spare capacity when choosing a transformer?',
        answer:
          'Add a margin for growth you have planned, but avoid a large unplanned margin. An oversized transformer costs more and has a higher no-load loss. Size for expected demand, then pick the next standard rating.',
      },
      {
        question: 'Can a transformer run above its rating for a short time?',
        answer:
          'Loading guides such as IS 2026 (Part 7) allow planned overloads for limited periods, at the cost of faster insulation ageing. Do not rely on overload for routine operation, and consult the manufacturer before you plan for it.',
      },
    ],
  },

  /* ------------------------------------------------------------------ 5 */
  {
    slug: 'distribution-transformer-inspection-checklist-before-dispatch-and-at-site',
    title: 'Distribution Transformer Checklist: What to Inspect Before Dispatch and at Site',
    breadcrumbLabel: 'Inspection Checklist',
    metaTitle: 'Transformer Inspection Checklist',
    metaDescription:
      'A practical checklist for an oil-filled distribution transformer: nameplate, test reports and fittings before dispatch, and delivery, oil, breather and earthing checks at site.',
    category: 'inspection',
    categoryLabel: 'Inspection & Site',
    cover: photo.frontWide,
    heroCaption:
      'Front view of an oil-filled distribution transformer. The conservator, silica gel breather, HV bushings, LV terminals and radiators are all points to check.',
    excerpt:
      'Check the nameplate and test reports before the transformer leaves the works, then the oil level, breather, bushings and earthing before you energise it at site.',
    intro:
      'Most transformer problems that show up in the first weeks are visible or measurable before energising: a nameplate that does not match the order, a leak from transit, a saturated breather, a missing earth connection or a low insulation resistance. This checklist covers what to inspect at the manufacturer before dispatch, what to check on delivery, and what to confirm before the first switch-on. It is general guidance for an oil-filled distribution transformer. Follow your utility rules, site procedures and the manufacturer instructions.',
    sections: [
      {
        id: 'before-dispatch',
        title: 'Before dispatch: at the works',
        paragraphs: [
          'If you or your consultant visit the works, or review the documents remotely, these checks catch most specification mismatches while they are still cheap to fix.',
        ],
        subsections: [
          {
            id: 'nameplate-and-documents',
            title: 'Nameplate and documents',
            checklist: [
              {
                label: 'Rating plate:',
                text: 'kVA, number of phases, HV and LV voltage, vector group, impedance, tap range, cooling, serial number and year match the purchase order.',
              },
              {
                label: 'Standard:',
                text: 'the plate and the test report name the standard you ordered, such as IS 1180 (Part 1).',
              },
              {
                label: 'Test report:',
                text: 'routine test results for this serial number are present, with the guaranteed losses beside the measured values.',
              },
            ],
          },
          {
            id: 'routine-tests',
            title: 'Routine tests to expect on the report',
            paragraphs: [
              'A routine test report for a distribution transformer normally includes winding resistance, voltage ratio and phase displacement (vector group), impedance voltage and load loss, no-load loss and no-load current, insulation resistance, a separate-source power-frequency withstand test, an induced overvoltage test, and an oil leakage or pressure test on the tank. Confirm the exact list against IS 1180 and your purchase specification, and ask to witness the tests if the order requires it.',
            ],
          },
          {
            id: 'physical-condition',
            title: 'Physical condition',
            checklist: [
              {
                label: 'Paint and tank:',
                text: 'no dents, scratches through to bare metal, or weld defects, and gasketed joints show no seepage.',
              },
              {
                label: 'Bushings:',
                text: 'no chips or cracks in the porcelain, terminals tight and undamaged.',
              },
              {
                label: 'Conservator and gauge:',
                text: 'the oil level gauge is readable and the level is correct for the oil temperature.',
              },
              {
                label: 'Breather:',
                text: 'silica gel is fresh and the oil seal is in place.',
              },
              {
                label: 'Radiators and valves:',
                text: 'fitted correctly with no leaks at flanges, and the drain and sampling valves are closed and capped.',
              },
              {
                label: 'Earthing and lifting:',
                text: 'earthing terminals and lifting lugs are present and undamaged.',
              },
              {
                label: 'Tap changer:',
                text: 'the position indicator works, and the handle can be locked in position.',
              },
            ],
          },
        ],
        figure: {
          ...photo.sideFull,
          caption:
            'Side view of an oil-filled distribution transformer in the workshop, with the conservator, the blue silica gel breather, the bushings, a radiator bank and a side-mounted cabinet visible. Each of these is part of a pre-dispatch walk-round.',
          maxWidth: 'md',
        },
      },
      {
        id: 'transport-and-delivery',
        title: 'Transport and delivery',
        paragraphs: [
          'Check the packing before the unit leaves: bushings protected, loose parts tied down, and the load secured on the vehicle. Lift only at the lifting lugs and never from bushings, radiators or pipework.',
          'On arrival, inspect before you sign. Look for oil on the tank or the vehicle bed, bent radiators, damaged bushings and signs of impact. Note any damage on the delivery document and photograph it. Store the transformer upright on firm, level ground, away from water collection, until it is installed.',
        ],
        figure: {
          ...photo.radiatorsFull,
          caption:
            'Radiator panels stacked in the workshop. On delivery, look at radiators for dents, damaged flanges and oil seepage, since they are among the parts most exposed in transit.',
          maxWidth: 'md',
        },
      },
      {
        id: 'before-energising',
        title: 'At site, before energising',
        paragraphs: [
          'Do these checks with the transformer isolated, and keep a written record of each reading.',
        ],
        subsections: [
          {
            id: 'site-checks',
            title: 'Pre-commissioning checks',
            checklist: [
              {
                label: 'Insulation resistance:',
                text: 'measure HV to LV, HV to earth and LV to earth with an insulation tester, and record the results with the oil temperature.',
              },
              {
                label: 'Oil:',
                text: 'confirm the oil level, and draw an oil sample for a breakdown voltage (BDV) test if the transformer has been stored or has been moved a long way.',
              },
              {
                label: 'Breather:',
                text: 'check the silica gel colour and the oil seal. Common gel is blue when dry and turns pink once it has absorbed moisture. Some gel types use other colours, so follow the manufacturer note.',
              },
              {
                label: 'Valves and plugs:',
                text: 'remove any transit plugs or blanks, and make sure valves between the conservator and the tank are open where they are fitted.',
              },
              {
                label: 'Earthing:',
                text: 'connect the tank and the LV neutral to the site earth as per the design, and check the earth resistance meets your requirement.',
              },
              {
                label: 'Tap position:',
                text: 'set the tap for the measured incoming voltage, lock it, and check all three phases are on the same position.',
              },
              {
                label: 'Terminations:',
                text: 'HV and LV cable or busbar connections are tight, phase sequence is correct, and protection (fuses or breaker, and any surge arresters) is set.',
              },
            ],
          },
        ],
        alert: {
          title: 'Isolate before you inspect',
          message:
            'Do not touch bushings, terminals or the tap changer on a transformer that might be live. Isolate, test for dead, and earth before any work, and use qualified electrical staff and your site permit-to-work procedure.',
        },
      },
      {
        id: 'first-days',
        title: 'After energising',
        paragraphs: [
          'Energise on no load first, listen for abnormal noise and check the secondary voltage on every phase. Then load the transformer progressively. During the first days, walk round regularly and look for oil seepage, abnormal temperature and breather condition.',
          'After that, a regular walk-round and periodic oil testing are the core of maintenance. IS 10028 (Part 3) is the Indian code of practice for transformer maintenance, and your utility may have its own schedule.',
          'Tejaswini Industries builds oil-filled [distribution transformers](/products/distribution-transformers) from 100 kVA to 2000 kVA in Hyderabad. If you want a pre-dispatch inspection arranged for an order, or a document list agreed before the order is placed, [contact us](/contact). To choose the right rating first, read [how to choose the kVA rating](/blogs/how-to-choose-transformer-kva-rating-for-your-load).',
        ],
      },
    ],
    faqs: [
      {
        question: 'What should I check on a distribution transformer before energising it?',
        answer:
          'Check insulation resistance, oil level and condition, the silica gel breather, that transit plugs are removed, the earthing connections, the tap position on all three phases, and that terminations and protection are correct. Record every reading.',
      },
      {
        question: 'What colour should the silica gel in a transformer breather be?',
        answer:
          'The common type is blue when dry and turns pink once it has absorbed moisture, which means it should be replaced or reactivated. Some gel types use other colours, so follow the manufacturer note.',
      },
      {
        question: 'Why does the oil level matter?',
        answer:
          'Oil insulates the windings and carries heat to the tank and radiators. A low level can leave windings exposed and reduce cooling. The correct level depends on the oil temperature, so read the gauge against its temperature markings.',
      },
      {
        question: 'Can I lift a transformer by its bushings or radiators?',
        answer:
          'No. Lift only at the lifting lugs. Bushings and radiators are not designed to carry the weight of the transformer.',
      },
    ],
  },
]

/** Words that count toward reading time and word checks. */
function articleText(article) {
  const parts = [article.intro]
  for (const section of article.sections) {
    parts.push(section.title, ...(section.paragraphs ?? []), ...(section.bullets ?? []), ...(section.closing ?? []))
    for (const sub of section.subsections ?? []) {
      parts.push(sub.title, ...(sub.paragraphs ?? []))
      for (const item of sub.checklist ?? []) parts.push(item.label, item.text)
    }
    if (section.table) {
      parts.push(...section.table.headers)
      for (const row of section.table.rows) parts.push(...row)
    }
    if (section.alert) parts.push(section.alert.title, section.alert.message)
    if (section.figure) parts.push(section.figure.caption)
  }
  for (const faq of article.faqs) parts.push(faq.question, faq.answer)
  return parts.join(' ')
}

export function countWords(article) {
  return articleText(article).split(/\s+/).filter(Boolean).length
}

function readTime(article) {
  return `${Math.max(1, Math.round(countWords(article) / 200))} min read`
}

const imageDoc = (image, alt) => ({ _type: 'imageWithUrl', url: image.url, alt: alt ?? image.alt })

export function buildBlogDocuments() {
  return blogArticles.map((article) => {
    // closing are rendered after bullets/tables, so keep them as a separate array
    const sections = article.sections.map((section) => {
      const { figure, table, ...rest } = section
      return {
        ...rest,
        ...(table
          ? { table: { headers: table.headers, rows: table.rows.map((cells) => ({ cells })) } }
          : {}),
        ...(figure
          ? {
              figure: {
                image: { _type: 'imageWithUrl', url: figure.url, alt: figure.alt },
                caption: figure.caption,
                width: figure.width,
                height: figure.height,
                maxWidth: figure.maxWidth,
              },
            }
          : {}),
      }
    })

    const tableOfContents = []
    for (const section of article.sections) {
      tableOfContents.push({ id: section.id, label: section.title, indent: false })
      for (const sub of section.subsections ?? []) {
        tableOfContents.push({ id: sub.id, label: sub.title, indent: true })
      }
    }
    tableOfContents.push({ id: 'faq', label: 'Frequently asked questions', indent: false })

    return {
      _id: `blogPost-${article.slug}`,
      _type: 'blogPost',
      id: article.slug,
      slug: { _type: 'slug', current: article.slug },
      title: article.title,
      breadcrumbLabel: article.breadcrumbLabel,
      metaTitle: article.metaTitle,
      metaDescription: article.metaDescription,
      excerpt: article.excerpt,
      category: article.category,
      categoryLabel: article.categoryLabel,
      publishedAt: PUBLISHED,
      dateModified: PUBLISHED,
      date: 'OCT 26, 2026',
      author: AUTHOR,
      authorRole: '',
      readTime: readTime(article),
      wordCount: countWords(article),
      featured: Boolean(article.featured),
      image: imageDoc(article.cover),
      heroCaption: article.heroCaption,
      intro: article.intro,
      sections,
      tableOfContents,
      faqs: article.faqs,
      cta,
      relatedProduct: {
        title: relatedProduct.title,
        capacity: relatedProduct.capacity,
        image: imageDoc(relatedProduct.image),
        href: relatedProduct.href,
      },
    }
  })
}
