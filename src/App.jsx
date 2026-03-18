import { useState, useEffect } from "react";

const products = [
  {
    id: 1,
    type: "ebook",
    badge: "Bestseller",
    title: "The Dark Art of Conversion",
    subtitle: "Psychology-driven strategies to turn visitors into buyers",
    price: 29,
    originalPrice: 49,
    pages: "184 pages",
    format: "PDF + EPUB",
    tag: "Marketing",
    gradient: "from-amber-900/40 to-stone-900/40",
    accent: "#D4A853",
  },
  {
    id: 2,
    type: "template",
    badge: "New",
    title: "Obsidian UI Kit",
    subtitle: "60+ premium dark-mode components for Figma & Framer",
    price: 49,
    originalPrice: null,
    pages: "60+ components",
    format: "Figma + Framer",
    tag: "Design",
    gradient: "from-slate-800/60 to-zinc-900/40",
    accent: "#8B9CF4",
  },
  {
    id: 3,
    type: "ebook",
    badge: null,
    title: "Sovereign Finances",
    subtitle: "A no-fluff guide to building wealth independently",
    price: 19,
    originalPrice: 35,
    pages: "210 pages",
    format: "PDF",
    tag: "Finance",
    gradient: "from-emerald-900/30 to-stone-900/40",
    accent: "#4ADE80",
  },
  {
    id: 4,
    type: "template",
    badge: "Popular",
    title: "The Agency Deck",
    subtitle: "Pitch deck template that closes high-ticket clients",
    price: 39,
    originalPrice: 59,
    pages: "24 slides",
    format: "PowerPoint + Keynote",
    tag: "Business",
    gradient: "from-rose-900/30 to-zinc-900/40",
    accent: "#FB7185",
  },
  {
    id: 5,
    type: "ebook",
    badge: null,
    title: "Cold Email Codex",
    subtitle: "Scripts and systems for outbound that actually replies",
    price: 24,
    originalPrice: null,
    pages: "96 pages",
    format: "PDF + Templates",
    tag: "Sales",
    gradient: "from-sky-900/30 to-slate-900/40",
    accent: "#38BDF8",
  },
  {
    id: 6,
    type: "template",
    badge: "Limited",
    title: "Noir Portfolio",
    subtitle: "Webflow & Framer portfolio template for creatives",
    price: 69,
    originalPrice: 99,
    pages: "8 pages",
    format: "Webflow + Framer",
    tag: "Design",
    gradient: "from-violet-900/30 to-zinc-900/40",
    accent: "#C084FC",
  },
];

const typeFilters = ["All", "eBooks / PDFs", "Templates / Presets"];
const tagFilters = ["All", "Marketing", "Design", "Finance", "Business", "Sales"];

function CheckoutModal({ product, onClose }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [done, setDone] = useState(false);

  const handlePay = () => {
    if (email && cardNumber && expiry && cvc) {
      setDone(true);
    }
  };

  const formatCard = (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(8px)", animation: "fadeIn 0.2s ease",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: "linear-gradient(135deg, #141414 0%, #0d0d0d 100%)",
        border: "1px solid #2a2a2a",
        borderRadius: "20px",
        padding: "40px",
        width: "100%",
        maxWidth: "460px",
        margin: "0 16px",
        boxShadow: "0 40px 80px rgba(0,0,0,0.8)",
        animation: "slideUp 0.3s ease",
      }}>
        {done ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>✦</div>
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", color: "#fff", marginBottom: "8px" }}>
              Order Complete
            </div>
            <div style={{ color: "#888", fontSize: "14px", marginBottom: "28px" }}>
              Your download link has been sent to <span style={{ color: "#fff" }}>{email}</span>
            </div>
            <button onClick={onClose} style={{
              background: product.accent, color: "#000", border: "none", borderRadius: "10px",
              padding: "12px 32px", fontWeight: "700", cursor: "pointer", fontSize: "14px",
            }}>Done</button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "#fff", lineHeight: 1.2 }}>
                  {product.title}
                </div>
                <div style={{ color: "#666", fontSize: "13px", marginTop: "4px" }}>{product.format}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ color: product.accent, fontSize: "24px", fontWeight: "800" }}>${product.price}</div>
                {product.originalPrice && (
                  <div style={{ color: "#444", fontSize: "13px", textDecoration: "line-through" }}>${product.originalPrice}</div>
                )}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ color: "#666", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}>Email</label>
                <input
                  value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={{ color: "#666", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}>Card Number</label>
                <input
                  value={cardNumber} onChange={e => setCardNumber(formatCard(e.target.value))}
                  placeholder="4242 4242 4242 4242"
                  style={inputStyle}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label style={{ color: "#666", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}>Expiry</label>
                  <input
                    value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))}
                    placeholder="MM/YY"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={{ color: "#666", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase" }}>CVC</label>
                  <input
                    value={cvc} onChange={e => setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))}
                    placeholder="•••"
                    style={inputStyle}
                  />
                </div>
              </div>

              <button onClick={handlePay} style={{
                background: product.accent,
                color: "#000",
                border: "none",
                borderRadius: "12px",
                padding: "16px",
                fontWeight: "800",
                fontSize: "15px",
                cursor: "pointer",
                marginTop: "8px",
                letterSpacing: "0.02em",
                transition: "opacity 0.2s",
              }}
                onMouseEnter={e => e.target.style.opacity = "0.85"}
                onMouseLeave={e => e.target.style.opacity = "1"}
              >
                Pay ${product.price} →
              </button>

              <div style={{ textAlign: "center", color: "#444", fontSize: "12px" }}>
                🔒 Secured by Stripe · Instant delivery
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  background: "#1a1a1a",
  border: "1px solid #2a2a2a",
  borderRadius: "10px",
  color: "#fff",
  padding: "12px 14px",
  fontSize: "14px",
  outline: "none",
  marginTop: "6px",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
  fontFamily: "inherit",
};

