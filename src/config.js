(function(root){
const C={
 version:3,slots:6,maxWeaponLevel:7,contactCooldown:1.05,pickupRadius:25,checkpointSeconds:3,
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
C.characters.ignivar={name:'Ignivar',description:'O herdeiro da fornalha. Seu fogo desperta entre os túmulos.',hp:6,speed:153,radius:8,weapon:'cinder',price:500,purchaseMap:'necropolis',passive:'Coração da fornalha · +25% de dano global e nova de fogo ao esquivar (32 de dano base).',dashCooldown:2.2,damage:1.25,attackSpeed:1,range:1,unlocked:false,unlock:'Libere a Necrópole e compre por 500 de ouro',fireDash:{damage:32,radius:64}};
Object.assign(C.weapons,{
 cinder:{name:'Cetro da fornalha',description:'Orbes de fogo explodem ao atingir o primeiro inimigo.',kind:'explosive',damage:23,interval:1.65,range:280,radius:37,count:1,speed:215,maxLevel:7,color:'#ff9848',icon:'✺',unlockSeconds:15,unlock:'Sobreviva 15 segundos na Necrópole ou compre Ignivar',growth:{damage:.26,interval:.045,range:.055}},
 chain:{name:'Rosário da tempestade',description:'Raios saltam entre inimigos próximos sem atingir o mesmo alvo duas vezes.',kind:'chain',damage:20,interval:1.85,range:240,count:3,jumpRange:105,maxLevel:7,color:'#9ecfff',icon:'ϟ',unlockSeconds:45,unlock:'Sobreviva 45 segundos na Necrópole',growth:{damage:.24,interval:.04,range:.05}},
 reaper:{name:'Foice do eclipse',description:'Uma foice atravessa os inimigos e retorna, atingindo cada um uma vez por trajeto.',kind:'returning',damage:28,interval:2.2,range:290,count:1,speed:255,pierce:99,maxLevel:7,color:'#cda3ff',icon:'☽',unlockSeconds:90,unlock:'Sobreviva 90 segundos na Necrópole',growth:{damage:.25,interval:.045,range:.05}}
});
for(const w of Object.values(C.weapons))w.maxLevel=7;
C.maps.tutorial.maxWeaponLevel=6;C.maps.necropolis.maxWeaponLevel=7;
C.audio={musicVolume:.32,effectsVolume:.55,maxVoices:48,killCooldown:.09,weaponCooldown:.12};
C.maps.tutorial.weapons=['blade','acorn'];
C.maps.necropolis.weapons=Object.keys(C.weapons);
C.maps.necropolis.world={width:2880,height:1620,tileWidth:960,tileHeight:540,spawnOuter:420,despawnDistance:950};
C.maps.necropolis.bounds={x:40,y:65,w:2800,h:1525};
const originalObstacles=C.maps.necropolis.obstacles;
C.maps.necropolis.obstacles=[];
for(let row=0;row<3;row++)for(let col=0;col<3;col++)for(const [i,o]of originalObstacles.entries())C.maps.necropolis.obstacles.push({...o,x:o.x+col*960,y:o.y+row*540,kind:i<2?'tree':'pillar'});
C.maps.necropolis.description='Uma necrópole extensa de caminhos de pedra e árvores retorcidas. Explore sob a lua; Morthar desperta após 3 minutos.';
C.weapons.dagger.unlock='Conclua o tutorial; utilizável na Necrópole';
Object.assign(C.assets,{ignivarSheet:'assets/expansion/ignivar-sheet.png',ignivarPortrait:'assets/expansion/ignivar-reference.png',crimsonTree1:'assets/expansion/tree-1.png',crimsonTree2:'assets/expansion/tree-2.png',crimsonTree3:'assets/expansion/tree-3.png'});
C.visuals={frameSize:64,bodyHeight:48,worldHeight:38,walkFps:7,orbitSpeed:2.3};
Object.assign(C.assets,{noctisLeft:'assets/visual-update/noctis-left.jpg',noctisRight:'assets/visual-update/noctis-right.jpg',noctisBack:'assets/visual-update/noctis-back.jpg',noctisFront:'assets/visual-update/noctis-front.png',noctisPortrait:'assets/visual-update/noctis-portrait.jpg',rubraPortrait:'assets/visual-update/rubra-portrait.jpg',rubraWalk:'assets/visual-update/rubra-walk.png',startArt:'assets/visual-update/start.jpg',castleMenu:'assets/visual-update/castle-menu.png'});

// Chapter II: explicit finite arena and editable collision geometry in world pixels.
Object.assign(C.characters,{
 nivor:{name:'Nivor',description:'Um viajante das estrelas aprisionado no gelo ancestral.',hp:7,speed:162,radius:8,weapon:'frostbolt',passive:'Pulso boreal · +30% de dano; dash causa 36 de dano base e desacelera inimigos.',dashCooldown:2.1,damage:1.30,attackSpeed:1.04,range:1.02,unlock:'Derrote Morthar e libere o Santuário do Inverno',chapter:'ice',fireDash:{damage:36,radius:68,color:'#83e8ff',slow:.55,duration:1.6}},
 vael:{name:'Vael, o Criomante',description:'Sua coroa guarda a memória de todas as tempestades de inverno.',hp:7,speed:158,radius:8,weapon:'blizzard',price:800,purchaseMap:'ice',passive:'Inverno eterno · +35% de dano, +8% de cadência; dash glacial de 44 de dano base.',dashCooldown:2.05,damage:1.35,attackSpeed:1.08,range:1.06,unlock:'Libere o Santuário do Inverno e compre por 800 de ouro',fireDash:{damage:44,radius:76,color:'#b6f7ff',slow:.45,duration:2}},
 aelthir:{name:'Aelthir',description:'O último guardião élfico. Sua lâmina carrega o coração da geleira.',hp:8,speed:169,radius:8,weapon:'glaive',price:1000,purchaseMap:'ice',passive:'Coração glacial · +45% de dano, +12% de cadência; dash de 54 de dano base.',dashCooldown:1.85,damage:1.45,attackSpeed:1.12,range:1.1,unlock:'Libere o Santuário do Inverno e compre por 1000 de ouro',fireDash:{damage:54,radius:80,color:'#d1ffff',slow:.4,duration:2}}
});
const iceWeapon=(values)=>({maxLevel:7,count:1,color:'#91eaff',growth:{damage:.26,interval:.045,range:.06},...values});
Object.assign(C.weapons,{
 frostbolt:iceWeapon({name:'Agulhas boreais',description:'Cristais rápidos reduzem a velocidade do alvo em 45%.',kind:'aimed',damage:25,interval:.85,range:280,speed:360,slow:.55,slowTime:1.4,icon:'❄',unlockSeconds:0,unlock:'Libere o Santuário do Inverno'}),
 halo:iceWeapon({name:'Coroa de estilhaços',description:'Três lâminas de gelo orbitam e retardam ameaças próximas.',kind:'orbital',damage:24,interval:1.05,range:82,count:3,slow:.75,slowTime:1,color:'#c6f9ff',icon:'✧',unlockSeconds:30,unlock:'Sobreviva 30 segundos no Santuário'}),
 comet:iceWeapon({name:'Cometa polar',description:'Uma esfera densa explode em fragmentos glaciais.',kind:'explosive',damage:46,interval:2.2,range:330,radius:51,speed:230,slow:.6,slowTime:1.3,color:'#7db6ff',icon:'✺',unlockSeconds:60,unlock:'Sobreviva 60 segundos no Santuário'}),
 prism:iceWeapon({name:'Prisma da aurora',description:'Um feixe prismático atravessa todos os alvos em uma linha.',kind:'beam',damage:42,interval:1.9,range:360,width:11,color:'#aaffef',icon:'◇',unlockSeconds:90,unlock:'Sobreviva 90 segundos no Santuário'}),
 glaive:iceWeapon({name:'Gume do inverno',description:'Uma lâmina ancestral corta na ida e na volta, deixando geada.',kind:'returning',damage:40,interval:2,range:320,speed:290,pierce:99,slow:.7,slowTime:1,color:'#d8f4ff',icon:'☽',unlockSeconds:120,unlock:'Sobreviva 120 segundos no Santuário ou compre Aelthir'}),
 blizzard:iceWeapon({name:'Cetro da nevasca',description:'Uma tempestade persistente causa pulsos de dano e lentidão.',kind:'storm',damage:18,interval:4,range:260,radius:64,duration:2.8,tick:.65,slow:.5,slowTime:1,color:'#b5cfff',icon:'✳',unlockSeconds:150,unlock:'Sobreviva 150 segundos no Santuário ou compre Vael'})
});
C.weapons.absolute=iceWeapon({name:'Lâmina do Zero Absoluto',description:'Relíquia de Skarn: uma espada rúnica invoca cristais que devastam uma grande área e retardam inimigos.',kind:'storm',damage:90,interval:3.2,range:400,radius:100,duration:2.8,tick:.5,slow:.35,slowTime:1.6,color:'#8df6ff',icon:'♜',unlock:'Derrote Skarn no Santuário do Inverno'});
Object.assign(C.enemies,{
 frostguard:{name:'Legionário congelado',hp:90,damage:1,speed:42,xp:8,goldChance:.35,gold:4,r:13,behavior:'chase',asset:'frostguard',size:49},
 wraith:{name:'Espectro da geada',hp:75,damage:1,speed:53,xp:8,goldChance:.32,gold:4,r:12,behavior:'chase',asset:'wraith',size:52},
 snowhulk:{name:'Carcaça de neve',hp:260,damage:2,speed:26,xp:17,goldChance:.6,gold:8,r:22,behavior:'chase',asset:'snowhulk',size:68},
 icewolf:{name:'Lobo da tundra',hp:58,damage:1,speed:83,xp:7,goldChance:.28,gold:3,r:12,behavior:'chase',asset:'icewolf',size:45},
 frostimp:{name:'Diabrete glacial',hp:110,damage:1,speed:48,xp:11,goldChance:.4,gold:5,r:13,behavior:'ranged',asset:'frostimp',size:48,attackInterval:2.6},
 frostlich:{name:'Arauto do inverno',hp:175,damage:2,speed:31,xp:16,goldChance:.5,gold:7,r:15,behavior:'ranged',asset:'frostlich',size:62,attackInterval:3},
 iceElite:{name:'Sentinela de cristal',hp:480,damage:2,speed:38,xp:34,goldChance:1,gold:22,r:25,behavior:'ranged',asset:'icegolem',size:82,ring:'#a8eaff',attackInterval:2.7}
});
C.maps.ice={name:'Santuário do Inverno',subtitle:'CAPÍTULO II',description:'Uma cruz de pedra sob neve e gelo. O portal de aurora guarda uma arena mais hostil.',duration:240,bossAt:240,finishOnBoss:true,unlock:'Derrote Morthar na Necrópole',spawn:{x:960,y:870},bounds:{x:150,y:180,w:1620,h:875},world:{width:1920,height:1180,spawnOuter:450,despawnDistance:1050},maxWeaponLevel:7,spawnInterval:1.1,minInterval:.3,enemyTierSeconds:30,eliteEvery:40,elite:'iceElite',enemies:['frostguard','wraith','icewolf','snowhulk','frostimp','frostlich'],weapons:['lance','ember','chain','reaper','frostbolt','halo','comet','prism','glaive','blizzard','absolute'],startWeapon:'lance',preview:'iceMap',boss:{name:'Skarn · Coração da Geleira',hp:4400,damage:2,speed:32,r:33,size:118,asset:'icegolem',gold:180,interval:3},obstacles:[
 {x:490,y:345,r:100,kind:'portal'}, {x:755,y:265,r:44,kind:'tree'}, {x:1430,y:300,r:58,kind:'tree'}, {x:1190,y:260,r:28,kind:'rune'}, {x:1550,y:390,r:30,kind:'rune'}, {x:1660,y:470,r:35,kind:'rune'}, {x:400,y:900,r:35,kind:'rune'}, {x:1625,y:850,r:35,kind:'rune'}, {x:460,y:1115,r:35,kind:'rune'}, {x:1305,y:1150,r:35,kind:'rune'}, {x:115,y:385,r:65,kind:'tree'}, {x:130,y:1010,r:75,kind:'tree'}, {x:1750,y:1065,r:60,kind:'tree'}
]};
// Geometry above is authored against the reference image; scale the finite world together.
C.maps.ice.world.artScale=2;
for(const key of ['width','height'])C.maps.ice.world[key]*=2;
for(const key of ['x','y'])C.maps.ice.spawn[key]*=2;
for(const key of ['x','y','w','h'])C.maps.ice.bounds[key]*=2;
for(const obstacle of C.maps.ice.obstacles)for(const key of ['x','y','r'])obstacle[key]*=2;
C.ice={bossWeapon:'absolute',inherited:['lance','ember','chain','reaper'],weapons:['frostbolt','halo','comet','prism','glaive','blizzard'],heroes:['nivor','vael','aelthir'],monsterCells:{frostguard:[0,0,355,260],wraith:[411,0,295,260],snowhulk:[709,0,244,260],icewolf:[0,511,375,257],frostimp:[953,0,220,260],frostlich:[405,511,300,257],icegolem:[710,511,242,257]}};
Object.assign(C.assets,{iceMap:'assets/ice/ice-map.png',iceMonsters:'assets/ice/monsters.jpg',nivorSheet:'assets/ice/nivor-sheet.png',vaelSheet:'assets/ice/vael-sheet.png',aelthirSheet:'assets/ice/aelthir-sheet.png'});

root.RubraConfig=C;if(typeof module!=='undefined')module.exports=C;
})(globalThis);
