'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/../utils/supabase/client';
import { ArrowLeft } from 'lucide-react';
import { notFound } from 'next/navigation';

export default function PoetryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [poem, setPoem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoem = async () => {
      const { data, error } = await supabase
        .from('poems')
        .select('*')
        .eq('id', resolvedParams.id)
        .single();
      
      if (data) setPoem(data);
      setLoading(false);
    };
    fetchPoem();
  }, [resolvedParams.id]);

  if (loading) {
    return <main className="page-wrapper container mx-auto px-4 max-w-3xl py-20 text-center text-gray-500 animate-pulse">Loading poem...</main>;
  }

  if (!poem && !loading) {
    return <main className="page-wrapper container mx-auto px-4 max-w-3xl py-20 text-center text-gray-500">Poem not found.</main>;
  }

  return (
    <main className="page-wrapper container reading-page poem-reading-page">
      <Link href="/poetry" className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-color)] mb-10 transition-colors">
        <ArrowLeft size={20} />
        <span className="font-sans uppercase text-sm tracking-widest">Back to Collection</span>
      </Link>

      <article className="reading-article poem-reading-article">
        <header className="mb-10 pb-10 border-b border-[var(--border-color)] text-center">
          <div className="text-sm font-sans uppercase tracking-widest text-[var(--text-secondary)] mb-4">{poem.date}</div>
          <h1 className="text-4xl md:text-5xl font-serif text-[var(--text-primary)] leading-tight mb-6">{poem.title}</h1>
          <div className="flex flex-wrap justify-center gap-2">
            {poem.tags?.map((t: string) => (
              <span key={t} className="text-xs uppercase px-3 py-1 bg-[var(--bg-color)] rounded-full border border-[var(--border-color)] text-[var(--text-secondary)]">{t}</span>
            ))}
          </div>
        </header>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="whitespace-pre-line font-serif text-xl md:text-2xl leading-relaxed text-[var(--text-primary)] text-center">
            {poem.content}
          </div>
        </div>

        {poem.insight && (
          <div className="mt-16 pt-10 border-t border-[var(--border-color)]">
            <h3 className="font-sans uppercase tracking-widest text-sm text-[var(--accent-color)] mb-4 flex items-center justify-center gap-2">
              <span>👁️‍🗨️</span> Curator's Note
            </h3>
            <p className="text-[var(--text-secondary)] italic text-center max-w-xl mx-auto leading-relaxed">
              {poem.insight}
            </p>
          </div>
        )}
      </article>
    </main>
  );
}
