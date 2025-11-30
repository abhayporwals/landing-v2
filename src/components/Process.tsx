import { motion, AnimatePresence, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion'
import { useState, useRef, memo } from 'react'
import { useInView } from 'framer-motion'

const processes = [
  {
    category: 'Experiential',
    title: 'Architecture',
    description: 'We build to inspire, but also build to code. At Renor, design is only as strong as its function. Our architects specialize in bridging imagination with reality, ensuring bold concepts meet practical standards. Our network of fabricators span globally and across specialities; whether you\'re creating small scale builds, large permanent structures, or sculpted art pieces - we\'ve got you covered.',
    services: [
      'Creative and Design Direction',
      'Moodboards',
      'Stage Design',
      'Retail Design',
      'Floorplans',
      'Structural Design',
      'CAD Renders',
      'High Res 3D Mocks',
      'Fabrication Plans',
      'Permitting & Compliance Consulting'
    ]
  },
  {
    category: 'Digital',
    title: '3D Modelling',
    description: 'We create immersive digital experiences through advanced 3D modeling techniques. Our team transforms concepts into detailed virtual environments that bring your vision to life with precision and creativity.',
    services: [
      '3D Modelling',
      'Motion & Animation',
      'User Experience / Interface',
      'Development'
    ]
  },
  {
    category: 'Brand',
    title: 'Brand Identity',
    description: 'We craft cohesive brand systems that communicate who you are with clarity and intention. From the core idea to every visual expression, we ensure your brand stands out and resonates with your audience.',
    services: [
      'Brand Strategy',
      'Visual Identity',
      'Logo Design',
      'Brand Guidelines',
      'Typography & Color Systems'
    ]
  }
]

export function Process() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  })

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-[#faf8f5] px-6 md:px-12 lg:px-24 py-24 md:py-32"
    >
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
            Process
          </h2>
          <div className="h-[2.5px] w-full bg-gradient-to-r from-[#ff4d00] via-[#ffea00] to-[#0066ff]" />
        </div>
        <span className="text-sm md:text-base font-medium text-[#252525]">
          (03)
        </span>
      </motion.div>

      {/* Header Section */}
      <div className="relative flex h-[50vh] items-center justify-start">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-left text-4xl md:text-5xl lg:text-6xl font-medium text-[#252525] leading-[1.1] max-w-4xl"
        >
          Our approach{' '}
          <span className="text-[#252525]/40">to building great products.</span>
        </motion.h1>
      </div>

      {/* Process List */}
      <div className="space-y-0">
        {processes.map((process, i) => {
          const start = 0.1 + (i / processes.length) * 0.6
          const end = start + 0.15
          return (
            <ProcessCard
              key={process.category}
              process={process}
              index={i}
              isExpanded={expandedIndex === i}
              onToggle={() => toggleExpand(i)}
              progress={smoothProgress}
              range={[start, end]}
            />
          )
        })}
      </div>
    </section>
  )
}

const ProcessCard = memo(function ProcessCard({ 
  process, 
  index, 
  isExpanded, 
  onToggle,
  progress,
  range
}: { 
  process: typeof processes[0]
  index: number
  isExpanded: boolean
  onToggle: () => void
  progress: MotionValue<number>
  range: [number, number]
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const cardInView = useInView(cardRef, { once: true, amount: 0.3, margin: "0px 0px -100px 0px" })
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: 100, y: 100 }}
      animate={cardInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 100, y: 100 }}
        transition={{ 
        duration: 0.8, 
        delay: index * 0.15,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }}
      className="border-b border-[#252525]/10 last:border-b-0"
    >
      {/* Category Header */}
      <button
        onClick={onToggle}
        className="w-full text-left py-6 md:py-8 group cursor-pointer"
      >
        <div className="flex items-center justify-between">
          <AnimatedHeading
            progress={progress}
            range={range}
            className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#252525] tracking-tight"
          >
            {process.category}
          </AnimatedHeading>
          
          {/* Expand indicator */}
          <motion.div
            animate={{ rotate: isExpanded ? 45 : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="text-2xl md:text-3xl text-[#252525]/40 group-hover:text-[#252525]/60"
          >
            +
          </motion.div>
        </div>
      </button>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: 'auto', 
              opacity: 1,
              transition: {
                height: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
                opacity: { duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: {
                height: { duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
                opacity: { duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
              }
            }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="pb-12 md:pb-16 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
            >
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h4 className="text-3xl md:text-4xl font-semibold text-[#252525] mb-6 tracking-tight">
                  — {process.title}
                </h4>
                <p className="text-base md:text-lg text-[#252525]/70 leading-relaxed max-w-2xl">
                  {process.description}
                </p>
              </div>

              {/* Related Services */}
              <div className="lg:col-span-1">
                <h5 className="text-sm md:text-base font-semibold text-[#252525] mb-6 uppercase tracking-wider">
                  Related Services
                </h5>
                <ul className="space-y-3">
                  {process.services.map((service, serviceIndex) => (
                    <motion.li
                      key={service}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        delay: 0.3 + (serviceIndex * 0.05),
                        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
                      }}
                      className="text-sm md:text-base text-[#252525]/80"
                    >
                      {service}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
})

const AnimatedHeading = ({ 
  children, 
  progress, 
  range, 
  className 
}: { 
  children: string
  progress: MotionValue<number>
  range: [number, number]
  className?: string
}) => {
  const opacity = useTransform(progress, range, [0.2, 1])
  const y = useTransform(progress, range, [30, 0])
  const scale = useTransform(progress, range, [0.95, 1])
  
  return (
    <motion.h3 
      style={{ opacity, y, scale }}
      className={className}
    >
      {children}
    </motion.h3>
  )
}
