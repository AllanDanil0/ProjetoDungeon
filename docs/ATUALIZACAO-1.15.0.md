# RUBRA 1.15.0 — movimento e Santuário Profano

Atualização Windows. Android permanece em 1.14.0, conforme solicitado.

## Personagens

- Noctis ganhou seis quadros de caminhada em cada uma das quatro direções, com proporções consistentes e recorte transparente preparado no carregamento.
- Karn, Malthor e Vespera ganharam quatro quadros de caminhada por direção e poses de esquiva. A animação não depende mais de deformar o retrato frontal.
- Os nove caçadores usam o mesmo controlador de movimento, com cadências individuais, repouso e duas fases de dash. As caminhadas já existentes de Rubra, Ignivar, Nivor, Vael e Aelthir foram preservadas; suas poses de esquiva receberam preparação e recuperação sem esticar o rosto.
- Retratos nos menus usam os quadros de caminhada. A opção de animações dos menus continua sendo respeitada.
- Corrigidas a inversão de direção durante o dash, a direção herdada da partida anterior e a caminhada visual ao pressionar contra uma parede sem sair do lugar.

## Profano

A imagem-base de 1536 × 1024 não foi alterada. O novo material de textura modifica apenas a luminosidade no interior de pixels de pedra presentes tanto na referência quanto na arte refinada, com limites de cor e contraste. Vegetação, ossos, fogo, contornos, símbolos, caminhos e posições dos elementos permanecem preservados. A imagem refinada completa não substitui o cenário.

O pilar da colunata inferior direita, antes sem cadastro próprio, recebeu colisão. Continuam os bloqueios de paredes, pilares, braseiros e mesa de oferendas, com a plataforma ao redor transitável. A movimentação em subpassos impede atravessar estruturas com deslocamentos grandes; os espectros mantêm a regra intencional de atravessar pilares, mas respeitam as paredes externas.

## Validação

`test:motion` cobre 941 aproximações válidas, cardinais e diagonais, às estruturas com quatro raios de colisão; caminhada e dash dos nove personagens contra o altar; bordas externas; corredores livres; geração de inimigos; reparo de checkpoint dentro do pilar corrigido; margens transparentes; variação dos quadros; e integridade binária da imagem-base.

Esse teste integra a suíte do CI. O pacote também compara os novos assets com a fonte e o teste do portátil verifica a presença das animações e da correção de colisão. Resultados finais de compilação, publicação e download ficam em [CONTINUIDADE.md](CONTINUIDADE.md).

Os testes são automatizados com perfis isolados e revisão das capturas renderizadas. Não equivalem a uma campanha manual prolongada nem a ensaios em vários computadores. Esta atualização não altera dano, hordas ou progressão.
