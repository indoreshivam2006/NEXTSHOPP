"use client"

import Link from "next/link"
import { useState, useEffect, useCallback, useMemo, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"
import { ShoppingCart, User, Search, Menu, X, ChevronDown, Heart, ListPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { searchProducts } from "@/lib/firebase/products"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import React from "react"
import CategoryNavbar from "./category-navbar"
import MobileCategoryNav from "./mobile-category-nav"

// Define the CartItem type
interface CartItem {
  quantity: number;
  [key: string]: any;
}

// Improved search result list with better styling and more details
interface SearchResultListProps {
  results: any[];
  selectedIndex: number;
  onSelect: (item: any) => void;
  onHover: (idx: number) => void;
}
const SearchResultList = React.memo(function SearchResultList({ results, selectedIndex, onSelect, onHover }: SearchResultListProps) {
  return (
    <>
      <div className="py-2 px-4 bg-gray-50 border-b">
        <h3 className="text-xs font-semibold text-gray-700 uppercase">SEARCH RESULTS</h3>
      </div>
      <ul className="divide-y divide-gray-100 py-1" role="listbox">
        {results.map((item, idx) => (
          <li
            key={item.id}
            className={`flex items-center gap-3 py-3 px-4 hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${selectedIndex === idx ? 'bg-gray-100' : ''}`}
            onClick={() => onSelect(item)}
            onMouseEnter={() => onHover(idx)}
            role="option"
            {...(selectedIndex === idx ? {'aria-selected': 'true'} : {'aria-selected': 'false'})}
          >
            {/* Product image */}
            {item.images && item.images[0] ? (
              <div className="w-14 h-14 rounded-md overflow-hidden flex-shrink-0 border border-gray-200 bg-white">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain" />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-md bg-gray-100 flex items-center justify-center flex-shrink-0 border border-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            
            {/* Product details */}
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-medium text-gray-900 truncate">{item.name}</span>
              {item.price && (
                <span className="text-sm font-medium text-gray-700">
                  ₹{item.price.toLocaleString()}
                </span>
              )}
              {item.category && (
                <span className="text-xs text-gray-500">{item.category}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div className="p-2 border-t border-gray-100 bg-gray-50">
        <button 
          onClick={() => onSelect({ slug: '/products' })}
          className="text-sm text-primary hover:text-primary/80 font-medium w-full text-center py-2 hover:bg-primary/5 rounded transition-colors"
        >
          View all results
        </button>
      </div>
    </>
  );
});

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [isSearchActive, setIsSearchActive] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("")
  const pathname = usePathname()
  const { cart } = useCart()
  const { user, signOut } = useAuth()
  const searchRef = useRef<HTMLFormElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false)
  const [searchLoading, setSearchLoading] = useState(false)
  const [searchError, setSearchError] = useState("")
  const router = useRouter()
  const [selectedIndex, setSelectedIndex] = useState(-1)

  // Debounce search query for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      
      // Auto-search when query is at least 2 characters
      if (searchQuery.trim().length >= 2) {
        handleAutoSearch();
      } else {
        setIsSearchDialogOpen(false);
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Auto search function that runs on query change
  const handleAutoSearch = useCallback(async () => {
    if (searchQuery.trim().length >= 2) {
      setSearchLoading(true);
      setSearchError("");
      setIsSearchDialogOpen(true);
      try {
        const results = await searchProducts(searchQuery.trim());
        setSearchResults(results);
      } catch (err) {
        setSearchError("Something went wrong. Please try again.");
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }
  }, [searchQuery]);

  // Form submission still works for explicit searches
  const handleSearch = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (debouncedSearchQuery.trim()) {
      setSearchLoading(true);
      setSearchError("");
      setIsSearchDialogOpen(true);
      try {
        const results = await searchProducts(debouncedSearchQuery.trim());
        setSearchResults(results);
      } catch (err) {
        setSearchError("Something went wrong. Please try again.");
        setSearchResults([]);
      } finally {
        setSearchLoading(false);
      }
    }
  }, [debouncedSearchQuery]);

  // Listen for clicks outside the search form to close it on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Memoize the cart items count calculation for performance
  const cartItemsCount = useMemo(() => {
    return Array.isArray(cart) 
      ? (cart as CartItem[]).reduce((count: number, item: CartItem) => count + item.quantity, 0)
      : 0
  }, [cart]);

  // Memoize scroll handler to prevent recreation on each render
  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 20)
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll]);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false)
    setIsSearchActive(false)
  }, [pathname]);

  // Memoize the nav items array to prevent unnecessary re-renders
  const navItems = useMemo(() => [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ], []);

  // Optimize handler functions with useCallback
  const handleSearchClear = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSearchQuery("");
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleMobileMenuToggle = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const toggleMobileSearch = useCallback(() => {
    setIsSearchActive(prev => !prev);
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);
  }, []);

  // Close dialog when clearing search
  useEffect(() => {
    if (!searchQuery) {
      setIsSearchDialogOpen(false);
      setSearchResults([]);
      setSearchError("");
    }
  }, [searchQuery]);

  // Keyboard navigation for search results
  useEffect(() => {
    if (!isSearchDialogOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (searchResults.length === 0) return;
      if (e.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev + 1) % searchResults.length);
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
        e.preventDefault();
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        const selected = searchResults[selectedIndex];
        if (selected && selected.slug) {
          router.push(`/products/${selected.slug}`);
          setIsSearchDialogOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchDialogOpen, searchResults, selectedIndex, router]);

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchResults]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled 
          ? "bg-white shadow-md py-2" 
          : "bg-white/90 backdrop-blur-md py-3"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button 
              className="mr-2 block md:hidden p-1.5 rounded-full hover:bg-gray-100 transition-colors" 
              onClick={handleMobileMenuToggle}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 animate-in zoom-in-50 duration-150" />
              ) : (
                <Menu className="h-5 w-5 animate-in zoom-in-50 duration-150" />
              )}
            </button>
            <Link href="/" className="group text-2xl font-bold tracking-tight relative overflow-hidden">
              <span className="inline-block transition-transform duration-500 group-hover:-translate-y-full bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">NextShop</span>
              <span className="inline-block absolute left-0 top-full transition-transform duration-500 group-hover:-translate-y-full bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">NextShop</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium rounded-md transition-all hover:bg-gray-100 overflow-hidden group ${
                  pathname === item.href 
                    ? "text-primary" 
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-y-0">{item.name}</span>
                {pathname === item.href ? (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-primary rounded-full animate-in slide-in-from-left duration-300"></span>
                ) : (
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary rounded-full transition-all duration-300 group-hover:w-full"></span>
                )}
                <span className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md -z-0"></span>
              </Link>
            ))}
            <CategoryNavbar />
          </nav>

          <div className="flex items-center space-x-1 sm:space-x-3">
            {/* Desktop Search */}
            <form 
              ref={searchRef}
              className={`hidden md:flex relative transition-all duration-300 ease-in-out ${
                isSearchFocused ? "w-[300px]" : "w-[220px]"
              }`}
              onSubmit={handleSearch}
            >
              <div className="relative w-full group">
                <Search 
                  className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-all duration-200 ${
                    isSearchFocused || searchQuery 
                      ? "text-primary" 
                      : "text-gray-500 group-hover:text-gray-700"
                  }`} 
                />
                <Input
                  type="text"
                  placeholder="Search products..."
                  className={`w-full pl-9 pr-10 py-2 rounded-full transition-all duration-300 ${
                    isSearchFocused 
                      ? "bg-white ring-2 ring-primary/20 shadow-sm" 
                      : "bg-gray-100 group-hover:bg-gray-50 focus:bg-white ring-1 ring-transparent focus:ring-primary/20"
                  }`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  aria-label="Search products"
                  aria-expanded={isSearchDialogOpen}
                  aria-controls={isSearchDialogOpen ? "search-results" : undefined}
                  role="searchbox"
                />
                {searchQuery && (
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    onClick={handleSearchClear}
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                
                {/* Inline dropdown for desktop instead of dialog */}
                {isSearchFocused && searchResults.length > 0 && (
                  <div 
                    className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50 max-h-[70vh] overflow-y-auto"
                    id="search-results"
                  >
                    <div className="divide-y divide-gray-100">
                      {searchLoading ? (
                        <div className="text-center py-6 text-gray-500">Searching...</div>
                      ) : searchError ? (
                        <div className="text-center py-6 text-red-500">{searchError}</div>
                      ) : (
                        <SearchResultList
                          results={searchResults}
                          selectedIndex={selectedIndex}
                          onSelect={(item) => {
                            if (item.slug) router.push(`/products/${item.slug}`);
                            setIsSearchFocused(false);
                          }}
                          onHover={setSelectedIndex}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            </form>

            {/* Mobile Search Button */}
            <button 
              className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-all hover:scale-110 duration-200 group"
              onClick={toggleMobileSearch}
              aria-label="Search"
            >
              <Search className="h-5 w-5 group-hover:text-primary transition-colors duration-200" />
            </button>

            {/* Wishlist Link */}
            <Link href="/wishlist" className="hidden sm:flex relative p-2 rounded-full hover:bg-gray-100 transition-all hover:scale-110 duration-200 group">
              <Heart className="h-5 w-5 group-hover:text-primary transition-colors duration-200 group-hover:fill-red-100" />
            </Link>

            {/* Lists Link */}
            <Link href="/lists" className="hidden sm:flex relative p-2 rounded-full hover:bg-gray-100 transition-all hover:scale-110 duration-200 group">
              <ListPlus className="h-5 w-5 group-hover:text-primary transition-colors duration-200" />
            </Link>

            {/* Cart Link */}
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-gray-100 transition-all hover:scale-110 duration-200 group">
              <ShoppingCart className="h-5 w-5 group-hover:text-primary transition-colors duration-200" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white animate-in zoom-in-75 duration-200">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100 transition-all hover:scale-110 duration-200 group">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName || "User profile"} 
                        className="h-8 w-8 rounded-full object-cover border border-gray-200"
                      />
                    ) : (
                      <User className="h-5 w-5 group-hover:text-primary transition-colors duration-200" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-1 p-1 animate-in zoom-in-95 duration-100">
                  {user.displayName && (
                    <div className="px-2 py-1.5 text-sm font-medium text-gray-900">
                      Hello, {user.displayName.split(' ')[0]}
                    </div>
                  )}
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary/5 focus:text-primary">
                    <Link href="/profile" className="w-full">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary/5 focus:text-primary">
                    <Link href="/orders" className="w-full">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary/5 focus:text-primary">
                    <Link href="/wishlist" className="w-full">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary/5 focus:text-primary">
                    <Link href="/lists" className="w-full">My Lists</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="cursor-pointer focus:bg-primary/5 focus:text-primary"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="rounded-full hover:bg-gray-100 flex items-center gap-1 px-3 transition-all group"
                  >
                    <User className="h-4 w-4 group-hover:text-primary transition-colors duration-200" />
                    <span className="hidden sm:inline">Account</span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:text-primary group-data-[state=open]:rotate-180" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-1 p-1 animate-in zoom-in-95 duration-100">
                  <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary/5 focus:text-primary">
                    <Link href="/auth/login" className="w-full">Sign In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer focus:bg-primary/5 focus:text-primary">
                    <Link href="/auth/register" className="w-full">Create Account</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {/* Mobile Search Form - Expandable */}
        {isSearchActive && (
          <div className="md:hidden mt-3 pb-3 animate-in slide-in-from-top duration-300">
            <form 
              ref={searchRef}
              className="relative"
              onSubmit={handleSearch}
            >
              <Search 
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" 
              />
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Search products..."
                className="w-full pl-9 pr-10 py-2 rounded-full bg-gray-100 focus:bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search products"
                aria-expanded={isSearchDialogOpen}
                aria-controls={isSearchDialogOpen ? "mobile-search-results" : undefined}
                role="searchbox"
              />
              <button 
                type="button"
                className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors ${
                  searchQuery ? "bg-gray-200/80 hover:bg-gray-300/70 rounded-full p-0.5" : ""
                }`}
                onClick={searchQuery ? handleSearchClear : toggleMobileSearch}
                aria-label={searchQuery ? "Clear search" : "Close search"}
              >
                <X className="h-4 w-4" />
              </button>
              
              {/* Mobile dropdown results */}
              {searchResults.length > 0 && (
                <div 
                  className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50 max-h-[50vh] overflow-y-auto"
                  id="mobile-search-results"
                >
                  <div className="divide-y divide-gray-100">
                    {searchLoading ? (
                      <div className="text-center py-6 text-gray-500">Searching...</div>
                    ) : searchError ? (
                      <div className="text-center py-6 text-red-500">{searchError}</div>
                    ) : (
                      <SearchResultList
                        results={searchResults}
                        selectedIndex={selectedIndex}
                        onSelect={(item) => {
                          if (item.slug) router.push(`/products/${item.slug}`);
                        }}
                        onHover={setSelectedIndex}
                      />
                    )}
                  </div>
                </div>
              )}
            </form>
          </div>
        )}

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden bg-white overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <nav className="px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
            <MobileCategoryNav />
          </nav>
        </div>
      </div>
    </header>
  )
}
