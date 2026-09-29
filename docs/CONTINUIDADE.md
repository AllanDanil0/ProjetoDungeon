# Android 1.14 — 28/09/2026

Edição Android adicionada em `android/`, com assets locais via WebViewAssetLoader, sem permissões de rede/arquivos, orientação horizontal, tela cheia, controles por toque e pausa/checkpoint ao trocar de aplicativo. `src/mobile.js` e `src/mobile.css` atuam apenas na UA do shell Android. Windows 1.14 e saves reais preservados. Chave e senha de assinatura estão na pasta privada ignorada `.android-signing/`; preservar em backup privado e reutilizar nas atualizações. Não publicar esses arquivos.

Validação local: check, 36 regras, layout mobile com cinco capturas, 62 integração e 14 inicialização aprovados. A instrumentação do emulador confirmou assets, Arsenal, seleção de personagem/mapa, combate, joystick real, esquiva, pausa/retomada, checkpoint e recarregamento. O SDK antigo default do setup foi substituído por pacotes explícitos; bibliotecas do runner adicionadas; callbacks de ciclo de vida passaram a rodar na thread principal; recarregamento agora aguarda o novo documento. Logs nativos identificaram a falha restante de injeção de toque como o aviso Android `ImmersiveModeConfirmation`, não um erro do menu. O emulador agora confirma essa orientação do sistema antes do teste. Suíte Android completa aprovada no Actions 36373793354 (943cb5d), inclusive músicas e bestiário. Assinatura v2/v3 verificada e 222 arquivos do pacote comparados à fonte. Publicado em 29/09 como android-1.14.0; APK público baixado e assinatura/hash conferidos: 89DFA8A308AFCDAECCE1BA7215A89B0BB157D0869487AA8A881EEF6D2180B786. Verificação final concluída em 29/09/2026. A primeira tentativa 36517053342 foi interrompida pela árvore de acessibilidade ainda indisponível no emulador; espera corrigida no teste 3254729, sem alteração do APK. Execução 36517474962 aprovada: APK público instalado, abertura offline e navegação por toques reais até a seleção de mapas, sem crash registrado. Release promovido de prévia para estável, sem marcar Latest para preservar o PC. README inclui APK logo abaixo do PC. Nenhuma etapa de publicação ou teste permanece pendente; desempenho em aparelhos físicos não foi avaliado. Suítes já aprovadas não foram repetidas nesta retomada, conforme pedido.

---
# Estado atual — versão 1.14.0, 27/09/2026

Base 2cfba98; main conferida sem alterações concorrentes. Implementados três objetivos opcionais em ordem variável fora do tutorial, relatório de dano efetivo/eliminação por arma e melhorias, bestiário com arte e descoberta gradual, coleção das três relíquias de chefes e seletor das onze músicas de menus, preservando a reprodução automática por contexto. Saves mantêm estatísticas e eventos nos checkpoints; contagens antigas não são inventadas. Campanha e Laboratório continuam separados. Nenhuma evolução especial de arma foi acrescentada.

Revisão restrita ao Profano: uma área persistente por arma, coeficientes locais para Zero Absoluto/Édito/Turíbulo/Rosário, abertura interna da órbita, recuperação da lentidão contínua, investidas físicas sinalizadas e gárgula perseguidora com impacto circular. Combate dos outros mapas preservado. Parâmetros, acessos e limites em ATUALIZACAO-1.14.md. Comparação com ASAR 1.13: gárgula com arsenal máximo passou de 6,8/5,3 s para 15,6/12,4 s (Malthor/Vespera); áreas máximas 6/7 → 3. Experimento restaura vida do caçador parado a cada passo; não é uma campanha humana. Inquisidor, contato máximo e invulnerabilidade de teste: 96,3/66,1 s.

Validação: sintaxe, 36 regras, 62 integração, 25 menus, 11 Profano, 12 refinamento, 20 resultados, 16 atualização anterior, 14 gelo, 13 músicas, 10 efeitos, 13 inicialização e 34 crônicas (estas últimas no ASAR final). O primeiro teste de crônicas criou efeitos artificiais sem coordenadas; corrigido o fixture e repetido sem erros. Expectativa antiga de dano no centro do Rosário atualizada para testar a nova faixa, com regressão explícita da abertura interna. Teste de hordas isolado dos eventos aleatórios. Foco nativo recuperado explicitamente no teste de teclado da janela estreita. Layouts em três resoluções e eventos em combate capturados e inspecionados.

Build 1.14 concluído; verify:package confirma fontes e assets idênticos e nenhuma ferramenta dev. Janela/F11 (3) e portátil real (24) aprovados, incluindo abertura/reabertura, cliques, músicas manual/automática, bestiário, relíquias, relatório, combate e retomada, sem erros registrados. SHA256 local (store): A6944E7BA6EFC0B5CA924D7C7B8E001F889C0E1798BDF6FAA6A31C9CC70A76D2. Saves reais não foram utilizados. Publicação e teste do download pendentes neste registro. Actions 36367359462 aprovou toda a suíte, build, janela e isolamento, mas o teste portátil excedeu seu prazo de 20 segundos no carregamento; o processo inicial não era encerrado quando launch falhava antes de retornar. Execução cancelada sem publicar. Harness corrigido para encerrar seus processos também nessa falha, registrar progresso/tempo de assets e tolerar até 120 segundos em runners lentos, mantendo falhas explícitas e todas as 24 verificações. Etapa remota limitada a cinco minutos. Execução 36368382509 confirmou travamento: primeira abertura terminou em 1844 ms; na segunda, a lista ficou parada após crimsonTree1 por mais de 120 s. A espera de Image.decode foi substituída por onload/onerror com limite explícito de 30 s por arquivo e retry existente preservado. Regressão com decode que nunca resolve aprovada, assim como falta de arquivo/recuperação, 14 verificações de inicialização e 62 de integração. Recompilação e publicação em andamento.


