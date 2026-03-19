import { useState, useEffect } from "react";

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

const learnPoints = [
  { icon: "💰", text: "How to save money fast even on a small income" },
  { icon: "🚀", text: "How to start a side hustle from scratch" },
  { icon: "📊", text: "A simple budgeting system that actually works" },
  { icon: "📈", text: "Investing basics for complete beginners" },
  { icon: "🚫", text: "The most common money mistakes and how to avoid them" },
];

const insideBook = [
  { icon: "📄", label: "120+ pages" },
  { icon: "🪜", label: "Step-by-step guide" },
  { icon: "💡", label: "Real examples" },
  { icon: "🟢", label: "Beginner friendly" },
  { icon: "⬇️", label: "Instant PDF download" },
];

const testimonials = [
  { name: "Rahul K", text: "This changed how I see money. I paid off my debt in 4 months after reading this.", stars: 5 },
  { name: "Arjun P", text: "Very practical and simple. No complicated jargon — just clear actionable steps.", stars: 5 },
  { name: "Sneha R", text: "Worth more than the price. I made back 10x the cost in my first side hustle month.", stars: 5 },
];

const ACCENT = "#0A84FF";

const inputStyle = {
  width: "100%", background: "#f5f5f7", border: "1.5px solid transparent",
  borderRadius: "12px", color: "#1d1d1f", padding: "12px 14px",
  fontSize: "15px", outline: "none", marginTop: "6px",
  boxSizing: "border-box", fontFamily: "inherit", transition: "border 0.15s",
};

function Stars({ count }) {
  return (
    <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "#FF9F0A", fontSize: "16px" }}>★</span>
      ))}
    </div>
  );
}

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
      backdropFilter: "blur(20px)", zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center",
      animation: "fadeIn 0.2s ease",
    }}>
      <div style={{
        background: "#fff", borderRadius: "24px", padding: "40px",
        width: "100%", maxWidth: "420px", margin: "0 16px",
        boxShadow: "0 40px 80px rgba(0,0,0,0.18)", animation: "slideUp 0.3s ease",
      }}>
        {done ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: "64px", height: "64px", background: "#30D158", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "28px", color: "#fff" }}>✓</div>
            <div style={{ fontSize: "22px", fontWeight: "700", color: "#1d1d1f", marginBottom: "8px" }}>Order Complete!</div>
            <div style={{ color: "#6e6e73", fontSize: "14px", marginBottom: "28px" }}>Download link sent to <strong style={{ color: "#1d1d1f" }}>{email}</strong></div>
            <button onClick={onClose} style={{ background: "#1d1d1f", color: "#fff", border: "none", borderRadius: "980px", padding: "13px 36px", fontWeight: "600", cursor: "pointer", fontSize: "15px", fontFamily: "inherit" }}>Done</button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
              <div>
                <div style={{ fontSize: "17px", fontWeight: "700", color: "#1d1d1f" }}>{product.title}</div>
                <div style={{ color: "#6e6e73", fontSize: "13px", marginTop: "2px" }}>{product.format}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "26px", fontWeight: "800", color: "#1d1d1f" }}>${product.price}</div>
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
              <button onClick={handlePay} style={{ background: product.accent, color: "#fff", border: "none", borderRadius: "14px", padding: "15px", fontWeight: "700", fontSize: "16px", cursor: "pointer", marginTop: "8px", fontFamily: "inherit", transition: "opacity 0.15s" }}
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

