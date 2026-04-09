import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ACCENT = "#0A84FF";

export default function Success() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div style={{ minHeight: "100vh", background: "#F5F5F7", fontFamily: "'Poppins', -apple-system, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
      <style>{`*{box-sizing:border-box;margin:0;padding:0}`}</style>
      <div style={{ background: "#fff", borderRadius: "24px", padding: "56px 48px", maxWidth: "480px", width: "100%", textAlign: "center", boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}>
        <div style={{ width: "80px", height: "80px", background: "#30D158", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", fontSize: "36px", color: "#fff" }}>✓</div>
        <h1 style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-0.03em", color: "#111", marginBottom: "12px" }}>Payment Successful!</h1>
        <p style={{ color: "#6e6e73", fontSize: "16px", lineHeight: 1.65, marginBottom: "12px" }}>
          Your download link has been sent to your email. Check your inbox — it should arrive within a minute.
        </p>
        <p style={{ color: "#6e6e73", fontSize: "14px", lineHeight: 1.6, marginBottom: "36px" }}>
          Don't forget to save your <strong style={{ color: "#111" }}>Order ID</strong> from the email — you'll need it to leave a review!
        </p>
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => navigate("/leave-review")} style={{ background: ACCENT, color: "#fff", border: "none", borderRadius: "12px", padding: "13px 24px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit", fontSize: "14px" }}>
            Leave a Review
          </button>
          <button onClick={() => navigate("/shop")} style={{ background: "#F5F5F7", color: "#111", border: "none", borderRadius: "12px", padding: "13px 24px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit", fontSize: "14px" }}>
            Browse More
          </button>
        </div>
        <div style={{ marginTop: "32px" }}>
          <span style={{ fontSize: "20px", fontWeight: "800", letterSpacing: "-0.04em", color: "#111", cursor: "pointer" }} onClick={() => navigate("/")}>zurya</span>
        </div>
      </div>
    </div>
  );
}