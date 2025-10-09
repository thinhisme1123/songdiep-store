"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { useCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const orderId = Math.random().toString(36).substring(2, 9).toUpperCase();

    // Store order in localStorage for confirmation page
    localStorage.setItem(
      "lastOrder",
      JSON.stringify({
        id: orderId,
        ...formData,
        items,
        total: getTotalPrice() + (getTotalPrice() >= 100000 ? 0 : 20000),
        createdAt: new Date().toISOString(),
      })
    );
    // send order information for store
    

    clearCart();
    toast({
      title: "Đặt hàng thành công!",
      description: "Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ liên hệ sớm nhất.",
    });

    router.push(`/order-confirmation/${orderId}`);
    return;
  };

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, []);

  const subtotal = getTotalPrice();
  const shippingFee = subtotal >= 100000 ? 0 : 20000;
  const total = subtotal + shippingFee;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="py-8 md:py-12">
          <div className="px-10">
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Quay lại giỏ hàng
            </Link>

            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8">
              Thanh Toán
            </h1>

            <form onSubmit={handleSubmit}>
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Checkout Form */}
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Thông Tin Giao Hàng</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Họ và tên <span className="text-destructive">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Nguyễn Văn A"
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="email">
                            Email <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            placeholder="email@example.com"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">
                            Số điện thoại{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            placeholder="0123456789"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">
                          Địa chỉ giao hàng{" "}
                          <span className="text-destructive">*</span>
                        </Label>
                        <Textarea
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                          placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                          rows={3}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="notes">
                          Ghi chú đơn hàng (tùy chọn)
                        </Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleInputChange}
                          placeholder="Ghi chú về đơn hàng, ví dụ: thời gian giao hàng mong muốn"
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Phương Thức Thanh Toán</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-3 p-4 border rounded-lg bg-muted/50">
                        <input
                          type="radio"
                          id="cod"
                          name="payment"
                          defaultChecked
                          className="h-4 w-4"
                        />
                        <Label htmlFor="cod" className="flex-1 cursor-pointer">
                          <div className="font-medium">
                            Thanh toán khi nhận hàng (COD)
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Thanh toán bằng tiền mặt khi nhận hàng
                          </div>
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-20">
                    <CardHeader>
                      <CardTitle>Đơn Hàng</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {items.map((item) => (
                          <div key={item.id} className="flex gap-3">
                            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.nameVi}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {item.nameVi}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {item.quantity} x{" "}
                                {item.price.toLocaleString("vi-VN")}₫
                              </p>
                            </div>
                            <div className="text-sm font-medium">
                              {(item.price * item.quantity).toLocaleString(
                                "vi-VN"
                              )}
                              ₫
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2 py-4 border-y">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Tạm tính
                          </span>
                          <span>{subtotal.toLocaleString("vi-VN")}₫</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Phí giao hàng
                          </span>
                          <span>
                            {shippingFee === 0
                              ? "Miễn phí"
                              : `${shippingFee.toLocaleString("vi-VN")}₫`}
                          </span>
                        </div>
                      </div>

                      <div className="flex justify-between text-lg font-bold">
                        <span>Tổng cộng</span>
                        <span className="text-primary">
                          {total.toLocaleString("vi-VN")}₫
                        </span>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Đang xử lý...
                          </>
                        ) : (
                          "Đặt Hàng"
                        )}
                      </Button>

                      <p className="text-xs text-center text-muted-foreground leading-relaxed">
                        Bằng cách đặt hàng, bạn đồng ý với điều khoản sử dụng
                        của chúng tôi
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
