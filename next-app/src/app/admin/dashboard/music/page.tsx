'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/../utils/supabase/client';
import Link from 'next/link';
import { Pencil, Trash2, Plus, ArrowLeft } from 'lucide-react';

export default function AdminMusicList() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('music_tracks')
      .select('id, title, artist, src_url, created_at')
      .order('created_at', { ascending: false });
    
    if (data) setTracks(data);
    setLoading(false);
  };

  const handleDelete = async (id: string, title: string, srcUrl: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"? This will also remove the audio file from storage.`)) return;
    
    // First delete from DB
    const { error: dbError } = await supabase.from('music_tracks').delete().eq('id', id);
    if (dbError) {
      alert('Error deleting track: ' + dbError.message);
      return;
    }
    
    // Attempt to delete file from storage if it is stored in our bucket
    // Note: The src_url is a full URL. We need to extract the path.
    // Assuming the URL format contains 'storage/v1/object/public/music/'
    if (srcUrl.includes('storage/v1/object/public/music/')) {
      const fileName = srcUrl.split('music/')[1];
      if (fileName) {
        await supabase.storage.from('music').remove([fileName]);
      }
    }
    
    setTracks(tracks.filter(t => t.id !== id));
  };

  return (
    <main className="page-wrapper container mx-auto px-4 py-10 max-w-5xl">
      <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-neutral-800 mb-8 transition-colors text-sm uppercase tracking-widest">
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-neutral-800">Music Manager</h1>
        <Link 
          href="/admin/dashboard/music/create"
          className="flex items-center gap-2 px-6 py-3 bg-neutral-800 text-white rounded-sm text-xs uppercase tracking-widest font-bold hover:bg-neutral-900 transition-colors"
        >
          <Plus size={16} /> Add New Track
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-widest text-gray-500 font-sans">
              <th className="p-4 font-normal">Track Info</th>
              <th className="p-4 font-normal w-32 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={2} className="p-10 text-center text-gray-400">Loading...</td>
              </tr>
            ) : tracks.length === 0 ? (
              <tr>
                <td colSpan={2} className="p-10 text-center text-gray-400">No tracks found.</td>
              </tr>
            ) : (
              tracks.map(track => (
                <tr key={track.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="font-serif text-lg text-neutral-800 mb-1">{track.title}</div>
                    <div className="text-sm text-gray-500 font-sans uppercase tracking-widest">{track.artist}</div>
                  </td>
                  <td className="p-4 flex items-center justify-end gap-2">
                    <Link 
                      href={`/admin/dashboard/music/edit/${track.id}`}
                      className="p-2 text-gray-400 hover:text-amber-600 transition-colors border border-transparent hover:border-amber-200 rounded-sm bg-transparent hover:bg-amber-50"
                      title="Edit Track"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(track.id, track.title, track.src_url)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors border border-transparent hover:border-red-200 rounded-sm bg-transparent hover:bg-red-50"
                      title="Delete Track"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
