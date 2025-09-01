import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import {prisma} from "@/lib/prisma/prisma";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export async function POST(req: Request) {

  try {
  const body = await req.text();
  const headerList = await headers();
  const sig =  headerList.get("stripe-signature")!;

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    throw new Error("Missing Stripe Secret Key");
  }
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        await prisma.order.update({
          where: { id: Number(orderId) },
          data: { status: "PAID" }, 
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
