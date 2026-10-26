'use strict';
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const port = Number(process.env.PORT) || 4173;
const types = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg','.webm':'video/webm','.mp4':'video/mp4','.ico':'image/x-icon'};
http.createServer((req,res) => {
    let pathname;
    try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
    catch { res.writeHead(400).end('Bad request'); return; }
    const relative = pathname === '/' ? 'index.html' : pathname.replace(/^\/+/, '');
    const file = path.resolve(root, relative);
    if (!file.startsWith(root + path.sep) || relative.split(/[\\/]/).some(segment => segment.startsWith('.'))) {
        res.writeHead(403).end('Forbidden'); return;
    }
    fs.stat(file,(error,stat) => {
        if(error || !stat.isFile()) { res.writeHead(404).end('Not found'); return; }
        res.writeHead(200, {'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff'});
        fs.createReadStream(file).pipe(res);
    });
}).listen(port,'127.0.0.1',() => console.log(`Vsilva preview: http://127.0.0.1:${port}`));
