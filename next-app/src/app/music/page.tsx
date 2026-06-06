'use client';

import { useEffect, useRef, useState } from 'react';
import { useMusic } from '@/context/MusicContext';
import { Play, Pause, SkipForward, SkipBack, Shuffle, Repeat, Volume2, Mic2 } from 'lucide-react';
import { getColor } from 'colorthief';

export default function MusicPage() {
  const { currentTrack, isPlaying, currentTime, duration, volume, togglePlay, nextTrack, prevTrack, seek, setVolume, analyserRef } = useMusic();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [showLyrics, setShowLyrics] = useState(false);
  const [lyrics, setLyrics] = useState<{ time: number; text: string }[]>([]);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);

  // Format time (seconds to MM:SS)
  const formatTime = (time: number) => {
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // ColorThief Logic
  useEffect(() => {
    if (!imgRef.current || !currentTrack) return;
    const img = imgRef.current;
    
    const extractColor = () => {
      try {
        const color = getColor(img);
        document.documentElement.style.setProperty('--ambient-color', `rgb(${color[0]}, ${color[1]}, ${color[2]})`);
        document.body.style.background = `radial-gradient(circle at 50% 0%, rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.15) 0%, var(--bg-color) 70%)`;
      } catch (e) {
        console.warn('ColorThief failed:', e);
      }
    };

    if (img.complete) {
      extractColor();
    } else {
      img.addEventListener('load', extractColor);
      return () => img.removeEventListener('load', extractColor);
    }
  }, [currentTrack]);

  // Visualizer Logic
  useEffect(() => {
    if (!canvasRef.current || !analyserRef.current || !isPlaying) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const analyser = analyserRef.current;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    window.addEventListener('resize', resize);
    resize();

    let animationId: number;

    const draw = () => {
      animationId = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) - 20;

      for (let i = 0; i < bufferLength; i++) {
        const barHeight = (dataArray[i] / 255) * 50;
        const rads = (Math.PI * 2) / bufferLength;
        const x = centerX + Math.cos(rads * i) * (radius + barHeight);
        const y = centerY + Math.sin(rads * i) * (radius + barHeight);
        const xEnd = centerX + Math.cos(rads * i) * radius;
        const yEnd = centerY + Math.sin(rads * i) * radius;

        ctx.strokeStyle = `hsla(${i}, 70%, 50%, 0.5)`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(xEnd, yEnd);
        ctx.stroke();
      }
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [isPlaying, analyserRef]);

  // Load Lyrics
  useEffect(() => {
    if (!currentTrack || !currentTrack.lyrics) {
      setLyrics([]);
      return;
    }

    fetch(currentTrack.lyrics)
      .then(res => res.text())
      .then(text => {
        const lines = text.split('\n');
        const regex = /\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/;
        const parsed = [];
        for (const line of lines) {
          const match = line.match(regex);
          if (match) {
            const min = parseInt(match[1], 10);
            const sec = parseInt(match[2], 10);
            const ms = parseInt(match[3], 10) * (match[3].length === 2 ? 10 : 1);
            parsed.push({ time: min * 60 + sec + ms / 1000, text: match[4].trim() });
          }
        }
        setLyrics(parsed);
      })
      .catch(e => console.error('Failed to load lyrics:', e));
  }, [currentTrack]);

  // Sync Lyrics Auto-Scroll
  useEffect(() => {
    if (!showLyrics || lyrics.length === 0 || !lyricsContainerRef.current) return;
    
    // Find active line
    const activeIndex = lyrics.findIndex((l, i) => {
      const nextLine = lyrics[i + 1];
      return currentTime >= l.time && (!nextLine || currentTime < nextLine.time);
    });

    if (activeIndex !== -1) {
      const activeEl = lyricsContainerRef.current.children[activeIndex] as HTMLElement;
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentTime, showLyrics, lyrics]);

  if (!currentTrack) {
    return (
      <main className="page-content flex items-center justify-center h-screen">
        <h1 className="text-2xl text-[var(--text-secondary)]">No track selected</h1>
      </main>
    );
  }

  return (
    <main className="page-content flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-4 md:p-10 relative overflow-hidden transition-all duration-700">
      
      {/* Immersive Layout Container */}
      <div className={`w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 transition-all ${showLyrics ? 'items-start' : 'items-center'}`}>
        
        {/* Left: Artwork & Controls */}
        <div className={`flex flex-col items-center w-full max-w-md transition-all ${showLyrics ? 'md:w-1/2' : 'md:w-full'}`}>
          
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] mb-8 group rounded-full">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-50"></canvas>
            <img 
              ref={imgRef}
              src={currentTrack.cover} 
              alt={currentTrack.title} 
              crossOrigin="anonymous"
              className={`absolute inset-6 w-[calc(100%-48px)] h-[calc(100%-48px)] object-cover rounded-full shadow-2xl transition-transform duration-[10000ms] ease-linear ${isPlaying ? 'rotate-[360deg]' : ''}`}
              style={{ animation: isPlaying ? 'spin 20s linear infinite' : 'none' }}
            />
            {/* Center vinyl hole */}
            <div className="absolute inset-0 m-auto w-10 h-10 bg-[var(--bg-color)] rounded-full shadow-inner border border-[var(--border-color)]"></div>
          </div>

          <div className="w-full text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-serif text-[var(--text-primary)] mb-2">{currentTrack.title}</h1>
            <p className="text-lg text-[var(--text-secondary)] uppercase tracking-widest">{currentTrack.artist}</p>
          </div>

          <div className="w-full mb-8">
            <div className="flex justify-between text-xs font-sans text-[var(--text-secondary)] mb-2">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max={duration || 100} 
              value={currentTime} 
              onChange={(e) => seek(Number(e.target.value))}
              className="w-full h-1 bg-[var(--border-color)] rounded-full appearance-none outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--accent-color)] cursor-pointer"
            />
          </div>

          <div className="w-full flex items-center justify-between mb-8">
            <button className="p-3 text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-colors"><Shuffle size={20} /></button>
            <button onClick={prevTrack} className="p-3 text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors"><SkipBack size={32} /></button>
            <button onClick={togglePlay} className="p-5 bg-[var(--text-primary)] text-[var(--bg-color)] rounded-full hover:scale-105 transition-transform shadow-2xl">
              {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
            </button>
            <button onClick={nextTrack} className="p-3 text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors"><SkipForward size={32} /></button>
            <button className="p-3 text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-colors"><Repeat size={20} /></button>
          </div>

          <div className="w-full flex items-center justify-between px-4 opacity-70 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-3 w-1/3">
              <Volume2 size={16} className="text-[var(--text-secondary)]" />
              <input 
                type="range" 
                min="0" max="100" 
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-1 bg-[var(--border-color)] rounded-full appearance-none cursor-pointer"
              />
            </div>
            <button 
              onClick={() => setShowLyrics(!showLyrics)}
              className={`p-2 rounded-full transition-colors ${showLyrics ? 'bg-[var(--accent-color)] text-[var(--bg-color)]' : 'text-[var(--text-secondary)] hover:text-[var(--accent-color)]'}`}
              title="Toggle Live Lyrics"
            >
              <Mic2 size={20} />
            </button>
          </div>
        </div>

        {/* Right: Live Lyrics */}
        <div className={`w-full md:w-1/2 h-[600px] overflow-y-auto scrollbar-hide relative transition-all duration-700 ${showLyrics ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20 hidden md:block md:w-0'}`}>
          <div ref={lyricsContainerRef} className="py-[300px] flex flex-col gap-6 text-center md:text-left pr-4">
            {lyrics.length > 0 ? lyrics.map((l, i) => {
              const nextLine = lyrics[i + 1];
              const isActive = currentTime >= l.time && (!nextLine || currentTime < nextLine.time);
              return (
                <p 
                  key={i} 
                  className={`text-2xl md:text-4xl font-serif font-bold transition-all duration-500 cursor-pointer ${isActive ? 'text-[var(--accent-color)] scale-110 origin-left' : 'text-[var(--text-secondary)] opacity-40 hover:opacity-80'}`}
                  onClick={() => seek(l.time)}
                >
                  {l.text || '...'}
                </p>
              );
            }) : (
              <p className="text-[var(--text-secondary)] italic">Lời bài hát đang được cập nhật...</p>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
