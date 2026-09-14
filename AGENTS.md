# RUBRA / ProjetoDungeon

- Este repositório é AllanDanil0/ProjetoDungeon. A branch de publicação é main.
- Leia docs/CONTINUIDADE.md e docs/ARQUITETURA.md antes de alterar o jogo.
- Preserve o personagem Rubra, o Bosque Esquecido e a chave legada rubra-best.
- Configurações editáveis ficam em src/config.js. Regras puras e migração em src/core.js.
- Não gere sprites novos para completar animações sem autorização. Os JPEGs fornecidos têm fundo opaco; o importador de Canvas faz recorte explícito dos quadros existentes.
- Ferramentas em dev/ e seus comandos não podem entrar no ASAR de distribuição. Não adicione atalhos dev ou flags privilegiadas ao cliente normal.
- Antes de publicar execute npm run check, npm test, npm run test:integration, npm run dist -- --publish never e npm run verify:package.
- Atualize docs/CONTINUIDADE.md com alterações, decisões, verificações reais e limitações.
- Não coloque credenciais ou saves de testes no Git. Use os perfis separados configurados.
