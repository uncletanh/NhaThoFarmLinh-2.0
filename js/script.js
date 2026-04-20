/**
 * Core Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initScrollHeader();
    initMobileMenu();
    initScrollReveal();
    initAudio();
    initGreeting();
    initZenMode();
    initCinematicTransitions();
    initGalleryDrag();
    initParticles();
    initExhibitionRooms();
});

// Theme Toggle Logic
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    // Check for saved user preference, if any
    const savedTheme = localStorage.getItem('theme');
    
    // Check system preference if no saved preference
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        updateIcon('dark');
    }

    // Toggle event listener
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });
}

function updateIcon(theme) {
    const iconPath = document.querySelector('#theme-toggle path');
    if (!iconPath) return;

    if (theme === 'dark') {
        // Sun icon for dark mode (to switch back to light)
        iconPath.setAttribute('d', 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z');
    } else {
        // Moon icon for light mode (to switch to dark)
        iconPath.setAttribute('d', 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z');
    }
}

// Scroll Header Logic
function initScrollHeader() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile Menu Logic
function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const siteNav = document.getElementById('site-nav');
    if (!mobileBtn || !siteNav) return;

    mobileBtn.addEventListener('click', () => {
        siteNav.classList.toggle('open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!siteNav.contains(e.target) && !mobileBtn.contains(e.target)) {
            siteNav.classList.remove('open');
        }
    });

    // Close menu when resizing to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            siteNav.classList.remove('open');
        }
    });
}

/**
 * Universal HTML snippet injector for header and footer to keep code DRY.
 * Since this is a static site without a SSG, we can inject shared UI via JS if requested.
 * But keeping standard HTML structure in files is safer for simple static sites.
 */

// Scroll Reveal Logic
function initScrollReveal() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Delay observing to allow dynamic injections
    setTimeout(() => {
        const elements = document.querySelectorAll('.list-item, .section-title, .quote-card');
        elements.forEach((el, index) => {
            el.classList.add('fade-in');
            if (el.classList.contains('list-item')) {
                el.style.transitionDelay = `${(index % 3) * 0.15}s`;
            }
            observer.observe(el);
        });
    }, 150);
}

// Global Audio Logic
function initAudio() {
    if(!document.getElementById('ambient-audio')) {
        // Free Lofi track
        const audioSrc = "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf589.mp3"; 
        const audioHTML = `
        <audio id="ambient-audio" loop src="${audioSrc}"></audio>
        <button id="audio-toggle" class="audio-toggle" aria-label="Toggle Music" style="display:none;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
        </button>`;
        document.body.insertAdjacentHTML('beforeend', audioHTML);
        setTimeout(() => {
            const btn = document.getElementById('audio-toggle');
            if(btn) btn.style.display = 'flex';
        }, 500);
    }

    const audio = document.getElementById('ambient-audio');
    const toggle = document.getElementById('audio-toggle');
    if(audio) audio.volume = 0.35; // Increased volume

    toggle?.addEventListener('click', () => {
        if(audio.paused) {
            audio.play();
            toggle.classList.add('is-playing');
        } else {
            audio.pause();
            toggle.classList.remove('is-playing');
        }
    });
}

// Greeting Logic
function initGreeting() {
    const greetingEl = document.getElementById('dynamic-greeting');
    if (!greetingEl) return;
    const hour = new Date().getHours();
    let msg = "Hello";
    if (hour < 12) msg = "Good morning";
    else if (hour < 18) msg = "Good afternoon";
    else msg = "Good evening";
    greetingEl.textContent = msg + ", reader.";
}

