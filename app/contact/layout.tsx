import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us | NextShop",
  description: "Get in touch with the NextShop team. We're here to help with your questions, feedback, and support needs.",
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 