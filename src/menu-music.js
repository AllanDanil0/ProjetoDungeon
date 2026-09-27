'use strict';
// Original, finite 48-bar compositions. Degrees are diatonic; -1 is a rest.
const RubraMenuMusic=(()=>{
 const pieces=[
  {id:'moon',title:'Juramento sob a lua',scene:'menu',bpm:96,root:57,mode:[0,2,3,5,7,8,11],lead:'triangle',pattern:[0,2,4,2,1,3,5,3],chords:[0,5,3,4,0,2,5,4],phrases:[[7,-1,9,11,10,9,7,-1],[4,7,8,-1,9,8,6,4],[11,10,9,7,8,-1,6,4],[7,9,11,13,12,10,8,7]]},
  {id:'velvet',title:'Ecos do castelo vazio',scene:'menu',bpm:80,root:55,mode:[0,2,3,5,7,8,10],lead:'sine',pattern:[0,4,2,6,2,4,0,2],chords:[0,2,5,3,1,4,0,4],phrases:[[11,9,-1,7,6,7,-1,9],[10,8,6,-1,4,6,8,-1],[7,-1,8,10,12,10,8,6],[9,7,4,-1,6,8,7,-1]]},
  {id:'embers',title:'Brasas da última lâmina',scene:'menu',bpm:112,root:50,mode:[0,2,3,5,7,8,11],lead:'square',pattern:[0,0,4,2,0,6,4,2],chords:[0,0,5,4,3,5,1,4],phrases:[[7,7,-1,11,9,7,6,-1],[4,6,7,9,-1,11,10,9],[12,11,9,10,7,-1,6,4],[7,9,11,-1,13,12,11,7]]},
  {id:'oath',title:'Salão dos juramentos',scene:'characters',bpm:90,root:53,mode:[0,2,3,5,7,9,10],lead:'triangle',pattern:[0,2,4,6,4,2,1,3],chords:[0,3,1,4,0,5,3,4],phrases:[[7,9,-1,10,11,9,7,-1],[8,10,12,10,8,-1,6,7],[11,-1,12,13,11,10,9,7],[4,7,9,11,-1,10,8,7]]},
  {id:'blood',title:'Retratos em carmesim',scene:'characters',bpm:104,root:52,mode:[0,1,3,5,7,8,10],lead:'sine',pattern:[0,4,1,4,2,5,1,4],chords:[0,1,0,5,3,1,4,0],phrases:[[7,-1,8,7,11,10,8,-1],[4,5,8,9,8,7,-1,4],[10,12,11,8,7,8,10,-1],[11,8,7,4,5,-1,8,7]]},
  {id:'vigil',title:'A vigília dos caçadores',scene:'characters',bpm:76,root:59,mode:[0,2,3,5,7,8,10],lead:'triangle',pattern:[0,2,4,2,6,4,2,1],chords:[0,5,2,3,0,3,5,4],phrases:[[7,-1,-1,9,10,-1,9,7],[6,7,9,-1,11,-1,10,9],[12,-1,11,9,10,8,6,-1],[7,9,10,11,9,-1,7,-1]]},
  {id:'atlas',title:'Atlas das terras perdidas',scene:'maps',bpm:88,root:50,mode:[0,2,3,5,7,9,10],lead:'sine',pattern:[0,4,2,6,1,5,3,4],chords:[0,3,5,2,0,1,3,4],phrases:[[7,11,9,-1,12,11,9,7],[8,-1,10,12,11,8,6,-1],[11,13,12,10,9,7,6,4],[7,-1,9,11,12,10,8,7]]},
  {id:'horizon',title:'Além do horizonte glacial',scene:'maps',bpm:72,root:54,mode:[0,2,4,6,7,9,11],lead:'sine',pattern:[0,4,6,2,4,1,5,3],chords:[0,4,1,5,2,3,4,0],phrases:[[7,-1,11,13,12,-1,9,11],[8,10,12,-1,11,9,8,-1],[14,13,11,9,12,10,8,7],[9,-1,11,12,11,9,7,-1]]},
  {id:'threshold',title:'Os portões do abismo',scene:'maps',bpm:108,root:48,mode:[0,1,3,5,7,8,11],lead:'triangle',pattern:[0,1,4,2,0,4,6,4],chords:[0,1,5,4,0,3,1,4],phrases:[[7,8,7,-1,11,10,8,7],[4,-1,5,8,9,8,7,-1],[11,13,12,10,8,7,5,4],[7,11,-1,12,10,8,7,-1]]}
 ].map(p=>({...p,bars:48,steps:384,duration:48*4*60/p.bpm}));
 const legacy=[{id:'legacyMoon',title:'Tema original da noite',scene:'menu',legacy:'menu',bpm:86,steps:256,duration:128*60/86},{id:'legacyHunters',title:'Tema original dos caçadores',scene:'menu',legacy:'characters',bpm:98,steps:256,duration:128*60/98}];
 const playlists={menu:[...pieces.filter(p=>p.scene==='menu'),...legacy],characters:pieces.filter(p=>p.scene==='characters'),maps:pieces.filter(p=>p.scene==='maps')};
 function note(p,degree){return p.root+p.mode[((degree%7)+7)%7]+12*Math.floor(degree/7);}
 // Intro 4 bars, A 8, B 8, development 8, reprise 8, bridge 8, coda 4.
 function events(p,step){
  const bar=Math.floor(step/8),pulse=step%8,beat=30/p.bpm,events=[];
  const section=bar<4?0:bar<12?1:bar<20?2:bar<28?3:bar<36?4:bar<44?5:6;
  const chord=p.chords[Math.floor(bar/2)%8],fade=bar>=44?(48-bar)/4:Math.min(1,(bar+1)/4);
  const add=(n,d,type,v,delay=0,envelope='pluck',slide=0)=>events.push({note:n,duration:d*beat,type,volume:v*fade,delay:delay*beat,envelope,slide});
  if(pulse===0){for(const d of [0,2,4])add(note(p,chord+d-7),7.5,'sine',.026,0,'pad');add(note(p,chord-14),5.5,'triangle',.065);}
  if(section!==0||pulse%2===0)add(note(p,chord+p.pattern[pulse]),1.4,'triangle',section===3?.029:.019);
  if(section>0&&section<6){const phrase=p.phrases[(section-1+Math.floor((bar%8)/2))%4],degree=phrase[pulse];if(degree>=0){const melody=note(p,degree+(section===4&&bar%4>=2?7:0));add(melody,pulse%3===0?1.8:.85,p.lead,p.lead==='square'?.024:.07);add(melody,.8,'sine',.014,.65);}}
  if([2,3,4].includes(section)&&pulse%2===1)add(note(p,chord+7+[4,2,0,2][Math.floor(pulse/2)]),1.5,'sine',.022,.15);
  if(section>0&&section<6&&pulse%4===0)add(34,.35,'sine',.065,0,'pluck',-16);
  if([2,3,4].includes(section)&&pulse%2===1)add(91,.12,'triangle',.012);
  if(section===5&&pulse===4)add(note(p,chord+7),3,'sine',.045,0,'pad');
  if(section===6&&pulse===0)add(note(p,7),7,'sine',.05,0,'pad');
  return events;
 }
 return {pieces,playlists,events};
})();