Fechamento confirmado em 27/09/2026: correção c65454eb65d8d373d2dc3117dd49d7cdf15f8cac aprovada no Actions 36369279174, incluindo suíte completa, compilação, janela/F11, isolamento e portátil real. Release windows-22-1. O bloqueio temporário de renomeação da saída local foi resolvido repetindo o build; pacote final local verificado, SHA256 3A2BA58460778ACD77CBB835DEA5741DB22E7BB932D49022DE82FBCB7C571886 e 24 verificações aprovadas. O download público (158140581 bytes) foi conferido com o digest SHA256 7298A945814AF0CA3EEB5A3E8A2B3034CEE6E0DFFFAFA48CC85E23FB745DE4BF. As 24 verificações foram repetidas nesse arquivo baixado e aprovadas, sem erros registrados, inclusive abertura/reabertura da campanha, menus novos, retratos, combate, relatório e tela cheia. README confirma versão 1.14 e link atual. Saves reais preservados. Nenhum teste interrompido ou etapa de publicação permanece pendente. Evoluções especiais continuam deliberadamente adiadas; balanceamento foi medido por simulação, sem campanha humana completa.

Download validado: https://github.com/AllanDanil0/ProjetoDungeon/releases/download/windows-22-1/RUBRA.exe

---

# Estado anterior — versão 1.13.0, 27/09/2026

Base 4ba5408, main conferida sem alterações concorrentes. Cinco efeitos glaciais implementados em src/ice-effects.js, com partículas reduzidas quando desativadas, preservando dano e artes da 1.12. Menu inicial corrigido: hover prevalece sobre foco, uma seta dourada e nenhum contorno residual. Profano com grupos progressivos de até cinco e limite 110; capítulos anteriores com limite 65 e pressão reduzida; tutorial preservado. Detalhes em ATUALIZACAO-1.13.md.

Retomada: suíte anterior aprovou 36 regras, 62 integração, 25 menus, 11 Profano, 12 refinamento, 20 resultados, 16 atualização anterior, 14 gelo e 13 músicas. Teste de efeitos excedeu o tempo naquela execução; repetido e aprovado (10), incluindo três resoluções e teclado/mouse. Inicialização pendente repetida e aprovada (13). Interrupção durante build deixou pacote incompleto: verify:package detectou ausência do ASAR, sem tratar o EXE antigo como atualização concluída. Build repetido com sucesso, sintaxe e 36 regras novamente aprovadas. verify:package comprova fontes/assets idênticos e ausência de ferramentas de desenvolvimento. Efeitos repetidos no ASAR (10), janela/F11 (3) e portátil real com campanha isolada reaberta (19), todos aprovados, sem erros registrados. SHA256 local, compressão store: F488201D991B9645562BC21B37DB1EAACE4755757C2113A75A93FFD1B92ED604. Capturas do menu e efeitos inspecionadas.

Balanceamento comparado por simulação com duas sementes por personagem e sem invulnerabilidade. Profano passou de dez/seis inimigos médios com Malthor na 1.12 para 14/28; Vespera passou de 10/11 para 15/31. As quatro simulações do Profano terminaram antes do chefe, enquanto os capítulos anteriores tiveram maior sobrevivência. Isso mede pressão e não garante dificuldade ideal para jogadores humanos; não houve partida humana completa. Saves reais preservados.

Publicação confirmada: commit 2907c08243eced08f067f970545d390b25f9db51, Actions 36333154849 concluído com sucesso em todas as etapas, incluindo suíte completa, compilação, janela/F11, isolamento e portátil. Release windows-19-1. Download público RUBRA.exe (158132022 bytes) baixado e SHA256 conferido com o digest do release: 4C50990518054CA568DECC9B3DCA84D60211AC99515E8AB7898B29187F4ADBC9. As 19 verificações do portátil foram repetidas no arquivo baixado e aprovadas, sem erros registrados, incluindo reabertura da campanha, cliques, retratos, efeitos/limites novos e menu sem destaque duplo. Download: https://github.com/AllanDanil0/ProjetoDungeon/releases/download/windows-19-1/RUBRA.exe. Nenhuma etapa de publicação ou teste interrompido permanece pendente nesta versão.

---

# Estado anterior — versão 1.12.0, 27/09/2026

Base f857b09, main sem alterações concorrentes no fetch. Nove composições originais (três por menu), listas exclusivas e retomada por sessão; os dois temas antigos permanecem no menu inicial. Cinco armas dos anexos refeitas com ImageGen, alpha real e texturas preparadas de até 256 px; Cometa e Cetro também usam as artes no combate. Hordas em grupos e resistência/velocidade por capítulo, sem alterar o tutorial. Aplicativo e portátil renomeados RUBRA / RUBRA.exe mantendo saves. README atualizado. Detalhes, ordem e durações em ATUALIZACAO-1.12.md; prompts em PROMPTS-1.12.json.

Validação local: check, 36 regras, 62 integração, 25 menus, 11 Profano, 12 refinamento, 20 resultados, 16 atualização anterior, 14 gelo/interface, 13 músicas/armas/hordas e 13 inicialização (222 verificações). A primeira execução de npm test no sandbox não pôde criar processo (EPERM); repetida com permissão e aprovada. Na primeira integração, a expectativa do título antigo precisou ser atualizada para RUBRA; os alvos parados dos testes também passaram a zerar a velocidade da entidade. Suíte completa aprovada em seguida. Revisão final detectou desenhos antigos nos renderizadores do Cometa/Cetro, corrigidos; nova verificação de consumo das cinco texturas aprovada.

