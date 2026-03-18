import { useState, useEffect } from "react";

const products = [
  {
    id: 1,
    type: "ebook",
    badge: "Bestseller",
    title: "Wealth Before 30",
    subtitle: "The no-BS playbook for building real wealth in your 20s",
    price: 14,
    originalPrice: 24,
    pages: "120 pages",
    format: "PDF",
    tag: "Wealth",
    accent: "#0A84FF",
  },
  {
    id: 2,
    type: "ebook",
    badge: "New",
    title: "Budget Like a CEO",
    subtitle: "A simple system to track, save and grow your money every month",
    price: 9,
    originalPrice: null,
    pages: "80 pages",
    format: "PDF + Worksheet",
    tag: "Budgeting",
    accent: "#30D158",
  },
  {
    id: 3,
    type: "ebook",
    badge: "Popular",
    title: "The Side Hustle Blueprint",
    subtitle: "6 proven income streams you can start this weekend with zero capital",
    price: 17,
    originalPrice: 29,
    pages: "140 pages",
    format: "PDF",
    tag: "Income",
    accent: "#FF9F0A",
  },
  {
    id: 4,
    type: "ebook",
    badge: null,
    title: "The Zurya Mindset",
    subtitle: "Rewire how you think about money, risk and long-term freedom",
    price: 12,
    originalPrice: 19,
    pages: "96 pages",
    format: "PDF",
    tag: "Mindset",
    accent: "#BF5AF2",
  },
];

const tagFilters = ["All", "Wealth", "Budgeting", "Income", "Mindset"];

function CheckoutModal({ product, onClose }) {
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [done, setDone] = useState(false);

  const handlePay = () => {
    if (email && cardNumber && expiry && cvc) setDone(true);
  };

  const formatCard = (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 4);
    return d.length >= 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
  };

  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()} style={{
      position: "fixed", inset: 0,
      background: "rgba(0,0,0,0.4)",
      backdropFilter: "blur(20px)",
      zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center",
      animation: "fadeIn 0.2s ease",
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "20px",
        padding: "40px",
        width: "100%",
        maxWidth: "420px",
        margin: "0 16px",
        boxShadow: "0 32px 64px rgba(0,0,0,0.12)",
        animation: "slideUp 0.3s ease",
      }}>
        {done ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{
              width: "56px", height: "56px",
              background: "#30D158",
              borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
              fontSize: "24px",
            }}>✓</div>
            <div style={{ fontSize: "22px", fontWeight: "700", color: "#1d1d1f", marginBottom: "8px" }}>
              Order Complete
            </div>
            <div style={{ color: "#86868b", fontSize: "14px", marginBottom: "28px" }}>
              Download link sent to <span style={{ color: "#1d1d1f" }}>{email}</span>
            </div>
            <button onClick={onClose} style={{
              background: "#1d1d1f", color: "#fff", border: "none",
              borderRadius: "980px", padding: "12px 32px",
              fontWeight: "600", cursor: "pointer", fontSize: "15px",
              fontFamily: "inherit",
            }}>Done</button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "28px" }}>
              <div>
                <div style={{ fontSize: "17px", fontWeight: "700", color: "#1d1d1f" }}>{product.title}</div>
                <div style={{ color: "#86868b", fontSize: "13px", marginTop: "2px" }}>{product.format}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "22px", fontWeight: "700", color: "#1d1d1f" }}>${product.price}</div>
                {product.originalPrice && (
                  <div style={{ color: "#c7c7cc", fontSize: "13px", textDecoration: "line-through" }}>${product.originalPrice}</div>
                )}
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { label: "Email", value: email, setter: setEmail, placeholder: "you@example.com", format: null },
                { label: "Card Number", value: cardNumber, setter: (v) => setCardNumber(formatCard(v)), placeholder: "1234 5678 9012 3456", format: null },
              ].map(f => (
                <div key={f.label}>
                  <label style={{ color: "#86868b", fontSize: "12px", fontWeight: "500" }}>{f.label}</label>
                  <input value={f.value} onChange={e => f.setter(e.target.value)} placeholder={f.placeholder}
                    style={inputStyle} />
                </div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ color: "#86868b", fontSize: "12px", fontWeight: "500" }}>Expiry</label>
                  <input value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))} placeholder="MM/YY" style={inputStyle} />
                </div>
                <div>
                  <label style={{ color: "#86868b", fontSize: "12px", fontWeight: "500" }}>CVC</label>
                  <input value={cvc} onChange={e => setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))} placeholder="•••" style={inputStyle} />
                </div>
              </div>

              <button onClick={handlePay} style={{
                background: "#1d1d1f", color: "#fff", border: "none",
                borderRadius: "980px", padding: "14px",
                fontWeight: "600", fontSize: "15px",
                cursor: "pointer", marginTop: "8px",
                fontFamily: "inherit", letterSpacing: "-0.01em",
                transition: "opacity 0.15s",
              }}
                onMouseEnter={e => e.target.style.opacity = "0.8"}
                onMouseLeave={e => e.target.style.opacity = "1"}
              >
                Pay ${product.price}
              </button>
              <div style={{ textAlign: "center", color: "#c7c7cc", fontSize: "12px" }}>
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
  background: "#f5f5f7",
  border: "none",
  borderRadius: "10px",
  color: "#1d1d1f",
  padding: "12px 14px",
  fontSize: "15px",
  outline: "none",
  marginTop: "6px",
  boxSizing: "border-box",
  fontFamily: "inherit",
  transition: "background 0.15s",
};

