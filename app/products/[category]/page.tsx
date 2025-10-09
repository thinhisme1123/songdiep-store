import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { getProductsByCategory, getCategories } from "@/lib/data"

export function generateStaticParams() {
  const categories = getCategories()
  return categories.map((category) => ({
    category: category.slug,
  }))
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categories = getCategories()
  const category = categories.find((c) => c.slug === params.category)
  
  if (!category) {
    notFound()
  }

  const products = getProductsByCategory(params.category)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary/10 via-secondary/20 to-background">
          <div className="px-10">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 text-balance">{category.nameVi}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{category.description}</p>
          </div>
        </section>

        <section className="py-12 md:py-16">
          <div className="px-10">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