Build 1.12 e verify:package aprovados. Inicialização (13) e música/armas/hordas (13) repetidas no ASAR final. Janela nativa e F11 aprovados (3); metadados Windows confirmam RUBRA 1.12.0.0. RUBRA.exe real passou em 17 verificações com cliques e campanha isolada reaberta. SHA256 local (compressão store): D82492785D809A25CBD841C43478DC0C196390D83441458D7548B49C97C7FDDF. Capturas dos recortes em fundo escuro inspecionadas. Benchmark Inquisidor, arsenal máximo e contato contínuo: Malthor 39,8 s; Vespera 29,8 s. Partidas simuladas não substituem balanceamento com jogadores; áudio verificado por renderização/amostras, sem avaliação auditiva humana. Saves reais não foram alterados.

Publicação confirmada após retomar a interrupção por créditos: commit 9ad7747d6fac74f1e2e57f6eb0bbd4ed54bd5d61, Actions 36300160524 aprovado em todas as etapas, release windows-18-1. Antes de retomar, árvore limpa, pacote idêntico à fonte e SHA256 local original novamente conferidos; nenhum teste local havia ficado em execução. O envio anterior não executou por falha da revisão automática sem créditos. Download público RUBRA.exe (158130998 bytes) baixado; SHA256 confirmado com o digest do release: 56DE47285539E618FA2C8A4ECA70563EA33C4CC1DC3588E9500DD0BB20E3141B. As 17 verificações do portátil foram repetidas no arquivo baixado e aprovadas, sem erros registrados, incluindo campanha existente, Jogar/Arsenal, retratos, playlists exclusivas, combate, pausa, evolução, derrota/reinício e tela cheia. Download: https://github.com/AllanDanil0/ProjetoDungeon/releases/download/windows-18-1/RUBRA.exe. Nenhuma pendência de publicação ou verificação desta atualização permanece.

---

# Estado atual — versão 1.11.0, 20/09/2026

Base 53c8ba7, alterações anteriores preservadas. Implementados colisões do gelo, animações dos monstros/Skarn, três fadas em camada superior, Prisma da Aurora e feixe detalhados, oito quadros de fogo nos doze braseiros, HUD ornamentado, arena em toda a janela, tela cheia nativa e ícone de Rubra. README atualizado. Detalhes e limites em ATUALIZACAO-1.11.md; prompts de ImageGen em PROMPTS-1.11.json.

Validação local: check, 36 regras, 62 integração, 25 menus, 11 Profano, 12 refinamento, 20 resultados, 16 atualização anterior, 13 inicialização, 14 gelo/interface. Build 1.11 gerado e verify:package aprovado; inicialização e gelo repetidos no ASAR. Portátil real passou em 13 verificações, com campanha isolada reaberta e cliques reais. Janela nativa inicia em tela cheia e F11 alterna nos dois sentidos (3 verificações no main.js empacotado). A falha inicial do teste era causada pela função global screen do jogo ocultando Screen; medição foi corrigida. Eventos CDP não acionam before-input-event, portanto o F11 é testado com sendInputEvent nativo. Capturas e ícone extraído do EXE inspecionados. As primeiras execuções remotas impediram a publicação ao detectar que o recorte novo não mantinha a altura normalizada de 128 px dos monstros. Normalização restaurada preservando a transparência; integração (62) e gelo/interface (14) repetidos com sucesso. Pipeline agora expõe falhas nas anotações públicas. Novo build e verificação do pacote aprovados. Publicação confirmada: commit 2a749de53f1dd3c111d37b43a6fb01c482f5a36d, Actions 35498313164 concluído com sucesso em todas as etapas, release windows-17-1. Executável público baixado (152807948 bytes), SHA256 conferido com o digest do release: ACE5AAE8912CF704CFF995CD9949598DEC554E5664138715EC6443875C3BDCFA. As 13 verificações do portátil foram repetidas no arquivo baixado, sem erros. Download: https://github.com/AllanDanil0/ProjetoDungeon/releases/download/windows-17-1/RUBRA-Windows-x64.exe. Nenhuma pendência de implementação ou verificação desta atualização permanece; limites de avaliação visual e de partida humana constam no documento da versão. Saves reais não foram alterados.

---

# Estado atual — versão 1.10, 18/09/2026

Base 45c2968 (1.9.1). Colisões de colunas e paredes revistas mantendo arte intacta; Profano mais difícil com chefe reforçado, rajadas direcionadas e reforços; animações de movimento dos três heróis; painel persistente de informações; pausa/evolução ornamentadas e dano das escolhas; setas duplicadas removidas. Detalhes e limites em ATUALIZACAO-1.10.md. Verificação local concluída: check, 36 testes de regras, 62 de integração, 25 de menus, 11 do Profano, 12 de refinamento, 20 de resultados, 13 de inicialização e 16 da nova suíte. Build 1.10.0 gerado e verify:package aprovado. Suítes update (16) e boot (13) repetidas no ASAR. Portátil real passou em 11 verificações, incluindo pausa e evolução por clique. Capturas em três resoluções, sprites e sobreposição de colisões inspecionados. Arte do mapa mantém SHA256 original. Publicação confirmada: commit b99e1a45b1a2fcc81829a08e64841f557c6af383, Actions 35397710692 concluído com sucesso, release windows-14-1. O EXE público foi baixado, seu SHA256 conferido (16B02AD06EE0EE93BF63045399A497EB16182D6250227841BB753ED5DFDAC21D) e as 11 verificações do portátil repetidas com sucesso, sem erros registrados. Download: https://github.com/AllanDanil0/ProjetoDungeon/releases/download/windows-14-1/RUBRA-Windows-x64.exe. Saves reais não foram alterados. Limitações: balanceamento medido por simulação, sem partida humana completa; movimentos articulam a arte original, sem novas folhas direcionais.

---

# Estado anterior — correção 1.9.1, 18/09/2026

