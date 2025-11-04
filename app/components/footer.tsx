"use client"

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Security", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press Kit", href: "#" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "Tutorials", href: "#" },
    { label: "Community", href: "#" },
    { label: "Support", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Contact", href: "#" },
  ],
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
      <div style={{ maxWidth: '80rem', margin: '0 auto', padding: 'var(--space-8) var(--space-3)' }}>
        
        {/* Main Footer Content */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-6)', marginBottom: 'var(--space-8)' }}>
          
          {/* Brand Section */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', marginBottom: 'var(--space-3)' }}>
              <div style={{ width: '2rem', height: '2rem', backgroundColor: 'var(--color-primary)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#ffffff', fontWeight: 700, fontSize: '0.875rem' }}>AR</span>
              </div>
              <span style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--color-text)' }}>AgriRate</span>
            </div>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, maxWidth: '280px' }}>
              Empowering Pakistani agriculture with intelligent technology and data-driven insights.
            </p>
          </div>

          {/* Product Links */}
          <nav>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Product</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {footerLinks.product.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color var(--transition-fast)' }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company Links */}
          <nav>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {footerLinks.company.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color var(--transition-fast)' }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Resources Links */}
          <nav>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Resources</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {footerLinks.resources.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color var(--transition-fast)' }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal Links */}
          <nav>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: 'var(--space-3)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {footerLinks.legal.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} style={{ fontSize: '0.9375rem', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color var(--transition-fast)' }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-5)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', alignItems: 'center', justifyContent: 'space-between' }} className="footer-bottom">
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0 }}>
              &copy; 2025 AgriRate. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <a href="#" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color var(--transition-fast)' }}>
                Twitter
              </a>
              <a href="#" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color var(--transition-fast)' }}>
                LinkedIn
              </a>
              <a href="#" style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color var(--transition-fast)' }}>
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
