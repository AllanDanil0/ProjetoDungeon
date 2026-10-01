# RUBRA

Jogo offline em pixel art, HTML/JavaScript e aplicativos para Windows 10/11 x64 e Android 8 ou superior. **PC 1.14.1:** nova arte animada para altar, cristais de corrupção e inimigo marcado, com diagnóstico de qualidade e balanceamento documentado. **Android permanece na 1.14.0.** [Novidades para PC](docs/ATUALIZACAO-1.14.1.md). [Músicas: ordem e duração](docs/ATUALIZACAO-1.12.md).

[Baixar para PC — RUBRA.exe](https://github.com/AllanDanil0/ProjetoDungeon/releases/latest/download/RUBRA.exe)

[Baixar para Android — RUBRA.apk](https://github.com/AllanDanil0/ProjetoDungeon/releases/download/android-1.14.0/RUBRA.apk)

O link de PC aponta para a última compilação Windows validada na aba Actions.
Abra o arquivo com dois cliques. Não é necessário instalar Node.js nem ter internet para jogar.
O executável Windows não tem assinatura digital de editor.

No Android, baixe e abra o APK; autorize a instalação dessa origem quando o sistema solicitar. Jogue offline na horizontal, com joystick à esquerda e esquiva à direita. Mantenha o Android System WebView atualizado. O progresso fica no celular, separado do PC; atualizar pelo APK preserva os dados, mas desinstalar apaga o progresso local. [Detalhes da edição Android](docs/ANDROID.md).

## Desenvolvimento em andamento

[Atualização 01 — diagnóstico, critérios de qualidade e nova arte dos eventos](docs/PROJETO-RUBRA-01.md). A revisão visual integra a versão PC 1.14.1. Avaliações com jogadores e desempenho em aparelhos físicos seguem pendentes; APK novo adiado.

## Novidades e desbloqueios

O **Santuário Profano (capítulo III)** sucede o gelo: Karn é liberado com o mapa; Malthor custa 1500 e Vespera 2000 de ouro. Quatro ondas, Gárgula em 4:30 e Inquisidor Esquecido em 9:00; vencê-lo libera o Édito do Inquisidor. Inclui música própria, sete armas normais novas e a relíquia do chefe.

As versões 1.8–1.10 também acrescentaram telas de vitória/derrota, pausa e evolução ornamentadas, dano nas escolhas, informações persistentes dos personagens e correções de inicialização do executável. A versão 1.12 preserva essas melhorias, os refinamentos de gelo/interface da 1.11 e os saves.

Derrote Skarn no Santuário do Inverno para liberar a **Lâmina do Zero Absoluto**, a arma mais poderosa do gelo. Quem já concluiu o mapa recebe a relíquia automaticamente ao carregar o save. O arsenal do gelo passa a onze armas.

Novos saves começam com **Rubra e o Bosque Esquecido**. Derrote Vhalkar no tutorial para liberar **Noctis e a Necrópole Carmesim**. O tutorial usa Lâmina ancestral e Estilhaço do bosque (30 segundos); as demais armas são liberadas para a Necrópole. Saves da versão anterior preservam o conteúdo já disponível e o progresso.

Para testar rapidamente: **Opções → Laboratório de testes → marque os itens → Jogar nos testes**. Também há **Desbloquear tudo**. Nada é desbloqueado só por entrar. Jogar nos testes aplica os itens marcados; a opção de arsenal permite iniciar com as armas liberadas do mapa já equipadas. Esse modo público usa um save de testes separado, disponível no mesmo executável para você e seu amigo. **Voltar à campanha** recupera o progresso normal; reabrir o jogo também inicia na campanha.

A tela inicial usa a arte enviada. Rubra ganhou caminhada em quatro direções; Noctis usa as quatro poses fornecidas. A Necrópole agora tem 2.880 × 1.620 unidades, nove vezes a área anterior, com câmera seguindo o personagem e spawns locais. [Detalhes, assets e balanceamento da versão 1.2](docs/ATUALIZACAO-1.2.md).

## Controles

- WASD ou setas: mover.
- Espaço ou Shift: esquivar.
- P ou Esc: pausar.
- F11: alternar entre tela cheia (padrão) e janela.
- Clique em “Som: off” para ativar o áudio.

Recorde, escolhas, ouro e checkpoint são salvos em `%APPDATA%\RUBRA` no computador usado para jogar. O recorde da versão antiga é preservado e importado. Saves não são sincronizados pelo GitHub.

## Atualizações automáticas no GitHub

Cada push para `main`, exceto commits específicos `[android]`, inicia a compilação Windows e publica uma nova Release com o executável e seu SHA256. O link acima aponta para a versão publicada mais recente. Também é possível iniciar a compilação manualmente em Actions → Publicar jogo para Windows → Run workflow.

`index.html` é a entrada do jogo. Balanceamento fica em `src/config.js`, regras de save e progressão em `src/core.js`, integração em `src/game.js`. `src/legacy.js` preserva a base gráfica e controles do original. `rubra.html` e `index.html.html` são cópias anteriores e não entram no executável.

As alterações locais precisam ser enviadas com commit e push para disparar a publicação. O GitHub não observa pastas locais ou o OneDrive. Esta configuração não substitui automaticamente o executável já baixado em outro PC: baixe a nova versão pelo link acima.

## Executar e compilar localmente

Instale Node.js 24 com npm e execute na pasta do projeto:

```powershell
npm ci
npm start
```

Para gerar o executável:

```powershell
npm run dist -- --publish never
```

O resultado fica em `dist/RUBRA.exe`.

## Testes e desenvolvimento

- `npm run check`: sintaxe JavaScript.
- `npm test`: regras de save, economia, combate, espaços e desbloqueios.
- `npm run test:integration`: Electron fora da tela, com perfil isolado e capturas em test-output/.
- `npm run test:menus`: seis menus em três resoluções, acesso aos controles e animação de Aelthir; aceita `-- --packaged` após compilar.
- `npm run test:music-update`: playlists, áudio offline, cinco novas artes e pressão das hordas.
- `npm run verify:package`: verifica o ASAR real após compilar; painel e comandos de desenvolvimento devem estar ausentes.
- `npm run dev`: painel de desbloqueios com save separado em `.dev-profile`. Não entra no executável distribuído.

Leia [arquitetura e regras do save](docs/ARQUITETURA.md), [inspeção dos assets e arte provisória](docs/ASSETS.md) e [continuidade e verificações](docs/CONTINUIDADE.md).

Vitória, morte e encerramento guardam o ouro uma vez. Salvar e voltar mantém a expedição pendente. Retomar não credita o saldo antecipadamente. Um processo encerrado à força pode perder até o último checkpoint (intervalo de 3 segundos).

O cliente é offline: a separação de desenvolvimento não oferece proteção absoluta contra modificações locais. Exclusividade em produção exigiria servidor autenticado com progressão autoritativa.

[Correções dos menus e expansão da versão 1.3](docs/ATUALIZACAO-1.3.md).

### Atualização 1.3.1

Nome atualizado para The night is yours. No Laboratório, **Resetar desbloqueios** restaura Rubra, tutorial e arma inicial, mantendo ouro, recorde e opções. Uma partida de testes salva é encerrada e seu ouro coletado é guardado uma única vez. A campanha normal não é alterada. Na época, o arquivo ainda se chamava RUBRA-Windows-x64.exe. Na versão 1.12, o nome passa a RUBRA.exe e a pasta de saves continua preservada.

### Atualização 1.4 — Fornalha Carmesim

Ignivar por 500 de ouro após liberar a Necrópole; nove armas no catálogo, seis espaços e níveis máximos 6/7 por mapa. Músicas e efeitos originais, controles de volume, novas árvores e efeitos de combate. [Detalhes, balanceamento e verificações](docs/ATUALIZACAO-1.4.md).
