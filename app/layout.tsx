import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { CartProvider } from "@/context/cart-context"
import { AuthProvider } from "@/context/auth-context"
import { WishlistProvider } from "@/context/wishlist-context"
import { Toaster } from "@/components/ui/toaster"
import { SmoothScrollProvider } from "@/context/smooth-scroll-context"
import { ScrollToTop } from "@/components/ui/scroll-to-top"
import { PageTransition } from "@/components/ui/page-transition"
import { SmoothCursor } from "@/components/ui/smooth-cursor"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NextShop - Modern E-commerce",
  description: "A modern e-commerce platform built with Next.js and Firebase",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <SmoothScrollProvider>
                <div className="flex min-h-screen flex-col">
                  <Header />
                  <div className="flex-1">
                    <PageTransition>
                      {children}
                    </PageTransition>
                  </div>
                  <Footer />
                </div>
                <SmoothCursor 
                  color="rgba(0, 0, 0, 0.7)" 
                  size={18} 
                  trailSize={6} 
                />
                <ScrollToTop />
                <Toaster />
              </SmoothScrollProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
