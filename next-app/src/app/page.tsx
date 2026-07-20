import Link from 'next/link';
import { ArrowRight, Headphones, PenLine, Quote } from 'lucide-react';

export default function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="hero-copy">
          <div className="eyebrow"><span /> Sổ tay của Farm Lính</div>
          <h1>Nơi gieo những <em>mầm thơ</em>, thu hoạch những <em>giai điệu</em></h1>
          <p>Một khoảng lặng dành cho thơ, những suy nghĩ vụn và âm nhạc được viết bằng cả trái tim.</p>
          <div className="hero-actions">
            <Link href="/poetry" className="button button-primary">Đọc thơ</Link>
            <Link href="/music" className="button button-secondary">Nghe nhạc</Link>
          </div>
        </div>

        <div className="vinyl-still-life" aria-label="Minh hoạ đĩa than và trang thơ">
          <div className="paper-sheet">
            <span className="paper-label">Một câu thơ nhỏ</span>
            <p>“Giữa những ngày rất vội,<br />ta chọn sống thật chậm.”</p>
            <span className="paper-signature">Farm Lính</span>
          </div>
          <div className="vinyl-record"><span /></div>
          <div className="vinyl-caption">summer sky</div>
        </div>
      </section>

      <section className="latest-section">
        <div className="section-heading-row">
          <div>
            <span className="section-kicker">Từ khu vườn chữ</span>
            <h2>Mới trên bàn viết</h2>
          </div>
          <Link href="/poetry" className="text-link">Xem tất cả <ArrowRight size={14} /></Link>
        </div>

        <div className="editorial-grid">
          <Link href="/poetry" className="feature-card poem-card">
            <div className="card-icon"><PenLine size={18} /></div>
            <span className="card-kicker">Bài thơ mới nhất · 01.05.2026</span>
            <h3>Mùa Hoa Tô Châu</h3>
            <p>Thích mùa hoa ở Tô Châu<br />Tình này biết giấu vào đâu bây giờ...</p>
            <span className="card-cta">Đọc trọn bài <ArrowRight size={14} /></span>
          </Link>

          <Link href="/quotes" className="feature-card quote-card">
            <Quote size={34} />
            <p>“Chúng ta viết để nỗi nhớ có một nơi chốn mà trở về.”</p>
            <span>— Farm Lính</span>
          </Link>

          <Link href="/thoughts" className="feature-card thought-card">
            <span className="card-kicker">Góc suy nghĩ</span>
            <h3>Nghệ thuật của việc sống chậm</h3>
            <p>Đôi khi, điều ta cần không phải là đi xa hơn, mà là dừng lại đủ lâu để nhìn thấy.</p>
            <span className="card-cta">Đọc tiếp <ArrowRight size={14} /></span>
          </Link>
        </div>
      </section>

      <section className="home-invitation">
        <Headphones size={22} />
        <p>Mỗi bài hát là một bài thơ có thêm giai điệu.</p>
        <Link href="/music">Ghé phòng nhạc <ArrowRight size={14} /></Link>
      </section>

      <footer className="home-footer">
        <span className="footer-signature">Farm Lính</span>
        <span>© 2026 Nhà Thơ Farm Lính — viết bằng cả trái tim</span>
      </footer>
    </main>
  );
}
