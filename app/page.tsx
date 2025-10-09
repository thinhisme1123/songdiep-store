import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/home/hero";
import { About } from "@/components/home/about";
import { Gallery } from "@/components/home/gallery";
import { Contact } from "@/components/home/contact";
import { ProductCard } from "@/components/product-card";
import { getCategories, getFeaturedProducts } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const categories = getCategories();
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />

        <About />

        {/* Categories Section */}
        <section className="py-16 md:py-24">
          <div className="px-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Danh Mục Sản Phẩm
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Khám phá các loại đồ uống và tráng miệng Việt Nam đa dạng
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/products/${category.slug}`}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.nameVi}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">
                        {category.nameVi}
                      </h3>
                      <p className="text-sm text-white/90 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section id="featured" className="py-16 md:py-24 bg-muted/30">
          <div className="px-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
                Sản Phẩm Nổi Bật
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Những món được yêu thích nhất của chúng tôi
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" asChild>
                <Link href="/products/che">Xem Tất Cả Sản Phẩm</Link>
              </Button>
            </div>
          </div>
        </section>

        <Gallery />

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
