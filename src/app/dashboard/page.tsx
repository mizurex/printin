import { columns, Payment } from "./columns"
import { DataTable } from "./data-table"
import { prisma } from "@/lib/prisma/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Package, 
  CircleDollarSign, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  DollarSign,
  ShoppingCart
} from "lucide-react"

interface OrderStats {
  totalOrders: number
  totalRevenue: number
  pendingOrders: number
  deliveredOrders: number
  paidOrders: number
  totalCustomers: number
  totalDocuments: number
  avgOrderValue: number
}

async function getStats(): Promise<OrderStats> {
  try {
    const [orders, customers, documents] = await Promise.all([
      prisma.order.findMany(),
      prisma.user.count(),
      prisma.document.count(),
    ])

    const totalOrders = orders.length
    const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0)
    const pendingOrders = orders.filter(o => o.order_status === "PENDING").length
    const deliveredOrders = orders.filter(o => o.order_status === "DELIVERED").length
    const paidOrders = orders.filter(o => o.order_status === "PAID").length
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

    return {
      totalOrders,
      totalRevenue,
      pendingOrders,
      deliveredOrders,
      paidOrders,
      totalCustomers: customers,
      totalDocuments: documents,
      avgOrderValue,
    }
  } catch (error) {
    console.error("Error fetching stats:", error)
    return {
      totalOrders: 0,
      totalRevenue: 0,
      pendingOrders: 0,
      deliveredOrders: 0,
      paidOrders: 0,
      totalCustomers: 0,
      totalDocuments: 0,
      avgOrderValue: 0,
    }
  }
}

async function getData(): Promise<Payment[]> {
  try {
    const users = await prisma.user.findMany({
      orderBy: { created_at: "desc" },
      include: {
        orders: {
          include: {
            documents: true,
            deliveryInfo: true,
            pickupInfo: true,
          },
          orderBy: { created_at: "desc" },
        },
      },
    })

    const payments: Payment[] = users.flatMap((user) =>
      user.orders.map((order) => ({
        id: order.id.toString(),
        orderNumber: order.order_number,
        amount: order.total_amount,
        status: order.order_status,
        email: "testuser@example.com",
        customerName: "Test User",
        serviceType: order.service_type,
        totalPages: order.total_pages,
        createdAt: order.created_at,
        documentCount: order.documents.length,
      }))
    )

    return payments
  } catch (error) {
    console.error("Error fetching user orders:", error)
    return []
  }
}

