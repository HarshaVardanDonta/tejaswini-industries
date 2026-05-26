import { ProductsShell } from '../components/layout/ProductsShell'
import { ProductCategoryCard } from '../components/products/ProductCategoryCard'
import { ProductsIntro } from '../components/products/ProductsIntro'
import { productCategories } from '../data/productCategories'

export function ProductsPage() {
  return (
    <ProductsShell>
      <main className="grow w-full max-w-[1280px] mx-auto px-margin-mobile md:px-margin-desktop py-space-8 md:py-space-12 flex flex-col gap-space-8">
        <ProductsIntro />
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {productCategories.map((category) => (
            <ProductCategoryCard key={category.id} category={category} />
          ))}
        </section>
      </main>
    </ProductsShell>
  )
}
