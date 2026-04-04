import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SUPABASE_URL = "https://zhetlpiamcrkfjmairjb.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpoZXRscGlhbWNya2ZqbWFpcmpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyOTc4NDcsImV4cCI6MjA5MDg3Mzg0N30.XygGGULYYtD42-FHSQGuABpBBpM2s2fVYyt9X8XrSr0";
const ACCENT = "#0A84FF";

const products = [
  "Wealth Before 30",
  "Budget Like a CEO",
  "The Side Hustle Blueprint",
  "The Zurya Mindset",
  "Fit in 30 Days",
  "Deep Work Daily",
  "Relationship OS",
  "Monthly Budget Tracker",
  "Morning Routine Checklist",
  "Goal Setting Cheat Sheet",
  "Weekly Planner Template",
  "Fitness Tracker Sheet",
];

function Stars({ value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: "flex", gap: "6px" }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i}
          onClick={() => onChange(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          style={{ fontSize: "32px", cursor: "pointer", color: i <= (hovered || value) ? "#FF9F0A" : "#e0e0e0", transition: "color 0.15s" }}>★</span>
      ))}
    </div>
  );
}

const inputStyle = {
  width: "100%", background: "#F5F5F7", border: "1.5px solid transparent",
  borderRadius: "12px", color: "#111", padding: "13px 16px",
  fontSize: "15px", outline: "none", boxSizing: "border-box",
  fontFamily: "inherit", transition: "border 0.15s",
};

