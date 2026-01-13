document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       1. SCROLL İLE BELİREN ELEMANLAR (REVEAL)
    ========================================= */
    function revealOnScroll() {
        document.querySelectorAll(".reveal").forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 100) {
                el.classList.add("active");
            }
        });
    }
    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Sayfa açılınca da çalışsın

    /* =========================================
       2. TEMA DEĞİŞTİRME (DARK / LIGHT MODE)
    ========================================= */
    const toggleBtn = document.getElementById("themeToggle");
    
    // Kayıtlı temayı yükle
    if(localStorage.getItem("theme") === "light"){
        document.body.classList.add("light");
        toggleBtn.textContent = "☀️";
    } else {
        toggleBtn.textContent = "🌙";
    }

    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light");
        if(document.body.classList.contains("light")){
            localStorage.setItem("theme","light");
            toggleBtn.textContent = "☀️";
        } else {
            localStorage.setItem("theme","dark");
            toggleBtn.textContent = "🌙";
        }
    });

    /* =========================================
       3. YAZI YAZMA EFEKTİ (TYPING EFFECT)
    ========================================= */
    const typingElement = document.getElementById("typing-text");
    const texts = {
        tr: [
            "Bilgisayar Ağları ile ilgileniyorum",
            "Temel Siber Güvenlik öğreniyorum",
            "Web projeleri geliştiriyorum"
        ],
        en: [
            "I am interested in Computer Networks",
            "I am learning Basic Cybersecurity",
            "I develop Web projects"
        ]
    };

    let count = 0;
    let index = 0;
    let currentText = "";
    let letter = "";
    let currentLang = localStorage.getItem('siteLang') || 'tr';

    function type() {
        if (count === texts[currentLang].length) count = 0;
        currentText = texts[currentLang][count];
        letter = currentText.slice(0, ++index);

        if(typingElement) {
            typingElement.textContent = letter;
        }

        if (letter.length === currentText.length) {
            setTimeout(() => {
                index = 0;
                count++;
            }, 1500);
        }
        setTimeout(type, 100);
    }
    type();

    /* =========================================
       4. DİL DEĞİŞTİRME (TR / EN)
    ========================================= */
    const langButtons = document.querySelectorAll('.lang-switch button');
    const translatableElements = document.querySelectorAll('[data-tr][data-en]');

    function setLanguage(lang) {
        translatableElements.forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });
        langButtons.forEach(b => b.classList.remove('active'));
        const activeBtn = document.querySelector(`.lang-switch button[data-lang="${lang}"]`);
        if(activeBtn) activeBtn.classList.add('active');
        
        localStorage.setItem('siteLang', lang);
        currentLang = lang; // Typing efektini de güncelle
    }

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
            // Typing efekti sıfırlansın
            count = 0; 
            index = 0;
        });
    });

    // Kayıtlı dili uygula
    const savedLang = localStorage.getItem('siteLang') || 'tr';
    setLanguage(savedLang);

    /* =========================================
       5. YETENEK ÇUBUKLARI ANİMASYONU
    ========================================= */
    function animateLanguageBars() {
        document.querySelectorAll(".language-card").forEach(card => {
            const rect = card.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                const bar = card.querySelector(".level-bar span");
                const level = bar.getAttribute("data-level");
                bar.style.width = level + "%";
            }
        });
    }
    window.addEventListener("scroll", animateLanguageBars);
    animateLanguageBars();

    /* =========================================
       6. HAMBURGER MENÜ (MOBİL)
    ========================================= */
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if(menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            const icon = menuToggle.querySelector('i');
            if(navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Linke tıklayınca menüyü kapat
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if(navLinks) navLinks.classList.remove('active');
            if(menuToggle) {
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    /* =========================================
       7. PROJE FİLTRELEME (YENİ EKLENEN)
    ========================================= */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Aktif butonu değiştir
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === cardCategory) {
                    card.classList.remove('hide');
                    card.classList.add('show');
                } else {
                    card.classList.add('hide');
                    card.classList.remove('show');
                }
            });
        });
    });

});