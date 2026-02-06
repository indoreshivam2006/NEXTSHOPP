"use client"

import React, { useEffect, useRef, useState } from 'react'

interface ClickSparkProps {
  children: React.ReactNode
  sparkColor: string
  sparkSize: number
  sparkRadius: number
  sparkCount: number
  duration: number
  className?: string
}

export default function ClickSpark({
  children,
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  className = '',
}: ClickSparkProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [sparks, setSparks] = useState<Array<{ id: number; left: number; top: number }>>([])
  const idCounterRef = useRef(0)

  useEffect(() => {
    // Clean up old sparks after animation completes
    const timer = setTimeout(() => {
      if (sparks.length > 0) {
        setSparks([])
      }
    }, duration + 50)

    return () => clearTimeout(timer)
  }, [sparks, duration])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return

    // Get click position relative to the container
    const rect = containerRef.current.getBoundingClientRect()
    const left = e.clientX - rect.left
    const top = e.clientY - rect.top

    // Create new sparks based on the position
    const newSparks = []
    for (let i = 0; i < sparkCount; i++) {
      newSparks.push({
        id: idCounterRef.current++,
        left,
        top,
      })
    }

    setSparks(newSparks)
  }

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
    >
      {children}

      {/* Sparks */}
      {sparks.map((spark, index) => {
        const angle = (index * 360) / sparkCount
        const keyframeStyle = {
          transform: `translate(-50%, -50%) rotate(${angle}deg)`,
          left: `${spark.left}px`,
          top: `${spark.top}px`,
          width: `${sparkSize}px`,
          height: `${sparkSize}px`,
          backgroundColor: sparkColor,
          borderRadius: '50%',
          position: 'absolute',
          opacity: 0,
          animation: `clickSpark${index} ${duration}ms ease-out forwards`,
          zIndex: 50,
        } as React.CSSProperties

        return <div key={spark.id} style={keyframeStyle} />
      })}

      <style jsx>{`
        ${sparks.map((_, index) => `
          @keyframes clickSpark${index} {
            0% {
              opacity: 1;
              transform: translate(-50%, -50%) rotate(${(index * 360) / sparkCount}deg) translateX(0);
            }
            100% {
              opacity: 0;
              transform: translate(-50%, -50%) rotate(${(index * 360) / sparkCount}deg) translateX(${sparkRadius}px);
            }
          }
        `).join('\n')}
      `}</style>
    </div>
  )
} 