"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'

interface AnimatedStatProps {
  value: number
  label: string
  prefix?: string
  suffix?: string
  duration?: number
  productId?: string
  linkTo?: string
}

const AnimatedStat: React.FC<AnimatedStatProps> = ({
  value,
  label,
  prefix = '',
  suffix = '',
  duration = 2,
  productId,
  linkTo,
}) => {
  const [displayValue, setDisplayValue] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  useEffect(() => {
    if (isInView) {
      let startTime: number
      let animationFrame: number

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
        
        setDisplayValue(Math.floor(progress * value))
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate)
        }
      }
      
      animationFrame = requestAnimationFrame(animate)
      
      return () => cancelAnimationFrame(animationFrame)
    }
  }, [isInView, value, duration])
  
  const content = (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2 flex items-center justify-center">
        <span>{prefix}</span>
        <span>{displayValue}</span>
        <span>{suffix}</span>
      </div>
      <p className="text-white">{label}</p>
    </div>
  )
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={`${productId || linkTo ? 'cursor-pointer hover:scale-105 transition-transform' : ''}`}
    >
      {(productId || linkTo) ? (
        <Link href={linkTo || `/products/${productId}`}>
          {content}
        </Link>
      ) : (
        content
      )}
    </motion.div>
  )
}

export default AnimatedStat 