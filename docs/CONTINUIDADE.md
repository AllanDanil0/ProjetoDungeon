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
