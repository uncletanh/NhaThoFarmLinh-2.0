'use client';

import { useState } from 'react';
import { supabase } from '@/../utils/supabase/client';
import { ArrowLeft, Upload, Music, Image as ImageIcon, FileText } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminMusicCreate() {
  const router = useRouter();

  // Form states
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('Original Compositions');
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [lyricsFile, setLyricsFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const uploadFile = async (bucket: string, file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const { data, error } = await supabase.storage.from(bucket).upload(fileName, file);
    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);
    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coverFile || !audioFile) {
      alert("Please select both a Cover image and an Audio file.");
      return;
    }

    setSaving(true);
    try {
      // 1. Upload Cover
      const cover_url = await uploadFile('covers', coverFile);
      
      // 2. Upload Audio
      const src_url = await uploadFile('audio', audioFile);

      // 3. Upload Lyrics (optional)
      let lyrics_url = null;
      if (lyricsFile) {
        lyrics_url = await uploadFile('lyrics', lyricsFile);
      }

      // 4. Insert DB Record
      const { error } = await supabase.from('music_tracks').insert([{
        title,
        artist,
        cover_url,
        src_url,
        lyrics_url
      }]);

      if (error) throw error;

      alert('Track uploaded successfully!');
      router.push('/admin/dashboard/music');

    } catch (err: any) {
      alert('Error uploading track: ' + err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="page-wrapper container mx-auto px-4 py-10 max-w-4xl">
      <Link href="/admin/dashboard/music" className="inline-flex items-center gap-2 text-gray-500 hover:text-neutral-800 mb-8 transition-colors text-sm uppercase tracking-widest">
        <ArrowLeft size={16} /> Back to Music List
      </Link>

      <div className="bg-white p-10 border border-gray-200 rounded-sm">
        <h2 className="text-3xl font-serif mb-8 text-neutral-800 flex items-center gap-3">
          <Upload size={28} /> Upload New Track
        </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-xs uppercase tracking-[0.1em] text-gray-500 mb-2">Track Title</label>
                <input type="text" required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Aftertaste of Spring" className="w-full py-2 px-0 bg-transparent border-0 border-b border-gray-300 rounded-none focus:ring-0 focus:border-neutral-800 transition-colors text-neutral-800 text-lg" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.1em] text-gray-500 mb-2">Artist</label>
                <input type="text" required value={artist} onChange={e => setArtist(e.target.value)} placeholder="e.g. Nhà Thơ Farm Lính" className="w-full py-2 px-0 bg-transparent border-0 border-b border-gray-300 rounded-none focus:ring-0 focus:border-neutral-800 transition-colors text-neutral-800 text-lg" />
              </div>
            </div>

            <div className="space-y-6 pt-4">
              {/* Cover Upload */}
              <div className="relative border-b border-gray-200 pb-4 flex items-center gap-4 group hover:border-neutral-800 transition-colors">
                <input id="cover-upload" type="file" accept="image/*" onChange={e => setCoverFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required />
                <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-sm">
                  <ImageIcon className="text-gray-400 group-hover:text-neutral-800 transition-colors" size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-gray-500 mb-1">Cover Image</p>
                  <p className="text-sm text-neutral-800">
                    {coverFile ? <span className="font-bold">{coverFile.name}</span> : 'Select *.jpg, *.png'}
                  </p>
                </div>
              </div>

              {/* Audio Upload */}
              <div className="relative border-b border-gray-200 pb-4 flex items-center gap-4 group hover:border-neutral-800 transition-colors">
                <input id="audio-upload" type="file" accept="audio/*" onChange={e => setAudioFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" required />
                <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-sm">
                  <Music className="text-gray-400 group-hover:text-neutral-800 transition-colors" size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-gray-500 mb-1">Audio File</p>
                  <p className="text-sm text-neutral-800">
                    {audioFile ? <span className="font-bold">{audioFile.name}</span> : 'Select *.mp3, *.wav'}
                  </p>
                </div>
              </div>

              {/* Lyrics Upload */}
              <div className="relative border-b border-gray-200 pb-4 flex items-center gap-4 group hover:border-neutral-800 transition-colors">
                <input id="lyrics-upload" type="file" accept=".lrc" onChange={e => setLyricsFile(e.target.files?.[0] || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <div className="w-12 h-12 bg-gray-50 flex items-center justify-center rounded-sm">
                  <FileText className="text-gray-400 group-hover:text-neutral-800 transition-colors" size={20} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-gray-500 mb-1">Lyrics File (Optional)</p>
                  <p className="text-sm text-neutral-800">
                    {lyricsFile ? <span className="font-bold">{lyricsFile.name}</span> : 'Select *.lrc'}
                  </p>
                </div>
              </div>
            </div>

            <button disabled={saving} type="submit" className="w-full py-4 mt-8 bg-neutral-800 text-white rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-900 transition-colors disabled:opacity-50">
              {saving ? 'Uploading to Supabase...' : 'Upload Track'}
            </button>
          </form>
      </div>
    </main>
  );
}
