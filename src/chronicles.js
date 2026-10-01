'use strict';
const RubraChronicles=(()=>{
 const names={altar:'Vigília do altar',crystals:'Cristais de corrupção',marked:'Caçada ao marcado'};
 function begin(resume){run.report=RubraChronicleCore.report(run.report);if(!resume)run.report.history=run.weapons.map(w=>({...w,at:0}));if(!run.eventPlan){run.eventPlan=['altar','crystals','marked'];for(let i=2;i>0;i--){const j=Math.floor(Math.random()*(i+1));[run.eventPlan[i],run.eventPlan[j]]=[run.eventPlan[j],run.eventPlan[i]];}}run.eventIndex=Number.isInteger(run.eventIndex)?Math.max(0,Math.min(3,run.eventIndex)):0;
  // Old checkpoints skip past objectives; no retroactive rewards or surprise event stack.
  if(resume&&!run.encounterEvent)while(run.eventIndex<3&&elapsed>=map.bossAt*C.events.fractions[run.eventIndex])run.eventIndex++;
 }
 function nearPoint(radius=26){for(let i=0;i<30;i++){const a=Math.random()*TAU,d=130+Math.random()*95,p={x:player.x+Math.cos(a)*d,y:player.y+Math.sin(a)*d};if(K.validPoint(p,map,radius)&&K.clearSegment(player,p,map,player.r))return p;}return null;}
 function start(type){const p=nearPoint();if(!p)return false;const index=run.eventIndex,ev={type,index,...p,deadline:elapsed+(type==='altar'?C.events.altarDuration:C.events.duration),progress:0,hp:100,done:false};
  if(type==='crystals'){const positions=[p];for(let i=1;i<3;i++){const q=K.nearestPoint({x:p.x+Math.cos(i*TAU/3)*60,y:p.y+Math.sin(i*TAU/3)*60},map,18);if(K.validPoint(q,map,18)&&positions.every(v=>dist(q,v)>34))positions.push(q);}if(enemies.length+positions.length>K.enemyLimit(run.map))return false;positions.forEach(q=>{const e=newEnemy('eventCrystal',q);e.eventRole='crystal:'+index;e.hp=e.maxHp=220+run.level*60;enemies.push(e);});
  }else if(type==='marked'){if(enemies.length>=K.enemyLimit(run.map))return false;const pool=map.waves?K.profaneWave(elapsed).pool:map.enemies,key=pool.find(k=>C.enemies[k].behavior==='chase')||pool[0],e=newEnemy(key,p);e.hp=e.maxHp*=1.5;e.eventRole='marked:'+index;enemies.push(e);}
  run.encounterEvent=ev;toast(names[type]+' · objetivo opcional',4);snapshot();return true;
 }
 function finish(won){const ev=run.encounterEvent;if(!ev||ev.done)return;ev.done=true;const gold=won?C.events.gold*(run.map==='profane'?2:1):0;if(won){run.gold+=gold;run.xp+=C.events.xp+run.level*8;}run.report.events.push({type:ev.type,won,gold,at:elapsed});enemies=enemies.filter(e=>!e.cfg.object||e.eventRole!=='crystal:'+ev.index);run.eventIndex++;run.encounterEvent=null;toast(won?'Objetivo concluído · +'+gold+' ouro e experiência':'Objetivo encerrado · sem penalidade adicional',4);snapshot();}
 function update(dt){if(run.map==='tutorial')return;const ev=run.encounterEvent;if(ev){if(run.bossSpawned){finish(false);return;}if(ev.type==='altar'){const nearby=alive().filter(e=>!e.cfg.object&&dist(e,ev)<C.events.altarRadius);if(nearby.length)ev.hp=Math.max(0,ev.hp-dt*Math.min(12,nearby.length*2));if(dist(player,ev)<C.events.altarRadius&&nearby.length===0)ev.progress+=dt;if(ev.progress>=C.events.altarGoal){finish(true);return;}if(ev.hp<=0){finish(false);return;}}
   else if(!alive().some(e=>e.eventRole===(ev.type==='marked'?'marked:':'crystal:')+ev.index)){finish(true);return;}
   if(elapsed>=ev.deadline)finish(false);
  }else if(!run.bossSpawned&&run.eventIndex<3&&elapsed>=map.bossAt*C.events.fractions[run.eventIndex])start(run.eventPlan[run.eventIndex]);
 }
 function incoming(e,amount){if(run.map!=='tutorial'&&!e.cfg.object&&run.encounterEvent?.type==='crystals'&&alive().some(c=>c.cfg.object&&dist(c,e)<210))amount*=.85;return amount;}
 function melee(e,dt){if(run.map!=='profane'||e.type==='boss'||e.cfg.behavior!=='chase')return;e.resolve=Math.max(0,(e.resolve||0)-dt);if(e.slowTimer>0&&!e.resolve){e.slowExposure=(e.slowExposure||0)+dt;if(e.slowExposure>=1.5){e.resolve=1;e.slowExposure=0;e.slowTimer=0;e.slowFactor=1;}}else if(!e.resolve)e.slowExposure=0;
  e.meleeClock=(e.meleeClock??(2+(e.id%5)*.6))-dt;if(e.telegraph||e.charge||e.meleeClock>0)return;const d=dist(e,player);if(d>340)return;e.meleeClock=e.cfg.miniBoss?4.8:5.5+(e.id%4)*.5;
  if(e.cfg.miniBoss&&d<145){e.telegraph={kind:'slam',tx:e.x,ty:e.y,radius:95,time:1.1};return;}
  if(!K.clearSegment(e,player,map,e.r))return;e.telegraph={kind:'lunge',tx:player.x,ty:player.y,time:e.cfg.miniBoss?1:.85};
 }
 function release(e,t){if(t.kind==='slam'){effect({kind:'area',x:t.tx,y:t.ty,r:t.radius,color:'#e9b886',life:.3,max:.3,hit:true});if(dist(player,{x:t.tx,y:t.ty})<t.radius+player.r)damagePlayer(e.cfg.damage);return true;}if(t.kind==='lunge'){e.charge={angle:Math.atan2(t.ty-e.y,t.tx-e.x),time:e.cfg.miniBoss?.7:.48,speed:e.cfg.miniBoss?340:260};return true;}return false;}
 function crystal(q,x,y,t){RubraEventArt.crystal(q,x,y,t,save.options.particles!==false);}
 function draw(q){const hud=document.getElementById('eventHud');if(!hud)return;const ev=run?.encounterEvent,visible=state==='playing'&&!!ev;hud.classList.toggle('hidden',!visible);if(!visible)return;const remaining=Math.max(0,Math.ceil(ev.deadline-elapsed));let desc=ev.type==='altar'?'Permaneça no círculo sem inimigos · '+Math.floor(ev.progress)+'/'+C.events.altarGoal+' s · Integridade '+Math.ceil(ev.hp)+'%':ev.type==='crystals'?'Destrua os cristais · proteção inimiga próxima: 15%':'Derrote a criatura com o selo dourado';hud.textContent=names[ev.type]+' · '+remaining+' s — '+desc;
  const target=ev.type==='marked'?alive().find(e=>e.eventRole==='marked:'+ev.index)||ev:ev;q.save();const on=save.options.particles!==false;
  RubraEventArt.ring(q,target.x,target.y,ev.type==='altar'?C.events.altarRadius:32,ev.type==='altar'?Math.min(1,ev.progress/C.events.altarGoal):1,ev.type==='crystals'?'#dba5ed':'#e7c580');
  if(ev.type==='altar')RubraEventArt.altar(q,ev.x,ev.y,time,ev.hp,ev.progress/C.events.altarGoal,on);
  if(ev.type==='marked')RubraEventArt.seal(q,target.x,target.y,time,on);
  q.fillStyle='#ffe2a0';q.font='12px sans-serif';q.textAlign='center';q.fillText(ev.type==='altar'?'ALTAR':ev.type==='marked'?'MARCADO':'CORRUPÇÃO',target.x,target.y-100);
  const dx=target.x-player.x,dy=target.y-player.y,d=Math.hypot(dx,dy);if(d>150){const a=Math.atan2(dy,dx);q.translate(player.x+Math.cos(a)*65,player.y+Math.sin(a)*65);q.rotate(a);q.beginPath();q.moveTo(10,0);q.lineTo(-5,-6);q.lineTo(-5,6);q.closePath();q.fill();}q.restore();
 }
 return {begin,update,draw,crystal,melee,release,incoming,start,finish,names};
})();
