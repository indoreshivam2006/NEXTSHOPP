"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

interface TimelineEvent {
  year: string
  title: string
  description: string
}

interface CompanyTimelineProps {
  events: TimelineEvent[]
}

const CompanyTimeline: React.FC<CompanyTimelineProps> = ({ events }) => {
  const [activeEvent, setActiveEvent] = useState<number>(0)

  return (
    <div className="relative">
      {/* Timeline Track */}
      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-300 to-indigo-100 transform -translate-x-1/2" />

      {/* Timeline Events */}
      <div className="space-y-12 relative">
        {events.map((event, index) => {
          const isActive = activeEvent === index
          const isEven = index % 2 === 0

          return (
            <div key={index} className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center`}>
              {/* Timeline Point */}
              <div className="md:w-1/2 flex md:justify-center order-1 md:order-none">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveEvent(index)}
                  className={`relative z-10 flex flex-col items-center ${isEven ? 'md:items-end' : 'md:items-start'}`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-200' 
                      : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
                  }`}>
                    <span className="text-xl font-bold">{event.year}</span>
                  </div>
                  <h3 className={`text-lg font-semibold ${isActive ? 'text-indigo-700' : 'text-gray-700'}`}>
                    {event.title}
                  </h3>
                </motion.button>
              </div>

              {/* Content */}
              <div className="md:w-1/2 order-2 md:order-none">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: isActive ? 1 : 0.5, 
                    y: isActive ? 0 : 10,
                    scale: isActive ? 1 : 0.98
                  }}
                  transition={{ duration: 0.3 }}
                  className={`p-6 rounded-2xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-white shadow-xl shadow-indigo-100 border border-indigo-50' 
                      : 'bg-gray-50 border border-gray-100'
                  }`}
                >
                  <p className="text-gray-600">{event.description}</p>
                  {isActive && (
                    <div className="mt-4 flex items-center text-indigo-600 font-medium text-sm">
                      <span>Learn more</span>
                      <ChevronRight size={16} className="ml-1" />
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default CompanyTimeline 