export default function App() {
  const [tagFilter, setTagFilter] = useState("All");
  const [checkout, setCheckout] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Fix full width
    document.documentElement.style.width = "100%";
    document.body.style.width = "100%";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.overflowX = "hidden";

    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    setTimeout(() => setLoaded(true), 80);
  }, []);

  const filtered = products.filter(p => tagFilter === "All" || p.tag === tagFilter);

  const S = {
    h2: { fontSize: "clamp(28px, 4vw, 44px)", fontWeight: "800", letterSpacing: "-0.03em", color: "#111", marginBottom: "12px" },
    sub: { fontSize: "16px", color: "#6e6e73", lineHeight: 1.6 },
    section: (bg) => ({ padding: "72px 64px", background: bg, width: "100%" }),
    inner: { maxWidth: "1200px", margin: "0 auto", width: "100%" },
  };

  return (
    <div style={{ minHeight: "100vh", width: "100%", background: "#F5F5F7", fontFamily: "'Poppins', -apple-system, sans-serif", color: "#111", opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease", overflowX: "hidden" }}>
      <style>{`
        html, body, #root { width: 100% !important; margin: 0 !important; padding: 0 !important; overflow-x: hidden !important; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeIn { from{opacity:0}to{opacity:1} }
        @keyframes slideUp { from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1} }
        @keyframes cardIn { from{transform:translateY(16px);opacity:0}to{transform:translateY(0);opacity:1} }
        .card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card:hover { transform: translateY(-6px) !important; box-shadow: 0 24px 48px rgba(0,0,0,0.1) !important; }
        .cta-btn { transition: all 0.2s ease !important; }
        .cta-btn:hover { opacity: 0.88 !important; transform: translateY(-1px) !important; }
        .nav-link:hover { color: #111 !important; }
        @media(max-width:768px){
          .hero-flex { flex-direction: column !important; }
          .mockup-hide { display: none !important; }
          .inside-flex { flex-direction: column !important; }
          .pad-section { padding: 48px 24px !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, width: "100%", background: "rgba(245,245,247,0.92)", backdropFilter: "saturate(180%) blur(20px)", borderBottom: "1px solid rgba(0,0,0,0.07)", padding: "0 64px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "58px" }}>
        <div style={{ fontSize: "21px", fontWeight: "800", letterSpacing: "-0.04em", color: "#111" }}>zurya</div>
        <div style={{ display: "flex", gap: "32px", fontSize: "14px", color: "#6e6e73", fontWeight: "500" }}>
          {["Shop", "About", "FAQ"].map(item => (
            <span key={item} className="nav-link" style={{ cursor: "pointer", transition: "color 0.15s" }}
              onMouseEnter={e => e.target.style.color = "#111"}
              onMouseLeave={e => e.target.style.color = "#6e6e73"}
            >{item}</span>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <div className="pad-section" style={{ ...S.section("#F5F5F7"), padding: "88px 64px 72px" }}>
        <div style={{ ...S.inner }}>
          <div className="hero-flex" style={{ display: "flex", alignItems: "center", gap: "80px" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "inline-flex", alignItems: "center", background: ACCENT + "18", color: ACCENT, borderRadius: "980px", padding: "6px 18px", fontSize: "13px", fontWeight: "600", marginBottom: "24px", letterSpacing: "0.02em" }}>
                Finance & Wealth Guides
              </div>
              <h1 style={{ fontSize: "clamp(44px, 5.5vw, 76px)", fontWeight: "800", lineHeight: 1.04, letterSpacing: "-0.04em", color: "#111", marginBottom: "22px" }}>
                Your wealth,<br />
                <span style={{ color: ACCENT }}>starts here.</span>
              </h1>
              <p style={{ fontSize: "18px", color: "#6e6e73", lineHeight: 1.7, marginBottom: "40px", maxWidth: "500px", fontWeight: "400" }}>
                Practical eBooks on wealth building, budgeting, side hustles and financial mindset — written for real people, not finance bros.
              </p>
              <button className="cta-btn" onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })}
                style={{ background: ACCENT, color: "#fff", border: "none", borderRadius: "14px", padding: "15px 32px", fontWeight: "700", fontSize: "16px", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 6px 24px rgba(10,132,255,0.32)", marginBottom: "32px", display: "inline-block" }}>
                Get Instant Access ↓
              </button>
              <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                {["⚡ Instant delivery", "🔒 Secure checkout", "∞ Lifetime access"].map(t => (
                  <span key={t} style={{ fontSize: "14px", color: "#6e6e73", fontWeight: "500" }}>{t}</span>
                ))}
              </div>
            </div>

            {/* Mockup */}
            <div className="mockup-hide" style={{ flex: "0 0 auto" }}>
              <div style={{ position: "relative", width: "220px", height: "300px" }}>
                {/* Shadow book */}
                <div style={{ position: "absolute", bottom: "-12px", right: "-12px", width: "220px", height: "300px", background: "#d2d2d7", borderRadius: "16px", transform: "rotate(3deg)" }} />
                {/* Main book */}
                <div style={{ position: "relative", width: "220px", height: "300px", background: "linear-gradient(160deg, #1c1c1e 0%, #2c2c2e 100%)", borderRadius: "16px", boxShadow: "0 32px 64px rgba(0,0,0,0.22)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 24px", textAlign: "center", transform: "rotate(-2deg)" }}>
                  <div style={{ fontSize: "44px", marginBottom: "18px" }}>📘</div>
                  <div style={{ color: ACCENT, fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", marginBottom: "10px" }}>ZURYA</div>
                  <div style={{ color: "#fff", fontSize: "17px", fontWeight: "700", lineHeight: 1.3, letterSpacing: "-0.02em" }}>Wealth Before 30</div>
                  <div style={{ color: "#86868b", fontSize: "12px", marginTop: "10px" }}>120 pages · PDF</div>
                  <div style={{ position: "absolute", top: "16px", right: "-10px", background: "#FF9F0A", color: "#fff", borderRadius: "980px", padding: "5px 14px", fontSize: "13px", fontWeight: "800", boxShadow: "0 4px 12px rgba(255,159,10,0.4)" }}>$14</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WHAT YOU'LL LEARN */}
      <div className="pad-section" style={S.section("#fff")}>
        <div style={S.inner}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={S.h2}>What you'll learn</h2>
            <p style={S.sub}>Everything you need to start building wealth — in plain English</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
            {learnPoints.map((p, i) => (
              <div key={i} style={{ background: "#F5F5F7", borderRadius: "18px", padding: "24px 28px", display: "flex", alignItems: "flex-start", gap: "18px", border: "1px solid rgba(0,0,0,0.04)" }}>
                <div style={{ width: "44px", height: "44px", background: ACCENT + "18", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px", flexShrink: 0 }}>{p.icon}</div>
                <p style={{ fontSize: "15px", fontWeight: "600", color: "#111", lineHeight: 1.55 }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INSIDE THE BOOK */}
      <div className="pad-section" style={S.section("#F5F5F7")}>
        <div style={S.inner}>
          <div className="inside-flex" style={{ display: "flex", gap: "80px", alignItems: "center" }}>
            <div style={{ flex: 1, minWidth: "280px" }}>
              <h2 style={S.h2}>Inside the book</h2>
              <p style={{ ...S.sub, marginBottom: "36px" }}>No fluff, no theory overload — just clear, actionable content</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {insideBook.map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                    <div style={{ width: "40px", height: "40px", background: "#fff", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", boxShadow: "0 2px 10px rgba(0,0,0,0.07)", flexShrink: 0 }}>{item.icon}</div>
                    <span style={{ fontSize: "16px", fontWeight: "600", color: "#111" }}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ flexShrink: 0 }}>
              <div style={{ background: "#1c1c1e", borderRadius: "22px", padding: "36px", width: "280px", boxShadow: "0 32px 64px rgba(0,0,0,0.16)" }}>
                <div style={{ fontSize: "36px", marginBottom: "18px" }}>📘</div>
                <div style={{ color: ACCENT, fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", marginBottom: "10px" }}>ZURYA · PREVIEW</div>
                <div style={{ color: "#fff", fontSize: "19px", fontWeight: "700", marginBottom: "6px", letterSpacing: "-0.02em" }}>Wealth Before 30</div>
                <div style={{ color: "#86868b", fontSize: "13px", marginBottom: "22px" }}>Chapter 1: Your money mindset</div>
                <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: "12px", padding: "16px" }}>
                  <p style={{ color: "#e0e0e0", fontSize: "13px", lineHeight: 1.7 }}>"The first step to building wealth is not earning more — it's understanding where your money goes every single day..."</p>
                </div>
                <div style={{ marginTop: "22px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: "#86868b", fontSize: "13px" }}>120 pages</span>
                  <span style={{ background: ACCENT, color: "#fff", borderRadius: "980px", padding: "5px 16px", fontSize: "14px", fontWeight: "700" }}>$14</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="pad-section" style={S.section("#fff")}>
        <div style={S.inner}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={S.h2}>What readers say</h2>
            <p style={S.sub}>Real people, real results</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: "#F5F5F7", borderRadius: "20px", padding: "32px", border: "1px solid rgba(0,0,0,0.04)" }}>
                <Stars count={t.stars} />
                <p style={{ fontSize: "16px", color: "#111", lineHeight: 1.65, fontWeight: "500", marginBottom: "20px" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ width: "38px", height: "38px", background: ACCENT + "20", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", color: ACCENT }}>{t.name[0]}</div>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#6e6e73" }}>— {t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ABOUT AUTHOR */}
      <div className="pad-section" style={S.section("#F5F5F7")}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ width: "76px", height: "76px", background: ACCENT + "20", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "30px", fontWeight: "800", color: ACCENT, margin: "0 auto 22px" }}>M</div>
          <h2 style={S.h2}>About the author</h2>
          <p style={{ ...S.sub, marginTop: "4px" }}>Hi, I'm <strong style={{ color: "#111" }}>Maanesh</strong>. I create practical guides to help students and young people build wealth, discipline, and financial freedom early.</p>
          <p style={{ ...S.sub, marginTop: "14px" }}>No theory. Only practical systems that work in the real world.</p>
        </div>
      </div>

      {/* PRODUCTS */}
      <div id="products" className="pad-section" style={S.section("#fff")}>
        <div style={S.inner}>
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={S.h2}>Browse all guides</h2>
            <p style={S.sub}>Pick what you need — every guide is actionable and beginner-friendly</p>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "36px", justifyContent: "center" }}>
            {tagFilters.map(f => (
              <button key={f} onClick={() => setTagFilter(f)} style={{ background: tagFilter === f ? "#111" : "#F5F5F7", color: tagFilter === f ? "#fff" : "#6e6e73", border: tagFilter === f ? "none" : "1px solid rgba(0,0,0,0.08)", borderRadius: "980px", padding: "8px 20px", fontSize: "13px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s", boxShadow: tagFilter === f ? "0 4px 14px rgba(0,0,0,0.14)" : "none" }}>{f}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "18px" }}>
            {filtered.map((p, i) => (
              <div key={p.id} className="card" style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.05)", animation: `cardIn 0.4s ease ${i * 0.06}s both` }}>
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
      </div>

      {/* FINAL CTA */}
      <div className="pad-section" style={{ ...S.section("#1c1c1e"), textAlign: "center" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: "800", letterSpacing: "-0.04em", color: "#fff", marginBottom: "18px", lineHeight: 1.1 }}>Start building your<br />wealth today.</h2>
          <p style={{ color: "#86868b", fontSize: "17px", marginBottom: "40px", lineHeight: 1.65 }}>Join thousands of readers who have already started their journey to financial freedom.</p>
          <button className="cta-btn" onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })} style={{ background: ACCENT, color: "#fff", border: "none", borderRadius: "14px", padding: "17px 40px", fontWeight: "700", fontSize: "18px", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 8px 28px rgba(10,132,255,0.38)" }}>
            Get Instant Access →
          </button>
          <div style={{ display: "flex", gap: "24px", justifyContent: "center", marginTop: "24px", flexWrap: "wrap" }}>
            {["⚡ Instant delivery", "🔒 Secure checkout"].map(t => (
              <span key={t} style={{ fontSize: "14px", color: "#555", fontWeight: "500" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: "#1c1c1e", padding: "24px 64px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <span style={{ color: "#fff", fontWeight: "800", letterSpacing: "-0.04em", fontSize: "17px" }}>zurya</span>
        <span style={{ color: "#555", fontSize: "13px", fontWeight: "500" }}>© 2026 Zurya · All rights reserved</span>
      </div>

      {checkout && <CheckoutModal product={checkout} onClose={() => setCheckout(null)} />}
    </div>
  );
}