# RUBRA para Android

A edição Android usa o mesmo jogo offline da versão 1.14 em uma WebView local, sem servidor, conta ou permissões de internet, arquivos, câmera e microfone. Requer Android 8 ou superior e Android System WebView atualizado. Funciona na horizontal com joystick, esquiva e pausa por toque. O botão Voltar pausa/retoma a partida ou retorna dos menus; ao trocar de aplicativo, a partida pausa e grava checkpoint. Campanha e Laboratório mantêm perfis separados. O progresso do Windows não é transferido automaticamente.

## Compilação e assinatura

`android/` contém o shell Java, Gradle e testes no emulador. O build copia somente index.html, src e assets; ferramentas dev e saves nunca entram no APK. Java 17, Gradle 8.11.1, AGP 8.9.2, SDK 35. Executar `gradle -p android assembleRelease`. O workflow Android testa a variante de testes no emulador antes de oferecer o artefato para assinatura. O release não permite depuração da WebView.

A chave de distribuição permanece somente na pasta local ignorada `.android-signing/`, junto da senha em arquivo, e não é enviada ao repositório nem ao GitHub Actions. É necessário preservar ambos em backup privado: perder a chave impede instalar atualizações sobre o aplicativo existente. Nunca substituir essa chave em uma atualização.

Após baixar o artefato validado, usar apksigner com essa chave, verificar a assinatura e publicar somente RUBRA.apk e seu SHA256. Os APKs sem assinatura e ferramentas de assinatura não são downloads para jogadores. Commits `[android]` não republicam o Windows. O link Windows permanece apontando à última compilação Windows validada; o link Android aponta à edição Android separada.

## Limites de validação

Testes de layout usam janela horizontal de celular. A instrumentação Android cobre carregamento offline, navegação com toque, joystick, esquiva, pausa, salvar/retomar, volta do aplicativo, reabertura, músicas e bestiário. Um emulador não comprova desempenho em todos os aparelhos; recomenda-se conferir aparelhos físicos antes de distribuir em loja. Não há versão iOS neste APK.

## Publicação validada

Release android-1.14.0, publicado em 29/09/2026. Suíte de instrumentação aprovada no Actions 36373793354. APK assinado com v2/v3, 222 arquivos do jogo comparados à fonte. Download público instalado e aberto offline no emulador Android 15 no Actions 36517474962, com navegação por toques reais. SHA256: 89DFA8A308AFCDAECCE1BA7215A89B0BB157D0869487AA8A881EEF6D2180B786. Testes em aparelho físico ainda não realizados.
