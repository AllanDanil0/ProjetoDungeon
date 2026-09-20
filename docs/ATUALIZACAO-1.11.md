# Versão 1.11.0 — gelo, efeitos e interface

- Colisões do gelo medidas sobre a referência de 1600 × 984: corpos dos monumentos, arco do portal, troncos e espadas fincadas. A cruz de caminhos permanece conectada. Checkpoints dentro de estruturas são reposicionados sem apagar progresso.
- Monstros do gelo reaproveitam os quadros fornecidos, com braços, pernas e mantos articulados. Skarn mantém sua aparência e recebe movimento corporal e gesto durante a preparação dos ataques. Não foram inventadas folhas direcionais de criaturas.
- Três fadas originais separadas do chão, com asas e flutuação local. A camada é desenhada acima dos personagens, inclusive com partículas decorativas desligadas.
- Prisma da Aurora com nova arte transparente, prata trabalhada e cristal boreal. Feixe com núcleo, filamentos de três cores, partículas e anel terminal. Dano e alcance permanecem regidos pelas estatísticas de combate.
- Doze braseiros com oito quadros de fogo, base ancorada na abertura do recipiente e partículas opcionais. Removida a duplicação entre fogo pintado e animado.
- HUD de vitalidade, onda, relógio/pausa, experiência, arsenal e esquiva com molduras douradas e fundo roxo, usando os ornamentos existentes.
- Arena ocupa a janela; aplicativo inicia em tela cheia. F11 retorna à janela. A proporção 16:9 é preservada sem esticar personagens; telas de outra proporção podem apresentar faixas.
- Ícone de Rubra em pixel art, com seis tamanhos ICO (16–256 px), aplicado à janela e aos recursos do executável. README e versão do pacote atualizados.

Os mapas originais foram preservados. Apenas pequenos retângulos em torno das fadas e das chamas recebem trechos das imagens limpas. Novos arquivos: `assets/ice/ground-clean.png`, `assets/ice/prism-aurora.png`, `assets/profane/braziers-unlit.png`, `assets/profane/flames-atlas.png`, `assets/branding/rubra-icon.png` e `rubra.ico`. Arte gerada com a ferramenta integrada ImageGen; prompts exatos em [PROMPTS-1.11.json](PROMPTS-1.11.json). O importador de Canvas remove o fundo quadriculado do atlas sem apagar o núcleo branco das chamas.

## Verificação

Suíte `test:ice-polish`: colisões reportadas, continuidade de caminhos, esquiva, recuperação de posição, transparência, movimento de todas as criaturas, arena em três resoluções e ícone. Capturas em `test-output/ice-polish` (não distribuídas). Testes de regressão incluem regras, integração, menus, Santuário, telas finais e inicialização. O teste do portátil inclui cliques reais, reabertura de campanha isolada, entrada no gelo e estado de tela cheia nativo. Resultados finais de build e publicação são registrados em [CONTINUIDADE.md](CONTINUIDADE.md).

Limites: verificação automatizada e inspeção de capturas; não substituem uma partida humana completa. Animações articulam as imagens existentes. Saves reais não são usados nos testes.
