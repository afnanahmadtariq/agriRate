"use client"

import { BarChart3, MapPin, Zap, AlertCircle } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Market Analytics",
    description: "Track price trends, demand patterns, and seasonal variations across all major crops.",
  },
  {
    icon: MapPin,
    title: "Location Intelligence",
    description: "Hyperlocal recommendations based on your exact geographical and climate conditions.",
  },
  {
    icon: Zap,
    title: "Instant Alerts",
    description: "Receive real-time notifications for price spikes, weather changes, and pest warnings.",
  },
  {
    icon: AlertCircle,
    title: "Risk Management",
    description: "Early warning system for crop diseases and environmental hazards affecting your farm.",
  },
]

export default function Features() {
  return (
    <section id="features" style={{ padding: 'var(--space-8) var(--space-3)' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <h2>Powerful Features</h2>
          <p style={{ color: 'var(--color-text-muted)', maxWidth: '42rem', margin: '0 auto' }}>
            Everything you need to run a modern, profitable farm.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-6)' }}>
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div key={idx} className="feature-item" style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <div className="feature-icon" style={{ width: '3.5rem', height: '3.5rem', backgroundColor: 'var(--color-primary-subtle)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background-color var(--transition-base)' }}>
                  <Icon style={{ color: 'var(--color-primary)' }} size={28} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-text)' }}>{feature.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)' }}>{feature.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
