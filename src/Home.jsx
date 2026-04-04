import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ACCENT = "#0A84FF";
const SUPABASE_URL = "https://zhetlpiamcrkfjmairjb.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpoZXRscGlhbWNya2ZqbWFpcmpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyOTc4NDcsImV4cCI6MjA5MDg3Mzg0N30.XygGGULYYtD42-FHSQGuABpBBpM2s2fVYyt9X8XrSr0";

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

const fallbackTestimonials = [
  { id: 1, name: "Rahul K", text: "This changed how I see money. I paid off my debt in 4 months after reading this.", rating: 5, product: "Wealth Before 30" },
  { id: 2, name: "Arjun P", text: "Very practical and simple. No complicated jargon — just clear actionable steps.", rating: 5, product: "The Side Hustle Blueprint" },
  { id: 3, name: "Sneha R", text: "Worth more than the price. I made back 10x the cost in my first side hustle month.", rating: 5, product: "Budget Like a CEO" },
];

const faqItems = [
  { q: "How do I receive my eBook?", a: "After payment, you'll receive an instant download link to your email. No waiting — delivery is immediate." },
  { q: "What format are the eBooks in?", a: "All eBooks are in PDF format, which works on any device — phone, tablet, laptop, or desktop." },
  { q: "Are these suitable for beginners?", a: "Absolutely! Every guide is written in plain language with no complicated jargon. Perfect for anyone starting from zero." },
  { q: "Can I read on my phone?", a: "Yes! PDF works perfectly on all phones. You can also save it to your Google Drive or iCloud for easy access anytime." },
  { q: "Do you offer refunds?", a: "Due to the digital nature of our products, we do not offer refunds. Please read the description carefully before purchasing." },
  { q: "How do I contact support?", a: "You can reach us at support@zurya.app — we typically respond within 24 hours." },
];

function Stars({ count }) {
  return (
    <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "#FF9F0A", fontSize: "16px" }}>★</span>
      ))}
    </div>
  );
}

function Modal({ onClose, children }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
      backdropFilter: "blur(20px)", zIndex: 200,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px", animation: "fadeIn 0.2s ease",
    }}>
      <div style={{
        background: "#fff", borderRadius: "24px", width: "100%",
        maxWidth: "560px", maxHeight: "85vh", overflowY: "auto",
        boxShadow: "0 40px 80px rgba(0,0,0,0.2)", animation: "slideUp 0.3s ease",
        position: "relative",
      }}>
        <button onClick={onClose} style={{
          position: "sticky", top: "16px", float: "right", marginRight: "16px",
          width: "32px", height: "32px", background: "#F5F5F7",
          border: "none", borderRadius: "50%", cursor: "pointer",
          fontSize: "16px", display: "flex", alignItems: "center",
          justifyContent: "center", fontFamily: "inherit", zIndex: 10,
        }}>✕</button>
        <div style={{ padding: "40px", paddingTop: "20px" }}>{children}</div>
      </div>
    </div>
  );
}

