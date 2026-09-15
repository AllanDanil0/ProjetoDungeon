# Atualização visual 1.2 — 15/09/2026

## Entrega

- Tela inicial usa a imagem enviada, com botões reais em português sobre o painel: Jogar, Retomar quando houver checkpoint, Opções e Controles. O título ilustrado enviado foi mantido; o aplicativo e repositório continuam RUBRA / ProjetoDungeon.
- Seleção de caçador com cenário de castelo/lua derivado da referência, molduras de osso, pedestais, nome, atributos, passiva, arma inicial, bloqueio e seleção. Somente Rubra e Noctis são personagens jogáveis.
- Rubra com novo visual rosa/marrom e 16 quadros gerados de caminhada (4 direções × 4 quadros). Noctis usa os quatro arquivos direcionais fornecidos, um quadro por direção; não foi fabricada uma caminhada que esses arquivos não contêm. O retrato de Noctis usa a imagem nova.
- Recorte dos fundos opacos em Canvas, origem dos pés em y=60 dentro de 64×64, corpo até 48 px, altura total no mundo 38. Suavização desligada. Hitboxes antigas preservadas.
- Campanhas novas iniciam com Rubra, Bosque Esquecido e Lâmina ancestral. Vencer Vhalkar libera Noctis, Necrópole e Agulha carmesim. Sobreviver ao tempo do boss sem derrotá-lo não libera o capítulo.
- Tutorial oferece somente Lâmina ancestral e Estilhaço do bosque, nova arma de projétil desbloqueada após 30 segundos. Na Necrópole, Selo das cinzas libera aos 30 segundos, Coroa aos 60 e Lança ao vencer Morthar. Os seis itens podem coexistir na Necrópole; todo caçador usa Lâmina ao iniciar o tutorial.
- Armas têm ícones e silhuetas próprios em Canvas, compartilhados no HUD e no combate, com lâminas, cristais, espinhos, rastros e selos animados. Mantidos temporizadores independentes, modificadores, limites de objetos e processamento único de dano/recompensas.
- Teclado: Tab/setas permanecem no menu aberto, ignoram controles desativados; Espaço funciona nas caixas de seleção. Mouse, toque, esquiva, pausa e F11 continuam disponíveis.

## Como testar desbloqueios

1. Na tela inicial, clique em **Opções**.
2. Clique em **Laboratório de testes**. A faixa superior indica o save de testes.
3. Marque personagens, mapas e/ou armas e clique em **Desbloquear marcados**, ou use **Desbloquear tudo**.
4. Clique em **Jogar nos testes**, escolha caçador e mapa.
5. Para sair, volte ao menu, abra o Laboratório e clique em **Voltar à campanha**.

Entrar no Laboratório não desbloqueia nada automaticamente. A primeira entrada usa Rubra/tutorial como a campanha. Seu progresso de testes fica salvo separadamente. Reabrir o jogo inicia sempre na campanha normal; entrar de novo no Laboratório recupera o save de testes.

Este é um modo público de testes solicitado para o executável distribuído, não uma ferramenta com autenticação exclusiva. `src/laboratory.js` pertence à distribuição; `dev/`, seus comandos e API continuam ausentes do ASAR. A chave local não é uma barreira de segurança. Um cliente offline controlado pelo usuário não oferece exclusividade contra modificações; isso exigiria servidor autenticado e progressão autoritativa.

## Saves

Save v3, mantendo a chave `rubra-save-v2` para continuidade. Acrescenta `characters` e `completedMaps`. Saves v2 mantêm Noctis e os mapas que antes eram livres, armas, saldo, recorde e checkpoint. Nenhum save normal é zerado para demonstrar os novos bloqueios. A chave legada `rubra-best` permanece e não é importada para os testes.

Laboratório usa `rubra-laboratory-v1`. Cada perfil mantém suas partidas, saldo, opções e desbloqueios. A troca grava a partida pendente antes de carregar o outro perfil. Não há transferência de ouro entre eles. A regra de consolidação anterior permanece: vitória, morte e encerramento guardam uma vez; salvar/retomar mantém ouro pendente. Armas já equipadas em checkpoints antigos continuam válidas, mesmo quando não pertencem ao novo catálogo do tutorial.

## Arquivos e ajustes

