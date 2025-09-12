// app/api/v1/stripe-session/route.ts
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma/prisma";
import Stripe from "stripe";
import { ServiceType } from "@prisma/client";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia" as any,
});

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405 });
  }

  try {
    const { orderSelections, successUrl, cancelUrl, userId } = await req.json();
    const { files, options, copies, service } = orderSelections;

    if (!userId || !service?.method) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const totalAmount = 200;

    const orderData: any = {
      user: { connect: { user_id: userId } },
      service_type: service.method.toUpperCase() as ServiceType,
      total_pages: 6,
      total_amount: totalAmount,
      documents: {
          create: {
          file_url: files.url,
          page_count: 1,
          color:  true,
          lamination:  false,
          binding:  false,
        },
      },
    };

    if (service.method === "delivery" && service.delivery) {
      orderData.deliveryInfo = {
        create: {
          name: service.delivery.name,
          email: "john.doe@example.com",
          address: "123 Main St",
          city: "New York",
          postal: "10001",
        },
      };
    } else if (service.method === "pickup" && service.pickup) {
      orderData.pickupInfo = {
        create: {
          store_id: service.pickup.store_id,
          store_name: service.pickup.store_name,
          store_addr: service.pickup.store_addr,
        },
      };
    }

    const order = await prisma.order.create({ data: orderData });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: "Printing Order" },
            unit_amount: 5 * 100, 
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
