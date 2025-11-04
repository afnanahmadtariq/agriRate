"use client"

import { Check } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for smallholder farmers",
    features: ["Basic market rates", "Daily weather forecast", "Limited market history", "Community forum access"],
    cta: "Get Started",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "999",
    currency: "PKR",
    period: "/month",
    description: "Most popular for active farmers",
    features: [
      "Real-time market analytics",
      "Advanced weather insights",
      "Historical price analysis",
      "Pest & disease alerts",
      "Irrigation scheduling",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For farm cooperatives & agribusiness",
    features: [
      "Everything in Professional",
      "API access for integrations",
      "Bulk user management",
      "Custom reporting",
      "Dedicated account manager",
      "White-label options",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" style={{ padding: 'var(--space-12) var(--space-3)' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: 'var(--space-8)', maxWidth: '48rem', marginLeft: 'auto', marginRight: 'auto' }}>
          <h2 style={{ marginBottom: 'var(--space-3)' }}>Simple, Transparent Pricing</h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            Choose the plan that fits your farm&apos;s needs. Scale anytime.
          </p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-5)', alignItems: 'center' }}>
          {plans.map((plan, idx) => (
            <article
              key={idx}
              className={plan.highlighted ? "card" : "card"}
              style={{
                padding: plan.highlighted ? 'var(--space-6)' : 'var(--space-5)',
                border: plan.highlighted ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                backgroundColor: plan.highlighted ? 'var(--color-surface)' : 'var(--color-surface-alt)',
                transform: plan.highlighted ? 'scale(1.05)' : 'scale(1)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
            >
              {plan.highlighted && (
                <div style={{ position: 'absolute', top: 'var(--space-3)', right: 'var(--space-3)' }}>
                  <span className="badge badge-success" style={{ borderRadius: '9999px' }}>Most Popular</span>
                </div>
              )}
              
              <div style={{ marginBottom: 'var(--space-5)' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 'var(--space-1)' }}>{plan.name}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{plan.description}</p>
              </div>
              
              <div style={{ marginBottom: 'var(--space-5)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-1)' }}>
                  {plan.currency && (
                    <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{plan.currency}</span>
                  )}
                  <span style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1 }}>{plan.price}</span>
                  {plan.period && (
                    <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>{plan.period}</span>
                  )}
                </div>
              </div>
              
              <button
                className={plan.highlighted ? "btn btn-primary hover-lift" : "btn btn-secondary"}
                style={{ width: '100%', marginBottom: 'var(--space-5)' }}
              >
                {plan.cta}
              </button>
              
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--color-border-subtle)' }}>
                {plan.features.map((feature, fidx) => (
                  <div key={fidx} style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'flex-start' }}>
                    <Check style={{ color: 'var(--color-success)', flexShrink: 0, marginTop: '2px' }} size={18} />
                    <span style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{feature}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div style={{ marginTop: 'var(--space-8)', textAlign: 'center', padding: 'var(--space-5)', backgroundColor: 'var(--color-primary-subtle)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-subtle)' }}>
          <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)' }}>
            All plans include a <strong style={{ color: 'var(--color-primary)' }}>14-day free trial</strong>. No credit card required.
          </p>
        </div>
      </div>
    </section>
  )
}
