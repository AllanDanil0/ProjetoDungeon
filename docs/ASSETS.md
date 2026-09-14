# Inspeção dos assets enviados

O inventário de todos os PNGs está em asset-inventory.json: caminho original relativo, largura, altura e colorType do PNG. Os PNGs selecionados usam RGBA (tipo 6). Os arquivos originais foram copiados para assets/ sem modificar os fornecidos em Downloads.

| Fonte | Dimensão | Uso / interpretação |
|---|---|---|
| hero-portrait.jpeg | 1024×1024 | Referência de aparência; JPEG com quadriculado opaco, não transparência |
| hero-poses.jpeg | 1024×1024 | Composição 6 colunas × 4 linhas, poses e direções misturadas; não uma animação linear pronta |
| mapa1/stone-path.png | 1198×748 | Caminho recortado com alpha; componente da arena, não mapa completo/tileset nem máscara de colisão |
| mapa1/twisted-tree/twisted-tree-1.png | 157×277 | Árvore estática de cenário |
| mapa1/stone-shrine/stone-shrine-1.png | 80×115 | Monumento estático com colisão separada |
| mobs_mapa1/pixel-art-undead-creature/pixel-art-undead-creature-1.png | 195×184 | Inimigo estático; reutilizado para resistente e elite, com escala e anel de cor |
| mobs_mapa1/pixel-art-tentacle-monsters/pixel-art-tentacle-monsters-1.png | 200×188 | Rastejante / conjurador; variantes temporárias com tamanhos e sinais distintos |
| mobs_mapa1/pixel-art-dragon/pixel-art-dragon-1.png | 196×179 | Boss Morthar; sprite fornecido, sem frames inventados |

## Recorte do personagem

O importador em Canvas remove somente o fundo neutro conectado às bordas de cada célula. Depois recorta a área opaca, usa escala comum e ancora os pés na linha 60 de telas 64×64. Não cria poses com IA.

Mapa explícito (índices humanos): direita usa linha 2, colunas 1 a 5; esquerda usa espelhamento horizontal desses quadros; costas usa linha 2, coluna 6; frente usa linha 3, coluna 1. Frente e costas permanecem estáticas durante movimento, pois não há ciclos compatíveis nesses sentidos. Os outros quadros são preservados na imagem original, mas não foram misturados na animação.

As imagens têm compressão JPEG e diferenças de desenho entre poses. O alinhamento dos pés elimina variação do ponto inferior, mas não transforma a referência em animação artística desenhada quadro a quadro. Uma spritesheet original com alpha e ciclos completos seria uma futura melhoria de qualidade, não é requisito para jogar.

## Provisórios identificados

- Efeitos das quatro armas novas: formas, linhas e cores geradas pelo próprio Canvas, arte provisória.
- Resistente, conjurador e elite: variantes temporárias dos sprites fornecidos; sem novos sprites inventados. Anéis, tamanho e comportamento distinguem suas funções.
- Solo entre os caminhos: textura procedural complementar, já que não foi enviado um fundo completo.
- Vhalkar: sprite original preservado com ornamentação procedural de galhadas e luz do bosque.

Os arquivos restantes continuam disponíveis em assets/ para expansões. Numeração de arquivos não foi interpretada automaticamente como animação.