function AboutModal({ onClose }) {
  return (
    <Modal onClose={onClose}>
      <div style={{ textAlign: "center", marginBottom: "32px" }}>
        <div style={{ width: "80px", height: "80px", background: ACCENT + "20", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", fontWeight: "800", color: ACCENT, margin: "0 auto 20px" }}>M</div>
        <h2 style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-0.03em", color: "#111", marginBottom: "8px" }}>About Maanesh</h2>
        <p style={{ color: "#6e6e73", fontSize: "14px" }}>Creator of Zurya</p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {[
          { icon: "👋", text: "Hi, I'm Maanesh — a student from Chennai who got obsessed with personal finance after realising how little most young people know about money." },
          { icon: "💡", text: "I created Zurya to fix that. Every guide is written from real experience — no copied theory, no academic fluff. Just practical systems that work." },
          { icon: "🎯", text: "My mission is simple: help students and young professionals build wealth early, avoid costly money mistakes, and gain financial freedom before 30." },
          { icon: "📚", text: "Every eBook on Zurya is something I genuinely wish I had when I was starting out. I hope it helps you as much as it helped me." },
        ].map((item, i) => (
          <div key={i} style={{ display: "flex", gap: "16px", alignItems: "flex-start", background: "#F5F5F7", borderRadius: "14px", padding: "18px" }}>
            <span style={{ fontSize: "22px", flexShrink: 0 }}>{item.icon}</span>
            <p style={{ fontSize: "15px", color: "#333", lineHeight: 1.65, fontWeight: "500" }}>{item.text}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "28px", textAlign: "center" }}>
        <p style={{ color: "#6e6e73", fontSize: "13px" }}>Questions? Reach out at <span style={{ color: ACCENT, fontWeight: "600" }}>support@zurya.app</span></p>
      </div>
    </Modal>
  );
}

function FAQModal({ onClose }) {
  const [open, setOpen] = useState(null);

  return (
    <Modal onClose={onClose}>
      <h2 style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-0.03em", color: "#111", marginBottom: "6px" }}>Frequently Asked Questions</h2>
      <p style={{ color: "#6e6e73", fontSize: "14px", marginBottom: "28px" }}>Everything you need to know before buying</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {faqItems.map((item, i) => (
          <div key={i} onClick={() => setOpen(open === i ? null : i)} style={{
            background: open === i ? "#111" : "#F5F5F7",
            borderRadius: "14px", padding: "18px 20px",
            cursor: "pointer", transition: "all 0.2s ease",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "15px", fontWeight: "600", color: open === i ? "#fff" : "#111" }}>{item.q}</span>
              <span style={{ fontSize: "18px", color: open === i ? "#fff" : "#6e6e73", flexShrink: 0, transition: "transform 0.2s", transform: open === i ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
            </div>
            {open === i && (
              <p style={{ fontSize: "14px", color: "#ccc", lineHeight: 1.7, marginTop: "12px", fontWeight: "400" }}>{item.a}</p>
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
}

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

export default function Home() {
  const navigate = useNavigate();
  const [showAbout, setShowAbout] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);
  const [checkout, setCheckout] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);

  useEffect(() => {
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
    fetchTopReviews();
  }, []);

  const fetchTopReviews = async () => {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/reviews?approved=eq.true&rating=gte.4&order=rating.desc,created_at.desc&limit=3`,
        { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
      );
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) setTestimonials(data);
    } catch (e) { /* use fallback */ }
  };

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
        .nav-link { cursor: pointer; transition: color 0.15s; }
        .nav-link:hover { color: #111 !important; }
        @media(max-width:768px){
          .hero-flex{flex-direction:column!important}
          .mockup-hide{display:none!important}
          .inside-flex{flex-direction:column!important}
          .pad-section{padding:48px 24px!important}
        }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, width: "100%", background: "rgba(245,245,247,0.92)", backdropFilter: "saturate(180%) blur(20px)", borderBottom: "1px solid rgba(0,0,0,0.07)", padding: "0 64px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "58px" }}>
        <div style={{ fontSize: "21px", fontWeight: "800", letterSpacing: "-0.04em", color: "#111", cursor: "pointer" }} onClick={() => navigate("/")}>zurya</div>
        <div style={{ display: "flex", gap: "32px", fontSize: "14px", color: "#6e6e73", fontWeight: "500" }}>
          <span className="nav-link" onClick={() => navigate("/shop")}>Shop</span>
          <span className="nav-link" onClick={() => navigate("/reviews")}>Reviews</span>
          <span className="nav-link" onClick={() => setShowAbout(true)}>About</span>
          <span className="nav-link" onClick={() => setShowFAQ(true)}>FAQ</span>
        </div>
      </nav>

      {/* HERO */}
      <div className="pad-section" style={{ ...S.section("#F5F5F7"), padding: "88px 64px 72px" }}>
        <div style={S.inner}>
          <div className="hero-flex" style={{ display: "flex", alignItems: "center", gap: "80px" }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "inline-flex", alignItems: "center", background: ACCENT + "18", color: ACCENT, borderRadius: "980px", padding: "6px 18px", fontSize: "13px", fontWeight: "600", marginBottom: "24px" }}>
                Finance & Wealth Guides
              </div>
              <h1 style={{ fontSize: "clamp(44px, 5.5vw, 76px)", fontWeight: "800", lineHeight: 1.04, letterSpacing: "-0.04em", color: "#111", marginBottom: "22px" }}>
                Your wealth,<br /><span style={{ color: ACCENT }}>starts here.</span>
              </h1>
              <p style={{ fontSize: "18px", color: "#6e6e73", lineHeight: 1.7, marginBottom: "40px", maxWidth: "500px" }}>
                Practical eBooks on wealth building, budgeting, side hustles and financial mindset — written for real people, not finance bros.
              </p>
              <button className="cta-btn" onClick={() => navigate("/shop")} style={{ background: ACCENT, color: "#fff", border: "none", borderRadius: "14px", padding: "15px 32px", fontWeight: "700", fontSize: "16px", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 6px 24px rgba(10,132,255,0.32)", marginBottom: "32px", display: "inline-block" }}>
                Browse All Guides →
              </button>
              <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
                {["⚡ Instant delivery", "🔒 Secure checkout", "∞ Lifetime access"].map(t => (
                  <span key={t} style={{ fontSize: "14px", color: "#6e6e73", fontWeight: "500" }}>{t}</span>
                ))}
              </div>
            </div>
            <div className="mockup-hide" style={{ flex: "0 0 auto" }}>
              <div style={{ position: "relative", width: "220px", height: "300px" }}>
                <div style={{ position: "absolute", bottom: "-12px", right: "-12px", width: "220px", height: "300px", background: "#d2d2d7", borderRadius: "16px", transform: "rotate(3deg)" }} />
                <div style={{ position: "relative", width: "220px", height: "300px", background: "linear-gradient(160deg,#1c1c1e,#2c2c2e)", borderRadius: "16px", boxShadow: "0 32px 64px rgba(0,0,0,0.22)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 24px", textAlign: "center", transform: "rotate(-2deg)" }}>
                  <div style={{ fontSize: "44px", marginBottom: "18px" }}>📘</div>
                  <div style={{ color: ACCENT, fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em", marginBottom: "10px" }}>ZURYA</div>
                  <div style={{ color: "#fff", fontSize: "17px", fontWeight: "700", lineHeight: 1.3 }}>Wealth Before 30</div>
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
              <div key={i} style={{ background: "#F5F5F7", borderRadius: "18px", padding: "24px 28px", display: "flex", alignItems: "flex-start", gap: "18px" }}>
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
              <p style={{ ...S.sub, marginBottom: "36px" }}>No fluff — just clear, actionable content</p>
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
                <div style={{ color: "#fff", fontSize: "19px", fontWeight: "700", marginBottom: "6px" }}>Wealth Before 30</div>
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
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px", marginBottom: "32px" }}>
            {testimonials.map((t, i) => (
              <div key={t.id || i} style={{ background: "#F5F5F7", borderRadius: "20px", padding: "32px" }}>
                <div style={{ display: "flex", gap: "2px", marginBottom: "12px" }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: s <= (t.rating || t.stars || 5) ? "#FF9F0A" : "#e0e0e0", fontSize: "16px" }}>★</span>)}
                </div>
                <p style={{ fontSize: "16px", color: "#111", lineHeight: 1.65, fontWeight: "500", marginBottom: "20px" }}>"{t.text || t.review}"</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ width: "38px", height: "38px", background: ACCENT + "20", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", fontWeight: "700", color: ACCENT }}>{t.name[0]}</div>
                    <span style={{ fontSize: "14px", fontWeight: "600", color: "#6e6e73" }}>— {t.name}</span>
                  </div>
                  {t.product && <span style={{ background: "#fff", color: "#6e6e73", borderRadius: "8px", padding: "3px 10px", fontSize: "11px", fontWeight: "600" }}>{t.product}</span>}
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <button onClick={() => navigate("/reviews")} style={{ background: "#F5F5F7", color: "#111", border: "1px solid rgba(0,0,0,0.08)", borderRadius: "980px", padding: "11px 28px", fontWeight: "600", fontSize: "14px", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}
              onMouseEnter={e => { e.target.style.background = "#1d1d1f"; e.target.style.color = "#fff"; }}
              onMouseLeave={e => { e.target.style.background = "#F5F5F7"; e.target.style.color = "#111"; }}>
              See all reviews →
            </button>
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="pad-section" style={{ ...S.section("#1c1c1e"), textAlign: "center" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 54px)", fontWeight: "800", letterSpacing: "-0.04em", color: "#fff", marginBottom: "18px", lineHeight: 1.1 }}>Start building your<br />wealth today.</h2>
          <p style={{ color: "#86868b", fontSize: "17px", marginBottom: "40px", lineHeight: 1.65 }}>Join thousands of readers who have already started their journey to financial freedom.</p>
          <button className="cta-btn" onClick={() => navigate("/shop")} style={{ background: ACCENT, color: "#fff", border: "none", borderRadius: "14px", padding: "17px 40px", fontWeight: "700", fontSize: "18px", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 8px 28px rgba(10,132,255,0.38)" }}>
            Browse All Guides →
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
        <span style={{ color: "#555", fontSize: "13px" }}>© 2026 Zurya · All rights reserved</span>
      </div>

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
      {showFAQ && <FAQModal onClose={() => setShowFAQ(false)} />}
      {checkout && <CheckoutModal product={checkout} onClose={() => setCheckout(null)} />}
    </div>
  );
}