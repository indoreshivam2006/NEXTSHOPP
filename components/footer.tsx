"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Check, X, Loader2, Mail, ChevronRight, MapPin, Phone, Globe } from "lucide-react"
import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [subscriptionState, setSubscriptionState] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (subscriptionState === "error") {
      setSubscriptionState("idle")
      setErrorMessage("")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setSubscriptionState("error")
      setErrorMessage("Please enter your email address")
      return
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setSubscriptionState("error")
      setErrorMessage("Please enter a valid email address")
      return
    }
    
    setIsSubmitting(true)
    
    setTimeout(() => {
      setIsSubmitting(false)
      setSubscriptionState("success")
      setTimeout(() => {
        setEmail("")
        setSubscriptionState("idle")
      }, 3000)
    }, 1000)
  }

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50">
      {/* Newsletter Section */}
      <div className="border-t border-gray-100">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Stay Updated with NextShop
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive offers, new arrivals, and insider-only discounts.
            </p>
            
            <div className="max-w-md mx-auto">
              {subscriptionState === "success" ? (
                <div className="bg-green-50 border border-green-100 rounded-2xl p-6 flex flex-col items-center gap-3 animate-in fade-in duration-300">
                  <div className="bg-green-100 rounded-full p-3 text-green-600">
                    <Check size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900 mb-1">Thank you for subscribing!</h4>
                    <p className="text-green-700 text-sm">Welcome to our community. Get ready for amazing updates!</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative group">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter your email address"
                      className={`w-full px-6 py-4 pr-36 text-base bg-white border-2 rounded-full focus:outline-none focus:ring-4 transition-all duration-200 ${
                        subscriptionState === "error" 
                          ? "border-red-300 focus:ring-red-100 text-red-900 placeholder:text-red-300" 
                          : "border-indigo-200 focus:ring-indigo-100 focus:border-indigo-400 group-hover:border-indigo-300"
                      }`}
                    />
                    <div className="absolute inset-y-2 right-2">
                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="h-full px-6 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-full font-medium text-sm hover:from-indigo-700 hover:to-indigo-600 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            <span className="hidden sm:inline">Subscribing...</span>
                          </>
                        ) : (
                          <>
                            <span>Subscribe</span>
                            <ChevronRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {subscriptionState === "error" && (
                    <p className="absolute -bottom-6 left-0 text-red-500 text-xs pl-4 animate-in slide-in-from-top-2 duration-200">
                      {errorMessage}
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="border-t border-gray-100">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="md:col-span-4 space-y-6">
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                  NextShop
                </h3>
                <p className="text-gray-600 mt-4 text-sm leading-relaxed">
                  Your premier destination for quality products. We bring you the best in fashion, electronics, and lifestyle products with unmatched service.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin size={16} />
                  <span className="text-sm">Jagran LakeCity University, D-block Boys Hostel</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone size={16} />
                  <span className="text-sm">+91 1800-123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Globe size={16} />
                  <span className="text-sm">www.nextshop.com</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 pt-2">
                <a href="#" className="bg-gray-100 p-2 rounded-full text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="#" className="bg-gray-100 p-2 rounded-full text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="#" className="bg-gray-100 p-2 rounded-full text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
                  <Twitter size={18} />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {/* Shop Links */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Shop</h4>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/products" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                        All Products
                      </Link>
                    </li>
                    <li>
                      <Link href="/categories" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                        Categories
                      </Link>
                    </li>
                    <li>
                      <Link href="/new-arrivals" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                        New Arrivals
                      </Link>
                    </li>
                    <li>
                      <Link href="/sale" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                        Sale
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Support Links */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/contact" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/shipping" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                        Shipping & Returns
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                        FAQ
                      </Link>
                    </li>
                    <li>
                      <Link href="/track-order" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                        Track Order
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Company Links */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
                  <ul className="space-y-3">
                    <li>
                      <Link href="/about" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                        Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                        Terms & Conditions
                      </Link>
                    </li>
                    <li>
                      <Link href="/careers" className="text-gray-600 hover:text-indigo-600 text-sm transition-colors">
                        Careers
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} NextShop. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
