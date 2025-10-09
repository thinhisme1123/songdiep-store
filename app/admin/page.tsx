"use client"

import { useState } from "react"
import Link from "next/link"
import { Package, ShoppingBag, TrendingUp, Users, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getOrders, type Order } from "@/lib/mock-orders"
import { getProducts } from "@/lib/data"

export default function AdminDashboard() {
  const [orders] = useState<Order[]>(getOrders())
  const products = getProducts()

  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter((o) => o.status === "pending").length,
    totalRevenue: orders.filter((o) => o.status === "completed").reduce((sum, o) => sum + o.totalAmount, 0),
    totalProducts: products.length,
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

  const filterOrdersByStatus = (status?: Order["status"]) => {
    if (!status) return orders
    return orders.filter((order) => order.status === status)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <span className="text-xl font-bold text-primary-foreground">C</span>
            </div>
            <div>
              <span className="text-xl font-bold text-foreground">Admin Dashboard</span>
              <p className="text-xs text-muted-foreground">Chè & Sinh Tố</p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link href="/">Xem Website</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 bg-muted/30">
        <div className="container py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">Tổng Quan</h1>
            <p className="text-muted-foreground">Quản lý đơn hàng và sản phẩm của bạn</p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Tổng Đơn Hàng</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalOrders}</div>
                <p className="text-xs text-muted-foreground mt-1">Tất cả đơn hàng</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Chờ Xử Lý</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pendingOrders}</div>
                <p className="text-xs text-muted-foreground mt-1">Đơn hàng mới</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Doanh Thu</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString("vi-VN")}₫</div>
                <p className="text-xs text-muted-foreground mt-1">Đơn hoàn thành</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Sản Phẩm</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalProducts}</div>
                <p className="text-xs text-muted-foreground mt-1">Tổng sản phẩm</p>
              </CardContent>
            </Card>
          </div>

          {/* Orders Table */}
          <Card>
            <CardHeader>
              <CardTitle>Đơn Hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="all">Tất cả</TabsTrigger>
                  <TabsTrigger value="pending">Chờ xử lý</TabsTrigger>
                  <TabsTrigger value="processing">Đang xử lý</TabsTrigger>
                  <TabsTrigger value="completed">Hoàn thành</TabsTrigger>
                  <TabsTrigger value="cancelled">Đã hủy</TabsTrigger>
                </TabsList>

                {(["all", "pending", "processing", "completed", "cancelled"] as const).map((tab) => (
                  <TabsContent key={tab} value={tab} className="mt-6">
                    <div className="space-y-4">
                      {filterOrdersByStatus(tab === "all" ? undefined : tab).length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">Không có đơn hàng nào</div>
                      ) : (
                        filterOrdersByStatus(tab === "all" ? undefined : tab).map((order) => (
                          <Card key={order.id}>
                            <CardContent className="p-6">
                              <div className="flex flex-col gap-4">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <div className="flex items-center gap-3 mb-2">
                                      <h3 className="font-semibold text-lg">#{order.id}</h3>
                                      <Badge className={getStatusBadge(order.status).className}>
                                        {getStatusBadge(order.status).label}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                      {new Date(order.createdAt).toLocaleString("vi-VN")}
                                    </p>
                                  </div>
                                  <Button variant="outline" size="sm" asChild>
                                    <Link href={`/admin/orders/${order.id}`}>
                                      <Eye className="h-4 w-4 mr-2" />
                                      Chi tiết
                                    </Link>
                                  </Button>
                                </div>

                                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                                  <div>
                                    <p className="text-muted-foreground">Khách hàng</p>
                                    <p className="font-medium">{order.customerName}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Số điện thoại</p>
                                    <p className="font-medium">{order.customerPhone}</p>
                                  </div>
                                  <div>
                                    <p className="text-muted-foreground">Tổng tiền</p>
                                    <p className="font-medium text-primary">
                                      {order.totalAmount.toLocaleString("vi-VN")}₫
                                    </p>
                                  </div>
                                </div>

                                <div className="text-sm">
                                  <p className="text-muted-foreground mb-1">Sản phẩm</p>
                                  <div className="flex flex-wrap gap-2">
                                    {order.items.map((item, idx) => (
                                      <span key={idx} className="text-xs bg-muted px-2 py-1 rounded">
                                        {item.quantity}x {item.productName}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
