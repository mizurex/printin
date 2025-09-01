// app/api/v1/stripe-session/route.ts
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia" as any,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { orderSelections, successUrl, cancelUrl, userId } = body;
    const { files, options, copies, service } = orderSelections;

    // ✅ make sure userId is Int
    const parsedUserId = parseInt(userId);
    if (isNaN(parsedUserId)) {
      return Response.json({ error: "Invalid userId" }, { status: 400 });
    }

    // ✅ ensure user exists or create dummy one
    let user = await prisma.user.findUnique({
      where: { id: parsedUserId },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: parsedUserId, // explicitly set same ID
          name: "Test User",
          email: `test${parsedUserId}@example.com`,
        },
      });
    }

    // calculate total
    const numFiles = 1;
    const total = numFiles * copies * 5; // example calculation

    // ✅ create Order
    const order = await prisma.order.create({
      data: {
        user_id: parsedUserId,
        service_type: service.method === "delivery" ? "DELIVERY" : "PICKUP",
        total_pages: numFiles * copies,
        total_amount: total,
      },
    });

    // ✅ create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Printing Order" },
            unit_amount: total * 100, // cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return Response.json({ id: session.id, order });
  } catch (err) {
    console.error("Stripe error:", err);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
