import { MapPin, Phone, Clock, Facebook, MessageCircle } from "lucide-react"
import { MapEmbed } from "./map-embed"

export function Contact() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="px-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Liên Hệ & Địa Chỉ</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Ghé thăm chúng tôi hoặc liên hệ để đặt hàng
          </p>
        </div>
        <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="bg-primary/10 p-3 rounded-xl">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Địa chỉ</h3>
                <p className="text-muted-foreground leading-relaxed">2172 Quốc Lộ 50, xã Bình Hưng, TP. Hồ Chí Minh</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Số điện thoại</h3>
                <p className="text-muted-foreground leading-relaxed">0937 704 515</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">Giờ mở cửa</h3>
                <p className="text-muted-foreground leading-relaxed">9:30 – 21:30 (Hàng ngày)</p>
              </div>
            </div>
            <div className="pt-4">
              <h3 className="font-semibold text-lg mb-4">Kết nối với chúng tôi</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/pham.nhi.100343"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/10 p-3 rounded-xl hover:bg-primary/20 transition-colors"
                >
                  <Facebook className="h-6 w-6 text-primary" />
                </a>
                <a
                  href="https://zalo.me/0937704515"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/10 p-3 rounded-xl hover:bg-primary/20 transition-colors"
                >
                  <MessageCircle className="h-6 w-6 text-primary" />
                </a>
              </div>
            </div>
          </div>
          <MapEmbed />
        </div>
      </div>
    </section>
  )
}
