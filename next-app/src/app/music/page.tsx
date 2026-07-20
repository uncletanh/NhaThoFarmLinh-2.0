'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useMusic } from '@/context/MusicContext';
import {
  ListMusic,
  Mic2,
  Pause,
  Play,
  Repeat,
  Search,
  Shuffle,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react';

export default function MusicPage() {
  const {
    currentTrack,
    currentTrackIndex,
    playlist,
    playTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    nextTrack,
    prevTrack,
    seek,
    setVolume,
  } = useMusic();
  const [activeTab, setActiveTab] = useState<'songs' | 'lyrics'>('songs');
  const [query, setQuery] = useState('');
  const [lyrics, setLyrics] = useState<{ time: number; text: string }[]>([]);
  const lyricsContainerRef = useRef<HTMLDivElement>(null);

  const formatTime = (time: number) => {
    if (!Number.isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const visibleTracks = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return playlist;
    return playlist.filter((track) =>
      `${track.title} ${track.artist}`.toLowerCase().includes(term),
    );
  }, [playlist, query]);

  const nextUp = playlist.length
    ? playlist[(currentTrackIndex + 1) % playlist.length]?.title
    : '';

  useEffect(() => {
    if (!currentTrack?.lyrics) {
      setLyrics([]);
      return;
    }

    fetch(currentTrack.lyrics)
      .then((response) => response.text())
      .then((text) => {
        const parsed = text.split('\n').flatMap((line) => {
          const match = line.match(/\[(\d{2}):(\d{2})\.(\d{2,3})\](.*)/);
          if (!match) return [];
          const minutes = Number(match[1]);
          const seconds = Number(match[2]);
          const milliseconds = Number(match[3]) * (match[3].length === 2 ? 10 : 1);
          return [{ time: minutes * 60 + seconds + milliseconds / 1000, text: match[4].trim() }];
        });
        setLyrics(parsed);
      })
      .catch(() => setLyrics([]));
  }, [currentTrack?.lyrics]);

  useEffect(() => {
    if (activeTab !== 'lyrics' || !lyricsContainerRef.current) return;
    const activeIndex = lyrics.findIndex((line, index) => {
      const nextLine = lyrics[index + 1];
      return currentTime >= line.time && (!nextLine || currentTime < nextLine.time);
    });
    if (activeIndex < 0) return;
    const activeElement = lyricsContainerRef.current.children[activeIndex] as HTMLElement | undefined;
    activeElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [activeTab, currentTime, lyrics]);

  if (!currentTrack) {
    return (
      <main className="music-screen music-empty">
        <p>Đang mở phòng nhạc...</p>
      </main>
    );
  }

  return (
    <main className="music-screen">
      <div className="music-layout">
        <section className="turntable-panel" aria-label="Trình phát nhạc">
          <div className={`vinyl-player ${isPlaying ? 'is-playing' : ''}`}>
            <div className="vinyl-grooves">
              <img
                src={currentTrack.cover || '/logo.png'}
                alt={`Ảnh bìa ${currentTrack.title}`}
                onError={(event) => { event.currentTarget.src = '/logo.png'; }}
              />
              <span className="vinyl-hole" />
            </div>
          </div>

          <div className="track-heading">
            <h1>{currentTrack.title}</h1>
            <p>{currentTrack.artist}</p>
            <div className={`equalizer ${isPlaying ? 'is-playing' : ''}`} aria-hidden="true">
              <span /><span /><span /><span /><span />
            </div>
          </div>

          <div className="player-progress">
            <input
              aria-label="Vị trí bài hát"
              type="range"
              min="0"
              max={duration || 1}
              value={Math.min(currentTime, duration || 1)}
              onChange={(event) => seek(Number(event.target.value))}
            />
            <div><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div>
          </div>

          <div className="player-controls">
            <button aria-label="Phát ngẫu nhiên"><Shuffle size={18} /></button>
            <button aria-label="Bài trước" onClick={prevTrack}><SkipBack size={26} fill="currentColor" /></button>
            <button className="primary-play" aria-label={isPlaying ? 'Tạm dừng' : 'Phát'} onClick={togglePlay}>
              {isPlaying ? <Pause size={25} fill="currentColor" /> : <Play size={25} fill="currentColor" />}
            </button>
            <button aria-label="Bài sau" onClick={nextTrack}><SkipForward size={26} fill="currentColor" /></button>
            <button aria-label="Lặp lại"><Repeat size={18} /></button>
          </div>

          <div className="volume-control">
            {volume === 0 ? <VolumeX size={17} /> : <Volume2 size={17} />}
            <input
              aria-label="Âm lượng"
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(event) => setVolume(Number(event.target.value))}
            />
            <span>{volume}%</span>
          </div>

          {nextUp && <div className="next-up"><span>Tiếp theo</span><strong>{nextUp}</strong></div>}
        </section>

        <section className="music-library" aria-label="Thư viện nhạc">
          <div className="music-tabs" role="tablist" aria-label="Nội dung phòng nhạc">
            <button role="tab" aria-selected={activeTab === 'songs'} onClick={() => setActiveTab('songs')} className={activeTab === 'songs' ? 'active' : ''}>
              <ListMusic size={16} /> Bài hát
            </button>
            <button role="tab" aria-selected={activeTab === 'lyrics'} onClick={() => setActiveTab('lyrics')} className={activeTab === 'lyrics' ? 'active' : ''}>
              <Mic2 size={16} /> Lời
            </button>
          </div>

          {activeTab === 'songs' ? (
            <div className="songs-panel" role="tabpanel">
              <label className="music-search">
                <Search size={16} />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Tìm bài hát hoặc nghệ sĩ..." />
              </label>
              <div className="track-list">
                {visibleTracks.map((track) => {
                  const realIndex = playlist.findIndex((item) => item.id === track.id);
                  const isCurrent = realIndex === currentTrackIndex;
                  return (
                    <button key={track.id} onClick={() => playTrack(realIndex)} className={`track-row ${isCurrent ? 'active' : ''}`}>
                      <img src={track.cover || '/logo.png'} alt="" onError={(event) => { event.currentTarget.src = '/logo.png'; }} />
                      <span className="track-row-copy">
                        <strong>{track.title}</strong>
                        <small>{track.artist}</small>
                      </span>
                      <span className="track-row-action">{isCurrent && isPlaying ? 'Đang phát' : 'Phát'}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="lyrics-view" ref={lyricsContainerRef} role="tabpanel">
              {lyrics.length ? lyrics.map((line, index) => {
                const nextLine = lyrics[index + 1];
                const active = currentTime >= line.time && (!nextLine || currentTime < nextLine.time);
                return (
                  <button key={`${line.time}-${index}`} className={active ? 'active' : ''} onClick={() => seek(line.time)}>
                    {line.text || '...'}
                  </button>
                );
              }) : <p>Chưa có lời cho bài hát này.</p>}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
