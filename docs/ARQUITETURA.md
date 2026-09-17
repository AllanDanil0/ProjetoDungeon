# The night is yours — arquitetura e continuidade

**Versão atual 1.5.1:** leia [ATUALIZACAO-1.5.md](ATUALIZACAO-1.5.md) para o capítulo de gelo, três novos heróis e arsenal de onze armas no mapa, incluindo a relíquia desbloqueada ao vencer Skarn.

**Versão 1.4:** leia [ATUALIZACAO-1.4.md](ATUALIZACAO-1.4.md) para Ignivar, compra por ouro, áudio, nove armas e limites 6/7. As seções anteriores abaixo são histórico.

**Atualização 1.3:** [ATUALIZACAO-1.3.md](ATUALIZACAO-1.3.md) complementa a versão 1.2 com correções dos menus/Laboratório e mundo ampliado em `src/world.js`. Leia primeiro para as regras atuais.

**Atualização 1.2:** leia [ATUALIZACAO-1.2.md](ATUALIZACAO-1.2.md) para as regras vigentes de personagens, menus, arsenais por mapa, save v3 e Laboratório público. As seções abaixo registram a base 1.1 e seus sistemas reutilizados. Onde houver diferença, vale a atualização 1.2.

## Estrutura reaproveitada

O original é um jogo single-player offline em HTML/CSS/Canvas 2D, JavaScript e Electron, sem servidor nem contas dentro do jogo. Antes desta versão havia um caçador, uma arena, uma espada orbital, quatro hordas e Vhalkar. O único save existente era o recorde em `localStorage['rubra-best']`.

`src/legacy.js` e `src/legacy.css` preservam a base original: sprites desenhados por paleta, cenário do bosque, renderização por profundidade, áudio sintetizado, controles de teclado/toque e loop requestAnimationFrame. `src/game.js` estende essa base com fluxo de menus, entidades configuráveis, inventário de armas, experiência, economia e checkpoints. O processamento de simulação original foi substituído porque pressupunha uma única arma e não possuía XP, drops de ouro ou save de partida. Não foi acrescentada engine ou dependência de runtime.

`index.html.html` e `rubra.html` permanecem no repositório como cópias históricas. Não são carregados pelo aplicativo, nem atualizados junto do jogo. O ponto de entrada é `index.html`.

## Navegação e controles

Tela inicial → personagens → mapas → partida. Noctis é o padrão desbloqueado; Rubra continua selecionável. A escolha é persistida. Tab, setas e Enter navegam nos menus; mouse e controles de toque existentes são mantidos. WASD/setas movem, Espaço/Shift esquivam, P/Esc pausam e F11 alterna tela cheia no Electron.

Menus mostram saldo total; HUD mostra ouro da expedição, XP, nível, até seis espaços, armas e níveis. Opções salvam som e partículas. Pausa oferece continuar, salvar e voltar, ou encerrar guardando ouro.

## Mapa, câmera e personagens

Arena lógica finita de 960×540, câmera fixa que mostra a área toda, sem rolagem infinita. O Bosque Esquecido é o tutorial, com Vhalkar ornamentado com galhos/galhadas e luz esverdeada. A Necrópole Carmesim é composta do caminho e elementos enviados, com solo procedural complementar. Os espaços fora do caminho são terreno caminhável; árvores e monumentos sólidos têm círculos de colisão editáveis em `maps.*.obstacles`. Árvores da borda ficam fora da área jogável.

O ponto do personagem é a posição dos pés. A hitbox usa raio corporal de 8 ou 9 unidades, não o retângulo da imagem nem armas. Noctis usa telas de 64×64 com corpo de até 48 pixels, renderizadas com altura total 38 no mundo. Canvas e CSS desativam suavização. Os inimigos vão de 34 a 73 unidades de altura; Morthar usa 111.

Spawns procuram posições válidas dentro dos limites e longe do jogador; se nenhuma existir, não há spawn. Movimento faz colisão por eixo. Projéteis são removidos ao cruzar limites/obstáculos. Loot é reposicionado quando necessário. Elementos do cenário são ordenados pelos pés com as entidades.

## Combate e progressão

Todo dano de armas passa por `damageEnemy` → `RubraCore.hit`. A morte marca a entidade antes de conceder recompensa. Dano de contato e projéteis hostis usam a mesma invulnerabilidade. Os limites de inimigos, projéteis, efeitos, partículas e drops estão em `limits`.

Cada arma tem relógio próprio e pode coexistir com as demais. Melhorias elevam nível sem consumir outro espaço. Opções de nível filtram desbloqueio, limite de espaços e nível máximo; não havendo melhorias, oferecem cura ou ouro. A simulação para na seleção, e relógios retomam sem acumular disparos. A escolha pendente também é preservada em save.

