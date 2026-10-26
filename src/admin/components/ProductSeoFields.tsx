import { useState } from 'react'

import type { ProductSeoFields as SeoFields } from '../../data/productCategories'
import {
  faqsToText,
  listToText,
  sectionsToText,
  specsToText,
  textToFaqs,
  textToList,
  textToSections,
  textToSpecs,
} from '../lib/productSeoText'
import { TextArea } from './fields/TextArea'
import { TextInput } from './fields/TextInput'

/** A textarea that keeps what you type and writes the parsed value to the form. */
function ParsedTextArea<T>({
  label,
  hint,
  value,
  rows,
  format,
  parse,
  onChange,
}: {
  label: string
  hint?: string
  value: T
  rows?: number
  format: (value: T) => string
  parse: (text: string) => T
  onChange: (value: T) => void
}) {
  const external = format(value)
  const [raw, setRaw] = useState(external)
  const [seen, setSeen] = useState(external)
  // When the form is reset or reloaded from outside, show the new value.
  if (external !== seen) {
    setSeen(external)
    if (external !== format(parse(raw))) setRaw(external)
  }
  return (
    <TextArea
      label={label}
      hint={hint}
      rows={rows}
      value={raw}
      onChange={(text) => {
        setRaw(text)
        onChange(parse(text))
      }}
    />
  )
}

function wordCount(text: string) {
  return text.split(/\s+/).filter(Boolean).length
}

export function ProductSeoFieldsEditor<T extends SeoFields>({
  form,
  setForm,
}: {
  form: T
  setForm: (next: T) => void
}) {
  const title = form.metaTitle ?? ''
  const description = form.metaDescription ?? ''
  const answer = form.shortAnswer ?? ''
  const answerWords = wordCount(answer)
  return (
    <>
      <TextInput
        label="Meta title"
        hint={`${title.length} characters. The brand name is added after it, so keep this to 38 or fewer so the full title stays within 60.`}
        value={title}
        onChange={(metaTitle) => setForm({ ...form, metaTitle })}
      />
      <TextArea
        label="Meta description"
        hint={`${description.length} characters. Aim for 155 or fewer.`}
        rows={3}
        value={description}
        onChange={(metaDescription) => setForm({ ...form, metaDescription })}
      />
      <TextArea
        label="Short answer"
        hint={`${answerWords} words. Aim for 40 to 60 words of plain facts. Shown at the top of the page.`}
        rows={4}
        value={answer}
        onChange={(shortAnswer) => setForm({ ...form, shortAnswer })}
      />
      <ParsedTextArea
        label="Question sections"
        hint='Start each section with "## Question heading". Separate paragraphs with a blank line, start bullets with "- ", and put [table] or [options] on its own line to place the specification table or the build options. Photos and the IS 1180 loss tables are kept with their section heading; if you rename a heading they are dropped. Links: [text](/path).'
        rows={22}
        value={form.sections ?? []}
        format={sectionsToText}
        parse={(text) => textToSections(text, form.sections)}
        onChange={(sections) => setForm({ ...form, sections })}
      />
      <ParsedTextArea
        label="Specification table"
        hint='One row per line: "Label | Value".'
        rows={8}
        value={form.specsTable ?? []}
        format={specsToText}
        parse={textToSpecs}
        onChange={(specsTable) => setForm({ ...form, specsTable })}
      />
      <ParsedTextArea
        label="FAQs"
        hint='Each FAQ is "Q: question" then "A: answer". Separate FAQs with a blank line. Plain text only: they are also published as FAQPage structured data.'
        rows={16}
        value={form.faqs ?? []}
        format={faqsToText}
        parse={textToFaqs}
        onChange={(faqs) => setForm({ ...form, faqs })}
      />
      <ParsedTextArea
        label="Key facts strip (one per line)"
        hint="Short facts shown under the page heading, for example the rating range and voltage class."
        value={form.heroFacts ?? []}
        format={listToText}
        parse={textToList}
        rows={4}
        onChange={(heroFacts) => setForm({ ...form, heroFacts })}
      />
      <ParsedTextArea
        label="Enquiry checklist (one per line)"
        hint="What a buyer should send with an enquiry. Shown above the quote buttons and used in the WhatsApp message."
        value={form.quoteChecklist ?? []}
        format={listToText}
        parse={textToList}
        rows={6}
        onChange={(quoteChecklist) => setForm({ ...form, quoteChecklist })}
      />
      <ParsedTextArea
        label="Related guides (blog slugs, one per line)"
        value={form.relatedGuides ?? []}
        format={listToText}
        parse={textToList}
        rows={4}
        onChange={(relatedGuides) => setForm({ ...form, relatedGuides })}
      />
      <ParsedTextArea
        label="Related products (category ids, one per line)"
        value={form.relatedProducts ?? []}
        format={listToText}
        parse={textToList}
        rows={4}
        onChange={(relatedProducts) => setForm({ ...form, relatedProducts })}
      />
    </>
  )
}
