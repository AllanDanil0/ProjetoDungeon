'use strict';
// A public sandbox for players. It grants nothing to the campaign profile.
function switchProfile(next){
 if(!Object.hasOwn(C.profiles,next))return false;
 if(profile===next)return true;
 if(run&&save.active)snapshot();
 if(!storeSave())return false;
 save=K.load(localStorage,C.profiles[next]);profile=next;globalThis.RubraPreferences=save.options;
 soundOn=save.options.sound;$('soundButton').textContent=soundOn?'♫ Som: on':'♫ Som: off';
 menu();return true;
}
function laboratoryScreen(){
 if(!switchProfile('laboratory'))return;$('labPlay').disabled=!assetReady;screen('laboratory');$('labItems').replaceChildren();
 for(const [type,title]of [['characters','Personagens'],['maps','Mapas'],['weapons','Armas']]){
  const field=document.createElement('fieldset'),legend=document.createElement('legend');legend.textContent=title;field.append(legend);
  for(const [id,item]of Object.entries(C[type])){const label=document.createElement('label'),input=document.createElement('input');input.type='checkbox';input.dataset.kind=type;input.value=id;input.disabled=save[type].includes(id);input.checked=input.disabled;label.append(input,document.createTextNode(item.name+(input.disabled?' · liberado':'')));field.append(label);}
  $('labItems').append(field);
 }
 $('labArsenal').checked=save.options.testArsenal!==false;
 $('labStatus').textContent='Save de testes ativo. A campanha normal não foi alterada.';
}
function grantLaboratory(all=false){
 if(profile!=='laboratory'||state!=='laboratory')return false;
 let changed=0;
 for(const type of ['characters','maps','weapons']){
  const ids=all?Object.keys(C[type]):[...$('labItems').querySelectorAll('input:checked:not(:disabled)')].filter(el=>el.dataset.kind===type).map(el=>el.value);
  if(K.laboratoryUnlock(save,profile,type,ids))changed+=ids.length;
 }
 if(!storeSave()){$('labStatus').textContent='Falha ao gravar os testes. Mantenha esta janela aberta.';return false;}
 laboratoryScreen();$('labStatus').textContent=changed?'Desbloqueios aplicados somente aos testes. Escolha Jogar nos testes.':'Marque um personagem, mapa ou arma para desbloquear.';return true;
}
$('openLaboratory').onclick=laboratoryScreen;
$('labUnlockSelected').onclick=()=>grantLaboratory(false);
$('labUnlockAll').onclick=()=>grantLaboratory(true);
$('labReset').onclick=()=>{if(state!=='laboratory'||profile!=='laboratory')return;const next=K.migrate(save);if(!K.laboratoryReset(next,profile))return;const previous=save;save=next;if(!storeSave()){save=previous;$('labStatus').textContent='Falha ao salvar o reset. Tente novamente.';return;}menu();laboratoryScreen();$('labStatus').textContent='Desbloqueios resetados. Ouro, recorde e opções preservados. A campanha normal não foi alterada.';};
$('labPlay').onclick=()=>{if(grantLaboratory(false))charactersScreen();};
$('labArsenal').onchange=()=>{if(profile==='laboratory'){save.options.testArsenal=$('labArsenal').checked;storeSave();}};
$('labCampaign').onclick=()=>{if(switchProfile('campaign'))menu();};
window.addEventListener('keydown',e=>{if(state==='laboratory'&&e.key==='Escape')$('labCampaign').click();});
