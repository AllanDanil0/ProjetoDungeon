# Versão 1.3 — menus, Laboratório e Necrópole ampliada

## Correções verificáveis

O vídeo enviado, de aproximadamente 1,34 segundo, mostra Noctis selecionado enquanto a ficha exibe Rubra. A consulta de foco usava uma lista de seletores e retornava o primeiro botão na ordem do documento, não necessariamente o selecionado. A prioridade agora é explícita: o cartão selecionado recebe foco. Chamadas atrasadas de telas já fechadas são ignoradas. Os testes aguardam esses callbacks antes de conferir nome, seleção e foco.

O painel de ajuda tinha z-index 20 e a tela inicial 25. O botão executava a ação, mas a ajuda ficava atrás do menu. Controles agora aparece acima, com fechamento funcional. O teste usa hit-testing no botão de fechar para conferir a sobreposição real.

O marcador invisível antes dos textos deslocava Jogar, Opções e Controles. O marcador agora é posicionado sem ocupar espaço no alinhamento central. Em retrato, a região com botões desenhados na imagem é recortada para não mostrar opções falsas.

Noctis ganhou uma animação própria no menu: oscilação leve do retrato e três morcegos em órbita. Não foram gerados novos sprites de caminhada; as quatro poses de jogo continuam sendo as fornecidas. A opção de partículas desativa a decoração.

## Laboratório

**Opções → Laboratório de testes → marcar itens → Jogar nos testes.** Este botão aplica os itens marcados antes de abrir os personagens. Os botões Desbloquear marcados e Desbloquear tudo continuam funcionando.

**Começar os testes com as armas liberadas equipadas** fica ligado por padrão no Laboratório. O jogador começa no nível 1 com até seis armas liberadas e permitidas no mapa, sem precisar ganhar níveis para experimentar os ataques. Desative para testar a evolução normal. O tutorial ainda usa apenas seu arsenal; a Necrópole permite os seis itens.

Os desbloqueios continuam exclusivamente no save de testes; saldo, armas e partidas da campanha não são alterados. Reabrir o aplicativo inicia na campanha. Este é um recurso público offline, não autenticação de desenvolvedor.

## Mapa e câmera

Necrópole finita de 2.880 × 1.620 unidades, nove vezes a área antiga. A composição usa os mesmos caminhos, árvores e monumentos, em nove setores, preservando a escala do personagem e dos assets. A câmera segue o jogador e para nos limites do mundo. HUD e menus permanecem fixos.

As coordenadas iniciais e os seis obstáculos originais foram preservados no primeiro setor: checkpoints anteriores continuam na posição válida, sem reset de ouro ou armas. Novos obstáculos são configurados nos demais setores. O tutorial mantém câmera fixa e dimensões anteriores.

Inimigos e boss surgem em uma faixa próxima do jogador, respeitando distância segura, colisões e limites. Monstros comuns muito distantes são removidos sem conceder recompensas; bosses não desaparecem por distância. Os limites globais de entidades permanecem. O cenário é montado uma vez por carregamento e o renderizador desenha apenas o trecho da câmera e os elementos próximos.

Balanceamento: `src/config.js`, especialmente `maps.necropolis.world`, `maps.necropolis.bounds`, `maps.necropolis.obstacles` e `combat`. Câmera e cenário: `src/world.js`. Spawns: `src/core.js` (`spawnPoint`). Correções de menus: `src/game.js`, `src/gothic.css`, `src/laboratory.js`, `index.html`.

Execução: `npm ci`, `npm start`. Compilação: `npm run dist -- --publish never`. Saída Windows: `dist/RUBRA-Windows-x64.exe`. Os testes e suas limitações são registrados em `docs/CONTINUIDADE.md`.
