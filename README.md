# The night is yours

Jogo offline em pixel art, HTML/JavaScript e aplicativo portátil para Windows 10/11 x64. Versão 1.5.1: campanha tutorial → Necrópole → Santuário do Inverno, seis personagens, dezesseis armas no catálogo e Laboratório opcional com save separado. [Novidades e balanceamento](docs/ATUALIZACAO-1.5.md).

[Baixar o executável mais recente](https://github.com/AllanDanil0/ProjetoDungeon/releases/latest/download/RUBRA-Windows-x64.exe)

O link aponta para a última versão cuja compilação passou na aba Actions.
Abra o arquivo com dois cliques. Não é necessário instalar Node.js nem ter internet para jogar.
O executável não tem assinatura digital de editor.

## Novidades e desbloqueios

Derrote Skarn no Santuário do Inverno para liberar a **Lâmina do Zero Absoluto**, a arma mais poderosa do gelo. Quem já concluiu o mapa recebe a relíquia automaticamente ao carregar o save. O arsenal do gelo passa a onze armas.

Novos saves começam com **Rubra e o Bosque Esquecido**. Derrote Vhalkar no tutorial para liberar **Noctis e a Necrópole Carmesim**. O tutorial usa Lâmina ancestral e Estilhaço do bosque (30 segundos); as demais armas são liberadas para a Necrópole. Saves da versão anterior preservam o conteúdo já disponível e o progresso.

Para testar rapidamente: **Opções → Laboratório de testes → marque os itens → Jogar nos testes**. Também há **Desbloquear tudo**. Nada é desbloqueado só por entrar. Jogar nos testes aplica os itens marcados; a opção de arsenal permite iniciar com as armas liberadas do mapa já equipadas. Esse modo público usa um save de testes separado, disponível no mesmo executável para você e seu amigo. **Voltar à campanha** recupera o progresso normal; reabrir o jogo também inicia na campanha.

A tela inicial usa a arte enviada. Rubra ganhou caminhada em quatro direções; Noctis usa as quatro poses fornecidas. A Necrópole agora tem 2.880 × 1.620 unidades, nove vezes a área anterior, com câmera seguindo o personagem e spawns locais. [Detalhes, assets e balanceamento da versão 1.2](docs/ATUALIZACAO-1.2.md).

## Controles

- WASD ou setas: mover.
- Espaço ou Shift: esquivar.
- P ou Esc: pausar.
- F11: tela cheia.
- Clique em “Som: off” para ativar o áudio.

Recorde, escolhas, ouro e checkpoint são salvos em `%APPDATA%\RUBRA` no computador usado para jogar. O recorde da versão antiga é preservado e importado. Saves não são sincronizados pelo GitHub.

## Atualizações automáticas no GitHub

Cada push para `main` inicia a compilação Windows e publica uma nova Release com o executável e seu SHA256. O link acima aponta para a versão publicada mais recente. Também é possível iniciar a compilação manualmente em Actions → Publicar jogo para Windows → Run workflow.

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

O resultado fica em `dist/RUBRA-Windows-x64.exe`.

## Testes e desenvolvimento

- `npm run check`: sintaxe JavaScript.
- `npm test`: regras de save, economia, combate, espaços e desbloqueios.
- `npm run test:integration`: Electron fora da tela, com perfil isolado e capturas em test-output/.
- `npm run verify:package`: verifica o ASAR real após compilar; painel e comandos de desenvolvimento devem estar ausentes.
- `npm run dev`: painel de desbloqueios com save separado em `.dev-profile`. Não entra no executável distribuído.

Leia [arquitetura e regras do save](docs/ARQUITETURA.md), [inspeção dos assets e arte provisória](docs/ASSETS.md) e [continuidade e verificações](docs/CONTINUIDADE.md).

Vitória, morte e encerramento guardam o ouro uma vez. Salvar e voltar mantém a expedição pendente. Retomar não credita o saldo antecipadamente. Um processo encerrado à força pode perder até o último checkpoint (intervalo de 3 segundos).

O cliente é offline: a separação de desenvolvimento não oferece proteção absoluta contra modificações locais. Exclusividade em produção exigiria servidor autenticado com progressão autoritativa.

[Correções dos menus e expansão da versão 1.3](docs/ATUALIZACAO-1.3.md).

### Atualização 1.3.1

Nome atualizado para The night is yours. No Laboratório, **Resetar desbloqueios** restaura Rubra, tutorial e arma inicial, mantendo ouro, recorde e opções. Uma partida de testes salva é encerrada e seu ouro coletado é guardado uma única vez. A campanha normal não é alterada. O arquivo RUBRA-Windows-x64.exe e o diretório de saves mantêm os nomes antigos para compatibilidade. Músicas e novos efeitos sonoros ficam para uma próxima atualização.

### Atualização 1.4 — Fornalha Carmesim

Ignivar por 500 de ouro após liberar a Necrópole; nove armas no catálogo, seis espaços e níveis máximos 6/7 por mapa. Músicas e efeitos originais, controles de volume, novas árvores e efeitos de combate. [Detalhes, balanceamento e verificações](docs/ATUALIZACAO-1.4.md).
