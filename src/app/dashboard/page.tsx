import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"
import { prisma } from "@/lib/prisma/prisma"
import { auth } from "@/auth"
import Redirect from "@/src/components/Redirect";

async function getData(): Promise<Payment[]> {
  try {
    const users = await prisma.user.findMany({
      orderBy: { created_at: "desc" },
      include: {
        orders: true,
      },
    });

    // Flatten users → orders into Payment[]
    const payments: Payment[] = users.flatMap((user) =>
      user.orders.map((order) => ({
        id: order.id.toString(),
        amount: order.total_amount,
        status: order.order_status,
        email: user.email, // take from user
      }))
    );

    return payments;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return [];
  }
}
export default async function DemoPage() {
  const session = await auth();
  if(!session?.user){
    return <Redirect/>
  }
  const data = await getData();

  return (
    <div className="p-8 bg-[#f4f4f4]">
      
    <div className="container py-10 px-1 sm:px-20 shadow-md bg-white rounded-md">
      <DataTable columns={columns} data={data}/>
    </div>
    </div>
   
  )
}