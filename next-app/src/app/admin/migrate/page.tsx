'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/../utils/supabase/client';
import { useRouter } from 'next/navigation';
import { poems } from '@/data/dataPoem';
import { musicPlaylist } from '@/data/dataMusic';

export default function MigratePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [status, setStatus] = useState('Waiting to start...');
  const [migrating, setMigrating] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/admin');
      } else {
        setUser(user);
      }
    };
    checkUser();
  }, [router]);

  const runMigration = async () => {
    if (!confirm('Import all legacy data to Supabase?')) return;
    setMigrating(true);
    
    try {
      setStatus('Migrating poems (0/' + poems.length + ')...');
      let pCount = 0;
      for (const poem of poems) {
        await supabase.from('poems').insert([{
          title: poem.title,
          preview: poem.preview,
          content: poem.content,
          insight: poem.insight,
          tags: poem.tags,
          date: poem.date
        }]);
        pCount++;
        setStatus('Migrating poems (' + pCount + '/' + poems.length + ')...');
      }
      
      setStatus('Migrating music (0/' + musicPlaylist.length + ')...');
      let mCount = 0;
      for (const track of musicPlaylist) {
        await supabase.from('music_tracks').insert([{
          title: track.title,
          artist: (track as any).artist || 'Nhà Thơ Farm Lính',
          cover_url: track.cover,
          src_url: track.src,
          lyrics_url: (track as any).lrc || null
        }]);
        mCount++;
        setStatus('Migrating music (' + mCount + '/' + musicPlaylist.length + ')...');
      }
      
      setStatus('✅ Migration Complete! 65 Poems and 16 Tracks migrated.');
      alert('Migration successful! You can go back to the dashboard now.');
    } catch (err: any) {
      setStatus('❌ Error: ' + err.message);
    } finally {
      setMigrating(false);
    }
  };

  if (!user) return <div className="p-10 text-center">Checking auth...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-10 rounded-sm shadow-xl max-w-lg w-full text-center border border-gray-200">
        <h1 className="text-3xl font-serif text-neutral-800 mb-4">Data Migration</h1>
        <p className="text-gray-500 mb-8">
          This will copy all 65 legacy poems and 16 music tracks from your local files into your Supabase database.
        </p>
        
        <div className="mb-8 p-4 bg-gray-50 border border-gray-100 rounded-sm text-sm font-mono text-neutral-600 h-20 flex items-center justify-center">
          {status}
        </div>
        
        <button 
          onClick={runMigration}
          disabled={migrating}
          className="w-full py-4 bg-neutral-800 text-white rounded-sm font-bold uppercase tracking-widest hover:bg-neutral-900 transition-colors disabled:opacity-50"
        >
          {migrating ? 'Migrating...' : 'Start Migration'}
        </button>
        
        <button 
          onClick={() => router.push('/admin/dashboard')}
          disabled={migrating}
          className="w-full mt-4 py-4 bg-transparent border border-gray-200 text-gray-500 rounded-sm font-bold uppercase tracking-widest hover:border-neutral-800 hover:text-neutral-800 transition-colors disabled:opacity-50"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}
