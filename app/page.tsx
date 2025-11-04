"use client"

import { useState, useEffect } from "react"
import Navbar from "@/app/components/navbar"
import Hero from "@/app/components/hero"
import ValueProposition from "@/app/components/value-proposition"
import Features from "@/app/components/features"
import MarketRates from "@/app/components/market-rates"
import WeatherWidget from "@/app/components/weather-widget"
import Pricing from "@/app/components/pricing"
import Testimonials from "@/app/components/testimonials"
import CTA from "@/app/components/cta"
import Footer from "@/app/components/footer"

export default function Page() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("theme") === "dark"
    }
    return false
  })

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDark])

  const toggleTheme = () => {
    const newDark = !isDark
    setIsDark(newDark)
    localStorage.setItem("theme", newDark ? "dark" : "light")
    if (newDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <div style={{ backgroundColor: 'var(--color-surface-alt)', color: 'var(--color-text)' }}>
      <Navbar isDark={isDark} toggleTheme={toggleTheme} />
      <Hero />
      <ValueProposition />
      <Features />
      <MarketRates />
      <WeatherWidget />
      <Pricing />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  )
}
