'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/../utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowUpRight, Cloud, Feather, Library, LogOut, Music, Plus, Quote, Sparkles } from 'lucide-react';
import type { User } from '@supabase/supabase-js';

const modules = [
  { key: 'poems', title: 'Thơ', description: 'Tuyển tập và bản thảo', href: '/admin/dashboard/poetry', createHref: '/admin/dashboard/poetry/create', icon: Feather, accent: 'umber' },
  { key: 'thoughts', title: 'Tản văn', description: 'Những ghi chép ngắn', href: '/admin/dashboard/thoughts', createHref: '/admin/dashboard/thoughts/create', icon: Cloud, accent: 'sage' },
  { key: 'quotes', title: 'Trích dẫn', description: 'Những câu chữ được lưu', href: '/admin/dashboard/quotes', createHref: '/admin/dashboard/quotes/create', icon: Quote, accent: 'plum' },
  { key: 'music_tracks', title: 'Âm nhạc', description: 'Bài hát, lời và bản thu', href: '/admin/dashboard/music', createHref: '/admin/dashboard/music/create', icon: Music, accent: 'blue' },
] as const;

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [counts, setCounts] = useState<Record<string, number | null>>({});
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) {
        router.push('/login');
        return;
      }

      setUser(user);
      const results = await Promise.all(
        modules.map(({ key }) => supabase.from(key).select('*', { count: 'exact', head: true }))
      );
      setCounts(Object.fromEntries(modules.map((module, index) => [module.key, results[index].count])));
      setStatsLoading(false);
    };

    checkUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (!user) return <div className="admin-loading">Đang mở xưởng sáng tác…</div>;

  const totalContent = Object.values(counts).reduce<number>((sum, count) => sum + (count ?? 0), 0);
  const firstName = user.email?.split('@')[0] || 'Admin';

  return (
    <main className="admin-dashboard">
      <header className="admin-hero">
        <div className="admin-hero-copy">
          <span className="admin-eyebrow"><Sparkles size={14} /> Nhà Thơ Farm Lính · Studio</span>
          <h1>Chào {firstName},<br /><em>mình viết gì hôm nay?</em></h1>
          <p>Quản lý các tác phẩm, bản nháp và giai điệu trong cùng một không gian yên tĩnh.</p>
          <div className="admin-hero-actions">
            <Link href="/admin/dashboard/poetry/create" className="admin-primary-action"><Plus size={17} /> Viết bài thơ mới</Link>
            <Link href="/" className="admin-secondary-action">Xem trang công khai <ArrowUpRight size={16} /></Link>
          </div>
        </div>

        <aside className="admin-profile-card">
          <div className="admin-profile-top">
            <span className="admin-avatar">{firstName.slice(0, 1).toUpperCase()}</span>
            <button type="button" onClick={handleLogout} className="admin-logout" title="Đăng xuất"><LogOut size={17} /></button>
          </div>
          <span className="admin-profile-label">Tài khoản quản trị</span>
          <strong>{user.email}</strong>
          <div className="admin-total">
            <Library size={18} />
            <div><strong>{statsLoading ? '—' : totalContent}</strong><span>tác phẩm trong thư viện</span></div>
          </div>
        </aside>
      </header>

      <section className="admin-library" aria-labelledby="library-heading">
        <div className="admin-section-heading">
          <div><span>Tổng quan thư viện</span><h2 id="library-heading">Không gian sáng tác</h2></div>
          <p>Chọn một khu vực để biên tập hoặc thêm tác phẩm mới.</p>
        </div>

        <div className="admin-module-grid">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <article key={module.key} className={`admin-module-card ${module.accent}`}>
                <div className="admin-module-top">
                  <span className="admin-module-icon"><Icon size={22} strokeWidth={1.7} /></span>
                  <span className="admin-module-count">{statsLoading ? '—' : (counts[module.key] ?? 0).toString().padStart(2, '0')}</span>
                </div>
                <div className="admin-module-copy"><h3>{module.title}</h3><p>{module.description}</p></div>
                <div className="admin-module-actions">
                  <Link href={module.href}>Quản lý <ArrowUpRight size={15} /></Link>
                  <Link href={module.createHref} className="admin-module-add" aria-label={`Thêm ${module.title}`}><Plus size={16} /></Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
