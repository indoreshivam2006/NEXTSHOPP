"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  ShoppingBag, 
  Percent, 
  Award, 
  ArrowUpRight,
  Package,
  Layers,
  Sparkles
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatRupees } from "@/lib/utils"
import { getAllProductsAdmin, Product } from "@/lib/firebase/products"
import { getAllOrdersAdmin, Order } from "@/lib/firebase/orders"

export default function AdminAnalyticsPage() {
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
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.payment?.total || 0), 0)
  const averageOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0
  const deliveredCount = orders.filter((o) => o.status === "delivered").length
  const fulfillmentRate = orders.length > 0 ? Math.round((deliveredCount / orders.length) * 100) : 100

  // Category counts
  const categoryMap = new Map<string, number>()
  products.forEach((p) => {
    categoryMap.set(p.category, (categoryMap.get(p.category) || 0) + 1)
  })
  const categoryStats = Array.from(categoryMap.entries()).map(([category, count]) => ({
    category,
    count,
    percentage: Math.round((count / (products.length || 1)) * 100),
  }))

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#181818] tracking-tight">
            Sales & Platform Analytics
          </h1>
          <p className="text-sm text-[#7c7c7c] mt-1">
            Performance indicators, fulfillment velocity, and catalog distribution.
          </p>
        </div>
        <Link href="/admin/orders">
          <Button className="bg-[#181818] hover:bg-[#2c2c2c] text-[#f0ebe6] font-semibold text-xs rounded-full px-5 h-9 shadow-sm transition-all">
            Review Orders Feed
          </Button>
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/80 backdrop-blur-md border border-[#181818]/10 p-5 rounded-2xl space-y-2 shadow-sm hover:border-[#181818]/20 transition-all">
          <span className="text-xs font-semibold text-[#7c7c7c] uppercase tracking-wider">Gross Sales</span>
          <div className="text-2xl font-black text-[#181818]">{formatRupees(totalRevenue)}</div>
          <p className="text-[11px] text-emerald-700 font-medium">Verified completed transactions</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-[#181818]/10 p-5 rounded-2xl space-y-2 shadow-sm hover:border-[#181818]/20 transition-all">
          <span className="text-xs font-semibold text-[#7c7c7c] uppercase tracking-wider">Average Order Value</span>
          <div className="text-2xl font-black text-[#181818]">{formatRupees(averageOrderValue)}</div>
          <p className="text-[11px] text-[#7c7c7c] font-medium">Per checkout conversion</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-[#181818]/10 p-5 rounded-2xl space-y-2 shadow-sm hover:border-[#181818]/20 transition-all">
          <span className="text-xs font-semibold text-[#7c7c7c] uppercase tracking-wider">Fulfillment Rate</span>
          <div className="text-2xl font-black text-[#181818]">{fulfillmentRate}%</div>
          <p className="text-[11px] text-sky-700 font-medium">{deliveredCount} delivered successfully</p>
        </div>

        <div className="bg-white/80 backdrop-blur-md border border-[#181818]/10 p-5 rounded-2xl space-y-2 shadow-sm hover:border-[#181818]/20 transition-all">
          <span className="text-xs font-semibold text-[#7c7c7c] uppercase tracking-wider">Catalog Depth</span>
          <div className="text-2xl font-black text-[#181818]">{products.length} Items</div>
          <p className="text-[11px] text-[#7c7c7c] font-medium">{categoryStats.length} diverse categories</p>
        </div>
      </div>

      {/* Category Breakdown & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/80 backdrop-blur-md border border-[#181818]/10 rounded-2xl p-6 space-y-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#181818] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#181818]" />
              Catalog Category Distribution
            </h2>
          </div>

          <div className="space-y-4">
            {categoryStats.length === 0 ? (
              <p className="text-sm text-[#7c7c7c] italic">No categories loaded yet.</p>
            ) : (
              categoryStats.map((item) => (
                <div key={item.category} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-[#181818] font-semibold">{item.category}</span>
                    <span className="text-[#7c7c7c]">{item.count} items ({item.percentage}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-[#181818]/8 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#181818] to-[#4c4c4c] rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(item.percentage, 5)}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Featured Top Products */}
        <div className="bg-white/80 backdrop-blur-md border border-[#181818]/10 rounded-2xl p-6 space-y-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#181818] flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-500" />
              Top Rated Products
            </h2>
            <Link href="/admin/products" className="text-xs font-semibold text-[#181818] hover:underline">
              Manage Catalog →
            </Link>
          </div>

          <div className="space-y-3">
            {products.length === 0 ? (
              <p className="text-sm text-[#7c7c7c] italic">No products available.</p>
            ) : (
              products
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 5)
                .map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#181818]/8 text-xs hover:border-[#181818]/20 transition-all shadow-sm"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-lg bg-[#f0ebe6] shrink-0 overflow-hidden border border-[#181818]/5">
                        <img
                          src={product.images?.[0] || "/thumbnail-placeholder.png"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-[#181818] truncate max-w-[180px] sm:max-w-xs">
                          {product.name}
                        </div>
                        <div className="text-[#7c7c7c] text-[11px]">{product.category}</div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="font-bold text-[#181818]">{formatRupees(product.price)}</div>
                      <div className="text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md font-semibold text-[11px] inline-flex items-center gap-0.5 mt-0.5">
                        ★ {product.rating}
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
