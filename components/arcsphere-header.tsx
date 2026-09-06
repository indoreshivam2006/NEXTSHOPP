"use client"

import Link from "next/link"
import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  ShoppingCart,
  User,
  Search,
  X,
  Heart,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react"
import { motion } from "motion/react"
import NextShoppLogo from "./nextshopp-logo"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { useWishlist } from "@/context/wishlist-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { searchProducts } from "@/lib/firebase/products"
import React from "react"

interface CartItem {
  quantity: number
  [key: string]: any
}

const NAV_ITEMS = [
  { name: "Home", href: "/" },
  { name: "Catalog", href: "/products" },
  { name: "Departments", href: "/categories" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export default function ArcSphereHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const [hoveredNav, setHoveredNav] = useState<string | null>(null)

  const pathname = usePathname()
  const router = useRouter()
  const { cart } = useCart()
  const { user, signOut, isAdmin, toggleAdminMode } = useAuth()
  const { wishlist } = useWishlist()
  const searchInputRef = useRef<HTMLInputElement>(null)

  // Scroll detection for floating pill compression and blur elevation
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 24)
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  // Close drawer and search on pathname change
  useEffect(() => {
    setIsDrawerOpen(false)
    setIsSearchActive(false)
  }, [pathname])

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
      if (searchQuery.trim().length >= 2) {
        handleSearch(searchQuery.trim())
      } else {
        setSearchResults([])
      }
    }, 280)
    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleSearch = async (query: string) => {
    setSearchLoading(true)
    try {
      const results = await searchProducts(query)
      setSearchResults(results)
    } catch {
      setSearchResults([])
    } finally {
      setSearchLoading(false)
    }
  }

  const cartCount = useMemo(() => {
    return Array.isArray(cart)
      ? (cart as CartItem[]).reduce((sum, i) => sum + (i.quantity || 1), 0)
      : 0
  }, [cart])

  const wishlistCount = useMemo(() => {
    return Array.isArray(wishlist) ? wishlist.length : 0
  }, [wishlist])

  return (
    <>
      {/* ========================================================================= */}
      {/* FLOATING PILL NAVIGATION BAR                                              */}
      {/* Inspired by https://floating-pill-nav.framer.website/                    */}
      {/* Adapted to NEXTSHOPP Architectural Greige & Obsidian Charcoal             */}
      {/* ========================================================================= */}
      <div className="fixed top-3 sm:top-5 inset-x-0 z-40 flex flex-col items-center pointer-events-none px-3 sm:px-6">
        <header
          className={`pointer-events-auto w-full transition-all duration-500 ease-out rounded-full border ${
            isScrolled
              ? "max-w-[1200px] py-2 px-5 sm:px-7 bg-[#f0ebe6]/90 backdrop-blur-2xl shadow-[0_16px_36px_-10px_rgba(0,0,0,0.18)] border-[#181818]/15"
              : "max-w-6xl py-2.5 px-5 sm:px-8 bg-[#f0ebe6]/80 backdrop-blur-xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.10)] border-[#181818]/10"
          }`}
        >
          <div className="flex items-center justify-between h-10">
            {/* Left: Brand Insignia */}
            <div className="flex items-center shrink-0">
              <Link
                href="/"
                className="group flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#181818] rounded-full px-1 transition-opacity hover:opacity-85"
                aria-label="NEXTSHOPP Homepage"
              >
                <NextShoppLogo className="h-4 sm:h-5 w-auto" />
              </Link>
            </div>

            {/* Center: Floating Pill Navigation Tabs with Sliding Active Indicator */}
            <nav
              role="navigation"
              aria-label="Main Navigation"
              className="hidden lg:flex items-center gap-0.5 p-1 rounded-full bg-[#181818]/[0.04] border border-[#181818]/[0.06] relative mx-auto"
              onMouseLeave={() => setHoveredNav(null)}
            >
              {NAV_ITEMS.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href)
                const isHovered = hoveredNav === item.href

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onMouseEnter={() => setHoveredNav(item.href)}
                    className={`relative px-3.5 py-1.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors duration-200 z-10 select-none whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#181818] ${
                      isActive
                        ? "text-[#f0ebe6]"
                        : "text-[#4f4742] hover:text-[#181818]"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {/* Hover Pill Background Indicator */}
                    {isHovered && !isActive && (
                      <motion.span
                        layoutId="floating-nav-hover-indicator"
                        className="absolute inset-0 rounded-full bg-[#181818]/8 -z-10"
                        transition={{
                          type: "spring",
                          stiffness: 450,
                          damping: 35,
                        }}
                      />
                    )}

                    {/* Active Sliding Pill Indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="floating-nav-active-indicator"
                        className="absolute inset-0 rounded-full bg-[#181818] shadow-sm -z-10"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 32,
                        }}
                      />
                    )}

                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Right: Controls, Actions, Badges & Drawer Trigger */}
            <div className="flex items-center shrink-0">
              {/* Icon button cluster — uniform 36×36 circles with consistent gap */}
              <div className="flex items-center gap-1.5">
                {/* Search Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchActive((prev) => !prev)
                    setTimeout(() => searchInputRef.current?.focus(), 150)
                  }}
                  className={`w-9 h-9 rounded-full flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#181818] ${
                    isSearchActive
                      ? "bg-[#181818] text-[#f0ebe6]"
                      : "hover:bg-[#181818]/8 text-[#181818]"
                  }`}
                  aria-label="Toggle search"
                  title="Search Catalog"
                >
                  <Search className="h-[18px] w-[18px]" />
                </button>

                {/* Wishlist */}
                <Link
                  href="/wishlist"
                  className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#181818]/8 text-[#181818] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#181818]"
                  aria-label="Wishlist"
                  title="Saved Items"
                >
                  <Heart className="h-[18px] w-[18px]" />
                  {wishlistCount > 0 && (
                    <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#181818] text-[8px] font-bold text-[#f0ebe6] ring-2 ring-[#f0ebe6]">
                      {wishlistCount}
                    </span>
                  )}
                </Link>

                {/* Cart Pill */}
                <Link
                  href="/cart"
                  className="relative inline-flex items-center gap-1.5 h-9 px-3 rounded-full bg-[#181818]/[0.06] hover:bg-[#181818]/[0.12] text-[#181818] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#181818]"
                  aria-label="Shopping Cart"
                  title="Shopping Bag"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span className="text-xs font-bold font-mono leading-none">{cartCount}</span>
                </Link>
              </div>

              {/* Thin visual divider before auth/menu section */}
              <div className="w-px h-5 bg-[#181818]/10 mx-2" />

              {/* Auth + Menu — tightly grouped as the rightmost section */}
              <div className="flex items-center gap-1.5">
                {/* User Account / Auth Dropdown */}
                {user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#181818]/8 text-[#181818] transition-all border border-[#181818]/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#181818]"
                        aria-label="User profile menu"
                      >
                        {user.photoURL ? (
                          <img
                            src={user.photoURL}
                            alt={user.displayName || "User"}
                            className="h-6 w-6 rounded-full object-cover"
                          />
                        ) : (
                          <User className="h-[18px] w-[18px]" />
                        )}
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-56 mt-3 p-1.5 bg-[#f0ebe6] border border-[#181818]/15 rounded-2xl shadow-xl text-[#181818]"
                    >
                      <DropdownMenuLabel className="text-xs uppercase tracking-wider text-[#7c7c7c]">
                        {user.displayName || "Patron Account"}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-[#181818]/10" />
                      <DropdownMenuItem
                        asChild
                        className="cursor-pointer text-xs font-semibold py-2"
                      >
                        <Link href="/profile">Profile & Settings</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        asChild
                        className="cursor-pointer text-xs font-semibold py-2"
                      >
                        <Link href="/orders">Order History</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        asChild
                        className="cursor-pointer text-xs font-semibold py-2"
                      >
                        <Link href="/wishlist">Saved Items</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-[#181818]/10" />
                      <DropdownMenuItem
                        asChild
                        className="cursor-pointer text-xs font-bold py-2 text-[#181818]"
                      >
                        <Link
                          href="/admin"
                          className="flex items-center justify-between w-full"
                        >
                          <span className="flex items-center gap-1.5">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            Admin Console
                          </span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#181818] text-[#f0ebe6]">
                            {isAdmin ? "ACTIVE" : "STAFF"}
                          </span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer text-[11px] text-[#7c7c7c] hover:text-[#181818]"
                        onClick={toggleAdminMode}
                      >
                        Role Switch: {isAdmin ? "Admin (revert)" : "User (activate admin)"}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-[#181818]/10" />
                      <DropdownMenuItem
                        className="cursor-pointer text-xs text-red-600 font-semibold py-2"
                        onClick={() => signOut()}
                      >
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href="/auth/login"
                    className="inline-flex items-center justify-center h-9 px-4 rounded-full bg-[#181818] hover:bg-[#2c2c2c] text-[#f0ebe6] text-[11px] font-semibold uppercase tracking-wider transition-all shadow-sm shrink-0 active:scale-[0.97]"
                  >
                    Sign In
                  </Link>
                )}

                {/* Hamburger Menu Toggle */}
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(true)}
                  className="flex flex-col justify-center items-center gap-[5px] w-9 h-9 rounded-full bg-[#181818]/[0.06] hover:bg-[#181818]/[0.12] text-[#181818] transition-all active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#181818] shrink-0"
                  aria-label="Open directory menu"
                  title="Directory Menu"
                >
                  <span className="w-3.5 h-[1.5px] bg-[#181818] rounded-full transition-transform"></span>
                  <span className="w-3.5 h-[1.5px] bg-[#181818] rounded-full transition-transform"></span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Dropdown Live Search Bar: Suspended below the Floating Pill */}
        {isSearchActive && (
          <div className="pointer-events-auto w-full max-w-3xl mt-2.5 animate-in slide-in-from-top-2 duration-300">
            <div className="bg-[#f0ebe6]/95 backdrop-blur-2xl border border-[#181818]/15 rounded-[24px] p-3 shadow-2xl">
              <div className="relative flex items-center">
                <Search className="absolute left-4 h-4 w-4 text-[#7c7c7c]" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search catalog by name, material, or department..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-2.5 rounded-full bg-white/80 border border-[#181818]/15 text-sm text-[#181818] placeholder:text-[#7c7c7c] focus:outline-none focus:ring-1 focus:ring-[#181818]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 text-[#7c7c7c] hover:text-[#181818]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Search results list */}
              {searchResults.length > 0 && (
                <div className="mt-2 bg-white/70 border border-[#181818]/10 rounded-2xl p-2 max-h-72 overflow-y-auto">
                  {searchResults.map((item) => (
                    <Link
                      key={item.id}
                      href={`/products/${item.id}`}
                      onClick={() => setIsSearchActive(false)}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#e2dacf]/50 transition-colors"
                    >
                      {item.images && item.images[0] && (
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-10 h-10 object-cover rounded-lg bg-white border border-[#181818]/10"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#181818] truncate">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-[#7c7c7c]">
                          {item.category}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-[#181818] font-mono">
                        ₹{Number(item.price).toLocaleString()}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ArcSphere Fullscreen Architectural Menu Drawer */}
      <div
        className={`fixed inset-0 z-[100] bg-[#f0ebe6] transition-all duration-500 flex flex-col justify-between p-6 sm:p-10 lg:p-16 overflow-y-auto ${
          isDrawerOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        {/* Drawer Top Bar */}
        <div className="flex items-center justify-between border-b border-[#181818]/10 pb-6">
          <div className="flex items-center gap-3">
            <NextShoppLogo className="h-5 sm:h-6 w-auto" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#7c7c7c]">
              Menu & Directory
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsDrawerOpen(false)}
            className="flex items-center justify-center w-11 h-11 rounded-full border border-[#181818]/20 hover:bg-[#181818] hover:text-[#f0ebe6] transition-all duration-300"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer Central Architectural Navigation */}
        <div className="my-auto py-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 flex flex-col space-y-3">
            {[
              { num: "01", name: "Home", href: "/" },
              { num: "02", name: "Full Catalog", href: "/products" },
              { num: "03", name: "Departments", href: "/categories" },
              { num: "04", name: "Trending 2026", href: "/products?sort=newest" },
              { num: "05", name: "Saved Wishlist", href: "/wishlist" },
              { num: "06", name: "Shopping Bag", href: "/cart" },
              {
                num: "07",
                name: "Patron Account",
                href: user ? "/profile" : "/auth/login",
              },
              { num: "08", name: "Order Tracking", href: "/orders" },
              { num: "09", name: "Admin Portal", href: "/admin" },
            ].map((link) => (
              <Link
                key={link.num}
                href={link.href}
                onClick={() => setIsDrawerOpen(false)}
                className="group flex items-baseline gap-4 text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight uppercase transition-all duration-300 hover:translate-x-3 text-[#181818]"
              >
                <span className="text-xs font-mono tracking-widest text-[#7c7c7c] group-hover:text-[#181818]">
                  {link.num}
                </span>
                <span className="group-hover:opacity-75 transition-opacity">
                  {link.name}
                </span>
                <ArrowUpRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>

          {/* Drawer Right Context & Contact */}
          <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#181818]/10 pt-8 lg:pt-0 lg:pl-10 flex flex-col justify-between space-y-8">
            <div>
              <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-[#7c7c7c] mb-3">
                Studio Credentials
              </h4>
              <p className="text-sm text-[#4f4742] leading-relaxed">
                NEXTSHOPP is an architectural luxury e-commerce platform curating high-grade electronics, precision apparel, footwear, and interior living goods.
              </p>
            </div>

            <div>
              <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-[#7c7c7c] mb-3">
                Patron Concierge
              </h4>
              <a
                href="mailto:nextshopp0904@gmail.com"
                className="text-sm text-[#181818] font-medium hover:underline"
              >
                nextshopp0904@gmail.com
              </a>
              <p className="text-xs text-[#7c7c7c] mt-1">
                Bhopal & Worldwide Support
              </p>
            </div>

            <div className="pt-4 border-t border-[#181818]/10 flex items-center justify-between">
              <span className="text-xs text-[#7c7c7c]">
                © {new Date().getFullYear()} NEXTSHOPP
              </span>
              <div className="flex gap-4 text-xs font-semibold text-[#181818]">
                <Link href="/about" onClick={() => setIsDrawerOpen(false)}>
                  About
                </Link>
                <Link href="/contact" onClick={() => setIsDrawerOpen(false)}>
                  Contact
                </Link>
                <Link href="/admin" onClick={() => setIsDrawerOpen(false)}>
                  Staff
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Drawer Bottom Bar */}
        <div className="border-t border-[#181818]/10 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-[#7c7c7c] gap-4">
          <p>
            Handcrafted architectural design inspired by ArcSphere Studio aesthetic.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="font-medium text-[#181818]">
              All E-Commerce Systems Active
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
