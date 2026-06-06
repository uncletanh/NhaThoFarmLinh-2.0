'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/../utils/supabase/client';
import Link from 'next/link';
import { Pencil, Trash2, Plus, ArrowLeft } from 'lucide-react';

export default function AdminQuotesList() {
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('quotes')
      .select('id, quote, author, date, created_at')
      .order('created_at', { ascending: false });
    
    if (data) setQuotes(data);
    setLoading(false);
  };

  const handleDelete = async (id: string, quote: string) => {
    if (!confirm(`Are you sure you want to delete this quote: "${quote.substring(0, 30)}..."?`)) return;
    
    const { error } = await supabase.from('quotes').delete().eq('id', id);
    if (error) {
      alert('Error deleting quote: ' + error.message);
    } else {
      setQuotes(quotes.filter(q => q.id !== id));
    }
  };

  return (
    <main className="page-wrapper container mx-auto px-4 py-10 max-w-5xl">
      <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-gray-500 hover:text-neutral-800 mb-8 transition-colors text-sm uppercase tracking-widest">
        <ArrowLeft size={16} /> Back to Dashboard
      </Link>

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif text-neutral-800">Quotes Manager</h1>
        <Link 
          href="/admin/dashboard/quotes/create"
          className="flex items-center gap-2 px-6 py-3 bg-neutral-800 text-white rounded-sm text-xs uppercase tracking-widest font-bold hover:bg-neutral-900 transition-colors"
        >
          <Plus size={16} /> Add New Quote
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-xs uppercase tracking-widest text-gray-500 font-sans">
              <th className="p-4 font-normal">Quote</th>
              <th className="p-4 font-normal w-40">Author / Date</th>
              <th className="p-4 font-normal w-32 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="p-10 text-center text-gray-400">Loading...</td>
              </tr>
            ) : quotes.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-10 text-center text-gray-400">No quotes found.</td>
              </tr>
            ) : (
              quotes.map(quote => (
                <tr key={quote.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-serif text-lg text-neutral-800 italic">"{quote.quote}"</td>
                  <td className="p-4 text-sm text-gray-500 font-sans">
                    <div className="text-neutral-800">{quote.author}</div>
                    <div className="text-xs uppercase tracking-widest mt-1">{quote.date}</div>
                  </td>
                  <td className="p-4 flex items-center justify-end gap-2">
                    <Link 
                      href={`/admin/dashboard/quotes/edit/${quote.id}`}
                      className="p-2 text-gray-400 hover:text-amber-600 transition-colors border border-transparent hover:border-amber-200 rounded-sm bg-transparent hover:bg-amber-50"
                      title="Edit Quote"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button 
                      onClick={() => handleDelete(quote.id, quote.quote)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors border border-transparent hover:border-red-200 rounded-sm bg-transparent hover:bg-red-50"
                      title="Delete Quote"
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
