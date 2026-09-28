(function(root){
 'use strict';
 const C=root.RubraConfig||(typeof require==='function'?require('./config.js'):null);
 const num=v=>Number.isFinite(v)?Math.max(0,Math.min(1e12,v)):0;
 function report(raw={}){const weapons={};for(const [id,v]of Object.entries(raw?.weapons||{}))if(C.weapons[id]||id==='ability')weapons[id]={damage:num(v?.damage),kills:Math.floor(num(v?.kills))};return {damageTaken:num(raw?.damageTaken),weapons,history:(Array.isArray(raw?.history)?raw.history:[]).filter(v=>C.weapons[v?.id]).slice(-100).map(v=>({id:v.id,level:Math.max(1,Math.min(7,Math.floor(num(v.level)))),at:Math.floor(num(v.at))})),events:(Array.isArray(raw?.events)?raw.events:[]).slice(-3).map(v=>({type:['altar','crystals','marked'].includes(v?.type)?v.type:'marked',won:v?.won===true,gold:Math.floor(num(v?.gold)),at:Math.floor(num(v?.at))}))};}
 function bestiary(raw={}){const out={};for(const [id,v]of Object.entries(raw||{}))if(C.enemies[id]&&!C.enemies[id].object||id.startsWith('boss:')&&C.maps[id.slice(5)])out[id]=Math.floor(num(v));return out;}
 function damage(r,id,amount,killed){id=C.weapons[id]?id:'ability';const w=r.weapons[id]||(r.weapons[id]={damage:0,kills:0});w.damage+=num(amount);if(killed)w.kills++;}
 function profaneStats(w,id,map){if(map!=='profane')return w;const p=C.profane.balance[id];if(p){w.damage*=p.damage;w.radius*=p.radius;w.interval=Math.max(w.interval,p.interval);if(p.duration)w.duration=p.duration;if(p.tick)w.tick=p.tick;}return w;}
 const api={report,bestiary,damage,profaneStats};root.RubraChronicleCore=api;if(typeof module!=='undefined')module.exports=api;
})(globalThis);
