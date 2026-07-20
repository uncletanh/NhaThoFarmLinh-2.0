'use client';

import { useMusic } from '@/context/MusicContext';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MiniPlayer() {
  const { currentTrack, isPlaying, togglePlay, nextTrack, prevTrack } = useMusic();
  const pathname = usePathname();

  if (pathname === '/music' || !currentTrack) return null;

  return (
    <aside className="mini-player" aria-label="Trình phát nhạc thu nhỏ">
      <Link href="/music" className={`mini-cover ${isPlaying ? 'is-playing' : ''}`} aria-label="Mở phòng nhạc">
        <img
          src={currentTrack.cover || '/logo.png'}
          alt=""
          onError={(event) => { event.currentTarget.src = '/logo.png'; }}
        />
        <span />
      </Link>

      <Link href="/music" className="mini-track-copy">
        <strong>{currentTrack.title}</strong>
        <span>{currentTrack.artist}</span>
      </Link>

      <div className="mini-controls">
        <button onClick={prevTrack} aria-label="Bài trước"><SkipBack size={18} /></button>
        <button className="mini-play" onClick={togglePlay} aria-label={isPlaying ? 'Tạm dừng' : 'Phát'}>
          {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
        </button>
        <button onClick={nextTrack} aria-label="Bài sau"><SkipForward size={18} /></button>
      </div>
    </aside>
  );
}
