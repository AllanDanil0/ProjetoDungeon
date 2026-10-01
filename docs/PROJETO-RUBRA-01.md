# Atualização 01 — diagnóstico e padrão de qualidade

Iniciada em 01/10/2026 sobre a versão 1.14, commit 78a49f5. A revisão visual foi publicada no PC 1.14.1 (windows-34-1), com validação do executável local e do download público. O APK permanece na 1.14. Android fica para uma solicitação posterior do autor.

## Entrega desta etapa

- Auditoria de regressão da base: regras, integração, eventos, recompensas, checkpoints e isolamento do Laboratório.
- Arte dos três eventos refeita em Canvas pixel art com fundo transparente: altar de pedra com colunas, detalhes metálicos, grimório, joia e velas; cristais com facetas, runas, contenções quebradas e partículas; selo dourado com rubi para o alvo marcado.
- Anel do altar representa o progresso; a barra representa integridade. A área exigida continua com o mesmo raio. Partículas opcionais respeitam a configuração. Não foram alterados danos, recompensas, prazos, colisões ou saves.
- Apenas três sprites de 96 × 104 ficam em cache. Desenhar novos quadros não cria novos canvases nem acumula partículas. Sem dependência ou download de arte em runtime.
- Diagnóstico reproduzível, catálogo de valores efetivamente carregados e ensaios de armas. Documentação de direção e critérios abaixo.

## O que foi verificado agora

`npm run check`, `npm test` (36), `npm run test:integration` (62), `npm run test:chronicles` (34) e `npm run test:quality` (14). Os testes usam perfis próprios, nunca o save real.

A suíte nova confere animação, transparência, modo de partículas reduzidas, ausência de alterações no estado do jogo ao desenhar, reutilização do cache e presença dos três eventos nos três mapas. As capturas ficam em `test-output/quality-baseline/`; inspecionar também a composição no cenário, não apenas o atlas.

A primeira execução de regras foi bloqueada por `spawn EPERM` do ambiente restrito; passou após execução autorizada fora dessa restrição. O harness visual inicialmente capturava o quadro anterior e depois retornou uma função não serializável pela ponte do Electron; ambos foram corrigidos no teste. A versão final aguarda o compositor e confere o mapa/evento. Essas falhas não foram contabilizadas como aprovações.

A publicação do PC foi autorizada após o diagnóstico local. O registro da compilação e dos testes do executável fica em CONTINUIDADE.md. Nenhum APK novo será gerado nesta etapa.

## Referência mensurável

Dados da execução em [qualidade-01.json](qualidade-01.json), [armas-01.json](armas-01.json) e [profano-01.json](profano-01.json). São referências para comparação de revisões, não provas de equilíbrio ou diversão.

Ambiente: Windows, Intel i5-9300H, Electron 44.3.0; renderização offscreen por software. O teste mede duração das chamadas de desenho na CPU. Não mede FPS real, GPU, latência de entrada, estabilidade térmica ou desempenho Android. Cada cena tem aquecimento e 120 amostras, com 65 inimigos na Necrópole/gelo e 110 no Profano, sem arsenal completo em atividade. O JSON preserva média e p95; outliers podem elevar a média acima do p95.

O ensaio de armas tem 124 casos: armas disponíveis em cada mapa, nível inicial e máximo permitido, um alvo ou doze, dez segundos a 30 passos/s, semente 17, modificadores de personagem neutros. Registra dano efetivo e soma dos segundos de lentidão dos alvos. Os alvos são recolocados a 65 unidades a cada passo e têm muita vida. Isso favorece certos alcances e desfavorece outros; valores zero exigem analisar o alcance/abertura antes de concluir defeito. Não chamar esses valores de DPS de campanha. Relíquias e armas comuns devem continuar identificadas separadamente na decisão de balanceamento.

O ensaio existente do Profano usa Malthor/Vespera, seis armas no nível 7, jogador imóvel e vida restaurada a cada passo. Gárgula: 15,6/12,4 s, com 3/2 ataques sinalizados liberados e máximo de três áreas persistentes. Grupo de 18 físicos: 4 s para ambos; dano recebido 3/0, respectivamente. Não é uma simulação de sobrevivência humana nem uma recomendação de aumentar vida indiscriminadamente.

## Fila priorizada com evidências

