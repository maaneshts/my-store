import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ACCENT = "#0A84FF";

const products = [
  { id: 1, type: "ebook", badge: "Bestseller", title: "Wealth Before 30", subtitle: "The no-BS playbook for building real wealth in your 20s", price: 14, originalPrice: 24, pages: "120 pages", format: "PDF", tag: "Wealth", accent: "#0A84FF" },
  { id: 2, type: "ebook", badge: "New", title: "Budget Like a CEO", subtitle: "A simple system to track, save and grow your money every month", price: 9, originalPrice: null, pages: "80 pages", format: "PDF + Worksheet", tag: "Budgeting", accent: "#30D158" },
  { id: 3, type: "ebook", badge: "Popular", title: "The Side Hustle Blueprint", subtitle: "6 proven income streams you can start this weekend with zero capital", price: 17, originalPrice: 29, pages: "140 pages", format: "PDF", tag: "Income", accent: "#FF9F0A" },
  { id: 4, type: "ebook", badge: null, title: "The Zurya Mindset", subtitle: "Rewire how you think about money, risk and long-term freedom", price: 12, originalPrice: 19, pages: "96 pages", format: "PDF", tag: "Mindset", accent: "#BF5AF2" },
  { id: 5, type: "ebook", badge: "New", title: "Fit in 30 Days", subtitle: "A no-gym, no-excuse fitness plan that actually sticks", price: 11, originalPrice: 19, pages: "90 pages", format: "PDF", tag: "Fitness", accent: "#FF375F" },
  { id: 6, type: "ebook", badge: null, title: "Deep Work Daily", subtitle: "Build a productivity system that gets more done in less time", price: 10, originalPrice: null, pages: "76 pages", format: "PDF", tag: "Productivity", accent: "#5E5CE6" },
  { id: 7, type: "ebook", badge: "Popular", title: "Relationship OS", subtitle: "The honest guide to building connections that last", price: 13, originalPrice: 21, pages: "100 pages", format: "PDF", tag: "Relationships", accent: "#FF6B6B" },
  { id: 8, type: "template", badge: "New", title: "Monthly Budget Tracker", subtitle: "A clean ready-to-use worksheet to track every dollar you spend", price: 7, originalPrice: null, pages: "5 sheets", format: "PDF Worksheet", tag: "Templates", accent: "#30D158" },
  { id: 9, type: "template", badge: null, title: "Morning Routine Checklist", subtitle: "A proven checklist to win your mornings and own your day", price: 5, originalPrice: 9, pages: "2 pages", format: "PDF Checklist", tag: "Checklists", accent: "#FF9F0A" },
  { id: 10, type: "template", badge: "Bestseller", title: "Goal Setting Cheat Sheet", subtitle: "The one-page system used by top performers to hit every goal", price: 6, originalPrice: null, pages: "1 page", format: "PDF Cheat Sheet", tag: "Checklists", accent: "#0A84FF" },
  { id: 11, type: "template", badge: null, title: "Weekly Planner Template", subtitle: "Plan your week like a pro — time blocks, priorities and habits", price: 6, originalPrice: 10, pages: "3 pages", format: "PDF Template", tag: "Templates", accent: "#5E5CE6" },
  { id: 12, type: "template", badge: "New", title: "Fitness Tracker Sheet", subtitle: "Log workouts, track progress and stay consistent every week", price: 5, originalPrice: null, pages: "4 sheets", format: "PDF Worksheet", tag: "Templates", accent: "#FF375F" },
];

const tagFilters = ["All", "Wealth", "Budgeting", "Income", "Mindset", "Fitness", "Productivity", "Relationships", "Templates", "Checklists"];

const inputStyle = {
  width: "100%", background: "#f5f5f7", border: "1.5px solid transparent",
  borderRadius: "12px", color: "#1d1d1f", padding: "12px 14px",
  fontSize: "15px", outline: "none", marginTop: "6px",
  boxSizing: "border-box", fontFamily: "inherit",
};