Falha da versão pública 1.9 reproduzida no EXE baixado: campanha com Santuário Profano selecionado construía o cenário antes de carregar imagens, interrompendo a inicialização e deixando Jogar/Arsenal desabilitados e retratos ausentes. Detalhes e evidências em CORRECAO-1.9.1.md. Corrigida a ordem de preparação e acrescentados erro explícito e nova tentativa de carregamento. Saves existentes preservados.

Verificado localmente: check, 36 testes unitários, integração (62), menus (25), Profano (11), refinamento (12), telas finais (20), inicialização (13). Build 1.9.1 e verify:package aprovados. Inicialização repetida no ASAR (13); executável portátil real aberto e reaberto com perfil isolado, cliques em Jogar/Arsenal/Laboratório, retratos, combate, derrota e reinício (8 verificações, nenhum erro). Pipeline exige testar o EXE antes de publicar. Publicação confirmada: commit 2917d753698e0cba852612c6cafbb0751aed9ec7, Actions 35376036520 aprovado, release windows-13-1. EXE público baixado e SHA256 conferido: A9EA9424F5599B5EB21F051ADD7F5BFB6C39C8EFAB48A8A30B43DAA921A49ABB. Teste do download repetido em três ciclos consecutivos (24 verificações aprovadas), com perfil isolado e captura final inspecionada. O driver passou a aguardar Page.lifecycleEvent load antes de inspecionar JavaScript, evitando uma corrida de inicialização do Electron observada durante conexão antecipada do depurador. Nenhum arquivo de runtime mudou após o build publicado.

---

# Estado anterior — versão 1.9, 18/09/2026

Base: 1ea5ce8, main sem alterações concorrentes no fetch. Atualização de física, animações e progressão concluída; detalhes em ATUALIZACAO-1.9.md e prompt em PROMPTS-1.9.md. A imagem do Santuário Profano foi preservada byte a byte. Colisões nas bases de 37 pilares, 12 braseiros e altar; movimento e projéteis sem atravessar estruturas; checkpoints reposicionados preservando vida, ouro e mini-chefes. Doze fogos animados; poses dos três personagens preservadas e animadas por partes; Lâmina do Zero Absoluto com novo PNG transparente e efeito glacial. Progressão de dano normal e personagens pagos verificada. Pedido adicional atendido: seta dourada nos botões vermelhos ornamentados, sem alterar botões comuns.

Telas finais adicionadas depois do primeiro commit local: vitória e derrota uniformes aos menus, retrato original, estatísticas, recompensa correta ou arsenal usado, nova tentativa, escolha de destino e retorno ao menu. Saída voluntária recebe texto próprio. Revisão consolidada de todos os pedidos em ATUALIZACAO-1.9.md. Publicação em main foi autorizada explicitamente pelo usuário após o bloqueio inicial de aprovação automática.

Validação final: check e 36 testes unitários aprovados; 62 verificações de integração, 25 de menus, 11 do capítulo, 12 do refinamento e 20 de telas finais aprovadas na fonte e repetidas integralmente no ASAR final, sem erros registrados. Build 1.9 gerado; verify:package confirmou todos os arquivos idênticos à fonte e ausência de ferramentas dev. Capturas desktop e retrato de vitória e derrota inspecionadas. SHA256 do executável local final: F3EE9BB9F23C8D9666DB1164FA7684E28D6D638D954BBC7AFC1C20F5634C91E6. Publicação confirmada: commit eab97094fe6e295d3bbc64293b03a291eadf6391, Actions 35366691764 concluído com sucesso, Release windows-12-1 com RUBRA-Windows-x64.exe (143802667 bytes). SHA256 do arquivo público, conferido no checksum e no digest do release: 05432C0DF3474DFCE8801C23567EAED512E62A91F503D27916F486D7DB27E27F. O hash local acima difere porque o build local usa compressão store; o Actions gera o portátil comprimido. Download: https://github.com/AllanDanil0/ProjetoDungeon/releases/download/windows-12-1/RUBRA-Windows-x64.exe. Nenhum pedido desta atualização permanece pendente de implementação ou verificação automatizada.

Limitações: dificuldade ajustada por parâmetros e testes automatizados; simulação de dez minutos usa invulnerabilidade para verificar estabilidade e eventos. Não houve partida humana completa de balanceamento. Animações utilizam transformações da pose original, não novas folhas direcionais. Nenhum save real foi alterado.

---

# Estado anterior — versão 1.8, 18/09/2026

Base: 3fd2d90 de main em AllanDanil0/ProjetoDungeon, clone Documentos/teste/dungeon-update. Fetch antes da publicação não encontrou alterações concorrentes. A versão 1.7 anterior está publicada em windows-10-1.

Implementado: Santuário Profano 3840×2560 após Skarn; Karn gratuito, Malthor 1500 e Vespera 2000; sete armas novas mais Édito do Inquisidor e três herdadas do gelo. Quatro ondas, Gárgula única em 4:30, Inquisidor em 9:00 com invocações e projéteis lentos. Música original sintetizada Liturgia das cinzas. Compras, Arsenal, laboratório, mapas e checkpoints integrados. Mundo ligeiramente maior que o gelo. Detalhes em ATUALIZACAO-1.8.md.

Arte: originais fornecidos preservados; recortes Canvas de personagens e monstros; mapa, Cães, Seraphs e cinco relíquias adicionais por ImageGen. Após pedido adicional, chicote foi preparado novamente para remover o halo claro do JPEG; chroma verde não aparece no jogo. Rosário recortado diretamente do original, sem quadriculado interno; crucifixo separado para a órbita e contas vermelhas ao redor de Vespera. Capturas ampliadas de ambos sobre fundo escuro inspecionadas. Personagens novos usam a pose original animada por transformações, sem inventar novas folhas direcionais. Prompts e referências em PROMPTS-1.8.md.

