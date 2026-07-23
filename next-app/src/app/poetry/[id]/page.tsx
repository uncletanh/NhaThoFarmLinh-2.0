'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/../utils/supabase/client';
import { ArrowLeft, Eye } from 'lucide-react';
import { formatPoemDate } from '@/utils/poemDate';

type Poem = {
  id: string;
  title: string;
  date: string;
  content: string;
  insight?: string;
  tags?: string[];
  view_count?: number | null;
};

export default function PoetryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [poem, setPoem] = useState<Poem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoem = async () => {
      const { data } = await supabase
        .from('poems')
        .select('*')
        .eq('id', resolvedParams.id)
        .single();
      
      if (data) {
        const fetchedPoem = data as Poem;
        const viewKey = `poem-viewed:${resolvedParams.id}`;

        if (!sessionStorage.getItem(viewKey)) {
          const { data: updatedCount, error: viewError } = await supabase.rpc(
            'increment_poem_view',
            { poem_id: resolvedParams.id },
          );

          if (!viewError) {
            const numericCount = Number(updatedCount);
            if (Number.isFinite(numericCount)) fetchedPoem.view_count = numericCount;
            sessionStorage.setItem(viewKey, '1');
          }
        }

        setPoem(fetchedPoem);
      }
      setLoading(false);
    };
    fetchPoem();
  }, [resolvedParams.id]);

  if (loading) {
    return <main className="page-wrapper container mx-auto px-4 max-w-3xl py-20 text-center text-gray-500 animate-pulse">Loading poem...</main>;
  }

  if (!poem) {
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
          <div className="poem-reading-meta">
            <span>{formatPoemDate(poem.date)}</span>
            <span><Eye size={14} /> {poem.view_count ?? 0} lượt đọc</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-[var(--text-primary)] leading-tight mb-6">{poem.title}</h1>
          <div className="flex flex-wrap justify-center gap-2">
            {poem.tags?.map((t) => (
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
              Ghi chú của tác giả
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
