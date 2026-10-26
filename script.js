(() => {
    'use strict';
    const { selectedWorks, shorts, translations } = window.PORTFOLIO_DATA;
    const dialog = document.getElementById('video-modal');
    const frame = document.getElementById('player-frame');
    const playerTitle = document.getElementById('player-title');
    const externalLink = document.getElementById('player-external');
    const videos = new Map([...selectedWorks, ...shorts].map(video => [video.id, video]));
    let language = 'pt';
    let returnFocus = null;
    let activeVideo = null;
    const backgroundVideo = document.getElementById('about-background-video');
    const motionToggle = document.getElementById('motion-toggle');
    const motionLabel = document.getElementById('motion-label');
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let userPausedMotion = false;
    let aboutInView = false;
    let backgroundLoaded = false;

    // Storage may be disabled in private browsing or on a file:// preview.
    try {
        const saved = localStorage.getItem('vsilva_lang');
        if (saved === 'pt' || saved === 'en') language = saved;
        userPausedMotion = localStorage.getItem('vsilva_motion_paused') === 'true';
    } catch { /* The page still works without persistent preferences. */ }

    const t = key => translations[language][key];
    const create = (tag, className, text) => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;
        return element;
    };
    const videoUrl = (video, vertical) => vertical
        ? `https://www.youtube.com/shorts/${video.id}`
        : `https://www.youtube.com/watch?v=${video.id}`;

    function playbackLink(video, vertical, className) {
        const link = create('a', className);
        link.href = videoUrl(video, vertical);
        link.dataset.videoId = video.id;
        link.dataset.vertical = String(vertical);
        return link;
    }

    function renderCard(video, index, vertical) {
        const card = create('article', vertical ? 'short-card' : 'work-card');
        const title = video.title[language];
        const link = playbackLink(video, vertical, 'video-link');
        link.setAttribute('aria-label', t('watchAria') + title);
        const image = create('img');
        image.width = vertical ? 360 : 640;
        image.height = vertical ? 640 : 360;
        image.alt = t('thumbnail') + title;
        image.loading = 'lazy';
        image.decoding = 'async';
        // Original thumbnails are retained. Local copies prevent network-dependent
        // loading; hqdefault is the original URL if a copy cannot be loaded.
        image.src = `assets/thumbnails/${video.id}.webp`;
        image.addEventListener('error', () => {
            if (image.dataset.fallback) return;
            image.dataset.fallback = 'true';
            image.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
        });
        const number = create('span', 'video-number', String(index + 1).padStart(2, '0'));
        number.setAttribute('aria-hidden', 'true');
        const format = create('span', 'video-format', vertical ? '9:16' : '16:9');
        format.setAttribute('aria-hidden', 'true');
        const play = create('span', 'play-button');
        play.setAttribute('aria-hidden', 'true');
        // Fixed SVG only; all editable content is inserted with textContent.
        play.innerHTML = '<svg viewBox="0 0 24 24" focusable="false"><path d="M8 5v14l11-7z"/></svg>';
        link.append(image, number, format, play);
        card.append(link);
        if (!vertical) {
            const meta = create('div', 'work-meta');
            meta.append(create('span', '', video.category[language]), create('span', '', 'LONGFORM'));
            card.append(meta);
        }
        const heading = create('h3');
        const titleLink = playbackLink(video, vertical, 'title-link');
        titleLink.textContent = title;
        heading.append(titleLink);
        card.append(heading);
        if (vertical) {
            card.append(create('p', 'short-category', video.category[language]));
        } else {
            card.append(create('p', 'work-description', video.description[language]));
            const watch = playbackLink(video, false, 'watch-link');
            watch.setAttribute('aria-label', t('watchAria') + title);
            const arrow = create('span', '', '↗');
            arrow.setAttribute('aria-hidden', 'true');
            watch.append(create('span', '', t('watch')), arrow);
            card.append(watch);
        }
        return card;
    }

    function updateLanguage(nextLanguage) {
        language = nextLanguage === 'en' ? 'en' : 'pt';
        const attributes = [['data-i18n', null], ['data-i18n-aria', 'aria-label'], ['data-i18n-alt', 'alt']];
        attributes.forEach(([dataAttribute, targetAttribute]) => {
            document.querySelectorAll(`[${dataAttribute}]`).forEach(element => {
                const value = t(element.getAttribute(dataAttribute));
                if (value === undefined) return;
                if (targetAttribute) element.setAttribute(targetAttribute, value);
                else element.textContent = value;
            });
        });
        document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
        document.querySelectorAll('[data-language]').forEach(button => {
            button.setAttribute('aria-pressed', String(button.dataset.language === language));
        });
        document.getElementById('works-grid').replaceChildren(...selectedWorks.map((video, index) => renderCard(video, index, false)));
        document.getElementById('shorts-grid').replaceChildren(...shorts.map((video, index) => renderCard(video, index, true)));
        document.querySelector('meta[name="description"]').content = t('metaDescription');
        document.querySelector('meta[property="og:description"]').content = t('socialDescription');
        document.querySelector('meta[name="twitter:description"]').content = t('socialDescription');
        document.querySelector('meta[property="og:locale"]').content = language === 'pt' ? 'pt_BR' : 'en_US';
        document.querySelector('meta[property="og:image:alt"]').content = t('socialAlt');
        if (activeVideo) {
            playerTitle.textContent = activeVideo.title[language];
            const iframe = frame.querySelector('iframe');
            if (iframe) iframe.title = t('playerTitle') + activeVideo.title[language];
        }
        syncMotion();
        try { localStorage.setItem('vsilva_lang', language); } catch { /* Optional. */ }
    }

    function openVideo(video, vertical, trigger) {
        // Modified clicks retain the real href, including opening a new tab.
        if (typeof dialog.showModal !== 'function') {
            window.location.assign(videoUrl(video, vertical));
            return;
        }
        if (dialog.open) dialog.close();
        returnFocus = trigger;
        activeVideo = video;
        playerTitle.textContent = video.title[language];
        externalLink.href = videoUrl(video, vertical);
        dialog.classList.toggle('is-vertical', vertical);
        const iframe = create('iframe');
        iframe.title = t('playerTitle') + video.title[language];
        iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        iframe.allowFullscreen = true;
        iframe.referrerPolicy = 'strict-origin-when-cross-origin';
        // Exactly one iframe, created only on user interaction.
        iframe.src = `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&playsinline=1`;
        frame.replaceChildren(iframe);
        document.body.classList.add('modal-open');
        dialog.showModal();
        syncMotion();
        dialog.querySelector('.close-modal').focus();
    }

    document.querySelectorAll('[data-language]').forEach(button => {
        button.addEventListener('click', () => updateLanguage(button.dataset.language));
    });
    document.addEventListener('click', event => {
        const link = event.target.closest('a[data-video-id]');
        if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        const video = videos.get(link.dataset.videoId);
        if (!video) return;
        event.preventDefault();
        openVideo(video, link.dataset.vertical === 'true', link);
    });
    dialog.querySelector('.close-modal').addEventListener('click', () => dialog.close());
    // Native Escape handling also calls this cleanup via the close event.
    dialog.addEventListener('close', () => {
        frame.replaceChildren(); // Destroy the browsing context: playback stops.
        document.body.classList.remove('modal-open');
        activeVideo = null;
        syncMotion();
        if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
        returnFocus = null;
    });
    // Keep Tab within the first/last controls even when browser chrome would
    // otherwise receive focus. The native dialog handles the iframe interior.
    dialog.addEventListener('keydown', event => {
        if (event.key !== 'Tab') return;
        const first = dialog.querySelector('.close-modal');
        const last = externalLink;
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    });
    let backdropPress = false;
    dialog.addEventListener('pointerdown', event => { backdropPress = event.target === dialog; });
    dialog.addEventListener('click', event => {
        if (backdropPress && event.target === dialog) dialog.close();
        backdropPress = false;
    });

    // Decorative motion is optional, pauses out of view, and never competes
    // with a portfolio player. Video sources are only attached when needed.
    function syncMotion() {
        const paused = userPausedMotion || motionPreference.matches || document.hidden || dialog.open;
        document.body.classList.toggle('motion-paused', paused);
        motionToggle.hidden = motionPreference.matches;
        motionToggle.setAttribute('aria-pressed', String(userPausedMotion));
        motionLabel.textContent = t(userPausedMotion ? 'motionResume' : 'motionPause');
        if (paused || !aboutInView) {
            backgroundVideo.pause();
            return;
        }
        if (!backgroundLoaded) {
            backgroundVideo.querySelectorAll('source[data-src]').forEach(source => {
                source.src = source.dataset.src;
            });
            backgroundVideo.muted = true;
            backgroundVideo.load();
            backgroundLoaded = true;
        }
        backgroundVideo.play().catch(() => { /* The poster remains if autoplay is unavailable. */ });
    }
    motionToggle.addEventListener('click', () => {
        userPausedMotion = !userPausedMotion;
        try { localStorage.setItem('vsilva_motion_paused', String(userPausedMotion)); } catch { /* Optional. */ }
        syncMotion();
    });
    motionPreference.addEventListener('change', syncMotion);
    document.addEventListener('visibilitychange', syncMotion);
    if ('IntersectionObserver' in window) {
        const motionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                entry.target.classList.toggle('is-in-view', entry.isIntersecting);
                if (entry.target.id === 'about') {
                    aboutInView = entry.isIntersecting;
                    syncMotion();
                }
            });
        }, { threshold: 0 });
        document.querySelectorAll('.wave-section, #about').forEach(section => motionObserver.observe(section));
    } else {
        aboutInView = true;
        document.querySelectorAll('.wave-section').forEach(section => section.classList.add('is-in-view'));
    }

    const header = document.getElementById('navbar');
    const syncHeader = () => header.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', syncHeader, { passive: true });
    syncHeader();
    // Active section feedback without changing the URL or interfering with scroll.
    if ('IntersectionObserver' in window) {
        const navigationLinks = document.querySelectorAll('.main-nav a');
        const sectionObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                navigationLinks.forEach(link => {
                    if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
                    else link.removeAttribute('aria-current');
                });
            });
        }, { rootMargin: '-15% 0px -60% 0px', threshold: 0 });
        document.querySelectorAll('main > section').forEach(section => sectionObserver.observe(section));
    }
    document.getElementById('copyright-year').textContent = new Date().getFullYear();
    updateLanguage(language);
})();
