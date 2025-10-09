"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCart } from "@/lib/cart"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/data"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((state) => state.addItem)
  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem(product)
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${product.nameVi} đã được thêm vào giỏ hàng`,
    })
  }

  return (
    <Link href={`/product/${product.id}`} className="h-full">
      <Card className="group overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden bg-muted">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.nameVi}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-3 p-4 flex-1">
          <div className="flex-1 w-full">
            <h3 className="font-semibold text-lg text-balance">{product.nameVi}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1 leading-relaxed">{product.descriptionVi}</p>
          </div>
          <div className="flex items-center justify-between w-full gap-2">
            <span className="text-xl font-bold text-primary">{product.price.toLocaleString("vi-VN")}₫</span>
            <Button size="sm" onClick={handleAddToCart} className="gap-2">
              <ShoppingCart className="h-4 w-4" />
              Thêm
            </Button>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}