Validação da fonte: check, 36 testes unitários, 62 verificações de integração, 25 de menus e 11 do novo capítulo. Build 1.8 gerado; verify:package aprovado. As 62 verificações de integração, 25 de menus e 11 do novo capítulo foram repetidas no ASAR final, todas aprovadas sem erros. SHA256 do portátil local: 35935C01C013E591A104EFBCE74EEC92CE130D0BAC01DD862314F5B304CBFAD7. Menus desktop/retrato e folhas de assets inspecionados. A simulação de dez minutos usa invulnerabilidade para verificar eventos e limites; não equivale a teste humano de balanceamento. Sem partida manual completa ou avaliação auditiva humana. Publicação confirmada: commit 4db02cd4f8f5c15a298496c55b46e58d1623f12a, Actions 35317451404 concluído com sucesso, Release windows-11-1 com RUBRA-Windows-x64.exe (142419009 bytes). O hash acima corresponde ao build local sem compressão, não ao arquivo comprimido do Actions. Download: https://github.com/AllanDanil0/ProjetoDungeon/releases/download/windows-11-1/RUBRA-Windows-x64.exe.

---

# Estado atual — versão 1.7, 17/09/2026

Base publicada: eb7a08961c0693ba12c78f5c78802b482fe8044d, Release windows-9-2 (versão 1.6), Actions concluído com sucesso. Implementação enviada no commit ecd90d7. Fetch não encontrou alterações concorrentes.

Implementado: exceção da arma principal por personagem em qualquer mapa, incluindo melhorias, início e checkpoint; Arsenal abaixo de Jogar com ícones reais, bloqueios, dano base, função, origem e mapas; Aelthir por 1200 (compras antigas preservadas); movimento suave da pose no menu sem alternar quadros, preservando aura e opção de partículas; faixa sintetizada Aurora sobre as ruínas alternando com música anterior do gelo em blocos de 128 passos.

Validação realizada: check, 34 testes unitários, 62 verificações de integração sem erros e 25 verificações de menus em três resoluções, incluindo início com arma própria para cada personagem/mapa e transição musical. Capturas do Arsenal (desktop e retrato) e tela inicial inspecionadas. Build portátil 1.7 gerado, verify:package aprovado, 62 verificações de integração e 25 de menus repetidas no ASAR final sem erros. Moeda e textos centralizados inspecionados na captura das Opções.

Referências recebidas: imagem_moeda.jpg copiada sem edição para assets/ornate/gold-bat.jpg; Imagem_menu.png orientou a centralização dos parágrafos de controles e desbloqueios abaixo dos painéis. Originais preservados. Detalhes em ATUALIZACAO-1.7.md. Limites: sem avaliação auditiva humana, partida manual completa ou aparelho físico; verificações por Electron, áudio offline e revisão das capturas. Confirmar Actions e Release antes de anunciar download.

---

# Estado publicado — versão 1.6, 17/09/2026

Base 3e615ae98a8c2c8b1e52a50550428eb711cb8918 de main, AllanDanil0/ProjetoDungeon. Trabalho na cópia Documentos/teste/dungeon-update. Fetch não encontrou alterações concorrentes. Seis interfaces implementadas seguindo as referências: início, opções, controles, laboratório, personagens e mapas. Molduras e botões são controles reais; layout responsivo com rolagem em telas menores. Ver ATUALIZACAO-1.6.md para assets e prompts. Não há dependências novas.

Sprites dos personagens, combate, atributos, progressão e chaves de save preservados. Somente o retrato de Aelthir troca o ciclo de caminhada por pose estável, aura e cristais ascendentes. Prévia de mapas usa cenário real em Canvas com cache e restauração do estado. Corrigida sobreposição da tela de controles e recorte do logotipo em retrato.

Verificações efetivamente concluídas: check; 31 testes unitários; 62 verificações de integração no código e novamente no ASAR; 19 verificações de menus no código e novamente no ASAR, nas resoluções 1360×900, 960×640 e 420×850. Zero erros de renderer. Build portátil gerado com compressão store apenas para validação local; verify:package compara fonte/assets e confirma exclusão das ferramentas dev. Capturas dos seis menus inspecionadas, incluindo layouts estreitos. Diff sem erros de whitespace. Workflow passa a exigir test:menus antes de publicar.

Limites: testes automatizados no Electron e revisão visual das capturas; sem partida manual completa, aparelho físico ou segundo PC. Publicação deve ser confirmada pelo commit e resultado do Actions antes de anunciar o download.

---

# Estado anterior — versão 1.5.1, 17/09/2026

Base e1e18163f1a9383df964ef3fe8eada9ba54ef46b de main, AllanDanil0/ProjetoDungeon. Nova arma exclusiva da vitória contra Skarn: Lâmina do Zero Absoluto (`absolute`), a décima primeira do arsenal de gelo. Sete níveis, maior dano por pulso em todos os níveis, ataque automático em área e lentidão. Reutiliza dano periódico e limites de efeitos; arte Canvas própria com queda da espada, anéis, cristais e ondas. Não adiciona dependências ou arquivos de arte externos.

Vitória concede uma vez e anuncia na tela de resultados. Conclusões antigas em completedMaps recebem a arma ao carregar; sobreviver sem matar Skarn não concede. Laboratório permite desbloqueio explícito e reset; campanha segue isolada. Ouro preservado. Configuração em src/config.js, desbloqueio/migração em src/core.js, visual em src/weapon-art.js, anúncio em src/game.js. Detalhes no complemento de ATUALIZACAO-1.5.md.

Verificações executadas com sucesso: npm run check; npm test (31 testes); npm run test:integration (62 verificações, zero erros de renderer); npm run dist -- --publish never --config.compression=store; npm run verify:package; npm run test:integration -- --packaged (62 verificações, zero erros). Captura skarn-relic.png inspecionada com ícone e três momentos do efeito. Diff conferido. Sem partida manual completa ou benchmark prolongado. Fetch não encontrou alterações concorrentes.

