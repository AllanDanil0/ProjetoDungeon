# Atualização 1.7

- Cada caçador começa qualquer mapa com sua arma principal. A exceção vale somente para o dono; os arsenais comuns dos mapas continuam os mesmos. Melhorias respeitam os limites de nível do mapa (6 no tutorial, 7 nos demais). Checkpoints e armas já equipadas são preservados.
- O Arsenal fica abaixo de Jogar. Mostra as 16 armas com ícone, situação de desbloqueio, dano base por acerto/pulso no nível 1, descrição, origem, mapas e condição de desbloqueio. Consulta o save ativo (campanha ou laboratório), sem desbloquear conteúdo.
- Aelthir custa 1.200 ouro; quem já comprou continua com ele. O retrato do menu usa balanço e respiração suaves em torno dos pés, mantendo uma pose consistente, aura e cristais. Partículas desativadas deixam o retrato parado. Sprites e movimento das partidas não foram alterados.
- Nova composição sintetizada original, Aurora sobre as ruínas (82 BPM), com sinos, harmonia e baixo próprios. No gelo alterna com a faixa anterior em blocos de 128 passos; pausa, boss, mute e volumes continuam controlados pelo mesmo motor de áudio.
- Textos de controles e desbloqueios nas Opções compartilham o centro do painel. Indicador de ouro usa a moeda com morcego enviada pelo usuário, copiada sem edição para assets/ornate/gold-bat.jpg; enquadramento feito em CSS. Referências originais preservadas.

Regras em src/core.js, preço em src/config.js, catálogo em src/armory.js, apresentação em src/ornate.css e áudio em src/audio.js. Sem novas dependências, mudança das chaves de save ou reset de progresso.

Verificações e limites registrados em CONTINUIDADE.md. Testes automatizados não substituem avaliação auditiva humana, sessões prolongadas de balanceamento ou testes em outros aparelhos.