function CheckoutModal({ product, onClose }) {
  const [email, setEmail] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [done, setDone] = useState(false);

  const handlePay = () => { if (email && cardNumber && expiry && cvc) setDone(true); };
  const formatCard = (v) => v.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const formatExpiry = (v) => { const d = v.replace(/\D/g, "").slice(0, 4); return d.length >= 2 ? d.slice(0, 2) + "/" + d.slice(2) : d; };

  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      backdropFilter: "blur(20px)", zIndex: 300,
      display: "flex", alignItems: "center", justifyContent: "center",
      animation: "fadeIn 0.2s ease", padding: "20px",
    }}>
      <div style={{ background: "#fff", borderRadius: "24px", padding: "40px", width: "100%", maxWidth: "420px", boxShadow: "0 40px 80px rgba(0,0,0,0.18)", animation: "slideUp 0.3s ease" }}>
        {done ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: "64px", height: "64px", background: "#30D158", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "28px", color: "#fff" }}>✓</div>
            <div style={{ fontSize: "22px", fontWeight: "700", color: "#111", marginBottom: "8px" }}>Order Complete!</div>
            <div style={{ color: "#6e6e73", fontSize: "14px", marginBottom: "28px" }}>Download link sent to <strong style={{ color: "#111" }}>{email}</strong></div>
            <button onClick={onClose} style={{ background: "#111", color: "#fff", border: "none", borderRadius: "980px", padding: "13px 36px", fontWeight: "600", cursor: "pointer", fontSize: "15px", fontFamily: "inherit" }}>Done</button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
              <div>
                <div style={{ fontSize: "17px", fontWeight: "700", color: "#111" }}>{product.title}</div>
                <div style={{ color: "#6e6e73", fontSize: "13px", marginTop: "2px" }}>{product.format}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "26px", fontWeight: "800", color: "#111" }}>${product.price}</div>
                {product.originalPrice && <div style={{ color: "#c7c7cc", fontSize: "13px", textDecoration: "line-through" }}>${product.originalPrice}</div>}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ color: "#6e6e73", fontSize: "11px", fontWeight: "700", letterSpacing: "0.06em", textTransform: "uppercase" }}>Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} onFocus={e => e.target.style.border = `1.5px solid ${product.accent}`} onBlur={e => e.target.style.border = "1.5px solid transparent"} />
              </div>
              <div>
                <label style={{ color: "#6e6e73", fontSize: "11px", fontWeight: "700", letterSpacing: "0.06em", textTransform: "uppercase" }}>Card Number</label>
                <input value={cardNumber} onChange={e => setCardNumber(formatCard(e.target.value))} placeholder="1234 5678 9012 3456" style={inputStyle} onFocus={e => e.target.style.border = `1.5px solid ${product.accent}`} onBlur={e => e.target.style.border = "1.5px solid transparent"} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ color: "#6e6e73", fontSize: "11px", fontWeight: "700", letterSpacing: "0.06em", textTransform: "uppercase" }}>Expiry</label>
                  <input value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))} placeholder="MM/YY" style={inputStyle} onFocus={e => e.target.style.border = `1.5px solid ${product.accent}`} onBlur={e => e.target.style.border = "1.5px solid transparent"} />
                </div>
                <div>
                  <label style={{ color: "#6e6e73", fontSize: "11px", fontWeight: "700", letterSpacing: "0.06em", textTransform: "uppercase" }}>CVC</label>
                  <input value={cvc} onChange={e => setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))} placeholder="•••" style={inputStyle} onFocus={e => e.target.style.border = `1.5px solid ${product.accent}`} onBlur={e => e.target.style.border = "1.5px solid transparent"} />
                </div>
              </div>
              <button onClick={handlePay} style={{ background: product.accent, color: "#fff", border: "none", borderRadius: "14px", padding: "15px", fontWeight: "700", fontSize: "16px", cursor: "pointer", fontFamily: "inherit", transition: "opacity 0.15s" }}
                onMouseEnter={e => e.target.style.opacity = "0.85"} onMouseLeave={e => e.target.style.opacity = "1"}>
                Get Instant Access · ${product.price}
              </button>
              <div style={{ textAlign: "center", color: "#c7c7cc", fontSize: "12px", display: "flex", gap: "10px", justifyContent: "center" }}>
                <span>🔒 Stripe secured</span><span>·</span><span>⚡ Instant delivery</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function Shop() {
  const navigate = useNavigate();
  const [tagFilter, setTagFilter] = useState("All");
  const [checkout, setCheckout] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.style.width = "100%";
    document.body.style.margin = "0";
    document.body.style.overflowX = "hidden";
  }, []);

  const filtered = products.filter(p => tagFilter === "All" || p.tag === tagFilter);

  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "#F5F5F7", fontFamily: "'Poppins', -apple-system, sans-serif", color: "#111", overflowX: "hidden" }}>
      <style>{`
        html,body,#root{width:100%!important;margin:0!important;padding:0!important;overflow-x:hidden!important}
        *{box-sizing:border-box;margin:0;padding:0}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}
        @keyframes cardIn{from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1}}
        .card{transition:transform 0.3s ease,box-shadow 0.3s ease}
        .card:hover{transform:translateY(-6px)!important;box-shadow:0 24px 48px rgba(0,0,0,0.1)!important}
        .nav-link{cursor:pointer;transition:color 0.15s}
        .nav-link:hover{color:#111!important}
        @media(max-width:768px){.pad{padding:48px 24px!important}}
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, width: "100%", background: "rgba(245,245,247,0.92)", backdropFilter: "saturate(180%) blur(20px)", borderBottom: "1px solid rgba(0,0,0,0.07)", padding: "0 64px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "58px" }}>
        <div style={{ fontSize: "21px", fontWeight: "800", letterSpacing: "-0.04em", color: "#111", cursor: "pointer" }} onClick={() => navigate("/")}>zurya</div>
        <div style={{ display: "flex", gap: "32px", fontSize: "14px", color: "#6e6e73", fontWeight: "500" }}>
          <span className="nav-link" style={{ color: "#111", fontWeight: "700" }}>Shop</span>
          <span className="nav-link" onClick={() => navigate("/")}>Home</span>
        </div>
      </nav>

      {/* SHOP HEADER */}
      <div className="pad" style={{ padding: "64px 64px 40px", maxWidth: "1200px", margin: "0 auto" }}>
        <button onClick={() => navigate("/")} style={{ background: "none", border: "none", color: "#6e6e73", fontSize: "14px", fontWeight: "500", cursor: "pointer", fontFamily: "inherit", marginBottom: "24px", display: "flex", alignItems: "center", gap: "6px", padding: 0 }}>
          ← Back to Home
        </button>
        <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: "800", letterSpacing: "-0.04em", color: "#111", marginBottom: "12px" }}>All Guides</h1>
        <p style={{ fontSize: "17px", color: "#6e6e73", marginBottom: "40px" }}>{products.length} guides across finance, fitness, productivity and more</p>

        {/* Filters */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {tagFilters.map(f => (
            <button key={f} onClick={() => setTagFilter(f)} style={{ background: tagFilter === f ? "#111" : "#fff", color: tagFilter === f ? "#fff" : "#6e6e73", border: tagFilter === f ? "none" : "1px solid rgba(0,0,0,0.08)", borderRadius: "980px", padding: "8px 20px", fontSize: "13px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s", boxShadow: tagFilter === f ? "0 4px 14px rgba(0,0,0,0.14)" : "none" }}>{f}</button>
          ))}
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="pad" style={{ padding: "0 64px 80px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "20px" }}>
          <p style={{ color: "#6e6e73", fontSize: "14px", fontWeight: "500" }}>{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "18px" }}>
          {filtered.map((p, i) => (
            <div key={p.id} className="card" style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.05)", animation: `cardIn 0.4s ease ${i * 0.05}s both` }}>
              <div style={{ height: "5px", background: p.accent }} />
              <div style={{ padding: "26px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                  <span style={{ background: p.accent + "18", color: p.accent, borderRadius: "8px", padding: "4px 12px", fontSize: "12px", fontWeight: "700" }}>{p.tag}</span>
                  {p.badge && <span style={{ background: "#F5F5F7", color: "#6e6e73", borderRadius: "8px", padding: "4px 12px", fontSize: "12px", fontWeight: "600" }}>{p.badge}</span>}
                </div>
                <h3 style={{ fontSize: "19px", fontWeight: "700", color: "#111", lineHeight: 1.25, letterSpacing: "-0.02em", marginBottom: "8px" }}>{p.title}</h3>
                <p style={{ color: "#6e6e73", fontSize: "14px", lineHeight: 1.6, marginBottom: "20px" }}>{p.subtitle}</p>
                <div style={{ display: "flex", gap: "14px", borderTop: "1px solid #F5F5F7", paddingTop: "14px", marginBottom: "18px" }}>
                  {[p.pages, p.format].map((m, i) => <span key={i} style={{ color: "#c7c7cc", fontSize: "12px", fontWeight: "500" }}>{m}</span>)}
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                    <span style={{ fontSize: "24px", fontWeight: "800", color: "#111", letterSpacing: "-0.02em" }}>${p.price}</span>
                    {p.originalPrice && <span style={{ color: "#c7c7cc", fontSize: "14px", textDecoration: "line-through" }}>${p.originalPrice}</span>}
                  </div>
                  <button onClick={() => setCheckout(p)} style={{ background: p.accent, color: "#fff", border: "none", borderRadius: "980px", padding: "10px 22px", fontWeight: "700", fontSize: "14px", cursor: "pointer", fontFamily: "inherit", transition: "opacity 0.15s, transform 0.15s" }}
                    onMouseEnter={e => { e.target.style.opacity = "0.85"; e.target.style.transform = "scale(0.97)"; }}
                    onMouseLeave={e => { e.target.style.opacity = "1"; e.target.style.transform = "scale(1)"; }}>
                    Get eBook →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: "#1c1c1e", padding: "24px 64px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <span style={{ color: "#fff", fontWeight: "800", letterSpacing: "-0.04em", fontSize: "17px", cursor: "pointer" }} onClick={() => navigate("/")}>zurya</span>
        <span style={{ color: "#555", fontSize: "13px" }}>© 2026 Zurya · All rights reserved</span>
      </div>

      {checkout && <CheckoutModal product={checkout} onClose={() => setCheckout(null)} />}
    </div>
  );
}