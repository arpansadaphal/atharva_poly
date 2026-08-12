'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { cn } from '@/lib/utils'
import { staggerContainer } from '@/lib/animations'
import type { ProcessStage } from '@/types/manufacturing'

interface ProductionProcessFlowProps {
  stages: ProcessStage[]
  showCheckpoints?: boolean
}

// Local variant with slight zoom (scale from 0.95 to 1)
const zoomStaggerItem = {
  hidden: { opacity: 0, y: 16, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function ProductionProcessFlow({
  stages,
  showCheckpoints = true,
}: ProductionProcessFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Scroll progress for the vertical line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.6'], // adjust as needed
  })

  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <div ref={containerRef} className="relative max-w-3xl mx-auto">
      {/* Animated vertical line that draws with scroll */}
      <motion.div
        style={{ scaleY: lineScale }}
        className="process-line absolute left-[18px] top-[18px] bottom-[18px] w-px bg-slate-200 origin-top"
        aria-hidden="true"
      />
      <motion.ol
        className="relative space-y-10"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px 0px' }}
        aria-label="Production stages"
      >
        {stages.map((stage, i) => {
          const Icon = (LucideIcons as any)[stage.iconName] || LucideIcons.HelpCircle
          return (
            <motion.li
              key={stage.step}
              variants={zoomStaggerItem}
              className="flex gap-6"
            >
              <div
                className={cn(
                  'flex-shrink-0 w-9 h-9 rounded-full bg-white border-2 flex items-center justify-center z-10',
                  stage.isQualityCheckpoint
                    ? 'border-blue-600'
                    : 'border-slate-200'
                )}
              >
                <span
                  className={cn(
                    'text-[13px] font-semibold',
                    stage.isQualityCheckpoint ? 'text-blue-600' : 'text-slate-500'
                  )}
                >
                  {stage.step}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-[16px] font-semibold text-slate-900">
                    {stage.title}
                  </h3>
                  {showCheckpoints && stage.isQualityCheckpoint && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-blue-600 uppercase tracking-[0.08em]">
                      <LucideIcons.ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                      QUALITY CHECKPOINT
                    </span>
                  )}
                </div>
                <p className="text-[14px] text-slate-600 leading-6 mt-2 max-w-[520px]">
                  {stage.description}
                </p>
                {stage.checkpointNote && (
                  <p className="text-[12px] text-slate-400 italic mt-1">
                    {stage.checkpointNote}
                  </p>
                )}
              </div>
            </motion.li>
          )
        })}
      </motion.ol>
    </div>
  )
}