| Prioridade | Achado / lacuna | Próxima ação e critério de aceite |
| --- | --- | --- |
| Alta — combate | Grupo físico do Profano some em 4 s no ensaio máximo; Vespera recebe zero dano | Atualizações 03/04: medir também arsenal intermediário e móvel; melhorar aproximação e janelas de ameaça legíveis. Comparar novamente os mesmos cenários antes de ajustar números. Não enfraquecer globalmente os capítulos anteriores. |
| Alta — desempenho | Há referência de desenho por software, mas nenhuma medição de frame time de uma partida cheia em PC/Android físico | Atualização 13: 15 min por mapa, seis armas, horda máxima, partículas ligadas/desligadas, hardware registrado. Meta inicial PC 60 FPS e p95 ≤ 20 ms no hardware de referência; Android meta provisória 30 FPS/p95 ≤ 40 ms, a confirmar em aparelho escolhido. |
| Alta — compreensão | Ainda não há observação de novos jogadores | Cinco sessões sem orientação: selecionar personagem, iniciar, esquivar, escolher melhoria, compreender um evento e retomar save. Meta proposta: pelo menos 4/5 completarem o fluxo e explicarem o objetivo; registrar dificuldades, não inventar resultados. |
| Média — leitura | Faixa superior dos eventos pode cobrir elementos próximos do topo da câmera, observada nas capturas | Atualização 12: estudar faixa compacta/retrátil e testar HUD em combate cheio; objetivo, aviso de chefe e personagem devem permanecer legíveis. |
| Média — profundidade | Altar ainda é desenhado na camada final dos eventos, depois das entidades | Atualização 10: separar marca de chão, objeto e etiqueta com ordenação por pés; testar jogador à frente/atrás. A nova arte preserva a ordem atual. |
| Média — comparação de heróis | Valores carregados diferem entre personagens; preço sozinho não mede utilidade | Atualização 05: ensaios de mobilidade, sobrevivência e arma principal, com o mesmo mapa/semente. Usar a tabela `heroes` da referência; não deduzir superioridade apenas do dano por acerto. |
| Baixa — manutenção | Configuração inicial pode ser complementada por módulos posteriores | Sempre colher valores do jogo carregado, como faz o diagnóstico; evitar avaliar balanceamento lendo apenas o primeiro objeto de configuração. |

Não foi encontrado bloqueio nas suítes executadas. Isso não equivale a ausência de qualquer bug. As lacunas acima permanecem abertas e impedem declarar toda a avaliação comercial concluída.

## Direção do jogo

**Identidade:** ação de sobrevivência offline com caçadores, relíquias e fantasia gótica em pixel art. Combinações fortes devem trazer decisões e janelas de risco, sem apagar a necessidade de movimento. O Profano é a maior exigência da campanha; o tutorial ensina antes de pressionar.

**Público pretendido:** quem gosta de partidas acessíveis de sobrevivência e construção de arsenal, mas quer inimigos reconhecíveis e domínio progressivo. Isso é uma hipótese de produto a validar com jogadores, não uma pesquisa de mercado concluída.

**Padrão visual:** silhueta reconhecível no tamanho real de jogo, materiais separados, luz coerente, recortes transparentes, pixels nítidos e hierarquia entre cenário, ameaça e interface. Ornamento não pode ocultar projéteis ou área perigosa. Desativar decoração não pode esconder sinal de combate.

**Escopo:** seguir as atualizações combinadas, uma por vez: 02 movimento; 03 balanceamento; 04 inimigos; 05 caçadores; 06 sinergias; 07 eventos/rituais; 08 progressão; 09 evoluções, somente após balancear; 10 arte; 11 som; 12 interfaces; 13 desempenho; 14 conteúdo final; 15 divulgação; 16 lançamento. A arte de eventos foi antecipada por solicitação expressa. Esta etapa não adiciona loja, monetização, multiplayer ou novas evoluções.

## Reproduzir e avançar

1. Executar `npm run test:quality` para arte, catálogo e desenho de cenas.
2. Executar `npm exec electron tests/weapon-baseline.cjs` para armas e `npm exec electron tests/profane-balance.cjs` para a situação crítica do Profano.
3. Guardar JSON com commit/hardware e comparar mesma configuração após cada mudança. Não comparar medições com cenários diferentes como se fossem regressões.
4. Antes de publicar, seguir todas as etapas de pacote/portátil previstas em `AGENTS.md`, incluindo o arquivo baixado do release.
5. Completar sessões humanas e referência em aparelho físico quando disponíveis. A parte local desta atualização está entregue; essas validações externas continuam pendentes. APK adiado conforme solicitado.
