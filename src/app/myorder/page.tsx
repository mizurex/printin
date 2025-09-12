// app/orders/page.tsx (Server Component)
import { prisma } from "@/lib/prisma/prisma";
import Link from "next/link";
import { auth } from "../../../auth";

export default async function OrdersPage() {

const session = await auth();

const orders = await prisma.user.findUnique({
  where: {
    user_id: session?.user?.id
  },
  include: {
    orders: true
  }
});

  return (
    <div className="p-8 bg-white  w-full">
    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <div className="flex items-center gap-2">
        <Link href="/">
        <button className="text-gray-600 cursor-pointer">&larr; Back</button>
        </Link>
        
        <h1 className="text-2xl font-semibold ml-20">Orders ({orders?.orders.length})</h1>
    
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 flex-wrap">
      

        <div className="border px-4 py-2 rounded-md font-semibold text-gray-700 cursor-pointer">
          All Time
        </div>

        <div className="border px-4 py-2 rounded-md text-gray-600 cursor-pointer">
          Jan 1 - Sep 12
        </div>
      </div>
    </div>

    {/* Order List */}
    {orders?.orders.length === 0 ? (
      <p className="text-center text-gray-600 font-medium">No Orders Found</p>
    ) : (
      <div className="space-y-4">
        {orders?.orders.map((order) => (
          <div
            key={order.id}
            className="p-4 border rounded-lg bg-gray-50"
          >
            <p className="font-semibold text-gray-800">
              Order #{order.order_number}
            </p>
            <p className="text-gray-600">
              Service: {order.service_type ?? "N/A"}
            </p>
            <p className="text-gray-600">
              Amount: ${order.total_amount?.toFixed(2) ?? "0.00"}
            </p>
            <p className="text-gray-500 text-sm">
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
