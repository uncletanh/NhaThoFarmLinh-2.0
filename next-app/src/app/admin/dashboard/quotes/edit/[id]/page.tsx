'use client';

import { useState, useEffect, use } from 'react';
import { supabase } from '@/../utils/supabase/client';
import { ArrowLeft, Quote } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminQuotesEdit({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();

  // Form states
  const [quote, setQuoteText] = useState('');
  const [author, setAuthor] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuote = async () => {
      const { data, error } = await supabase.from('quotes').select('*').eq('id', resolvedParams.id).single();
      if (!error && data) {
        setQuoteText(data.quote);
        setAuthor(data.author);
      }
      setLoading(false);
    };
    fetchQuote();
  }, [resolvedParams.id]);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('quotes').select('*').order('created_at', { ascending: false });
    if (!error && data) setQuotes(data);
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase.from('quotes').update({
      quote,
      author
    }).eq('id', resolvedParams.id);

    setSaving(false);

    if (error) {
      alert('Error updating quote: ' + error.message);
    } else {
      alert('Quote updated successfully!');
      router.push('/admin/dashboard/quotes');
    }
  };

  return (
    <main className="page-wrapper container mx-auto px-4 py-10 max-w-4xl">
      <Link href="/admin/dashboard/quotes" className="inline-flex items-center gap-2 text-gray-500 hover:text-neutral-800 mb-8 transition-colors text-sm uppercase tracking-widest">
        <ArrowLeft size={16} /> Back to Quotes List
      </Link>

      <div className="bg-white p-10 border border-gray-200 rounded-sm">
        <h2 className="text-3xl font-serif mb-8 text-neutral-800 flex items-center gap-3">
          <Quote size={28} strokeWidth={1.5} /> Edit Quote
        </h2>
        {loading ? (
          <p className="text-gray-500 py-10 text-center animate-pulse">Loading quote data...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-xs uppercase tracking-[0.1em] text-gray-500 mb-2">Quote Text</label>
              <textarea required value={quote} onChange={e => setQuoteText(e.target.value)} placeholder="Enter the quote here..." rows={4} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-sm focus:ring-0 focus:border-neutral-800 transition-colors text-neutral-800 font-serif text-2xl leading-relaxed resize-y italic"></textarea>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.1em] text-gray-500 mb-2">Author</label>
              <input type="text" required value={author} onChange={e => setAuthor(e.target.value)} placeholder="e.g. Haruki Murakami" className="w-full py-2 px-0 bg-transparent border-0 border-b border-gray-300 rounded-none focus:ring-0 focus:border-neutral-800 transition-colors text-neutral-800 text-lg" />
            </div>
            
            <button disabled={saving} type="submit" className="w-full py-4 mt-8 bg-neutral-800 text-white rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-900 transition-colors disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