export default function App() {
  const [typeFilter, setTypeFilter] = useState("All");
  const [tagFilter, setTagFilter] = useState("All");
  const [checkout, setCheckout] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    setTimeout(() => setLoaded(true), 100);
  }, []);

  const filtered = products.filter(p => {
    const typeMatch = typeFilter === "All"
      || (typeFilter === "eBooks / PDFs" && p.type === "ebook")
      || (typeFilter === "Templates / Presets" && p.type === "template");
    const tagMatch = tagFilter === "All" || p.tag === tagFilter;
    return typeMatch && tagMatch;
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "#080808",
      fontFamily: "'DM Sans', sans-serif",
      color: "#fff",
      opacity: loaded ? 1 : 0,
      transition: "opacity 0.5s ease",
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(24px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        @keyframes grain {
          0%, 100% { transform: translate(0, 0) }
          10% { transform: translate(-2%, -3%) }
          30% { transform: translate(3%, 2%) }
          50% { transform: translate(-1%, 4%) }
          70% { transform: translate(2%, -2%) }
          90% { transform: translate(-3%, 1%) }
        }
        .card:hover .card-inner { transform: translateY(-4px); }
        .card-inner { transition: transform 0.3s ease; }
        .pill:hover { background: #2a2a2a !important; }
        .pill-active { background: #fff !important; color: #000 !important; }
        input:focus { border-color: #555 !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0d0d0d; }
        ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 3px; }
      `}</style>

      {/* Noise overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
        opacity: 0.4,
      }} />

      {/* Nav */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        backdropFilter: "blur(20px)",
        background: "rgba(8,8,8,0.85)",
        borderBottom: "1px solid #1a1a1a",
        padding: "0 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "64px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "20px", color: "#D4A853" }}>✦</span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: "600", letterSpacing: "0.02em" }}>
            VAULTHAUS
          </span>
        </div>
        <div style={{ display: "flex", gap: "32px", fontSize: "13px", color: "#888" }}>
          <span style={{ cursor: "pointer", color: "#fff" }}>Shop</span>
          <span style={{ cursor: "pointer" }}>About</span>
          <span style={{ cursor: "pointer" }}>FAQ</span>
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        position: "relative",
        padding: "100px 40px 80px",
        textAlign: "center",
        overflow: "hidden",
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px", height: "300px",
          background: "radial-gradient(ellipse, rgba(212,168,83,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{
          display: "inline-block",
          border: "1px solid #2a2a2a",
          borderRadius: "100px",
          padding: "6px 16px",
          fontSize: "11px",
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "#D4A853",
          marginBottom: "28px",
        }}>
          Premium Digital Products
        </div>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(48px, 8vw, 88px)",
          fontWeight: "600",
          lineHeight: 1.0,
          letterSpacing: "-0.02em",
          marginBottom: "20px",
          color: "#fff",
        }}>
          Knowledge that<br />
          <em style={{ color: "#D4A853" }}>compounds.</em>
        </h1>
        <p style={{ color: "#666", fontSize: "16px", maxWidth: "480px", margin: "0 auto 48px", lineHeight: 1.6 }}>
          Curated eBooks, templates, and toolkits built for those who play to win.
          No fluff. Just results.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { label: "Instant delivery", icon: "⚡" },
            { label: "Stripe secured", icon: "🔒" },
            { label: "Lifetime access", icon: "∞" },
          ].map(f => (
            <div key={f.label} style={{
              background: "#111",
              border: "1px solid #1e1e1e",
              borderRadius: "100px",
              padding: "8px 18px",
              fontSize: "13px",
              color: "#888",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              <span>{f.icon}</span> {f.label}
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div style={{
        padding: "0 40px 36px",
        display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "center",
      }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {typeFilters.map(f => (
            <button key={f} className={`pill ${typeFilter === f ? "pill-active" : ""}`}
              onClick={() => setTypeFilter(f)}
              style={{
                background: typeFilter === f ? "#fff" : "#111",
                color: typeFilter === f ? "#000" : "#888",
                border: `1px solid ${typeFilter === f ? "#fff" : "#222"}`,
                borderRadius: "100px", padding: "7px 18px",
                fontSize: "13px", cursor: "pointer", transition: "all 0.2s",
                fontFamily: "inherit",
              }}>
              {f}
            </button>
          ))}
        </div>
        <div style={{ width: "1px", height: "20px", background: "#222" }} />
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {tagFilters.map(f => (
            <button key={f} className={`pill ${tagFilter === f ? "pill-active" : ""}`}
              onClick={() => setTagFilter(f)}
              style={{
                background: tagFilter === f ? "#fff" : "transparent",
                color: tagFilter === f ? "#000" : "#555",
                border: `1px solid ${tagFilter === f ? "#fff" : "#1e1e1e"}`,
                borderRadius: "100px", padding: "7px 16px",
                fontSize: "12px", cursor: "pointer", transition: "all 0.2s",
                fontFamily: "inherit",
              }}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div style={{
        padding: "0 40px 80px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: "20px",
      }}>
        {filtered.map((p, i) => (
          <div key={p.id} className="card" style={{
            animation: `slideUp 0.4s ease ${i * 0.06}s both`,
            cursor: "pointer",
          }}>
            <div className="card-inner" style={{
              background: `linear-gradient(135deg, #111 0%, #0d0d0d 100%)`,
              border: "1px solid #1e1e1e",
              borderRadius: "18px",
              overflow: "hidden",
              position: "relative",
            }}>
              {/* Card glow top */}
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: "120px",
                background: `linear-gradient(180deg, ${p.accent}10 0%, transparent 100%)`,
                pointerEvents: "none",
              }} />

              <div style={{ padding: "28px" }}>
                {/* Header row */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                  <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                    <span style={{
                      background: p.accent + "20",
                      color: p.accent,
                      border: `1px solid ${p.accent}40`,
                      borderRadius: "6px",
                      padding: "3px 10px",
                      fontSize: "11px",
                      fontWeight: "600",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}>{p.tag}</span>
                    {p.badge && (
                      <span style={{
                        background: "#1e1e1e",
                        color: "#888",
                        borderRadius: "6px",
                        padding: "3px 10px",
                        fontSize: "11px",
                        letterSpacing: "0.04em",
                      }}>{p.badge}</span>
                    )}
                  </div>
                  <span style={{
                    fontSize: "11px", color: "#444", textTransform: "uppercase", letterSpacing: "0.06em"
                  }}>
                    {p.type === "ebook" ? "PDF" : "Template"}
                  </span>
                </div>

                {/* Title */}
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "24px",
                  fontWeight: "600",
                  color: "#fff",
                  lineHeight: 1.2,
                  marginBottom: "10px",
                }}>{p.title}</h2>
                <p style={{
                  color: "#555",
                  fontSize: "13px",
                  lineHeight: 1.6,
                  marginBottom: "24px",
                }}>{p.subtitle}</p>

                {/* Meta */}
                <div style={{
                  display: "flex", gap: "16px",
                  borderTop: "1px solid #1a1a1a",
                  borderBottom: "1px solid #1a1a1a",
                  padding: "14px 0",
                  marginBottom: "20px",
                }}>
                  {[p.pages, p.format].map((m, i) => (
                    <span key={i} style={{ color: "#444", fontSize: "12px" }}>{m}</span>
                  ))}
                </div>

                {/* Price + CTA */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <span style={{ color: p.accent, fontSize: "26px", fontWeight: "800" }}>${p.price}</span>
                    {p.originalPrice && (
                      <span style={{ color: "#333", fontSize: "14px", textDecoration: "line-through", marginLeft: "8px" }}>
                        ${p.originalPrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => setCheckout(p)}
                    style={{
                      background: p.accent,
                      color: "#000",
                      border: "none",
                      borderRadius: "10px",
                      padding: "10px 22px",
                      fontWeight: "700",
                      fontSize: "13px",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      letterSpacing: "0.02em",
                      transition: "opacity 0.2s, transform 0.15s",
                    }}
                    onMouseEnter={e => { e.target.style.opacity = "0.85"; e.target.style.transform = "scale(0.97)"; }}
                    onMouseLeave={e => { e.target.style.opacity = "1"; e.target.style.transform = "scale(1)"; }}
                  >
                    Buy Now →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid #111",
        padding: "32px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#333",
        fontSize: "13px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ color: "#D4A853" }}>✦</span>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", color: "#555" }}>VAULTHAUS</span>
        </div>
        <span>© 2026 · All rights reserved</span>
      </div>

      {checkout && <CheckoutModal product={checkout} onClose={() => setCheckout(null)} />}
    </div>
  );
}