'use client';

import { useEffect, useState, use } from 'react';
import { supabase } from '@/../utils/supabase/client';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { normalizePoemDateInput } from '@/utils/poemDate';

export default function AdminEditPoetry({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  
  // Form states
  const [title, setTitle] = useState('');
  const [preview, setPreview] = useState('');
  const [content, setContent] = useState('');
  const [insight, setInsight] = useState('');
  const [tags, setTags] = useState('');
  const [date, setDate] = useState('');
  const [dateError, setDateError] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoem = async () => {
      const { data, error } = await supabase.from('poems').select('*').eq('id', resolvedParams.id).single();
      if (!error && data) {
        setTitle(data.title);
        setPreview(data.preview);
        setContent(data.content);
        setInsight(data.insight || '');
        setTags(data.tags?.join(', ') || '');
        setDate(normalizePoemDateInput(data.date) ?? data.date);
        setIsPublic(data.is_public ?? true);
      }
      setLoading(false);
    };
    fetchPoem();
  }, [resolvedParams.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedDate = normalizePoemDateInput(date);
    if (!normalizedDate) {
      setDateError('Ngày không hợp lệ. Dùng June 23, 2026; 06-23-2026; hoặc 2026-06-23.');
      return;
    }

    setDateError('');
    setSaving(true);
    
    const tagsArray = tags.split(',').map(t => t.trim()).filter(t => t !== '');
    
    const { error } = await supabase.from('poems').update({
      title,
      preview,
      content,
      insight,
      tags: tagsArray,
      date: normalizedDate,
      is_public: isPublic
    }).eq('id', resolvedParams.id);

    setSaving(false);
    
    if (error) {
      alert('Error updating poem: ' + error.message);
    } else {
      alert('Poem updated successfully!');
      router.push('/admin/dashboard/poetry');
    }
  };

  return (
    <main className="page-wrapper container mx-auto px-4 py-10 max-w-4xl">
      <Link href="/admin/dashboard/poetry" className="inline-flex items-center gap-2 text-gray-500 hover:text-neutral-800 mb-8 transition-colors text-sm uppercase tracking-widest">
        <ArrowLeft size={16} /> Back to Poetry List
      </Link>

      <div className="bg-white p-10 border border-gray-200 rounded-sm">
        <h2 className="text-3xl font-serif mb-8 text-neutral-800">Edit Poem</h2>
        {loading ? (
          <p className="text-gray-500 py-10 text-center animate-pulse">Loading poem data...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-xs uppercase tracking-[0.1em] text-gray-500 mb-2">Title</label>
              <input type="text" required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Aftertaste of Spring" className="w-full py-2 px-0 bg-transparent border-0 border-b border-gray-300 rounded-none focus:ring-0 focus:border-neutral-800 transition-colors text-neutral-800 text-lg" />
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <label className="block text-xs uppercase tracking-[0.1em] text-gray-500 mb-2">Date</label>
                <input
                  type="text"
                  required
                  value={date}
                  onChange={e => { setDate(e.target.value); setDateError(''); }}
                  placeholder="June 23, 2026 hoặc 06-23-2026"
                  aria-invalid={Boolean(dateError)}
                  aria-describedby="poem-date-help"
                  className="w-full py-2 px-0 bg-transparent border-0 border-b border-gray-300 rounded-none focus:ring-0 focus:border-neutral-800 transition-colors text-neutral-800"
                />
                <p id="poem-date-help" className={`mt-2 mb-0 text-xs ${dateError ? 'text-red-600' : 'text-gray-400'}`}>
                  {dateError || 'Chấp nhận: June 23, 2026 · 06-23-2026 · 2026-06-23'}
                </p>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.1em] text-gray-500 mb-2">Tags (Comma separated)</label>
                <input type="text" value={tags} onChange={e => setTags(e.target.value)} placeholder="e.g. Urban, Night, Solitude" className="w-full py-2 px-0 bg-transparent border-0 border-b border-gray-300 rounded-none focus:ring-0 focus:border-neutral-800 transition-colors text-neutral-800" />
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.1em] text-gray-500 mb-2">Preview Text (List view)</label>
              <textarea required value={preview} onChange={e => setPreview(e.target.value)} placeholder="Write a short 1-2 sentence preview..." rows={2} className="w-full py-2 px-0 bg-transparent border-0 border-b border-gray-300 rounded-none focus:ring-0 focus:border-neutral-800 transition-colors text-neutral-800 resize-none"></textarea>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.1em] text-gray-500 mb-2">Full Content</label>
              <textarea required value={content} onChange={e => setContent(e.target.value)} placeholder="Write your poem here..." rows={12} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-sm focus:ring-0 focus:border-neutral-800 transition-colors text-neutral-800 font-serif leading-relaxed text-lg resize-y"></textarea>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.1em] text-gray-500 mb-2">Curator Insight (Optional)</label>
              <textarea value={insight} onChange={e => setInsight(e.target.value)} placeholder="Add any background context or thoughts here..." rows={3} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-sm focus:ring-0 focus:border-neutral-800 transition-colors text-neutral-800 italic resize-none"></textarea>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.1em] text-gray-500 mb-2">Visibility</label>
              <label className="flex items-center cursor-pointer gap-3 w-fit group">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                  />
                  <div className={`block w-10 h-6 rounded-full transition-colors ${isPublic ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                  <div className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${isPublic ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
                <div className="text-sm font-sans text-neutral-800">
                  {isPublic ? 'Public (Visible on website)' : 'Private (Draft, hidden)'}
                </div>
              </label>
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
