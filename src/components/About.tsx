import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'
import { useRef, useMemo } from 'react'
import { Entropy } from '@/components/ui/entropy'

export function About() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"]
  })

  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 50, 
    damping: 20, 
    restDelta: 0.001 
  })

  const headingText = "Renor builds clear digital systems shaped with intention. We design and engineer products that are structured, dependable, and built to scale."
  const headingWords = useMemo(() => headingText.split(" "), [])
  
  const paragraphText = "Our work is guided by clarity and reduction. We remove noise, create predictable flows, and craft interfaces that feel balanced and precise. Every product we build is rooted in strong design logic and clean engineering practices that last beyond the first release."
  const paragraphWords = useMemo(() => paragraphText.split(" "), [])

  return (
    <section 
      ref={containerRef} 
      className="relative z-10 w-full bg-[#faf8f5] min-h-[200vh]"
    >
      <div className="sticky top-0 min-h-screen flex flex-col px-6 md:px-12 lg:px-24 py-24 md:py-32">
        
        {/* Section Label */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="flex justify-between items-center w-full mb-12 md:mb-16"
        >
          <div className="flex flex-col items-start gap-1">
            <h2 className="text-sm md:text-base font-medium text-[#252525]">
              About us
            </h2>
            <div className="h-[2.5px] w-full bg-gradient-to-r from-[#ff4d00] via-[#ffea00] to-[#0066ff]" />
          </div>
          <span className="text-sm md:text-base font-medium text-[#252525]">
            (01)
          </span>
        </motion.div>

        {/* Content Container - 12 column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center flex-1">
          
          {/* Left Side - Entropy Animation (flipped) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="transform scale-x-[-1]">
              <Entropy size={360} className="rounded-lg" />
            </div>
            <p className="mt-4 text-sm text-[#252525]/60 italic tracking-wide">
              "Renor - Where Chaos Finds Form"
            </p>
          </div>

          {/* Right Side - Heading & Paragraph */}
          <div className="lg:col-span-7 lg:pl-8">
            
            {/* Heading with scroll reveal */}
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-tight mb-10 flex flex-wrap gap-x-[0.2em] gap-y-1">
              {headingWords.map((word, i) => {
                const start = (i / headingWords.length) * 0.4
                const end = start + (1 / headingWords.length * 2)
                return (
                  <Word key={`heading-${i}`} range={[start, end]} progress={smoothProgress}>
                    {word}
                  </Word>
                )
              })}
            </h3>

            {/* Paragraph with scroll reveal */}
            <p className="text-lg md:text-xl text-[#252525]/80 leading-relaxed flex flex-wrap gap-x-[0.25em] gap-y-1">
              {paragraphWords.map((word, i) => {
                const start = 0.4 + (i / paragraphWords.length) * 0.5
                const end = start + (1 / paragraphWords.length * 2)
                return (
                  <Word key={`para-${i}`} range={[start, end]} progress={smoothProgress}>
                    {word}
                  </Word>
                )
              })}
            </p>

          </div>

        </div>

        {/* Bottom Line */}
        <div className="w-full border-t border-dotted border-[#252525]/40 mt-16 md:mt-24" />
      </div>
    </section>
  )
}

const Word = ({ children, range, progress }: { children: string, range: [number, number], progress: MotionValue<number> }) => {
  const opacity = useTransform(progress, range, [0.15, 1])
  const y = useTransform(progress, range, [8, 0])
  
  return (
    <motion.span style={{ opacity, y }} className="text-[#252525] inline-block transition-colors duration-500">
      {children}
    </motion.span>
  )
}

