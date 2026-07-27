import React, { useState } from 'react';
import { profile } from '../data/portfolioData';
import SEO from '../components/common/SEO';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all required fields.');
      return;
    }
    setError('');

    const subject = encodeURIComponent(`Project Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    window.location.href = mailtoUrl;
  };

  return (
    <>
      <SEO
        title="Contact — Enes Teke"
        description="Get in touch with Enes Teke for AI systems engineering, technical architecture, and full-stack software development projects."
        url="https://enesteke.me/contact"
      />
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          backgroundColor: '#000000',
          minHeight: '100vh',
          padding: '120px var(--page-padding) var(--section-gap)',
          fontFamily: "var(--font-family-mono)",
          color: '#f5f5f2',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ marginBottom: '50px' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.2em', color: '#73736e', marginBottom: '16px' }}>
              CONTACT / GET IN TOUCH
            </div>
            <h1
              style={{
                fontFamily: "var(--font-family-sans)",
                fontSize: "var(--font-display)",
                fontWeight: 300,
                color: '#f5f5f2',
                textTransform: 'uppercase',
                lineHeight: 1.05,
                marginBottom: '20px',
              }}
            >
              HAVE A SYSTEM <br />
              <span style={{ color: '#d7ff00' }}>WORTH BUILDING?</span>
            </h1>
            <p style={{ fontSize: '14px', color: '#b3b3ad', maxWidth: '600px', lineHeight: 1.6 }}>
              Available for AI systems engineering, technical architecture, multi-agent platform builds, and full-stack software development.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px' }}>
            {/* Form */}
            <div>
              <form onSubmit={handleSendMail} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {error && (
                  <div style={{ color: '#ff4d4d', fontSize: '11px' }}>
                    ⚠️ {error}
                  </div>
                )}

                <div>
                  <label htmlFor="name" style={{ display: 'block', fontSize: '10px', color: '#73736e', marginBottom: '6px' }}>
                    YOUR NAME *
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      backgroundColor: '#080808',
                      border: '1px solid rgba(255,255,255,0.15)',
                      padding: '10px 14px',
                      color: '#f5f5f2',
                      fontSize: '12px',
                      fontFamily: "var(--font-family-mono)",
                      borderRadius: '2px',
                      outline: 'none',
                    }}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" style={{ display: 'block', fontSize: '10px', color: '#73736e', marginBottom: '6px' }}>
                    YOUR EMAIL ADDRESS *
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      backgroundColor: '#080808',
                      border: '1px solid rgba(255,255,255,0.15)',
                      padding: '10px 14px',
                      color: '#f5f5f2',
                      fontSize: '12px',
                      fontFamily: "var(--font-family-mono)",
                      borderRadius: '2px',
                      outline: 'none',
                    }}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" style={{ display: 'block', fontSize: '10px', color: '#73736e', marginBottom: '6px' }}>
                    PROJECT DETAILS & MESSAGE *
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                      width: '100%',
                      backgroundColor: '#080808',
                      border: '1px solid rgba(255,255,255,0.15)',
                      padding: '10px 14px',
                      color: '#f5f5f2',
                      fontSize: '12px',
                      fontFamily: "var(--font-family-mono)",
                      borderRadius: '2px',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                    required
                  />
                </div>

                <div style={{ fontSize: '11px', color: '#73736e', lineHeight: 1.4 }}>
                  ℹ️ Submitting this form will open your default email application with your pre-filled inquiry addressed to <span style={{ color: '#d7ff00' }}>{profile.email}</span>.
                </div>

                <button
                  type="submit"
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#d7ff00',
                    color: '#000000',
                    fontWeight: 600,
                    fontSize: '12px',
                    fontFamily: "var(--font-family-mono)",
                    border: 'none',
                    cursor: 'pointer',
                    borderRadius: '2px',
                    transition: 'opacity 0.2s',
                  }}
                >
                  OPEN EMAIL CLIENT →
                </button>
              </form>
            </div>

            {/* Direct Information */}
            <div style={{ borderLeft: '1px solid var(--line-secondary)', paddingLeft: '40px' }}>
              <div style={{ marginBottom: '30px' }}>
                <div style={{ fontSize: '10px', color: '#73736e', marginBottom: '6px' }}>DIRECT EMAIL</div>
                <a href={`mailto:${profile.email}`} style={{ color: '#d7ff00', fontSize: '14px', textDecoration: 'none' }}>
                  {profile.email} →
                </a>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <div style={{ fontSize: '10px', color: '#73736e', marginBottom: '6px' }}>LOCATION</div>
                <div style={{ fontSize: '13px', color: '#f5f5f2' }}>{profile.location}</div>
              </div>

              <div>
                <div style={{ fontSize: '10px', color: '#73736e', marginBottom: '12px' }}>PROFILES & CHANNELS</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {profile.socials.map((s) => (
                    <a
                      key={s.name}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '12px', color: '#b3b3ad', textDecoration: 'none' }}
                    >
                      {s.name} [{s.handle}] ↗
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
