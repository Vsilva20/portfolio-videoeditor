# Vsilva — portfólio

Redesign estático em HTML, CSS e JavaScript, sem dependências de produção ou etapa de build.

## Rodar localmente

Com Node.js instalado, execute na pasta do projeto:

```sh
node tools/serve.cjs
```

Abra http://127.0.0.1:4173. Para conferir arquivos, dados e traduções:

```sh
node tools/verify.cjs
```

Na Vercel, use o preset **Other**, sem comando de build, com a raiz como diretório de saída. A publicação não foi realizada nesta alteração. `.vercelignore` exclui ferramentas locais, referências originais e o vídeo de fundo sem apagá-los.

## Arquivos e manutenção

- `index.html`: estrutura semântica, conteúdos iniciais PT, contatos e metadados.
- `style.css`: paleta, tipografia, layouts responsivos, estados interativos e redução de movimento.
- `content.js`: quatro longos, quatro Shorts, trabalhos históricos e dicionários PT/EN. Edite aqui os vídeos e as traduções; os marcadores `data-i18n` no HTML apontam para essas chaves.
- `script.js`: renderização, preferência de idioma, navegação e modal de vídeo.
- `assets/`: cópias otimizadas das artes e thumbnails reais.
- `tools/serve.cjs` e `tools/verify.cjs`: prévia e verificação, usando apenas módulos nativos do Node.js.

As descrições e categorias são editoriais. Os títulos PT foram conferidos com o YouTube oEmbed em **26/10/2026**. Títulos de vídeos em português possuem tradução editorial para a interface EN; os títulos originalmente em inglês continuam no idioma original. `legacyTitle` guarda os nomes anteriores quando houve atualização. Os dois longos retirados da seleção continuam em `archivedWorks`.

## Vídeos preservados

| Formato | ID original | Título público confirmado |
| --- | --- | --- |
| Longo | `jxGJzbKT1hk` | Eu fiz um clone de FRIDAY NIGHT FUNKIN em 24 HORAS! |
| Longo | `K36QHbpJZns` | Como o Friday Night Funkin' reviveu em 2024? |
| Longo | `hi9s-pHsD5Y` | Sobrevivi a uma chunk no Minecraft - Nauj |
| Longo | `Xz06qz9xZEc` | A Vsilva Direct sobre minha vida - 09.05.2026 |
| Short | `wnVbTi--B88` | O PROBLEMA que pode PREJUDICAR Poppy Playtime Capítulo 5... #shorts |
| Short | `XkuZClfl1vU` | Is anyone MARRIED? 💍 |
| Short | `QWzPPFDzfdU` | FNF qual o tamanho da RABA da NENE!? #shorts |
| Short | `C1Bz6Pm6__c` | Mice have to do WHAT?🐁 |

Os IDs, canais e vídeos são os mesmos do projeto original. As thumbnails locais são derivadas das imagens originais desses vídeos no YouTube; as versões verticais foram recortadas ao centro, sem distorção. O carregamento usa `lazy` e há fallback para o endereço original `hqdefault.jpg`.

## Artes originais

- `reference/Vsilva-profile2026.png` → `assets/vsilva-avatar.webp`, no hero (800 × 800, aproximadamente 109 KB).
- `reference/Vsilva Normal.png` → `assets/vsilva-normal.webp`, na seção Sobre (960 × 960, aproximadamente 133 KB). A versão Fortnite foi substituída na página; seus arquivos continuam preservados.
- `reference/vsilva_banner2026.png` → `assets/vsilva-social.jpg`, para Open Graph e compartilhamento (1200 × 675).
- `reference/vsilva_banner2026-sembanner.png`: consultada, preservada e não utilizada na página por conter uma faixa central vazia.

Os hashes SHA-256 das quatro referências foram comparados antes/depois e permaneceram iguais. Nenhuma arte foi gerada ou reinterpretada. O favicon `icon.png` foi mantido. `bg-site.mp4` continua intacto no projeto. A página usa sua versão comprimida em WebM apenas no bloco Sobre e princípios; o original pesado não é carregado.

## Validação realizada

