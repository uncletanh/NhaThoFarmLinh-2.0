'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/../utils/supabase/client';
import Link from 'next/link';
import { Pencil, Trash2, Plus, ArrowLeft, Search, Eye, EyeOff } from 'lucide-react';
import {
  comparePoems,
  formatPoemDate,
  type PoemSortOrder,
} from '@/utils/poemDate';

type AdminPoem = {
  id: string;
  title: string;
  date: string;
  created_at?: string;
  is_public: boolean;
  view_count?: number | null;
};

export default function AdminPoetryList() {
  const [poems, setPoems] = useState<AdminPoem[]>([]);
  const [loading, setLoading] = useState(true);

  // Search and Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, public, private
  const [sortOrder, setSortOrder] = useState<PoemSortOrder>('newest');

  useEffect(() => {
    const fetchPoems = async () => {
      setLoading(true);
      let query = supabase.from('poems').select('*');

      if (searchTerm) query = query.ilike('title', `%${searchTerm}%`);
      if (filterStatus === 'public') query = query.eq('is_public', true);
      if (filterStatus === 'private') query = query.eq('is_public', false);

      const { data } = await query;
      if (data) {
        setPoems((data as AdminPoem[]).sort((first, second) => comparePoems(first, second, sortOrder)));
      }
      setLoading(false);
    };

    fetchPoems();
  }, [searchTerm, filterStatus, sortOrder]);

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase.from('poems').update({ is_public: !currentStatus }).eq('id', id);
    if (error) {
      alert('Error updating status: ' + error.message);
    } else {
      // Update local state
      setPoems(poems.map((poem) => poem.id === id ? { ...poem, is_public: !currentStatus } : poem));
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    
    const { error } = await supabase.from('poems').delete().eq('id', id);
    if (error) {
      alert('Error deleting poem: ' + error.message);
    } else {
      setPoems(poems.filter((poem) => poem.id !== id));
    }
  };

  return (
    <main className="page-wrapper container mx-auto px-4 py-10 max-w-5xl">
      <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-neutral-800 mb-8 transition-colors text-sm uppercase tracking-widest">
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-neutral-800">Poetry Manager</h1>
        <Link 
          href="/admin/dashboard/poetry/create"
          className="flex items-center gap-2 px-6 py-3 bg-neutral-800 text-white rounded-sm text-xs uppercase tracking-widest font-bold hover:bg-neutral-900 transition-colors"
        >
          <Plus size={16} /> Add New Poem
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
            placeholder="Search by title..."
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
          <option value="private">Private (Draft)</option>
        </select>

        <select 
          value={sortOrder} 
          onChange={(e) => setSortOrder(e.target.value as PoemSortOrder)}
          className="p-3 border border-gray-200 bg-white text-neutral-800 rounded-sm focus:outline-none focus:border-neutral-400 font-sans text-xs uppercase tracking-widest min-w-[150px]"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="most_viewed">Most Viewed</option>
        </select>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-widest text-gray-500 font-sans">
              <th className="p-4 font-normal">Title</th>
              <th className="p-4 font-normal w-40 whitespace-nowrap">Date</th>
              <th className="p-4 font-normal w-24 whitespace-nowrap">Views</th>
              <th className="p-4 font-normal w-24">Status</th>
              <th className="p-4 font-normal w-40 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-10 text-center text-gray-400">Loading...</td>
              </tr>
            ) : poems.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-10 text-center text-gray-400">No poems found.</td>
              </tr>
            ) : (
              poems.map(poem => (
                <tr key={poem.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-serif text-lg text-neutral-800">{poem.title}</td>
                  <td className="p-4 text-sm text-gray-500 font-sans uppercase tracking-widest whitespace-nowrap">{formatPoemDate(poem.date)}</td>
                  <td className="p-4 text-sm text-gray-500 font-sans">{poem.view_count ?? 0}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-sm text-[10px] uppercase tracking-widest border ${poem.is_public ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                      {poem.is_public ? 'Public' : 'Private'}
                    </span>
                  </td>
                  <td className="p-4 flex items-center justify-end gap-2">
                    <button 
                      onClick={() => handleToggleStatus(poem.id, poem.is_public)}
                      className="p-2 text-gray-400 hover:text-neutral-800 transition-colors border border-transparent hover:border-gray-300 rounded-sm bg-transparent hover:bg-gray-100"
                      title={poem.is_public ? "Hide Poem (Make Private)" : "Publish Poem (Make Public)"}
                    >
                      {poem.is_public ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <Link 
                      href={`/admin/dashboard/poetry/edit/${poem.id}`}
                      className="p-2 text-gray-400 hover:text-amber-600 transition-colors border border-transparent hover:border-amber-200 rounded-sm bg-transparent hover:bg-amber-50"
                      title="Edit Poem"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(poem.id, poem.title)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors border border-transparent hover:border-red-200 rounded-sm bg-transparent hover:bg-red-50"
                      title="Delete Poem"
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
