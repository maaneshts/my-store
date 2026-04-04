import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SUPABASE_URL = "https://zhetlpiamcrkfjmairjb.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpoZXRscGlhbWNya2ZqbWFpcmpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyOTc4NDcsImV4cCI6MjA5MDg3Mzg0N30.XygGGULYYtD42-FHSQGuABpBBpM2s2fVYyt9X8XrSr0";
const ACCENT = "#0A84FF";

function Stars({ count, size = 16 }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ color: i <= count ? "#FF9F0A" : "#e0e0e0", fontSize: `${size}px` }}>★</span>
      ))}
    </div>
  );
}

export default function Reviews() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const products = ["All", "Wealth Before 30", "Budget Like a CEO", "The Side Hustle Blueprint", "The Zurya Mindset", "Fit in 30 Days", "Deep Work Daily", "Relationship OS"];

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch(
        `${SUPABASE_URL}/rest/v1/reviews?approved=eq.true&order=created_at.desc`,
        { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } }
      );
      const data = await res.json();
      setReviews(Array.isArray(data) ? data : []);
    } catch (e) {
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const filtered = filter === "All" ? reviews : reviews.filter(r => r.product === filter);

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "—";

  const ratingCounts = [5, 4, 3, 2, 1].map(n => ({
    stars: n,
    count: reviews.filter(r => r.rating === n).length,
    pct: reviews.length > 0 ? Math.round((reviews.filter(r => r.rating === n).length / reviews.length) * 100) : 0
  }));

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "'Poppins', -apple-system, sans-serif", color: "#111" }}>
      <style>{`
        *{box-sizing:border-box;margin:0;padding:0}
        html,body,#root{width:100%!important;margin:0!important;overflow-x:hidden!important}
        .nav-link{cursor:pointer;transition:color 0.15s}
        .nav-link:hover{color:#111!important}
        .rcard{transition:transform 0.2s,box-shadow 0.2s}
        .rcard:hover{transform:translateY(-3px);box-shadow:0 16px 32px rgba(0,0,0,0.08)!important}
        @media(max-width:768px){.pad{padding:32px 20px!important}.stats-grid{flex-direction:column!important}}
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(245,245,247,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,0,0,0.07)", padding: "0 64px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "58px" }}>
        <div style={{ fontSize: "21px", fontWeight: "800", letterSpacing: "-0.04em", cursor: "pointer" }} onClick={() => navigate("/")}>zurya</div>
        <div style={{ display: "flex", gap: "28px", fontSize: "14px", color: "#6e6e73", fontWeight: "500" }}>
          <span className="nav-link" onClick={() => navigate("/shop")}>Shop</span>
          <span className="nav-link" style={{ color: "#111", fontWeight: "700" }}>Reviews</span>
          <span className="nav-link" onClick={() => navigate("/")}>Home</span>
        </div>
      </nav>

      <div className="pad" style={{ padding: "56px 64px", maxWidth: "1100px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "20px", marginBottom: "48px" }}>
          <div>
            <button onClick={() => navigate("/")} style={{ background: "none", border: "none", color: "#6e6e73", fontSize: "14px", fontWeight: "500", cursor: "pointer", fontFamily: "inherit", marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px", padding: 0 }}>
              ← Back to Home
            </button>
            <h1 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: "800", letterSpacing: "-0.04em", marginBottom: "8px" }}>Customer Reviews</h1>
            <p style={{ color: "#6e6e73", fontSize: "16px" }}>Real feedback from real readers</p>
          </div>
          <button onClick={() => navigate("/leave-review")} style={{ background: ACCENT, color: "#fff", border: "none", borderRadius: "14px", padding: "13px 26px", fontWeight: "700", fontSize: "15px", cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 16px rgba(10,132,255,0.25)", whiteSpace: "nowrap" }}>
            Leave a Review →
          </button>
        </div>

        {/* Stats */}
        {reviews.length > 0 && (
          <div className="stats-grid" style={{ display: "flex", gap: "20px", marginBottom: "40px", flexWrap: "wrap" }}>
            {/* Average */}
            <div style={{ background: "#fff", borderRadius: "20px", padding: "28px 32px", display: "flex", alignItems: "center", gap: "20px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.04)", flex: "0 0 auto" }}>
              <div>
                <div style={{ fontSize: "52px", fontWeight: "800", color: "#111", letterSpacing: "-0.04em", lineHeight: 1 }}>{avgRating}</div>
                <Stars count={Math.round(parseFloat(avgRating))} size={18} />
                <div style={{ color: "#6e6e73", fontSize: "13px", marginTop: "6px" }}>{reviews.length} review{reviews.length !== 1 ? "s" : ""}</div>
              </div>
            </div>

            {/* Rating breakdown */}
            <div style={{ background: "#fff", borderRadius: "20px", padding: "24px 28px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.04)", flex: 1, minWidth: "240px" }}>
              {ratingCounts.map(({ stars, count, pct }) => (
                <div key={stars} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "#111", width: "14px" }}>{stars}</span>
                  <span style={{ color: "#FF9F0A", fontSize: "13px" }}>★</span>
                  <div style={{ flex: 1, background: "#F5F5F7", borderRadius: "4px", height: "8px", overflow: "hidden" }}>
                    <div style={{ width: `${pct}%`, background: "#FF9F0A", height: "100%", borderRadius: "4px", transition: "width 0.5s ease" }} />
                  </div>
                  <span style={{ fontSize: "12px", color: "#6e6e73", width: "28px", textAlign: "right" }}>{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filter */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "28px" }}>
          {products.map(p => (
            <button key={p} onClick={() => setFilter(p)} style={{ background: filter === p ? "#111" : "#fff", color: filter === p ? "#fff" : "#6e6e73", border: filter === p ? "none" : "1px solid rgba(0,0,0,0.08)", borderRadius: "980px", padding: "7px 18px", fontSize: "13px", fontWeight: "500", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>{p}</button>
          ))}
        </div>

        {/* Reviews */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px", color: "#6e6e73" }}>Loading reviews...</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", background: "#fff", borderRadius: "20px" }}>
            <div style={{ fontSize: "40px", marginBottom: "16px" }}>💬</div>
            <div style={{ fontSize: "18px", fontWeight: "700", color: "#111", marginBottom: "8px" }}>No reviews yet</div>
            <div style={{ color: "#6e6e73", marginBottom: "24px" }}>Be the first to leave a review!</div>
            <button onClick={() => navigate("/leave-review")} style={{ background: ACCENT, color: "#fff", border: "none", borderRadius: "12px", padding: "12px 24px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit", fontSize: "14px" }}>Leave a Review</button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
            {filtered.map(r => (
              <div key={r.id} className="rcard" style={{ background: "#fff", borderRadius: "20px", padding: "28px", boxShadow: "0 2px 16px rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <Stars count={r.rating} />
                  <span style={{ fontSize: "11px", color: "#c7c7cc" }}>
                    {new Date(r.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                  </span>
                </div>
                <p style={{ fontSize: "15px", color: "#111", lineHeight: 1.65, fontWeight: "500", marginBottom: "16px" }}>"{r.review}"</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "36px", height: "36px", background: ACCENT + "20", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "700", color: ACCENT }}>{r.name[0].toUpperCase()}</div>
                    <span style={{ fontSize: "14px", fontWeight: "600", color: "#6e6e73" }}>{r.name}</span>
                  </div>
                  <span style={{ background: "#F5F5F7", color: "#6e6e73", borderRadius: "8px", padding: "3px 10px", fontSize: "11px", fontWeight: "600" }}>{r.product}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ background: "#1c1c1e", padding: "24px 64px", display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.07)", marginTop: "60px" }}>
        <span style={{ color: "#fff", fontWeight: "800", letterSpacing: "-0.04em", fontSize: "17px", cursor: "pointer" }} onClick={() => navigate("/")}>zurya</span>
        <span style={{ color: "#555", fontSize: "13px" }}>© 2026 Zurya · All rights reserved</span>
      </div>
    </div>
  );
}