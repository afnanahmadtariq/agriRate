"use client"

import { TrendingUp, TrendingDown } from "lucide-react"

const rates = [
  { crop: "Wheat", price: "2,450", unit: "40kg", change: 2.3, trend: "up" },
  { crop: "Rice", price: "3,800", unit: "40kg", change: -1.2, trend: "down" },
  { crop: "Cotton", price: "7,200", unit: "40kg", change: 3.1, trend: "up" },
  { crop: "Sugarcane", price: "240", unit: "kg", change: 0.8, trend: "up" },
]

export default function MarketRates() {
  return (
    <section style={{ padding: 'var(--space-12) var(--space-3)' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <div className="badge badge-success" style={{ marginBottom: 'var(--space-2)', borderRadius: '9999px' }}>Live Updates</div>
          <h2 style={{ marginBottom: 'var(--space-2)' }}>Market Rates</h2>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem' }}>Updated every hour from major Pakistani markets</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-3)' }}>
          {rates.map((rate, idx) => (
            <article 
              key={idx} 
              className="card" 
              style={{ 
                padding: 'var(--space-5)', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 'var(--space-3)',
                borderLeft: `4px solid ${rate.trend === 'up' ? 'var(--color-success)' : 'var(--color-error)'}`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{rate.crop}</h3>
                {rate.trend === "up" ? (
                  <TrendingUp style={{ color: 'var(--color-success)' }} size={20} />
                ) : (
                  <TrendingDown style={{ color: 'var(--color-error)' }} size={20} />
                )}
              </div>
              
              <div>
                <p style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1, marginBottom: 'var(--space-1)' }}>
                  PKR {rate.price}
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>per {rate.unit}</p>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', fontSize: '0.875rem', fontWeight: 600, color: rate.trend === 'up' ? 'var(--color-success)' : 'var(--color-error)' }}>
                {rate.trend === "up" ? "+" : ""}{rate.change}% today
              </div>
            </article>
          ))}
        </div>

        <div style={{ marginTop: 'var(--space-6)', textAlign: 'center' }}>
          <button className="btn btn-secondary">View Full Market Analysis</button>
        </div>
      </div>
    </section>
  )
}
