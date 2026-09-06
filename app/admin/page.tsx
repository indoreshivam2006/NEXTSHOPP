"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  TrendingUp, 
  Package, 
  ShoppingCart, 
  Users, 
  ArrowUpRight, 
  Plus, 
  CheckCircle2, 
  Clock, 
  Truck, 
  XCircle,
  AlertCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatRupees } from "@/lib/utils"
import { getAllProductsAdmin, Product } from "@/lib/firebase/products"
import { getAllOrdersAdmin, Order } from "@/lib/firebase/orders"

export default function AdminDashboardPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      try {
        const [loadedProducts, loadedOrders] = await Promise.all([
          getAllProductsAdmin(),
          getAllOrdersAdmin(),
        ])
        setProducts(loadedProducts)
        setOrders(loadedOrders)
      } catch (err) {
        console.error("Failed to load admin dashboard data:", err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.payment?.total || 0), 0)
  const pendingOrders = orders.filter((o) => o.status === "pending" || o.status === "processing").length
  const uniqueCustomers = new Set(orders.map((o) => o.userId)).size || 1

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Delivered
          </span>
        )
      case "shipped":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Truck className="w-3 h-3" /> Shipped
          </span>
        )
      case "processing":
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3" /> Processing
          </span>
        )
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3 h-3" /> Cancelled
          </span>
        )
      default:
        return <span className="text-xs text-[#7c7c7c] capitalize">{status}</span>
    }
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#181818] border border-[#181818]/10 p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#f0ebe6] tracking-tight">
            Store Overview & Operations
          </h1>
          <p className="text-sm text-[#f0ebe6]/50 mt-1">
            Real-time catalog metrics, inventory status, and order processing console.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/products">
            <Button className="bg-[#f0ebe6] hover:bg-white text-[#181818] text-sm font-semibold shadow-md rounded-xl">
              <Plus className="w-4 h-4 mr-1.5" />
              Manage Products
            </Button>
          </Link>
          <Link href="/admin/orders">
            <Button variant="outline" className="border-[#f0ebe6]/20 text-[#f0ebe6] hover:bg-[#f0ebe6]/10 text-sm rounded-xl">
              <ShoppingCart className="w-4 h-4 mr-1.5" />
              Manage Orders
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-white/70 backdrop-blur-sm border border-[#181818]/8 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7c7c7c]">Total Revenue</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#181818]">
            {loading ? "..." : formatRupees(totalRevenue)}
          </div>
          <div className="text-xs text-emerald-600 font-medium flex items-center gap-1">
            <span>Server Verified</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white/70 backdrop-blur-sm border border-[#181818]/8 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7c7c7c]">Total Orders</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#181818]">
            {loading ? "..." : orders.length}
          </div>
          <div className="text-xs text-[#7c7c7c] font-medium">
            <span className="text-amber-600 font-semibold">{pendingOrders}</span> pending fulfillment
          </div>
        </div>

        {/* Catalog Items */}
        <div className="bg-white/70 backdrop-blur-sm border border-[#181818]/8 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7c7c7c]">Active Products</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#181818]">
            {loading ? "..." : products.length}
          </div>
          <div className="text-xs text-[#7c7c7c] font-medium">
            Across 5 categories
          </div>
        </div>

        {/* Total Customers */}
        <div className="bg-white/70 backdrop-blur-sm border border-[#181818]/8 p-5 rounded-2xl space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#7c7c7c]">Customers</span>
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-600 border border-sky-200 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#181818]">
            {loading ? "..." : uniqueCustomers}
          </div>
          <div className="text-xs text-[#7c7c7c] font-medium">
            Registered accounts
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Orders & Catalog Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders List */}
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-sm border border-[#181818]/8 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#181818]">Recent Customer Orders</h2>
              <p className="text-xs text-[#7c7c7c]">Live incoming purchases from the customer portal</p>
            </div>
            <Link href="/admin/orders">
              <Button variant="ghost" size="sm" className="text-xs text-[#181818] hover:bg-[#181818]/5">
                View All Orders <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="py-12 text-center text-[#7c7c7c] text-sm">
              No orders placed yet. Place an order in the Storefront to see it here!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#181818]/10 text-[#7c7c7c] text-xs uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Order ID</th>
                    <th className="pb-3 font-semibold">Customer</th>
                    <th className="pb-3 font-semibold">Items</th>
                    <th className="pb-3 font-semibold">Amount</th>
                    <th className="pb-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#181818]/5">
                  {orders.slice(0, 5).map((order) => (
                    <tr key={order.id} className="hover:bg-[#181818]/[0.02] transition-colors">
                      <td className="py-3.5 font-mono text-xs text-[#181818]">
                        #{order.id.substring(0, 8)}
                      </td>
                      <td className="py-3.5 text-[#181818] font-medium">
                        {order.shipping?.firstName ? `${order.shipping.firstName} ${order.shipping.lastName}` : "Customer"}
                      </td>
                      <td className="py-3.5 text-[#7c7c7c] text-xs">
                        {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? "s" : ""}
                      </td>
                      <td className="py-3.5 font-bold text-[#181818]">
                        {formatRupees(order.payment?.total || 0)}
                      </td>
                      <td className="py-3.5">
                        {getStatusBadge(order.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Quick Inventory / Product Highlights */}
        <div className="bg-white/70 backdrop-blur-sm border border-[#181818]/8 rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#181818]">Quick Actions</h2>
          </div>

          <div className="space-y-3">
            <Link
              href="/admin/products"
              className="flex items-center justify-between p-3.5 rounded-xl bg-[#f0ebe6] hover:bg-[#e8e2db] border border-[#181818]/8 transition-all text-sm font-medium text-[#181818] group"
            >
              <span className="flex items-center gap-3">
                <Package className="w-4 h-4 text-[#181818]/60 group-hover:scale-110 transition-transform" />
                Add & Edit Products
              </span>
              <span className="text-[#7c7c7c] group-hover:text-[#181818]">→</span>
            </Link>

            <Link
              href="/admin/orders"
              className="flex items-center justify-between p-3.5 rounded-xl bg-[#f0ebe6] hover:bg-[#e8e2db] border border-[#181818]/8 transition-all text-sm font-medium text-[#181818] group"
            >
              <span className="flex items-center gap-3">
                <Truck className="w-4 h-4 text-[#181818]/60 group-hover:scale-110 transition-transform" />
                Update Order Statuses
              </span>
              <span className="text-[#7c7c7c] group-hover:text-[#181818]">→</span>
            </Link>

            <Link
              href="/admin/analytics"
              className="flex items-center justify-between p-3.5 rounded-xl bg-[#f0ebe6] hover:bg-[#e8e2db] border border-[#181818]/8 transition-all text-sm font-medium text-[#181818] group"
            >
              <span className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-[#181818]/60 group-hover:scale-110 transition-transform" />
                View Sales Analytics
              </span>
              <span className="text-[#7c7c7c] group-hover:text-[#181818]">→</span>
            </Link>

            <Link
              href="/"
              className="flex items-center justify-between p-3.5 rounded-xl bg-[#181818] hover:bg-[#2c2c2c] border border-[#181818] transition-all text-sm font-medium text-[#f0ebe6] group"
            >
              <span className="flex items-center gap-3">
                <ArrowUpRight className="w-4 h-4 text-[#f0ebe6]/70 group-hover:scale-110 transition-transform" />
                Open Customer Storefront
              </span>
              <span className="text-[#f0ebe6]/50">→</span>
            </Link>
          </div>

          <div className="pt-4 border-t border-[#181818]/8">
            <div className="flex items-center gap-2 text-xs text-[#7c7c7c] font-medium">
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Catalog changes in Admin automatically reflect in the Storefront.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
