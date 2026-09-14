const fs=require('node:fs'),cp=require('node:child_process');
for(const dir of ['src','dev','tests','scripts'])for(const f of fs.readdirSync(dir))if(/\.(js|cjs)$/.test(f))cp.execFileSync(process.execPath,['--check',dir+'/'+f],{stdio:'inherit'});
cp.execFileSync(process.execPath,['--check','main.js'],{stdio:'inherit'});console.log('Sintaxe JavaScript válida.');
