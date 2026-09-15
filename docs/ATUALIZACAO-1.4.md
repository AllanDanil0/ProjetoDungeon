# The night is yours — 1.4

## Conteúdo

- Ignivar, mago de fogo por 500 de ouro, comprável na seleção de personagens após liberar a Necrópole. A compra usa o saldo do perfil ativo e só cobra uma vez. Vida 6, velocidade 153, dano global ×1,25; dash de 2,2 segundos com nova de raio 64 e dano base 32 (40 após seu bônus). Rubra e Noctis preservados. O tutorial continua usando a Lâmina ancestral para todos.
- Cetro da fornalha: projétil explosivo, liberado aos 15 segundos na Necrópole ou na compra de Ignivar. Rosário da tempestade: corrente de raios, liberado aos 45 segundos. Foice do eclipse: atravessa alvos e retorna, liberada aos 90 segundos. Total de nove armas, seis espaços. Armas sobem até nível 6 no tutorial e 7 na Necrópole.
- Arte Canvas original compartilhada por HUD e combate: gravuras nas lâminas, rastros, impactos, runas, explosões e silhuetas próprias para as novas armas. Os efeitos permanecem limitados e não exigem arquivos externos.
- Cinco partituras originais sintetizadas: início, seleção de personagens, bosque, Necrópole e boss. Efeitos para menus, compra, evolução, arma, ouro, dano, morte, eliminação, dash, vitória e surgimento do boss. Música e efeitos têm volumes separados. O áudio começa após interação do usuário. Preferências antigas de silêncio são preservadas; saves novos iniciam com áudio habilitado. Pausa/seleção de melhorias silenciam a trilha da partida sem acumular notas. Sons de eliminação e armas têm intervalo mínimo; até 48 vozes de áudio.
- Três árvores fornecidas usadas na borda e nos pontos de árvores existentes da Necrópole. Recorte em Canvas e cache a 192 px; renderização sem suavização, transparência quando encobrem o jogador. Folhas caídas e sombras complementam o solo. Limites, pontos de colisão e coordenadas de saves foram preservados; mapa continua 2880×1620.

## Configuração e arquivos

`src/config.js`: personagens, preço, passiva, números de armas, condições de desbloqueio, níveis por mapa, limites e volumes iniciais. `src/core.js`: compra, validação, progressão, migração. `src/audio.js`: partituras, timbres e eventos. `src/game.js`: integração, menu de compra e combate. `src/sprites.js`: folha do mago. `src/weapon-art.js`: desenho de todas as armas e efeitos. `src/world.js`: árvores e solo. `assets/expansion/`: referências e folha gerada. `index.html` e `src/gothic.css`: opções de áudio e três personagens.

O save continua v3 com os mesmos identificadores. Migração de v2 libera somente os dois personagens que existiam; nunca concede Ignivar de graça. O Laboratório continua isolado, pode liberar o mago e seu cetro sem cobrar ouro, e o reset remove esses desbloqueios sem apagar o saldo. Não há autenticação de servidor em um jogo offline.

## Executar e verificar

`npm ci`, `npm start`. Desenvolvimento: `npm run dev` (perfil separado). Verificações: `npm run check`, `npm test`, `npm run test:integration`. Build: `npm run dist -- --publish never`; conferência: `npm run verify:package` e `npm run test:integration -- --packaged`.

Músicas e efeitos são sintetizados localmente, sem download, dependências novas ou faixas de terceiros. O teste de áudio renderiza amostras em OfflineAudioContext, confere energia não nula, valores finitos e limites; isso não equivale a avaliação auditiva humana. Não houve teste em outro PC, partida manual completa ou benchmark prolongado de desempenho. O balanceamento do mago foi deliberadamente superior conforme solicitado e pode ser ajustado no config após partidas reais.

## Assets

Referência do mago: PNG 848×1263 com xadrez incorporado, não é animação. Folha gerada: PNG 1254×1254, grade 4×4; linhas frente/direita/costas/esquerda; três poses de caminhada e uma de dash por linha. Quadros normalizados para canvas 64×64 com pés na mesma linha e altura de mundo 38; hitbox de raio 8 independente da arma/fogo. A geração usa a ferramenta imagegen integrada. Árvores: PNGs 848×1237, 848×1237 e 1408×768, fundos claros/escuro incorporados. Não foram geradas árvores extras. Nenhum novo asset foi entregue como placeholder.

Prompt usado na geração (referência: arquivo do mago fornecido pelo usuário):

Use case: stylized-concept. Project game asset: a production pixel-art sprite sheet of Ignivar, the SAME burgundy/red and gold fire wizard in the reference, large pointed red hat gold trim, brown hair, glowing orange eyes, red gold robe, staff with orange flame. Reference is identity/style only. Generate ONE transparent PNG sprite sheet, EXACTLY 4 columns by 4 rows in a square image, equal cells, no text no labels no grids no checkerboard. Row 1 faces FRONT/down; row2 faces RIGHT; row3 faces BACK/up; row4 faces LEFT. Each row columns 1,2,3 are three distinct WALK CYCLE keyframes (left step, neutral, right step), column4 a distinct forward leaning DASH pose with short orange fire streak, same facing as row. Consistent body proportions and scale across all 16 sprites. Each sprite fully contained in its cell with generous transparent margins, feet anchored on same baseline in each cell, center aligned. Crisp 64x64-style pixel clusters, intended for nearest-neighbor reduction to 64x64 frames. Absolutely no background: true alpha transparency. No drop shadow. Keep character detailed and faithful to provided wizard; no extra characters, no weapon changes.
