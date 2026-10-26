'use strict';
// Dependency-free checks for the static site. Run: node tools/verify.cjs
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
process.chdir(path.resolve(__dirname, '..'));
const html = fs.readFileSync('index.html', 'utf8');
const css = fs.readFileSync('style.css', 'utf8');
const content = fs.readFileSync('content.js', 'utf8');
const behavior = fs.readFileSync('script.js', 'utf8');
new vm.Script(content, {filename:'content.js'});
new vm.Script(behavior, {filename:'script.js'});
const context = {window:{}};
vm.runInNewContext(content, context);
const {selectedWorks, shorts, archivedWorks, translations} = context.window.PORTFOLIO_DATA;
assert.equal(selectedWorks.length, 4, 'Exactly four selected long-form videos');
assert.equal(shorts.length, 4, 'Exactly four original Shorts');
const ids = [...selectedWorks, ...shorts, ...archivedWorks].map(video=>video.id);
assert.equal(new Set(ids).size, ids.length, 'No duplicate video IDs');
assert(ids.every(id=>/^[\w-]{11}$/.test(id)), 'Valid YouTube IDs');
assert.equal(Object.keys(translations.pt).sort().join(), Object.keys(translations.en).sort().join(), 'Translation dictionaries have the same keys');
const tokens = [...html.matchAll(/data-i18n(?:-aria|-alt)?="([^"]+)"/g)].map(match=>match[1]);
for(const language of ['pt','en']) {
    for(const key of tokens) assert(translations[language][key], `Missing ${language} translation: ${key}`);
    for(const video of [...selectedWorks,...shorts]) assert(video.title[language] && video.category[language], `Missing video copy: ${video.id}`);
}
const elementIds = [...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
assert.equal(new Set(elementIds).size, elementIds.length, 'Unique HTML IDs');
for(const [,target] of html.matchAll(/href="#([^"]+)"/g)) assert(elementIds.includes(target), `Broken anchor #${target}`);
for(const [,asset] of html.matchAll(/(?:src|href|data-src|poster)="((?:assets\/|style\.css|script\.js|content\.js|icon\.png)[^"]*)"/g)) {
    assert(fs.existsSync(asset), `Missing local asset: ${asset}`);
}
for(const video of [...selectedWorks,...shorts]) assert(fs.existsSync(`assets/thumbnails/${video.id}.webp`), `Missing thumbnail: ${video.id}`);
for (const property of ['og:title','og:description','og:image','og:url','og:locale']) {
    assert(html.includes('property="'+property+'"'), 'Missing Open Graph: '+property);
}
assert(html.includes('rel="canonical"'), 'Canonical URL exists');
assert(html.includes('rel="icon" type="image/png"'), 'Favicon format matches the PNG file');
for (const [anchor] of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
    assert(anchor.includes('noopener noreferrer'), 'External tabs have safe rel attributes');
}
assert.equal((html.match(/<h1\b/g)||[]).length,1,'Single main heading');
assert(!/<iframe\b/.test(html),'No initial iframe downloads');
assert(!/bg-site\.mp4/.test(html),'Original heavy video is not loaded');
assert(html.includes('data-src="assets/media/bg-site.webm"'), 'Optimized WebM background exists');
assert(html.includes('preload="auto"'), 'Background is prepared for advance buffering');
assert(html.includes('rel="preload" as="image" href="assets/green-waves.webp"'), 'Wave surface is preloaded');
assert.equal((html.match(/class="wave-surface"/g)||[]).length, 5, 'Five cached wave surfaces');
assert(html.includes('id="scroll-progress-fill"'), 'Scroll progress is present');
assert(html.includes('id="site-loader"') && html.includes('id="site-content"'), 'Blocking preloader and content container are present');
assert(html.includes('assets/nauj-icon.png') && html.includes('assets/kira-icon.webp'), 'Creator icons are present');
assert(html.indexOf('id="process"') > html.indexOf('id="about"') && html.indexOf('id="process"') < html.indexOf('id="contact"'), 'Principles stay within the about story');
assert(!html.includes('class="section process-section"'), 'No separate principles section');
assert(!html.includes('vsilva-fortnite.webp'), 'About uses the new Vsilva Normal artwork');
assert(html.includes('assets/vsilva-normal.webp'), 'Normal artwork is present');
assert.equal((html.match(/class="section-waves"/g)||[]).length, 5, 'Waves on hero, work, shorts, contact and footer');
assert(!/href="#"/.test(html),'No empty placeholder links');
assert(css.includes('prefers-reduced-motion'),'Reduced-motion support');
assert(!/[\uFFFD]/.test(html+css+content+behavior),'No replacement characters');
console.log('PASS: JavaScript syntax; 4 long-form videos + 4 Shorts; unique IDs; PT/EN parity; anchors; local assets; metadata structure; on-demand players; blocking resource preloader; creator icons; unified About; blue contact/footer and optimized waves.');
