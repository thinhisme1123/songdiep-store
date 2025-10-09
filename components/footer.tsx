import Link from "next/link"
import { Facebook, Instagram, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="px-10 py-12">
        <div className="mx-3 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                <img className="rounded-full" src="/logo/logo.jpeg" alt="" />
              </div>
              <span className="text-lg font-bold">Quán Chè Song Điệp</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ngọt mát hương vị quê nhà — Chè, sinh tố, trà và những món ngon dân dã.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Danh Mục</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products/che" className="text-muted-foreground hover:text-foreground transition-colors">
                  Chè
                </Link>
              </li>
              <li>
                <Link
                  href="/products/sinh-to"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Sinh Tố
                </Link>
              </li>
              <li>
                <Link href="/products/tra" className="text-muted-foreground hover:text-foreground transition-colors">
                  Trà
                </Link>
              </li>
              <li>
                <Link
                  href="/products/nuoc-ep"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Nước Ép
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Liên Hệ</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Điện thoại: 0937 704 515</li>
              <li>Địa chỉ: 2172 Quốc Lộ 50</li>
              <li>xã Bình Hưng, TP. Hồ Chí Minh</li>
              <li>Giờ mở cửa: 9:00 – 22:00</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Theo Dõi</h3>
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/pham.nhi.100343?locale=vi_VN"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://zalo.me/0937704515"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TheoBinh - Quán Chè Song Điệp — Giữ trọn vị ngọt Việt.</p>
        </div>
      </div>
    </footer>
  )
}
