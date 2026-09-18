# Santuário Profano — 1.8

Novo capítulo após Skarn. Saves com `completedMaps: ['ice']` recebem mapa e Karn ao carregar, sem custo ou perda de progresso. Os outros caçadores permanecem compráveis apenas com o mapa disponível: Malthor 1500, Vespera 2000. As armas principais seguem a regra anterior de acompanhar exclusivamente seu dono fora do arsenal normal.

## Conteúdo e implementação

- Mundo 3840×2560: mesma largura e 200 unidades mais alto que o gelo. Cenário gerado a partir da referência do usuário; importação sem alterar o arquivo original. Altar e bases das colunas principais têm colisão circular; aparições ignoram esses obstáculos, mas respeitam os limites externos. Entulho menor é decorativo.
- Quatro fases em 0, 150, 300 e 450 segundos; intervalos de entrada 1,4 / 0,95 / 0,62 / 0,36 s. Gárgula aos 270 s, única mesmo após checkpoint. Inquisidor aos 540 s; a vitória exige sua morte e não acontece automaticamente aos 600 s.
- Inquisidor: 13500 PV, ataques sinalizados, projéteis de 76 unidades/s; a cada terceira ação convoca quatro auxiliares, respeitando o limite de inimigos. Na segunda metade de vida os anéis passam de 8 para 12 projéteis e a recarga reduz 15%.
- Karn: 10 PV, velocidade 136, dano ×1,60, cadência ×0,90. Machado frontal com empurrão em inimigos comuns. Malthor: 8 PV, velocidade 162, dano ×1,42, cadência ×1,28; cada acerto soma 2,5% de alcance, até 50%, dissipando 9%/s após quatro segundos sem acerto. Vespera: 7 PV, velocidade 182, cadência ×1,65 e esquiva a cada 1,6 s.
- Onze armas no mapa: herdadas Lâmina do Zero Absoluto, Cometa Boreal e Prisma Glacial (as três de maior dano base por impacto do gelo); sete novas Machado da Execução, Chicote de Sangue, Lâminas do Rosário, Turíbulo das Almas, Sino da Ruína, Pregos do Mártir e Evangelho das Sombras; relíquia Édito do Inquisidor concedida apenas pela vitória. Nível máximo 7.
- Música sintetizada original `Liturgia das cinzas`, 88 BPM, timbres de órgão/campana; usa as opções e o agendador de áudio existentes, sem download durante a partida.
- Arsenal, laboratório, compra e menus incluem o conteúdo novo. Grade de personagens 3×3 em desktop com rolagem; quatro destinos em linha nas telas largas e redução responsiva.

`src/profane-config.js` estende a configuração comum antes do core, tanto no navegador quanto nos testes Node. `src/profane.js` cuida da importação visual, habilidades, eventos e efeitos; migração e desbloqueios continuam em `src/core.js`.

## Referências preservadas

Os JPEGs de Karn, Malthor, Vespera, machado, chicote, rosário e duas folhas de monstros foram copiados sem edição para `assets/profane`. O importador Canvas retira o fundo opaco, recorta os quadros existentes e preserva a arte. A pedido do usuário, o chicote ganhou uma preparação adicional via ImageGen para eliminar o halo branco do fundo; `bloodwhip-clean.png` é importado por chroma key. O rosário usa o desenho original limpo e o crucifixo separado nas órbitas. Ícones novos têm resolução interna de 96 px. Os três novos personagens usam a pose original com inclinação, oscilação e espelhamento em movimento/esquiva; não são novas folhas com quatro direções desenhadas. Retratos têm animação suave e partículas opcionais. Os inimigos usam os quadros fornecidos. Cães e Seraphs não constavam das folhas: receberam uma folha própria gerada.

Mapa, folha complementar e cinco relíquias foram gerados pelo ImageGen. Prompts exatos em `PROMPTS-1.8.md`. Efeitos de combate são Canvas, com arcos, chicote, órbitas, selos e pulsos; permanecem visíveis com partículas decorativas desligadas.

## Verificação

Testes dedicados em `tests/profane.cjs` usam perfil isolado. Incluem importação, habilidades, colisões, mini-chefe, checkpoint, ataques do Inquisidor, recompensa idempotente e linha do tempo simulada de dez minutos. Esta última usa invulnerabilidade para auditar eventos e limites, não representa uma partida humana nem prova de dificuldade ideal. O balanceamento inicial combina atributos, alcance, densidade crescente, sinalização e contra-jogo; requer avaliação de jogadores para ajustes finos. Estado dos testes e publicação registrado em CONTINUIDADE.md.
