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
