/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, Minimize2, Info } from 'lucide-react';

const ROMAN_NUMERALS = [
  'XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'
];

export default function App() {
  const [time, setTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 50); // Update every 50ms for smooth motion
    return () => clearInterval(timer);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((e) => {
        console.error(`Error attempting to enable full-screen mode: ${e.message}`);
      });
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const ms = time.getMilliseconds();
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  const secondDegrees = ((seconds + ms / 1000) / 60) * 360;
  const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
  const hourDegrees = ((hours % 12 + minutes / 60) / 12) * 360;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-[#0a0a0a]">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#d4af37 0.5px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      {/* Main Square Frame (Big Ben Style) */}
      <motion.div 
        layout
        className={`relative flex items-center justify-center transition-all duration-700 ease-in-out ${isFullscreen ? 'scale-110' : 'scale-100'}`}
      >
        {/* Outer Square Border with Checkerboard */}
        <div className="w-[380px] h-[380px] md:w-[640px] md:h-[640px] bg-[#000] border-[12px] border-[#d4af37] relative flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* Checkerboard Border Pattern */}
          <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
            backgroundImage: `linear-gradient(45deg, #d4af37 25%, transparent 25%), linear-gradient(-45deg, #d4af37 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #d4af37 75%), linear-gradient(-45deg, transparent 75%, #d4af37 75%)`,
            backgroundSize: '30px 30px',
            backgroundPosition: '0 0, 0 15px, 15px -15px, -15px 0px'
          }} />

          {/* Inner Decorative Frame */}
          <div className="w-[90%] h-[90%] border-[4px] border-[#d4af37] bg-[#000] relative flex items-center justify-center">
            
            {/* Corner Ornaments (More detailed) */}
            {[0, 90, 180, 270].map((rot) => (
              <div key={rot} className="absolute w-16 h-16 md:w-32 md:h-32 pointer-events-none" style={{
                top: rot === 0 || rot === 270 ? '4px' : 'auto',
                bottom: rot === 90 || rot === 180 ? '4px' : 'auto',
                left: rot === 0 || rot === 90 ? '4px' : 'auto',
                right: rot === 180 || rot === 270 ? '4px' : 'auto',
                transform: `rotate(${rot}deg)`
              }}>
                <svg viewBox="0 0 100 100" className="w-full h-full fill-[#d4af37]">
                  <path d="M0,0 L100,0 L100,5 L5,5 L5,100 L0,100 Z" />
                  <circle cx="40" cy="40" r="25" fill="none" stroke="#d4af37" strokeWidth="1" />
                  <path d="M40,15 L40,65 M15,40 L65,40" stroke="#d4af37" strokeWidth="0.5" />
                  <path d="M25,25 L55,55 M25,55 L55,25" stroke="#d4af37" strokeWidth="0.5" />
                  <circle cx="40" cy="40" r="10" fill="none" stroke="#d4af37" strokeWidth="1" />
                  <path d="M30,30 Q40,20 50,30 Q60,40 50,50 Q40,60 30,50 Q20,40 30,30" fill="none" stroke="#d4af37" strokeWidth="0.5" />
                </svg>
              </div>
            ))}

            {/* The Circular Clock Face */}
            <div className="w-[290px] h-[290px] md:w-[500px] md:h-[500px] rounded-full bg-[#fdfdfd] border-[10px] border-[#d4af37] relative flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]">
              
              {/* Outer Minute Ring */}
              <div className="absolute inset-[10px] rounded-full border-[2px] border-black/10" />
              
              {/* Minute Markers */}
              {[...Array(60)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-[1px] bg-black ${i % 5 === 0 ? 'h-8 w-[3px]' : 'h-4'}`}
                  style={{
                    transform: `rotate(${i * 6}deg) translateY(-${isFullscreen ? 225 : (window.innerWidth < 768 ? 130 : 225)}px)`,
                  }}
                />
              ))}

              {/* 5-Minute Decorative Cross Markers */}
              {[...Array(12)].map((_, i) => (
                <div
                  key={i}
                  className="absolute text-black"
                  style={{
                    transform: `rotate(${i * 30}deg) translateY(-${isFullscreen ? 238 : (window.innerWidth < 768 ? 138 : 238)}px)`,
                  }}
                >
                  <div style={{ transform: `rotate(${-i * 30}deg)` }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12,2L13,9L20,10L13,11L12,18L11,11L4,10L11,9L12,2Z" />
                    </svg>
                  </div>
                </div>
              ))}

              {/* Roman Numerals */}
              {ROMAN_NUMERALS.map((numeral, i) => {
                const angle = (i * 30) * (Math.PI / 180);
                const radius = isFullscreen ? 180 : (window.innerWidth < 768 ? 105 : 180);
                const x = Math.sin(angle) * radius;
                const y = -Math.cos(angle) * radius;

                return (
                  <div
                    key={numeral}
                    className="absolute font-display text-3xl md:text-6xl text-black font-bold select-none"
                    style={{
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                  >
                    {numeral}
                  </div>
                );
              })}

              {/* Inner Sunburst/Mandala Pattern (Matching the image) */}
              <div className="absolute w-[65%] h-[65%] opacity-30 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full stroke-[#d4af37]" fill="none">
                  {[...Array(24)].map((_, i) => (
                    <path 
                      key={i} 
                      d="M50,50 L50,15 Q60,25 50,35 Q40,25 50,15" 
                      transform={`rotate(${i * 15} 50 50)`} 
                      strokeWidth="0.3" 
                    />
                  ))}
                  {[...Array(12)].map((_, i) => (
                    <circle key={i} cx="50" cy="50" r="25" transform={`rotate(${i * 30} 50 50)`} strokeWidth="0.2" />
                  ))}
                  <circle cx="50" cy="50" r="35" strokeWidth="0.5" />
                  <circle cx="50" cy="50" r="12" strokeWidth="0.8" />
                </svg>
              </div>

              {/* Center Pin */}
              <div className="absolute w-8 h-8 rounded-full bg-black z-50 shadow-lg border-2 border-[#d4af37]" />

              {/* Hour Hand - Ornate Spade Style */}
              <motion.div
                className="absolute bottom-1/2 left-1/2 origin-bottom z-20"
                animate={{ rotate: hourDegrees }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                style={{
                  width: '30px',
                  height: '30%',
                  marginLeft: '-15px',
                }}
              >
                <svg viewBox="0 0 30 100" className="w-full h-full fill-black overflow-visible">
                  {/* Ornate Spade Tip */}
                  <path d="M15,0 C20,10 30,15 30,25 C30,35 20,40 15,35 C10,40 0,35 0,25 C0,15 10,10 15,0" />
                  {/* Hole in the spade */}
                  <circle cx="15" cy="25" r="4" fill="white" />
                  {/* Stem */}
                  <rect x="13" y="25" width="4" height="75" />
                </svg>
              </motion.div>

              {/* Minute Hand - Long Ornate Style */}
              <motion.div
                className="absolute bottom-1/2 left-1/2 origin-bottom z-30"
                animate={{ rotate: minuteDegrees }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                style={{
                  width: '20px',
                  height: '44%',
                  marginLeft: '-10px',
                }}
              >
                <svg viewBox="0 0 20 100" className="w-full h-full fill-black overflow-visible">
                  {/* Tapered Tip */}
                  <path d="M10,0 L15,15 L12,100 L8,100 L5,15 Z" />
                  {/* Small circle ornament near base */}
                  <circle cx="10" cy="80" r="3" fill="white" stroke="black" strokeWidth="1" />
                </svg>
              </motion.div>

              {/* Second Hand - Thin Gold Needle */}
              <motion.div
                className="absolute bottom-1/2 left-1/2 origin-bottom z-40"
                animate={{ rotate: secondDegrees }}
                transition={{ type: "linear", duration: 0 }}
                style={{
                  width: '2px',
                  height: '48%',
                  marginLeft: '-1px',
                  background: '#d4af37',
                }}
              >
                 <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#d4af37] rounded-full border-2 border-black" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="absolute bottom-8 flex gap-8 items-center z-50">
        <button 
          onClick={toggleFullscreen}
          className="p-4 rounded-full border-2 border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300 shadow-lg"
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? <Minimize2 size={28} /> : <Maximize2 size={28} />}
        </button>
        
        <button 
          onClick={() => setShowInfo(!showInfo)}
          className="p-4 rounded-full border-2 border-[#d4af37]/40 text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all duration-300 shadow-lg"
        >
          <Info size={28} />
        </button>
      </div>

      {/* Info Overlay */}
      <AnimatePresence>
        {showInfo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowInfo(false)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#000] p-12 rounded-none border-8 border-double border-[#d4af37] max-w-xl shadow-[0_0_100px_rgba(212,175,55,0.2)] text-center relative"
            >
              <div className="absolute top-4 left-4 right-4 bottom-4 border border-[#d4af37]/10 pointer-events-none" />
              <h2 className="font-display text-4xl mb-8 tracking-[0.4em] uppercase text-[#d4af37]">Westminster</h2>
              <p className="text-2xl italic mb-10 leading-relaxed text-[#f5f2ed] font-serif">
                "Behold, the Great Clock of the North, a sentinel of time, marking the heartbeat of a nation with every chime."
              </p>
              <div className="h-[2px] w-40 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-10" />
              <button 
                onClick={() => setShowInfo(false)}
                className="px-12 py-4 border-2 border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-all uppercase text-sm tracking-[0.3em] font-display font-bold"
              >
                Return to Time
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Date */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute bottom-6 right-10 font-display text-sm tracking-[0.6em] uppercase text-[#d4af37] opacity-60"
      >
        {time.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
      </motion.div>
    </div>
  );
}
