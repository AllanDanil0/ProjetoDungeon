'use strict';
// Original synthesized arcade score. One scheduler, no persistent timers or files.
const RubraAudio=(()=>{
 const scores={
  menu:{bpm:86,bass:[45,41,48,43],notes:[69,76,72,71,69,64,67,64,65,72,69,67,65,60,64,67]},
  characters:{bpm:98,bass:[45,48,41,43],notes:[69,72,76,79,76,72,71,67,65,69,72,76,74,71,67,64]},
  tutorial:{bpm:112,bass:[48,43,45,41],notes:[72,76,79,76,74,71,67,71,69,72,76,72,65,69,72,69]},
  necropolis:{bpm:104,bass:[38,41,36,37],notes:[62,69,65,64,62,57,60,61,65,72,68,65,64,61,57,61]},
  ice:{bpm:96,bass:[38,45,41,43],notes:[74,81,77,76,74,69,72,69,70,77,74,72,69,65,67,69]},
  iceAurora:{title:'Aurora sobre as ruínas',bpm:82,bass:[40,47,43,45,40,48,43,47],notes:[76,83,78,79,83,86,83,79,74,81,76,78,81,84,81,78,72,79,74,76,79,83,79,76,74,81,78,76,74,71,74,78]},
  boss:{bpm:146,bass:[38,38,37,41],notes:[62,62,69,65,64,64,61,57,62,65,69,74,73,69,65,61]}
 };
 class Engine{
  constructor(context){this.ctx=context;this.voices=new Set();this.scene='';this.step=0;this.next=0;this.last={};this.options={};this.master=context.createDynamicsCompressor();this.master.threshold.value=-14;this.master.ratio.value=6;this.master.connect(context.destination);this.music=context.createGain();this.fx=context.createGain();this.music.connect(this.master);this.fx.connect(this.master);}
  tone(note,start,duration,type,volume,bus='music',slide=0){if(this.voices.size>=RubraConfig.audio.maxVoices)return;const c=this.ctx,o=c.createOscillator(),g=c.createGain();o.type=type;const f=440*Math.pow(2,(note-69)/12);o.frequency.setValueAtTime(f,start);if(slide)o.frequency.exponentialRampToValueAtTime(Math.max(25,f*Math.pow(2,slide/12)),start+duration);g.gain.setValueAtTime(.0001,start);g.gain.exponentialRampToValueAtTime(Math.max(.0002,volume),start+.008);g.gain.exponentialRampToValueAtTime(.0001,start+duration);o.connect(g);g.connect(this[bus]);const voice={o,g,bus};this.voices.add(voice);o.onended=()=>{o.disconnect();g.disconnect();this.voices.delete(voice);};o.start(start);o.stop(start+duration+.01);}
  silence(bus){for(const v of this.voices)if(!bus||v.bus===bus){try{v.o.stop();}catch{}v.o.disconnect();v.g.disconnect();this.voices.delete(v);}}
  setOptions(options){this.options=options;const now=this.ctx.currentTime;this.music.gain.setTargetAtTime(options.music?options.musicVolume:0,now,.05);this.fx.gain.setTargetAtTime(options.sound?options.effectsVolume:0,now,.025);}
  setScene(scene){if(scene===this.scene)return;this.silence('music');this.scene=scene;this.step=0;this.next=this.ctx.currentTime+.03;}
  tick(){if(!this.options.music||!scores[this.scene]){this.next=this.ctx.currentTime+.03;return;}const c=this.ctx,score=this.scene==='ice'?(Math.floor(this.step/128)%2?scores.iceAurora:scores.ice):scores[this.scene],beat=60/score.bpm/2;if(this.next<c.currentTime-.1)this.next=c.currentTime+.02;for(let scheduled=0;this.next<c.currentTime+.12&&scheduled<3;scheduled++){const i=this.step++,t=this.next,n=score.notes[i%score.notes.length];if(this.scene==='ice'||this.scene==='iceAurora'){this.tone(n,t,beat*1.8,'sine',.1);if(i%2===0)this.tone(n+12,t+.025,beat*.8,'triangle',.025);if(i%8===0)this.tone(n-12,t,beat*5,'triangle',.035);}else this.tone(n,t,beat*.85,'triangle',.12);if(i%4===0)this.tone(score.bass[Math.floor(i/8)%score.bass.length],t,beat*3.5,'sine',.19);if(i%2===0)this.tone(33,t,.1,'sine',.13,'music',-15);else this.tone(91,t,.035,'triangle',.018);if(this.scene==='boss'&&i%2===0)this.tone(n-12,t,beat*.6,'sawtooth',.035);this.next+=beat;}}
  event(name){if(!this.options.sound)return false;const now=this.ctx.currentTime,cd=name==='kill'?RubraConfig.audio.killCooldown:name==='weapon'?RubraConfig.audio.weaponCooldown:.05;if(now-(this.last[name]??-99)<cd)return false;this.last[name]=now;
   const lines={click:[[76,.07,'triangle',.1,0]],dash:[[62,.2,'sawtooth',.08,-24]],kill:[[76,.09,'square',.045,-12]],hurt:[[43,.14,'sawtooth',.1,-9]],death:[[57,.35,'triangle',.15,-12],[45,.7,'sine',.18,-12]],boss:[[33,.9,'sawtooth',.1,5],[40,.8,'triangle',.13,0],[45,.9,'triangle',.1,-2]],level:[[72,.13,'triangle',.13,0],[76,.18,'triangle',.11,0],[79,.25,'triangle',.1,0]],purchase:[[72,.16,'triangle',.1,0],[79,.3,'triangle',.12,0]],victory:[[72,.25,'triangle',.12,0],[76,.35,'triangle',.12,0],[79,.6,'triangle',.13,0]],weapon:[[62,.06,'triangle',.025,-5]],gold:[[88,.05,'sine',.03,0]]};
   (lines[name]||lines.click).forEach((v,i)=>this.tone(v[0],now+i*.095,v[1],v[2],v[3],'fx',v[4]));return true;
  }
  dispose(){this.silence();this.music.disconnect();this.fx.disconnect();this.master.disconnect();}
 }
 let engine=null;
 function unlock(){if(!engine)try{engine=new Engine(new (window.AudioContext||window.webkitAudioContext)());}catch{return;}if(engine.ctx.state==='suspended')engine.ctx.resume().catch(()=>{});engine.setOptions(RubraPreferences);}
 function tick(state,map,boss){if(!engine)return;engine.setOptions(RubraPreferences);engine.setScene(document.hidden?'':state==='playing'?(boss?'boss':map):['paused','upgrade','help'].includes(state)?'':state==='characters'?'characters':'menu');engine.tick();}
 function event(name){engine?.setOptions(RubraPreferences);return engine?.event(name);}
 window.addEventListener('pointerdown',unlock,{passive:true});window.addEventListener('keydown',unlock);
 document.addEventListener('click',e=>{if(e.target.closest('button')&&!e.target.closest('button').disabled)event('click');});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)engine?.silence();});window.addEventListener('pagehide',()=>{engine?.dispose();engine=null;});
 return {Engine,scores,unlock,tick,event,get engine(){return engine;}};
})();
