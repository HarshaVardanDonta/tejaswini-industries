export type PolicySection = {
  title: string
  paragraphs: string[]
}

export type PolicyContent = {
  title: string
  intro: string
  lastUpdated: string
  sections: PolicySection[]
}

export const qualityPolicy: PolicyContent = {
  title: 'Quality Policy',
  intro:
    'Tejaswini Industries is committed to delivering precision-engineered electrical products and services that meet customer requirements, applicable standards, and regulatory obligations.',
  lastUpdated: 'June 2026',
  sections: [
    {
      title: 'Our Commitment',
      paragraphs: [
        'We maintain a quality management system aligned with ISO 9001:2015 principles to ensure consistent product performance, reliable delivery, and continuous improvement across all manufacturing and service operations.',
        'Quality is embedded in every stage of our workflow, from design and procurement to production, testing, and after-sales support.',
      ],
    },
    {
      title: 'Quality Objectives',
      paragraphs: [
        'Meet or exceed applicable Indian and international standards for transformers, control panels, and related industrial equipment.',
        'Ensure traceability of materials, processes, and inspections for all critical components.',
        'Respond promptly to customer feedback and non-conformance reports with corrective and preventive actions.',
        'Invest in employee training, process controls, and equipment calibration to sustain manufacturing excellence.',
      ],
    },
    {
      title: 'Responsibility & Review',
      paragraphs: [
        'Management is responsible for establishing quality objectives, allocating resources, and reviewing system performance at planned intervals.',
        'All employees are expected to follow documented procedures, report quality issues, and contribute to a culture of accountability and safety.',
        'This policy is reviewed periodically and communicated across the organization to ensure ongoing relevance and effectiveness.',
      ],
    },
  ],
}

export const privacyPolicy: PolicyContent = {
  title: 'Privacy Policy',
  intro:
    'This Privacy Policy explains how Tejaswini Industries collects, uses, and protects information when you visit our website or contact us regarding our products and services.',
  lastUpdated: 'June 2026',
  sections: [
    {
      title: 'Information We Collect',
      paragraphs: [
        'We may collect information you voluntarily provide through inquiry forms, email correspondence, phone calls, or WhatsApp messages, such as your name, company name, email address, phone number, and project requirements.',
        'We may also collect limited technical information when you browse our website, including browser type, device information, pages visited, and general usage data through standard analytics tools.',
      ],
    },
    {
      title: 'How We Use Information',
      paragraphs: [
        'Respond to product inquiries, quotations, and technical support requests.',
        'Improve our website, services, and customer communication.',
        'Maintain records required for business operations, compliance, and quality assurance.',
        'We do not sell personal information to third parties.',
      ],
    },
    {
      title: 'Data Security & Retention',
      paragraphs: [
        'We take reasonable administrative and technical measures to protect information against unauthorized access, alteration, or disclosure.',
        'Information is retained only for as long as necessary to fulfill the purposes described in this policy or as required by applicable law.',
      ],
    },
    {
      title: 'Your Rights & Contact',
      paragraphs: [
        'You may request access to, correction of, or deletion of personal information we hold about you, subject to legal and contractual requirements.',
        'For privacy-related questions, contact us at info@tejaswiniindustries.com or through the contact details listed on our website.',
        'We may update this policy from time to time. Continued use of our website after changes are posted constitutes acceptance of the revised policy.',
      ],
    },
  ],
}
