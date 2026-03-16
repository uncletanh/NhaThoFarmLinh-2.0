/**
 * Core Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initScrollHeader();
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

/**
 * Universal HTML snippet injector for header and footer to keep code DRY.
 * Since this is a static site without a SSG, we can inject shared UI via JS if requested.
 * But keeping standard HTML structure in files is safer for simple static sites.
 */