// Zen Mode Logic Setup
function initZenMode() {
    if(!document.getElementById('zen-overlay')) {
        const zenHTML = `
        <div id="zen-overlay" class="zen-overlay">
            <div id="zen-spotlight" class="zen-spotlight"></div>
            <button id="zen-close" class="zen-close">×</button>
            <div class="zen-content">
                <h2 id="zen-title" class="zen-poem-title"></h2>
                <div id="zen-body" class="zen-poem-body"></div>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', zenHTML);
    }

    const zenOverlay = document.getElementById('zen-overlay');
    const closeBtn = document.getElementById('zen-close');

    // Close function
    const closeZenMode = () => {
        if(zenOverlay.classList.contains('active')) {
            zenOverlay.classList.remove('active');
            document.body.style.overflow = 'auto'; // Restore scroll
        }
    };

    closeBtn?.addEventListener('click', closeZenMode);

    // Escape listener
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeZenMode();
        }
    });

    // Make it available globally for other scripts (like poetry.html to trigger)
    window.openZenMode = function(title, content) {
        document.getElementById('zen-title').textContent = title;
        document.getElementById('zen-body').textContent = content;
        
        let sig = document.getElementById('zen-signature');
        if (!sig) {
            const sigHTML = `<div id="zen-signature" class="signature-wrap">Nhà Thơ Farm Lính</div>`;
            document.getElementById('zen-body').insertAdjacentHTML('afterend', sigHTML);
        } else {
            const newSig = sig.cloneNode(true);
            sig.parentNode.replaceChild(newSig, sig);
        }

        zenOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Hide main scroll
    };
}

// Cinematic Intercept
function initCinematicTransitions() {
    if (!document.getElementById('page-transition-overlay')) {
        const overlay = document.createElement('div');
        overlay.id = 'page-transition-overlay';
        overlay.className = 'page-transition-overlay';
        document.body.appendChild(overlay);
        
        requestAnimationFrame(() => {
            overlay.classList.add('loaded');
        });
    }

    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && !href.startsWith('javascript:') && !href.startsWith('http') && link.target !== '_blank') {
                e.preventDefault();
                const overlay = document.getElementById('page-transition-overlay');
                overlay.classList.remove('loaded');
                overlay.classList.add('fade-out');
                
                setTimeout(() => {
                    window.location.href = href;
                }, 800); 
            }
        });
    });

    window.addEventListener('pageshow', (e) => {
        const overlay = document.getElementById('page-transition-overlay');
        if (overlay) {
            overlay.classList.add('loaded');
            overlay.classList.remove('fade-out');
        }
    });
}

// ==============================================
// PHASE 2: GALLERY WALL & EFFECTS
// ==============================================

function initGalleryDrag() {
    const viewport = document.getElementById('gallery-viewport');
    const wall = document.getElementById('gallery-wall');
    if (!viewport || !wall) return;

    let isDragging = false;
    let startX = 0, startY = 0;
    let currentX = 0, currentY = 0;
    let currentScale = 1;
    window.galleryHasDragged = false;
    let clickStartX, clickStartY;
    
    // Smooth rendering
    let rafId = null;
    const render = () => {
        wall.style.transform = `translate(${currentX}px, ${currentY}px) scale(${currentScale})`;
        wall.style.setProperty('--zoom-scale', currentScale);
        
        const parallaxBg = document.getElementById('parallax-bg');
        if (parallaxBg) {
            // Move parallax layer slower (50% speed) and scale it down slightly to simulate depth
            parallaxBg.style.transform = `translate(${currentX * 0.5}px, ${currentY * 0.5}px) scale(${currentScale * 0.8})`;
        }
        
        rafId = null;
    };

    // Zooming logic
    viewport.addEventListener('wheel', (e) => {
        e.preventDefault(); // Prevent default scroll
        const oldScale = currentScale;

        if (e.deltaY > 0) {
            currentScale *= 0.90; // Zoom out
        } else {
            currentScale *= 1.10; // Zoom in
        }
        
        // Clamp scale 
        if(currentScale < 0.25) currentScale = 0.25;
        if(currentScale > 2.5) currentScale = 2.5;
        
        // Pointer-based zooming focus math
        const rect = viewport.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const vx = e.clientX - cx;
        const vy = e.clientY - cy;

        const factor = currentScale / oldScale;

        currentX = currentX * factor + vx * (1 - factor);
        currentY = currentY * factor + vy * (1 - factor);

        // Enforce boundary clamping when zooming near edges
        const maxDragX = 4000 * currentScale;
        const maxDragY = 4000 * currentScale;
        if(currentX > maxDragX) currentX = maxDragX;
        if(currentX < -maxDragX) currentX = -maxDragX;
        if(currentY > maxDragY) currentY = maxDragY;
        if(currentY < -maxDragY) currentY = -maxDragY;
        
        if(!rafId) rafId = requestAnimationFrame(render);
    }, {passive: false});

    const updatePosition = (clientX, clientY) => {
        currentX = clientX - startX;
        currentY = clientY - startY;
        const maxDragX = 4000 * currentScale;
        const maxDragY = 4000 * currentScale;
        if(currentX > maxDragX) currentX = maxDragX;
        if(currentX < -maxDragX) currentX = -maxDragX;
        if(currentY > maxDragY) currentY = maxDragY;
        if(currentY < -maxDragY) currentY = -maxDragY;
        if(!rafId) rafId = requestAnimationFrame(render);
    };

    viewport.addEventListener('mousedown', (e) => {
        isDragging = true;
        window.galleryHasDragged = false;
        clickStartX = e.clientX;
        clickStartY = e.clientY;
        startX = e.clientX - currentX;
        startY = e.clientY - currentY;
    });
    
    window.addEventListener('mousemove', (e) => {
        if(!isDragging) return;
        // If movement is bigger than 5px, it's a drag
        if (Math.abs(e.clientX - clickStartX) > 5 || Math.abs(e.clientY - clickStartY) > 5) {
            window.galleryHasDragged = true;
        }
        updatePosition(e.clientX, e.clientY);
    });
    
    window.addEventListener('mouseup', () => { isDragging = false; });
    window.addEventListener('mouseleave', () => { isDragging = false; });

    // Touch
    viewport.addEventListener('touchstart', (e) => {
        isDragging = true;
        window.galleryHasDragged = false;
        clickStartX = e.touches[0].clientX;
        clickStartY = e.touches[0].clientY;
        startX = e.touches[0].clientX - currentX;
        startY = e.touches[0].clientY - currentY;
    });
    window.addEventListener('touchmove', (e) => {
        if(!isDragging || !e.touches[0]) return;
        if (Math.abs(e.touches[0].clientX - clickStartX) > 5 || Math.abs(e.touches[0].clientY - clickStartY) > 5) {
            window.galleryHasDragged = true;
        }
        updatePosition(e.touches[0].clientX, e.touches[0].clientY);
    });
    window.addEventListener('touchend', () => isDragging = false);
}

function initParticles() {
    const canvas = document.getElementById('fx-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width, height;
    const resize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    const particles = [];
    for(let i=0; i<50; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1,
            alpha: Math.random() * 0.5 + 0.1
        });
    }

    const animate = () => {
        ctx.clearRect(0,0,width,height);
        
        ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--text-primary') || '#fff';
        
        particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            if(p.x < 0) p.x = width;
            if(p.x > width) p.x = 0;
            if(p.y < 0) p.y = height;
            if(p.y > height) p.y = 0;
            
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
            ctx.fill();
        });
        
        requestAnimationFrame(animate);
    };
    animate();
}

function initExhibitionRooms() {
    // If the user clicks a tag, we can manually change the room theme
    window.changeRoom = function(tag) {
        document.body.className = ''; // clear
        if(tag.includes('loneliness') || tag.includes('sad')) {
            document.body.classList.add('room-loneliness');
        } else if(tag.includes('dream') || tag.includes('love')) {
            document.body.classList.add('room-dream');
        } else if(tag.includes('life')) {
            document.body.classList.add('room-life');
        }
    };
}
