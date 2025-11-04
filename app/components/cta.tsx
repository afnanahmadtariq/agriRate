"use client"

import { ArrowRight, Sparkles } from "lucide-react"

export default function CTA() {
  return (
    <section style={{ padding: 'var(--space-12) var(--space-3)' }}>
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        <div className="card" style={{ 
          position: 'relative',
          background: 'linear-gradient(135deg, var(--color-primary-subtle) 0%, var(--color-surface) 100%)', 
          borderColor: 'var(--color-primary)', 
          borderWidth: '2px',
          padding: 'var(--space-8) var(--space-6)', 
          textAlign: 'center', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 'var(--space-5)',
          overflow: 'hidden'
        }}>
          {/* Decorative Elements */}
          <div style={{ position: 'absolute', top: 'var(--space-4)', right: 'var(--space-4)', opacity: 0.3 }}>
            <Sparkles size={32} style={{ color: 'var(--color-primary)' }} />
          </div>
          <div style={{ position: 'absolute', bottom: 'var(--space-4)', left: 'var(--space-4)', opacity: 0.3 }}>
            <Sparkles size={24} style={{ color: 'var(--color-primary)' }} />
          </div>

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="badge badge-success" style={{ marginBottom: 'var(--space-3)', borderRadius: '9999px' }}>
              Limited Time Offer
            </div>
            <h2 style={{ marginBottom: 'var(--space-3)' }}>Ready to Transform Your Farm?</h2>
            <p style={{ fontSize: '1.1875rem', color: 'var(--color-text-secondary)', maxWidth: '36rem', margin: '0 auto', lineHeight: 1.7 }}>
              Join <strong style={{ color: 'var(--color-primary)' }}>10,000+</strong> Pakistani farmers already benefiting from AgriRate&apos;s intelligent solutions.
            </p>
          </div>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', justifyContent: 'center', paddingTop: 'var(--space-2)' }}>
            <a href="/auth/farmer/register" className="btn btn-primary hover-lift" style={{ fontSize: '1rem', padding: 'var(--space-3) var(--space-6)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              Start Your Free Trial <ArrowRight size={20} />
            </a>
            <a href="/auth/farmer/login" className="btn btn-secondary" style={{ fontSize: '1rem', padding: 'var(--space-3) var(--space-6)', textDecoration: 'none' }}>
              Sign In
            </a>
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
            No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  )
}
