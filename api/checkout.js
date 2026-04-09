import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Map product titles to their Stripe Price IDs
const PRICE_MAP = {
  "Wealth Before 30": "price_1TIY5LI6J5CCRtFUtUytyxbc",
  // Add more products here as you create them in Stripe:
  // "Budget Like a CEO": "price_xxx",
  // "The Side Hustle Blueprint": "price_xxx",
};

// Map product titles to their download URLs (hosted on Supabase Storage or any URL)
const DOWNLOAD_MAP = {
  "Wealth Before 30": process.env.DOWNLOAD_WEALTH_BEFORE_30,
  // Add more as you upload files:
  // "Budget Like a CEO": process.env.DOWNLOAD_BUDGET_LIKE_CEO,
};

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { productTitle, customerEmail } = req.body;

  if (!productTitle || !customerEmail) {
    return res.status(400).json({ error: "Missing product or email" });
  }

  const priceId = PRICE_MAP[productTitle];
  if (!priceId) {
    return res.status(400).json({ error: "Product not found" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: customerEmail,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      metadata: {
        productTitle,
        downloadUrl: DOWNLOAD_MAP[productTitle] || "",
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/shop`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error("Stripe error:", err);
    return res.status(500).json({ error: err.message });
  }
}