'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { getRenderableRoutes, origin } from '@/lib/international-reach-data';

const WorldRouteSchematic = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, margin: '-80px' });
  const routes = getRenderableRoutes();

  // Hard-coded positions for markers (equirectangular projection)
  const originXY = { x: 254.18, y: 71.22 }; // 18.78°N, 74.18°E
  const destPositions = [
    { id: 'united-states', x: 84.29, y: 52.91 }, // 37.09°N, 95.71°W
    { id: 'mexico', x: 77.45, y: 66.37 }, // 23.63°N, 102.55°W
  ];

  return (
    <div className="relative w-full max-w-[800px] mx-auto">
      <div className="relative w-full bg-slate-900/50 rounded-lg border border-slate-800 overflow-hidden">
        <svg
          ref={svgRef}
          viewBox="0 0 360 180"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="World map showing export routes from India to United States and Mexico"
          className="w-full h-auto"
          style={{ minHeight: '280px' }}
        >
          <defs>
            {/* Route gradient */}
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.3" />
            </linearGradient>
            
            {/* Glow filter for markers and routes */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            
            {/* Subtle shadow */}
            <filter id="shadow">
              <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.4"/>
            </filter>

            {/* Dot pattern for background */}
            <pattern id="dotPattern" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.5" fill="#1e293b" opacity="0.3"/>
            </pattern>

            {/* Grid pattern */}
            <pattern id="gridPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.2"/>
            </pattern>
          </defs>

          {/* Background with patterns */}
          <rect width="360" height="180" fill="#0f172a" />
          <rect width="360" height="180" fill="url(#gridPattern)" />
          <rect width="360" height="180" fill="url(#dotPattern)" />

          {/* World map from asset */}
          <g filter="url(#shadow)" opacity="0.85">
            <image
              href="/assets/about/world.svg"
              x="0"
              y="0"
              width="360"
              height="180"
              preserveAspectRatio="xMidYMid meet"
              className="opacity-70"
            />
          </g>

          {/* Route lines with never-ending animation */}
          {routes.map((route, idx) => {
            const dest = destPositions.find((d) => d.id === route.id);
            if (!dest || !route.coordinates) return null;
            
            const pathD = `M ${originXY.x} ${originXY.y} Q ${
              (originXY.x + dest.x) / 2
            } ${Math.min(originXY.y, dest.y) - 25} ${dest.x} ${dest.y}`;
            
            return (
              <g key={route.id}>
                {/* Base path */}
                <path
                  d={pathD}
                  fill="none"
                  stroke="#1e3a8a"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.3"
                />
                
                {/* Animated dash overlay */}
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="url(#routeGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="4 3"
                  filter="url(#glow)"
                  initial={{ pathLength: 0 }}
                  animate={inView ? { pathLength: 1 } : {}}
                  transition={{
                    duration: 1.5,
                    delay: idx * 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
                
                {/* Traveling dot */}
                <motion.circle
                  r="2"
                  fill="#60a5fa"
                  filter="url(#glow)"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: [0, 1, 1, 0] } : {}}
                  transition={{
                    duration: 2,
                    delay: idx * 0.4,
                    repeat: Infinity,
                    times: [0, 0.1, 0.9, 1],
                  }}
                >
                  <animateMotion
                    dur="2s"
                    begin={`${idx * 0.4}s`}
                    repeatCount="indefinite"
                    path={pathD}
                  />
                </motion.circle>
              </g>
            );
          })}

          {/* Origin marker (India) */}
          <g filter="url(#glow)">
            {/* Pulse ring */}
            <motion.circle
              cx={originXY.x}
              cy={originXY.y}
              r="4"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="0.6"
              initial={{ r: 4, opacity: 1 }}
              animate={inView ? { r: 12, opacity: 0 } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
                repeatDelay: 0.5,
              }}
            />
            
            {/* Outer ring */}
            <circle 
              cx={originXY.x} 
              cy={originXY.y} 
              r="5" 
              fill="none" 
              stroke="#60a5fa" 
              strokeWidth="0.4"
              opacity="0.6"
            />
            
            {/* Main marker */}
            <circle 
              cx={originXY.x} 
              cy={originXY.y} 
              r="4" 
              fill="#ffffff" 
              stroke="#2563eb" 
              strokeWidth="0.6"
            />
            
            {/* Inner dot */}
            <circle 
              cx={originXY.x} 
              cy={originXY.y} 
              r="1.5" 
              fill="#2563eb" 
            />
          </g>

          {/* Origin label */}
          <g>
            <text 
              x={originXY.x} 
              y={originXY.y - 16} 
              textAnchor="middle" 
              fontSize="5" 
              fill="#ffffff" 
              fontFamily="'JetBrains Mono', monospace"
              fontWeight="bold"
              letterSpacing="0.5"
            >
              {origin.label}
            </text>
            <text 
              x={originXY.x} 
              y={originXY.y - 8} 
              textAnchor="middle" 
              fontSize="4" 
              fill="#64748b" 
              fontFamily="'JetBrains Mono', monospace"
              letterSpacing="0.5"
            >
              {origin.coordinateDisplay}
            </text>
          </g>

          {/* Destination markers */}
          {destPositions.map((dest, idx) => {
            if (idx >= routes.length) return null;
            const route = routes[idx];
            if (!route.coordinates) return null;
            
            return (
              <g key={dest.id} filter="url(#glow)">
                {/* Pulse ring */}
                <motion.circle
                  cx={dest.x}
                  cy={dest.y}
                  r="3"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="0.5"
                  initial={{ r: 3, opacity: 1 }}
                  animate={inView ? { r: 9, opacity: 0 } : {}}
                  transition={{
                    duration: 2,
                    delay: idx * 0.3,
                    repeat: Infinity,
                    ease: "easeOut",
                    repeatDelay: 0.7,
                  }}
                />
                
                {/* Main marker */}
                <circle 
                  cx={dest.x} 
                  cy={dest.y} 
                  r="3.5" 
                  fill="#2563eb" 
                  stroke="#ffffff" 
                  strokeWidth="0.4"
                />
                
                {/* Highlight dot */}
                <circle 
                  cx={dest.x} 
                  cy={dest.y} 
                  r="1.2" 
                  fill="#93c5fd" 
                />
                
                {/* Label */}
                <text 
                  x={dest.x} 
                  y={dest.y - 10} 
                  textAnchor="middle" 
                  fontSize="4.5" 
                  fill="#94a3b8" 
                  fontFamily="'JetBrains Mono', monospace"
                  fontWeight="bold"
                  letterSpacing="0.8"
                >
                  {route.destinationLabel}
                </text>
                <text 
                  x={dest.x} 
                  y={dest.y + 13} 
                  textAnchor="middle" 
                  fontSize="3.8" 
                  fill="#64748b" 
                  fontFamily="'JetBrains Mono', monospace"
                  letterSpacing="0.5"
                >
                  {route.region}
                </text>
              </g>
            );
          })}

          {/* Decorative elements */}
          <g opacity="0.5">
            {/* Compass rose */}
            <g transform="translate(330, 25)">
              <circle r="14" fill="none" stroke="#334155" strokeWidth="0.5" />
              <circle r="9" fill="none" stroke="#334155" strokeWidth="0.3" />
              <path d="M 0 -9 L 2.5 0 L 0 9 L -2.5 0 Z" fill="#475569" />
              <path d="M -9 0 L 0 -2.5 L 9 0 L 0 2.5 Z" fill="#475569" opacity="0.5" />
              <text y="-15" textAnchor="middle" fontSize="3.5" fill="#475569" fontFamily="'JetBrains Mono', monospace">N</text>
            </g>
            
            {/* Scale bar */}
            <g transform="translate(285, 165)">
              <line x1="0" y1="0" x2="60" y2="0" stroke="#475569" strokeWidth="0.5" />
              <line x1="0" y1="-2" x2="0" y2="2" stroke="#475569" strokeWidth="0.5" />
              <line x1="30" y1="-1.5" x2="30" y2="1.5" stroke="#475569" strokeWidth="0.5" />
              <line x1="60" y1="-2" x2="60" y2="2" stroke="#475569" strokeWidth="0.5" />
              <text x="30" y="6" textAnchor="middle" fontSize="3" fill="#475569" fontFamily="'JetBrains Mono', monospace">5000 KM</text>
            </g>
            
            {/* Title */}
            <text x="180" y="15" textAnchor="middle" fontSize="4.5" fill="#475569" fontFamily="'JetBrains Mono', monospace" letterSpacing="2">
              INTERNATIONAL EXPORT ROUTES
            </text>
          </g>
        </svg>
      </div>

      {/* Legend overlay */}
      <div className="absolute bottom-4 left-4 flex items-center gap-4 font-mono text-[10px] tracking-wider text-slate-500 bg-slate-900/80 rounded-lg px-3 py-2 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-white border border-blue-500"></span>
          <span>ORIGIN</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
          <span>EXPORT MARKET</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5 h-0.5 bg-blue-500 opacity-70"></span>
          <span>ROUTE</span>
        </div>
      </div>

      {/* Stats overlay */}
      <div className="absolute top-4 right-4 font-mono text-[10px] tracking-wider text-slate-500 bg-slate-900/80 rounded-lg px-3 py-2 backdrop-blur-sm">
        <div className="text-blue-400 font-bold">2 ACTIVE ROUTES</div>
        <div className="mt-1">+2 CONFIDENTIAL</div>
      </div>
    </div>
  );
};

export default WorldRouteSchematic;