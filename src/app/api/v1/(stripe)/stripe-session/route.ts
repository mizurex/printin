import { NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderSelections, successUrl, cancelUrl } = body;

    const { files, options, copies, service } = orderSelections;

    // Calculate total
    let total = 0;
    const totalPages = files.reduce((sum: number, f: any) => sum + f.pages, 0);
    const rate = options.colour === "color" ? 0.25 : 0.1;
    total += totalPages * rate * copies;
    if (service.method === "delivery") total += 2.5;
    total += total * 0.2; // tax
    total = Math.round(total * 100) / 100;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Printing Order" },
            unit_amount: 200, // in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return Response.json({ id: session.id });
  } catch (err) {
    console.error("Stripe error:", err);
    return Response.json({ error: "Failed to create checkout" }, { status: 500 });
  }
}
