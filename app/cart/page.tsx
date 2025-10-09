"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useCart } from "@/lib/cart"
import { Card, CardContent } from "@/components/ui/card"

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <section className="py-16 md:py-24">
            <div className="px-10">
              <div className="flex flex-col items-center justify-center gap-6 text-center max-w-md mx-auto">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold mb-2">Giỏ Hàng Trống</h1>
                  <p className="text-muted-foreground leading-relaxed">
                    Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm của chúng tôi!
                  </p>
                </div>
                <Button size="lg" asChild>
                  <Link href="/">Tiếp Tục Mua Sắm</Link>
                </Button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-8 md:py-12">
          <div className="px-10">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Tiếp tục mua sắm
            </Link>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8">Giỏ Hàng</h1>

            <div className="grid gap-8 lg:grid-cols-3">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.nameVi}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex flex-1 flex-col gap-3">
                          <div className="flex justify-between gap-4">
                            <div>
                              <Link
                                href={`/product/${item.id}`}
                                className="font-semibold hover:text-primary transition-colors"
                              >
                                {item.nameVi}
                              </Link>
                              <p className="text-sm text-muted-foreground mt-1">
                                {item.price.toLocaleString("vi-VN")}₫
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-transparent"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 bg-transparent"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            <span className="font-semibold">
                              {(item.price * item.quantity).toLocaleString("vi-VN")}₫
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardContent className="p-6 space-y-4">
                    <h2 className="text-xl font-bold">Tổng Đơn Hàng</h2>

                    <div className="space-y-2 py-4 border-y">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Tạm tính</span>
                        <span>{getTotalPrice().toLocaleString("vi-VN")}₫</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Phí giao hàng</span>
                        <span>{getTotalPrice() >= 100000 ? "Miễn phí" : "20.000₫"}</span>
                      </div>
                    </div>

                    <div className="flex justify-between text-lg font-bold">
                      <span>Tổng cộng</span>
                      <span className="text-primary">
                        {(getTotalPrice() + (getTotalPrice() >= 100000 ? 0 : 20000)).toLocaleString("vi-VN")}₫
                      </span>
                    </div>

                    <Button size="lg" className="w-full" asChild>
                      <Link href="/checkout">Thanh Toán</Link>
                    </Button>

                    <p className="text-xs text-center text-muted-foreground leading-relaxed">
                      Miễn phí giao hàng cho đơn từ 100.000₫
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
