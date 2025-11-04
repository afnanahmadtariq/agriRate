"use client"

import { TrendingUp, Cloud, Leaf, Users } from "lucide-react"

const values = [
  {
    icon: TrendingUp,
    title: "Real-Time Market Rates",
    description: "Access live commodity prices across major Pakistani markets to make informed selling decisions.",
  },
  {
    icon: Cloud,
    title: "AI Weather Insights",
    description: "Get precise hyperlocal weather forecasts powered by advanced AI models for your exact location.",
  },
  {
    icon: Leaf,
    title: "Sustainable Farming",
    description: "Personalized recommendations for crop rotation, water management, and soil health.",
  },
  {
    icon: Users,
    title: "Farmer Community",
    description: "Connect with thousands of farmers, share experiences, and learn best practices together.",
  },
]

export default function ValueProposition() {
  return (
    <section style={{ padding: 'var(--space-12) var(--space-3)', backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)', maxWidth: '48rem', marginLeft: 'auto', marginRight: 'auto' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>Why Farmers Choose AgriRate</h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            Designed specifically for Pakistani agriculture with features that matter to you.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 'var(--space-4)' }}>
          {values.map((value, idx) => {
            const Icon = value.icon
            return (
              <article
                key={idx}
                className="card card-interactive"
                style={{ padding: 'var(--space-5)', backgroundColor: 'var(--color-surface-alt)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}
              >
                <div style={{ width: '3rem', height: '3rem', backgroundColor: 'var(--color-primary-subtle)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon style={{ color: 'var(--color-primary)' }} size={24} />
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text)' }}>{value.title}</h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{value.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
