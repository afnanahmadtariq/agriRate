"use client"

import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Muhammad Hassan",
    role: "Wheat Farmer",
    location: "Punjab",
    content:
      "AgriRate helped me increase my wheat yield by 23% this season. The weather alerts and market insights are game-changing.",
    rating: 5,
  },
  {
    name: "Fatima Bibi",
    role: "Cotton Producer",
    location: "Sindh",
    content: "Finally, a platform built for us. The real-time market rates saved me from selling at the wrong time.",
    rating: 5,
  },
  {
    name: "Akbar Khan",
    role: "Sugarcane Farmer",
    location: "KP",
    content:
      "The irrigation scheduling feature alone has reduced my water costs by 30%. Highly recommended for every farmer.",
    rating: 5,
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" style={{ padding: 'var(--space-12) var(--space-3)', backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: 'var(--space-8)', maxWidth: '48rem', marginLeft: 'auto', marginRight: 'auto' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>Trusted by Pakistani Farmers</h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            See how AgriRate is transforming agricultural outcomes
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-5)' }}>
          {testimonials.map((testimonial, idx) => (
            <article
              key={idx}
              className="card"
              style={{ 
                padding: 'var(--space-6)', 
                backgroundColor: 'var(--color-surface-alt)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
                position: 'relative'
              }}
            >
              <Quote style={{ position: 'absolute', top: 'var(--space-3)', right: 'var(--space-3)', color: 'var(--color-primary)', opacity: 0.2 }} size={32} />
              
              <div style={{ display: 'flex', gap: 'var(--space-1)' }}>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} style={{ color: 'var(--color-warning)', fill: 'var(--color-warning)' }} size={16} />
                ))}
              </div>
              
              <blockquote style={{ fontSize: '1.0625rem', color: 'var(--color-text)', lineHeight: 1.7, fontStyle: 'normal', margin: 0, flex: 1 }}>
                &ldquo;{testimonial.content}&rdquo;
              </blockquote>
              
              <footer style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--color-border-subtle)' }}>
                <cite style={{ fontStyle: 'normal', fontWeight: 600, fontSize: '1rem', color: 'var(--color-text)' }}>{testimonial.name}</cite>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                  {testimonial.role} • {testimonial.location}
                </p>
              </footer>
            </article>
          ))}
        </div>

        <div style={{ marginTop: 'var(--space-8)', textAlign: 'center' }}>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-3)' }}>
            Join <strong style={{ color: 'var(--color-primary)' }}>10,000+</strong> farmers already using AgriRate
          </p>
          <button className="btn btn-secondary">Read More Success Stories</button>
        </div>
      </div>
    </section>
  )
}
