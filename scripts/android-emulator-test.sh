#!/usr/bin/env bash
set +e
adb shell settings put secure immersive_mode_confirmations confirmed
gradle -p android connectedDebugAndroidTest
result=$?
mkdir -p android-diagnostics
adb exec-out screencap -p > android-diagnostics/screen.png
adb shell dumpsys window > android-diagnostics/window.txt
adb logcat -d > android-diagnostics/logcat.txt
exit "$result"