---

# Estado atual — versão 1.5, 17/09/2026

Base: 73626c1c93124314c71e73c286f2c823fdd1d9f8, main de AllanDanil0/ProjetoDungeon. Cópia de trabalho Documentos/teste/dungeon-update; remote confirmado. Fetch antes da publicação não encontrou alterações concorrentes.

Implementação: [ATUALIZACAO-1.5.md](ATUALIZACAO-1.5.md). Santuário do Inverno ampliado a pedido para 3840×2360, maior que a Necrópole, com câmera, colisões e spawns finitos; três heróis (Nivor grátis, Vael 800, Aelthir 1000), seis novas armas mais quatro herdadas, seis mobs/elite/boss, trilha de gelo. Desbloqueio após Morthar; migração de vitórias antigas, compra única, ouro e Laboratório preservados. Sem dependências novas.

Verificações concluídas:

- `npm run check`: aprovado.
- `npm test`: 29 aprovados, repetidos durante o build final.
- `npm run test:integration`: 61 verificações aprovadas após ampliação, zero erros de renderer.
- `npm run dist -- --publish never --config.compression=store`: executável 1.5 gerado novamente após ampliar o mapa.
- `npm run verify:package`: aprovado, comparação das fontes/assets com o ASAR e exclusão das ferramentas dev.
- `npm run test:integration -- --packaged`: 61 verificações aprovadas no ASAR final, zero erros de renderer.
- Diff conferido com `core.whitespace=blank-at-eol,blank-at-eof,space-before-tab,cr-at-eol`.
- Capturas inspecionadas: seleção dos novos heróis, mapa ampliado e composição com quatro direções dos heróis e sete recortes dos monstros. Diagnósticos ficam em test-output, ignorado pelo Git.

Retomada: o teste de nevasca anterior observava 0,96s, antes do segundo pulso quantizado no passo de simulação. Passou a observar 1,2s e também confirma a expiração da lentidão. Menu rola até o personagem selecionado. Execuções inicialmente bloqueadas por EPERM no sandbox foram repetidas com autorização e passaram. A interrupção anterior por limite de uso não deixou publicação parcial.

Limites: sem avaliação auditiva humana, partida manual completa, benchmark prolongado ou teste em outro PC. Monstros usam poses fornecidas, não ciclos inexistentes. Árvores/monólitos são parte da imagem plana com colisões separadas. Fontes de arte e instruções de geração estão no documento da versão. Confirmar o SHA da Release antes de anunciar o download.

---

# Estado atual — versão 1.4, 15/09/2026

Base: 9f5ed68221e427c767c98cf71bcc35b5b8e804e2, main de AllanDanil0/ProjetoDungeon. Trabalho na cópia Documentos/teste/dungeon-update. A pasta antiga ProjetoDungeon e referências de Downloads permanecem intactas.

Implementação: [ATUALIZACAO-1.4.md](ATUALIZACAO-1.4.md). Cinco trilhas sintetizadas e efeitos de combate/menu, volumes independentes; Ignivar por 500 de ouro após liberar Necrópole, nova de fogo no dash e +25% de dano; folha gerada com 16 poses; três armas novas (nove no total); limites de nível 6/7; arte de todas as armas ampliada e três árvores fornecidas integradas na Necrópole. Nenhuma dependência nova. Saves, reset do Laboratório e personagens antigos preservados.

Verificações efetivamente concluídas:

- `npm run check`: sintaxe aprovada.
- `npm test`: 25 testes aprovados, incluindo compra única, bloqueio por mapa/saldo, migração sem liberar mago pago e níveis por mapa.
- `npm run test:integration`: 54 verificações aprovadas, zero erros de renderer.
- `npm run dist -- --publish never --config.compression=store`: executável portátil 1.4 gerado. Refeito após corrigir a interceptação de setas do controle legado nos sliders de volume.
- `npm run verify:package`: aprovado; comparação byte a byte das fontes e assets da expansão, ferramentas dev excluídas.
- `npm run test:integration -- --packaged`: mesmas 54 verificações aprovadas no ASAR final com perfil de testes.
- Diff verificado com `core.whitespace=blank-at-eol,blank-at-eof,space-before-tab,cr-at-eol`.
- Capturas inspecionadas do menu de Ignivar, seus 16 quadros, Necrópole e combate. Arquivos de diagnóstico ficam em test-output, ignorados pelo Git.

As falhas intermediárias foram resolvidas: testes anteriores presumiam dois personagens/seis armas/nível máximo cinco; a verificação da foice passou a observar todo o retorno; setas de sliders eram interceptadas pelo handler legado. As suites foram reexecutadas após as correções.

Áudio verificado por OfflineAudioContext: cinco saídas distintas, energia não nula, amostras finitas, ausência de saturação no cenário de teste e liberação de vozes. Não houve avaliação auditiva humana, partida manual completa, teste em outro PC nem benchmark prolongado. Números ficam no config para ajuste posterior. Ferramenta imagegen integrada usada para a folha do mago; prompt e dimensões em ATUALIZACAO-1.4.md.

Publicação pelo workflow no push: confirmar SHA da Release antes de anunciar o download. Registros abaixo são históricos.

---

# Estado atual — atualização 1.3.1, 15/09/2026

Nome público atualizado para **The night is yours**, incluindo janela, HTML, metadados e título da Release. O identificador do aplicativo, arquivo RUBRA-Windows-x64.exe e pasta %APPDATA%/RUBRA continuam por compatibilidade com downloads e saves existentes.

Laboratório: botão **Resetar desbloqueios** restaura Rubra/tutorial/blade, seleções e completedMaps, preservando ouro, recorde e opções. Encerra o checkpoint de testes e consolida ouro pendente uma única vez; bloqueia chamadas no perfil campaign. Gravação usa uma cópia do save e restaura o estado anterior se falhar. Regras em src/core.js (laboratoryReset), interface em src/laboratory.js e index.html. A campanha normal permanece isolada. Músicas e novos efeitos foram adiados para manter o escopo pequeno solicitado.