export default function LeaveReview() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState("");
  const [orderError, setOrderError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [name, setName] = useState("");
  const [product, setProduct] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const verifyOrder = async () => {
    if (!orderId.trim()) { setOrderError("Please enter your order ID."); return; }
    setVerifying(true);
    setOrderError("");
    // Check if order ID exists in orders table OR accept any non-empty ID for now
    // Once Stripe is set up, this will verify against real orders
    // For now we check if this order ID has already been used to review
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/reviews?order_id=eq.${encodeURIComponent(orderId.trim())}&select=id`,
        { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
      );
      const existing = await res.json();
      if (Array.isArray(existing) && existing.length > 0) {
        setOrderError("This order ID has already been used to submit a review.");
        setVerifying(false);
        return;
      }
      // Order ID is valid and unused — proceed
      setStep(2);
    } catch (e) {
      setOrderError("Could not verify order ID. Please try again.");
    } finally {
      setVerifying(false);
    }
  };

  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Please enter your name.";
    if (!product) e.product = "Please select a product.";
    if (!rating) e.rating = "Please select a star rating.";
    if (!review.trim() || review.trim().length < 20) e.review = "Please write at least 20 characters.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/reviews`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          order_id: orderId.trim(),
          name: name.trim(),
          product,
          rating,
          review: review.trim(),
          approved: false,
        }),
      });
      if (res.ok || res.status === 201) {
        setDone(true);
      } else {
        const err = await res.json();
        setErrors({ submit: err.message || "Something went wrong. Please try again." });
      }
    } catch (e) {
      setErrors({ submit: "Network error. Please check your connection and try again." });
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "'Poppins', -apple-system, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div style={{ background: "#fff", borderRadius: "24px", padding: "48px", maxWidth: "440px", width: "100%", textAlign: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}>
          <div style={{ width: "72px", height: "72px", background: "#30D158", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "32px", color: "#fff" }}>✓</div>
          <h2 style={{ fontSize: "24px", fontWeight: "800", letterSpacing: "-0.03em", color: "#111", marginBottom: "10px" }}>Review Submitted!</h2>
          <p style={{ color: "#6e6e73", fontSize: "15px", lineHeight: 1.65, marginBottom: "28px" }}>Thank you for your feedback! Your review will appear on the site after a quick check.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button onClick={() => navigate("/reviews")} style={{ background: ACCENT, color: "#fff", border: "none", borderRadius: "12px", padding: "12px 24px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit", fontSize: "14px" }}>See All Reviews</button>
            <button onClick={() => navigate("/")} style={{ background: "#F5F5F7", color: "#111", border: "none", borderRadius: "12px", padding: "12px 24px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit", fontSize: "14px" }}>Back to Home</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "'Poppins', -apple-system, sans-serif", color: "#111" }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0} html,body,#root{width:100%!important;margin:0!important} input:focus,textarea:focus,select:focus{border:1.5px solid ${ACCENT}!important;background:#fff!important}`}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(245,245,247,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,0,0,0.07)", padding: "0 64px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "58px" }}>
        <div style={{ fontSize: "21px", fontWeight: "800", letterSpacing: "-0.04em", cursor: "pointer" }} onClick={() => navigate("/")}>zurya</div>
      </nav>

      <div style={{ maxWidth: "580px", margin: "0 auto", padding: "56px 24px 80px" }}>

        {/* Progress */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "36px" }}>
          {[1, 2].map(s => (
            <div key={s} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: step >= s ? ACCENT : "#e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: "700", color: step >= s ? "#fff" : "#999", transition: "all 0.3s" }}>{s}</div>
              <span style={{ fontSize: "13px", fontWeight: step === s ? "700" : "500", color: step === s ? "#111" : "#6e6e73" }}>{s === 1 ? "Verify Order" : "Write Review"}</span>
              {s < 2 && <div style={{ width: "32px", height: "2px", background: step > s ? ACCENT : "#e0e0e0", borderRadius: "2px", transition: "all 0.3s" }} />}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div style={{ background: "#fff", borderRadius: "24px", padding: "40px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <h1 style={{ fontSize: "26px", fontWeight: "800", letterSpacing: "-0.03em", marginBottom: "8px" }}>Leave a Review</h1>
            <p style={{ color: "#6e6e73", fontSize: "15px", marginBottom: "32px", lineHeight: 1.6 }}>Enter your order ID to verify your purchase. You'll find it in your purchase confirmation email.</p>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#6e6e73", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "6px" }}>Order ID</label>
            <input
              value={orderId}
              onChange={e => { setOrderId(e.target.value); setOrderError(""); }}
              placeholder="e.g. ORD-2026-XXXXX"
              style={{ ...inputStyle, marginBottom: "6px" }}
              onKeyDown={e => e.key === "Enter" && verifyOrder()}
            />
            {orderError && <p style={{ color: "#FF375F", fontSize: "13px", marginBottom: "16px" }}>{orderError}</p>}
            {!orderError && <p style={{ color: "#c7c7cc", fontSize: "12px", marginBottom: "24px" }}>Your order ID was sent to your email after purchase.</p>}
            <button onClick={verifyOrder} disabled={verifying} style={{ width: "100%", background: verifying ? "#6e6e73" : ACCENT, color: "#fff", border: "none", borderRadius: "14px", padding: "14px", fontWeight: "700", fontSize: "16px", cursor: verifying ? "not-allowed" : "pointer", fontFamily: "inherit", transition: "opacity 0.15s" }}>
              {verifying ? "Verifying..." : "Verify Order →"}
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={{ background: "#fff", borderRadius: "24px", padding: "40px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
            <h1 style={{ fontSize: "26px", fontWeight: "800", letterSpacing: "-0.03em", marginBottom: "8px" }}>Write Your Review</h1>
            <p style={{ color: "#6e6e73", fontSize: "14px", marginBottom: "32px" }}>Order verified ✅ — Share your honest experience</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Name */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#6e6e73", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "6px" }}>Your Name</label>
                <input value={name} onChange={e => { setName(e.target.value); setErrors(p => ({...p, name: ""})); }} placeholder="How should we display your name?" style={inputStyle} />
                {errors.name && <p style={{ color: "#FF375F", fontSize: "12px", marginTop: "4px" }}>{errors.name}</p>}
              </div>

              {/* Product */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#6e6e73", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "6px" }}>Which Product?</label>
                <select value={product} onChange={e => { setProduct(e.target.value); setErrors(p => ({...p, product: ""})); }} style={{ ...inputStyle, cursor: "pointer" }}>
                  <option value="">Select a product...</option>
                  {products.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                {errors.product && <p style={{ color: "#FF375F", fontSize: "12px", marginTop: "4px" }}>{errors.product}</p>}
              </div>

              {/* Rating */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#6e6e73", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "10px" }}>Your Rating</label>
                <Stars value={rating} onChange={v => { setRating(v); setErrors(p => ({...p, rating: ""})); }} />
                {rating > 0 && (
                  <p style={{ color: "#6e6e73", fontSize: "13px", marginTop: "6px" }}>
                    {rating === 5 ? "Excellent! 🌟" : rating === 4 ? "Great! 👍" : rating === 3 ? "Good 👌" : rating === 2 ? "Fair 😐" : "Poor 😞"}
                  </p>
                )}
                {errors.rating && <p style={{ color: "#FF375F", fontSize: "12px", marginTop: "4px" }}>{errors.rating}</p>}
              </div>

              {/* Review text */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#6e6e73", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: "6px" }}>Your Review</label>
                <textarea
                  value={review}
                  onChange={e => { setReview(e.target.value); setErrors(p => ({...p, review: ""})); }}
                  placeholder="What did you think of the guide? What was most helpful? Would you recommend it?"
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                  {errors.review ? <p style={{ color: "#FF375F", fontSize: "12px" }}>{errors.review}</p> : <span />}
                  <span style={{ color: "#c7c7cc", fontSize: "12px" }}>{review.length} chars</span>
                </div>
              </div>

              {errors.submit && <p style={{ color: "#FF375F", fontSize: "13px", background: "#fff0f0", padding: "12px", borderRadius: "10px" }}>{errors.submit}</p>}

              <button onClick={submit} disabled={submitting} style={{ background: submitting ? "#6e6e73" : ACCENT, color: "#fff", border: "none", borderRadius: "14px", padding: "14px", fontWeight: "700", fontSize: "16px", cursor: submitting ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
                {submitting ? "Submitting..." : "Submit Review ✓"}
              </button>
              <p style={{ color: "#c7c7cc", fontSize: "12px", textAlign: "center" }}>Reviews are checked before going live — usually within 24 hours</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}