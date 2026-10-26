import { EditorShell } from '../../components/EditorShell'
import { ProductSeoFieldsEditor } from '../../components/ProductSeoFields'
import { useSingletonPage } from '../../hooks/useSingletonPage'
import type { ProductSeoFields } from '../../../data/productCategories'

type Doc = ProductSeoFields & { _id: string; _type: string }

export function ProductsPageEditPage() {
  const { form, setForm, loading, error, dirty, saving, message, onSave, onDiscard } =
    useSingletonPage<Doc>({
      query: '*[_id == "productsPage"][0]',
      docId: 'productsPage',
      docType: 'productsPage',
    })

  if (!form) {
    return (
      <EditorShell
        title="Products page"
        loading={loading}
        error={error || 'Products page content not found. Run the Firestore seed.'}
        dirty={false}
        saving={false}
        message={null}
        onSave={() => {}}
        onDiscard={() => {}}
      >
        {null}
      </EditorShell>
    )
  }

  return (
    <EditorShell
      title="Products page"
      description="Meta tags, short answer, question sections and FAQs for /products."
      loading={loading}
      error={error}
      dirty={dirty}
      saving={saving}
      message={message}
      onSave={onSave}
      onDiscard={onDiscard}
    >
      <ProductSeoFieldsEditor form={form} setForm={setForm} />
    </EditorShell>
  )
}
