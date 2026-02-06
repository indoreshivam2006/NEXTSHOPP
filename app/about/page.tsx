"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Check, ChevronRight, Globe, Award, Users, Heart, Shield, Zap, ArrowRight, ChevronDown, Sparkles, ShoppingBag } from "lucide-react"
import CompanyTimeline from "@/components/CompanyTimeline"
import TeamMember from "@/components/TeamMember"
import AnimatedStat from "@/components/AnimatedStat"
import ValueCard from "@/components/ValueCard"

export default function AboutPage() {
  const [showFloatingCta, setShowFloatingCta] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const scrollPosition = window.scrollY;
        if (scrollPosition > 500) {
          setShowFloatingCta(true);
        } else {
          setShowFloatingCta(false);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const timelineEvents = [
    {
      year: "2023",
      title: "Foundation",
      description: "NextShop was founded with a vision to transform e-commerce in India by providing quality products at affordable prices while supporting local businesses."
    },
    {
      year: "2023",
      title: "First 100K Users",
      description: "Within just 6 months of launch, NextShop reached its first 100,000 users, demonstrating the strong market need for our platform."
    },
    {
      year: "2024",
      title: "Expansion",
      description: "We expanded our operations to cover 100+ cities across India, bringing our services to millions of new potential customers."
    },
    {
      year: "2024",
      title: "Funding Round",
      description: "Secured Series A funding of $10 million to accelerate growth, improve technology infrastructure, and enhance customer experience."
    }
  ];

  const teamMembers = [
    {
      name: "Shivam Indore",
      role: "Frontend and Backend maker",
      image: "/me.jpg?height=400&width=400",
      bio: "Shivam and Abhay had make this website together and hosted it.",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "indoreshivam2006@gmail.com"
    },
    {
      name: "Abhay Dwivedi",
      role: "Frontend and Backend maker",
      image: "/AbhayImage.jpg?height=400&width=400",
      bio: "Abhay and Shivam had make this website together and hosted it..",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "Abhaydiwade@gmail.com"
    },
    
  ];

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-800 text-white py-28 md:py-36 overflow-hidden">
        {/* Animated particles */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-indigo-300 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 rounded-full bg-purple-300 animate-pulse delay-300"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 rounded-full bg-blue-300 animate-pulse delay-700"></div>
          <div className="absolute top-2/3 right-1/4 w-3 h-3 rounded-full bg-indigo-300 animate-pulse delay-500"></div>
          <div className="absolute bottom-1/3 right-1/2 w-2 h-2 rounded-full bg-purple-300 animate-pulse delay-1000"></div>
        </div>
        
        {/* Grid pattern overlay with animation */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA0IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIC8+PC9zdmc+')] opacity-50 animate-pulse duration-[15000ms]"></div>
        
        {/* Larger decorative elements */}
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-500/10 to-transparent blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-500/10 to-transparent blur-3xl"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Enhanced label with animation */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8 shadow-xl shadow-purple-950/20"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-300 mr-2"></div>
              <span className="text-sm font-medium uppercase tracking-wider text-white/90 mr-2">About Us</span>
              <Sparkles className="w-4 h-4 text-indigo-300" />
            </motion.div>
            
            {/* Enhanced heading with animation */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight"
            >
              <span className="inline-block">About <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300">NextShop</span></span>
            </motion.h1>
            
            {/* Enhanced description with animation */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Transforming online shopping in India with quality products and exceptional service
            </motion.p>
            
            {/* CTA Buttons with animation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-5"
            >
              <Button asChild className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 border-0 text-white rounded-full h-14 px-8 text-base shadow-xl shadow-indigo-900/30 transition-all hover:shadow-indigo-900/50 hover:scale-[1.03]">
                <a href="#our-story" className="flex items-center gap-2">
                  <span className="font-medium">Our Journey</span>
                  <ChevronRight size={18} />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-white/30 bg-white/5 backdrop-blur-xl hover:bg-white/10 h-14 px-8 text-base transition-all hover:scale-[1.03]"
              >
                <Link href="/contact" className="flex items-center gap-2">
                  <span className="font-medium">Contact Us</span>
                  <ChevronRight size={18} />
                </Link>
              </Button>
            </motion.div>
          </div>
          
          {/* Scroll indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          >
            <span className="text-white/50 text-xs mb-2">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
              <motion.div 
                animate={{ 
                  y: [0, 12, 0],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  repeatType: "loop" 
                }}
                className="w-1.5 h-1.5 bg-white/70 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Banner */}
      <section className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-700 py-16 text-white relative z-20 -mt-0 shadow-2xl shadow-purple-900/20 overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIC8+PC9zdmc+')] opacity-30"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
          >
            <div className="flex items-start md:items-center gap-6">
              <div className="relative">
                <div className="absolute -inset-1 bg-white/20 rounded-full blur-md"></div>
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 backdrop-blur-sm border border-white/20 shadow-lg shadow-purple-900/20">
                  <Zap className="h-9 w-9 text-white" />
                </div>
              </div>
              <div>
                <h2 className="text-2xl md:text-4xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-indigo-100">Our Mission</h2>
                <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                  To connect Indians with quality products at affordable prices through innovative technology
                </p>
              </div>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button asChild className="rounded-full py-4 px-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white shadow-lg shadow-purple-900/20 transition-all">
                <a href="#our-values" className="flex items-center gap-3">
                  <span className="font-medium">Our Values</span>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/20">
                    <ArrowRight size={14} />
                  </div>
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section id="our-story" className="py-24 bg-white relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-16">
              <div className="md:w-1/2">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl shadow-indigo-200"
                >
                  <Image 
                    src="/placeholder.svg?height=800&width=600" 
                    alt="NextShop team working" 
                    fill 
                    className="object-cover"
                  />
                  {/* Decorative elements */}
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/40 to-transparent mix-blend-multiply"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-indigo-900/60 to-transparent"></div>
                </motion.div>
              </div>
              
              <div className="md:w-1/2 md:pr-8">
                <div className="inline-flex items-center px-3 py-1 mb-6 bg-indigo-100 rounded-full">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mr-2"></div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-700">Our Journey</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">The NextShop Story</h2>
                <div className="space-y-5 text-gray-700 leading-relaxed text-lg">
                  <p>
                    Founded in 2023, NextShop began with a simple mission: to create an online marketplace that connects 
                    Indians with quality products at affordable prices. What started as a small venture has now grown into 
                    one of India's most trusted e-commerce platforms.
                  </p>
                  <p>
                    Our journey has been defined by our commitment to customer satisfaction, authentic products, and 
                    supporting local Indian businesses. We've built partnerships with thousands of sellers across the 
                    country, helping them reach customers nationwide.
                  </p>
                  <p>
                    Today, NextShop offers millions of products across various categories, from electronics and 
                    fashion to home essentials and more. We continue to innovate and expand, always staying true to 
                    our core values of quality, affordability, and exceptional service.
                  </p>
                </div>
                
                <div className="mt-10">
                  <Button asChild className="rounded-full py-3 px-6 text-base group shadow-lg hover:shadow-xl transition-all">
                    <Link href="/products" className="flex items-center gap-2">
                      <span>Explore Our Products</span>
                      <ChevronRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 mb-4 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-full">
                Our Growth
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Journey Through Time
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From our humble beginnings to becoming one of India's fastest-growing e-commerce platforms,
                here's how our journey has unfolded.
              </p>
            </div>
            
            <CompanyTimeline events={timelineEvents} />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section id="our-values" className="py-20 bg-indigo-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 mb-4 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-full">
                What We Stand For
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our Core Values
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                These principles guide everything we do at NextShop, from product selection to customer service.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <ValueCard
                title="Quality Assurance"
                description="We rigorously verify all sellers and products to ensure only authentic, high-quality items are available on our platform."
                icon={Check}
                delay={0.1}
              />
              <ValueCard
                title="Affordable Pricing"
                description="We believe quality products should be accessible to all. Our partnerships allow us to offer competitive prices without compromising on quality."
                icon={Award}
                delay={0.2}
              />
              <ValueCard
                title="Customer First"
                description="Every decision we make puts our customers at the center. From our easy-to-use platform to our responsive customer service, we prioritize your satisfaction."
                icon={Heart}
                delay={0.3}
              />
              <ValueCard
                title="Trust & Security"
                description="We maintain the highest standards of data security and transaction safety, ensuring your shopping experience is always protected."
                icon={Shield}
                delay={0.4}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 mb-4 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-full">
                Our People
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Our Leadership
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our diverse team of experts is dedicated to building the best e-commerce experience in India.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <TeamMember
                  key={index}
                  name={member.name}
                  role={member.role}
                  image={member.image}
                  bio={member.bio}
                  linkedin={member.linkedin}
                  twitter={member.twitter}
                  email={member.email}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-indigo-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/10 -mr-16 -mt-16"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-purple-500/10 -ml-16 -mb-16"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA4IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIC8+PC9zdmc+')] opacity-50"></div>
              
              <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
                <div className="lg:w-2/3 text-white">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    Ready to Experience NextShop?
                  </h2>
                  <p className="text-white/80 text-lg mb-8 lg:mb-0 max-w-2xl">
                    Join millions of satisfied customers who trust NextShop for their shopping needs.
                    Discover quality products at great prices with secure shopping and fast delivery.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="rounded-full bg-white text-indigo-700 hover:bg-white/90 px-8 shadow-xl shadow-indigo-900/20 hover:shadow-indigo-900/30 transition-all">
                    <Link href="/products">Shop Now</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full border-white/30 bg-white/10 hover:bg-white/20 text-white px-8">
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floating CTA */}
      <div 
        className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${
          showFloatingCta ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
        }`}
      >
        <Button asChild size="lg" className="rounded-full shadow-lg shadow-indigo-300/20 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-0">
          <Link href="/products" className="flex items-center gap-2 px-6">
            <span>Shop Now</span>
            <ChevronRight size={16} />
          </Link>
        </Button>
      </div>
    </main>
  )
} 