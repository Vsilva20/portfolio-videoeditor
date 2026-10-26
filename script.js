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
    let siteReady = false;
    let startupGeneration = 0;
    let startupController = null;
    let backgroundObjectUrl = null;
    const siteContent = document.getElementById('site-content');
    const loader = document.getElementById('site-loader');
    const loaderStatus = document.getElementById('loader-status');
    const loaderRetry = document.getElementById('loader-retry');
    siteContent.inert = true;
    siteContent.setAttribute('aria-hidden', 'true');
    siteContent.setAttribute('aria-busy', 'true');

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
        image.loading = 'eager';
        image.decoding = 'async';
        // Original thumbnails are retained. Local copies prevent network-dependent
        // loading; hqdefault is the original URL if a copy cannot be loaded.
        image.src = `assets/thumbnails/${video.id}.webp`;
        image.addEventListener('error', () => {
            if (image.dataset.fallback) return;
            image.dataset.fallback = 'true';
            image.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
        });
        const play = create('span', 'play-button');
        play.setAttribute('aria-hidden', 'true');
        // Fixed SVG only; all editable content is inserted with textContent.
        play.innerHTML = '<svg viewBox="0 0 24 24" focusable="false"><path d="M8 5v14l11-7z"/></svg>';
        link.append(image, play);
        card.append(link);
        if (!vertical) {
            const meta = create('div', 'work-meta');
            meta.append(create('span', '', video.category[language]));
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

    function syncMotion() {
        const paused = !siteReady || userPausedMotion || motionPreference.matches || document.hidden || dialog.open;
        document.body.classList.toggle('motion-paused', paused);
        motionToggle.hidden = motionPreference.matches;
        motionToggle.setAttribute('aria-pressed', String(userPausedMotion));
        motionLabel.textContent = t(userPausedMotion ? 'motionResume' : 'motionPause');
        if (paused || !aboutInView) {
            backgroundVideo.pause();
            return;
        }
        if (!backgroundLoaded) return;
        backgroundVideo.play().catch(() => { /* Keep the poster if autoplay is unavailable. */ });
    }
    backgroundVideo.addEventListener('playing', () => {
        backgroundVideo.parentElement.classList.add('is-video-ready');
    });
    const waveImage = document.querySelector('.wave-surface');
    const markWavesReady = () => document.documentElement.classList.add('waves-ready');
    if (waveImage?.decode) waveImage.decode().then(markWavesReady).catch(markWavesReady);
    else if (waveImage?.complete) markWavesReady();
    else waveImage?.addEventListener('load', markWavesReady, { once: true });
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
    const progressFill = document.getElementById('scroll-progress-fill');
    let headerFrame = 0;
    const paintHeader = () => {
        headerFrame = 0;
        const scrollTop = window.scrollY;
        const scrollRange = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = scrollRange > 0 ? Math.min(1, Math.max(0, scrollTop / scrollRange)) : 0;
        header.classList.toggle('scrolled', scrollTop > 20);
        progressFill.style.transform = 'scaleX(' + progress.toFixed(4) + ')';
    };
    const syncHeader = () => { if (!headerFrame) headerFrame = window.requestAnimationFrame(paintHeader); };
    window.addEventListener('scroll', syncHeader, { passive: true });
    window.addEventListener('resize', syncHeader, { passive: true });
    window.addEventListener('load', syncHeader, { once: true });
    if ('ResizeObserver' in window) new ResizeObserver(syncHeader).observe(document.body);
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

    function withDeadline(promise, milliseconds = 45000) {
        let timer;
        const deadline = new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('Resource loading timed out')), milliseconds); });
        return Promise.race([promise, deadline]).finally(() => clearTimeout(timer));
    }
    function imageReady(image) {
        image.loading = 'eager';
        return withDeadline(new Promise((resolve, reject) => {
            let requestedSource = image.src;
            const cleanup = () => {
                image.removeEventListener('load', loaded);
                image.removeEventListener('error', failed);
            };
            const loaded = () => {
                cleanup();
                if (!image.naturalWidth) { reject(new Error('Image unavailable')); return; }
                if (image.decode) image.decode().then(resolve, reject);
                else resolve();
            };
            const failed = () => {
                // Existing thumbnail fallback can change src during the error event.
                if (image.src !== requestedSource) { requestedSource = image.src; return; }
                cleanup();
                reject(new Error('Image unavailable'));
            };
            image.addEventListener('load', loaded);
            image.addEventListener('error', failed);
            if (image.complete && image.naturalWidth) loaded();
            else if (image.complete) image.src = image.getAttribute('src');
        }));
    }
    function videoFrameReady() {
        if (backgroundVideo.readyState >= 2) return Promise.resolve();
        return withDeadline(new Promise((resolve, reject) => {
            const cleanup = () => {
                backgroundVideo.removeEventListener('loadeddata', ready);
                backgroundVideo.removeEventListener('error', failed);
            };
            const ready = () => { cleanup(); resolve(); };
            const failed = () => { cleanup(); reject(new Error('Video could not be decoded')); };
            backgroundVideo.addEventListener('loadeddata', ready, { once: true });
            backgroundVideo.addEventListener('error', failed, { once: true });
        }));
    }
    async function preloadCompleteVideo(signal, update) {
        if (backgroundLoaded) { await videoFrameReady(); update(1); return; }
        const sources = [...backgroundVideo.querySelectorAll('source[data-src]')].filter(source => backgroundVideo.canPlayType(source.type));
        let lastError = new Error('No compatible video source');
        for (const source of sources) {
            try {
                const response = await fetch(source.dataset.src, { signal, credentials: 'same-origin' });
                if (!response.ok) throw new Error('Video request failed');
                const total = Number(response.headers.get('content-length'));
                let blob;
                if (response.body) {
                    const reader = response.body.getReader();
                    const chunks = [];
                    let received = 0;
                    for (;;) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        chunks.push(value);
                        received += value.byteLength;
                        if (total > 0) update(Math.min(.95, received / total * .95));
                    }
                    blob = new Blob(chunks, { type: source.type });
                } else blob = await response.blob();
                if (!blob.size) throw new Error('Empty video');
                if (backgroundObjectUrl) URL.revokeObjectURL(backgroundObjectUrl);
                backgroundObjectUrl = URL.createObjectURL(blob);
                backgroundVideo.src = backgroundObjectUrl;
                backgroundVideo.preload = 'auto';
                backgroundVideo.muted = true;
                backgroundVideo.load();
                await videoFrameReady();
                backgroundLoaded = true;
                update(1);
                return;
            } catch (error) {
                lastError = error;
                if (signal.aborted) throw error;
            }
        }
        throw lastError;
    }
    async function runStartup() {
        const generation = ++startupGeneration;
        startupController?.abort();
        startupController = new AbortController();
        const { signal } = startupController;
        const networkDeadline = setTimeout(() => startupController.abort(), 60000);
        loader.hidden = false;
        loader.dataset.state = 'loading';
        loaderRetry.hidden = true;
        loaderStatus.textContent = t('loaderStatus');
        const progress = new Map();
        const weights = new Map();
        const paintProgress = () => {
            if (generation !== startupGeneration || loader.dataset.state === 'error') return;
            let complete = 0, total = 0;
            weights.forEach((weight, key) => { total += weight; complete += weight * (progress.get(key) || 0); });
            const percentage = total ? Math.min(99, Math.floor(complete / total * 100)) : 0;
            document.getElementById('loader-fill').style.transform = 'scaleX(' + percentage / 100 + ')';
            document.getElementById('loader-percentage').textContent = String(percentage);
            document.getElementById('loader-progress').setAttribute('aria-valuenow', String(percentage));
        };
        const entries = [...siteContent.querySelectorAll('img')];
        for (const url of [backgroundVideo.poster, 'icon.png']) {
            const image = new Image();
            image.src = url;
            entries.push(image);
        }
        const tasks = entries.map((image, index) => ({
            key: 'image-' + index, weight: 30 / entries.length,
            run: () => imageReady(image)
        }));
        tasks.push({ key: 'fonts', weight: 5, run: async () => {
            await new Promise(resolve => requestAnimationFrame(resolve));
            if (document.fonts) await withDeadline(document.fonts.ready);
        } });
        tasks.push({ key: 'document', weight: 5, run: () => withDeadline(new Promise(resolve => {
            if (document.readyState === 'complete') resolve();
            else window.addEventListener('load', resolve, { once: true });
        })).then(() => {
            if (!document.querySelector('link[href="style.css"]').sheet) throw new Error('Stylesheet unavailable');
        }) });
        tasks.push({ key: 'video', weight: 60, run: update => preloadCompleteVideo(signal, update) });
        tasks.forEach(task => { weights.set(task.key, task.weight); progress.set(task.key, 0); });
        paintProgress();
        loader.focus({ preventScroll: true });
        try {
            await Promise.all(tasks.map(task => task.run(value => { progress.set(task.key, value); paintProgress(); }).then(() => {
                progress.set(task.key, 1);
                paintProgress();
            })));
            if (generation !== startupGeneration) return;
            clearTimeout(networkDeadline);
            document.getElementById('loader-fill').style.transform = 'scaleX(1)';
            document.getElementById('loader-percentage').textContent = '100';
            document.getElementById('loader-progress').setAttribute('aria-valuenow', '100');
            await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
            siteReady = true;
            siteContent.inert = false;
            siteContent.removeAttribute('aria-hidden');
            siteContent.setAttribute('aria-busy', 'false');
            document.documentElement.classList.remove('is-loading');
            document.documentElement.classList.add('is-loaded');
            loader.dataset.state = 'complete';
            loader.classList.add('is-complete');
            loader.setAttribute('aria-hidden', 'true');
            syncMotion();
            syncHeader();
            if (loader.contains(document.activeElement)) {
                const main = document.getElementById('main');
                main.tabIndex = -1;
                main.focus({ preventScroll: true });
            }
            window.setTimeout(() => { loader.hidden = true; }, motionPreference.matches ? 0 : 350);
        } catch (error) {
            clearTimeout(networkDeadline);
            if (generation !== startupGeneration) return;
            startupController.abort();
            loader.dataset.state = 'error';
            loaderStatus.textContent = t('loaderError');
            loaderRetry.hidden = false;
            loaderRetry.focus({ preventScroll: true });
        }
    }
    loaderRetry.addEventListener('click', event => { event.preventDefault(); runStartup(); });

    document.getElementById('copyright-year').textContent = new Date().getFullYear();
    updateLanguage(language);
    runStartup();
})();
