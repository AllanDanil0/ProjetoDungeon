# RUBRA — A Última Lâmina

Jogo HTML/JavaScript com aplicativo portátil para Windows 10/11 x64.

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

O recorde é salvo em `%APPDATA%\RUBRA` no computador usado para jogar.

## Atualizações automáticas no GitHub

Cada push para `main` inicia a compilação Windows e publica uma nova Release com o executável e seu SHA256. O link acima aponta para a versão publicada mais recente. Também é possível iniciar a compilação manualmente em Actions → Publicar jogo para Windows → Run workflow.

Edite `index.html` para atualizar o jogo. Esse é o arquivo usado pelo aplicativo; `rubra.html` e `index.html.html` são cópias anteriores e não entram no executável.

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
