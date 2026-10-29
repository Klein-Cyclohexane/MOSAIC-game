(() => {
  const viewport=document.getElementById('circuit-viewport'), canvas=document.getElementById('mosaic-allprinciple-animation');
  const mobile=matchMedia('(max-width:720px)'), choices=document.getElementById('choices'), message=document.getElementById('stage-message');
  let previous='';
  function zoom(delta){
    const before=canvas.getBoundingClientRect().width;
    const center=(viewport.scrollLeft+viewport.clientWidth/2)/before;
    const next=Math.max(viewport.clientWidth,Math.min(1120,before+delta));
    if(next===viewport.clientWidth)canvas.style.removeProperty('--circuit-width');
    else canvas.style.setProperty('--circuit-width',next+'px');
    viewport.scrollLeft=center*next-viewport.clientWidth/2;
  }
  document.getElementById('zoom-in').onclick=()=>zoom(160);
  document.getElementById('zoom-out').onclick=()=>zoom(-160);
  document.getElementById('restart').onclick=()=>{window.MOSAIC_ALLPRINCIPLE.restartFromCre();window.scrollTo({top:0,behavior:'smooth'});};
  document.getElementById('restart-bxb').onclick=()=>window.MOSAIC_ALLPRINCIPLE.restartFromBxb1();
  function update(){
    const api=window.MOSAIC_ALLPRINCIPLE;if(!api)return;
    const data=api.getState(),state=data.state,available=api.getChoices();
    const labels={CRE_EXPRESSION:'Watch Cre expression…',CRE_GUIDE:'Follow the Cre circuit…',CRE_SITE_REVEAL:'The recombination sites are appearing…',CRE_SELECT_LOX:'Step 1 · Choose one lox71 site',CRE_RECOMBINATION:'Cre is inverting the DNA…',CRE_OUTCOME:'Your first circuit is ready…',BXB1_EXPRESSION:'Watch Bxb1 expression…',BXB1_GUIDE:'Follow the Bxb1 circuit…',BXB1_SELECT_ATT:data.selectedAtts.length?'Step 2 · Choose a second site':'Step 2 · Choose two att sites',BXB1_INVALID_PAIR:'Two attB sites cannot recombine. Try an attB + attP pair.',BXB1_RECOMBINATION:'Recombining your selected pair…',FINAL_OUTCOME:'Your circuit is complete! Try another combination.'};
    message.textContent=state==='FINAL_OUTCOME'&&data.currentBxb1Outcome?'Outcome · You obtained a '+data.currentBxb1Outcome.outcome+' cell. Try another combination.':labels[state]||'Watch the circuit…';choices.replaceChildren();
    available.forEach((choice,i)=>{const button=document.createElement('button');button.textContent=state==='CRE_SELECT_LOX'?'lox71 · '+choice.position:choice.label.replace('Select ','')+' · '+choice.position;button.style.setProperty('--choice-color',choice.color||'#c6da58');button.onclick=()=>api.choose(choice.id);choices.append(button);});
    document.getElementById('restart-bxb').hidden=state!=='FINAL_OUTCOME';
    if(mobile.matches&&state!==previous){
      if(state==='BXB1_SELECT_ATT'||state==='FINAL_OUTCOME'){
        const layer=canvas.querySelector('[data-layer="'+(state==='FINAL_OUTCOME'?'final':'bxbGuide')+'"]');
        if(layer){const rect=layer.getBoundingClientRect();window.scrollBy({top:rect.top-innerHeight*.38,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});}
      }
    }
    previous=state;
  }
  window.addEventListener('mosaic:state',update);update();
})();