Armas: Lâmina ancestral (original), Agulha carmesim (projétil dirigido), Selo das cinzas (área com antecipação), Coroa de espinhos (orbital) e Lança do túmulo (perfurante). Cinco armas disponíveis no catálogo, seis espaços configurados para expansão. Todas aplicam dano, cadência e alcance globais do personagem. Quatro armas novas têm progressão de cinco níveis; efeitos geométricos são arte provisória original, sem assets de Vampire Survivors.

Desbloqueios da Necrópole: Agulha disponível desde o começo; Selo aos 30 segundos; Coroa aos 60; Lança ao derrotar Morthar. Não dependem de possuir a arma bloqueada. Ambos os mapas estão disponíveis para facilitar o acesso aos novos assets.

O tutorial invoca Vhalkar aos 150 segundos; a Necrópole invoca Morthar aos 180. A dificuldade cresce até esse momento. Bosses alternam disparos radiais e investidas direcionadas, com sinais visuais e redução de intervalo abaixo de metade da vida. O boss surge uma vez, concede ouro garantido e encerra a expedição na vitória. Morthar desbloqueia a Lança.

## Ouro e saves

Save v2 em `rubra-save-v2`, no mesmo perfil `%APPDATA%/RUBRA` do original. A chave antiga não é removida; seu recorde é importado. Seleções inválidas, valores negativos, armas duplicadas e posições inválidas são normalizados. JSON ilegível é preservado numa chave de backup antes de restaurar padrões.

Ouro é inteiro não negativo. Drops comuns têm chance por tipo, elites têm recompensa maior e boss tem crédito garantido direto no encerramento. Drops são marcados como coletados antes de alterar a partida. O saldo permanente e o ouro pendente são separados.

- Vitória, morte e encerramento voluntário: consolidam todo ouro coletado uma vez e limpam a partida ativa, num único documento JSON.
- Salvar e voltar / fechar normalmente: gravam checkpoint, sem consolidar. Retomar carrega o mesmo identificador, ouro, XP, armas, vida, inimigos e drops.
- Nova expedição com uma pendente: a anterior é encerrada e seu ouro consolidado antes de começar.
- Resultados repetidos e reload não creditam o mesmo identificador novamente.
- Checkpoint periódico a cada 3 segundos. Encerramento forçado do processo ou falha de energia pode perder o intervalo desde o último checkpoint. Projéteis e sinais de ataque não são serializados; retomada dá breve invulnerabilidade e reinicia os relógios sem tiros acumulados.
- Erros de armazenamento são apresentados; o botão de salvar e voltar não abandona a sessão se a gravação falhar.

## Desenvolvimento offline

`npm run dev` usa `dev/main.cjs`, perfil `.dev-profile` independente e painel para desbloquear arma/mapa individualmente ou tudo. `npm start` usa o perfil normal. A lista positiva de arquivos do electron-builder contém somente main.js, index.html, package.json, src e assets. Não contém dev/, testes ou scripts. `verify:package` abre o ASAR real e verifica isso, incluindo ausência do nome da API de desenvolvimento.

Isto não é autenticação segura de produção. Um usuário que controla um cliente offline pode modificar código e saves. Exclusividade real em uma versão distribuída exige serviço autenticado com progressão autoritativa no servidor. Não há senha embutida, conta especial, segredo ou falsa verificação de papel no cliente.

## Ajustes e comandos

Menus da versão 1.6: `src/ornate.css` é a apresentação dos seis menus; `assets/ornate` contém fundos e ornamentos. `src/menu-art.js` gera prévias reais em cache, restaurando mapa/canvas após renderizar. `tests/menus.cjs` valida centralização e acesso aos controles em três resoluções, além da animação de Aelthir. Os sprites de gameplay permanecem nos assets existentes.

Balanceamento: `src/config.js` → characters, maps, enemies, weapons, combat, xp, economy, limits. Configurações de colisão ficam em maps.*.obstacles. Recortes dos quadros são explícitos em `makeHeroFrames`, em src/game.js.

Instale dependências com `npm ci`; execute com `npm start`; desenvolvimento com `npm run dev`. Valide com `npm run check`, `npm test` e `npm run test:integration`. Compile com `npm run dist -- --publish never` e confira o pacote com `npm run verify:package`. Saída: dist/RUBRA-Windows-x64.exe. O teste de integração usa perfil próprio `.test-profile`, janela fora da tela e grava capturas e JSON em test-output/.

Push na main dispara os mesmos testes, build e verificação do ASAR no GitHub Actions antes de publicar Release. O executável baixado anteriormente não se atualiza sozinho: baixe a nova Release.
