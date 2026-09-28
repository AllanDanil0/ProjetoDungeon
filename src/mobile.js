/* Android shell hooks: no native bridge, permissions or network dependencies. */
(function(){
 if(!navigator.userAgent.includes('RUBRAAndroid'))return;
 document.body.classList.add('android');
 const suspend=()=>{clearInput();if(state==='playing')togglePause();if(run&&['paused','upgrade'].includes(state))snapshot();};
 const back=()=>{clearInput();if(state==='playing'){togglePause();return;}if(state==='paused'){togglePause();return;}const ids={characters:'charactersBack',maps:'mapsBack',armory:'armoryBack',options:'closeOptions',help:'closeHelp',bestiary:'bestiaryBack',musicLibrary:'musicBack',report:'reportBack',laboratory:'labCampaign',victory:'endMenuButton',gameover:'endMenuButton'};if(ids[state])document.getElementById(ids[state])?.click();};
 window.RubraMobile={suspend,back};
 document.addEventListener('visibilitychange',()=>{if(document.hidden)suspend();});
 const refresh=()=>document.body.dataset.mobilePlaying=String(state==='playing');
 new MutationObserver(refresh).observe(document.getElementById('pause'),{attributes:true,attributeFilter:['class']});
 setInterval(refresh,200);refresh();
})();
