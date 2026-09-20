// Surface actionable test failures in public check annotations without requiring log access.
const {spawnSync}=require('node:child_process');
for(const name of ['test','test:integration','test:menus','test:profane','test:sanctuary','test:results','test:update','test:ice-polish','test:boot']){
 const result=spawnSync(process.platform==='win32'?'npm.cmd':'npm',['run',name],{encoding:'utf8',shell:process.platform==='win32',timeout:240000,maxBuffer:8*1024*1024});
 const output=(result.stdout||'')+(result.stderr||'');process.stdout.write(output);
 if(result.status!==0){const detail=(result.error?.message||output.slice(-4500)).replace(/%/g,'%25').replace(/\r/g,'%0D').replace(/\n/g,'%0A');console.error(`::error title=${name}::${detail}`);process.exit(result.status||1);}
}
