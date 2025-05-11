"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Linkedin, Twitter, Mail } from 'lucide-react'

interface TeamMemberProps {
  name: string
  role: string
  image: string
  bio?: string
  linkedin?: string
  twitter?: string
  email?: string
}

const TeamMember: React.FC<TeamMemberProps> = ({
  name,
  role,
  image,
  bio,
  linkedin,
  twitter,
  email,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl">
        {/* Image */}
        <Image
          src={image}
          alt={name}
          fill
          className={`object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        
        {/* Overlay with bio */}
        {bio && (
          <div 
            className={`absolute inset-0 bg-gradient-to-t from-indigo-900/90 via-indigo-900/70 to-transparent p-6 flex flex-col justify-end transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <p className="text-white text-sm">{bio}</p>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-4">
        <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
        <p className="text-indigo-600">{role}</p>

        {/* Social links */}
        {(linkedin || twitter || email) && (
          <div className="mt-3 flex items-center gap-3">
            {linkedin && (
              <a 
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
              >
                <Linkedin size={16} />
              </a>
            )}
            {twitter && (
              <a 
                href={twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
              >
                <Twitter size={16} />
              </a>
            )}
            {email && (
              <a 
                href={`mailto:${email}`}
                className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
              >
                <Mail size={16} />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default TeamMember 