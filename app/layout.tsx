import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Suspense } from "react"
import { Be_Vietnam_Pro } from "next/font/google"

export const metadata: Metadata = {
  title: "Quán Chè Song Điệp - Chè & Sinh Tố",
  description: "Quán Chè Song Điệp – Chè, sinh tố và các món giải khát tươi mát, đậm đà hương vị Việt Nam.",
  generator: "v0.app",
}

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  display: "swap",
  variable: "--font-be-vietnam",
  weight: ["300", "400", "500", "700"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi" className={beVietnam.variable}>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>
          {children}
          <Toaster />
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