Verificações: npm run check aprovado; npm test com 21 testes aprovados; npm run test:integration com 46 verificações aprovadas, incluindo reset pela interface, persistência do ouro e isolamento da campanha. Captura do Laboratório inspecionada. Primeira execução Node em sandbox encontrou EPERM; execução autorizada passou. A nova asserção de integração inicialmente comparava com uma serialização da campanha anterior à troca de perfil; foi ajustada para comparar o snapshot imediatamente anterior ao reset, mantendo a verificação de isolamento.

Build `npm run dist -- --publish never --config.compression=store` concluído. `npm run verify:package` aprovado e `npm run test:integration -- --packaged` repetiu as 46 verificações no ASAR final com sucesso e sem erros de renderer. Diff conferido, sem atualização de dependências.

Não houve teste em outro PC ou partida manual completa. Histórico abaixo.

---

# Estado atual — atualização 1.3, 15/09/2026

Base confirmada: 5488ae42494e12a05fad8b31c2fe5b71a8c7741f, main de AllanDanil0/ProjetoDungeon. A cópia de trabalho continua em Documentos/teste/dungeon-update.

Leia [ATUALIZACAO-1.3.md](ATUALIZACAO-1.3.md): centralização e Controles corrigidos; seleção de Noctis preserva ficha e foco, com animação de retrato; Laboratório aplica marcações ao jogar e pode equipar arsenal imediatamente; Necrópole ampliada para 2880×1620 com câmera móvel, colisões e spawns. Save v3 e coordenadas antigas preservados. A expansão antes adiada está implementada. Nenhuma dependência ou asset externo novo.

Verificações executadas na fonte final:

- `npm run check`: aprovado, também no build.
- `npm test`: 20 testes aprovados, também no build.
- `npm run test:integration`: 45 verificações aprovadas, zero erros de renderer.
- `npm run dist -- --publish never --config.compression=store`: portátil Windows 1.3 gerado.
- `npm run verify:package`: aprovado; comparação de fontes/assets com ASAR e exclusão das ferramentas privadas de desenvolvimento.
- `npm run test:integration -- --packaged`: 45 verificações aprovadas no ASAR final, usando perfil isolado.
- Vídeo fornecido (1,344 segundo) analisado por quadros: reproduzida a ficha Rubra após selecionar Noctis. Capturas do menu centralizado, Noctis e mapa ampliado inspecionadas.

Executável local: dist/RUBRA-Windows-x64.exe. SHA256: FC2D7949ED65DA545EA093282472A029AF23457030C47EF73B1A4DED9AB18FC8. Release pode ter hash diferente por ambiente e compactação.

Não executados: partida manual completa, teste em outro PC, toque físico e medição prolongada de desempenho/balanceamento. O pacote foi validado no Electron pelo ASAR, sem abrir o portátil com saves reais. O mapa repete os setores existentes em grade 3×3; não foram criadas nove regiões com arte exclusiva. Noctis recebeu animação decorativa no menu; conserva as poses direcionais fornecidas na partida.

A publicação é feita pelo workflow no push; confirmar Actions e Release pelo SHA do novo commit antes de anunciar o download. Os registros abaixo são históricos.

---

# Estado atual — atualização 1.2, 15/09/2026

Repositório confirmado: AllanDanil0/ProjetoDungeon, branch main, base b69194f. Trabalho na cópia local `Documentos/teste/dungeon-update`, apontando para esse repositório. A pasta antiga `Documentos/ProjetoDungeon` e os arquivos de Downloads não foram alterados.

Implementação e decisões: [ATUALIZACAO-1.2.md](ATUALIZACAO-1.2.md). Telas novas, Rubra com 16 quadros, Noctis com quatro poses, tutorial inicial, desbloqueio de Noctis/Necrópole após Vhalkar, seis armas com arte própria, Laboratório público em save isolado. Saves v2 preservados. Expansão do mapa/câmera adiada.

## Verificações efetivamente executadas na versão 1.2

- `npm run check`: sintaxe aprovada.
- `npm test`: 17 testes aprovados (também repetidos pelo build final). A primeira tentativa em sandbox falhou ao criar processo com EPERM; a execução autorizada concluiu normalmente.
- `npm run test:integration`: 38 verificações aprovadas no Electron, zero erros de renderer. Inclui início bloqueado, tentativa direta de iniciar mapa bloqueado, direções, transparência e base dos pés dos 20 quadros, menus, colisões, spawns, HUD com seis armas, upgrades, ouro único, checkpoints, boss, tutorial liberando capítulo, reinício e Laboratório individual/tudo com isolamento.
- `npm run dist -- --publish never --config.compression=store`: executável portátil Windows 1.2 gerado a partir da fonte final. Compactação mínima somente local; Release usa compactação normal.
- `npm run verify:package`: aprovado. Código de src, HTML, main e todos os novos assets comparados byte a byte com o ASAR; dev/tests/scripts e API dev ausentes, Laboratório público presente. A primeira verificação encontrou um erro de normalização de separadores no próprio verificador Windows; os arquivos existiam. O verificador foi corrigido e reexecutado.
- `npm run test:integration -- --packaged`: mesmas 38 verificações aprovadas carregando index.html diretamente do ASAR final em Electron com perfil de testes. Não usa o save real do jogador.
- `git -c core.whitespace=blank-at-eol,blank-at-eof,space-before-tab,cr-at-eol diff --check`: aprovado; CRLF é aceito porque há arquivos legados com esse formato.
- Capturas inspecionadas: início, caçadores, Necrópole em combate, Laboratório, caçadores em 800×600 e retrato 420×850, além de todos os novos quadros. Resoluções físicas nas capturas refletem a escala do Windows. Dados completos em test-output/integration.json e asset-dimensions.json (artefatos de teste ignorados pelo Git).

