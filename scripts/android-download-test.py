import subprocess, time, pathlib, re, xml.etree.ElementTree as ET
out=pathlib.Path('test-output/android-public');out.mkdir(parents=True,exist_ok=True)
def adb(*args): return subprocess.check_output(['adb',*args],text=True)
def nodes():
 adb('shell','uiautomator','dump','/sdcard/window.xml')
 xml=adb('shell','cat','/sdcard/window.xml');(out/'window.xml').write_text(xml)
 return list(ET.fromstring(xml).iter('node'))
def click(text):
 for node in nodes():
  if text.lower() in (node.get('text','')+' '+node.get('content-desc','')).lower() and node.get('enabled')=='true':
   x1,y1,x2,y2=map(int,re.findall(r'\d+',node.get('bounds')));adb('shell','input','tap',str((x1+x2)//2),str((y1+y2)//2));return
 raise AssertionError('Missing Android control: '+text)
adb('shell','settings','put','secure','immersive_mode_confirmations','confirmed')
adb('install','-r','RUBRA.apk')
adb('shell','svc','wifi','disable');adb('shell','svc','data','disable')
adb('logcat','-c');adb('shell','am','start','-W','-n','local.rubra.game/.MainActivity')
for attempt in range(30):
 time.sleep(2)
 if any('JOGAR' in n.get('text','').upper() and n.get('enabled')=='true' for n in nodes()): break
else: raise AssertionError('Public APK did not load offline')
click('JOGAR');time.sleep(2);click('Escolher mapa');time.sleep(2)
assert any('Bosque' in n.get('text','') for n in nodes()), 'Map menu did not open'
with (out/'maps.png').open('wb') as f: subprocess.run(['adb','exec-out','screencap','-p'],stdout=f,check=True)
logs=adb('logcat','-d');(out/'logcat.txt').write_text(logs)
assert 'FATAL EXCEPTION' not in logs, 'Android crash'
print('Public signed APK installs, loads offline and navigates by real taps.')