function StatCard({ 
  title, 
  value, 
  description, 
  icon: Icon, 
  trend,
  trendUp 
}: { 
  title: string
  value: string | number
  description: string
  icon: React.ElementType
  trend?: string
  trendUp?: boolean
}) {
  return (
    <Card className="py-2 font-sans shadow-[0_0_10px_0_rgba(0,0,0,0.1)]">
      <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 sm:px-6">
        <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground truncate pr-2">{title}</CardTitle>
        <div className="flex p-1 items-center justify-center rounded-[6px] bg-neutral-50 border flex-shrink-0">
          <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6">
        <div className="text-xl sm:text-2xl font-semibold text-foreground truncate">{value}</div>
        <div className="flex items-center justify-between gap-2 mt-1">
          <p className="text-xs text-muted-foreground truncate">{description}</p>
          {trend && (
            <Badge variant="secondary" className={`text-xs flex-shrink-0 ${trendUp ? ' text-black' : ' text-red-700'}`}>
              {trend}
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function OrderStatusCard({ pending, paid, delivered, total }: { pending: number; paid: number; delivered: number; total: number }) {
  const pendingPercent = total > 0 ? (pending / total) * 100 : 0
  const paidPercent = total > 0 ? (paid / total) * 100 : 0
  const deliveredPercent = total > 0 ? (delivered / total) * 100 : 0

  return (
    <Card className="font-sans py-4 gap-2 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-0 px-4 sm:px-6">
        <CardTitle className="text-sm sm:text-base font-medium">Order Status</CardTitle>
        <div className="flex p-1 items-center justify-center rounded-[6px] bg-neutral-50 border flex-shrink-0">
          <Package className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="pb-0 px-4 sm:px-6">
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="text-xl sm:text-2xl font-semibold">{total}</div>
            <p className="text-xs text-muted-foreground">Total Orders</p>
          </div>
          {total > 0 && (
            <Badge variant="secondary" className="text-xs text-black flex-shrink-0">
              +{deliveredPercent.toFixed(1)}% delivered
            </Badge>
          )}
        </div>
        
        <div className="space-y-2 mt-6 sm:mt-8 border-t border-border/50 pt-4">
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-muted-foreground">Pending</span>
              <span className="font-medium border border-border/50 rounded-full px-2 py-1 text-xs">{pendingPercent.toFixed(0)}%</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-muted-foreground">Paid</span>
              <span className="font-medium border border-border/50 rounded-full px-2 py-1 text-xs">{paidPercent.toFixed(0)}%</span>
            </div>
          </div>

          <div className="">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="text-muted-foreground">Delivered</span>
              <span className="font-medium border border-border/50 rounded-full px-2 py-1 text-xs">{deliveredPercent.toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default async function DashboardPage() {
  const [data, stats] = await Promise.all([getData(), getStats()])

  const formattedRevenue = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(stats.totalRevenue)

  const formattedAvgOrder = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(stats.avgOrderValue)

  return (
    <div className="bg-[#f8f9fa] font-sans">
      <div className="p-4 sm:p-6 lg:p-8 space-y-4">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-xs text-muted-foreground">Welcome back to printin! Here&apos;s your business overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Revenue"
            value={formattedRevenue}
            description="All time earnings"
            icon={CircleDollarSign}
            trend="+12.5%"
            trendUp={true}
          />
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            description="Orders received"
            icon={ShoppingCart}
            trend="+8.2%"
            trendUp={true}
          />
          <StatCard
            title="Customers"
            value={stats.totalCustomers}
            description="Registered users"
            icon={Users}
          />
          <StatCard
            title="Avg. Order Value"
            value={formattedAvgOrder}
            description="Per order average"
            icon={TrendingUp}
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <OrderStatusCard 
            pending={stats.pendingOrders}
            paid={stats.paidOrders}
            delivered={stats.deliveredOrders}
            total={stats.totalOrders}
          />
          
          <Card className="font-sans py-4 gap-8 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-0 px-4 sm:px-6">
              <CardTitle className="text-sm sm:text-base font-medium">Quick Stats</CardTitle>
              <div className="flex p-1 items-center justify-center rounded-[6px] bg-neutral-50 border flex-shrink-0">
                <FileText className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="space-y-1 pb-0 px-4 sm:px-6">
              <div className="flex items-center justify-between py-1.5 border-b border-border/50">
                <span className="text-xs sm:text-sm text-muted-foreground">Documents</span>
                <span className="text-xs sm:text-sm font-semibold">{stats.totalDocuments}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 border-b border-border/50">
                <span className="text-xs sm:text-sm text-muted-foreground">Pending</span>
                <span className="text-xs sm:text-sm font-semibold">{stats.pendingOrders}</span>
              </div>
              <div className="flex items-center justify-between py-1.5">
                <span className="text-xs sm:text-sm text-muted-foreground">Completed</span>
                <span className="text-xs sm:text-sm font-semibold">{stats.deliveredOrders}</span>
              </div>
            </CardContent>
            <div className="mt-2 -mx-6 -mb-4">
              <svg viewBox="0 0 200 50" className="w-full h-12" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ff8201" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#ff8201" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,45 Q20,40 40,35 T80,25 T120,30 T160,15 T200,10 L200,50 L0,50 Z"
                  fill="url(#orangeGradient)"
                />
                <path
                  d="M0,45 Q20,40 40,35 T80,25 T120,30 T160,15 T200,10"
                  fill="none"
                  stroke="#ff8201"
                  strokeWidth="2"
                />
              </svg>
            </div>
          </Card>

          <Card className="font-sans py-2 gap-2 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] sm:col-span-2 lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between pb-2 px-4 sm:px-6">
              <CardTitle className="text-sm sm:text-base font-medium">Recent Orders</CardTitle>
              <div className="flex p-1 items-center justify-center rounded-[6px] bg-neutral-50 border flex-shrink-0">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="pb-4 px-4 sm:px-6">
              {data.slice(0, 4).map((order, index) => (
                <div key={order.id} className={`flex items-center gap-2 sm:gap-3 py-2 ${index !== 3 ? 'border-b border-border/50' : ''}`}>
                  <div className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-full text-xs font-medium border border-zinc-200 flex-shrink-0">
                    #{order.orderNumber}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium truncate">{order.customerName}</p>
                    <p className="text-xs text-muted-foreground">{order.totalPages} pages</p>
                  </div>
                  <Badge 
                    variant="secondary"
                    className="text-xs rounded-[4px] text-black border bg-white border border-zinc-200 flex-shrink-0"
                  >
                    {order.status}
                  </Badge>
                </div>
              ))}
              {data.length === 0 && (
                <p className="text-xs sm:text-sm text-muted-foreground text-center py-4">No recent orders</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Orders Table */}
        <Card className="border border-border/50 shadow-[0_0_10px_0_rgba(0,0,0,0.1)] py-2">
          <CardHeader className="px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <CardTitle className="text-sm sm:text-base font-medium">Order Management</CardTitle>
                <CardDescription className="text-xs">View and manage all customer orders</CardDescription>
              </div>
              <Badge variant="outline" className="w-fit rounded-[4px] text-xs">
                {data.length} orders
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
  <div className="w-full overflow-x-auto">
    <DataTable columns={columns} data={data} />
  </div>
</CardContent>  
        </Card>
      </div>
    </div>
  )
}
