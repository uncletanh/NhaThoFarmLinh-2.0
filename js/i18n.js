const translations = {
    en: {
        // Navigation
        navHome: "Home",
        navPoetry: "Poetry",
        navThoughts: "Thoughts",
        navQuotes: "Quotes",
        navArchive: "Archive",
        navAbout: "About",
        
        // General
        footerText: "&copy; 2026 Notebook. Crafted with minimal intent.",
        
        // Home
        heroQuote: '"To pay attention, this is our endless and proper work."',
        heroAuthor: "— Mary Oliver",
        recentPoemsTitle: "Recent Poems",
        viewAllPoetry: "View All Poetry",
        latestThoughtsTitle: "Latest Thoughts",
        readAllEssays: "Read All Essays",
        aboutAuthorTitle: "About the Author",
        indexAboutPara: "I write to understand the world and myself. This digital space serves as a quiet garden for my poetry, essays, and collected fragments of thought.",
        moreAboutMeBtn: "More About Me",
        
        // Poetry
        poetryCollectionTitle: "Poetry Collection",
        searchPlaceholder: "Search by tag, title, or words...",
        filterAll: "All",
        readPoem: "Read Poem",
        collapsePoem: "Collapse",
        noPoemsFound: "No poems found matching your criteria.",
        
        // Thoughts
        thoughtsCollectionTitle: "Collected Thoughts",
        readEssay: "Read Essay",
        
        // Quotes
        quotesGeneratorHint: '"Press the button to reveal a thought."',
        quotesAuthorHint: "— Notebook",
        anotherQuoteBtn: "another quote",
        
        // Archive
        archiveTitle: "Archive",
        
        // About
        aboutPageTitle: "About the Author",
        aboutBio1: "Hello. I'm a writer and observer navigating the modern world. This digital notebook is where I collect my fragmented thoughts, distill experiences into poetry, and attempt to make sense of the noise.",
        aboutBio2: "My work primarily focuses on the intersection of nature, memory, and the solitary experience in urban environments. I believe that paying attention to the small, quiet moments is paramount in an era that constantly demands our distraction.",
        aboutBio3: "When I am not writing, you can find me wandering through city streets, reading in quiet corners, or simply watching the light change.",
        contactEmail: "Email",
        contactTwitter: "Twitter",
        contactInstagram: "Instagram"
    },
    vi: {
        // Navigation
        navHome: "Trang chủ",
        navPoetry: "Thơ",
        navThoughts: "Tản văn",
        navQuotes: "Trích dẫn",
        navArchive: "Lưu trữ",
        navAbout: "Về tôi",
        
        // General
        footerText: "&copy; 2026 Notebook. Chế tác với chủ đích tối giản.",
        
        // Home
        heroQuote: '"Sự chú tâm, đó là công việc vô tận và đích thực của chúng ta."',
        heroAuthor: "— Mary Oliver",
        recentPoemsTitle: "Thơ mới nhất",
        viewAllPoetry: "Xem tất cả Thơ",
        latestThoughtsTitle: "Tản văn gần đây",
        readAllEssays: "Đọc tất cả Tản văn",
        aboutAuthorTitle: "Về Tác Giả",
        indexAboutPara: "Tôi viết để thấu hiểu thế giới và thấu hiểu chính mình. Không gian kỹ thuật số này là một khu vườn tĩnh lặng dành cho những vần thơ, tản văn và những mảnh ghép suy tư.",
        moreAboutMeBtn: "Đọc thêm về tôi",
        
        // Poetry
        poetryCollectionTitle: "Tuyển Tập Thơ",
        searchPlaceholder: "Tìm kiếm từ khóa, tiêu đề, hoặc tag...",
        filterAll: "Tất cả",
        readPoem: "Đọc Thơ",
        collapsePoem: "Thu gọn",
        noPoemsFound: "Không tìm thấy bài thơ nào phù hợp.",
        
        // Thoughts
        thoughtsCollectionTitle: "Tản Văn Chọn Lọc",
        readEssay: "Đọc bài",
        
        // Quotes
        quotesGeneratorHint: '"Nhấn nút để khám phá một dòng suy tưởng."',
        quotesAuthorHint: "— Notebook",
        anotherQuoteBtn: "trích dẫn khác",
        
        // Archive
        archiveTitle: "Lưu Trữ",
        
        // About
        aboutPageTitle: "Về Tác Giả",
        aboutBio1: "Xin chào. Tôi là một người viết và quan sát thế giới hiện đại. Cuốn sổ tay kỹ thuật số này là nơi tôi gom nhặt những suy nghĩ vụn vặt, chưng cất những trải nghiệm thành thơ, và nỗ lực tìm kiếm ý nghĩa giữa những ồn ào.",
        aboutBio2: "Các tác phẩm của tôi chủ yếu tập trung vào sự giao thoa giữa thiên nhiên, ký ức và trải nghiệm cô độc giữa lòng đô thị. Tôi tin rằng việc chú tâm vào những khoảnh khắc nhỏ bé, tĩnh lặng là điều vô cùng quan trọng trong một thời đại luôn không ngừng lấy đi sự phân tán của chúng ta.",
        aboutBio3: "Khi không viết, bạn có thể tìm thấy tôi lang thang trên những con phố, đọc sách ở những góc yên tĩnh, hoặc chỉ đơn giản là đang ngắm nhìn ánh sáng thay đổi.",
        contactEmail: "Email",
        contactTwitter: "Twitter",
        contactInstagram: "Instagram"
    }
};

let currentLang = localStorage.getItem('lang') || 'vi'; // Default to vietnamese as requested mostly

function initI18n() {
    // Attempt to set lang on load
    updateDOM(currentLang);

    // Setup toggle button listeners across all pages
    const langToggleBtn = document.getElementById('lang-toggle');
    if (langToggleBtn) {
        // Update button text to reflect current state
        langToggleBtn.textContent = currentLang === 'vi' ? 'EN' : 'VI';
        
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'vi' ? 'en' : 'vi';
            localStorage.setItem('lang', currentLang);
            langToggleBtn.textContent = currentLang === 'vi' ? 'EN' : 'VI';
            updateDOM(currentLang);
            
            // Dispatch a custom event so dynamic scripts (like random quotes) know translation happened
            window.dispatchEvent(new Event('languageChanged'));
        });
    }
}

function updateDOM(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (el.tagName === 'INPUT' && el.type === 'text') {
                el.placeholder = translations[lang][key];
            } else {
                el.innerHTML = translations[lang][key];
            }
        }
    });

    // Update dynamic text via script if needed instances
    window.currentLangDict = translations[lang];
}

// Automatically init when DOM is ready
document.addEventListener('DOMContentLoaded', initI18n);
