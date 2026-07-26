import ScrollReveal from './ScrollReveal';

export default function SectionHeading({ title, highlight, subtitle }) {
  return (
    <ScrollReveal direction="up" className="section-heading">
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h2 style={{ marginBottom: '1rem' }}>
          {title}{' '}
          {highlight && <span className="gradient-text">{highlight}</span>}
        </h2>
        {subtitle && (
          <p style={{ margin: '0 auto', maxWidth: '600px', color: 'var(--text-muted)', fontSize: '1.05rem' }}>
            {subtitle}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}
