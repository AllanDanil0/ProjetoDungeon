# Correção 1.9.1 — inicialização com campanha existente

## Causa reproduzida

O executável público `windows-12-1` foi baixado e seu SHA256 conferido: `05432C0DF3474DFCE8801C23567EAED512E62A91F503D27916F486D7DB27E27F`. A execução real registrou `TypeError` em `RubraProfane.buildGround`, chamado por `menu()` no final de `game.js`. O menu usava o mapa selecionado no save antes de executar `loadAssets()`. Com `profane` selecionado, `drawImage(assetImages.profaneMap, ...)` recebia `undefined`; a exceção impedia a chamada seguinte a `loadAssets`. Evidência: `assetReady=false`, `characterFrames={}`, `assetImages={}`, Jogar/Arsenal desabilitados.

Os testes anteriores passavam com campanha inicial no tutorial ou trocavam o mapa depois de carregar imagens. Testar o HTML do ASAR numa janela de teste não validava o ciclo real de fechar/reabrir o portátil com campanha no Santuário. A afirmação anterior de que não havia pendências de verificação foi excessiva.

## Correção

- Construção e renderização do mundo aguardam `assetReady`.
- Carregamento completo de imagens e preparação de sprites ficam no mesmo tratamento de erro.
- Falha identifica o arquivo, mantém ações dependentes desabilitadas e oferece nova tentativa.
- Retomar e jogar no laboratório também aguardam as imagens.
- A localização normal do save permanece `%APPDATA%/RUBRA`. O switch padrão `--user-data-dir` permite testes isolados do executável sem acessar saves reais.

## Verificação obrigatória

`test:boot` cobre reabertura de campanha nos quatro mapas, retratos, Arsenal, checkpoint, laboratório, imagem indisponível e recuperação (13 verificações). `test:portable` abre o EXE distribuível com perfil exclusivo, fecha e reabre uma campanha no Profano, clica fisicamente em Jogar/Arsenal/Laboratório, verifica retratos, inicia combate e testa derrota/reinício (8 verificações). A publicação no GitHub agora depende do teste do executável depois da geração do build, além dos testes anteriores.

Nenhum reset ou migração destrutiva de save é necessário. As alterações visuais, de combate, animações e telas finais da 1.9 foram preservadas. A verificação não afirma ausência universal de bugs: documenta a causa observada e os fluxos efetivamente exercitados.
