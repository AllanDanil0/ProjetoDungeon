(function(root){
const C={
 version:3,slots:6,maxWeaponLevel:5,contactCooldown:1.05,pickupRadius:25,checkpointSeconds:3,
 profiles:{campaign:'rubra-save-v2',laboratory:'rubra-laboratory-v1'},
 limits:{enemies:65,projectiles:160,effects:100,drops:140,particles:180},
 combat:{spawnSafeDistance:175,bossSafeDistance:240,hpScaleMax:1.4,hpScaleRate:.85,rangedNear:135,rangedFar:185,rangedRetreat:.4,chargeSpeed:250,chargeSeconds:.65,bossProjectileSpeed:90,mobProjectileSpeed:110,projectileLife:5,healChance:.06,dropLife:60,phaseThreshold:.5,phaseInterval:.72,ringWindup:1.05,chargeWindup:1.1,enragedWindup:.75,shotWindup:.7,ringCount:9,enragedRingCount:14,spawnAcceleration:.9,bossSpawnMultiplier:2,enemyTierSeconds:40},
 xp:{base:12,perLevel:9},economy:{fallbackGold:8,fallbackHeal:2},
 characters:{
  noctis:{name:'Noctis',description:'Uma sombra de capuz carmesim. Ágil entre as ruínas.',hp:5,speed:158,radius:8,weapon:'dagger',passive:'Passo silencioso · esquiva recarrega 15% mais rápido.',dashCooldown:2.125,damage:1,attackSpeed:1,range:1,unlocked:false},
  rubra:{name:'Rubra',description:'A caçadora original do Bosque Esquecido.',hp:6,speed:151,radius:9,weapon:'blade',passive:'Fio ancestral · +10% de dano com todas as armas.',dashCooldown:2.5,damage:1.1,attackSpeed:1,range:1,unlocked:true}
 },
 weapons:{
  acorn:{name:'Estilhaço do bosque',description:'Um cristal de seiva dispara contra a criatura mais próxima.',kind:'aimed',damage:15,interval:1.1,range:230,count:1,speed:290,maxLevel:5,color:'#a6dda0',icon:'❖',unlockSeconds:30,unlock:'Sobreviva 30 segundos no tutorial',growth:{damage:.3,interval:.06,range:.06}},
  blade:{name:'Lâmina ancestral',description:'A espada original gira ao redor do caçador.',kind:'orbital',damage:22,interval:.9,range:49,count:1,maxLevel:5,color:'#edc782',icon:'⚔',unlock:'Sempre disponível',growth:{damage:.25,interval:.06,range:.07}},
  dagger:{name:'Agulha carmesim',description:'Adagas perseguem a direção do inimigo mais próximo.',kind:'aimed',damage:18,interval:.9,range:240,count:1,speed:330,maxLevel:5,color:'#f47484',icon:'◆',unlock:'Disponível ao entrar na Necrópole',growth:{damage:.3,interval:.06,range:.06}},
  ember:{name:'Selo das cinzas',description:'Uma explosão anunciada consome um grupo de inimigos.',kind:'area',damage:38,interval:2.8,range:220,radius:46,count:1,maxLevel:5,color:'#eea05f',icon:'✹',unlockSeconds:30,unlock:'Sobreviva 30 segundos na Necrópole',growth:{damage:.3,interval:.05,range:.1}},
  thorns:{name:'Coroa de espinhos',description:'Espinhos orbitais golpeiam os inimigos próximos.',kind:'orbital',damage:16,interval:1.1,range:76,count:2,maxLevel:5,color:'#ac91dc',icon:'✧',unlockSeconds:60,unlock:'Sobreviva 60 segundos na Necrópole',growth:{damage:.3,interval:.05,range:.06}},
  lance:{name:'Lança do túmulo',description:'Uma lança espectral atravessa até quatro alvos.',kind:'piercing',damage:30,interval:1.5,range:340,count:1,speed:380,pierce:4,maxLevel:5,color:'#6ee2d0',icon:'➶',unlock:'Derrote o Guardião da Necrópole',growth:{damage:.3,interval:.06,range:.08}}
 },
 enemies:{
  vamp:{name:'Vampiro',hp:28,damage:1,speed:34,xp:4,goldChance:.22,gold:2,r:12,behavior:'chase',sprite:'vamp'},
  shade:{name:'Sombra',hp:43,damage:1,speed:29,xp:5,goldChance:.25,gold:2,r:12,behavior:'chase',sprite:'shade'},
  bat:{name:'Morcego',hp:17,damage:1,speed:58,xp:3,goldChance:.18,gold:1,r:10,behavior:'chase',sprite:'bat'},
  undead:{name:'Morto-vivo',hp:48,damage:1,speed:38,xp:5,goldChance:.3,gold:3,r:14,behavior:'chase',asset:'undead',size:49},
  stalker:{name:'Rastejante',hp:24,damage:1,speed:67,xp:4,goldChance:.23,gold:2,r:10,behavior:'chase',asset:'tentacle',size:34},
  brute:{name:'Sepulcral · variante resistente',hp:140,damage:2,speed:24,xp:10,goldChance:.5,gold:5,r:19,behavior:'chase',asset:'undead',size:66,ring:'#dca962'},
  caster:{name:'Arauto · variante conjuradora',hp:60,damage:1,speed:30,xp:8,goldChance:.4,gold:4,r:14,behavior:'ranged',asset:'tentacle',size:47,ring:'#8fb8ff',attackInterval:3.5},
  elite:{name:'Sentinela · elite',hp:240,damage:2,speed:38,xp:22,goldChance:1,gold:12,r:21,behavior:'ranged',asset:'undead',size:73,ring:'#f1cd75',attackInterval:3}
 },
 maps:{
  tutorial:{name:'Bosque Esquecido',subtitle:'TUTORIAL',description:'A arena original. Aprenda a esquivar, evoluir e enfrentar Vhalkar.',duration:150,bossAt:150,unlocked:true,finishOnBoss:true,spawn:{x:408,y:302},bounds:{x:43,y:70,w:874,h:440},spawnInterval:1.6,minInterval:.55,enemies:['vamp','shade','bat'],obstacles:[{x:134,y:142,r:17},{x:808,y:142,r:17},{x:130,y:428,r:17},{x:820,y:428,r:17}],boss:{name:'Vhalkar · Guardião do Bosque',hp:1150,damage:1,speed:30,r:25,size:80,asset:null,gold:50,interval:3.8}},
  necropolis:{name:'Necrópole Carmesim',subtitle:'CAPÍTULO I',description:'Caminhos de pedra, árvores retorcidas e um guardião alado. Sobreviva por 3 minutos para invocá-lo.',duration:180,bossAt:180,unlocked:false,finishOnBoss:true,spawn:{x:480,y:310},bounds:{x:40,y:65,w:880,h:445},spawnInterval:1.4,minInterval:.38,enemies:['undead','stalker','brute','caster'],eliteEvery:45,obstacles:[{x:180,y:155,r:27},{x:765,y:165,r:28},{x:255,y:375,r:22},{x:720,y:400,r:24},{x:360,y:175,r:22},{x:615,y:370,r:21}],boss:{name:'Morthar · Guardião da Necrópole',hp:2400,damage:1,speed:28,r:31,size:111,asset:'dragon',gold:100,interval:3.4}}
 },
 assets:{
  path:'assets/mapa1/stone-path.png',tree:'assets/mapa1/twisted-tree/twisted-tree-1.png',shrine:'assets/mapa1/stone-shrine/stone-shrine-1.png',tomb:'assets/mapa1/tombstone/tombstone-2.png',
  undead:'assets/mobs_mapa1/pixel-art-undead-creature/pixel-art-undead-creature-1.png',tentacle:'assets/mobs_mapa1/pixel-art-tentacle-monsters/pixel-art-tentacle-monsters-1.png',dragon:'assets/mobs_mapa1/pixel-art-dragon/pixel-art-dragon-1.png',hero:'assets/hero-poses.jpeg'
 }
};
C.characters.noctis.unlock='Conclua o tutorial derrotando Vhalkar';
C.characters.rubra.unlock='Disponível desde o início';
C.maps.necropolis.unlock='Conclua o tutorial derrotando Vhalkar';
C.maps.tutorial.weapons=['blade','acorn'];
C.maps.necropolis.weapons=Object.keys(C.weapons);
C.weapons.dagger.unlock='Conclua o tutorial; utilizável na Necrópole';
C.visuals={frameSize:64,bodyHeight:48,worldHeight:38,walkFps:7,orbitSpeed:2.3};
Object.assign(C.assets,{noctisLeft:'assets/visual-update/noctis-left.jpg',noctisRight:'assets/visual-update/noctis-right.jpg',noctisBack:'assets/visual-update/noctis-back.jpg',noctisFront:'assets/visual-update/noctis-front.png',noctisPortrait:'assets/visual-update/noctis-portrait.jpg',rubraPortrait:'assets/visual-update/rubra-portrait.jpg',rubraWalk:'assets/visual-update/rubra-walk.png',startArt:'assets/visual-update/start.jpg',castleMenu:'assets/visual-update/castle-menu.png'});
root.RubraConfig=C;if(typeof module!=='undefined')module.exports=C;
})(globalThis);
