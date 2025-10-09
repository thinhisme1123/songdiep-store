import { notFound } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { getProductById, getProducts } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

export function generateStaticParams() {
  const products = getProducts()
  return products.map((product) => ({
    id: product.id,
  }))
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)

  if (!product) {
    notFound()
  }

  // Get related products from the same category
  const allProducts = getProducts()
  const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-8 md:py-12">
          <div className="px-10">
            <Link
              href={`/products/${product.category}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại danh mục
            </Link>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
                <Image src={product.image || "/placeholder.svg"} alt={product.nameVi} fill className="object-cover" />
              </div>

              {/* Product Info */}
              <div className="flex flex-col gap-6">
                <div>
                  <Badge className="mb-3">{product.category.toUpperCase()}</Badge>
                  <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2 text-balance">{product.nameVi}</h1>
                  <p className="text-lg text-muted-foreground">{product.name}</p>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">{product.price.toLocaleString("vi-VN")}₫</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Mô tả</h3>
                    <p className="text-muted-foreground leading-relaxed">{product.descriptionVi}</p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{product.description}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`}
                      aria-hidden="true"
                    />
                    <span className="text-sm text-muted-foreground">{product.inStock ? "Còn hàng" : "Hết hàng"}</span>
                  </div>
                </div>

                <AddToCartButton product={product} />

                <div className="pt-6 border-t space-y-3">
                  <div className="flex items-start gap-3">
                    <ShoppingCart className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Giao hàng tận nơi</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Miễn phí giao hàng cho đơn từ 300.000₫
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 md:py-16 bg-muted/30">
            <div className="px-10">
              <h2 className="text-2xl font-bold tracking-tight mb-8">Sản Phẩm Liên Quan</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}
