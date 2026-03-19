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

const accent = "#0A84FF";

const inputStyle = {
  width: "100%", background: "#f5f5f7", border: "none", borderRadius: "12px",
  color: "#1d1d1f", padding: "12px 14px", fontSize: "15px", outline: "none",
  marginTop: "6px", boxSizing: "border-box", fontFamily: "inherit",
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
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
      backdropFilter: "blur(20px)", zIndex: 100,
      display: "flex", alignItems: "center", justifyContent: "center",
      animation: "fadeIn 0.2s ease",
    }}>
      <div style={{
        background: "#fff", borderRadius: "24px", padding: "40px",
        width: "100%", maxWidth: "420px", margin: "0 16px",
        boxShadow: "0 40px 80px rgba(0,0,0,0.15)", animation: "slideUp 0.3s ease",
      }}>
        {done ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: "60px", height: "60px", background: "#30D158", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "26px", color: "#fff" }}>✓</div>
            <div style={{ fontSize: "22px", fontWeight: "700", color: "#1d1d1f", marginBottom: "8px" }}>Order Complete!</div>
            <div style={{ color: "#86868b", fontSize: "14px", marginBottom: "28px" }}>Download link sent to <strong style={{ color: "#1d1d1f" }}>{email}</strong></div>
            <button onClick={onClose} style={{ background: "#1d1d1f", color: "#fff", border: "none", borderRadius: "980px", padding: "13px 36px", fontWeight: "600", cursor: "pointer", fontSize: "15px", fontFamily: "inherit" }}>Done</button>
          </div>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
              <div>
                <div style={{ fontSize: "17px", fontWeight: "700", color: "#1d1d1f" }}>{product.title}</div>
                <div style={{ color: "#86868b", fontSize: "13px", marginTop: "2px" }}>{product.format}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: "24px", fontWeight: "800", color: "#1d1d1f" }}>${product.price}</div>
                {product.originalPrice && <div style={{ color: "#c7c7cc", fontSize: "13px", textDecoration: "line-through" }}>${product.originalPrice}</div>}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div>
                <label style={{ color: "#86868b", fontSize: "12px", fontWeight: "600", letterSpacing: "0.04em", textTransform: "uppercase" }}>Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" style={inputStyle} />
              </div>
              <div>
                <label style={{ color: "#86868b", fontSize: "12px", fontWeight: "600", letterSpacing: "0.04em", textTransform: "uppercase" }}>Card Number</label>
                <input value={cardNumber} onChange={e => setCardNumber(formatCard(e.target.value))} placeholder="1234 5678 9012 3456" style={inputStyle} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ color: "#86868b", fontSize: "12px", fontWeight: "600", letterSpacing: "0.04em", textTransform: "uppercase" }}>Expiry</label>
                  <input value={expiry} onChange={e => setExpiry(formatExpiry(e.target.value))} placeholder="MM/YY" style={inputStyle} />
                </div>
                <div>
                  <label style={{ color: "#86868b", fontSize: "12px", fontWeight: "600", letterSpacing: "0.04em", textTransform: "uppercase" }}>CVC</label>
                  <input value={cvc} onChange={e => setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))} placeholder="•••" style={inputStyle} />
                </div>
              </div>
              <button onClick={handlePay} style={{
                background: accent, color: "#fff", border: "none",
                borderRadius: "14px", padding: "15px", fontWeight: "700", fontSize: "16px",
                cursor: "pointer", marginTop: "8px", fontFamily: "inherit",
                transition: "opacity 0.15s",
              }}
                onMouseEnter={e => e.target.style.opacity = "0.85"}
                onMouseLeave={e => e.target.style.opacity = "1"}
              >
                Get Instant Access · ${product.price}
              </button>
              <div style={{ textAlign: "center", color: "#c7c7cc", fontSize: "12px", display: "flex", gap: "12px", justifyContent: "center" }}>
                <span>🔒 Stripe secured</span><span>·</span><span>🛡️ 7-day refund</span><span>·</span><span>⚡ Instant</span>
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
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    setTimeout(() => setLoaded(true), 80);
  }, []);

  const filtered = products.filter(p => tagFilter === "All" || p.tag === tagFilter);

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "'Poppins', -apple-system, sans-serif", color: "#1d1d1f", opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { transform:translateY(20px);opacity:0 } to { transform:translateY(0);opacity:1 } }
        @keyframes cardIn { from { transform:translateY(16px);opacity:0 } to { transform:translateY(0);opacity:1 } }
        .card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card:hover { transform: translateY(-6px); box-shadow: 0 24px 48px rgba(0,0,0,0.1) !important; }
        .cta-btn:hover { opacity: 0.88; transform: scale(1.02); }
        .cta-btn { transition: all 0.2s ease; }
        input:focus { background: #ebebf0 !important; }
        ::-webkit-scrollbar { width:6px; }
        ::-webkit-scrollbar-track { background:#F5F5F7; }
        ::-webkit-scrollbar-thumb { background:#d2d2d7; border-radius:3px; }
        @media(max-width:640px){.hero-flex{flex-direction:column!important}.mockup-wrap{display:none!important}.sp{padding-left:20px!important;padding-right:20px!important}}
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(245,245,247,0.88)", backdropFilter: "saturate(180%) blur(20px)", borderBottom: "1px solid rgba(0,0,0,0.07)", padding: "0 48px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "56px" }}>
        <div style={{ fontSize: "20px", fontWeight: "800", letterSpacing: "-0.04em" }}>zurya</div>
        <div style={{ display: "flex", gap: "28px", fontSize: "13px", color: "#86868b", fontWeight: "500" }}>
          {["Shop", "About", "FAQ"].map(item => (
            <span key={item} style={{ cursor: "pointer", transition: "color 0.15s" }}
              onMouseEnter={e => e.target.style.color = "#1d1d1f"}
              onMouseLeave={e => e.target.style.color = "#86868b"}
            >{item}</span>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <div className="sp" style={{ padding: "80px 48px 60px", maxWidth: "1000px", margin: "0 auto" }}>
        <div className="hero-flex" style={{ display: "flex", alignItems: "center", gap: "60px" }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "inline-block", background: accent + "15", color: accent, borderRadius: "980px", padding: "5px 16px", fontSize: "12px", fontWeight: "600", marginBottom: "20px", letterSpacing: "0.04em" }}>
              Finance & Wealth Guides
            </div>
            <h1 style={{ fontSize: "clamp(40px, 6vw, 72px)", fontWeight: "800", lineHeight: 1.05, letterSpacing: "-0.04em", color: "#1d1d1f", marginBottom: "20px" }}>
              Your wealth,<br /><span style={{ color: accent }}>starts here.</span>
            </h1>
            <p style={{ fontSize: "17px", color: "#86868b", lineHeight: 1.65, marginBottom: "36px", maxWidth: "460px" }}>
              Practical eBooks on wealth building, budgeting, side hustles and financial mindset — written for real people, not finance bros.
            </p>
            <button className="cta-btn" onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })} style={{ background: accent, color: "#fff", border: "none", borderRadius: "14px", padding: "14px 28px", fontWeight: "700", fontSize: "16px", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 20px rgba(10,132,255,0.3)", marginBottom: "28px", display: "block" }}>
              Get Instant Access ↓
            </button>
            <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
              {["⚡ Instant delivery", "🔒 Secure checkout", "∞ Lifetime access"].map(t => (
                <span key={t} style={{ fontSize: "13px", color: "#86868b", fontWeight: "500" }}>{t}</span>
              ))}
            </div>
          </div>
          <div className="mockup-wrap" style={{ flex: "0 0 auto" }}>
            <div style={{ width: "200px", height: "280px", background: "linear-gradient(135deg, #1d1d1f 0%, #2c2c2e 100%)", borderRadius: "16px", boxShadow: "0 32px 64px rgba(0,0,0,0.2), -8px 8px 0 rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "28px 20px", textAlign: "center", transform: "rotate(-3deg)", position: "relative" }}>
              <div style={{ fontSize: "40px", marginBottom: "16px" }}>📘</div>
              <div style={{ color: accent, fontSize: "11px", fontWeight: "700", letterSpacing: "0.08em", marginBottom: "8px" }}>ZURYA</div>
              <div style={{ color: "#fff", fontSize: "16px", fontWeight: "700", lineHeight: 1.3, letterSpacing: "-0.02em" }}>Wealth Before 30</div>
              <div style={{ color: "#86868b", fontSize: "11px", marginTop: "8px" }}>120 pages · PDF</div>
              <div style={{ position: "absolute", bottom: "-10px", right: "-10px", background: "#FF9F0A", color: "#fff", borderRadius: "980px", padding: "4px 12px", fontSize: "12px", fontWeight: "700", boxShadow: "0 4px 12px rgba(255,159,10,0.4)" }}>$14</div>
            </div>
          </div>
        </div>
      </div>

      {/* WHAT YOU'LL LEARN */}
      <div className="sp" style={{ padding: "60px 48px", background: "#fff" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: "800", letterSpacing: "-0.03em", marginBottom: "12px" }}>What you'll learn</h2>
            <p style={{ color: "#86868b", fontSize: "16px" }}>Everything you need to start building wealth — in plain English</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
            {learnPoints.map((p, i) => (
              <div key={i} style={{ background: "#F5F5F7", borderRadius: "16px", padding: "24px", display: "flex", alignItems: "flex-start", gap: "16px", border: "1px solid rgba(0,0,0,0.04)" }}>
                <div style={{ width: "40px", height: "40px", background: accent + "15", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", flexShrink: 0 }}>{p.icon}</div>
                <p style={{ fontSize: "15px", fontWeight: "500", color: "#1d1d1f", lineHeight: 1.5 }}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* INSIDE THE BOOK */}
      <div className="sp" style={{ padding: "60px 48px", background: "#F5F5F7" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", gap: "60px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "260px" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: "800", letterSpacing: "-0.03em", marginBottom: "12px" }}>Inside the book</h2>
            <p style={{ color: "#86868b", fontSize: "16px", marginBottom: "32px" }}>No fluff, no theory overload — just clear, actionable content</p>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {insideBook.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ width: "36px", height: "36px", background: "#fff", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>{item.icon}</div>
                  <span style={{ fontSize: "15px", fontWeight: "600" }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ background: "#1d1d1f", borderRadius: "20px", padding: "32px", width: "260px", boxShadow: "0 24px 48px rgba(0,0,0,0.15)" }}>
              <div style={{ fontSize: "32px", marginBottom: "16px" }}>📘</div>
              <div style={{ color: accent, fontSize: "11px", fontWeight: "700", letterSpacing: "0.08em", marginBottom: "8px" }}>ZURYA · PREVIEW</div>
              <div style={{ color: "#fff", fontSize: "18px", fontWeight: "700", marginBottom: "6px", letterSpacing: "-0.02em" }}>Wealth Before 30</div>
              <div style={{ color: "#86868b", fontSize: "13px", marginBottom: "20px" }}>Chapter 1: Your money mindset</div>
              <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: "10px", padding: "14px" }}>
                <div style={{ color: "#fff", fontSize: "13px", lineHeight: 1.6, opacity: 0.7 }}>"The first step to building wealth is not earning more — it's understanding where your money goes every single day..."</div>
              </div>
              <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ color: "#86868b", fontSize: "12px" }}>120 pages</span>
                <span style={{ background: accent, color: "#fff", borderRadius: "980px", padding: "4px 14px", fontSize: "13px", fontWeight: "700" }}>$14</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="sp" style={{ padding: "60px 48px", background: "#fff" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: "800", letterSpacing: "-0.03em", marginBottom: "12px" }}>What readers say</h2>
            <p style={{ color: "#86868b", fontSize: "16px" }}>Real people, real results</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{ background: "#F5F5F7", borderRadius: "20px", padding: "28px", border: "1px solid rgba(0,0,0,0.04)" }}>
                <Stars count={t.stars} />
                <p style={{ fontSize: "15px", color: "#1d1d1f", lineHeight: 1.6, fontWeight: "500", marginBottom: "16px" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "36px", height: "36px", background: accent + "20", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700", color: accent }}>{t.name[0]}</div>
                  <span style={{ fontSize: "14px", fontWeight: "600", color: "#6e6e73" }}>— {t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ABOUT AUTHOR */}
      <div className="sp" style={{ padding: "60px 48px", background: "#F5F5F7" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ width: "72px", height: "72px", background: accent + "20", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px", fontWeight: "800", color: accent, margin: "0 auto 20px" }}>M</div>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: "800", letterSpacing: "-0.03em", marginBottom: "16px" }}>About the author</h2>
          <p style={{ fontSize: "16px", color: "#86868b", lineHeight: 1.7 }}>Hi, I'm <strong style={{ color: "#1d1d1f" }}>Maanesh</strong>. I create practical guides to help students and young people build wealth, discipline, and financial freedom early.</p>
          <p style={{ fontSize: "16px", color: "#86868b", lineHeight: 1.7, marginTop: "12px" }}>No theory. Only practical systems that work in the real world.</p>
        </div>
      </div>

           {/* PRODUCTS */}
      <div id="products" className="sp" style={{ padding: "60px 48px 40px", background: "#F5F5F7" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "clamp(28px, 4vw, 42px)", fontWeight: "800", letterSpacing: "-0.03em", marginBottom: "12px" }}>Browse all guides</h2>
            <p style={{ color: "#86868b", fontSize: "16px" }}>Pick what you need — every guide is actionable and beginner-friendly</p>
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "32px", justifyContent: "center" }}>
            {tagFilters.map(f => (
              <button key={f} onClick={() => setTagFilter(f)} style={{ background: tagFilter === f ? "#1d1d1f" : "#fff", color: tagFilter === f ? "#fff" : "#6e6e73", border: tagFilter === f ? "none" : "1px solid rgba(0,0,0,0.08)", borderRadius: "980px", padding: "7px 18px", fontSize: "13px", fontWeight: "500", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s", boxShadow: tagFilter === f ? "0 4px 12px rgba(0,0,0,0.12)" : "none" }}>{f}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
            {filtered.map((p, i) => (
              <div key={p.id} className="card" style={{ background: "#fff", borderRadius: "20px", overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.04)", animation: `cardIn 0.4s ease ${i * 0.06}s both` }}>
                <div style={{ height: "5px", background: p.accent }} />
                <div style={{ padding: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <span style={{ background: p.accent + "15", color: p.accent, borderRadius: "8px", padding: "3px 10px", fontSize: "12px", fontWeight: "700" }}>{p.tag}</span>
                    {p.badge && <span style={{ background: "#f5f5f7", color: "#86868b", borderRadius: "8px", padding: "3px 10px", fontSize: "12px", fontWeight: "600" }}>{p.badge}</span>}
                  </div>
                  <h2 style={{ fontSize: "18px", fontWeight: "700", color: "#1d1d1f", lineHeight: 1.25, letterSpacing: "-0.02em", marginBottom: "8px" }}>{p.title}</h2>
                  <p style={{ color: "#86868b", fontSize: "13px", lineHeight: 1.55, marginBottom: "20px" }}>{p.subtitle}</p>
                  <div style={{ display: "flex", gap: "12px", borderTop: "1px solid #f5f5f7", paddingTop: "14px", marginBottom: "16px" }}>
                    {[p.pages, p.format].map((m, i) => <span key={i} style={{ color: "#c7c7cc", fontSize: "12px", fontWeight: "500" }}>{m}</span>)}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                      <span style={{ fontSize: "22px", fontWeight: "800", color: "#1d1d1f", letterSpacing: "-0.02em" }}>${p.price}</span>
                      {p.originalPrice && <span style={{ color: "#c7c7cc", fontSize: "13px", textDecoration: "line-through" }}>${p.originalPrice}</span>}
                    </div>
                    <button onClick={() => setCheckout(p)} style={{ background: p.accent, color: "#fff", border: "none", borderRadius: "980px", padding: "9px 20px", fontWeight: "700", fontSize: "13px", cursor: "pointer", fontFamily: "inherit", transition: "opacity 0.15s, transform 0.15s" }}
                      onMouseEnter={e => { e.target.style.opacity = "0.85"; e.target.style.transform = "scale(0.97)"; }}
                      onMouseLeave={e => { e.target.style.opacity = "1"; e.target.style.transform = "scale(1)"; }}
                    >Get eBook →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="sp" style={{ padding: "80px 48px", background: "#1d1d1f", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: "800", letterSpacing: "-0.04em", color: "#fff", marginBottom: "16px", lineHeight: 1.1 }}>Start building your<br />wealth today.</h2>
          <p style={{ color: "#86868b", fontSize: "16px", marginBottom: "36px", lineHeight: 1.6 }}>Join thousands of readers who have already started their journey to financial freedom.</p>
          <button className="cta-btn" onClick={() => document.getElementById("products").scrollIntoView({ behavior: "smooth" })} style={{ background: accent, color: "#fff", border: "none", borderRadius: "14px", padding: "16px 36px", fontWeight: "700", fontSize: "17px", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 8px 24px rgba(10,132,255,0.35)" }}>
            Get Instant Access →
          </button>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", marginTop: "20px", flexWrap: "wrap" }}>
            {["⚡ Instant delivery", "🛡️ 7-day refund", "🔒 Secure checkout"].map(t => (
              <span key={t} style={{ fontSize: "13px", color: "#555", fontWeight: "500" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="sp" style={{ background: "#1d1d1f", padding: "24px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#555", fontSize: "13px", fontWeight: "500", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ color: "#fff", fontWeight: "800", letterSpacing: "-0.04em", fontSize: "16px" }}>zurya</span>
        <span>© 2026 Zurya · All rights reserved</span>
      </div>

      {checkout && <CheckoutModal product={checkout} onClose={() => setCheckout(null)} />}
    </div>
  );
}