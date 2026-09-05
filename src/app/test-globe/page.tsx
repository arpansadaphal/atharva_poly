'use client';

import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';

export default function TestGlobePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 800;
    
    const globe = createGlobe(canvas, {
      devicePixelRatio: 1,
      width: 800,
      height: 800,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.8, 0.8, 0.8],
      markerColor: [1, 0, 0],
      glowColor: [0.5, 0.5, 0.5],
      markers: [
        { location: [18.78, 74.18], size: 0.1 },
        { location: [37.09, -95.71], size: 0.08 },
      ],
      onRender: (state) => {
        state.phi += 0.005;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-8">
      <div className="w-[400px] h-[400px] bg-slate-800 rounded-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
      </div>
    </div>
  );
}