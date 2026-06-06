'use client';

import { useState } from 'react';
import { supabase } from '@/../utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/admin/dashboard');
    }
  };

  return (
    <main className="page-wrapper container mx-auto px-4 flex items-center justify-center min-h-[calc(100vh-100px)]">
      <div className="w-full max-w-md p-10 bg-[var(--bg-color)] shadow-[0_4px_40px_rgba(0,0,0,0.03)] border border-gray-100 rounded-sm">
        <h1 className="font-serif text-4xl mb-3 text-center text-[var(--text-primary)]">Admin Access</h1>
        <p className="text-center text-[var(--text-secondary)] mb-10 text-xs uppercase tracking-[0.2em]">Notebook Dashboard</p>

        {error && (
          <div className="bg-red-50 text-red-500 border-l-2 border-red-500 p-3 mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-8">
          <div>
            <label className="block text-xs font-sans uppercase tracking-[0.1em] text-[var(--text-secondary)] mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full py-2 bg-transparent border-0 border-b border-gray-300 rounded-none focus:ring-0 focus:border-[var(--text-primary)] transition-colors text-[var(--text-primary)]"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-sans uppercase tracking-[0.1em] text-[var(--text-secondary)] mb-2">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full py-2 bg-transparent border-0 border-b border-gray-300 rounded-none focus:ring-0 focus:border-[var(--text-primary)] transition-colors text-[var(--text-primary)]"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 mt-4 bg-neutral-800 text-white rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-neutral-900 transition-colors disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Enter'}
          </button>
        </form>
      </div>
    </main>
  );
}
