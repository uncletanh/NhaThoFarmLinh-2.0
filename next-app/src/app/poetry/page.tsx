'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/../utils/supabase/client';
import Link from 'next/link';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';

const ITEMS_PER_PAGE = 9;

export default function PoetryPage() {
  const [poems, setPoems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    fetchPoems();
    fetchAllTags();
  }, [currentPage, activeTag, sortOrder]);

  const fetchAllTags = async () => {
    // Fetch all tags to build the filter menu
    const { data } = await supabase.from('poems').select('tags').eq('is_public', true);
    if (data) {
      const tags = Array.from(new Set(data.flatMap(p => p.tags || []))).sort();
      setAllTags(tags);
    }
  };

  const fetchPoems = async () => {
    setLoading(true);
    let query = supabase.from('poems').select('*', { count: 'exact' }).eq('is_public', true);

    // Apply tag filter
    if (activeTag !== 'All') {
      query = query.contains('tags', [activeTag]);
    }

    // Note: To implement full-text search efficiently in Supabase, we would typically use 
    // PostgreSQL full text search (e.g. .textSearch()). For this frontend, if searchTerm 
    // is applied, we might need a slightly different query or client-side filtering if it's complex.
    // For now, we'll do an ilike filter on title for server-side search if term exists.
    if (searchTerm) {
      query = query.ilike('title', `%${searchTerm}%`);
    }

    // Pagination
    const from = (currentPage - 1) * ITEMS_PER_PAGE;
    const to = from + ITEMS_PER_PAGE - 1;

    const { data, count, error } = await query
      .order('date', { ascending: sortOrder === 'oldest' })
      .range(from, to);

    if (!error && data) {
      setPoems(data);
      if (count) {
        setTotalPages(Math.ceil(count / ITEMS_PER_PAGE));
      } else if (data.length === 0 && currentPage === 1) {
         setTotalPages(1);
      }
    }
    setLoading(false);
  };

  // Re-fetch when search term changes (debounced slightly or triggered via button)
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setCurrentPage(1); // Reset to page 1 on new search
      fetchPoems();
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const displayTags = ['All', ...allTags];

  return (
    <main className="page-wrapper container">
      <h1 className="section-title">Poetry Collection</h1>
      
      {/* Search Bar & Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-grow">
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 pl-12 border border-gray-200 bg-transparent text-neutral-800 rounded-sm transition-all focus:outline-none focus:border-neutral-400"
            placeholder="Search by title..."
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>
        
        <select 
          value={sortOrder} 
          onChange={(e) => { setSortOrder(e.target.value); setCurrentPage(1); }}
          className="p-4 border border-gray-200 bg-transparent text-neutral-800 rounded-sm focus:outline-none focus:border-neutral-400 font-sans text-sm uppercase tracking-widest min-w-[200px]"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* Filter Tags */}
      <div className="flex gap-4 overflow-x-auto pb-4 mb-8 scrollbar-hide">
        {displayTags.map(tag => (
          <button 
            key={tag}
            onClick={() => { setActiveTag(tag); setCurrentPage(1); }}
            className={`whitespace-nowrap px-6 py-2 border rounded-sm text-xs uppercase tracking-widest transition-all ${activeTag === tag ? 'bg-neutral-800 text-white border-neutral-800' : 'border-gray-200 text-gray-500 hover:border-neutral-400 hover:text-neutral-800'}`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Masonry-like Grid for Poetry */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {loading ? (
          <p className="text-gray-500 col-span-full text-center py-20 animate-pulse">Loading poetry collection...</p>
        ) : poems.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center py-20 italic">No poems found matching your criteria.</p>
        ) : (
          poems.map(p => (
            <div key={p.id} className="flex flex-col p-8 border border-gray-100 rounded-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white h-full justify-between group cursor-pointer">
              <div>
                <div className="text-xs text-gray-400 uppercase tracking-[0.2em] mb-4">{p.date}</div>
                <div className="min-h-[68px] mb-4">
                  <h2 className="text-2xl font-serif font-bold text-neutral-800 leading-snug group-hover:text-amber-700 transition-colors line-clamp-2" title={p.title}>{p.title}</h2>
                </div>
                <div className="flex flex-wrap content-start gap-2 mb-6 h-[28px] overflow-hidden">
                  {p.tags?.slice(0, 2).map((t: string) => (
                    <span key={t} className="text-[10px] uppercase tracking-widest px-3 py-1 bg-gray-50 rounded-sm border border-gray-100 text-gray-500 whitespace-nowrap">{t}</span>
                  ))}
                  {p.tags && p.tags.length > 2 && (
                    <span className="text-[10px] uppercase tracking-widest px-3 py-1 bg-gray-100 rounded-sm border border-gray-200 text-gray-600 font-bold whitespace-nowrap">
                      +{p.tags.length - 2}
                    </span>
                  )}
                </div>
                <div className="min-h-[112px] mb-8">
                  <p className="text-gray-600 italic line-clamp-4 leading-relaxed">{p.preview}</p>
                </div>
              </div>
              
              <Link href={`/poetry/${p.id}`} className="text-xs uppercase tracking-[0.15em] font-bold text-neutral-800 mt-auto opacity-0 group-hover:opacity-100 transition-opacity border-b border-transparent group-hover:border-neutral-800 pb-0.5 inline-block w-fit">
                Read Full Poem
              </Link>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-6 mt-20 mb-10">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 border border-gray-200 rounded-sm text-gray-500 hover:text-neutral-800 hover:border-neutral-800 disabled:opacity-30 disabled:hover:border-gray-200 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          
          <span className="text-sm font-serif text-neutral-600">
            Page {currentPage} of {totalPages}
          </span>
          
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2 border border-gray-200 rounded-sm text-gray-500 hover:text-neutral-800 hover:border-neutral-800 disabled:opacity-30 disabled:hover:border-gray-200 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </main>
  );
}