Build local final: `dist/RUBRA-Windows-x64.exe`. SHA256 `86561190A3AB0544D249D1F875CBA0AEEC35723B48DC0E85797889A0B7793B53`. O hash da Release pode diferir pela compactação e ambiente de build.

Não foi feita partida manual completa, avaliação prolongada de balanceamento, teste em outro PC ou toque físico. O pacote foi exercitado via Electron/ASAR, sem abrir o portátil contra saves reais. Noctis conserva poses estáticas por direção; as imagens têm proporções diferentes conforme a referência. Necrópole maior e câmera móvel permanecem para a próxima etapa.

O registro de 14/09 abaixo é histórico; sua pendência de autenticação foi resolvida e a versão anterior foi publicada em windows-2-1. A versão 1.2 será publicada pelo workflow no push correspondente; conferir Actions e Release pelo SHA desse commit antes de anunciar o download.

---

# Estado da atualização — 14/09/2026

Repositório: AllanDanil0/ProjetoDungeon. Base consultada: 6b69d315c674773185f9bb6502cf6a9d15a27ead. Desenvolvimento em cópia clonada, sem alterar os arquivos originais em Downloads nem a pasta antiga Documentos/ProjetoDungeon.

## Implementado nesta etapa

- Noctis como personagem padrão; Rubra original preservada; seleção e preferência persistentes.
- Importação dos quadros reais do JPEG, remoção de fundo no Canvas, direções explícitas, espelhamento lateral, origem inferior comum e escala pequena.
- Menu com opções, controles, ouro e transições; seleção de personagem e mapa, teclado/mouse/toque.
- Bosque Esquecido como tutorial e Vhalkar com ornamentação do bosque.
- Necrópole Carmesim montada a partir dos assets; arena finita, obstáculos e spawns configuráveis.
- Morto-vivo, rastejante, resistente, conjurador e elite; boss Morthar com duas famílias de ataques antecipados e fase enfurecida.
- Quatro armas novas além da original, inventário de seis espaços, ataques simultâneos, cinco níveis por arma, XP, escolhas válidas e recompensas alternativas.
- Ouro de drops e boss; consolidação única em vitória/morte/encerramento; checkpoint e retomada; migração do recorde antigo.
- Painel exclusivo de desenvolvimento com perfil isolado. O pacote normal contém somente a lista positiva de arquivos de jogo.
- GitHub Actions atualizado para exigir testes e inspeção do ASAR antes de publicar.

## Verificações efetivamente executadas

Ambiente: Windows x64, Node 24.20.0, Electron 44.3.0, electron-builder 26.15.3.

- `npm ci`: concluído; nenhuma dependência nova adicionada.
- `npm run check`: sintaxe de main.js, src, dev, scripts e testes aprovada.
- `npm test`: 10 testes aprovados. Migração, seleção inválida, JSON corrompido com backup, ouro pendente/consolidação idempotente, espaços, máximos, bloqueios, modificadores, recompensas únicas e 1.000 amostras de spawn entre os dois mapas.
- `npm run test:integration`: 25 verificações aprovadas em Electron fora da tela, sem erros do renderer. Inclui assets, menus, direções/64×64, movimento, colisão, spawns, múltiplas armas, invulnerabilidade, escolhas, save durante escolha, coleta única, morte única, retomada, boss único, dois sinais/ataques, fase, ouro garantido, desbloqueio, tutorial, reinício, abandono, teclado/opções, simulação de 188 segundos até o boss, recuperação de checkpoint de vitória, ausência da API dev no cliente normal, desbloqueios de desenvolvimento em armazenamento separado e recarga real da página preservando saldo e seleção.
- Capturas inspecionadas: menu, seleção de personagens, seleção de mapas, novo mapa, boss, resultados, tutorial, janela 800×600 e retrato 420×850. Os quadros recortados também foram inspecionados. As dimensões de capturas variam com a escala de exibição do Windows.
- `npm run dist -- --publish never`: gerou executável portátil; uma checagem posterior detectou que um ajuste final no seletor de som havia ficado fora desse primeiro pacote.
- `npm run dist -- --publish never --config.compression=store`: build final regenerado com a fonte final. A compactação mínima foi usada apenas nessa verificação local; a configuração de Release no GitHub mantém a compactação normal.
- `npm run verify:package`: aprovado no build final. Abre app.asar, confirma arquivos do jogo, ausência de dev/tests/scripts e da API/painel dev; compara fonte empacotada e local byte a byte.
- `git diff --check`: sem erros de whitespace.

O build final está em dist/RUBRA-Windows-x64.exe. SHA256: 9F69CE669FC7A4B2644EB41FD8F4EDA0F98F76EFCD107A0692D1DF9C4803171E.

## Limites da validação

Não foi feita uma partida manual completa, validação humana de balanceamento por horas, execução em um segundo PC ou teste em aparelho de toque físico. As interações e o combate foram validados por simulação automatizada; os screenshots vieram de Electron. A abertura do executável portátil distribuído não foi usada para testar saves reais do usuário. A estrutura e fonte do pacote foram inspecionadas diretamente.

Frente e costas de Noctis têm um quadro cada; os monstros são sprites estáticos. Armas novas, solo complementar e ornamentos do boss original são arte procedural provisória. Ver ASSETS.md. O cliente offline não oferece proteção absoluta contra adulteração; exclusividade real exige um servidor autenticado.

## Publicação

O envio depende de autenticação GitHub neste computador. A consulta ao repositório público funcionou, mas o teste de escrita sem interação retornou ausência de credencial. Nenhuma publicação remota deve ser afirmada antes de um push bem-sucedido e da conferência da execução correspondente no Actions.
