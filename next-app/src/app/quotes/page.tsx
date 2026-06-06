'use client';

import { useState } from 'react';
import { quotes } from '@/data/dataQuotes';
import { Search, Quote as QuoteIcon } from 'lucide-react';

export default function QuotesPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredQuotes = quotes?.filter(q => {
    const term = searchTerm.toLowerCase();
    return term === '' || 
      q.text.toLowerCase().includes(term) || 
      q.author.toLowerCase().includes(term);
  }) || [];

  return (
    <main className="page-wrapper container mx-auto px-4">
      <h1 className="section-title mb-8">Collected Quotes</h1>
      
      <div className="relative mb-12 max-w-2xl mx-auto">
        <input 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 pl-12 border border-[var(--border-color)] bg-transparent text-[var(--text-primary)] rounded-[30px] transition-all focus:outline-none focus:border-[var(--accent-color)]"
          placeholder="Search by words or author..."
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" size={20} />
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
        {filteredQuotes.length === 0 ? (
          <p className="text-[var(--text-secondary)] text-center py-10 w-full">No quotes found.</p>
        ) : (
          filteredQuotes.map((q, i) => (
            <div key={i} className="break-inside-avoid p-8 border border-[var(--border-color)] bg-[var(--nav-bg)] rounded-2xl relative group hover:border-[var(--accent-color)] transition-all">
              <QuoteIcon className="absolute top-6 left-6 text-[var(--accent-color)] opacity-20 group-hover:opacity-40 transition-opacity" size={40} />
              <p className="text-xl leading-relaxed font-serif text-[var(--text-primary)] mb-6 relative z-10 pl-6 pt-4">
                "{q.text}"
              </p>
              <div className="text-sm font-sans uppercase tracking-wider text-[var(--accent-color)] text-right">
                — {q.author}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
