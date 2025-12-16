import { prisma } from "@/lib/prisma/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Package, 
  Truck, 
  FileText, 
  MapPin,
  Calendar,
  Mail,
  User,
  FileStack,
  Palette,
  BookOpen,
  Layers
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface OrderWithDetails {
  id: number
  order_number: number
  service_type: string
  total_pages: number
  total_amount: number
  order_status: string
  created_at: Date
  user: {
    name: string
    email: string
    mobile: string | null
  }
  documents: {
    id: number
    file_url: string
    page_count: number
    color: boolean
    lamination: boolean
    binding: boolean
  }[]
  deliveryInfo: {
    name: string
    address: string
    city: string
    postal: string
    email: string
  } | null
  pickupInfo: {
    store_name: string
    store_addr: string
  } | null
}

async function getOrders(): Promise<OrderWithDetails[]> {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { created_at: "desc" },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            mobile: true,
          },
        },
        documents: true,
        deliveryInfo: true,
        pickupInfo: true,
      },
    })
    return orders as OrderWithDetails[]
  } catch (error) {
    console.error("Error fetching orders:", error)
    return []
  }
}

function OrderCard({ order }: { order: OrderWithDetails }) {
  const statusConfig = {
    PENDING: { bg: "bg-amber-100 text-amber-800 border-amber-200", label: "Pending" },
    PAID: { bg: "bg-blue-100 text-blue-800 border-blue-200", label: "Paid" },
    DELIVERED: { bg: "bg-emerald-100 text-emerald-800 border-emerald-200", label: "Delivered" },
  }

  const status = statusConfig[order.order_status as keyof typeof statusConfig] || {
    bg: "bg-gray-100 text-gray-800 border-gray-200",
    label: order.order_status,
  }

  const formattedAmount = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(order.total_amount)

  const formattedDate = new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(order.created_at))

  return (
    <Card className="font-sans rounded-xl border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md">
    {/* Header */}
    <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-3">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-xs font-semibold text-muted-foreground">
          #{order.order_number}
        </div>

        <div className="min-w-0">
          <CardTitle className="text-sm font-medium leading-none truncate">
            {order.user.name}
          </CardTitle>
          <CardDescription className="flex items-center gap-1 text-xs truncate">
            <Mail className="h-3 w-3 shrink-0" />
            {order.user.email}
          </CardDescription>
        </div>
      </div>

      <Badge
        variant="outline"
        className="w-fit rounded-full border-zinc-200 bg-zinc-50 text-xs"
      >
        {status.label}
      </Badge>
    </CardHeader>

    {/* Content */}
    <CardContent className="space-y-4 border-t border-zinc-100 px-4 py-4">
      {/* Meta */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>{formattedDate}</span>
        </div>
        <span className="font-semibold text-muted-foreground">
          {formattedAmount}
        </span>
      </div>

      {/* Service */}
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2">
        <p className="text-sm font-medium">
          {order.service_type === "DELIVERY" ? "Home Delivery" : "Store Pickup"}
        </p>
        {order.service_type === "DELIVERY" && order.deliveryInfo && (
          <p className="text-xs text-muted-foreground">
            {order.deliveryInfo.address}, {order.deliveryInfo.city} –{" "}
            {order.deliveryInfo.postal}
          </p>
        )}
        {order.service_type === "PICKUP" && order.pickupInfo && (
          <p className="text-xs text-muted-foreground">
            {order.pickupInfo.store_name} — {order.pickupInfo.store_addr}
          </p>
        )}
      </div>

      {/* Documents */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm font-medium">
          <FileStack className="h-4 w-4 text-muted-foreground" />
          <span>
            {order.documents.length} Document
            {order.documents.length !== 1 && "s"}
          </span>
          <span className="text-muted-foreground">
            ({order.total_pages} pages)
          </span>
        </div>

        <TooltipProvider>
          <div className="flex flex-wrap gap-2">
            {order.documents.map((doc: any, index: number) => (
              <Tooltip key={doc.id}>
                <TooltipTrigger asChild>
                  <div className="flex cursor-pointer items-center gap-1.5 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 text-xs transition-colors hover:bg-zinc-100">
                    <FileText className="h-3 w-3" />
                    <span>Doc {index + 1}</span>
                    <span className="text-muted-foreground">
                      ({doc.page_count}p)
                    </span>
                  </div>
                </TooltipTrigger>

                <TooltipContent className="border-zinc-200 bg-white text-xs">
                  <p className="font-medium mb-1">
                    Document {index + 1}
                  </p>
                  <div className="space-y-1 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <span>{doc.color ? "Color" : "B&W"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Layers className="h-3 w-3" />
                      <span>{doc.lamination ? "Laminated" : "No lamination"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      <span>{doc.binding ? "Bound" : "No binding"}</span>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 rounded-lg border-zinc-200 hover:border-[#ff8201] hover:bg-[#ffebd6] hover:text-[#ff8201]"
        >
          View Details
        </Button>
        <Button
          size="sm"
          className="flex-1 rounded-lg bg-[#ff8201] text-white hover:bg-[#ff8201]/90"
        >
          Update Status
        </Button>
      </div>
    </CardContent>
  </Card>
  )
}

export default async function OrdersPage() {
  const orders = await getOrders()

  const pendingCount = orders.filter(o => o.order_status === "PENDING").length
  const paidCount = orders.filter(o => o.order_status === "PAID").length
  const deliveredCount = orders.filter(o => o.order_status === "DELIVERED").length

  return (
    <div className="min-h-screen bg-[#f8f9fa] font-sans">
      <div className="p-6 lg:p-8 space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-medium text-foreground">Order Management</h1>
            <p className="text-xs text-muted-foreground">View and manage all customer orders with full details</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className=" text-amber-800 border-zinc-200  rounded-full px-2 py-1 text-xs">
              {pendingCount} Pending
            </Badge>
            <Badge variant="outline" className=" text-blue-800 border-zinc-200 rounded-full px-2 py-1 text-xs">
              {paidCount} Paid
            </Badge>
            <Badge variant="outline" className=" text-emerald-800 border-zinc-200 rounded-full px-2 py-1 text-xs">
              {deliveredCount} Delivered
            </Badge>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="font-sans py-2 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">Total Orders</CardTitle>
              <div className="flex p-1 items-center justify-center rounded-[6px] bg-neutral-50 border">
                <Package className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{orders.length}</div>
              <p className="text-xs text-muted-foreground mt-1">All time</p>
            </CardContent>
          </Card>
          <Card className="font-sans py-2 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">Pending</CardTitle>
              <div className="flex p-1 items-center justify-center rounded-[6px] bg-neutral-50 border">
                <User className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{pendingCount}</div>
              <p className="text-xs text-muted-foreground mt-1">Awaiting action</p>
            </CardContent>
          </Card>
          <Card className="font-sans py-2 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">Deliveries</CardTitle>
              <div className="flex p-1 items-center justify-center rounded-[6px] bg-neutral-50 border">
                <Truck className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">
                {orders.filter(o => o.service_type === "DELIVERY").length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Home delivery</p>
            </CardContent>
          </Card>
          <Card className="font-sans py-2 shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base font-medium">Pickups</CardTitle>
              <div className="flex p-1 items-center justify-center rounded-[6px] bg-neutral-50 border">
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">
                {orders.filter(o => o.service_type === "PICKUP").length}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Store pickup</p>
            </CardContent>
          </Card>
        </div>

        {/* Orders Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>

        {orders.length === 0 && (
          <Card className="font-sans py-2 hover:bg-[#ffebd6]">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-muted-foreground/50 mb-4" />
              <p className="text-lg font-medium text-muted-foreground">No orders yet</p>
              <p className="text-sm text-muted-foreground">Orders will appear here when customers place them</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

