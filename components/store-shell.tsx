"use client"

import { ReactNode } from "react"
import { usePathname } from "next/navigation"
import ArcSphereHeader from "@/components/arcsphere-header"
import ArcSphereFooter from "@/components/arcsphere-footer"
import { PageTransition } from "@/components/ui/page-transition"

interface StoreShellProps {
  children: ReactNode
}

export default function StoreShell({ children }: StoreShellProps) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith("/admin")

  if (isAdminRoute) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#f0ebe6] text-[#181818]">
      <ArcSphereHeader />
      <div className="flex-1 pt-20 sm:pt-24">
        <PageTransition>{children}</PageTransition>
      </div>
      <ArcSphereFooter />
    </div>
  )
}