export default function App() {
  const [tagFilter, setTagFilter] = useState("All");
  const [checkout, setCheckout] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@300;400;500;600;700&family=Manrope:wght@300;400;500;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    setTimeout(() => setLoaded(true), 80);
  }, []);

  const filtered = products.filter(p =>
    tagFilter === "All" || p.tag === tagFilter
  );

  return (
    <div style={{
      minHeight: "100vh",
      background: "#F5F5F7",
      fontFamily: "'Manrope', -apple-system, BlinkMacSystemFont, sans-serif",
      color: "#1d1d1f",
      opacity: loaded ? 1 : 0,
      transition: "opacity 0.4s ease",
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        @keyframes cardIn { from { transform: translateY(16px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
        .card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card:hover { transform: translateY(-4px); box-shadow: 0 20px 40px rgba(0,0,0,0.08) !important; }
        .pill { transition: all 0.2s ease; cursor: pointer; }
        .pill:hover { background: #e8e8ed !important; }
        .buy-btn { transition: all 0.15s ease; }
        .buy-btn:hover { opacity: 0.75 !important; }
        input:focus { background: #ebebf0 !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #F5F5F7; }
        ::-webkit-scrollbar-thumb { background: #d2d2d7; border-radius: 3px; }
      `}</style>

      {/* Nav */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(245,245,247,0.85)",
        backdropFilter: "saturate(180%) blur(20px)",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
        padding: "0 48px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "52px",
      }}>
        <div style={{
          fontSize: "18px", fontWeight: "700",
          letterSpacing: "-0.03em", color: "#1d1d1f",
        }}>
          zurya
        </div>
        <div style={{ display: "flex", gap: "28px", fontSize: "13px", color: "#86868b", fontWeight: "500" }}>
          {["Shop", "About", "FAQ"].map(item => (
            <span key={item} style={{ cursor: "pointer", transition: "color 0.15s" }}
              onMouseEnter={e => e.target.style.color = "#1d1d1f"}
              onMouseLeave={e => e.target.style.color = "#86868b"}
            >{item}</span>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <div style={{
        padding: "100px 48px 80px",
        maxWidth: "980px",
        margin: "0 auto",
      }}>
        <p style={{
          fontSize: "17px",
          fontWeight: "500",
          color: "#86868b",
          marginBottom: "16px",
          letterSpacing: "-0.01em",
        }}>
          Finance & Wealth Guides
        </p>
        <h1 style={{
          fontSize: "clamp(48px, 7vw, 80px)",
          fontWeight: "700",
          lineHeight: 1.05,
          letterSpacing: "-0.04em",
          color: "#1d1d1f",
          marginBottom: "24px",
        }}>
          Your wealth,<br />starts here.
        </h1>
        <p style={{
          fontSize: "19px",
          color: "#86868b",
          maxWidth: "480px",
          lineHeight: 1.6,
          letterSpacing: "-0.01em",
          marginBottom: "48px",
          fontWeight: "400",
        }}>
          Practical eBooks on wealth building, budgeting,
          side hustles and financial mindset. No fluff.
        </p>

        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {[
            { label: "Instant delivery", icon: "⚡" },
            { label: "Stripe secured", icon: "🔒" },
            { label: "Lifetime access", icon: "∞" },
          ].map(f => (
            <div key={f.label} style={{
              background: "#f5f5f7",
              borderRadius: "980px",
              padding: "8px 16px",
              fontSize: "13px",
              color: "#6e6e73",
              display: "flex", alignItems: "center", gap: "6px",
              fontWeight: "500",
            }}>
              <span>{f.icon}</span>{f.label}
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: "1px", background: "rgba(0,0,0,0.06)", margin: "0 48px" }} />

      {/* Filters */}
      <div style={{
        padding: "28px 48px",
        maxWidth: "980px",
        margin: "0 auto",
        display: "flex", gap: "8px", flexWrap: "wrap",
      }}>
        {tagFilters.map(f => (
          <button key={f} className="pill"
            onClick={() => setTagFilter(f)}
            style={{
              background: tagFilter === f ? "#1d1d1f" : "#f5f5f7",
              color: tagFilter === f ? "#fff" : "#6e6e73",
              border: "none",
              borderRadius: "980px",
              padding: "7px 18px",
              fontSize: "13px",
              fontWeight: "500",
              cursor: "pointer",
              fontFamily: "inherit",
              letterSpacing: "-0.01em",
            }}>
            {f}
          </button>
        ))}
      </div>

      {/* Products */}
      <div style={{
        padding: "0 48px 100px",
        maxWidth: "980px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "16px",
      }}>
        {filtered.map((p, i) => (
          <div key={p.id} className="card" style={{
            background: "#fff",
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
            border: "1px solid rgba(0,0,0,0.04)",
            animation: `cardIn 0.4s ease ${i * 0.07}s both`,
          }}>
            {/* Color bar */}
            <div style={{
              height: "4px",
              background: p.accent,
              opacity: 0.8,
            }} />

            <div style={{ padding: "28px" }}>
              {/* Tags row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <span style={{
                  background: p.accent + "15",
                  color: p.accent,
                  borderRadius: "6px",
                  padding: "3px 10px",
                  fontSize: "12px",
                  fontWeight: "600",
                  letterSpacing: "0.02em",
                }}>{p.tag}</span>
                {p.badge && (
                  <span style={{
                    background: "#f5f5f7",
                    color: "#86868b",
                    borderRadius: "6px",
                    padding: "3px 10px",
                    fontSize: "12px",
                    fontWeight: "500",
                  }}>{p.badge}</span>
                )}
              </div>

              {/* Title */}
              <h2 style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#1d1d1f",
                lineHeight: 1.25,
                letterSpacing: "-0.02em",
                marginBottom: "8px",
              }}>{p.title}</h2>

              <p style={{
                color: "#86868b",
                fontSize: "14px",
                lineHeight: 1.55,
                marginBottom: "24px",
                fontWeight: "400",
              }}>{p.subtitle}</p>

              {/* Meta */}
              <div style={{
                display: "flex", gap: "16px",
                borderTop: "1px solid #f5f5f7",
                paddingTop: "16px",
                marginBottom: "20px",
              }}>
                {[p.pages, p.format].map((m, i) => (
                  <span key={i} style={{ color: "#c7c7cc", fontSize: "12px", fontWeight: "500" }}>{m}</span>
                ))}
              </div>

              {/* Price + CTA */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                  <span style={{ fontSize: "22px", fontWeight: "700", color: "#1d1d1f", letterSpacing: "-0.02em" }}>${p.price}</span>
                  {p.originalPrice && (
                    <span style={{ color: "#c7c7cc", fontSize: "14px", textDecoration: "line-through" }}>${p.originalPrice}</span>
                  )}
                </div>
                <button className="buy-btn"
                  onClick={() => setCheckout(p)}
                  style={{
                    background: "#1d1d1f",
                    color: "#fff",
                    border: "none",
                    borderRadius: "980px",
                    padding: "9px 20px",
                    fontWeight: "600",
                    fontSize: "14px",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    letterSpacing: "-0.01em",
                  }}>
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid rgba(0,0,0,0.06)",
        padding: "28px 48px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#c7c7cc",
        fontSize: "13px",
        fontWeight: "500",
      }}>
        <span style={{ color: "#1d1d1f", fontWeight: "700", letterSpacing: "-0.03em", fontSize: "15px" }}>zurya</span>
        <span>© 2026 Zurya · All rights reserved</span>
      </div>

      {checkout && <CheckoutModal product={checkout} onClose={() => setCheckout(null)} />}
    </div>
  );
}