# RUBRA 1.12 — trilhas dos menus e arsenal glacial

## Músicas e ordem

Nove composições originais, sintetizadas offline por Web Audio. Cada composição tem 48 compassos: introdução de 4, tema A de 8, tema B de 8, desenvolvimento de 8, retorno de 8, ponte de 8 e encerramento de 4. Melodias, tonalidades, modos, arpejos, timbres e andamento próprios, com baixo, acordes sustentados, contraponto, eco e percussão em camadas. Não precisam de download ou conexão.

As listas seguem **ordem fixa**, sem sorteio. Ao terminar a última faixa, voltam à primeira. As três músicas novas abrem a lista inicial; os dois temas anteriores foram preservados depois delas, exclusivamente no menu inicial.

| Menu | Ordem | Faixa | Duração aproximada |
|---|---:|---|---:|
| Inicial | 1 | Juramento sob a lua | 2:00 |
| Inicial | 2 | Ecos do castelo vazio | 2:24 |
| Inicial | 3 | Brasas da última lâmina | 1:43 |
| Inicial | 4 | Tema original da noite | 1:29 |
| Inicial | 5 | Tema original dos caçadores | 1:18 |
| Personagens | 1 | Salão dos juramentos | 2:08 |
| Personagens | 2 | Retratos em carmesim | 1:51 |
| Personagens | 3 | A vigília dos caçadores | 2:32 |
| Mapas | 1 | Atlas das terras perdidas | 2:11 |
| Mapas | 2 | Além do horizonte glacial | 2:40 |
| Mapas | 3 | Os portões do abismo | 1:47 |

Cada menu guarda sua faixa e posição **durante a sessão**. Ao voltar, retoma no próximo passo musical; ao fechar o aplicativo, as sequências recomeçam. A mudança de menu reduz brevemente o som anterior. Opções, Arsenal, Laboratório, ajuda, pausa e evolução não reproduzem essas listas; as partidas mantêm suas próprias músicas. O áudio começa após uma interação do jogador. Desativar música suspende a sequência; volume e efeitos continuam com controles independentes. Durações calculadas pelo andamento, sem contar pausas/navegação.

## Hordas e dificuldade

O tutorial mantém seus parâmetros. Necrópole, Inverno e Profano recebem spawns mais frequentes, grupos de dois a partir de 50%, 45% e 40% do tempo até o chefe, respectivamente. A pressão teórica de surgimento antes do chefe sobe aproximadamente 1,93×, 2,10× e 2,08×; a quantidade efetiva respeita o limite de 65 inimigos e a disponibilidade de posições seguras.

| Capítulo | Vida adicional dos monstros, início → final | Velocidade | Vida do chefe |
|---|---:|---:|---:|
| Necrópole | +16% → +36% | +5% | +30% |
| Inverno | +20% → +45% | +6% | +35% |
| Profano | +20% → +50% | +7% | +30% |

Os multiplicadores se somam à progressão temporal já existente. Reforços continuam mais frequentes durante chefes. Dano de contato, avisos dos ataques, recompensas e poder comprado dos personagens preservados. Parâmetros em `src/config.js`, regra pura `RubraCore.encounter`, aplicada ao spawn e aos inimigos reais. Balanceamento avaliado por simulação; não substitui retorno de partidas humanas.

## Artes e aplicativo

Agulhas boreais, Coroa de estilhaços, Cometa polar, Gume do inverno e Cetro da nevasca ganharam artes com cristais facetados, metal trabalhado, runas e transparência real. Arquivos finais em `assets/ice/{frostbolt,halo,comet,glaive,blizzard}-v2.png`, gerados com a ferramenta integrada ImageGen; prompts exatos em [PROMPTS-1.12.json](PROMPTS-1.12.json). Os recortes são preparados em texturas de até 256 px para evitar desenhar os originais grandes a cada projétil. Usados no Arsenal, escolhas de nível, HUD e combate.

Nome do aplicativo/janela e download: **RUBRA**, **RUBRA.exe**. Identificador do aplicativo, pasta `%APPDATA%/RUBRA`, chaves de save e progresso preservados. Arte enviada da tela inicial mantida. README e link de download atualizados.

## Validação

Nova suíte `test:music-update`: exclusividade, ordem, volta da lista, retomada e mute; varredura integral dos nove arranjos; nove renderizações reais de áudio offline com energia distinta, amostras finitas e sem saturação; transparência, recortes em fundo escuro, preservação do tutorial, pressão de spawn e limite real de inimigos. A avaliação técnica de áudio não equivale a uma avaliação auditiva humana.

Verificações de regressão, pacote e publicação são registradas em [CONTINUIDADE.md](CONTINUIDADE.md).

## Ideias para a próxima versão

Eventos opcionais nos mapas com recompensas próprias; evoluções de armas com combinações específicas; bestiário com animações e fraquezas; seletor de dificuldade separado da progressão normal.
