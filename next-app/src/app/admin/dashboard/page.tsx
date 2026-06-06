'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/../utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Feather, Cloud, Quote, Music, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        router.push('/admin');
      } else {
        setUser(user);
      }
    };
    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin');
  };

  if (!user) return <div className="p-10 text-center">Loading...</div>;

  return (
    <main className="page-wrapper container mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-10 pb-6 border-b border-[var(--border-color)]">
        <div>
          <h1 className="text-3xl font-serif text-[var(--text-primary)] mb-2">Creator Studio</h1>
          <p className="text-[var(--text-secondary)] text-sm">Logged in as {user.email}</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-2 border border-gray-200 text-gray-500 rounded-sm text-xs font-bold uppercase tracking-[0.1em] hover:text-neutral-800 hover:border-neutral-800 transition-colors"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Module: Poetry */}
        <Link href="/admin/dashboard/poetry" className="p-10 border border-gray-200 bg-transparent rounded-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col items-center text-center h-full">
          <Feather className="text-gray-400 group-hover:text-neutral-800 mb-6 transition-colors" size={32} strokeWidth={1.5} />
          <h2 className="text-2xl font-serif mb-2 text-neutral-800">Poetry</h2>
          <p className="text-gray-500 text-sm mb-6">Manage your poetry collection</p>
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.15em] text-neutral-800 font-bold group-hover:text-gray-500 transition-colors mt-auto">
            <span className="border-b border-transparent group-hover:border-gray-400 pb-0.5">
              Add Poem
            </span>
          </div>
        </Link>

        {/* Module: Thoughts */}
        <Link href="/admin/dashboard/thoughts" className="p-10 border border-gray-200 bg-transparent rounded-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col items-center text-center h-full">
          <Cloud className="text-gray-400 group-hover:text-neutral-800 mb-6 transition-colors" size={32} strokeWidth={1.5} />
          <h2 className="text-2xl font-serif mb-2 text-neutral-800">Thoughts</h2>
          <p className="text-gray-500 text-sm mb-6">Publish fleeting thoughts</p>
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.15em] text-neutral-800 font-bold group-hover:text-gray-500 transition-colors mt-auto">
            <span className="border-b border-transparent group-hover:border-gray-400 pb-0.5">
              Add Thought
            </span>
          </div>
        </Link>

        {/* Module: Quotes */}
        <Link href="/admin/dashboard/quotes" className="p-10 border border-gray-200 bg-transparent rounded-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col items-center text-center h-full">
          <Quote className="text-gray-400 group-hover:text-neutral-800 mb-6 transition-colors" size={32} strokeWidth={1.5} />
          <h2 className="text-2xl font-serif mb-2 text-neutral-800">Quotes</h2>
          <p className="text-gray-500 text-sm mb-6">Curate interesting quotes</p>
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.15em] text-neutral-800 font-bold group-hover:text-gray-500 transition-colors mt-auto">
            <span className="border-b border-transparent group-hover:border-gray-400 pb-0.5">
              Add Quote
            </span>
          </div>
        </Link>

        {/* Module: Music */}
        <Link href="/admin/dashboard/music" className="p-10 border border-gray-200 bg-transparent rounded-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col items-center text-center h-full">
          <Music className="text-gray-400 group-hover:text-neutral-800 mb-6 transition-colors" size={32} strokeWidth={1.5} />
          <h2 className="text-2xl font-serif mb-2 text-neutral-800">Music</h2>
          <p className="text-gray-500 text-sm mb-6">Upload tracks and lyrics</p>
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.15em] text-neutral-800 font-bold group-hover:text-gray-500 transition-colors mt-auto">
            <span className="border-b border-transparent group-hover:border-gray-400 pb-0.5">
              Add Track
            </span>
          </div>
        </Link>

      </div>
    </main>
  );
}
