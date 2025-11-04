"use client"

import { ArrowRight, Users, MapPin, TrendingUp } from "lucide-react"

export default function Hero() {
  return (
    <section style={{ paddingTop: 'var(--space-12)', paddingBottom: 'var(--space-8)', paddingLeft: 'var(--space-3)', paddingRight: 'var(--space-3)', maxWidth: '80rem', margin: '0 auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 'var(--space-5)', maxWidth: '56rem', margin: '0 auto' }}>
        <div>
          <span className="badge badge-success" style={{ borderRadius: '9999px', fontSize: '0.875rem' }}>
            🇵🇰 Pakistan&apos;s Intelligent Farming Platform
          </span>
        </div>
        
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Harvest Intelligence,
          <br />
          <span style={{ color: 'var(--color-primary)' }}>Grow Prosperity</span>
        </h1>
        
        <p style={{ fontSize: '1.1875rem', color: 'var(--color-text-secondary)', maxWidth: '42rem', lineHeight: 1.7 }}>
          AgriRate empowers Pakistani farmers with AI-driven market insights, real-time weather data, and sustainable
          farming practices to maximize yields and income.
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center', paddingTop: 'var(--space-2)' }}>
          <button className="btn btn-primary hover-lift">
            Start Free Trial <ArrowRight size={20} />
          </button>
          <button className="btn btn-secondary">
            Watch Demo
          </button>
        </div>

        {/* Trust Indicators */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 'var(--space-5)', paddingTop: 'var(--space-5)', borderTop: '1px solid var(--color-border-subtle)', width: '100%', maxWidth: '42rem' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-1)', marginBottom: 'var(--space-1)' }}>
              <Users size={16} style={{ color: 'var(--color-primary)' }} />
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1 }}>10K+</p>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>Active Farmers</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-1)', marginBottom: 'var(--space-1)' }}>
              <MapPin size={16} style={{ color: 'var(--color-primary)' }} />
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1 }}>50+</p>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>Districts</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--space-1)', marginBottom: 'var(--space-1)' }}>
              <TrendingUp size={16} style={{ color: 'var(--color-primary)' }} />
              <p style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1 }}>23%</p>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>Avg. Yield ↑</p>
          </div>
        </div>
      </div>
    </section>
  )
}
