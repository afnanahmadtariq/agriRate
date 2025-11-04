import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Noto_Nastaliq_Urdu } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
import { LanguageProvider } from "@/app/hooks/useLanguage"
import { ThemeProvider } from "@/app/components/theme-provider"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })
const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-urdu"
})

export const metadata: Metadata = {
  title: "AgriRate - Intelligent Farming Platform",
  description:
    "Empower your farm with AI-driven market insights, real-time weather data, and sustainable farming practices. AgriRate for Pakistani farmers.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable} ${notoNastaliqUrdu.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
