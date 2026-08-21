'use client'

import { motion } from 'framer-motion'

export function LightningBase() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-80 overflow-hidden">
      <div className="absolute bottom-0 left-1/2 h-70 w-200 -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,255,255,0.06),transparent_65%)]" />
      <div className="absolute bottom-0 left-1/2 h-30 w-100 -translate-x-1/2 bg-[radial-gradient(ellipse_at_50%_100%,rgba(255,255,255,0.08),transparent_55%)]" />

      <div className="absolute bottom-0 left-1/2 h-70 w-15 -translate-x-1/2 bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.04)_40%,rgba(255,255,255,0.08)_70%,rgba(255,255,255,0.06)_100%)] blur-2xl" />

      <svg
        className="absolute bottom-0 left-1/2 h-full w-225 -translate-x-1/2"
        viewBox="0 0 900 320"
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          <linearGradient id="boltGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="35%" stopColor="#e5e5e5" stopOpacity="0.7" />
            <stop offset="65%" stopColor="#d4d4d4" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#a3a3a3" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="boltGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="45%" stopColor="#a3a3a3" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#737373" stopOpacity="0" />
          </linearGradient>
          <filter id="glow1">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow2">
            <feGaussianBlur stdDeviation="7" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d="M450 320 L445 220 L455 140 L448 60 L450 0"
          stroke="url(#boltGrad1)"
          strokeWidth="3"
          fill="none"
          filter="url(#glow2)"
          strokeLinecap="round"
          animate={{
            opacity: [0.5, 0.8, 0.6, 0.75, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {[
          'M250 320 L280 240 L265 190 L295 120 L275 50 L285 0',
          'M350 320 L330 250 L350 180 L325 110 L345 40 L335 0',
          'M550 320 L570 250 L545 180 L575 110 L555 40 L565 0',
          'M650 320 L680 240 L660 190 L690 120 L670 50 L680 0',
        ].map((d, i) => (
          <motion.path
            key={`main-${i}`}
            d={d}
            stroke="url(#boltGrad1)"
            strokeWidth="2.5"
            fill="none"
            filter="url(#glow2)"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{
              opacity: [0.4, 0.7, 0.5, 0.65, 0.4],
              strokeWidth: [2.5, 3.5, 2.5, 3, 2.5],
            }}
            transition={{
              duration: 3.5,
              delay: i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {[
          'M300 320 L315 260 L305 210 L320 150 L310 90',
          'M400 320 L390 270 L410 210 L395 150 L405 100',
          'M500 320 L510 270 L495 210 L515 150 L505 100',
          'M600 320 L590 270 L610 210 L595 150 L605 100',
        ].map((d, i) => (
          <motion.path
            key={`sec-${i}`}
            d={d}
            stroke="url(#boltGrad2)"
            strokeWidth="1.5"
            fill="none"
            filter="url(#glow1)"
            strokeLinecap="round"
            animate={{
              opacity: [0.3, 0.6, 0.4, 0.55, 0.3],
            }}
            transition={{
              duration: 3,
              delay: i * 0.4 + 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {[
          'M280 240 L310 225',
          'M350 180 L375 195',
          'M545 180 L520 195',
          'M660 190 L685 205',
          'M275 50 L300 65',
          'M555 40 L580 55',
        ].map((d, i) => (
          <motion.path
            key={`branch-${i}`}
            d={d}
            stroke="#a3a3a3"
            strokeWidth="1"
            fill="none"
            filter="url(#glow1)"
            strokeLinecap="round"
            animate={{
              opacity: [0.2, 0.5, 0.3, 0.45, 0.2],
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.35 + 0.7,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        {[
          'M280 320 L290 295 L270 280',
          'M450 320 L460 295 L440 280',
          'M620 320 L610 295 L630 280',
        ].map((d, i) => (
          <motion.path
            key={`crackle-${i}`}
            d={d}
            stroke="#d4d4d4"
            strokeWidth="1.5"
            fill="none"
            filter="url(#glow1)"
            strokeLinecap="round"
            animate={{
              opacity: [0, 0.7, 0, 0.5, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.5 + 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </svg>

      <div className="absolute bottom-0 left-1/2 h-0.5 w-150 -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.5),rgba(255,255,255,0.15),transparent_70%)]" />
      <div className="absolute bottom-px left-1/2 h-15 w-100 -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_65%)] blur-2xl" />

      <motion.div
        className="absolute -bottom-5 left-1/2 h-12.5 w-125 -translate-x-1/2 rounded-full border border-white/10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.1, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-2.5 left-1/2 h-7.5 w-75 -translate-x-1/2 rounded-full border border-white/15"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.15, 0.4],
        }}
        transition={{
          duration: 4,
          delay: 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}
