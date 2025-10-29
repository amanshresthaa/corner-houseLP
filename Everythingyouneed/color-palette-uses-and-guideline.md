import React, { useState } from 'react';

const WhiteHorsePalette = () => {
  const [copiedColor, setCopiedColor] = useState('');
  const [activeTheme, setActiveTheme] = useState('light');

  const palette = {
    primary: {
      name: "Himalayan Snow",
      description: "Pure white representing the White Horse and mountain peaks",
      shades: {
        "50": "#FFFFFF",
        "100": "#FAFAFA",
        "200": "#F5F5F5",
        "300": "#EEEEEE",
        "400": "#E0E0E0",
        "500": "#D4D4D4",
        "600": "#BDBDBD",
        "700": "#9E9E9E",
        "800": "#757575",
        "900": "#616161"
      }
    },
    accent: {
      name: "Royal Crimson",
      description: "Deep red from Nepalese flag and traditional textiles",
      shades: {
        "50": "#FEF2F2",
        "100": "#FEE2E2",
        "200": "#FECACA",
        "300": "#FCA5A5",
        "400": "#F87171",
        "500": "#DC143C",
        "600": "#C41E3A",
        "700": "#991B1B",
        "800": "#7F1D1D",
        "900": "#5F1416"
      }
    },
    secondary: {
      name: "Sapphire Blue",
      description: "Deep blue from Nepalese flag representing peace and harmony",
      shades: {
        "50": "#EFF6FF",
        "100": "#DBEAFE",
        "200": "#BFDBFE",
        "300": "#93C5FD",
        "400": "#60A5FA",
        "500": "#003893",
        "600": "#002D72",
        "700": "#002561",
        "800": "#001E4F",
        "900": "#001840"
      }
    },
    earth: {
      name: "Himalayan Clay",
      description: "Warm terracotta representing Nepal's earthen architecture",
      shades: {
        "50": "#FDF8F7",
        "100": "#F9EFEC",
        "200": "#F1DDD8",
        "300": "#E5C3B9",
        "400": "#D49D8C",
        "500": "#B8735A",
        "600": "#9C5D47",
        "700": "#7D4A39",
        "800": "#5F3A2D",
        "900": "#4A2E23"
      }
    },
    gold: {
      name: "Temple Gold",
      description: "Rich gold from temple decorations and celebration",
      shades: {
        "50": "#FFFDF7",
        "100": "#FEF9E7",
        "200": "#FDF2C8",
        "300": "#FCE7A1",
        "400": "#F9D669",
        "500": "#D4AF37",
        "600": "#B8941F",
        "700": "#8C7315",
        "800": "#6B5A11",
        "900": "#4F420C"
      }
    },
    forest: {
      name: "Mountain Forest",
      description: "Deep green from Nepal's lush forests and herbs",
      shades: {
        "50": "#F0FDF4",
        "100": "#DCFCE7",
        "200": "#BBF7D0",
        "300": "#86EFAC",
        "400": "#4ADE80",
        "500": "#2C5F2D",
        "600": "#234D24",
        "700": "#1A3D1B",
        "800": "#143016",
        "900": "#0F2411"
      }
    },
    neutral: {
      name: "Stone Grey",
      description: "Neutral tones for balance and sophistication",
      shades: {
        "50": "#F9FAFB",
        "100": "#F3F4F6",
        "200": "#E5E7EB",
        "300": "#D1D5DB",
        "400": "#9CA3AF",
        "500": "#6B7280",
        "600": "#4B5563",
        "700": "#374151",
        "800": "#1F2937",
        "900": "#111827"
      }
    }
  };

  const themes = {
    light: {
      name: "Daylight Dining",
      colors: {
        background: "#FFFFFF",
        surface: "#F9FAFB",
        cardBackground: "#FFFFFF",
        text: "#1F2937",
        textMuted: "#6B7280",
        border: "#E5E7EB",
        primary: "#DC143C",
        primaryHover: "#C41E3A",
        secondary: "#003893",
        accent: "#D4AF37",
        success: "#2C5F2D",
        warning: "#F9D669",
        error: "#DC143C"
      }
    },
    dark: {
      name: "Evening Pub Ambiance",
      colors: {
        background: "#1F2937",
        surface: "#374151",
        cardBackground: "#2D3748",
        text: "#F9FAFB",
        textMuted: "#D1D5DB",
        border: "#4B5563",
        primary: "#F87171",
        primaryHover: "#DC143C",
        secondary: "#60A5FA",
        accent: "#F9D669",
        success: "#4ADE80",
        warning: "#FCE7A1",
        error: "#FCA5A5"
      }
    }
  };

  const usageGuidelines = [
    {
      category: "Restaurant Menu & Signage",
      palette: ["Himalayan Snow (background)", "Royal Crimson (headings)", "Temple Gold (accents)", "Stone Grey (body text)"]
    },
    {
      category: "Pub/Bar Area",
      palette: ["Stone Grey 800 (background)", "Temple Gold (highlights)", "Royal Crimson (accents)", "Himalayan Snow (text)"]
    },
    {
      category: "Website/Digital",
      palette: ["Himalayan Snow (bg)", "Royal Crimson (CTA buttons)", "Sapphire Blue (links)", "Temple Gold (special offers)"]
    },
    {
      category: "Branding/Logo",
      palette: ["Himalayan Snow (horse)", "Royal Crimson (primary)", "Sapphire Blue (secondary)", "Temple Gold (accent)"]
    }
  ];

  const copyToClipboard = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(''), 2000);
  };

  const theme = themes[activeTheme].colors;

  return (
    <div style={{ 
      backgroundColor: theme.background, 
      minHeight: '100vh', 
      padding: '2rem',
      color: theme.text,
      transition: 'all 0.3s ease'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0, marginBottom: '0.5rem' }}>
              🐴 White Horse Restaurant & Pub
            </h1>
            <p style={{ fontSize: '1.125rem', color: theme.textMuted, margin: 0 }}>
              Nepalese Heritage Color Palette
            </p>
          </div>
          <button
            onClick={() => setActiveTheme(activeTheme === 'light' ? 'dark' : 'light')}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: theme.primary,
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem'
            }}
          >
            {activeTheme === 'light' ? '🌙 Pub Mode' : '☀️ Dining Mode'}
          </button>
        </div>

        {/* Theme Preview */}
        <div style={{ 
          marginBottom: '3rem', 
          padding: '2rem', 
          backgroundColor: theme.surface, 
          borderRadius: '16px',
          border: `2px solid ${theme.border}`
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
            {themes[activeTheme].name}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
            {Object.entries(theme).map(([name, color]) => (
              <div
                key={name}
                onClick={() => copyToClipboard(color)}
                style={{
                  padding: '1.25rem',
                  borderRadius: '8px',
                  backgroundColor: color,
                  color: name.includes('background') || name.includes('surface') || color.includes('F') ? '#1F2937' : '#fff',
                  cursor: 'pointer',
                  border: `2px solid ${theme.border}`,
                  transition: 'transform 0.2s',
                  position: 'relative'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{ fontWeight: '600', marginBottom: '0.5rem', fontSize: '0.875rem' }}>
                  {name.replace(/([A-Z])/g, ' $1').trim()}
                </div>
                <div style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>{color}</div>
                {copiedColor === color && (
                  <div style={{ 
                    position: 'absolute', 
                    top: '0.5rem', 
                    right: '0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 'bold'
                  }}>✓</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Usage Guidelines */}
        <div style={{ 
          marginBottom: '3rem', 
          padding: '2rem', 
          backgroundColor: theme.surface, 
          borderRadius: '16px',
          border: `2px solid ${theme.border}`
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Usage Guidelines</h2>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {usageGuidelines.map((guide, idx) => (
              <div key={idx} style={{ 
                padding: '1.5rem',
                backgroundColor: theme.cardBackground,
                borderRadius: '8px',
                border: `1px solid ${theme.border}`
              }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                  {guide.category}
                </h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {guide.palette.map((item, i) => (
                    <span key={i} style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: theme.primary,
                      color: '#fff',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Color Palettes */}
        <div style={{ display: 'grid', gap: '2rem' }}>
          {Object.entries(palette).map(([key, colorGroup]) => (
            <div key={key} style={{ 
              padding: '1.5rem', 
              backgroundColor: theme.surface, 
              borderRadius: '12px',
              border: `2px solid ${theme.border}`
            }}>
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '600', 
                  marginBottom: '0.5rem',
                  color: theme.primary
                }}>
                  {colorGroup.name}
                </h3>
                <p style={{ fontSize: '0.875rem', color: theme.textMuted, margin: 0 }}>
                  {colorGroup.description}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {Object.entries(colorGroup.shades).map(([shade, color]) => (
                  <div
                    key={shade}
                    onClick={() => copyToClipboard(color)}
                    style={{
                      flex: '1 1 100px',
                      minHeight: '120px',
                      backgroundColor: color,
                      borderRadius: '8px',
                      padding: '0.75rem',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      color: parseInt(shade) > 400 ? '#fff' : '#1F2937',
                      fontSize: '0.8rem',
                      transition: 'all 0.2s',
                      border: '2px solid transparent',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-4px)';
                      e.currentTarget.style.borderColor = theme.primary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.borderColor = 'transparent';
                    }}
                  >
                    <div style={{ fontWeight: '700', fontSize: '1rem' }}>{shade}</div>
                    <div style={{ fontSize: '0.7rem', fontFamily: 'monospace', opacity: 0.9 }}>{color}</div>
                    {copiedColor === color && (
                      <div style={{ 
                        position: 'absolute', 
                        top: '0.5rem', 
                        right: '0.5rem',
                        fontSize: '1.25rem'
                      }}>✓</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Brand Story */}
        <div style={{ 
          marginTop: '3rem', 
          padding: '2rem', 
          backgroundColor: theme.surface, 
          borderRadius: '16px',
          border: `2px solid ${theme.border}`
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Color Story</h2>
          <p style={{ lineHeight: '1.8', color: theme.textMuted, marginBottom: '1rem' }}>
            This palette combines the pristine white of the Himalayas with the rich colors of Nepalese culture. 
            The <strong style={{ color: theme.primary }}>Royal Crimson</strong> and <strong style={{ color: palette.secondary.shades["500"] }}>Sapphire Blue</strong> directly 
            reference Nepal's national flag, while <strong style={{ color: palette.gold.shades["500"] }}>Temple Gold</strong> evokes 
            the golden temples and Buddhist stupas that dot the landscape.
          </p>
          <p style={{ lineHeight: '1.8', color: theme.textMuted }}>
            <strong style={{ color: palette.earth.shades["500"] }}>Himalayan Clay</strong> grounds the palette with earthiness, 
            perfect for creating warm, inviting restaurant spaces, while <strong style={{ color: palette.forest.shades["500"] }}>Mountain Forest</strong> brings 
            freshness and connects to Nepal's natural herbs and spices used in traditional cuisine.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhiteHorsePalette;