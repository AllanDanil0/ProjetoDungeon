(function(C){
const weapon=(v)=>({maxLevel:7,count:1,growth:{damage:.27,interval:.045,range:.06},...v});
C.profane={heroes:['karn','malthor','vespera'],inherited:['absolute','comet','prism'],weapons:['execution','bloodwhip','rosary','censer','knell','nails','heresy'],bossWeapon:'verdict'};
Object.assign(C.characters,{
 karn:{name:'Karn, o Carrasco',description:'O destruidor de elites. A armadura pesa; o machado abre espaço.',hp:10,speed:136,radius:10,weapon:'execution',damage:1.6,attackSpeed:.9,range:1,dashCooldown:2.6,unlock:'Derrote Skarn para liberar o Santuário Profano',passive:'Execução · +60% de dano; arco frontal pesado empurra ameaças. Mais vida, menor mobilidade.'},
 malthor:{name:'Malthor, o Herege',description:'Converte impactos em energia sombria para dominar corredores.',hp:8,speed:162,radius:8,weapon:'bloodwhip',price:1500,purchaseMap:'profane',damage:1.42,attackSpeed:1.28,range:1,dashCooldown:2,unlock:'Libere o Santuário Profano e compre por 1500 de ouro',passive:'Herança sombria · acertos acumulam até +50% de alcance; começa a dissipar após 4 s sem atingir.'},
 vespera:{name:'Vespera, a Devota Sombria',description:'Desliza entre colunas protegida por um rosário de lâminas.',hp:7,speed:182,radius:8,weapon:'rosary',price:2000,purchaseMap:'profane',damage:1.18,attackSpeed:1.65,range:1.08,dashCooldown:1.6,unlock:'Libere o Santuário Profano e compre por 2000 de ouro',passive:'Devoção veloz · +65% de cadência, maior mobilidade e esquiva a cada 1,6 s.'}
});
Object.assign(C.weapons,{
 execution:weapon({name:'Machado da Execução',description:'Um arco frontal pesado atinge grupos e empurra inimigos comuns.',kind:'cleave',damage:102,interval:1.95,range:116,arc:2.25,color:'#cf626e',unlock:'Libere o Santuário Profano; arma principal de Karn'}),
 bloodwhip:weapon({name:'Chicote de Sangue',description:'Estalo cortante em linha reta, atravessando todos os alvos no trajeto.',kind:'beam',damage:48,interval:.92,range:210,width:13,color:'#f26476',unlockSeconds:45,unlock:'Sobreviva 45 segundos no Santuário Profano ou compre Malthor'}),
 rosary:weapon({name:'Lâminas do Rosário',description:'Lâminas de um rosário carmesim orbitam continuamente, retalhando ameaças próximas.',kind:'orbital',damage:22,interval:.68,range:74,count:3,color:'#df566e',unlockSeconds:90,unlock:'Sobreviva 90 segundos no Santuário Profano ou compre Vespera'}),
 censer:weapon({name:'Turíbulo das Almas',description:'Um incensário invoca fumaça espectral: dano periódico e lentidão em área.',kind:'storm',damage:24,interval:3.8,range:300,radius:90,duration:3,tick:.65,slow:.6,slowTime:1,color:'#a3db86',unlockSeconds:150,unlock:'Sobreviva 2:30 no Santuário Profano'}),
 knell:weapon({name:'Sino da Ruína',description:'Um sino rachado anuncia uma explosão circular de energia profana.',kind:'area',damage:74,interval:3,range:320,radius:96,color:'#c7b684',unlockSeconds:210,unlock:'Sobreviva 3:30 no Santuário Profano'}),
 nails:weapon({name:'Pregos do Mártir',description:'Duas estacas rúnicas de ferro atravessam até seis inimigos cada.',kind:'piercing',damage:34,interval:1.05,range:350,count:2,speed:370,pierce:6,color:'#c3b4d6',unlockSeconds:300,unlock:'Sobreviva 5:00 no Santuário Profano'}),
 heresy:weapon({name:'Evangelho das Sombras',description:'Um tomo proibido conecta até quatro inimigos com raios de maldição.',kind:'chain',damage:41,interval:1.75,range:290,count:4,jumpRange:150,color:'#bd97de',unlockSeconds:390,unlock:'Sobreviva 6:30 no Santuário Profano'}),
 verdict:weapon({name:'Édito do Inquisidor',description:'Relíquia do chefe: um selo de julgamento desencadeia seis pulsos devastadores e lentidão.',kind:'storm',damage:125,interval:3.6,range:400,radius:120,duration:2.9,tick:.5,slow:.5,slowTime:1.2,color:'#bdeba0',unlock:'Derrote O Inquisidor Esquecido no Santuário Profano'})
});
const mob=(name,hp,speed,xp,asset,extra={})=>({name,hp,speed,xp,damage:1,goldChance:.35,gold:5,r:13,behavior:'chase',asset,size:52,...extra});
Object.assign(C.enemies,{
 fanatic:mob('Monge Fanático',82,32,8,'fanatic'),templeHound:mob('Cão do Templo',58,76,7,'templeHound',{size:40,r:12}),
 ethereal:mob('Aparição Etérea',108,49,11,'ethereal',{ghost:true,size:54}),
 flesh:mob('Abominação de Carne',480,28,25,'flesh',{r:23,size:78,damage:2,gold:12,goldChance:.7}),
 zealot:mob('Monge Enfurecido',125,57,12,'fanatic',{ring:'#ae4971'}),
 fallenSeraph:mob('Seraph Caído',195,35,18,'fallenSeraph',{behavior:'ranged',attackInterval:3.4,size:66,gold:9}),
 fallenKnight:mob('Cavaleiro Caído',290,39,22,'fallenKnight',{r:18,size:64,damage:2,gold:12}),
 profaneGargoyle:mob('Gárgula de Pedra Profana',3200,37,160,'profaneGargoyle',{r:30,size:103,damage:2,gold:65,goldChance:1,miniBoss:true,behavior:'ranged',attackInterval:3.8,ring:'#a5df88'})
});
C.maps.profane={name:'Santuário Profano',subtitle:'CAPÍTULO III',description:'Claustros arruinados, colunas e fogo espectral. Quatro ondas; Inquisidor aos 9 minutos.',duration:600,bossAt:540,finishOnBoss:true,unlock:'Derrote Skarn no Santuário do Inverno',spawn:{x:1920,y:1910},bounds:{x:200,y:260,w:3440,h:2100},world:{width:3840,height:2560,spawnOuter:470,despawnDistance:1100},maxWeaponLevel:7,spawnInterval:1.4,minInterval:.36,enemies:['fanatic','templeHound'],weapons:[...C.profane.inherited,...C.profane.weapons,'verdict'],startWeapon:'execution',preview:'profaneMap',boss:{name:'O Inquisidor Esquecido',hp:13500,damage:2,speed:25,r:32,size:112,asset:'inquisitor',gold:320,interval:3.6},obstacles:[{x:1920,y:1260,r:70,kind:'altar'},...[[430,310],[520,220],[470,405],[475,650],[435,760],[560,876],[648,905],[1105,308],[1015,220],[1062,405],[1062,650],[1105,770],[900,870]].map(([x,y])=>({x:x*2.5,y:y*2.5,r:36,kind:'pillar'}))],waves:[{at:0,name:'Onda 1 · O limiar',interval:1.4,pool:['fanatic','fanatic','templeHound']},{at:150,name:'Onda 2 · Vozes entre pilares',interval:.95,pool:['fanatic','templeHound','ethereal']},{at:300,name:'Onda 3 · Carne e penitência',interval:.62,pool:['zealot','zealot','flesh','ethereal','templeHound']},{at:450,name:'Onda 4 · A última liturgia',interval:.36,pool:['zealot','zealot','fallenSeraph','flesh','fallenKnight','ethereal']}]};
Object.assign(C.assets,{bloodwhipClean:'assets/profane/bloodwhip-clean.png',profaneRelics:'assets/profane/relics.png',profaneMap:'assets/profane/map.png',profaneExtras:'assets/profane/extra-mobs.png',profaneMonsters1:'assets/profane/monsters-1.jpg',profaneMonsters2:'assets/profane/monsters-2.jpg',karnPortrait:'assets/profane/karn.jpg',malthorPortrait:'assets/profane/malthor.jpg',vesperaPortrait:'assets/profane/vespera.jpg',executionArt:'assets/profane/execution.jpg',bloodwhipArt:'assets/profane/bloodwhip.jpg',rosaryArt:'assets/profane/rosary.jpg'});
// Authored in the unchanged 1536×1024 sanctuary artwork, then scaled to world space.
C.profane.braziers=[[114,165],[1421,165],[661,296],[875,296],[413,411],[1122,407],[413,585],[1122,585],[661,692],[875,692],[102,881],[1435,881]].map(([x,y])=>({x,y,flameY:y-22}));
C.profane.pillars=[[46,137,26,17,111],[232,145,28,18,122],[451,137,28,18,117],[666,147,29,20,131],[871,142,29,20,129],[1085,145,28,19,123],[1305,143,29,19,128],[1488,144,28,18,118],[520,223,25,17,98],[1010,223,26,18,99],[428,310,25,18,103],[1106,311,28,18,101],[472,409,26,19,84],[1064,411,27,19,87],[472,650,27,20,99],[1064,650,27,20,100],[127,771,26,19,98],[435,778,28,20,106],[1107,778,28,20,109],[560,861,27,20,83],[896,898,27,20,98],[976,862,27,20,89],[640,914,28,20,99],[45,986,29,20,103],[354,985,29,20,100],[526,952,29,20,96],[702,986,28,20,93],[832,986,28,20,93],[1040,951,29,20,93],[1204,984,29,20,98],[1487,985,29,20,101],[30,319,22,21,106],[1504,317,22,21,106],[30,518,22,23,97],[1501,518,22,23,95],[31,817,24,22,107],[1501,816,24,22,110]];
const box=(x,y,w,h,kind)=>({x:x*2.5,y:y*2.5,w:w*2.5,h:h*2.5,shape:'rect',r:0,kind});
C.maps.profane.obstacles=[box(729,452,80,66,'altar'),...C.profane.pillars.map(([x,y,rx,ry,height])=>box(x-rx,y-height,rx*2,height+ry,'pillar')),...C.profane.braziers.map(({x,y})=>box(x-19,y-8,38,29,'brazier'))];
// Solid masonry follows the projected silhouette; loose floor stones remain walkable.
C.profane.walls=[[0,0,1536,145],[0,145,76,879],[1460,145,76,879],[76,210,78,111],[76,421,78,132],[76,650,91,134],[1379,213,81,115],[1381,422,79,133],[1379,652,81,132],[76,900,651,124],[809,900,651,124],[727,1000,82,24]];
C.maps.profane.obstacles.push(...C.profane.walls.map(v=>box(...v,'wall')));
C.maps.profane.bounds={x:190,y:365,w:3460,h:2135};
// Explicit chapter progression: ordinary weapons at equal levels always advance.
C.balance={bossWeapons:['lance','absolute','verdict'],tiers:[['acorn','blade'],['dagger','ember','thorns','cinder','chain','reaper'],C.ice.weapons,C.profane.weapons]};
const damage={dagger:28,ember:42,thorns:28,cinder:36,chain:32,reaper:40,lance:70,frostbolt:52,halo:54,comet:78,prism:68,glaive:72,blizzard:56,absolute:150,execution:180,bloodwhip:118,rosary:104,censer:100,knell:175,nails:112,heresy:124,verdict:240};
for(const [id,value]of Object.entries(damage))C.weapons[id].damage=value;
C.weapons.knell.interval=2.2;C.weapons.heresy.interval=1.45;
const heroBalance={ignivar:{hp:7,speed:158},vael:{hp:8,speed:164,damage:1.4,attackSpeed:1.16,range:1.08,dashCooldown:2},aelthir:{hp:9,speed:174,damage:1.6,attackSpeed:1.3,range:1.12,dashCooldown:1.8},karn:{damage:1.75,attackSpeed:.95},malthor:{hp:11,speed:182,damage:1.85,attackSpeed:1.5,range:1.16,dashCooldown:1.65},vespera:{hp:12,speed:192,damage:2.05,attackSpeed:1.85,range:1.22,dashCooldown:1.4}};
for(const [id,values]of Object.entries(heroBalance))Object.assign(C.characters[id],values);
C.characters.vael.passive='Inverno eterno · +40% de dano, +16% de cadência; dash glacial de 44 de dano base.';
C.characters.aelthir.passive='Coração glacial · +60% de dano, +30% de cadência; dash de 54 de dano base.';
C.characters.karn.passive='Execução · +75% de dano; arco frontal pesado empurra ameaças. Mais vida, menor mobilidade.';
C.characters.malthor.passive='Herança sombria · +85% de dano e +50% de cadência; acertos acumulam até +50% de alcance, dissipando após 4 s.';
C.characters.vespera.passive='Devoção veloz · +105% de dano, +85% de cadência, maior mobilidade e esquiva a cada 1,4 s.';
const durability={undead:80,stalker:52,brute:220,caster:110,elite:480,frostguard:280,wraith:220,snowhulk:900,icewolf:180,frostimp:300,frostlich:550,iceElite:1500,fanatic:550,templeHound:380,ethereal:700,flesh:2600,zealot:850,fallenSeraph:1550,fallenKnight:1900,profaneGargoyle:20000};
for(const [id,hp]of Object.entries(durability))C.enemies[id].hp=hp;
for(const [id,speed]of Object.entries({fanatic:42,templeHound:104,ethereal:62,flesh:35,zealot:72,fallenSeraph:45,fallenKnight:50,profaneGargoyle:46})){C.enemies[id].speed=speed;C.enemies[id].damage=['flesh','fallenKnight','profaneGargoyle'].includes(id)?3:2;}
C.enemies.fallenSeraph.attackInterval=2.7;C.enemies.profaneGargoyle.attackInterval=3;
C.maps.necropolis.boss.hp=6000;C.maps.ice.boss.hp=16000;
Object.assign(C.maps.profane.boss,{hp:320000,damage:4,speed:58,interval:2.25,projectileSpeed:110});
C.maps.profane.waves.forEach((w,i)=>w.interval=[.95,.62,.39,.25][i]);
// Raise encounter pressure without reducing the purchased heroes' advantages.
for(const id of ['fanatic','templeHound','ethereal','flesh','zealot','fallenSeraph','fallenKnight'])C.enemies[id].hp=Math.round(C.enemies[id].hp*1.55);
C.enemies.profaneGargoyle.hp=34000;
C.enemies.fallenSeraph.attackInterval=2.1;
C.maps.profane.waves[2].pool.push('fallenSeraph');
C.maps.profane.waves[3].pool.push('fallenSeraph','templeHound');
C.assets.absoluteArt='assets/profane/absolute-v2.png';
if(typeof module!=='undefined')module.exports=C;
})(typeof RubraConfig!=='undefined'?RubraConfig:module.exports);
