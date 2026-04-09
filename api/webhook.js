import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: { bodyParser: false },
};

// Read raw body from request
function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;
  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature error:", err.message);
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const customerEmail = session.customer_email;
    const productTitle = session.metadata?.productTitle;
    const downloadUrl = session.metadata?.downloadUrl;
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;

    console.log(`Payment received: ${productTitle} — ${customerEmail}`);
    console.log(`Order ID: ${orderId}`);

    // Send email via Resend
    if (process.env.RESEND_API_KEY && customerEmail && downloadUrl) {
      try {
        const emailRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Zurya <onboarding@resend.dev>",
            to: customerEmail,
            subject: `Your download is ready — ${productTitle}`,
            html: `
              <div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:40px 24px;color:#111;">
                <div style="margin-bottom:32px;">
                  <span style="font-size:22px;font-weight:800;letter-spacing:-0.04em;">zurya</span>
                </div>
                <h1 style="font-size:28px;font-weight:800;letter-spacing:-0.03em;margin-bottom:12px;">Your order is confirmed! 🎉</h1>
                <p style="font-size:16px;color:#6e6e73;line-height:1.6;margin-bottom:32px;">
                  Thank you for purchasing <strong style="color:#111;">${productTitle}</strong>. Your download is ready below.
                </p>
                <a href="${downloadUrl}" style="display:inline-block;background:#0A84FF;color:#fff;text-decoration:none;border-radius:14px;padding:16px 32px;font-weight:700;font-size:16px;margin-bottom:32px;">
                  Download Your eBook →
                </a>
                <p style="font-size:14px;color:#6e6e73;line-height:1.6;margin-bottom:8px;">
                  Your Order ID: <strong style="color:#111;">${orderId}</strong>
                </p>
                <p style="font-size:13px;color:#c7c7cc;">
                  Save your Order ID — you'll need it to leave a review at zurya.app/leave-review
                </p>
                <hr style="border:none;border-top:1px solid #f0f0f0;margin:32px 0;">
                <p style="font-size:13px;color:#c7c7cc;">
                  Questions? Contact support@zurya.app<br>
                  © 2026 Zurya · zurya.app
                </p>
              </div>
            `,
          }),
        });
        const emailData = await emailRes.json();
        console.log("Email sent:", emailData);
      } catch (emailErr) {
        console.error("Email error:", emailErr);
      }
    } else {
      console.log("Skipping email — missing RESEND_API_KEY, email, or downloadUrl");
      console.log("RESEND_API_KEY:", !!process.env.RESEND_API_KEY);
      console.log("customerEmail:", customerEmail);
      console.log("downloadUrl:", downloadUrl);
    }
  }

  return res.status(200).json({ received: true });
}