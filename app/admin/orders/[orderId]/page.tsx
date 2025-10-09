"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Package, Phone, Mail, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getOrderById, type Order } from "@/lib/mock-orders"
import { useToast } from "@/hooks/use-toast"

export default function AdminOrderDetailPage({ params }: { params: { orderId: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const order = getOrderById(params.orderId)
  const [status, setStatus] = useState<Order["status"]>(order?.status || "pending")

  if (!order) {
    return (
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
          <div className="container flex h-16 items-center">
            <Link href="/admin" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <span className="text-xl font-bold text-primary-foreground">C</span>
              </div>
              <span className="text-xl font-bold">Admin Dashboard</span>
            </Link>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Không Tìm Thấy Đơn Hàng</h1>
            <p className="text-muted-foreground mb-4">Đơn hàng này không tồn tại.</p>
            <Button asChild>
              <Link href="/admin">Quay Lại Dashboard</Link>
            </Button>
          </div>
        </main>
      </div>
    )
  }

  const getStatusBadge = (status: Order["status"]) => {
    const variants: Record<Order["status"], { label: string; className: string }> = {
      pending: { label: "Chờ xử lý", className: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" },
      processing: { label: "Đang xử lý", className: "bg-blue-500/10 text-blue-700 dark:text-blue-400" },
      completed: { label: "Hoàn thành", className: "bg-green-500/10 text-green-700 dark:text-green-400" },
      cancelled: { label: "Đã hủy", className: "bg-red-500/10 text-red-700 dark:text-red-400" },
    }
    return variants[status]
  }

  const handleStatusUpdate = () => {
    // In production, this would update the database
    toast({
      title: "Cập nhật thành công",
      description: `Trạng thái đơn hàng đã được cập nhật thành "${getStatusBadge(status).label}"`,
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <span className="text-xl font-bold text-primary-foreground">C</span>
            </div>
            <div>
              <span className="text-xl font-bold text-foreground">Admin Dashboard</span>
              <p className="text-xs text-muted-foreground">Chi tiết đơn hàng</p>
            </div>
          </Link>
          <Button variant="outline" asChild>
            <Link href="/admin">Quay Lại</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 bg-muted/30">
        <div className="container py-8 max-w-4xl">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại dashboard
          </Link>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight mb-2">Đơn Hàng #{order.id}</h1>
              <p className="text-muted-foreground">{new Date(order.createdAt).toLocaleString("vi-VN")}</p>
            </div>
            <Badge className={getStatusBadge(order.status).className}>{getStatusBadge(order.status).label}</Badge>
          </div>

          <div className="space-y-6">
            {/* Status Update */}
            <Card>
              <CardHeader>
                <CardTitle>Cập Nhật Trạng Thái</CardTitle>
              </CardHeader>
              <CardContent className="flex gap-4">
                <Select value={status} onValueChange={(value) => setStatus(value as Order["status"])}>
                  <SelectTrigger className="flex-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Chờ xử lý</SelectItem>
                    <SelectItem value="processing">Đang xử lý</SelectItem>
                    <SelectItem value="completed">Hoàn thành</SelectItem>
                    <SelectItem value="cancelled">Đã hủy</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleStatusUpdate}>Cập Nhật</Button>
              </CardContent>
            </Card>

            {/* Customer Info */}
            <Card>
              <CardHeader>
                <CardTitle>Thông Tin Khách Hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Tên khách hàng</p>
                    <p className="font-medium">{order.customerName}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Số điện thoại</p>
                    <p className="font-medium">{order.customerPhone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{order.customerEmail}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Địa chỉ giao hàng</p>
                    <p className="font-medium leading-relaxed">{order.deliveryAddress}</p>
                  </div>
                </div>
                {order.notes && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-muted-foreground mb-1">Ghi chú</p>
                    <p className="leading-relaxed">{order.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Sản Phẩm</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-3 border-b last:border-0">
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} x {item.price.toLocaleString("vi-VN")}₫
                        </p>
                      </div>
                      <p className="font-semibold">{(item.quantity * item.price).toLocaleString("vi-VN")}₫</p>
                    </div>
                  ))}

                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Tổng cộng</span>
                      <span className="text-primary">{order.totalAmount.toLocaleString("vi-VN")}₫</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
