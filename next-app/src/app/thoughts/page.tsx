'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/../utils/supabase/client';
import { Search } from 'lucide-react';
import Link from 'next/link';

export default function ThoughtsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [thoughts, setThoughts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThoughts = async () => {
      const { data } = await supabase.from('thoughts').select('*').order('created_at', { ascending: false });
      if (data) setThoughts(data);
      setLoading(false);
    };
    fetchThoughts();
  }, []);

  const filteredThoughts = thoughts.filter(t => {
    const term = searchTerm.toLowerCase();
    return term === '' || 
      t.title.toLowerCase().includes(term) || 
      t.content.toLowerCase().includes(term);
  });

  return (
    <main className="page-wrapper container collection-page thoughts-collection">
      <div className="section-kicker mb-2">Nhật ký</div>
      <h1 className="section-title mb-8">Góc suy nghĩ</h1>
      
      <label className="search-control collection-search-single">
        <Search size={18} />
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="collection-search-input"
          placeholder="Tìm trong những suy nghĩ..."
        />
      </label>

      <div className="collection-grid thoughts-grid">
        {loading ? (
          <p className="text-[var(--text-secondary)] col-span-full text-center py-10 animate-pulse">Đang mở sổ tay...</p>
        ) : filteredThoughts.length === 0 ? (
          <p className="text-[var(--text-secondary)] col-span-full text-center py-10">Không tìm thấy ghi chép phù hợp.</p>
        ) : (
          filteredThoughts.map(t => (
            <article key={t.id} className="collection-card thought-collection-card">
              <div className="text-sm text-[var(--text-secondary)] mb-3">{t.date}</div>
              <h2 className="text-2xl font-bold font-serif mb-4 text-[var(--text-primary)]">{t.title}</h2>
              <div className="opacity-80 leading-relaxed font-sans text-sm whitespace-pre-line text-[var(--text-primary)] line-clamp-4">
                {t.content}
              </div>
              <Link href={`/thoughts/${t.id}`} className="inline-block mt-6 text-xs font-bold text-[var(--accent-color)] hover:underline uppercase tracking-widest">
                Đọc tiếp ⟶
              </Link>
            </article>
          ))
        )}
      </div>
    </main>
  );
}
