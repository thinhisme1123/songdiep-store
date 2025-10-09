"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle2, Package, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface OrderData {
  id: string
  name: string
  email: string
  phone: string
  address: string
  notes: string
  items: Array<{
    id: string
    nameVi: string
    image: string
    price: number
    quantity: number
  }>
  total: number
  createdAt: string
}

export default function OrderConfirmationPage({ params }: { params: Promise<{ orderId: string }>}) {
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const {orderId} = use(params);

  useEffect(() => {
    const storedOrder = localStorage.getItem("lastOrder")
    if (storedOrder) {
      const order = JSON.parse(storedOrder)
      if (order.id === orderId) {
        setOrderData(order)
      }
    }
  }, [orderId])

  if (!orderData) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <section className="py-16 md:py-24">
            <div className="px-10">
              <div className="flex flex-col items-center justify-center gap-6 text-center max-w-md mx-auto">
                <Package className="h-16 w-16 text-muted-foreground" />
                <div>
                  <h1 className="text-2xl font-bold mb-2">Không Tìm Thấy Đơn Hàng</h1>
                  <p className="text-muted-foreground leading-relaxed">Đơn hàng này không tồn tại hoặc đã hết hạn.</p>
                </div>
                <Button size="lg" asChild>
                  <Link href="/">Về Trang Chủ</Link>
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
            {/* Success Message */}
            <div className="text-center mb-8">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-2">Đặt Hàng Thành Công!</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ với bạn sớm nhất.
              </p>
            </div>

            <div className="space-y-6">
              {/* Order Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Thông Tin Đơn Hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mã đơn hàng:</span>
                    <span className="font-mono font-semibold">{orderData.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ngày đặt:</span>
                    <span>{new Date(orderData.createdAt).toLocaleString("vi-VN")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Trạng thái:</span>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      Đang xử lý
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Thông Tin Khách Hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Package className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">{orderData.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Số điện thoại</p>
                      <p>{orderData.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p>{orderData.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Địa chỉ giao hàng</p>
                      <p className="leading-relaxed">{orderData.address}</p>
                    </div>
                  </div>
                  {orderData.notes && (
                    <div className="pt-3 border-t">
                      <p className="text-sm text-muted-foreground mb-1">Ghi chú</p>
                      <p className="leading-relaxed">{orderData.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Sản Phẩm Đã Đặt</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {orderData.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image src={item.image || "/placeholder.svg"} alt={item.nameVi} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{item.nameVi}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} x {item.price.toLocaleString("vi-VN")}₫
                        </p>
                      </div>
                      <div className="font-medium">{(item.price * item.quantity).toLocaleString("vi-VN")}₫</div>
                    </div>
                  ))}

                  <div className="pt-4 border-t space-y-2">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Tổng cộng</span>
                      <span className="text-primary">{orderData.total.toLocaleString("vi-VN")}₫</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/">Tiếp Tục Mua Sắm</Link>
                </Button>
                <Button size="lg" variant="outline" onClick={() => window.print()}>
                  In Đơn Hàng
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
