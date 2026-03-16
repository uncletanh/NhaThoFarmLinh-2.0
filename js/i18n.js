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
        heroQuote: '"I\'ve never played for a draw in my life."',
        heroAuthor: "— Sir Alex Ferguson",
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
        aboutBio1: "Hello. I'm a writer, a coder, and an observer navigating the chaos of young adulthood. This digital notebook is where I collect my fragmented thoughts, distill 4 AM sleepless nights into poetry, and attempt to make sense of the noise—whether it's the clatter of a bakery kitchen or the ping of a late-night game.",
        aboutBio2: "My work primarily focuses on the intersection of unrequited love, midnight food cravings, and the solitary experience of a crowded Hanoi. I believe that paying attention to our rawest emotions—the lingering memory of an old crush, the fleeting joy of a good snack, or the existential dread of dropping to Diamond 4—is paramount in an era that constantly demands our distraction.",
        aboutBio3: "When I am not writing or building software, you can find me grinding Teamfight Tactics, wandering through the memories of what used to be, or simply trying (and failing) to get a full eight hours of sleep.",
        contactEmail: "Email",
        contactFacebook: "Facebook",
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
        heroQuote: '"Tôi chưa bao giờ ra sân để tìm kiếm một trận hòa trong suốt cuộc đời mình."',
        heroAuthor: "— Sir Alex Ferguson",
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
        aboutBio1: "Xin chào. Tôi là một người thích viết, một lập trình viên, và là một người quan sát những lộn xộn của tuổi trẻ. Cuốn sổ tay này là nơi tôi nhặt nhạnh những mảnh suy nghĩ vụn vặt, chưng cất những đêm thức trắng 4h sáng thành thơ, và cố gắng tìm ý nghĩa giữa những ồn ào—từ tiếng lạch cạch của căn bếp bánh đến âm thanh hối hả của những trận game đêm.",
        aboutBio2: "Thơ của tôi chủ yếu xoay quanh sự giao thoa giữa những mối tình đơn phương, những cơn thèm ăn lúc nửa đêm, và trải nghiệm cô độc giữa lòng Hà Nội. Tôi tin rằng việc lắng nghe những cảm xúc trần trụi nhất—dù là nỗi nhớ một bóng hình cũ, niềm vui cỏn con từ một món ăn ngon, hay sự suy sụp khi tụt rank Kim Cương—là điều vô giá trong một thời đại luôn chực chờ xao nhãng.",
        aboutBio3: "Khi không làm thơ hay chạy deadline dự án, bạn có thể tìm thấy tôi đang cày cuốc Đấu Trường Chân Lý, lang thang trong những hoài niệm cũ, hoặc đơn giản là đang vật lộn để có thể ngủ đủ 8 tiếng một ngày.",
        contactEmail: "Email",
        contactFacebook: "Facebook",
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
