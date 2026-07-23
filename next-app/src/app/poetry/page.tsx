'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/../utils/supabase/client';
import Link from 'next/link';
import { ArrowUpDown, ChevronLeft, ChevronRight, Eye, Search, SlidersHorizontal, X } from 'lucide-react';
import {
  comparePoems,
  formatPoemDate,
  type PoemSortOrder,
} from '@/utils/poemDate';

const ITEMS_PER_PAGE = 9;

type Poem = {
  id: string;
  title: string;
  date: string;
  created_at?: string;
  view_count?: number | null;
  preview?: string;
  tags?: string[];
};

export default function PoetryPage() {
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [sortOrder, setSortOrder] = useState<PoemSortOrder>('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [allTags, setAllTags] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      setDebouncedSearch(searchTerm.trim());
    }, 350);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const fetchAllTags = async () => {
      const { data } = await supabase.from('poems').select('tags').eq('is_public', true);
      if (data) {
        const tags = Array.from(new Set<string>(data.flatMap((poem) => poem.tags || []))).sort();
        setAllTags(tags);
      }
    };

    fetchAllTags();
  }, []);

  useEffect(() => {
    const fetchPoems = async () => {
      setLoading(true);
      let query = supabase.from('poems').select('*').eq('is_public', true);

      if (activeTag !== 'All') query = query.contains('tags', [activeTag]);
      if (debouncedSearch) query = query.ilike('title', `%${debouncedSearch}%`);

      const { data, error } = await query;

      if (!error && data) {
        const sortedPoems = (data as Poem[]).sort((first, second) => comparePoems(first, second, sortOrder));
        const from = (currentPage - 1) * ITEMS_PER_PAGE;
        setPoems(sortedPoems.slice(from, from + ITEMS_PER_PAGE));
        setTotalResults(sortedPoems.length);
        setTotalPages(Math.max(1, Math.ceil(sortedPoems.length / ITEMS_PER_PAGE)));
      }
      setLoading(false);
    };

    fetchPoems();
  }, [currentPage, activeTag, sortOrder, debouncedSearch]);

  const displayTags = ['All', ...allTags];
  const hasActiveFilters = Boolean(searchTerm || activeTag !== 'All' || sortOrder !== 'newest');

  const clearFilters = () => {
    setSearchTerm('');
    setDebouncedSearch('');
    setActiveTag('All');
    setSortOrder('newest');
    setCurrentPage(1);
  };

  return (
    <main className="page-wrapper container collection-page poetry-collection">
      <div className="section-kicker mb-2">Tuyển tập</div>
      <h1 className="section-title">Thơ</h1>

      <section className="filter-studio" aria-label="Bộ lọc tuyển tập thơ">
        <div className="filter-studio-head">
          <div className="filter-studio-title">
            <span className="filter-studio-icon"><SlidersHorizontal size={17} /></span>
            <div>
              <strong>Lọc tuyển tập</strong>
              <span>{loading ? 'Đang cập nhật…' : `${totalResults} bài thơ được tìm thấy`}</span>
            </div>
          </div>
          {hasActiveFilters && (
            <button type="button" className="filter-reset" onClick={clearFilters}>
              <X size={14} /> Xóa bộ lọc
            </button>
          )}
        </div>

        <div className="filter-studio-controls">
          <label className="search-control filter-search-control">
            <Search size={18} />
            <span className="sr-only">Tìm theo tựa đề</span>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="collection-search-input"
              placeholder="Tìm một tựa thơ..."
            />
            {searchTerm && (
              <button type="button" className="search-clear" onClick={() => setSearchTerm('')} aria-label="Xóa từ khóa tìm kiếm">
                <X size={15} />
              </button>
            )}
          </label>

          <label className="sort-shell">
            <ArrowUpDown size={16} />
            <span className="sr-only">Sắp xếp tuyển tập</span>
            <select
              value={sortOrder}
              onChange={(event) => { setSortOrder(event.target.value as PoemSortOrder); setCurrentPage(1); }}
              className="sort-control"
            >
              <option value="newest">Mới nhất trước</option>
              <option value="oldest">Cũ nhất trước</option>
              <option value="most_viewed">Được đọc nhiều nhất</option>
            </select>
          </label>
        </div>

        <div className="filter-tag-section">
          <span className="filter-tag-label">Chủ đề</span>
          <div className="tag-filter-row" role="group" aria-label="Lọc theo chủ đề">
            {displayTags.map((tag) => (
              <button
                type="button"
                key={tag}
                onClick={() => { setActiveTag(tag); setCurrentPage(1); }}
                className={activeTag === tag ? 'active' : ''}
                aria-pressed={activeTag === tag}
              >
                {tag === 'All' ? 'Tất cả' : tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="collection-grid poetry-grid">
        {loading ? (
          <p className="text-gray-500 col-span-full text-center py-20 animate-pulse">Đang mở tuyển tập...</p>
        ) : poems.length === 0 ? (
          <div className="filter-empty col-span-full">
            <Search size={24} />
            <h2>Chưa tìm thấy vần thơ phù hợp</h2>
            <p>Thử một từ khóa hoặc chủ đề khác nhé.</p>
            <button type="button" onClick={clearFilters}>Xem toàn bộ tuyển tập</button>
          </div>
        ) : (
          poems.map((poem) => (
            <div key={poem.id} className="collection-card poem-collection-card group">
              <div>
                <div className="poem-card-meta">
                  <span>{formatPoemDate(poem.date)}</span>
                  <span title="Lượt đọc"><Eye size={12} /> {poem.view_count ?? 0}</span>
                </div>
                <div className="min-h-[68px] mb-4">
                  <h2 className="text-2xl font-serif font-bold text-neutral-800 leading-snug group-hover:text-amber-700 transition-colors line-clamp-2" title={poem.title}>{poem.title}</h2>
                </div>
                <div className="flex flex-wrap content-start gap-2 mb-6 h-[28px] overflow-hidden">
                  {poem.tags?.slice(0, 2).map((tag: string) => (
                    <span key={tag} className="text-[10px] uppercase tracking-widest px-3 py-1 bg-gray-50 rounded-sm border border-gray-100 text-gray-500 whitespace-nowrap">{tag}</span>
                  ))}
                  {poem.tags && poem.tags.length > 2 && (
                    <span className="text-[10px] uppercase tracking-widest px-3 py-1 bg-gray-100 rounded-sm border border-gray-200 text-gray-600 font-bold whitespace-nowrap">+{poem.tags.length - 2}</span>
                  )}
                </div>
                <div className="min-h-[112px] mb-8">
                  <p className="text-gray-600 italic line-clamp-4 leading-relaxed">{poem.preview}</p>
                </div>
              </div>

              <Link href={`/poetry/${poem.id}`} className="text-xs uppercase tracking-[0.15em] font-bold text-neutral-800 mt-auto opacity-0 group-hover:opacity-100 transition-opacity border-b border-transparent group-hover:border-neutral-800 pb-0.5 inline-block w-fit">
                Đọc trọn bài
              </Link>
            </div>
          ))
        )}
      </div>

      {!loading && totalPages > 1 && (
        <nav className="collection-pagination" aria-label="Phân trang tuyển tập">
          <button type="button" onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))} disabled={currentPage === 1} aria-label="Trang trước">
            <ChevronLeft size={20} />
          </button>
          <span>Trang {currentPage} <i>/</i> {totalPages}</span>
          <button type="button" onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))} disabled={currentPage === totalPages} aria-label="Trang sau">
            <ChevronRight size={20} />
          </button>
        </nav>
      )}
    </main>
  );
}
