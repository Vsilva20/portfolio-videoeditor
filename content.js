/* Content source: original index.html + script.js. Original IDs retained; public titles verified through YouTube oEmbed on 2026-10-26.
 * To update the portfolio, edit selectedWorks / shorts. No build step is required.
 * Case-study copy and shared interface translations are below.
 */
window.PORTFOLIO_DATA = {
    selectedWorks: [
        {
            id: 'jxGJzbKT1hk',
            title: { pt: 'Eu fiz um clone de FRIDAY NIGHT FUNKIN em 24 HORAS!', en: 'I Made a FRIDAY NIGHT FUNKIN Clone in 24 HOURS!' },
            category: { pt: 'Games / Desenvolvimento / Desafio', en: 'Games / Development / Challenge' },
            description: { pt: 'Um desafio de criação com uma abertura que apresenta a ideia e dá ritmo à história.', en: 'A creative challenge with an opening that sets up the idea and gets the story moving.' }
        },
        {
            id: 'K36QHbpJZns',
            title: { pt: "Como o Friday Night Funkin' reviveu em 2024?", en: "How Did Friday Night Funkin' Make a Comeback in 2024?" },
            category: { pt: 'Documentário / Storytelling / Análise', en: 'Documentary / Storytelling / Analysis' },
            description: { pt: 'Uma história do universo FNF, com atenção à estrutura narrativa e à consistência da edição.', en: 'A story from the FNF universe, shaped by narrative structure and a consistent editorial rhythm.' }
        },
        {
            id: 'hi9s-pHsD5Y',
            legacyTitle: 'Eu sobrevivi a uma chunk no Minecraft',
            title: { pt: 'Sobrevivi a uma chunk no Minecraft - Nauj', en: 'I survived in ONE chunk in Minecraft - Nauj' },
            category: { pt: 'Gameplay / Desafio / Entretenimento', en: 'Gameplay / Challenge / Entertainment' },
            description: { pt: 'Edição para Nauj: a progressão de um desafio de Minecraft conduzida com humor e ritmo.', en: 'Edited for Nauj: a Minecraft challenge that unfolds through humor, pacing and clear progression.' }
        },
        {
            id: 'Xz06qz9xZEc',
            // Preserve the public date exactly. The previous EN copy inverted its format.
            legacyTitle: 'Vsilva Direct 09.05.2026',
            title: { pt: 'A Vsilva Direct sobre minha vida - 09.05.2026', en: 'The Vsilva Direct about my life - 09.05.2026' },
            category: { pt: 'Apresentação / Conteúdo Gamer', en: 'Presentation / Gaming Content' },
            description: { pt: 'Uma apresentação autoral que reúne conteúdo gamer, edição e recursos visuais.', en: 'An original presentation bringing together gaming content, editing and visual effects.' }
        }
    ],
    shorts: [
        { id: 'wnVbTi--B88', legacyTitle: 'Sobre Poppy Playtime Capítulo 5', title: { pt: 'O PROBLEMA que pode PREJUDICAR Poppy Playtime Capítulo 5... #shorts', en: 'The PROBLEM that could HURT Poppy Playtime Chapter 5... #shorts' }, category: { pt: 'Conteúdo gamer', en: 'Gaming content' } },
        { id: 'XkuZClfl1vU', legacyTitle: 'Comissão de shorts para Kira #1', title: { pt: 'Is anyone MARRIED? 💍', en: 'Is anyone MARRIED? 💍' }, category: { pt: 'VTuber / Conversas', en: 'VTuber / Conversations' } },
        { id: 'QWzPPFDzfdU', legacyTitle: 'Curiosidade do Friday Night Funkin', title: { pt: 'FNF qual o tamanho da RABA da NENE!? #shorts', en: "FNF how BIG is NENE'S BUTT!? #shorts" }, category: { pt: 'Conteúdo gamer', en: 'Gaming content' } },
        { id: 'C1Bz6Pm6__c', legacyTitle: 'Comissão de shorts para Kira #2', title: { pt: 'Mice have to do WHAT?🐁', en: 'Mice have to do WHAT?🐁' }, category: { pt: 'VTuber / Conversas', en: 'VTuber / Conversations' } }
    ],
    // Kept for historical reference, deliberately excluded from the selected grid.
    archivedWorks: [
        { id: 'o1pdqr5qz3s', title: 'Como eu VENCI a FINAL DESTINATION GOD?', thumbnail: 'https://img.youtube.com/vi/o1pdqr5qz3s/hqdefault.jpg' },
        { id: 'JX_HAqsrkX0', title: 'Friday Night Funkin na vida real - Target Practice', thumbnail: 'https://img.youtube.com/vi/JX_HAqsrkX0/hqdefault.jpg' }
    ],
    // TODO(contact): the original Discord href was '#'. Keep the confirmed handle
    // visible as text until the owner provides a valid profile or invitation URL.
    translations: {
        pt: {
            motionPause: 'Pausar animações', motionResume: 'Retomar animações',
            skip: 'Pular para o conteúdo', home: 'Vsilva — início', navigation: 'Navegação principal',
            navWorks: 'Trabalhos', navAbout: 'Sobre', navContact: 'Contato', letsTalk: 'Vamos conversar',
            heroLine1: 'Conteúdo gamer', heroLine2: 'com ritmo e', heroLine3: 'personalidade.',
            heroDescription: 'Sou Vsilva. Transformo gameplays, análises e histórias do universo gamer em vídeos envolventes. Narrativa, humor e atenção a quem está do outro lado da tela.',
            viewWorks: 'Ver meus trabalhos', getInTouch: 'Entre em contato',
            avatarAlt: 'Personagem ilustrado de Vsilva, com cabelo vinho, óculos e roupa verde.',
            artCaption: 'Criador por experiência. Editor por escolha.', heroNiche: 'CONTEÚDO GAMER & GAMEPLAY', locationLabel: 'BRASIL / WORLDWIDE', scrollWorks: 'Explore os trabalhos',
            selectedLabel: 'PORTFÓLIO SELECIONADO', worksTitle: 'Dê o play.',
            worksIntro: 'De gameplays e desafios a documentários e histórias. Cada vídeo, uma forma de contar.',
            longform: 'Trabalhos selecionados / Longform', projects: 'PROJETOS',
            watch: 'Assistir ao vídeo', watchAria: 'Assistir: ', thumbnail: 'Thumbnail de: ',
            shortsLabel: 'PEQUENO FORMATO. GRANDES IDEIAS.', shortsIntro: 'Humor, narrativa e timing. A mesma atenção à edição, em poucos segundos.',
            shortsFootnote: 'O formato muda. A personalidade fica.',
            casesLabel: 'DECISÕES QUE CONTAM HISTÓRIAS', casesTitle: 'Além dos cortes.',
            casesIntro: 'Cada criador tem um ritmo, uma linguagem e uma história. A edição precisa entender isso.',
            naujType: 'NAUJ / MINECRAFT, MODS & DESAFIOS', naujTitle: 'O desafio vira história.',
            naujDescription: 'Nos vídeos do Nauj, a prioridade foi transformar gravações extensas de gameplay em narrativas divertidas e fáceis de acompanhar.',
            challenge: 'O desafio', approach: 'A edição',
            naujChallenge: 'Dar clareza à progressão de cada desafio sem perder os acontecimentos que fazem a gameplay valer a pena.',
            naujApproach: 'Seleção de clipes, humor e ritmo de cena para sustentar a história, sem excesso de efeitos competindo com o conteúdo.',
            kiraType: 'KIRAHISHOTORI / CONVERSAS & COTIDIANO', kiraTitle: 'A personalidade fica.',
            kiraDescription: 'Para os relatos e conversas da KiraHishotori, o ponto de partida foi preservar a espontaneidade enquanto a história ganha forma.',
            kiraChallenge: 'Organizar experiências e assuntos em uma progressão clara, envolvente e fiel à personalidade da criadora.',
            kiraApproach: 'Reorganização dos clipes, timing de falas e reações, sonorização e memes usados no contexto certo.',
            aboutAlt: 'Arte original Vsilva Normal: personagem de cabelo vinho, óculos e roupa verde.', aboutArtCaption: 'ENTRE GAMES E HISTÓRIAS',
            aboutLabel: 'QUEM ESTÁ NA TIMELINE', aboutTitle1: 'Editor, criador.', aboutTitle2: 'Gamer também.',
            aboutLead: 'Sou Vsilva, editor de vídeo e criador de conteúdo. Games e storytelling fazem parte dos dois lados da minha tela.',
            aboutText: 'Com mais de cinco anos de experiência e minha própria trajetória no YouTube, aprendi a olhar para o ritmo, o humor e a clareza de cada vídeo. Trabalho com gameplays, desafios, análises, documentários e conteúdo vertical.',
            aboutBelief: 'Uma boa edição começa entendendo o que a história precisa.', myChannel: 'Meu lado criador',
            processLabel: 'MEU OLHAR EDITORIAL', processTitle: 'Antes do efeito, a ideia.', processIntro: 'Três princípios que guiam minhas decisões na timeline.',
            process1Title: 'Entender o conteúdo', process1Text: 'Conhecer o contexto, o público e a proposta. Encontrar o que faz aquele vídeo ser único.',
            process2Title: 'Construir a narrativa', process2Text: 'Escolher os momentos que importam e conectar ritmo, progressão, humor e clareza.',
            process3Title: 'Refinar a experiência', process3Text: 'Ajustar cortes, som e elementos visuais. Cada detalhe a serviço de quem assiste.',
            contactLabel: 'O PRÓXIMO VÍDEO COMEÇA AQUI', contactTitle1: 'Tem uma história', contactTitle2: 'para contar?',
            emailContact: 'Entrar em contato por email', contactText: 'Se você procura uma edição que valorize seu conteúdo gamer, vamos conversar sobre seu próximo vídeo.',
            rights: 'Todos os direitos reservados.', backTop: 'De volta ao topo', closeVideo: 'Fechar vídeo',
            playerHint: 'Se o player não estiver disponível, assista no YouTube.', watchYouTube: 'Abrir no YouTube', playerTitle: 'Player do YouTube: ',
            metaDescription: 'Portfólio de Vsilva, editor de vídeos especializado em conteúdo gamer, gameplays, storytelling, documentários e Shorts para criadores de conteúdo.',
            socialDescription: 'Conteúdo gamer com ritmo, personalidade e história. Conheça os trabalhos de Vsilva.',
            socialAlt: 'Ilustração original do personagem Vsilva e seu universo gamer.'
        },
        en: {
            motionPause: 'Pause animations', motionResume: 'Resume animations',
            skip: 'Skip to content', home: 'Vsilva — home', navigation: 'Main navigation',
            navWorks: 'Work', navAbout: 'About', navContact: 'Contact', letsTalk: "Let's talk",
            heroLine1: 'Gaming content', heroLine2: 'with rhythm &', heroLine3: 'personality.',
            heroDescription: "I'm Vsilva. I turn gameplay, reviews and stories from the gaming world into engaging videos. Narrative, humor and a feel for the person on the other side of the screen.",
            viewWorks: 'Explore my work', getInTouch: 'Get in touch',
            avatarAlt: 'Original illustrated Vsilva character with burgundy hair, glasses and green clothing.',
            artCaption: 'A creator by experience. An editor by choice.', heroNiche: 'GAMING CONTENT & GAMEPLAY', locationLabel: 'BRAZIL / WORLDWIDE', scrollWorks: 'Explore the work',
            selectedLabel: 'SELECTED PORTFOLIO', worksTitle: 'Press play.',
            worksIntro: 'From gameplay and challenges to documentaries and stories. A different way to tell each one.',
            longform: 'Selected work / Longform', projects: 'PROJECTS',
            watch: 'Watch the video', watchAria: 'Watch: ', thumbnail: 'Thumbnail for: ',
            shortsLabel: 'SHORT FORMAT. BIG IDEAS.', shortsIntro: 'Humor, storytelling and timing. The same care in the edit, in just a few seconds.',
            shortsFootnote: 'The format changes. The personality stays.',
            casesLabel: 'DECISIONS THAT TELL STORIES', casesTitle: 'Beyond the cuts.',
            casesIntro: 'Every creator has a rhythm, a voice and a story. The edit starts by understanding them.',
            naujType: 'NAUJ / MINECRAFT, MODS & CHALLENGES', naujTitle: 'A challenge becomes a story.',
            naujDescription: "For Nauj's videos, the priority was turning hours of gameplay footage into entertaining stories that are easy to follow.",
            challenge: 'The challenge', approach: 'The edit',
            naujChallenge: 'Make the progression of each challenge clear while keeping the moments that make the gameplay worth watching.',
            naujApproach: 'Clip selection, humor and scene pacing to carry the story, without excessive effects competing with the content.',
            kiraType: 'KIRAHISHOTORI / CONVERSATIONS & DAILY LIFE', kiraTitle: 'The personality stays.',
            kiraDescription: "For KiraHishotori's conversations and personal stories, the starting point was keeping her spontaneity as the narrative takes shape.",
            kiraChallenge: "Give experiences and topics a clear, engaging progression that stays true to the creator's personality.",
            kiraApproach: 'Restructuring clips, timing dialogue and reactions, and using sound design and memes where they fit.',
            aboutAlt: 'Original Vsilva Normal artwork: a character with burgundy hair, glasses and green clothing.', aboutArtCaption: 'SOMEWHERE BETWEEN GAMES & STORIES',
            aboutLabel: 'BEHIND THE TIMELINE', aboutTitle1: 'Editor, creator.', aboutTitle2: 'Gamer, too.',
            aboutLead: "I'm Vsilva, a video editor and content creator. Games and storytelling are part of both sides of my screen.",
            aboutText: "With over five years of experience and my own journey on YouTube, I've developed a feel for pacing, humor and clarity. I work across gameplay, challenges, reviews, documentaries and vertical content.",
            aboutBelief: 'A good edit starts with understanding what the story needs.', myChannel: 'Meet the creator',
            processLabel: 'MY EDITORIAL APPROACH', processTitle: 'Before the effect, the idea.', processIntro: 'Three principles behind my decisions on the timeline.',
            process1Title: 'Understand the content', process1Text: 'Get to know the context, the audience and the idea. Find what makes that video unique.',
            process2Title: 'Build the narrative', process2Text: 'Choose the moments that matter. Connect pacing, progression, humor and clarity.',
            process3Title: 'Refine the experience', process3Text: 'Fine-tune cuts, sound and visuals. Every detail serves the viewing experience.',
            contactLabel: 'THE NEXT VIDEO STARTS HERE', contactTitle1: 'Have a story', contactTitle2: 'to tell?',
            emailContact: 'Get in touch by email', contactText: "Looking for an edit that brings out the best in your gaming content? Let's talk about your next video.",
            rights: 'All rights reserved.', backTop: 'Back to the top', closeVideo: 'Close video',
            playerHint: 'If the player is unavailable, watch directly on YouTube.', watchYouTube: 'Open on YouTube', playerTitle: 'YouTube player: ',
            metaDescription: "Explore Vsilva's video editing portfolio, featuring gaming content, gameplay videos, documentaries, storytelling and Shorts.",
            socialDescription: 'Gaming content with rhythm, personality and storytelling. Explore the work of Vsilva.',
            socialAlt: 'Original illustration of the Vsilva character and his gaming universe.'
        }
    }
};
