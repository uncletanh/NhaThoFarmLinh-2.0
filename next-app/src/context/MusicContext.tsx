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
        const mappedPlaylist: Track[] = data.map(t => ({
          id: t.id,
          title: t.title,
          artist: t.artist,
          cover: t.cover_url,
          src: t.src_url,
          lyrics: t.lyrics_url || ''
        }));
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
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.src;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Auto-play failed:", e));
      }
    }
  }, [currentTrackIndex]);

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
