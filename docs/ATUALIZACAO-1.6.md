# Atualização 1.6 — interfaces dos menus

Os seis menus receberam o padrão das referências fornecidas: fundos de castelo e lua roxa, painéis escuros, molduras douradas com rubis, botões vermelhos, ornamentos e indicadores compartilhados de ouro e campanha. Textos, preços, seleção e ações continuam sendo controles reais. Em telas estreitas os cartões se reorganizam e o conteúdo rola sem ocultar botões.

Personagens e efeitos de combate mantêm os mesmos assets. Aelthir é a única alteração de retrato: pose frontal estável com cristais ascendentes e círculo glacial, respeitando a opção de partículas. Nenhuma mudança de atributos, armas, progressão ou chaves de save. As prévias dos mapas usam o cenário real renderizado em Canvas, não as ilustrações dos mockups.

## Arquivos

- `src/ornate.css`: apresentação responsiva dos seis menus; substitui a inclusão de gothic.css.
- `src/menu-art.js`: prévias dos cenários em cache, com restauração do estado de renderização.
- `assets/ornate/title.png`, `backdrop.png`, `gargoyle.png`: imagens geradas a partir das referências do usuário, sem personagens jogáveis novos.
- `assets/ornate/frame.svg`, `primary.svg`, `bat.svg`: ornamentos vetoriais locais.
- `tests/menus.cjs`: seis telas em 1360×900, 960×640 e 420×850; centralização, ausência de overflow horizontal, hit test dos controles e estabilidade/animação opcional de Aelthir. `--packaged` usa o ASAR.

## Prompts dos assets

Ferramenta image_gen, edições das referências do usuário; arquivos originais em Downloads preservados. Prompts efetivos:

### title.png

Referência: Gemini_Generated_Image_p6krw7p6krw7p6kr.jpg

Edit this exact game title artwork into a clean background asset. Preserve the exact title logo THE NIGHT IS YOURS ARCADE EDITION, purple moon, castle, bats, central hero, monsters and pixel-art style/composition. Remove ALL UI: CAMPANHA and OURO boxes at top, bottom menu panel and all its buttons/text and gargoyles, bottom corner icons and credit. Fill removed areas naturally with existing sky or graveyard path/grass; keep the upper logo and central hero unchanged. No added text. 16:9 landscape. This is the background for live HTML UI that will be drawn over it.

### backdrop.png

Referência: Gemini_Generated_Image_v65txmv65txmv65t.jpg

Edit reference into clean background-only game menu art. Keep same purple moonlit castle, bats, dark graveyard, stone path, small background monsters and pixel-art visual. Remove ALL words, ALL gold framing, ALL buttons, panels, sliders, badges, corner emblems and any interface. Reconstruct central moon/castle/path seamlessly where menu used to be. Dark violet readable backdrop to place real interface on later. No title/logo, no text, no interface or frame. 16:9 landscape.

### gargoyle.png

Referência: Gemini_Generated_Image_g0ewrwg0ewrwg0ew.jpg

Use case stylized-concept, transparent game UI ornament. Extract/recreate ONLY the LEFT stone gargoyle perched on its small pedestal from reference, facing toward right/inward, wings curved upward, hands resting forward. Match its weathered grey-gold pixel-art gargoyle design precisely. One isolated gargoyle with pedestal, fully contained with transparent margin, genuine alpha transparent PNG background, no checkerboard, no lettering, no menus, no other objects. Tall composition, crisp pixel-art suitable 100 pixels tall.

## Validação

Resultados finais registrados em CONTINUIDADE.md. As capturas são de Electron; não substituem teste em aparelho físico ou outro computador. A arte de referência guia o estilo, enquanto personagens, prévias e dados exibidos vêm do próprio jogo.
