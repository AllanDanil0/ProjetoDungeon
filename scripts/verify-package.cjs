const asar=require('@electron/asar'),assert=require('node:assert/strict'),fs=require('node:fs');
const file='dist/win-unpacked/resources/app.asar';assert.ok(fs.existsSync(file),'Build ausente');
const files=asar.listPackage(file);assert.ok(files.some(f=>f.replaceAll('\\','/').endsWith('/src/game.js')));
assert.ok(!files.some(f=>/(^|[/\\])(dev|tests|scripts)([/\\]|$)/.test(f)),'Ferramentas de desenvolvimento no pacote');
for(const f of files.filter(f=>/\.(js|html|cjs)$/.test(f))){const text=asar.extractFile(file,f.replace(/^[/\\]/,'')).toString();assert.ok(!text.includes('rubraDev')&&!text.includes('DESENVOLVIMENTO · SAVE ISOLADO'),'Painel indevido: '+f);}
for(const name of ['src/game.js','src/core.js','src/config.js','index.html','main.js'])assert.deepEqual(asar.extractFile(file,name),fs.readFileSync(name),'Pacote difere da fonte atual: '+name);
console.log('ASAR: código e assets presentes; painel, comandos dev e testes ausentes.');
