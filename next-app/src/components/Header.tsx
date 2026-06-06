'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Menu, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Poetry', path: '/poetry' },
    { name: 'Thoughts', path: '/thoughts' },
    { name: 'Quotes', path: '/quotes' },
    { name: 'Music', path: '/music' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="site-header">
      <div className="nav-container">
        <button className="mobile-menu-btn" aria-label="Menu">
          <Menu />
        </button>
        <Link href="/" className="site-brand flex items-center gap-2">
          <Image src="/logo.png" alt="Nhà Thơ Farm Lính Logo" width={32} height={32} className="rounded-sm dark:brightness-90 object-contain" />
          <span className="hidden sm:inline-block">Nhà Thơ Farm Lính</span>
        </Link>
        
        <nav className="site-nav">
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              href={link.path}
              className={pathname === link.path ? 'active' : ''}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="header-toggles">
          <button className="theme-toggle lang-toggle-btn">EN</button>
          <button 
            className="theme-toggle" 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle dark mode"
          >
            {mounted && theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
