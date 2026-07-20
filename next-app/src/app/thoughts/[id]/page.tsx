'use client';

import { useState, useEffect, use } from 'react';
import { supabase } from '@/../utils/supabase/client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ThoughtDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [thought, setThought] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThought = async () => {
      const { data } = await supabase.from('thoughts').select('*').eq('id', resolvedParams.id).single();
      if (data) {
        setThought(data);
      }
      setLoading(false);
    };
    fetchThought();
  }, [resolvedParams.id]);

  if (loading) {
    return (
      <main className="page-wrapper container mx-auto px-4 flex items-center justify-center min-h-[50vh]">
        <div className="animate-pulse text-[var(--text-secondary)] font-sans uppercase tracking-widest text-sm">
          Loading thought...
        </div>
      </main>
    );
  }

  if (!thought) {
    return (
      <main className="page-wrapper container mx-auto px-4 flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-4xl font-serif text-[var(--text-primary)] mb-4">Thought not found</h1>
        <Link href="/thoughts" className="text-[var(--accent-color)] hover:underline uppercase tracking-widest text-sm font-bold">
          Return to Thoughts
        </Link>
      </main>
    );
  }

  return (
    <main className="page-wrapper container reading-page thought-reading-page">
      <Link 
        href="/thoughts" 
        className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-10 transition-colors uppercase tracking-widest text-xs font-bold"
      >
        <ArrowLeft size={16} /> Back to Collection
      </Link>
      
      <article className="reading-article animate-fade-in">
        <div className="text-sm font-sans uppercase tracking-widest text-[var(--text-secondary)] mb-4">{thought.date}</div>
        <h1 className="text-4xl md:text-5xl font-serif text-[var(--text-primary)] leading-tight mb-8">{thought.title}</h1>
        
        <div className="w-12 h-[1px] bg-[var(--border-color)] mb-10"></div>
        
        <div className="text-lg md:text-xl font-serif leading-loose text-[var(--text-primary)] whitespace-pre-wrap opacity-90">
          {thought.content}
        </div>
      </article>
    </main>
  );
}
