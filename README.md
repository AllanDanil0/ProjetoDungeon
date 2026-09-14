# RUBRA — A Última Lâmina

Jogo offline em pixel art, HTML/JavaScript e aplicativo portátil para Windows 10/11 x64. Versão 1.1: Noctis e Rubra, tutorial do Bosque Esquecido, Necrópole Carmesim, cinco armas combináveis, experiência, bosses e ouro persistente.

[Baixar o executável mais recente](https://github.com/AllanDanil0/ProjetoDungeon/releases/latest/download/RUBRA-Windows-x64.exe)

O link fica disponível após a primeira compilação bem-sucedida na aba Actions.
Abra o arquivo com dois cliques. Não é necessário instalar Node.js nem ter internet para jogar.
O executável não tem assinatura digital de editor.

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
