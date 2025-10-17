import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/20 to-background">
      <div className="px-5 py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl text-balance mb-4">
                Chè Thái Song Điệp
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Ngọt mát hương vị quê nhà — Chè, sinh tố, trà và những món ngon dân dã.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="#featured">Xem Menu</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/products/che">Đặt Ngay</Link>
              </Button>
            </div>
          </div>
          <div className="relative aspect-square lg:aspect-auto lg:h-[500px]">
            <Image
              src="/logo/logo.png"
              alt="Chè Thái Song Điệp"
              fill
              className="object-cover rounded-2xl shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
