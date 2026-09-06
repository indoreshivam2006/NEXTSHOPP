"use client"

import { ReactNode, useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Store, 
  ShieldCheck, 
  LogOut, 
  Menu, 
  X, 
  User, 
  Sparkles, 
  CheckCircle2,
  Lock
} from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading, isAdmin, toggleAdminMode, signOut } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  ]

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-[#f0ebe6] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#181818] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-[#7c7c7c]">Loading NextShop Admin...</p>
        </div>
      </div>
    )
  }

  // Not logged in: Show access gate
  if (!user) {
    return (
      <div className="min-h-screen bg-[#f0ebe6] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/80 border border-[#181818]/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 bg-rose-50 border border-rose-200 text-rose-500 rounded-2xl flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#181818] tracking-tight">Admin Portal Restricted</h1>
            <p className="text-[#7c7c7c] text-sm mt-2">
              You must be logged in with administrative privileges to access the NextShop Admin Console.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              className="w-full bg-[#181818] hover:bg-[#2c2c2c] text-[#f0ebe6] font-semibold rounded-xl"
              onClick={() => router.push("/auth/login?redirect=/admin")}
            >
              Log in to Continue
            </Button>
            <Button
              variant="outline"
              className="w-full border-[#181818]/15 text-[#181818] hover:bg-[#181818]/5 rounded-xl"
              onClick={() => router.push("/")}
            >
              Return to Storefront
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Logged in but not admin: Allow fast admin toggle for review
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#f0ebe6] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/80 border border-[#181818]/10 backdrop-blur-xl p-8 rounded-2xl shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 bg-amber-50 border border-amber-200 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#181818] tracking-tight">Admin Authorization</h1>
            <p className="text-[#7c7c7c] text-sm mt-2">
              Signed in as <span className="text-[#181818] font-medium">{user.email}</span>. Click below to activate Admin Portal privileges.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              className="w-full bg-[#181818] hover:bg-[#2c2c2c] text-[#f0ebe6] font-semibold flex items-center justify-center gap-2 rounded-xl"
              onClick={toggleAdminMode}
            >
              <Sparkles className="w-4 h-4" />
              Enable Admin Mode & Enter
            </Button>
            <Button
              variant="outline"
              className="w-full border-[#181818]/15 text-[#181818] hover:bg-[#181818]/5 rounded-xl"
              onClick={() => router.push("/")}
            >
              Return to Customer Store
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f0ebe6] text-[#181818] flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-[#181818]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#f0ebe6] flex items-center justify-center font-bold text-[#181818] shadow-md">
            N
          </div>
          <div>
            <span className="font-bold text-[#f0ebe6] text-base leading-none">NextShop</span>
            <span className="text-[10px] font-semibold tracking-wider text-[#f0ebe6]/60 ml-1.5 uppercase bg-[#f0ebe6]/10 px-1.5 py-0.5 rounded border border-[#f0ebe6]/20">
              Admin
            </span>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-[#f0ebe6]/70 hover:text-[#f0ebe6]"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Sidebar — Obsidian Charcoal */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-64 bg-[#181818] flex flex-col justify-between transition-transform duration-200 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Logo & Portal Header */}
          <div className="p-6 border-b border-[#f0ebe6]/10">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#f0ebe6] flex items-center justify-center font-black text-[#181818] text-xl shadow-lg">
                N
              </div>
              <div>
                <div className="font-black text-lg tracking-tight text-[#f0ebe6] flex items-center gap-1.5">
                  NextShop
                  <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#f0ebe6]/10 text-[#f0ebe6]/70 border border-[#f0ebe6]/15">
                    Admin
                  </span>
                </div>
                <div className="text-xs text-[#f0ebe6]/40 font-medium">Store Management</div>
              </div>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="p-4 space-y-1.5">
            <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-[#f0ebe6]/30">
              Navigation
            </div>
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                    isActive
                      ? "bg-[#f0ebe6] text-[#181818] shadow-md"
                      : "text-[#f0ebe6]/50 hover:text-[#f0ebe6] hover:bg-[#f0ebe6]/8"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-[#181818]" : "text-[#f0ebe6]/40"}`} />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-[#f0ebe6]/10 space-y-3">
          <Link
            href="/"
            className="flex items-center justify-between px-3.5 py-2 rounded-xl text-xs font-semibold text-[#f0ebe6]/70 bg-[#f0ebe6]/5 hover:bg-[#f0ebe6]/10 border border-[#f0ebe6]/10 transition-colors"
          >
            <span className="flex items-center gap-2">
              <Store className="w-3.5 h-3.5" />
              Customer Store
            </span>
            <span>→</span>
          </Link>

          <div className="flex items-center justify-between p-2.5 bg-[#f0ebe6]/5 rounded-xl border border-[#f0ebe6]/10">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#f0ebe6]/15 flex items-center justify-center text-[#f0ebe6] text-xs font-bold shrink-0">
                {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "A"}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-[#f0ebe6] truncate">
                  {user.displayName || user.email?.split("@")[0] || "Admin"}
                </div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3 h-3" />
                  Superuser
                </div>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="p-1.5 text-[#f0ebe6]/40 hover:text-rose-400 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col min-h-screen bg-[#f0ebe6]">
        {/* Top bar — breadcrumb */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white/50 border-b border-[#181818]/8 backdrop-blur-md">
          <div className="flex items-center gap-2 text-sm text-[#7c7c7c]">
            <Link href="/admin" className="hover:text-[#181818] transition-colors">Admin</Link>
            <span>/</span>
            <span className="text-[#181818] capitalize font-medium">
              {pathname === "/admin" ? "Overview" : pathname.replace("/admin/", "")}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="border-[#181818]/15 text-[#181818] hover:bg-[#181818]/5 text-xs h-8 rounded-full"
              >
                <Store className="w-3.5 h-3.5 mr-1.5" />
                View Customer Store
              </Button>
            </Link>
          </div>
        </header>

        {/* Page Children */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
