'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

export default function AboutPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        loadSignature();
      }
    };

    const loadSignature = () => {
      updateColor();
      const dataURL = localStorage.getItem('notebook_guestbook_sig');
      if (dataURL) {
        const img = new window.Image();
        img.src = dataURL;
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
        };
      }
    };

    const updateColor = () => {
      const currentTheme = theme === 'system' ? resolvedTheme : theme;
      ctx.strokeStyle = currentTheme === 'dark' ? '#eeeeee' : '#333333';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    };

    const saveSignature = () => {
      const dataURL = canvas.toDataURL();
      localStorage.setItem('notebook_guestbook_sig', dataURL);
    };

    const startPosition = (e: MouseEvent | TouchEvent) => {
      isDrawing.current = true;
      draw(e);
    };

    const endPosition = () => {
      if (!isDrawing.current) return;
      isDrawing.current = false;
      ctx.beginPath();
      saveSignature();
    };

    const draw = (e: MouseEvent | TouchEvent) => {
      if (!isDrawing.current) return;
      const rect = canvas.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
        e.preventDefault();
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const x = clientX - rect.left;
      const y = clientY - rect.top;

      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseleave', endPosition);
    canvas.addEventListener('touchstart', startPosition, { passive: false });
    canvas.addEventListener('touchend', endPosition);
    canvas.addEventListener('touchmove', draw, { passive: false });

    resizeCanvas();
    updateColor();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [mounted, theme, resolvedTheme]);

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
      localStorage.removeItem('notebook_guestbook_sig');
    }
  };

  return (
    <main className="page-wrapper container mx-auto px-4 pb-20">
      <div className="section-kicker mb-2">Chân dung</div>
      <h1 className="section-title mb-10">Về tác giả</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        <div className="w-full relative aspect-square rounded-lg overflow-hidden shadow-xl border border-[var(--border-color)]">
          <Image 
            src="/images/avatar.jpg" 
            alt="Chân dung tác giả"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="md:col-span-2 text-lg leading-relaxed text-[var(--text-primary)] space-y-6 font-lora">
          <p>
            Hello. I'm a writer and observer navigating the modern world. This digital
            notebook is where I collect my fragmented thoughts, distill experiences into poetry, and attempt to
            make sense of the noise.
          </p>

          <p>
            My work primarily focuses on the intersection of nature, memory, and the
            solitary experience in urban environments. I believe that paying attention to the small, quiet
            moments is paramount in an era that constantly demands our distraction.
          </p>

          <p>
            When I am not writing, you can find me wandering through city streets, reading
            in quiet corners, or simply watching the light change.
          </p>

          <div className="flex gap-6 mt-10 pt-6 border-t border-[var(--border-color)]">
            <a href="mailto:tienanhnguyen912@gmail.com" className="font-sans text-sm uppercase tracking-wider text-[var(--accent-color)] hover:border-b hover:border-[var(--accent-color)] pb-1 transition-all">Email</a>
            <a href="https://www.facebook.com/nha.tho.farm.linh/" target="_blank" className="font-sans text-sm uppercase tracking-wider text-[var(--accent-color)] hover:border-b hover:border-[var(--accent-color)] pb-1 transition-all">Facebook</a>
            <a href="#" className="font-sans text-sm uppercase tracking-wider text-[var(--accent-color)] hover:border-b hover:border-[var(--accent-color)] pb-1 transition-all">Instagram</a>
          </div>
        </div>
      </div>

      <div className="mt-32 pt-20 border-t border-[var(--border-color)]">
        <h2 className="font-serif text-3xl mb-4 text-[var(--text-primary)]">Sổ lưu bút: để lại dấu tay của bạn</h2>
        <p className="text-[var(--text-secondary)] mb-8">Một trang giấy số để bạn vẽ, ký tên hoặc để lại đôi dòng. Nét vẽ được lưu ngay trên trình duyệt của bạn.</p>
        
        <div className="relative w-full h-[300px] bg-[var(--surface-color)] border-2 border-dashed border-[var(--accent-color)] rounded-xl overflow-hidden mb-4 cursor-crosshair">
          <canvas ref={canvasRef} className="absolute inset-0 touch-none"></canvas>
        </div>
        
        <div className="flex justify-end">
          <button 
            onClick={handleClear}
            className="px-6 py-2 bg-transparent border border-[var(--border-color)] text-[var(--text-secondary)] rounded-full hover:text-[var(--accent-color)] hover:border-[var(--accent-color)] transition-all font-sans text-sm uppercase tracking-wide"
          >
            Xoá nét vẽ
          </button>
        </div>
      </div>
    </main>
  );
}
