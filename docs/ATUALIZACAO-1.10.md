# Atualização 1.10 — Santuário e interfaces da expedição

## Física e dificuldade

A arte do Santuário Profano permanece idêntica. As 37 colunas agora bloqueiam o corpo projetado e a base, evitando caminhar sobre o desenho; 12 barreiras adicionais cobrem paredes, portais laterais e bordas externas. Braseiros e altar mantêm suas colisões. Pedras pequenas continuam livres. Aparições atravessam pilares, mas não a alvenaria que limita a arena. A verificação por grade confirma que mais de 99% dos pontos válidos permanecem conectados ao nascimento; as quatro vias centrais e o acesso ao altar foram testados. Saves em pontos agora sólidos usam o reposicionamento seguro existente, preservando vida, ouro e combate.

Monstros comuns do Profano recebem 55% mais vida; Gárgula passa de 20.000 para 34.000; ondas passam de intervalos 1,2/0,8/0,5/0,3 s para 0,95/0,62/0,39/0,25 s. Seraphs entram na terceira onda e atacam a cada 2,1 s. Inquisidor: 320.000 de vida (antes 78.000), dano 4, movimento 58 e intervalo 2,25 s. Alterna anéis, rajadas direcionadas e grupos de zelota/aparição/cão/Seraph; segunda fase reduz a antecipação para 0,85 s e amplia anéis. Permanecem limites de projéteis/inimigos e sinalização de ataque. Vantagens dos personagens comprados não foram removidas.

Ensaio de dano real com seis armas nível 7 (incluindo as duas relíquias), jogador invulnerável e contato perfeito com chefe: Malthor ~30,8 s, Vespera ~23 s. É um teste de resistência ao máximo dano sustentado, não uma partida humana de balanceamento. A sobrevivência com movimento e eventos de dez minutos também foi simulada. O chefe aparece aos 9 minutos como antes.

## Animação e interface

Karn transfere o peso, alterna os pés e ergue o machado; Malthor dá passos laterais e gesticula com o braço do chicote; Vespera desliza e oscila o braço do rosário. Ritmos, amplitudes e efeitos são distintos. São animações articuladas a partir dos pixels originais, não novas folhas direcionais. Movimento maior no menu e pernas articuladas durante deslocamento. Opção de partículas desativada mantém a prévia estática, conforme comportamento anterior.

O menu de personagens possui lista com rolagem independente e painel de informações persistente: lateral em telas largas, abaixo da lista em telas estreitas. Ações de voltar/escolher mapa ficam fora da rolagem dos cartões. Compra continua no painel de informações.

Evolução e pausa usam a moldura dourada e fundo do conjunto de menus. Evolução exibe ícones maiores, descrição, dano por acerto/pulso com bônus do caçador, comparação do dano anterior/novo e intervalo da arma. Pausa apresenta mapa, caçador, tempo, derrotados e ouro obtido. Mantidas ações de continuar, salvar e encerrar. Removidas setas textuais duplicadas de Controles, personagens, mapas e pausa. Somente botões vermelhos ornamentados usam a seta dourada decorativa.

## Verificação

36 testes de regras; integração 62; menus 25; Profano 11; refinamento 12; resultados 20; inicialização 13. Nova suíte `test:update` possui 16 verificações de pontos de colisão, conectividade, painel persistente e menus em 1360×900, 960×640 e 420×850, dano mostrado, setas e ensaio do chefe. Capturas dos menus e mapa de colisões inspecionados. `test:portable` foi ampliado para clicar na pausa e nas escolhas de evolução no executável real. Build e publicação seguem registrados em CONTINUIDADE.md.
