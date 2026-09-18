# RUBRA / ProjetoDungeon

- Este repositório é AllanDanil0/ProjetoDungeon. A branch de publicação é main.
- Leia docs/CONTINUIDADE.md e docs/ARQUITETURA.md antes de alterar o jogo.
- Preserve o personagem Rubra, o Bosque Esquecido e a chave legada rubra-best.
- Configurações editáveis ficam em src/config.js. Regras puras e migração em src/core.js.
- Não gere sprites novos para completar animações sem autorização. Os JPEGs fornecidos têm fundo opaco; o importador de Canvas faz recorte explícito dos quadros existentes.
- Ferramentas em dev/ e seus comandos não podem entrar no ASAR de distribuição. Não adicione atalhos dev ou flags privilegiadas ao cliente normal.
- Desde a solicitação de 15/09/2026, o Laboratório público em src/laboratory.js entra na distribuição: é uma opção de testes solicitada pelo usuário, com save separado, sem autenticação ou privilégios exclusivos. Nunca aplique seus desbloqueios ao perfil campaign.
- Saves v3 novos iniciam com Rubra/tutorial. Migração de v2 preserva personagens e mapas antes disponíveis. Não reinicie progresso existente para demonstrar bloqueios.
- Antes de publicar execute npm run check, npm test, npm run test:integration, npm run dist -- --publish never e npm run verify:package.
- Execute também npm run test:boot e npm run test:portable antes de publicar. Teste novamente o EXE baixado do release com tests/portable.cjs --exe=<caminho>, incluindo reabertura de campanha existente. Sucesso de testes do HTML/ASAR isoladamente não comprova funcionamento do portátil. Nunca use o save real para esses testes.
- Atualize docs/CONTINUIDADE.md com alterações, decisões, verificações reais e limitações.
- Não coloque credenciais ou saves de testes no Git. Use os perfis separados configurados.

- Novas armas devem manter o nível de detalhe das relíquias do Santuário Profano: metal, runas, materiais, silhueta legível e fundo realmente transparente. Validar recortes no jogo sobre fundo escuro.
