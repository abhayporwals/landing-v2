'use client'

import { motion } from 'framer-motion'
import { ZoomParallax } from '@/components/ui/zoom-parallax'
import { cn } from '@/lib/utils'

const workImages = [
  {
    src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Modern architecture building',
  },
  {
    src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Urban cityscape at sunset',
  },
  {
    src: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Abstract geometric pattern',
  },
  {
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Mountain landscape',
  },
  {
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=800&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Minimalist design elements',
  },
  {
    src: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Ocean waves and beach',
  },
  {
    src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
    alt: 'Forest trees and sunlight',
  },
]

export function OurWork() {
  return (
    <section className="relative w-full bg-[#faf8f5]">
      {/* Section Label */}
      <div className="relative z-10 px-6 md:px-12 lg:px-24 pt-24 md:pt-32 pb-12 md:pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="flex justify-between items-center w-full mb-12 md:mb-16"
        >
          <div className="flex flex-col items-start gap-1">
            <h2 className="text-sm md:text-base font-medium text-[#252525]">
              Our Work
            </h2>
            <div className="h-[2.5px] w-full bg-gradient-to-r from-[#ff4d00] via-[#ffea00] to-[#0066ff]" />
          </div>
        </motion.div>

        {/* Header Section */}
        <div className="relative flex h-[50vh] items-center justify-start">
          {/* Radial spotlight */}
          <div
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full',
              'bg-[radial-gradient(ellipse_at_center,rgba(37,37,37,0.1),transparent_50%)]',
              'blur-[30px]',
            )}
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="text-left text-4xl md:text-5xl lg:text-6xl font-medium text-[#252525] leading-[1.1] max-w-4xl"
          >
            Winning Projects{' '}
            <span className="text-[#252525]/40">we've delivered.</span>
          </motion.h1>
        </div>
      </div>

      {/* Zoom Parallax Section */}
      <ZoomParallax images={workImages} />
    </section>
  )
}

