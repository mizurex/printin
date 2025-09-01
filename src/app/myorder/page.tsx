// app/orders/page.tsx (Server Component)

import Navbar from "@/components/NavBar";
import { prisma } from "@/lib/prisma/prisma";

export default async function OrdersPage() {
  // ✅ fetch all orders (no user include)
  const orders = await prisma.order.findMany({
    orderBy: { created_at: "desc" },
  });

  return (
    <div className="p-8 bg-white h-screen">
     
      <h1 className="text-2xl font-bold mb-4">Orders ({orders.length})</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No Orders Found</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 rounded-2xl  shadow-md flex flex-col gap-2"
            >
              <p className="text-white font-semibold">
                Order #{order.order_number}
              </p>
              <p className="text-gray-300">
                Service: {order.service_type ?? "N/A"}
              </p>
              <p className="text-gray-300">
                Amount: ${order.total_amount?.toFixed(2) ?? "0.00"}
              </p>
              <p className="text-gray-400 text-sm">
                Created:{" "}
                {order.created_at
                  ? new Date(order.created_at).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
