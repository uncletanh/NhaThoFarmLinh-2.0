'use client';

import { useMusic } from '@/context/MusicContext';
import { Play, Pause, SkipForward, SkipBack, Music } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MiniPlayer() {
  const { currentTrack, isPlaying, togglePlay, nextTrack, prevTrack } = useMusic();
  const pathname = usePathname();

  // Hide the mini player if we are already on the dedicated music page
  if (pathname === '/music' || !currentTrack) return null;

  return (
    <div className="fixed bottom-6 left-6 md:bottom-10 md:left-10 z-[999] flex items-center gap-4 bg-[var(--nav-bg)] border border-[var(--border-color)] p-2 pr-6 rounded-full shadow-2xl backdrop-blur-md animate-fade-in-up">
      
      <Link href="/music" className="relative group overflow-hidden rounded-full w-14 h-14 border border-[var(--border-color)] cursor-pointer">
        {currentTrack.cover ? (
          <img 
            src={currentTrack.cover} 
            alt={currentTrack.title}
            className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'animate-[spin_10s_linear_infinite]' : ''}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[var(--bg-color)]">
            <Music size={20} className="text-[var(--text-secondary)]" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
          <span className="text-white text-xs font-bold uppercase tracking-wider">Mở</span>
        </div>
      </Link>

      <div className="flex flex-col justify-center max-w-[150px] md:max-w-[200px]">
        <Link href="/music" className="text-sm font-bold truncate text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors">
          {currentTrack.title}
        </Link>
        <span className="text-xs text-[var(--text-secondary)] truncate">
          {currentTrack.artist}
        </span>
      </div>

      <div className="flex items-center gap-2 ml-2">
        <button onClick={prevTrack} className="p-2 text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-colors">
          <SkipBack size={18} />
        </button>
        <button onClick={togglePlay} className="p-3 bg-[var(--accent-color)] text-[var(--bg-color)] rounded-full hover:scale-105 transition-transform shadow-lg">
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
        </button>
        <button onClick={nextTrack} className="p-2 text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-colors">
          <SkipForward size={18} />
        </button>
      </div>
      
    </div>
  );
}
