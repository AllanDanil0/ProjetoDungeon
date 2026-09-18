# 1.9 — Estruturas, progressão e animação

A imagem do Santuário Profano permanece byte a byte igual à versão 1.8 (SHA256 `0a25f041e063cc3032148bdb3bbef2dd34a67e7617ef2d6b6c6d8dc7632cc651`). Os doze fogos recebem sobreposição animada extraída da própria arte: cintilação, variação da chama e pequenas fagulhas. Desativar partículas remove fagulhas e luz adicional, mantendo o movimento do fogo.

As bases de 37 pilares, 12 braseiros e o altar central têm colisores retangulares ajustados às coordenadas da imagem. A plataforma do altar e pedras soltas continuam transitáveis. Movimento subdividido evita atravessar estruturas durante a esquiva, permitindo deslizar pelos lados; projéteis também verificam o trajeto inteiro. Aparições mantêm sua capacidade de atravessar obstáculos, respeitando os limites do mundo. Checkpoints sobre novos obstáculos são reposicionados sem perder vida ou ouro; mini-chefes vivos são preservados.

O dano por impacto das armas normais cresce a cada capítulo, comparando o mesmo nível. Cadência, área, alcance, perfuração e controle continuam distinguindo suas funções. Relíquias de chefes são exceções à progressão entre capítulos. O Santuário recebeu monstros mais resistentes, ataques mais perigosos, ondas mais frequentes e Inquisidor com 78.000 de vida. Necrópole e gelo também foram ajustados para manter a sequência de progressão; o tutorial original foi preservado.

Os personagens pagos progridem em dano, cadência, vida, velocidade e esquiva conforme o preço, sem cobrar novamente por compras existentes. Karn mantém seu papel de personagem gratuito lento com golpes pesados; Malthor conserva o alcance acumulado e Vespera a maior cadência.

A Lâmina do Zero Absoluto recebeu arte detalhada com transparência real, materiais glaciais, metal ornamentado e runas. Seu efeito tem círculos facetados, fissuras, cristais, iluminação e a própria espada. Karn movimenta sua guarda pesada; Malthor anima o braço e energia do chicote; Vespera possui contas e cruzes orbitais. As poses fornecidas continuam sendo a base, com transformações por partes, sem substituir a identidade dos personagens por novas folhas de sprites.

Testes específicos em `tests/sanctuary.cjs` cobrem integridade da imagem, colisões, travessia rápida, projéteis, recuperação de checkpoints, progressão, transparência e animação. Capturas de inspeção são geradas em `test-output/sanctuary/` (não distribuídas). O teste de dez minutos do capítulo usa invulnerabilidade para validar eventos, limites e estabilidade; não substitui avaliação humana de dificuldade.

Pedido adicional: a marca em losango dos botões vermelhos ornamentados foi substituída por uma seta dourada desenhada em SVG, seguindo a referência. Botões secundários e controles comuns mantêm seus visuais.

Telas finais: vitória e derrota agora usam o mesmo fundo, molduras e tipografia dos menus. Vitória exibe o chefe vencido, caçador, estatísticas e recompensa real do capítulo. Derrota mostra o arsenal e os níveis usados, sem anunciar recompensas de chefe. Ouro guardado, nova tentativa, escolha de destino, menu principal e navegação por teclado são preservados. A saída voluntária tem texto próprio. Layouts verificados em 1360×900, 960×640 e 420×850; telas estreitas permitem rolagem vertical.

## Revisão consolidada dos pedidos

| Pedido | Implementação / verificação |
| --- | --- |
| Manter aparência do mapa | SHA256 idêntico ao original 1.8 |
| Animar fogos | 12 sobreposições extraídas da arte, teste em dois instantes |
| Colisão de construções | 37 pilares, 12 braseiros e altar; pedras soltas livres |
| Física coerente | Deslizamento, passos menores no dash, trajeto de projéteis e recuperação de checkpoint |
| Dificuldade crescente | Inimigos/chefes e frequência das ondas ajustados por capítulo |
| Armas e heróis mais fortes | Dano normal crescente no mesmo nível; estatísticas pagas progressivas |
| Zero Absoluto detalhada | PNG com alpha e nova composição de efeito, inspecionados sobre fundo escuro |
| Animações dos personagens | Guarda de Karn, energia do chicote de Malthor, rosário de Vespera |
| Seta nos botões | SVG dourado apenas nos botões primários vermelhos ornamentados |
| Tela de vitória | Chefe correto, recompensa do mapa, caçador, ouro e estatísticas |
| Tela de morte | Arsenal real e seus níveis, ouro guardado, sem falsa recompensa |
| Revisar interrupções | Alterações anteriores preservadas; novas telas verificadas por 20 cenários |
| Publicar | Autorização explícita recebida na conversa após bloqueio inicial do envio remoto |
