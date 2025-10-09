"use client"

import { useState } from "react"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/lib/data"

interface AddToCartButtonProps {
  product: Product
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const addItem = useCart((state) => state.addItem)
  const { toast } = useToast()

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product)
    }
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${quantity} x ${product.nameVi} đã được thêm vào giỏ hàng`,
    })
    setQuantity(1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Số lượng:</span>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={decreaseQuantity} disabled={quantity <= 1}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center font-medium">{quantity}</span>
          <Button variant="outline" size="icon" onClick={increaseQuantity}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Button size="lg" onClick={handleAddToCart} disabled={!product.inStock} className="gap-2">
        <ShoppingCart className="h-5 w-5" />
        {product.inStock ? "Thêm Vào Giỏ Hàng" : "Hết Hàng"}
      </Button>
    </div>
  )
}
