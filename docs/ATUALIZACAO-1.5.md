# Atualização 1.5 — Santuário do Inverno

## Complemento 1.5.1 — Relíquia de Skarn

A **Lâmina do Zero Absoluto** é a décima primeira arma do gelo, exclusiva da vitória contra Skarn (ou desbloqueio explícito no Laboratório). Vitórias registradas antes desta versão recebem a arma na migração, sem gastar ouro. Ao vencer, a tela de resultados anuncia a recompensa; a arma entra nas opções de evolução das próximas partidas. Não é equipada automaticamente nem substitui outras armas. Reset do Laboratório remove o desbloqueio junto da conclusão do mapa.

Espada rúnica de cristal, guarda violeta e núcleo branco, queda animada, dois círculos rúnicos, cristais orbitais, ondas e fragmentos. Arte Canvas original compartilhada com HUD e ofertas; nenhum asset provisório. Reutiliza o sistema de dano periódico em área: 90 de dano base por pulso, pulsos a cada 0,5 s, duração 2,8 s, intervalo 3,2 s, alcance 400 e raio 100. Lentidão de 65% por 1,6 s; bosses mantêm sua resistência. Sete níveis, modificadores globais e seis espaços preservados. Maior dano por pulso do arsenal em todos os níveis e grande cobertura; balanceamento editável em `C.weapons.absolute`.

Configuração e desbloqueios em `src/config.js`/`src/core.js`; arte em `src/weapon-art.js`; anúncio em `src/game.js`. Demais seções abaixo descrevem a base 1.5.

Derrotar Morthar na Necrópole libera o Santuário do Inverno e Nivor. Saves que já registravam essa vitória recebem o capítulo automaticamente. Ouro e progresso existentes são preservados.

## Mapa e personagens

Mundo finito de **3.840 × 2.360**, maior que a Necrópole (2.880 × 1.620): aproximadamente 1,94 vez sua área. Câmera acompanha o jogador; spawns permanecem locais. A arte fornecida foi preparada para remover o personagem que estava desenhado no chão. Caminho em cruz, árvores congeladas, portal, runas, lagos e armas enterradas foram preservados; névoa, neve e pequenos espíritos têm animação leve. Colisões de troncos, portal e monólitos são círculos editáveis, escalados junto do cenário. Lagos congelados são caminháveis. O cenário é uma imagem plana: copas não têm camada independente de oclusão.

| Personagem | Obtenção | Vida | Dano | Habilidade de dash |
|---|---|---:|---:|---|
| Nivor, ET glacial | Grátis ao liberar o mapa | 7 | ×1,30 | Nova de 36 de dano base e lentidão |
| Vael, o Criomante | 800 de ouro após liberar o mapa | 7 | ×1,35 | Nova de 44 de dano base e lentidão |
| Aelthir, guardião élfico | 1.000 de ouro após liberar o mapa | 8 | ×1,45 | Nova de 54 de dano base e lentidão |

Os três têm efeitos próprios no menu, caminhada em quatro direções e pose de dash. Compras cobram uma única vez. Aelthir também tem maior velocidade e cadência; Vael supera Ignivar. Balanceamento inicial deliberadamente superior, sujeito a ajustes após partidas reais.

## Armas e inimigos

Arsenal do gelo: **dez armas**, seis novas mais Lança do Túmulo, Selo das Cinzas, Rosário da Tempestade e Foice do Eclipse. As demais armas da Necrópole não aparecem nas ofertas do gelo. São seis espaços simultâneos, nível máximo sete (tutorial continua seis).

Novas armas: projétil congelante, halo orbital, cometa explosivo, prisma de feixe perfurante, gume de ida e volta e cetro que cria uma nevasca persistente. O primeiro é liberado com o mapa; os demais são liberados aos 30/60/90/120/150 segundos. Comprar Aelthir ou Vael também concede sua arma inicial. Lentidão expira e tem resistência maior em bosses. Dano, mortes e recompensas continuam centralizados.

Seis monstros comuns recortados da folha enviada: legionário, espectro, carcaça de neve, lobo, diabrete e arauto; sentinela de cristal como elite. São poses estáticas, pois a referência não oferece ciclos uniformes de animação. O boss **Skarn, Coração da Geleira**, usa a criatura de gelo fornecida, surge aos quatro minutos, alterna padrões sinalizados e acelera abaixo de metade da vida. Vitória encerra a partida e concede 180 de ouro garantidos uma única vez. Elite e boss compartilham arte, diferenciados por tamanho e apresentação.

## Assets e implementação

`assets/ice/`: referências originais, folha de monstros, cenário preparado e três folhas geradas. As folhas dos heróis possuem quatro linhas (frente, direita, costas, esquerda) e quatro colunas (três passos e dash); importador normaliza para 64 × 64, pés na linha 59, renderização sem suavização. JPEGs originais tinham xadrez incorporado, não transparência. Recortes dos monstros são definidos explicitamente em `src/config.js` e preparados por Canvas em `src/ice.js`.

Ferramenta imagegen integrada usada para as três folhas e remoção do personagem fixo do mapa. Instruções de geração: preservar identidade das referências, grade 4 × 4 com três passos e um dash em cada direção, fundo transparente real, margens e pés consistentes, pixel art para redução a 64 × 64. No mapa, preservar o cenário e preencher somente a área do personagem removido. O texto literal das chamadas não ficou disponível após a retomada; este é um resumo, não uma transcrição. Nenhum asset novo está marcado como placeholder.

Balanceamento, preços, geometria, drops e desbloqueios: `src/config.js`. Migração e compra: `src/core.js`. Combate/menu/câmera: `src/game.js`. Novos efeitos: `src/weapon-art.js`; cenário e retratos: `src/ice.js`; quadros: `src/sprites.js`; trilha sintetizada de gelo: `src/audio.js`; menu com seis cartões e rolagem: `src/gothic.css`. Sem dependências novas. Laboratório preserva isolamento do save normal e permite desbloquear o conteúdo novo.

## Executar e validar

`npm ci`, `npm start`. Testes: `npm run check`, `npm test`, `npm run test:integration`. Distribuição: `npm run dist -- --publish never --config.compression=store`, `npm run verify:package`, `npm run test:integration -- --packaged`.

Consulte `CONTINUIDADE.md` para os resultados efetivamente executados. Testes automatizados não substituem avaliação auditiva humana, partida manual completa, teste em outro PC ou benchmark prolongado; essas avaliações não foram realizadas nesta entrega.
