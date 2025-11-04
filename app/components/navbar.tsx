"use client"

import { Sun, Moon, Menu, X } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface NavbarProps {
  isDark: boolean
  toggleTheme: () => void
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav style={{ position: 'fixed', width: '100%', top: 0, zIndex: 50, backgroundColor: 'rgba(var(--color-surface), 0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 var(--space-3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', textDecoration: 'none' }}>
            <Image src="/logo.png" alt="AgriRate" width={32} height={32} />
            <span style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--color-text)' }}>AgriRate</span>
          </a>

          <div style={{ display: 'none', alignItems: 'center', gap: 'var(--space-5)' }} className="nav-links">
            <a href="#features" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              Features
            </a>
            <a href="#pricing" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              Pricing
            </a>
            <a href="#testimonials" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              Testimonials
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <button
              onClick={toggleTheme}
              style={{ padding: 'var(--space-1)', borderRadius: 'var(--radius-md)', transition: 'background-color var(--transition-fast)', cursor: 'pointer' }}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a href="/auth/farmer/login" className="btn btn-secondary" style={{ display: 'none' }} id="nav-cta">
              Sign In
            </a>
            <a href="/auth/farmer/register" className="btn btn-primary" style={{ display: 'none', marginLeft: 'var(--space-1)' }} id="nav-cta">
              Get Started
            </a>
            <button onClick={() => setMobileOpen(!mobileOpen)} style={{ padding: 'var(--space-1)' }} className="mobile-menu-btn">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="mobile-menu fade-in" style={{ paddingBottom: 'var(--space-2)', borderTop: '1px solid var(--color-border)' }}>
            <a
              href="#features"
              style={{ display: 'block', padding: 'var(--space-1) 0', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}
            >
              Features
            </a>
            <a
              href="#pricing"
              style={{ display: 'block', padding: 'var(--space-1) 0', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}
            >
              Pricing
            </a>
            <a
              href="#testimonials"
              style={{ display: 'block', padding: 'var(--space-1) 0', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}
            >
              Testimonials
            </a>
            <a href="/auth/farmer/register" className="btn btn-primary" style={{ width: '100%', marginTop: 'var(--space-2)', textDecoration: 'none', textAlign: 'center' }}>
              Get Started
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
