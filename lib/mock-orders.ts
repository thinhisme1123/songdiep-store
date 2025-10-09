// Mock orders data for admin dashboard
// In production, this would come from a database

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  deliveryAddress: string
  notes: string
  totalAmount: number
  status: "pending" | "processing" | "completed" | "cancelled"
  createdAt: string
  items: Array<{
    id: string
    productName: string
    quantity: number
    price: number
  }>
}

export const mockOrders: Order[] = [
  {
    id: "ORD001",
    customerName: "Nguyễn Văn A",
    customerEmail: "nguyenvana@example.com",
    customerPhone: "0901234567",
    deliveryAddress: "123 Đường Lê Lợi, Quận 1, TP.HCM",
    notes: "Giao hàng buổi chiều",
    totalAmount: 145000,
    status: "pending",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    items: [
      { id: "1", productName: "Chè Ba Màu", quantity: 2, price: 45000 },
      { id: "5", productName: "Sinh Tố Bơ", quantity: 1, price: 55000 },
    ],
  },
  {
    id: "ORD002",
    customerName: "Trần Thị B",
    customerEmail: "tranthib@example.com",
    customerPhone: "0912345678",
    deliveryAddress: "456 Đường Nguyễn Huệ, Quận 3, TP.HCM",
    notes: "",
    totalAmount: 143000,
    status: "processing",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    items: [
      { id: "9", productName: "Trà Đào Cam Sả", quantity: 2, price: 45000 },
      { id: "7", productName: "Sinh Tố Dâu", quantity: 1, price: 48000 },
    ],
  },
  {
    id: "ORD003",
    customerName: "Lê Văn C",
    customerEmail: "levanc@example.com",
    customerPhone: "0923456789",
    deliveryAddress: "789 Đường Trần Hưng Đạo, Quận 5, TP.HCM",
    notes: "Không cho đá",
    totalAmount: 100000,
    status: "completed",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    items: [{ id: "2", productName: "Chè Thái", quantity: 2, price: 50000 }],
  },
  {
    id: "ORD004",
    customerName: "Phạm Thị D",
    customerEmail: "phamthid@example.com",
    customerPhone: "0934567890",
    deliveryAddress: "321 Đường Võ Văn Tần, Quận 10, TP.HCM",
    notes: "",
    totalAmount: 138000,
    status: "completed",
    createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    items: [
      { id: "10", productName: "Trà Sữa Trân Châu", quantity: 2, price: 48000 },
      { id: "11", productName: "Trà Chanh", quantity: 1, price: 35000 },
    ],
  },
]

export function getOrders(): Order[] {
  return mockOrders
}

export function getOrderById(id: string): Order | undefined {
  return mockOrders.find((order) => order.id === id)
}

export function getOrdersByStatus(status: Order["status"]): Order[] {
  return mockOrders.filter((order) => order.status === status)
}
