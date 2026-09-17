const asar=require('@electron/asar'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const file='dist/win-unpacked/resources/app.asar';assert.ok(fs.existsSync(file),'Build ausente');
const files=asar.listPackage(file);assert.ok(files.some(f=>f.replaceAll('\\','/').endsWith('/src/game.js')));
assert.ok(!files.some(f=>/(^|[/\\])(dev|tests|scripts)([/\\]|$)/.test(f)),'Ferramentas de desenvolvimento no pacote');
for(const f of files.filter(f=>/\.(js|html|cjs)$/.test(f))){const text=asar.extractFile(file,f.replace(/^[/\\]/,'')).toString();assert.ok(!text.includes('rubraDev')&&!text.includes('DESENVOLVIMENTO · SAVE ISOLADO'),'Painel indevido: '+f);}
// Check every shipped source and visual asset, including the public laboratory.
const shipped=fs.readdirSync('src').map(f=>'src/'+f).concat(fs.readdirSync('assets/visual-update').map(f=>'assets/visual-update/'+f),fs.readdirSync('assets/expansion').map(f=>'assets/expansion/'+f),fs.readdirSync('assets/ice').map(f=>'assets/ice/'+f),fs.readdirSync('assets/ornate').map(f=>'assets/ornate/'+f),['index.html','main.js']);
for(const name of shipped)assert.deepEqual(asar.extractFile(file,path.normalize(name)),fs.readFileSync(name),'Pacote difere da fonte atual: '+name);
assert.ok(asar.extractFile(file,'src/laboratory.js').toString().includes('switchProfile'),'Laboratório público ausente');
console.log('ASAR: código e assets presentes; painel, comandos dev e testes ausentes.');
