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
    console.log("debug");
    const { orderSelections, successUrl, cancelUrl, userId } = body;
    const { files, options, copies, service } = orderSelections;

    

  

 
    const order = await prisma.order.create({
      data: {
        user_id: userId,
        service_type: "PICKUP",
        pickup_info: 
          {
            create:{
            store_id:"23432",
            store_name:"test",
            store_addr:"test"},

            },
            
            documents: {
              create: {
                file_url: files.url,
                page_count: 1,
                color: true,
                lamination: false,
                binding: false,
              } as any,
            },
        total_pages: 3,
        total_amount: 200.00,
      } as any,
    });

    console.log("debug");
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
