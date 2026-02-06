"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useEffect, useState } from "react"
import { Phone, Mail, MapPin, MessageSquare, Clock, ChevronRight, MessageCircle, Zap } from "lucide-react"
import InteractiveMap from "@/components/InteractiveMap"

export default function ContactPage() {
  const [showFloatingCall, setShowFloatingCall] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 500) {
          setShowFloatingCall(true);
        } else {
          setShowFloatingCall(false);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-20 pb-32">
        {/* <div className="absolute inset-0 bg-[url('/pattern-dot.svg')] opacity-10"></div> */}
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium mb-4">
              We'd Love to Hear From You
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Have questions, feedback, or need assistance? Our team is here to help you with anything you need.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild className="bg-white text-indigo-900 hover:bg-white/90 rounded-full">
                <a href="#contact-form" className="flex items-center gap-2 px-6">
                  <MessageSquare size={18} />
                  <span>Send a Message</span>
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/20 bg-white/5 backdrop-blur-xl hover:bg-white/10"
              >
                <a href="tel:+911800-123-4567" className="flex items-center gap-2 px-6">
                  <Phone size={18} />
                  <span>Call Us Now</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 24/7 Support Banner */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-700 py-10 text-white -mt-16 relative z-20 rounded-t-[3rem] shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <Zap size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold">24/7 Customer Support</h2>
                <p className="text-white/70">AI-powered assistance and human experts always available</p>
              </div>
            </div>
            <Button asChild variant="outline" className="rounded-full border-white/20 bg-white/5 backdrop-blur-xl hover:bg-white/10">
              <a href="tel:+911800-123-4567" className="flex items-center gap-2">
                <span>Call Now</span>
                <Phone size={16} />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Information Cards */}
      <section className="py-20 bg-indigo-50 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Contact Information
                </h2>
                <div className="mt-2 text-gray-600 max-w-md">
                  Our support team is available through multiple channels
                </div>
              </div>
              <div className="mt-6 md:mt-0">
                <Button asChild variant="outline" className="rounded-full border-indigo-300 hover:border-indigo-500 hover:bg-indigo-50 transition-all">
                  <Link href="#faq" className="flex items-center gap-2 px-6">
                    <span>View FAQs</span>
                    <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Call Us Card */}
              <div className="flex flex-col items-start p-8 bg-white rounded-2xl border border-indigo-50 hover:shadow-lg hover:shadow-indigo-100 transition-all group">
                <div className="p-4 mb-5 rounded-2xl bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
                  <Phone className="text-indigo-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Call Us</h3>
                <a href="tel:+911800-123-4567" className="text-indigo-600 hover:underline font-medium block mb-2">
                  +91 1800-123-4567
                </a>
                <p className="text-gray-600 text-sm">Customer Service</p>

                <div className="mt-4 pt-4 border-t border-gray-100 w-full">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">Working Hours</h4>
                  <p className="text-gray-600 text-sm">Monday - Friday: 9AM - 6PM</p>
                  <p className="text-gray-600 text-sm">Saturday: 10AM - 4PM</p>
                </div>
              </div>

              {/* Email Us Card */}
              <div className="flex flex-col items-start p-8 bg-white rounded-2xl border border-indigo-50 hover:shadow-lg hover:shadow-indigo-100 transition-all group">
                <div className="p-4 mb-5 rounded-2xl bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
                  <Mail className="text-indigo-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Email Us</h3>
                <a href="mailto:support@nextshop.com" className="text-indigo-600 hover:underline font-medium block mb-2">
                  support@nextshop.com
                </a>
                <p className="text-gray-600 text-sm">Customer Support</p>

                <a href="mailto:business@nextshop.com" className="text-indigo-600 hover:underline font-medium block mt-4 mb-2">
                  business@nextshop.com
                </a>
                <p className="text-gray-600 text-sm">Business Inquiries</p>
              </div>

              {/* Visit Us Card - Modified to show just teaser */}
              <div className="flex flex-col items-start p-8 bg-white rounded-2xl border border-indigo-50 hover:shadow-lg hover:shadow-indigo-100 transition-all group">
                <div className="p-4 mb-5 rounded-2xl bg-indigo-50 group-hover:bg-indigo-100 transition-colors">
                  <MapPin className="text-indigo-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold mb-3">Visit Us</h3>
                <address className="not-italic text-gray-700 mb-4">
                  Jagran LakeCity University<br />
                  D-block Boys Hostel<br />
                  first floor, room no. 107 & 202
                </address>

                <div className="flex flex-wrap gap-3 mt-auto">
                  <Button asChild variant="outline" size="sm" className="rounded-full border-indigo-200 hover:border-indigo-400">
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      <span>Get Directions</span>
                      <ChevronRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </a>
                  </Button>

                  <Button asChild variant="link" size="sm" className="text-indigo-600 hover:text-indigo-700">
                    <a href="#map-section" className="flex items-center gap-1">
                      <span>View Map</span>
                      <ChevronRight size={14} />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Map Section */}
      <section id="map-section" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start justify-between mb-12 gap-8">
              <div className="md:max-w-md">
                <div className="inline-block px-3 py-1 mb-4 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-full">
                  Interactive Location
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Find Us Easily
                </h2>
                <p className="text-gray-600 mb-8">
                  Our headquarters is conveniently located in the heart of Silicon Valley,
                  with easy access to major highways and public transportation.
                </p>

                <div className="bg-indigo-50 p-6 rounded-2xl mb-8">
                  <h3 className="font-medium text-gray-900 mb-3">Business Hours</h3>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                    <div className="pt-2 mt-2 border-t border-indigo-100">
                      <span className="text-sm">Holiday hours may vary</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-indigo-50 text-indigo-600 mt-1">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Address:</h4>
                      <address className="not-italic text-gray-700 mb-4">
                        Jagran LakeCity University<br />
                        D-block Boys Hostel<br />
                        first floor, room no. 107 & 202
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-indigo-50 text-indigo-600 mt-1">
                      <Phone size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Phone:</h4>
                      <p className="text-gray-600">
                        <a href="tel:+911800-123-4567" className="hover:text-indigo-600 transition-colors">
                          +91 1800-123-4567
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-indigo-50 text-indigo-600 mt-1">
                      <Mail size={16} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Email:</h4>
                      <p className="text-gray-600">
                        <a href="indoreshiv2006@gmail.com" className="hover:text-indigo-600 transition-colors">
                          indoreshiv2006@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:flex-1">
                <InteractiveMap
                  height="500px"
                  width="100%"
                  zoom={15}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact-form" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                We value your feedback and are always ready to assist with any questions
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
              <div className="lg:col-span-2">
                <div className="sticky top-20">
                  <div className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white p-4 rounded-xl inline-block mb-6">
                    <MessageSquare size={24} />
                  </div>

                  <h3 className="text-2xl font-bold mb-4">What to Expect</h3>
                  <p className="text-gray-600 mb-8">
                    Fill out the form and we'll get back to you as soon as possible. Our team typically responds within 24 hours.
                  </p>

                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-indigo-50 rounded-full">
                        <Clock className="text-indigo-600" size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium">Fast Response Time</h3>
                        <p className="text-sm text-gray-500">We typically respond within 24 hours</p>
                      </div>
                    </div>

                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="faq-1">
                        <AccordionTrigger className="text-left">What information should I include in my message?</AccordionTrigger>
                        <AccordionContent>
                          For the fastest response, please include your order number (if applicable), details about your inquiry, and any relevant screenshots or information.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="faq-2">
                        <AccordionTrigger className="text-left">How can I track my order status?</AccordionTrigger>
                        <AccordionContent>
                          You can track your order in real-time by logging into your account and visiting the Orders section in your profile dashboard.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="bg-white rounded-3xl shadow-sm p-8 border border-gray-100 hover:shadow-md transition-all">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          First Name
                        </label>
                        <Input
                          id="firstName"
                          placeholder="Enter your first name"
                          required
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name
                        </label>
                        <Input
                          id="lastName"
                          placeholder="Enter your last name"
                          required
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email address"
                        required
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Enter your phone number"
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <Input
                        id="subject"
                        placeholder="What is your message about?"
                        required
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        placeholder="Please provide details about your inquiry"
                        rows={5}
                        required
                        className="w-full"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="privacy"
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        required
                      />
                      <label htmlFor="privacy" className="ml-2 text-sm text-gray-600">
                        I agree to the <Link href="/privacy-policy" className="text-indigo-600 hover:underline">Privacy Policy</Link>
                      </label>
                    </div>

                    <div>
                      <Button
                        type="submit"
                        className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-full"
                      >
                        Send Message
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-indigo-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600">
                Find quick answers to common questions about our services
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="faq-1">
                <AccordionTrigger className="hover:text-indigo-600">How can I track my order?</AccordionTrigger>
                <AccordionContent>
                  You can track your order by logging into your account and navigating to the Orders section. There, you'll find real-time updates on your purchase.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-2">
                <AccordionTrigger className="hover:text-indigo-600">What is your return policy?</AccordionTrigger>
                <AccordionContent>
                  We offer a 30-day return policy for most items. Products must be in original condition with tags attached and original packaging.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-3">
                <AccordionTrigger className="hover:text-indigo-600">How do I change or cancel my order?</AccordionTrigger>
                <AccordionContent>
                  If you need to change or cancel your order, please contact our customer service team as soon as possible. We can usually accommodate changes if the order hasn't shipped yet.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-4">
                <AccordionTrigger className="hover:text-indigo-600">Do you ship internationally?</AccordionTrigger>
                <AccordionContent>
                  Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can see the specific options at checkout.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-5">
                <AccordionTrigger className="hover:text-indigo-600">How can I get support for a technical issue?</AccordionTrigger>
                <AccordionContent>
                  For technical support, please email our dedicated support team at technical@nextshop.com with details of your issue, and we'll respond within 24 hours.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Floating Call Button */}
      <div
        className={`fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-50 transition-all duration-300 ${showFloatingCall ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'}`}
      >
        <a
          href="tel:+911800-123-4567"
          className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 sm:py-3 px-3 sm:px-5 rounded-full shadow-lg hover:shadow-xl transition-shadow group"
        >
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="absolute -inset-1 rounded-full border-2 border-white/40 animate-ping"></span>
          </div>
          <span className="font-medium">Call Us</span>
          <span className="text-xs bg-white/20 py-1 px-2 rounded-full hidden sm:inline-block">
            24/7 Support
          </span>
        </a>
      </div>
    </main>
  )
} 