- `node tools/verify.cjs`: passou. Sintaxe JavaScript, quatro longos e quatro Shorts, IDs únicos, paridade de traduções, âncoras, recursos locais, ausência de placeholders, players sob demanda, mídia otimizada e bloco Sobre unificado.
- Servidor local: resposta HTTP 200.
- Navegador: layouts em 360, 390, 768, 1024 e 1440 px, em PT e EN, sem transbordamento horizontal.
- Navegador: troca de idioma, persistência após recarregar, textos dos cases, títulos, `lang`, metadados, rótulos e textos alternativos traduzidos.
- Navegador: abertura dos oito players com o ID correto e apenas um iframe, fechamento pelo botão, Escape e clique externo, remoção do iframe e retorno do foco ao card.
- Navegador: abertura por Enter e ciclo Tab/Shift+Tab no modal; proporções 9:16 e 16:9 verificadas, inclusive em viewport horizontal 1024 × 600.
- Reprodução de um longo e um Short observada no player do YouTube. Os outros seis tiveram a abertura e o ID do player verificados; não foi assistido o conteúdo integral.
- YouTube oEmbed: HTTP 200 para os oito vídeos, com os títulos públicos conferidos.
- Todos os recursos locais carregados; console sem erros ou avisos na revisão final.
- Âncoras de navegação e destinos originais de email, YouTube, Instagram e X conferidos no código. Não foi enviado email nem realizada interação nas redes.

Não havia scripts de build ou dependências no projeto original. A página continua sem precisar de build. Redução de movimento e contraste de foco estão implementados; não foi executada uma auditoria automatizada de acessibilidade nem validação em todos os navegadores.

## Pendência identificada

O Discord original tinha usuário `vsilva` com `href="#"`. O usuário foi preservado como texto, e existe um TODO em `content.js` para um futuro link válido. Não há URLs de vídeos pendentes. Os cases usam composição tipográfica e CSS; não foram inventadas mídias de clientes, métricas ou depoimentos.

## Atualização visual — Sobre, princípios e ondas

- Sobre e princípios agora fazem parte da mesma seção, com a biografia e a arte Vsilva Normal no grid principal e os princípios logo abaixo, sobre o mesmo fundo contínuo. A âncora #process foi preservada dentro do bloco.
- Ondas em cinco tons de verde no hero, trabalhos, Shorts e rodapé. O vetor editável fica em assets/green-waves.svg e a página reutiliza uma versão WebP sem perdas de 20.372 bytes, com movimento por transform. O Sobre/princípios permanece sem ondas.
- As ondas só animam quando a respectiva área está visível. Sua imagem é pré-carregada e decodificada antes de animar. O loader inicial baixa o vídeo completo antes de revelar o site; a reprodução só ocorre com o bloco Sobre visível. O vídeo pausa fora dele, em abas ocultas ou durante um trabalho do portfólio.
- Controle PT/EN para pausar/retomar as animações; preferência persistida em localStorage (vsilva_motion_paused). prefers-reduced-motion desativa as ondas e usa uma imagem estática do vídeo.

### Compressão

| Arquivo | Formato / dimensões | Tamanho |
| --- | --- | --- |
| bg-site.mp4 (original preservado) | H.264 + áudio / 1920 × 1080 | 37.522.726 bytes |
| assets/media/bg-site.webm | VP9 / 1280 × 720 / 24 fps / sem áudio | 2.292.752 bytes |
| assets/media/bg-site-fallback.mp4 | H.264 / 960 × 540 / 24 fps / sem áudio | 1.342.644 bytes |
| assets/media/bg-site-poster.webp | Frame original / 1280 × 720 | 62.510 bytes |

O WebM é **93,9% menor** que o arquivo original e mantém a sequência inteira (aproximadamente 28,7 s após adequação a 24 fps). O MP4 menor é fallback de compatibilidade; o navegador seleciona uma das fontes. A conversão foi feita com FFmpeg temporário, sem adicionar dependências ao site.

### Validação desta atualização

- node tools/verify.cjs e git diff --check: passaram.
- WebM decodificado integralmente com FFmpeg sem erros; VP9, 720p, 24 fps e ausência de áudio confirmados.
- Novos arquivos responderam HTTP 200 com os tipos video/webm, video/mp4 e image/webp corretos.
- PT/EN em 360, 390, 768, 1024 e 1440 px sem rolagem horizontal.
- Reprodução do WebM observada no Sobre, sem áudio; pausa ao sair do bloco e pelo controle de animações; retomada, tradução do controle e persistência após recarregar verificadas.
- Ondas animadas fora do Sobre, sem camadas de ondas dentro do bloco unificado. Imagem Vsilva Normal carregada e texto alternativo traduzido.
- Regressão do player: abertura por Enter, pausa das animações durante o modal, Escape, remoção do iframe e retorno do foco ao card passaram.
- Console sem erros/avisos na revisão. Os hashes do MP4 original e da arte Vsilva Normal permaneceram iguais.
- A regra de movimento reduzido foi conferida no código; a preferência do sistema operacional não foi alterada durante a validação.

## Refinamento — primeira tela, navegação e desempenho

