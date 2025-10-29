import React, { useState } from 'react';

const WhiteHorsePalette = () => {
  const palettes = {
    original: {
      name: "Heritage Crimson",
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
        description: "Deep blue from Nepalese flag",
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
      themes: {
        light: {
          background: "#FFFFFF",
          surface: "#F9FAFB",
          text: "#1F2937",
          textMuted: "#6B7280",
          border: "#E5E7EB",
          primary: "#DC143C",
          primaryHover: "#C41E3A",
          secondary: "#003893",
          accent: "#D4AF37"
        },
        dark: {
          background: "#1F2937",
          surface: "#374151",
          text: "#F9FAFB",
          textMuted: "#D1D5DB",
          border: "#4B5563",
          primary: "#F87171",
          primaryHover: "#DC143C",
          secondary: "#60A5FA",
          accent: "#F9D669"
        }
      }
    },
    chestnut: {
      name: "Chestnut Heritage",
      primary: {
        name: "Chestnut Brown",
        description: "Rich chestnut brown representing the horse's coat and mountain earth",
        shades: {
          "50": "#FBF8F6",
          "100": "#F5EDE7",
          "200": "#EAD8CC",
          "300": "#DEBFAB",
          "400": "#CDA082",
          "500": "#954535",
          "600": "#7D3A2D",
          "700": "#662F24",
          "800": "#53281F",
          "900": "#45231C"
        }
      },
      accent: {
        name: "Copper Glow",
        description: "Warm copper tones from traditional metalwork and sunset",
        shades: {
          "50": "#FEF8F3",
          "100": "#FDEEE1",
          "200": "#FBD9C1",
          "300": "#F8BF97",
          "400": "#F49B6B",
          "500": "#B87333",
          "600": "#9D5F2A",
          "700": "#814D22",
          "800": "#6A401F",
          "900": "#58361C"
        }
      },
      secondary: {
        name: "Mountain Sage",
        description: "Soft sage green from Himalayan herbs and alpine meadows",
        shades: {
          "50": "#F6F8F4",
          "100": "#EDF1E7",
          "200": "#D9E3CC",
          "300": "#BDCFA8",
          "400": "#9DB67F",
          "500": "#6B8E4E",
          "600": "#57753F",
          "700": "#455D33",
          "800": "#394C2B",
          "900": "#2F4025"
        }
      },
      themes: {
        light: {
          background: "#FBF8F6",
          surface: "#F5EDE7",
          text: "#45231C",
          textMuted: "#6A401F",
          border: "#DEBFAB",
          primary: "#954535",
          primaryHover: "#7D3A2D",
          secondary: "#6B8E4E",
          accent: "#B87333"
        },
        dark: {
          background: "#45231C",
          surface: "#53281F",
          text: "#FBF8F6",
          textMuted: "#DEBFAB",
          border: "#662F24",
          primary: "#F49B6B",
          primaryHover: "#F8BF97",
          secondary: "#9DB67F",
          accent: "#FBD9C1"
        }
      }
    },
    emerald: {
      name: "Emerald Valley",
      primary: {
        name: "Deep Emerald",
        description: "Rich emerald green from Nepal's lush valleys and forests",
        shades: {
          "50": "#ECFDF5",
          "100": "#D1FAE5",
          "200": "#A7F3D0",
          "300": "#6EE7B7",
          "400": "#34D399",
          "500": "#047857",
          "600": "#05603A",
          "700": "#064E3B",
          "800": "#053F31",
          "900": "#04332A"
        }
      },
      accent: {
        name: "Prayer Flag Orange",
        description: "Vibrant orange from Buddhist prayer flags",
        shades: {
          "50": "#FFF7ED",
          "100": "#FFEDD5",
          "200": "#FED7AA",
          "300": "#FDBA74",
          "400": "#FB923C",
          "500": "#EA580C",
          "600": "#C2410C",
          "700": "#9A3412",
          "800": "#7C2D12",
          "900": "#6C2710"
        }
      },
      secondary: {
        name: "Mustang Sand",
        description: "Warm sand tones from Mustang region landscapes",
        shades: {
          "50": "#FEFCE8",
          "100": "#FEF9C3",
          "200": "#FEF08A",
          "300": "#FDE047",
          "400": "#FACC15",
          "500": "#C9A052",
          "600": "#A37F42",
          "700": "#826435",
          "800": "#6B512D",
          "900": "#5A4327"
        }
      },
      themes: {
        light: {
          background: "#FFFFFF",
          surface: "#ECFDF5",
          text: "#04332A",
          textMuted: "#064E3B",
          border: "#A7F3D0",
          primary: "#047857",
          primaryHover: "#05603A",
          secondary: "#EA580C",
          accent: "#C9A052"
        },
        dark: {
          background: "#04332A",
          surface: "#053F31",
          text: "#ECFDF5",
          textMuted: "#A7F3D0",
          border: "#064E3B",
          primary: "#34D399",
          primaryHover: "#6EE7B7",
          secondary: "#FB923C",
          accent: "#FEF08A"
        }
      }
    },
    midnight: {
      name: "Midnight Majesty",
      primary: {
        name: "Midnight Navy",
        description: "Deep navy representing night sky over the Himalayas",
        shades: {
          "50": "#F0F4F8",
          "100": "#D9E2EC",
          "200": "#BCCCDC",
          "300": "#9FB3C8",
          "400": "#829AB1",
          "500": "#1E3A5F",
          "600": "#102A43",
          "700": "#0C2133",
          "800": "#091A28",
          "900": "#061420"
        }
      },
      accent: {
        name: "Golden Hour",
        description: "Warm gold from sunrise over the peaks",
        shades: {
          "50": "#FFFBEB",
          "100": "#FEF3C7",
          "200": "#FDE68A",
          "300": "#FCD34D",
          "400": "#FBBF24",
          "500": "#F59E0B",
          "600": "#D97706",
          "700": "#B45309",
          "800": "#92400E",
          "900": "#78350F"
        }
      },
      secondary: {
        name: "Rhododendron Pink",
        description: "Soft pink from Nepal's national flower",
        shades: {
          "50": "#FDF2F8",
          "100": "#FCE7F3",
          "200": "#FBCFE8",
          "300": "#F9A8D4",
          "400": "#F472B6",
          "500": "#DB2777",
          "600": "#BE185D",
          "700": "#9D174D",
          "800": "#831843",
          "900": "#6B1A3A"
        }
      },
      themes: {
        light: {
          background: "#F0F4F8",
          surface: "#FFFFFF",
          text: "#091A28",
          textMuted: "#1E3A5F",
          border: "#BCCCDC",
          primary: "#1E3A5F",
          primaryHover: "#102A43",
          secondary: "#F59E0B",
          accent: "#DB2777"
        },
        dark: {
          background: "#091A28",
          surface: "#102A43",
          text: "#F0F4F8",
          textMuted: "#BCCCDC",
          border: "#1E3A5F",
          primary: "#829AB1",
          primaryHover: "#9FB3C8",
          secondary: "#FBBF24",
          accent: "#F9A8D4"
        }
      }
    }
  } as const;

  type PaletteKey = keyof typeof palettes;
  type ThemeKey = 'light' | 'dark';

  const [copiedColor, setCopiedColor] = useState('');
  const [activeTheme, setActiveTheme] = useState<ThemeKey>('light');
  const [activePalette, setActivePalette] = useState<PaletteKey>('original');

  const currentPalette = palettes[activePalette];
  const theme = currentPalette.themes[activeTheme];
  const paletteKeys = ['primary', 'accent', 'secondary'] as const;

  const copyToClipboard = (color: string) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(''), 2000);
  };

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
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', margin: 0, marginBottom: '0.5rem' }}>
            🐴 White Horse Restaurant & Pub
          </h1>
          <p style={{ fontSize: '1.125rem', color: theme.textMuted, margin: 0 }}>
            Alternative Color Palettes for Nepalese Heritage
          </p>
        </div>

        {/* Controls */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: '1 1 300px' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.875rem' }}>
              Choose Palette
            </label>
            <select
              value={activePalette}
              onChange={(e) => setActivePalette(e.target.value as PaletteKey)}
              style={{
                width: '100%',
                padding: '0.75rem',
                fontSize: '1rem',
                borderRadius: '8px',
                border: `2px solid ${theme.border}`,
                backgroundColor: theme.surface,
                color: theme.text,
                cursor: 'pointer'
              }}
            >
              {(Object.entries(palettes) as Array<[PaletteKey, (typeof palettes)[PaletteKey]]>).map(([key, p]) => (
                <option key={key} value={key}>{p.name}</option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setActiveTheme(activeTheme === 'light' ? 'dark' : 'light')}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: theme.primary,
              color: activePalette === 'chestnut' && activeTheme === 'light' ? '#fff' : 
                     activePalette === 'chestnut' && activeTheme === 'dark' ? '#000' : '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem',
              marginTop: 'auto'
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
            {activeTheme === 'light' ? 'Daylight Dining' : 'Evening Pub Ambiance'}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem' }}>
            {(Object.entries(theme) as Array<[string, string]>).map(([name, color]) => (
              <div
                key={name}
                onClick={() => copyToClipboard(color)}
                style={{
                  padding: '1.25rem',
                  borderRadius: '8px',
                  backgroundColor: color,
                  color: name.includes('background') || name.includes('surface') || 
                         (activePalette === 'chestnut' && activeTheme === 'light' && name !== 'text') ? 
                         theme.text : '#fff',
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
                <div style={{ fontSize: '0.7rem', fontFamily: 'monospace' }}>{color}</div>
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

        {/* Palette Description */}
        <div style={{ 
          marginBottom: '3rem', 
          padding: '2rem', 
          backgroundColor: theme.surface, 
          borderRadius: '16px',
          border: `2px solid ${theme.border}`
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>About This Palette</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {paletteKeys.map((key) => {
              const value = currentPalette[key];
              return (
                <div key={key} style={{ 
                  padding: '1rem',
                  backgroundColor: theme.background,
                  borderRadius: '8px',
                  border: `1px solid ${theme.border}`
                }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: theme.primary }}>
                    {value.name}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: theme.textMuted, margin: 0 }}>
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Color Palettes */}
        <div style={{ display: 'grid', gap: '2rem' }}>
          {paletteKeys.map((key) => {
            const colorGroup = currentPalette[key];
            return (
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
                  {(Object.entries(colorGroup.shades) as Array<[string, string]>).map(([shade, color]) => (
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
                        color: parseInt(shade) > 400 ? '#fff' : theme.text,
                        fontSize: '0.8rem',
                        transition: 'all 0.2s',
                        border: '2px solid transparent',
                        position: 'relative'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px)';
                        e.currentTarget.style.borderColor = theme.accent;
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
            );
          })}
        </div>

        {/* Comparison Guide */}
        <div style={{ 
          marginTop: '3rem', 
          padding: '2rem', 
          backgroundColor: theme.surface, 
          borderRadius: '16px',
          border: `2px solid ${theme.border}`
        }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Which Palette Should You Choose?</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: theme.background, borderRadius: '8px' }}>
              <strong style={{ color: '#DC143C' }}>Heritage Crimson:</strong> Traditional, bold, authentic Nepalese colors. Best for established cultural identity.
            </div>
            <div style={{ padding: '1rem', backgroundColor: theme.background, borderRadius: '8px' }}>
              <strong style={{ color: '#954535' }}>Chestnut Heritage:</strong> Warm, earthy, sophisticated. Perfect for rustic elegance and horse branding connection.
            </div>
            <div style={{ padding: '1rem', backgroundColor: theme.background, borderRadius: '8px' }}>
              <strong style={{ color: '#047857' }}>Emerald Valley:</strong> Fresh, natural, vibrant. Great for emphasizing organic ingredients and mountain freshness.
            </div>
            <div style={{ padding: '1rem', backgroundColor: theme.background, borderRadius: '8px' }}>
              <strong style={{ color: '#1E3A5F' }}>Midnight Majesty:</strong> Elegant, premium, sophisticated. Ideal for upscale dining and cocktail bar atmosphere.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhiteHorsePalette;
