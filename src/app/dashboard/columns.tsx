"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown, Copy, Eye, Truck, FileText, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { OrderStatus, ServiceType } from "@prisma/client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export type Payment = {
  id: string
  orderNumber: number
  amount: number
  status: OrderStatus
  email: string
  customerName: string
  serviceType: ServiceType
  totalPages: number
  createdAt: Date
  documentCount: number
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "orderNumber",
    header: "Order #",
    cell: ({ row }) => {
      const orderNumber = row.getValue("orderNumber") as number
      return (
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#026766]/10 text-xs font-semibold text-[#026766]">
            #{orderNumber}
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "customerName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent px-0"
        >
          Customer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const name = row.getValue("customerName") as string
      const email = row.original.email
      return (
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{name}</span>
          <span className="text-xs text-muted-foreground">{email}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string

      const statusConfig = {
        PENDING: { 
          bg: "bg-amber-100 text-amber-800 border-amber-200", 
          label: "Pending" 
        },
        PAID: { 
          bg: "bg-blue-100 text-blue-800 border-blue-200", 
          label: "Paid" 
        },
        DELIVERED: { 
          bg: "bg-emerald-100 text-emerald-800 border-emerald-200", 
          label: "Delivered" 
        },
      }

      const config = statusConfig[status as keyof typeof statusConfig] || { 
        bg: "bg-gray-100 text-gray-800 border-gray-200", 
        label: status 
      }

      return (
        <Badge variant="outline" className={`${config.bg} border font-medium`}>
          {config.label}
        </Badge>
      )
    },
  },
  {
    accessorKey: "serviceType",
    header: "Service",
    cell: ({ row }) => {
      const serviceType = row.getValue("serviceType") as string
      const isDelivery = serviceType === "DELIVERY"
      
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className={`flex items-center gap-2 px-2 py-1 rounded-md ${isDelivery ? 'bg-purple-50' : 'bg-cyan-50'}`}>
                {isDelivery ? (
                  <Truck className="h-3.5 w-3.5 text-purple-600" />
                ) : (
                  <FileText className="h-3.5 w-3.5 text-cyan-600" />
                )}
                <span className={`text-xs font-medium ${isDelivery ? 'text-purple-700' : 'text-cyan-700'}`}>
                  {isDelivery ? "Delivery" : "Pickup"}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-[#026766] text-white border-0">
              <p>{isDelivery ? "Home delivery order" : "Store pickup order"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
  },
  {
    accessorKey: "totalPages",
    header: () => <div className="text-center">Pages</div>,
    cell: ({ row }) => {
      const pages = row.getValue("totalPages") as number
      const docs = row.original.documentCount
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <div className="text-center">
                <span className="font-medium">{pages}</span>
                <span className="text-xs text-muted-foreground ml-1">({docs} files)</span>
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-[#026766] text-white border-0">
              <p>{pages} pages across {docs} document{docs !== 1 ? 's' : ''}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    },
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount)

      return <div className="text-right font-semibold text-foreground">{formatted}</div>
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-transparent px-0"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      const formatted = new Intl.DateTimeFormat("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(date)
      const time = new Intl.DateTimeFormat("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
      }).format(date)

      return (
        <div className="flex flex-col">
          <span className="text-sm">{formatted}</span>
          <span className="text-xs text-muted-foreground">{time}</span>
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-[#026766]/10">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
              className="cursor-pointer"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy order ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Eye className="mr-2 h-4 w-4" />
              View details
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <FileText className="mr-2 h-4 w-4" />
              View documents
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-[#026766]">
              <Truck className="mr-2 h-4 w-4" />
              Update status
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
