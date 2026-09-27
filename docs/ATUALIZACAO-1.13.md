# RUBRA 1.13 — efeitos glaciais e hordas

## Efeitos das cinco armas

- Agulhas boreais: rastro em camadas, pequenos cristais desprendidos e estilhaços no impacto.
- Coroa de estilhaços: lâminas girando sobre a própria órbita, arcos segmentados, cristais e anel rúnico discreto.
- Cometa polar: cauda glacial, fragmentos em movimento, clarão central e onda de choque com estilhaços radiais.
- Gume do inverno: trilha de corte, arcos ao redor da lâmina, cor distinta na volta e fragmentos no impacto.
- Cetro da nevasca: formação do círculo, anéis rúnicos em sentidos diferentes, vento em camadas, cristais suspensos e pulsos visuais.

Arte das armas preservada. Efeitos desenhados em Canvas em `src/ice-effects.js`, com quantidade fixa de elementos por chamada, sem criar entidades adicionais ou alterar dano, área de acerto e cadência. A opção de partículas reduz os adornos e conserva os sinais essenciais. Inspeção sobre fundo escuro e teste de consumo das texturas no combate.

## Menu inicial

O destaque duplo vinha do foco de teclado mantido em Jogar e do hover em Opções. O hover agora tem prioridade; quando o mouse sai, o foco volta a indicar a seleção. Uma seta dourada acompanha a ação selecionada, sem a seta esquerda e sem contorno residual em outra opção. Testado alternando mouse/teclado em janela real em três resoluções, além do portátil.

## Dificuldade por capítulo

O tutorial permanece intacto. O limite dos capítulos anteriores continua em 65 inimigos. No Santuário Profano, sobe para 110, com um inimigo por surgimento no primeiro minuto, dois a partir de 1:00, três em 2:30, quatro em 5:00 e cinco em 7:30. Os intervalos das ondas ficam 20% abaixo dos intervalos-base. Posições continuam validadas; chefes têm sua reserva de surgimento.

A Necrópole e o Inverno foram suavizados em relação à 1.12: grupos duplos somente nos últimos 15% do tempo antes do chefe; intervalos-base multiplicados por 1,2 e 1,35. Multiplicador de vida adicional dos monstros começa em 0,75 e 0,65, respectivamente, e chega a 1,10; conserva-se a progressão temporal original. O acréscimo de velocidade da 1.12 foi removido nesses dois capítulos. Chefes e armas mantêm seus valores da 1.12.

Comparação automatizada em `tests/balance-probe.cjs`, duas sementes por personagem, sem invulnerabilidade, com coleta de XP, escolhas de nível e esquiva. Referência 1.12 disponível pela opção `--baseline`; versão atual por `--after`. Resultados locais em `test-output/balance-before.json` e `balance-after.json`. O agente usa heurísticas e todas as armas liberadas para escolhas, começando apenas com a arma do personagem; não equivale a uma campanha humana nem garante uma taxa de vitória.

## Verificação

Suíte `test:effects-update` confere seleção única, volta ao teclado, animação com partículas ligadas/desligadas, estado do Canvas, limites por mapa e ausência de mudanças de dano por renderização. O teste do portátil inclui a regressão do menu e presença dos efeitos/limites novos. Resultados finais e publicação registrados em [CONTINUIDADE.md](CONTINUIDADE.md).