- Hero com altura mínima de 100svh, contando o header fixo sobreposto. Em PT e EN, a altura coincidiu exatamente com a viewport nos cinco tamanhos testados. Arte e tipografia ajustam ao espaço disponível; a mensagem e os botões continuam antes da ilustração no celular.
- Sobre ampliado: cerca de 1.165 px em 1440 × 900, em comparação aos aproximadamente 870 px da versão anterior. Biografia, arte e princípios continuam unidos.
- Removidas etiquetas numeradas de seção, contagens de projetos, legendas repetidas, textos do adesivo do hero, formatos sobre as thumbnails e rótulos decorativos dos cases.
- Header flutuante com monograma, destaque da navegação, CTA e barra de progresso. A barra usa transform e uma atualização agrupada por requestAnimationFrame; foi conferida em 0%, posição intermediária e 100%.
- Gradientes nas bordas dos estudos de caso substituem a passagem abrupta entre fundos escuros e claros. As ondas também desaparecem gradualmente nas bordas das seções, e o Sobre termina com um esmaecimento para o contato.
- A animação passou de 20 caminhos SVG animados para quatro camadas WebP reutilizadas, sem dependências. O SVG original da composição permanece editável no projeto.
- A abertura passou a usar uma tela de carregamento bloqueante. Imagens, fontes, ondas e o arquivo completo do vídeo são preparados antes da exibição; a preferência por movimento reduzido continua controlando as animações e a reprodução.
- No navegador, ainda no hero, a imagem das ondas já estava decodificada e o WebM tinha readyState 4, pausado e pronto para entrar no Sobre. Ao reproduzir, o vídeo aparece suavemente sobre o poster.
- PT/EN em 360 × 800, 390 × 844, 768 × 1024, 1024 × 768 e 1440 × 900: sem transbordamento; header inteiramente dentro da tela; hero com a altura da viewport.
- Regressão de um player longo e de um Short: abertura, proporção vertical, pausa das animações, Escape, destruição do iframe e retorno do foco passaram.
- Console sem erros ou avisos. node tools/verify.cjs e git diff --check passaram. Estas verificações confirmam carregamento e comportamento; não foi realizado benchmark de FPS em dispositivos físicos.

## Tela de carregamento, rodapé e ícones

- Loader de tela inteira com identidade Vsilva e progresso real de recursos. A página fica invisível, sem rolagem e com inert/aria-hidden até o carregamento concluir. Não há tempo mínimo artificial nem liberação automática por prazo.
- São aguardadas todas as imagens da página, poster, favicon, fontes e estilos. O vídeo compatível (WebM ou fallback MP4) é baixado integralmente via fetch, transformado em uma URL Blob local e preparado pelo player. Assim, a entrada no Sobre reutiliza o arquivo já disponível na memória. Players do YouTube continuam sob demanda.
- Se o recurso essencial falhar ou exceder o prazo de carregamento, o conteúdo permanece bloqueado e o loader oferece Tentar novamente. A tentativa reutiliza recursos já preparados quando possível.
- Preferência PT/EN é aplicada também ao loader. Sem JavaScript, o bloqueio não é ativado e os links alternativos continuam acessíveis.
- Contato e rodapé agora usam o mesmo azul escuro do site com ondas verdes; o esmaecimento no final do Sobre acompanha essa cor.
- Nauj: cópia exata de D:/Canais/Nauj/nauj-icon.png em assets/nauj-icon.png (1.385 bytes). A identidade pixelada foi mantida.
- Kira: D:/Websites/kira-icon.jpg convertido para assets/kira-icon.webp (29.044 bytes), sem alterar o original. Ambos aparecem junto aos nomes nos cases.

### Verificação desta entrega

- Carregamento normal: loader chegou a 100%, todas as imagens prontas, fontes loaded e vídeo readyState 4 em URL Blob; só então o conteúdo ficou visível e deixou de ser inert.
- Conexão lenta simulada em servidor local separado: tela permaneceu visível em 39%, com o site oculto/inert e vídeo ainda sem dados; concluiu em 100% após a transferência.
- Falha de mídia simulada: loader exibiu erro e Tentar novamente, mantendo o conteúdo oculto. Após restaurar o servidor, a nova tentativa concluiu em 100% sem recarregar a página.
- Os controles PREVIEW_MEDIA_DELAY_MS e PREVIEW_MEDIA_FAILURE pertencem somente a tools/serve.cjs para QA local; não afetam a publicação estática.
- PT/EN, inclusive preferência após recarregar, em 360, 390, 768, 1024 e 1440 px sem transbordamento. Avatares carregados nos dois idiomas.
- Contato e rodapé com background rgb(8, 11, 27), ondas presentes e originais preservados. Player longo abriu após a liberação e fechou por Escape, com fundo pausado durante o modal.
- node tools/verify.cjs e git diff --check passaram. Console da execução normal sem erros/avisos; os HTTP 503 do servidor de falha eram deliberados.
