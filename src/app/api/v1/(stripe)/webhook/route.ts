import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma/prisma";

const stripe = new Stripe("sk_test_51S0P03RHYFZQ6yU5hcTqItNS5V9vzZ9vzgsqINF8OnCYq5R7c5rWaPYl5hB5mbC7EUJKVdhNOgKfD9yb6CXS0RLh00I7go5GoI");

export async function POST(req: Request) {

  try {
  const body = await req.text();
  const headerList = await headers();
  const sig =  headerList.get("stripe-signature")!;

  if(!process.env.STRIPE_WEBHOOK_SECRET){
    throw new Error('Stripe webhook secret missing');
  }
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      "whsec_0c18c280e415ab6a4c1a26c070e5d5c1e9c54fcf2e105e47bf40fbd3f10f0dd9" 
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        await prisma.order.update({
          where: { id: Number(orderId) },
          data: { order_status: "PAID" }, 
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Webhook error: ${err.message}`);
    } else {
      console.error('Webhook error:', err);
    }
    return new NextResponse("Webhook Error", { status: 400 });
  }
}
