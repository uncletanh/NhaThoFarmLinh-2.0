'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { LayoutDashboard, LogOut, Menu, Moon, Sun, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/../utils/supabase/client';

const ADMIN_EMAIL = 'tienanhnguyen912@gmail.com';

const navLinks = [
  { name: 'Trang chủ', path: '/' },
  { name: 'Thơ', path: '/poetry' },
  { name: 'Nhạc', path: '/music' },
  { name: 'Suy nghĩ', path: '/thoughts' },
  { name: 'Trích dẫn', path: '/quotes' },
  { name: 'Về tác giả', path: '/about' },
];

export default function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="site-header">
      <div className="nav-container">
        <button
          className="mobile-menu-btn"
          aria-label={menuOpen ? 'Đóng trình đơn' : 'Mở trình đơn'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <Link href="/" className="site-brand">
          <Image src="/logo.png" alt="Logo Nhà Thơ Farm Lính" width={32} height={32} />
          <span>Nhà Thơ Farm Lính</span>
        </Link>

        <nav className={`site-nav ${menuOpen ? 'open' : ''}`} aria-label="Điều hướng chính">
          {navLinks.map((link) => (
            <Link key={link.path} href={link.path} className={pathname === link.path ? 'active' : ''}>
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="header-toggles">
          <span className="language-mark" aria-label="Ngôn ngữ hiện tại">VI</span>
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Đổi chế độ sáng tối"
          >
            {mounted && theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <span className="header-divider" />

          {mounted && user ? (
            <div className="account-actions">
              {user.email === ADMIN_EMAIL && (
                <Link href="/admin/dashboard" className="theme-toggle" title="Trang quản trị">
                  <LayoutDashboard size={18} />
                </Link>
              )}
              <button onClick={handleLogout} className="theme-toggle" title="Đăng xuất">
                <LogOut size={18} />
              </button>
            </div>
          ) : mounted ? (
            <Link href="/login" className="theme-toggle" title="Đăng nhập">
              <User size={18} />
            </Link>
          ) : null}
        </div>
      </div>
    </header>
  );
}
