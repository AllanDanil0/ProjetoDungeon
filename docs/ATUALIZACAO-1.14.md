# RUBRA 1.14 — Crônicas da noite

## Objetivos opcionais

Necrópole, Inverno e Profano recebem três oportunidades, aos 22%, 50% e 74% do tempo até o guardião. A ordem é embaralhada uma vez por expedição e preservada no checkpoint. O tutorial não recebe eventos. Não há eventos simultâneos; o surgimento aguarda espaço e uma posição acessível próxima ao caçador. O aparecimento do chefe encerra um objetivo pendente.

- **Vigília do altar:** acumular 22 segundos dentro do círculo sem inimigos. Há 50 segundos disponíveis; invasores reduzem a integridade. O progresso é conservado ao sair, mas o tempo continua correndo.
- **Cristais de corrupção:** destruir os cristais em 45 segundos. Eles reduzem em 15% o dano recebido por inimigos próximos, sem acumular a proteção. Não concedem eliminações artificiais nem dano no relatório.
- **Caçada ao marcado:** derrotar a criatura identificada pelo selo dourado em 45 segundos. Ela tem 50% mais vida. Uma seta próxima ao caçador indica o objetivo distante.

Recompensa: 35 de ouro (70 no Profano) e 45 + 8 por nível de experiência. O prêmio é concedido uma única vez; falhar não desconta ouro. Pausa e evolução congelam o relógio. Salvar e retomar preserva objetivo, inimigos, integridade e progresso. Checkpoints antigos não recebem objetivos retroativos.

## Relatório da expedição

O botão **Relatório da expedição**, na vitória, derrota ou encerramento, mostra tempo, eliminações, dano recebido, dano efetivo por arma, eliminações por arma, níveis finais, sequência de melhorias e resultados dos objetivos. Dano excedente à vida do alvo não é contabilizado. Habilidades do personagem têm categoria própria. O golpe que derrota o chefe entra no relatório antes da consolidação.

Registros acompanham os checkpoints e o último resultado, separados por campanha/Laboratório. Saves antigos não têm estatísticas históricas reconstruídas: a medição começa nesta versão. Níveis são melhorias normais; não foram introduzidas evoluções especiais de armas.

## Bestiário e relíquias

Acesso em **Opções** e **Arsenal**. A primeira eliminação revela arte e comportamento da criatura. Dez eliminações revelam a história de sua região. Guardiões revelam o registro após uma vitória e completam a história após três. As contagens começam nesta versão, sem estimar vitórias antigas. O Laboratório possui sua própria coleção.

A aba Relíquias acompanha os desbloqueios já existentes da Lança do Túmulo, Lâmina do Zero Absoluto e Édito do Inquisidor. Não exige recomprar ou derrotar novamente um chefe para recuperar uma arma previamente obtida.

## Profano

Alterações de armas são locais ao Profano; o Inverno e os outros mapas mantêm seus valores anteriores. O Arsenal informa os valores específicos e a escolha de nível usa os valores reais com o bônus do caçador.

- Uma área persistente ativa por arma: um novo lançamento substitui a área anterior da mesma arma.
- Zero Absoluto: dano ×0,72, raio ×0,82, intervalo mínimo 3,5 s, duração 2,4 s e pulsos a cada 0,65 s.
- Édito: dano ×0,68, raio ×0,84, intervalo mínimo 3,7 s, duração 2,6 s e pulsos a cada 0,65 s.
- Turíbulo: raio ×0,90 e intervalo mínimo 3,2 s.
- Rosário: dano ×0,82, intervalo mínimo 0,48 s e abertura interna de 45% do alcance. As lâminas atingem a faixa orbital; encostar no caçador deixa de garantir dano orbital constante.
- Tropas físicas preparam investidas com aviso de pelo menos 0,85 s, respeitando paredes. Após 1,5 s de lentidão contínua, ganham 1 s de recuperação. A redução de velocidade tem limite de 35%.
- Gárgula persegue o jogador, prepara investidas e impactos circulares próximos com aviso de 1,1 s. Não recua como atirador; redução de velocidade limitada a 15%, como o chefe do Profano.

Os limites de população e a progressão das hordas da 1.13 permanecem. As mudanças devem impedir a proteção quase permanente de combinações de áreas, preservando o poder das relíquias. Simulações não substituem o retorno de jogadores humanos.

Comparação controlada com arsenal máximo: a gárgula durou 6,8 → 15,6 s contra Malthor e 5,3 → 12,4 s contra Vespera. O pico de áreas persistentes caiu de 6/7 para 3. Contra dezoito tropas físicas, o tempo passou de aproximadamente 2,2 s para 4 s e surgiram investidas antes da eliminação do grupo. O caçador ficou parado e sua vida foi restaurada a cada passo para medir oportunidades de dano, sem encerrar o experimento: os totais não representam uma partida vencida normalmente. O teste de contato máximo com o Inquisidor chegou a 96,3/66,1 s, respectivamente, com invulnerabilidade de teste. Não houve uma campanha humana completa para estimar taxa de vitória.

## Salão de músicas

Em **Opções → Salão de músicas**, as onze faixas de menu existentes exibem nome, origem, duração e andamento. **Tocar agora** reproduz a escolhida nos menus. Ao terminar, ou ao clicar em **Voltar à seleção automática**, retornam as playlists próprias de cada menu, com suas posições preservadas. Iniciar uma expedição encerra a escolha manual e mantém a trilha do mapa/chefe. Nenhuma música nova foi adicionada nesta versão.

## Verificação

`tests/chronicles.cjs`: migração, dano efetivo, idempotência, eventos, retomada, tutorial, lentidão/investidas, coleção, seleção musical e layout em três resoluções. `tests/profane-balance.cjs`: comparação com o pacote 1.13, arsenal máximo e confrontos controlados. O teste do portátil também abre as novas telas com cliques. Resultados finais, limitações e publicação ficam em CONTINUIDADE.md.
