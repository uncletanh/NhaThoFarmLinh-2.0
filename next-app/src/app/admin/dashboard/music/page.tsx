'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/../utils/supabase/client';
import Link from 'next/link';
import { Pencil, Trash2, Plus, ArrowLeft, Search, Eye, EyeOff } from 'lucide-react';

export default function AdminMusicList() {
  const [tracks, setTracks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, public, private
  const [sortOrder, setSortOrder] = useState('newest'); // newest, oldest

  useEffect(() => {
    fetchTracks();
  }, [searchTerm, filterStatus, sortOrder]);

  const fetchTracks = async () => {
    setLoading(true);
    let query = supabase.from('music_tracks').select('id, title, artist, src_url, created_at, is_public');

    // Filter by search term
    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,artist.ilike.%${searchTerm}%`);
    }

    // Filter by status
    if (filterStatus === 'public') {
      query = query.eq('is_public', true);
    } else if (filterStatus === 'private') {
      query = query.eq('is_public', false);
    }

    // Sort
    query = query.order('created_at', { ascending: sortOrder === 'oldest' });
    
    const { data, error } = await query;
    if (data) setTracks(data);
    setLoading(false);
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase.from('music_tracks').update({ is_public: !currentStatus }).eq('id', id);
    if (error) {
      alert('Error updating status: ' + error.message);
    } else {
      setTracks(tracks.map(t => t.id === id ? { ...t, is_public: !currentStatus } : t));
    }
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

      {/* Toolbar: Search, Filter, Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border border-gray-200 bg-white text-neutral-800 rounded-sm focus:outline-none focus:border-neutral-400 text-sm"
            placeholder="Search by title or artist..."
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        </div>
        
        <select 
          value={filterStatus} 
          onChange={(e) => setFilterStatus(e.target.value)}
          className="p-3 border border-gray-200 bg-white text-neutral-800 rounded-sm focus:outline-none focus:border-neutral-400 font-sans text-xs uppercase tracking-widest min-w-[150px]"
        >
          <option value="all">All Status</option>
          <option value="public">Public</option>
          <option value="private">Hidden</option>
        </select>

        <select 
          value={sortOrder} 
          onChange={(e) => setSortOrder(e.target.value)}
          className="p-3 border border-gray-200 bg-white text-neutral-800 rounded-sm focus:outline-none focus:border-neutral-400 font-sans text-xs uppercase tracking-widest min-w-[150px]"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
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
                    <div className="font-serif text-lg text-neutral-800 mb-1 flex items-center gap-2">
                      {track.title}
                      {!track.is_public && <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-sm text-[10px] font-sans uppercase tracking-widest">Hidden</span>}
                    </div>
                    <div className="text-sm text-gray-500 font-sans uppercase tracking-widest">{track.artist}</div>
                  </td>
                  <td className="p-4 flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleToggleStatus(track.id, track.is_public)}
                      className={`p-2 transition-colors border border-transparent rounded-sm ${track.is_public ? 'text-gray-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50' : 'text-amber-500 hover:text-gray-400 hover:border-gray-200 hover:bg-gray-50'}`}
                      title={track.is_public ? "Hide Track" : "Publish Track"}
                    >
                      {track.is_public ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
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
