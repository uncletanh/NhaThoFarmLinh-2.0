'use client';

import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { supabase } from '@/../utils/supabase/client';

type Track = {
  id: string;
  title: string;
  artist: string;
  cover: string;
  src: string;
  lyrics: string;
};

interface MusicContextType {
  isPlaying: boolean;
  currentTrackIndex: number;
  currentTrack: Track | null;
  currentTime: number;
  duration: number;
  volume: number;
  isCrossfade: boolean;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  playTrack: (index: number) => void;
  seek: (time: number) => void;
  setVolume: (vol: number) => void;
  toggleCrossfade: () => void;
  playlist: Track[];
  audioRef: React.RefObject<HTMLAudioElement | null>;
  audioContextRef: React.RefObject<AudioContext | null>;
  analyserRef: React.RefObject<AnalyserNode | null>;
}

const MusicContext = createContext<MusicContextType | undefined>(undefined);

const normalizeTitle = (title: string) => title.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

const getLocalTrackAssets = (title: string) => {
  const normalized = normalizeTitle(title);

  if (normalized.includes('2478 kilometers of wind') || normalized.includes('2 478 kilometers of wind')) {
    return {
      cover: '/song/img/2478km of wind.png',
      src: '/song/mp3/2,478 Kilometers of Wind.mp3',
      lyrics: '/song/lrc/2,478 Kilometers of Wind.lrc',
    };
  }

  if (normalized.includes('flowers of suzhou')) {
    return {
      cover: '/song/img/Flowers of Suzhou.png',
      lyrics: '/song/lrc/Flower of Suzhou - JasperNguyen.lrc',
    };
  }

  if (normalized.includes('finally arrived in suzhou')) {
    return {
      cover: "/song/img/I've finally arrived in Suzhou.png",
      src: "/song/mp3/I've Finally Arrived in Suzhou.mp3",
      lyrics: "/song/lrc/I've Finally Arrived in Suzhou.lrc",
    };
  }

  if (normalized.includes('petals in the mist')) {
    return {
      cover: '/song/img/Petals in the Mist.png',
      src: '/song/mp3/Petals in the Mist.mp3',
      lyrics: '/song/lrc/Petals in the Mist.lrc',
    };
  }

  return null;
};

export function MusicProvider({ children }: { children: ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(100);
  const [isCrossfade, setIsCrossfade] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);

  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMusic = async () => {
      const { data, error } = await supabase.from('music_tracks').select('*').eq('is_public', true).order('created_at', { ascending: false });
      if (!error && data) {
        // Map Supabase schema to local Track schema
        const mappedPlaylist: Track[] = data.map(t => {
          const localAssets = getLocalTrackAssets(t.title);
          return {
            id: t.id,
            title: t.title,
            artist: t.artist,
            cover: localAssets?.cover || t.cover_url || '/logo.png',
            src: localAssets?.src || t.src_url,
            lyrics: localAssets?.lyrics || t.lyrics_url || '',
          };
        });
        setPlaylist(mappedPlaylist);
      }
      setLoading(false);
    };
    fetchMusic();
  }, []);

  const currentTrack = playlist.length > 0 ? playlist[currentTrackIndex] : null;

  useEffect(() => {
    // Initialize Web Audio API ONLY on first user interaction to satisfy browser policies
    const initAudioContext = () => {
      if (!audioContextRef.current && audioRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const actx = new AudioContextClass();
        audioContextRef.current = actx;
        
        const analyser = actx.createAnalyser();
        analyser.fftSize = 256;
        analyserRef.current = analyser;

        const source = actx.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(actx.destination);
        sourceNodeRef.current = source;
      }
    };

    const handleInteraction = () => {
      initAudioContext();
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }
      document.removeEventListener('click', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    return () => document.removeEventListener('click', handleInteraction);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => nextTrack();

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(e => console.error("Playback failed:", e));
      if (audioContextRef.current?.state === 'suspended') {
        audioContextRef.current.resume();
      }
    }
  };

  const nextTrack = () => {
    if (playlist.length === 0) return;
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    if (playlist.length === 0) return;
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const playTrack = (index: number) => {
    if (index >= 0 && index < playlist.length) {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
    }
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const setVolume = (vol: number) => {
    setVolumeState(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol / 100;
    }
  };

  const toggleCrossfade = () => setIsCrossfade(!isCrossfade);

  // Auto play when track changes if was playing
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack?.src) return;

    audio.src = currentTrack.src;
    audio.load();
    if (isPlaying) {
      audio.play().catch(e => console.error("Auto-play failed:", e));
    }
  }, [currentTrack?.src]);

  return (
    <MusicContext.Provider value={{
      isPlaying, currentTrackIndex, currentTrack, currentTime, duration, volume, isCrossfade,
      togglePlay, nextTrack, prevTrack, playTrack, seek, setVolume, toggleCrossfade,
      audioRef, audioContextRef, analyserRef, playlist
    }}>
      {children}
      <audio ref={audioRef} preload="auto" />
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (context === undefined) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
