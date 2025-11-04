"use client"

import { Cloud, Droplets, Wind, Sun, Thermometer } from "lucide-react"

const features = [
  {
    icon: Cloud,
    title: "Precision Forecasts",
    description: "Down to your exact village location",
  },
  {
    icon: Droplets,
    title: "Irrigation Planning",
    description: "Optimize water usage and reduce waste",
  },
  {
    icon: Wind,
    title: "Pest Alerts",
    description: "Early warning for weather-triggered pest outbreaks",
  },
]

export default function WeatherWidget() {
  return (
    <section style={{ padding: 'var(--space-12) var(--space-3)', backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-8)', alignItems: 'center' }}>
          
          {/* Content Side */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <div>
              <div className="badge badge-success" style={{ marginBottom: 'var(--space-2)', borderRadius: '9999px' }}>AI-Powered</div>
              <h2 style={{ marginBottom: 'var(--space-3)' }}>Weather Insights</h2>
              <p style={{ fontSize: '1.0625rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                Get accurate 14-day forecasts with pest and disease alerts specific to your crops. Our AI analyzes
                historical data and satellite imagery to predict optimal planting and harvesting times.
              </p>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {features.map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <div key={idx} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'flex-start' }}>
                    <div style={{ width: '2.5rem', height: '2.5rem', backgroundColor: 'var(--color-primary-subtle)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon style={{ color: 'var(--color-primary)' }} size={18} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: 'var(--space-1)' }}>{feature.title}</h4>
                      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Weather Card */}
          <div className="card" style={{ padding: 'var(--space-6)', minHeight: '28rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'var(--color-surface-alt)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '5rem', marginBottom: 'var(--space-3)' }}>🌤️</div>
              <div style={{ marginBottom: 'var(--space-4)' }}>
                <p style={{ fontSize: '3.5rem', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1, marginBottom: 'var(--space-1)' }}>28°C</p>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '1rem' }}>Partly Cloudy</p>
              </div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)' }}>
              <div style={{ textAlign: 'center' }}>
                <Wind style={{ color: 'var(--color-text-muted)', margin: '0 auto var(--space-1)' }} size={20} />
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-1)' }}>Wind</p>
                <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text)' }}>12 km/h</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Droplets style={{ color: 'var(--color-text-muted)', margin: '0 auto var(--space-1)' }} size={20} />
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-1)' }}>Humidity</p>
                <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text)' }}>65%</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <Thermometer style={{ color: 'var(--color-text-muted)', margin: '0 auto var(--space-1)' }} size={20} />
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: 'var(--space-1)' }}>Feels Like</p>
                <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text)' }}>30°C</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
