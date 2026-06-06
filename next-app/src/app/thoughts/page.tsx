'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/../utils/supabase/client';
import { Search } from 'lucide-react';

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
    <main className="page-wrapper container mx-auto px-4">
      <h1 className="section-title mb-8">Fleeting Thoughts</h1>
      
      <div className="relative mb-10 max-w-2xl mx-auto">
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 pl-12 border border-[var(--border-color)] bg-transparent text-[var(--text-primary)] rounded-[30px] transition-all focus:outline-none focus:border-[var(--accent-color)]"
          placeholder="Search thoughts..."
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={20} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {loading ? (
          <p className="text-[var(--text-secondary)] col-span-full text-center py-10 animate-pulse">Loading thoughts...</p>
        ) : filteredThoughts.length === 0 ? (
          <p className="text-[var(--text-secondary)] col-span-full text-center py-10">No thoughts found.</p>
        ) : (
          filteredThoughts.map(t => (
            <article key={t.id} className="p-8 border border-[var(--border-color)] bg-[var(--nav-bg)] rounded-2xl hover:shadow-lg hover:border-[var(--accent-color)] transition-all">
              <div className="text-sm text-[var(--text-secondary)] mb-3">{t.date}</div>
              <h2 className="text-2xl font-bold font-serif mb-4 text-[var(--text-primary)]">{t.title}</h2>
              <div className="opacity-80 leading-relaxed font-sans text-sm whitespace-pre-line text-[var(--text-primary)]">
                {t.content}
              </div>
            </article>
          ))
        )}
      </div>
    </main>
  );
}
