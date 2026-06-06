'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/../utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Mail } from 'lucide-react';

const ADMIN_EMAIL = 'tienanhnguyen912@gmail.com';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { data: { user }, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      if (user?.email === ADMIN_EMAIL) {
        router.push('/admin/dashboard');
      } else {
        router.push('/');
      }
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/login', // Will redirect back here
      }
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Check user on mount in case they just returned from OAuth
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        if (session.user.email === ADMIN_EMAIL) {
          router.push('/admin/dashboard');
        } else {
          router.push('/');
        }
      }
    };
    checkUser();
  }, [router]);

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

        <button 
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-4 mb-8 border border-gray-200 text-neutral-800 rounded-sm text-xs font-bold uppercase tracking-[0.2em] hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>

        <div className="flex items-center mb-8">
          <div className="flex-1 h-[1px] bg-gray-200"></div>
          <span className="px-4 text-xs font-sans uppercase tracking-[0.2em] text-[var(--text-secondary)]">Or email</span>
          <div className="flex-1 h-[1px] bg-gray-200"></div>
        </div>

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
