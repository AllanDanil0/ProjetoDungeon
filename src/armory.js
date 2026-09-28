'use strict';
function armoryScreen(){
 screen('armory');wallet();$('armoryCards').replaceChildren();
 const entries=Object.entries(C.weapons);
 const owned=id=>save.weapons.includes(id)||save.characters.some(hero=>C.characters[hero].weapon===id);
 $('armorySummary').textContent=`${entries.filter(([id])=>owned(id)).length} de ${entries.length} armas desbloqueadas · ${profile==='laboratory'?'save de testes':'campanha'}`;
 for(const [id,w]of entries){
  const maps=Object.values(C.maps).filter(m=>m.weapons.includes(id));
  const heroes=Object.entries(C.characters).filter(([,hero])=>hero.weapon===id);
  const card=document.createElement('article');card.className='armory-card';card.dataset.weapon=id;
  card.dataset.unlocked=String(owned(id));
  card.innerHTML=`${RubraWeaponArt.iconHtml(id)}<h3>${w.name}</h3><strong class="weapon-status">${owned(id)?'DESBLOQUEADA':'BLOQUEADA'}</strong><p>${w.description}</p><dl><dt>Dano base</dt><dd>${w.damage.toLocaleString('pt-BR')} por acerto/pulso</dd><dt>Origem</dt><dd>${maps[0]?.name||'Arma de caçador'}</dd><dt>Mapas</dt><dd>${maps.map(m=>m.name).join(' · ')}</dd></dl><p class="armory-unlock">${w.unlock||'Arma do caçador'}${heroes.length?' · Também acompanha '+heroes.map(([,h])=>h.name).join(' / ')+' em qualquer mapa.':''}</p>`;
  if(C.profane.balance[id]){const detail=document.createElement('p'),local=K.stats({id,level:1},{map:'profane'});detail.textContent='No Profano: '+local.damage.toLocaleString('pt-BR',{maximumFractionDigits:1})+' de dano base; intervalo mínimo '+C.profane.balance[id].interval+' s.'+(id==='rosary'?' A faixa interna não causa dano.':w.kind==='storm'?' Uma área ativa por arma.':'');card.append(detail);}$('armoryCards').append(card);
 }
}
$('armoryButton').onclick=armoryScreen;
$('armoryBack').onclick=menu;