- `src/config.js`: atributos, seis armas, curvas de nível, tempos de desbloqueio em weapons.*.unlockSeconds, catálogos por mapa, limites, escalas, FPS de caminhada e chaves de perfil.
- `src/core.js`: migração v3, desbloqueios, filtros de armas e regras puras do Laboratório.
- `src/game.js`: ligação dos menus, personagens e combate existentes.
- `src/sprites.js`: recortes, remoção do fundo opaco, normalização e direções explícitas.
- `src/weapon-art.js`: desenho e animação das armas; não altera a regra de dano.
- `src/gothic.css`, `index.html`: visual dos menus e controles reais.
- `src/laboratory.js`: troca de perfil e desbloqueios opcionais.
- `src/legacy.js`: ajuste pontual de Espaço para caixas de seleção; restante da base preservado.
- `tests/core.test.cjs`, `tests/integration.cjs`, `scripts/verify-package.cjs`: regressões e verificação do pacote.
- `assets/visual-update/`: referências copiadas e resultados gerados, sem sobrescrever Downloads nem assets antigos.

`npm ci`, `npm start`. Build Windows: `npm run dist -- --publish never`. Resultado em `dist/RUBRA-Windows-x64.exe`. Não há APK Android neste projeto.

## Assets conferidos

| Arquivo integrado | Dimensões reais | Uso |
| --- | --- | --- |
| start.jpg | 1408×768 JPEG | Tela inicial fornecida |
| selection-reference.jpg | 1408×768 JPEG | Referência preservada; layout recriado com controles reais |
| noctis-portrait.jpg | 1024×1024 JPEG | Retrato novo |
| noctis-left/right/back.jpg | 784×1168 JPEG cada | Um quadro por direção |
| noctis-front.png | 64×64 PNG | Um quadro frontal fornecido |
| rubra-portrait.jpg | 784×1168 JPEG | Referência de identidade |
| rubra-walk.png | 1254×1254 PNG | Geração, grade 4×4 verificada |
| castle-menu.png | 1698×926 PNG | Cenário derivado da referência |

JPEGs não possuem transparência. A geração de Rubra também retornou quadriculado incorporado, apesar do pedido de alpha; o importador remove esse fundo em runtime, e os testes conferem margens transparentes nos 20 quadros finais. Cada célula da grade é medida pelos limites arredondados, pois 1254 não é divisível por quatro. Partes desconectadas do fundo e pequenos artefatos JPEG são ignorados. A frente de Noctis tem proporções diferentes das poses laterais fornecidas; preservamos a imagem enviada e normalizamos a altura sem deformá-la.

As armas são arte original procedural em Canvas, não assets copiados de outro jogo. Solo complementar, variantes de monstros e ornamentos de Vhalkar continuam procedurais conforme a versão anterior. A Necrópole continua finita em 960×540, com câmera fixa; expansão e câmera móvel foram adiadas explicitamente.

## Geração de imagens

Modo: ferramenta integrada `image_gen`, sem CLI ou dependência adicionada. Dois resultados guardados no projeto:

1. `assets/visual-update/rubra-walk.png`, referência `Rubra_personagem.jpg`. Prompt final:

> Create a production pixel-art walking sprite sheet for this exact game character Rubra, using the provided image as identity reference. Pink hood and pink pants, brown short tunic with belt, brown gloves and boots, tan skin, dark brown hair. Preserve reference appearance and proportions. Output one square PNG with REAL transparent alpha background, NO checkerboard, NO shadow or text. EXACT 4 columns and 4 rows of equal sized cells. Each row is a 4 frame walk cycle: neutral, left foot forward, neutral, right foot forward. Row 1 faces FRONT toward camera, row 2 faces RIGHT, row 3 faces BACK away from camera (pink hood back, no face), row 4 faces LEFT. Entire body visible in every cell with ample transparent spacing. Crisp limited-palette pixel art, no antialiasing. Identical height and head size for all 16 sprites, feet on same baseline within each cell. Each sprite centered in its cell. Movement visible in legs and arms, slight hood sway, no weapons. Intended to downsample each cell to 64x64 pixels, character body 48px tall. No labels, frames, gridlines or extra objects.

2. `assets/visual-update/castle-menu.png`, referência `Menu_de_personagens.jpg`. Prompt final:

> Edit this supplied game menu artwork for implementation in a live game UI. Preserve the exact gothic pixel art purple moon, castle, bats, trees, cemetery path and grass scenery, same wide 1408x768 composition and palette. Remove ALL lettering and title logos, ALL four portrait frames and pedestals, and the bottom rectangular information frame. Reconstruct underlying scenery seamlessly where these are removed. Output only the background scenery, with the castle and moon in the upper center and dark subdued foreground, no text, no interface panels, no characters, no borders or buttons. This is a background beneath actual functional controls. Crisp pixel-art edges, no smoothing.

O resultado gerado foi inspecionado e incorporado; a ferramenta não produziu exatamente a resolução pedida, por isso as dimensões reais constam acima.

Verificações e limites reais desta entrega estão em [CONTINUIDADE.md](CONTINUIDADE.md#verificações-efetivamente-executadas-na-versão-12).
