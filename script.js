document.addEventListener("DOMContentLoaded", () => {

    // 1. SISTEMA DE IDIOMAS (TRADUÇÕES)
    const translations = {
        pt: {
            navAbout: "Sobre",
            navPortfolio: "Portfólio",
            navContact: "Contato",
            heroTitle: "Editor de Vídeo & Youtuber",
            heroCTA: "Ver Portfólio",
            aboutTitle: "Sobre Mim",
            aboutText: "Eu sou o Vsilva, Editor de vídeo e Youtuber com +5 anos de experiência. Especializado em edição de conteúdo gamer, storytelling e shorts de alta retenção. Cada vídeo é uma experiência bem planejada e pensada para entreter da melhor forma possível, por isso, quero trazer isso para meus clientes!",
            worksTitle: "Trabalhos Selecionados",
            shortsTitle: "Shorts & Reels",
            contactTitle: "Ficou interessado? Vamos conversar.",
            footerText: "© 2026 Vsilva. Todos os direitos reservados.",
            work1Title: "Eu fiz um clone de FRIDAY NIGHT FUNKIN em 24 HORAS!",
            work1Desc: "Vídeo com a intro bem cativante e chamativa",
            work2Title: "Como o Friday Night Funkin' reviveu em 2024?",
            work2Desc: "Vídeo longo com ótima consistência na edição",
            work3Title: "Como eu VENCI a FINAL DESTINATION GOD?",
            work3Desc: "Vídeo com o melhor storytelling que ja editei",
            work4Title: "Friday Night Funkin na vida real - Target Practice",
            work4Desc: "Vídeo que simula uma gameplay de friday night funkin na edição",
            work5Title: "Eu sobrevivi a uma chunk no Minecraft",
            work5Desc: "Edição para o cliente Nauj, com uma edição mais dinâmica e engraçada, arquivada no meu canal",
            work6Title: "Vsilva Direct 09.05.2026",
            work6Desc: "Vídeo mais recente com efeitos especiais do after effects",
            short1Title: "Sobre Poppy Playtime Capítulo 5",
            short2Title: "Gameplay sobre Friday Night Funkin",
            short3Title: "Curiosidade do Friday Night Funkin",
            short4Title: "Collab de FNF e Kpop",
        },
        en: {
            navAbout: "About",
            navPortfolio: "Portfolio",
            navContact: "Contact",
            heroTitle: "Video Editor & Youtuber",
            heroCTA: "View Portfolio",
            aboutTitle: "About Me",
            aboutText: "I’m Vsilva, a Video Editor and YouTuber with over 5 years of experience. Specialized in gaming content editing, storytelling, and high-retention short-form videos. Every video is a carefully planned experience designed to entertain in the best way possible, that’s exactly what I want to bring to my clients!",
            worksTitle: "Selected Works",
            shortsTitle: "Shorts & Reels",
            contactTitle: "Interested? Let's talk.",
            footerText: "© 2026 Vsilva. All rights reserved.",
            work1Title: "I Made a FRIDAY NIGHT FUNKIN Clone in 24 HOURS!",
            work1Desc: "Video with a very catchy and attention-grabbing intro",
            work2Title: "How Did Friday Night Funkin' Make a Comeback in 2024?",
            work2Desc: "Long-form video with highly consistent editing",
            work3Title: "How Did I BEAT FINAL DESTINATION GOD?",
            work3Desc: "Video with the best storytelling I’ve ever edited",
            work4Title: "Friday Night Funkin in Real Life - Target Practice",
            work4Desc: "Video that simulates Friday Night Funkin gameplay through editing",
            work5Title: "I survived in ONE chunk in Minecraft!",
            work5Desc: "Work for my client Nauj, with a more dynamic and fun editing style",
            work6Title: "Vsilva Direct 05.09.2026",
            work6Desc: "Most recent video featuring After Effects visual effects",
            short1Title: "About Poppy Playtime Chapter 5",
            short2Title: "Friday Night Funkin Gameplay",
            short3Title: "Friday Night Funkin Trivia",
            short4Title: "FNF x K-pop Collab",
        }
    };

    const currentLang = localStorage.getItem("vsilva_lang") || "pt";
    const elementsToTranslate = document.querySelectorAll("[data-i18n]");

    const updateLanguage = (lang) => {
        elementsToTranslate.forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (translations[lang] && translations[lang][key]) {
                el.innerText = translations[lang][key];
            }
        });

        // Atualizar classes dos botões (desktop e mobile)
        document.getElementById("lang-pt").classList.toggle("active", lang === "pt");
        document.getElementById("lang-en").classList.toggle("active", lang === "en");
        document.getElementById("lang-pt-mobile").classList.toggle("active", lang === "pt");
        document.getElementById("lang-en-mobile").classList.toggle("active", lang === "en");

        localStorage.setItem("vsilva_lang", lang);
        document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    };

    // Setar idioma inicial
    updateLanguage(currentLang);

    // Event Listeners Idioma (Desktop)
    document.getElementById("lang-pt").addEventListener("click", () => updateLanguage("pt"));
    document.getElementById("lang-en").addEventListener("click", () => updateLanguage("en"));

    // Event Listeners Idioma (Mobile)
    document.getElementById("lang-pt-mobile").addEventListener("click", () => updateLanguage("pt"));
    document.getElementById("lang-en-mobile").addEventListener("click", () => updateLanguage("en"));

    // 2. STICKY NAVBAR BACKGROUND
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 3. MENU MOBILE (HAMBURGER)
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileLinks = document.querySelectorAll(".mobile-link");

    hamburger.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
    });

    mobileLinks.forEach(link => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
        });
    });

    // 4. ANIMATION ON SCROLL (INTERSECTION OBSERVER)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach((el, index) => {
        // Adiciona um pequeno delay baseado na ordem para efeito staggered, se estiverem juntos
        if (el.classList.contains('card') || el.classList.contains('short-card')) {
            el.style.transitionDelay = `${(index % 6) * 0.1}s`;
        }
        observer.observe(el);
    });

    // 5. MODAL DE VÍDEO E IFRAME
    const modal = document.getElementById('video-modal');
    const modalIframe = document.getElementById('modal-iframe');
    const closeModalBtn = document.querySelector('.close-modal');

    // Abrir Modal
    document.querySelectorAll('.card, .short-card').forEach(card => {
        card.addEventListener('click', () => {
            const videoId = card.getAttribute('data-video-id');
            // Verifica se não é o ID placeholder padrão
            if (videoId && !videoId.includes('VIDEO_ID_') && !videoId.includes('SHORT_ID_')) {
                modalIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
            } else {
                // Placeholder preview
                console.log("Substitua o VIDEO_ID no código HTML para reproduzir.");
                modalIframe.src = `https://www.youtube.com/embed/jxGJzbKT1hk?autoplay=1&rel=0`; // Fallback p/ demo reel pra visualização
            }
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Evita scroll do body
        });
    });

    // Fechar Modal
    const closeModal = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        modalIframe.src = ""; // Remove o SRC para parar o vídeo
        document.body.style.overflow = ''; // Restaura scroll
    };

    closeModalBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        // Fecha se clicar fora do conteúdo
        if (e.target === modal) {
            closeModal();
        }
    });

    // Fechar modal com a tecla ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

});