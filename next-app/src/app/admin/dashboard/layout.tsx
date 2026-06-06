'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/../utils/supabase/client';
import { useRouter } from 'next/navigation';

const ADMIN_EMAIL = 'tienanhnguyen912@gmail.com';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        router.push('/login');
        return;
      }
      if (session.user.email !== ADMIN_EMAIL) {
        alert('Access Denied. Admins only.');
        router.push('/');
        return;
      }
      setIsAuthorized(true);
      setLoading(false);
    };

    checkAdmin();
  }, [router]);

  if (loading || !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-color)]">
        <div className="animate-pulse text-[var(--text-secondary)] uppercase tracking-widest text-sm font-bold">
          Verifying Access...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
