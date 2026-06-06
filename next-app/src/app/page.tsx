'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="page-wrapper container mx-auto px-4 min-h-[calc(100vh-100px)] flex flex-col justify-center items-center text-center">
      <div className="max-w-3xl space-y-10 flex flex-col items-center">
        
        <Image 
          src="/logo.png" 
          alt="Nhà Thơ Farm Lính Logo" 
          width={80} 
          height={80} 
          className="rounded-sm dark:brightness-90 object-contain mb-4" 
        />

        <h1 className="text-5xl md:text-7xl font-serif text-neutral-800 dark:text-neutral-200 tracking-tight">
          Nhà Thơ <span className="italic text-emerald-600">Farm Lính</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-500 font-sans tracking-wide leading-relaxed max-w-2xl">
          Nơi gieo những mầm thơ, tưới những suy nghĩ và thu hoạch những giai điệu của cuộc sống.
        </p>
        
        <div className="pt-8 flex flex-wrap justify-center gap-6">
          <Link href="/poetry" className="px-8 py-3 border border-neutral-800 dark:border-neutral-200 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-800 hover:text-white dark:hover:bg-neutral-200 dark:hover:text-neutral-900 transition-colors uppercase tracking-widest text-xs font-bold rounded-sm">
            Đọc Thơ
          </Link>
          <Link href="/music" className="px-8 py-3 border border-transparent text-gray-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors uppercase tracking-widest text-xs font-bold">
            Nghe Nhạc
          </Link>
          <Link href="/thoughts" className="px-8 py-3 border border-transparent text-gray-500 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors uppercase tracking-widest text-xs font-bold">
            Góc Suy Nghĩ
          </Link>
        </div>
      </div>
    </main>
  );
}
