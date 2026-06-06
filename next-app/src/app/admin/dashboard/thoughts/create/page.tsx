'use client';

import { useState } from 'react';
import { supabase } from '@/../utils/supabase/client';
import { ArrowLeft, Cloud } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminThoughtsCreate() {
  const router = useRouter();

  // Form states
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(() => {
    return new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  });
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase.from('thoughts').insert([{
      title,
      date,
      content
    }]);

    setSaving(false);

    if (error) {
      alert('Error saving thought: ' + error.message);
    } else {
      alert('Thought published successfully!');
      router.push('/admin/dashboard/thoughts');
    }
  };

  return (
    <main className="page-wrapper container mx-auto px-4 py-10 max-w-4xl">
      <Link href="/admin/dashboard/thoughts" className="inline-flex items-center gap-2 text-gray-500 hover:text-neutral-800 mb-8 transition-colors text-sm uppercase tracking-widest">
        <ArrowLeft size={16} /> Back to Thoughts List
      </Link>

      <div className="bg-white p-10 border border-gray-200 rounded-sm">
        <h2 className="text-3xl font-serif mb-8 text-neutral-800 flex items-center gap-3">
          <Cloud size={28} strokeWidth={1.5} /> Publish a Thought
        </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-xs uppercase tracking-[0.1em] text-gray-500 mb-2">Title</label>
              <input type="text" required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Midnight Reflections" className="w-full py-2 px-0 bg-transparent border-0 border-b border-gray-300 rounded-none focus:ring-0 focus:border-neutral-800 transition-colors text-neutral-800 text-lg" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.1em] text-gray-500 mb-2">Date</label>
              <input type="text" required value={date} onChange={e => setDate(e.target.value)} placeholder="e.g. May 14, 2026" className="w-full py-2 px-0 bg-transparent border-0 border-b border-gray-300 rounded-none focus:ring-0 focus:border-neutral-800 transition-colors text-neutral-800" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.1em] text-gray-500 mb-2">Content</label>
              <textarea required value={content} onChange={e => setContent(e.target.value)} placeholder="What's on your mind?..." rows={8} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-sm focus:ring-0 focus:border-neutral-800 transition-colors text-neutral-800 font-serif leading-relaxed text-lg resize-y"></textarea>
            </div>
            
            <button disabled={saving} type="submit" className="w-full py-4 mt-8 bg-neutral-800 text-white rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-900 transition-colors disabled:opacity-50">
              {saving ? 'Publishing...' : 'Publish Thought'}
            </button>
          </form>
      </div>
    </main>
  );
}
