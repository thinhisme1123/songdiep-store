import Image from "next/image"

export function About() {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Về Quán Chè Song Điệp</h2>
        </div>
        <div className="grid gap-8 lg:grid-cols-2 items-center max-w-6xl mx-auto">
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Quán Chè Song Điệp là điểm hẹn thân quen của những ai yêu thích hương vị dân dã, ngọt thanh tự nhiên.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Từ ly chè mát lạnh đến ly sinh tố tươi ngon, chúng tôi mang đến sự tươi mới mỗi ngày cho bạn. Với công
              thức truyền thống được truyền từ thế hệ này sang thế hệ khác, mỗi món đều được chế biến tỉ mỉ và tâm
              huyết.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Không gian quán ấm cúng, thân thiện, là nơi lý tưởng để bạn thư giãn sau những giờ làm việc căng thẳng
              hoặc gặp gỡ bạn bè, người thân.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image src="/placeholder.svg?height=300&width=300" alt="Không gian quán" fill className="object-cover" />
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              <Image src="/placeholder.svg?height=300&width=300" alt="Chế biến món ăn" fill className="object-cover" />
            </div>
            <div className="relative aspect-square rounded-2xl overflow-hidden col-span-2">
              <Image
                src="/placeholder.svg?height=300&width=600"
                alt="Khách hàng thưởng thức"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
