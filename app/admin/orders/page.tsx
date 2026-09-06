"use client"

import { useState, useEffect } from "react"
import { 
  ShoppingCart, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Truck, 
  XCircle, 
  Eye, 
  MapPin, 
  CreditCard,
  Package
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { formatRupees } from "@/lib/utils"
import { getAllOrdersAdmin, updateOrderStatus, Order } from "@/lib/firebase/orders"

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    loadOrders()
  }, [])

  const loadOrders = async () => {
    setLoading(true)
    try {
      const items = await getAllOrdersAdmin()
      setOrders(items)
      setFilteredOrders(items)
    } catch {
      toast({
        title: "Error",
        description: "Failed to load orders",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Filter and search
  useEffect(() => {
    let result = orders
    if (statusFilter !== "all") {
      result = result.filter((o) => o.status === statusFilter)
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(term) ||
          o.shipping?.firstName?.toLowerCase().includes(term) ||
          o.shipping?.lastName?.toLowerCase().includes(term) ||
          o.shipping?.city?.toLowerCase().includes(term)
      )
    }
    setFilteredOrders(result)
  }, [searchTerm, statusFilter, orders])

  const handleStatusChange = async (orderId: string, newStatus: Order["status"]) => {
    try {
      await updateOrderStatus(orderId, newStatus)
      setOrders((prev) =>
        prev.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord))
      )
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus })
      }
      toast({
        title: "Order Status Updated",
        description: `Order #${orderId.substring(0, 8)} status set to "${newStatus.toUpperCase()}".`,
      })
    } catch {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200"
      case "shipped":
        return "bg-blue-50 text-blue-700 border-blue-200"
      case "processing":
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200"
      case "cancelled":
        return "bg-rose-50 text-rose-700 border-rose-200"
      default:
        return "bg-[#f0ebe6] text-[#181818] border-[#181818]/10"
    }
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#181818] tracking-tight">
            Order Fulfillment Console
          </h1>
          <p className="text-sm text-[#7c7c7c]">
            Monitor incoming customer orders and manage fulfillment stages. ({orders.length} orders total)
          </p>
        </div>
        <Button
          onClick={loadOrders}
          variant="outline"
          className="border-[#181818]/15 text-[#181818] hover:bg-[#181818]/5 self-start sm:self-auto rounded-xl"
        >
          Refresh Feed
        </Button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white/70 backdrop-blur-sm border border-[#181818]/8 p-4 rounded-2xl">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#7c7c7c] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Search by order ID, customer name, or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#f0ebe6] border-[#181818]/10 text-[#181818] placeholder:text-[#a09890]"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded-lg bg-[#f0ebe6] border border-[#181818]/10 text-[#181818] text-sm focus:outline-none focus:ring-1 focus:ring-[#181818]"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Orders Table */}
      <div className="bg-white/70 backdrop-blur-sm border border-[#181818]/8 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[#181818]/8 bg-[#181818]/[0.03] text-[#7c7c7c] text-xs uppercase tracking-wider">
                <th className="py-3.5 px-4 font-semibold">Order ID</th>
                <th className="py-3.5 px-4 font-semibold">Customer</th>
                <th className="py-3.5 px-4 font-semibold">Date</th>
                <th className="py-3.5 px-4 font-semibold">Total Amount</th>
                <th className="py-3.5 px-4 font-semibold">Status Action</th>
                <th className="py-3.5 px-4 font-semibold text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#181818]/5">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#7c7c7c]">
                    Loading orders...
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#7c7c7c]">
                    No orders match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#181818]/[0.02] transition-colors">
                    {/* Order ID */}
                    <td className="py-3.5 px-4 font-mono text-xs text-[#181818] font-semibold">
                      #{order.id.substring(0, 10)}
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-[#181818]">
                        {order.shipping?.firstName ? `${order.shipping.firstName} ${order.shipping.lastName}` : "Customer"}
                      </div>
                      <div className="text-xs text-[#7c7c7c]">
                        {order.shipping?.city ? `${order.shipping.city}, ${order.shipping.state || "IN"}` : "Standard Shipping"}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-3.5 px-4 text-xs text-[#7c7c7c] whitespace-nowrap">
                      {new Date(order.date || Date.now()).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    {/* Total Amount & Method */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-[#181818] whitespace-nowrap">
                        {formatRupees(order.payment?.total || 0)}
                      </div>
                      <div className="text-[11px] text-[#7c7c7c] uppercase tracking-wide">
                        {order.payment?.method || "COD"}
                      </div>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value as Order["status"])}
                        className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border focus:outline-none transition-colors cursor-pointer capitalize ${getStatusColor(
                          order.status
                        )}`}
                      >
                        <option value="pending" className="bg-white text-amber-700">Pending</option>
                        <option value="processing" className="bg-white text-amber-700">Processing</option>
                        <option value="shipped" className="bg-white text-blue-700">Shipped</option>
                        <option value="delivered" className="bg-white text-emerald-700">Delivered</option>
                        <option value="cancelled" className="bg-white text-rose-700">Cancelled</option>
                      </select>
                    </td>

                    {/* Details Button */}
                    <td className="py-3.5 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedOrder(order)}
                        className="text-xs text-[#181818] hover:bg-[#181818]/5"
                      >
                        <Eye className="w-3.5 h-3.5 mr-1" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      <Dialog open={Boolean(selectedOrder)} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <DialogContent className="max-w-lg bg-[#f0ebe6] border-[#181818]/15 text-[#181818] max-h-[85vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="text-lg font-bold text-[#181818]">
                    Order Details #{selectedOrder.id.substring(0, 10)}
                  </DialogTitle>
                </div>
                <DialogDescription className="text-[#7c7c7c] text-xs">
                  Placed on {new Date(selectedOrder.date).toLocaleString()}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-5 pt-3">
                {/* Shipping Details */}
                <div className="p-3.5 rounded-xl bg-white border border-[#181818]/8 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#181818] uppercase tracking-wider">
                    <MapPin className="w-3.5 h-3.5" />
                    Delivery Destination
                  </div>
                  <div className="text-sm font-semibold text-[#181818]">
                    {selectedOrder.shipping?.firstName} {selectedOrder.shipping?.lastName}
                  </div>
                  <div className="text-xs text-[#181818]/80">
                    {selectedOrder.shipping?.address}
                  </div>
                  <div className="text-xs text-[#7c7c7c]">
                    {selectedOrder.shipping?.city}, {selectedOrder.shipping?.state} - {selectedOrder.shipping?.zipCode}
                  </div>
                  <div className="text-xs text-[#7c7c7c]">
                    Country: {selectedOrder.shipping?.country || "India"}
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-[#7c7c7c] uppercase tracking-wider">
                    Purchased Items ({selectedOrder.items?.length || 0})
                  </div>
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {selectedOrder.items?.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-lg bg-white border border-[#181818]/8 text-xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-10 h-10 rounded bg-[#f0ebe6] shrink-0 overflow-hidden">
                            <img
                              src={item.image || "/thumbnail-placeholder.png"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-[#181818] truncate max-w-[200px]">
                              {item.name}
                            </div>
                            <div className="text-[#7c7c7c] text-[11px]">
                              Qty: {item.quantity} {item.size ? `· Size: ${item.size}` : ""} {item.color ? `· Color: ${item.color}` : ""}
                            </div>
                          </div>
                        </div>
                        <div className="font-bold text-[#181818] whitespace-nowrap">
                          {formatRupees(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Breakdown */}
                <div className="p-3.5 rounded-xl bg-white border border-[#181818]/8 space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#7c7c7c]">
                    <span>Payment Method:</span>
                    <span className="font-bold text-[#181818] uppercase">{selectedOrder.payment?.method || "COD"}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm font-bold text-[#181818] pt-2 border-t border-[#181818]/8">
                    <span>Total Paid:</span>
                    <span>{formatRupees(selectedOrder.payment?.total || 0)}</span>
                  </div>
                </div>

                {/* Status Switcher in Modal */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-[#181818] font-medium">Update Status:</span>
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as Order["status"])}
                    className="px-3 py-1.5 rounded-lg bg-white border border-[#181818]/15 text-xs font-semibold text-[#181818] focus:outline-none focus:ring-1 focus:ring-[#181818]"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <DialogFooter className="pt-4 border-t border-[#181818]/10">
                <Button
                  onClick={() => setSelectedOrder(null)}
                  className="w-full bg-[#181818] hover:bg-[#2c2c2c] text-[#f0ebe6] font-semibold text-xs rounded-xl"
                >
                  Done
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
