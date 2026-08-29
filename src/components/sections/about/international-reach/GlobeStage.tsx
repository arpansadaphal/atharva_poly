'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import Globe with optimized loading
const Globe = dynamic(() => import('react-globe.gl'), {
  ssr: false,
  loading: () => null,
});

const GlobeStage = () => {
  const globeRef = useRef<any>(null);
  const [globeReady, setGlobeReady] = useState(false);
  const [isRotating, setIsRotating] = useState(true);

  // Data for routes
  const origin = { lat: 18.78, lng: 74.18, label: 'MIDC RANJANGAON, PUNE' };
  
  const destinations = [
    { lat: 37.09, lng: -95.71, label: 'UNITED STATES', region: 'NORTH AMERICA' },
    { lat: 23.63, lng: -102.55, label: 'MEXICO', region: 'NORTH AMERICA' },
  ];

  // Prepare arcs data
  const arcsData = destinations.map(dest => ({
    startLat: origin.lat,
    startLng: origin.lng,
    endLat: dest.lat,
    endLng: dest.lng,
    color: ['rgba(59, 130, 246, 0.2)', 'rgba(59, 130, 246, 0.9)'],
    stroke: 1.5,
    arcAltitude: 0.35,
  }));

  // Prepare points data
  const pointsData = [
    {
      lat: origin.lat,
      lng: origin.lng,
      size: 1.5,
      color: '#ffffff',
      label: origin.label,
    },
    ...destinations.map(dest => ({
      lat: dest.lat,
      lng: dest.lng,
      size: 1,
      color: '#3b82f6',
      label: `${dest.label}<br/><small style="color: #64748b">${dest.region}</small>`,
    })),
  ];

  const handleGlobeReady = useCallback(() => {
    if (globeRef.current) {
      setGlobeReady(true);
      
      // Set initial view to focus on India and show all routes
      globeRef.current.pointOfView({ lat: 20, lng: 60, altitude: 2.5 }, 0);
      
      // Configure controls for rotation
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.8;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.minPolarAngle = 0.3;
      controls.maxPolarAngle = Math.PI - 0.3;
      controls.update();
    }
  }, []);

  // Force rotation continuously
  useEffect(() => {
    if (!globeReady || !globeRef.current) return;

    let animationFrame: number;
    const rotateGlobe = () => {
      animationFrame = requestAnimationFrame(rotateGlobe);
      
      if (globeRef.current && isRotating) {
        const controls = globeRef.current.controls();
        if (controls) {
          controls.autoRotate = true;
          controls.update();
        }
      }
    };
    
    rotateGlobe();
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [globeReady, isRotating]);

  const handlePointHover = (point: any) => {
    if (globeRef.current && point) {
      setIsRotating(false);
      const controls = globeRef.current.controls();
      controls.autoRotate = false;
      controls.update();
      
      globeRef.current.pointOfView({ lat: point.lat, lng: point.lng, altitude: 2.2 }, 500);
    } else {
      setIsRotating(true);
      if (globeRef.current) {
        const controls = globeRef.current.controls();
        controls.autoRotate = true;
        controls.update();
      }
    }
  };

  const handleGlobeClick = () => {
    setIsRotating(true);
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      controls.autoRotate = true;
      controls.update();
    }
  };

  return (
    <div className="relative w-full aspect-square max-w-[620px] mx-auto">
      {/* SVG Placeholder - shown while globe loads */}
      {!globeReady && (
        <div className="absolute inset-0">
          <svg 
            viewBox="0 0 360 180" 
            className="w-full h-full"
            aria-hidden="true"
          >
            <defs>
              <pattern id="placeholder-grid" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.2"/>
              </pattern>
              <radialGradient id="placeholder-glow">
                <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Background */}
            <rect width="360" height="180" fill="#0f172a" />
            <rect width="360" height="180" fill="url(#placeholder-grid)" />

            {/* World map */}
            <image
              href="/assets/about/world.svg"
              x="0"
              y="0"
              width="360"
              height="180"
              preserveAspectRatio="xMidYMid meet"
              opacity="0.7"
            />

            {/* Route arcs - accurate positioning with never-ending animation */}
            <path 
              d="M 254 71 Q 169 27 84 53" 
              fill="none" 
              stroke="#3b82f6" 
              strokeWidth="1.5"
              strokeDasharray="4 3"
              opacity="0.7"
            >
              <animate 
                attributeName="stroke-dashoffset" 
                from="14" 
                to="0" 
                dur="1s" 
                repeatCount="indefinite" 
              />
            </path>
            <path 
              d="M 254 71 Q 166 34 77 66" 
              fill="none" 
              stroke="#3b82f6" 
              strokeWidth="1.5"
              strokeDasharray="4 3"
              opacity="0.7"
            >
              <animate 
                attributeName="stroke-dashoffset" 
                from="14" 
                to="0" 
                dur="1s" 
                repeatCount="indefinite" 
              />
            </path>

            {/* Origin marker - India */}
            <g>
              <circle cx="254" cy="71" r="4" fill="#ffffff" stroke="#3b82f6" strokeWidth="0.5" />
              <circle cx="254" cy="71" r="1.5" fill="#2563eb" />
              <circle cx="254" cy="71" r="8" fill="none" stroke="#3b82f6" strokeWidth="0.5" opacity="0.5">
                <animate attributeName="r" from="4" to="12" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* Destination marker - USA */}
            <g>
              <circle cx="84" cy="53" r="3" fill="#2563eb" stroke="#ffffff" strokeWidth="0.3" />
              <circle cx="84" cy="53" r="1" fill="#93c5fd" />
              <circle cx="84" cy="53" r="6" fill="none" stroke="#3b82f6" strokeWidth="0.4" opacity="0.5">
                <animate attributeName="r" from="3" to="9" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* Destination marker - Mexico */}
            <g>
              <circle cx="77" cy="66" r="3" fill="#2563eb" stroke="#ffffff" strokeWidth="0.3" />
              <circle cx="77" cy="66" r="1" fill="#93c5fd" />
              <circle cx="77" cy="66" r="6" fill="none" stroke="#3b82f6" strokeWidth="0.4" opacity="0.5">
                <animate attributeName="r" from="3" to="9" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* Labels */}
            <text x="254" y="60" textAnchor="middle" fontSize="4" fill="#ffffff" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.5">
              MIDC RANJANGAON
            </text>
            <text x="254" y="66" textAnchor="middle" fontSize="3.5" fill="#64748b" fontFamily="'JetBrains Mono', monospace">
              18.78°N 74.18°E
            </text>
            <text x="84" y="47" textAnchor="middle" fontSize="4" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.8">
              UNITED STATES
            </text>
            <text x="77" y="59" textAnchor="middle" fontSize="4" fill="#94a3b8" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.8">
              MEXICO
            </text>

            {/* Glow effect */}
            <rect width="360" height="180" fill="url(#placeholder-glow)" />
          </svg>
        </div>
      )}

      {/* Globe Container - always rendered but hidden until ready */}
      <div 
        className={`relative w-full h-full transition-opacity duration-500 ${
          globeReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Globe
          ref={globeRef}
          width={720}
          height={720}
          backgroundColor="rgba(0,0,0,0)"
          showAtmosphere={true}
          atmosphereColor="#1e3a8a"
          atmosphereAltitude={0.15}
          
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          
          pointsData={pointsData}
          pointLat="lat"
          pointLng="lng"
          pointColor="color"
          pointAltitude={0.01}
          pointRadius="size"
          pointLabel="label"
          pointResolution={8}
          
          arcsData={arcsData}
          arcStartLat="startLat"
          arcStartLng="startLng"
          arcEndLat="endLat"
          arcEndLng="endLng"
          arcColor="color"
          arcStroke="stroke"
          arcAltitude="arcAltitude"
          arcDashLength={0.3}
          arcDashGap={0.1}
          arcDashAnimateTime={2000}
          arcDashInitialGap={1}
          arcCircularResolution={32}
          
          onGlobeReady={handleGlobeReady}
          onPointHover={handlePointHover}
          onGlobeClick={handleGlobeClick}
          
          rendererConfig={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            precision: 'mediump',
          }}
        />
        
        {/* Overlay effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle at center, transparent 70%, rgba(15, 23, 42, 0.4) 100%)',
            }}
          />
        </div>
      </div>
      
      {/* Coordinate readout - always visible */}
      <div className="absolute bottom-4 left-4 font-mono text-[12px] tracking-wider text-slate-500">
        <div>18.78°N 74.18°E</div>
        <div>MIDC RANJANGAON</div>
      </div>
      
      {/* Route legend - always visible */}
      <div className="absolute top-4 right-4 text-right font-mono text-[12px] tracking-wider space-y-1">
        <div className="text-slate-400">EXPORT ROUTES</div>
        <div className="text-blue-400">● UNITED STATES</div>
        <div className="text-blue-400">● MEXICO</div>
      </div>
    </div>
  );
};

export default GlobeStage;