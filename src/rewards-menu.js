// One place for every claim. No tabs: rewards, shift goals and the current chapter sit in a single short list, and
// "Collect all" claims everything that is ready in one tap. The original controls stay mounted (hidden) and keep their
// handlers and save behaviour; each row here forwards its tap to the original.
export function mountRewardsMenu(){
 const $=id=>document.getElementById(id),modal=$('goalsModal'),body=modal.querySelector('.goals-body');
 const goals=document.createElement('div');goals.className='goals-story-view';
 while(body.firstChild)goals.append(body.firstChild);
 const stash=document.createElement('div');stash.hidden=true;
 for(const source of [document.querySelector('[data-empire-section=daily]'),document.querySelector('[data-empire-section=events]'),document.querySelector('.shop-milestone')])stash.append(source);
 const collectAll=document.createElement('button');collectAll.type='button';collectAll.className='collect-all';collectAll.hidden=true;
 const rewards=document.createElement('section');rewards.className='reward-rows';rewards.setAttribute('aria-labelledby','rewardRowsTitle');
 rewards.innerHTML='<h3 id="rewardRowsTitle">Rewards</h3>';
 const rows=[
  {id:'dailyClaim',name:()=>'Daily reward',text:()=>$('dailyTitle').textContent,label:()=>$('dailyClaim').textContent},
  {id:'eventAction',name:()=>$('eventName').textContent,text:()=>$('eventCount').textContent,label:()=>$('eventAction').textContent},
  {id:'claim',name:()=>'Milestone bonus',text:()=>$('orderName').textContent.toLowerCase().replace(/^./,c=>c.toUpperCase())+' · '+$('orderProgress').textContent,
   label:()=>$('claim').disabled?($('orderProgress').textContent==='COMPLETE'?'Done':'Not yet'):'Collect '+$('claimReward').textContent.replace('+','')}
 ].map(r=>{
  const row=document.createElement('div');row.className='reward-row';
  const copy=document.createElement('div'),title=document.createElement('strong'),sub=document.createElement('small');copy.append(title,sub);
  const button=document.createElement('button');button.type='button';button.onclick=()=>$(r.id).click();
  row.append(copy,button);rewards.append(row);return {...r,row,titleEl:title,subEl:sub,button};
 });
 body.append(collectAll,rewards,goals,stash);
 const ids=['dailyClaim','eventAction','claim','goalClaim0','goalClaim1','goalClaim2'];
 const readyIds=()=>ids.filter(id=>{const b=$(id);return b&&!b.disabled&&!b.hidden&&/^Collect\b/.test(b.textContent.trim())});
 collectAll.onclick=()=>{readyIds().forEach(id=>{const b=$(id);if(b&&!b.disabled)b.click()});requestAnimationFrame(sync)};
 function put(node,text){if(node.textContent!==text)node.textContent=text}
 function sync(){
  if(document.hidden)return;
  const ready=readyIds();
  $('goalsBadge').textContent=ready.length;$('goalsBadge').hidden=!ready.length;
  $('goalsOpen').classList.toggle('has-ready',ready.length>0);
  $('goalsOpen').setAttribute('aria-label','Goals and rewards'+(ready.length?', '+ready.length+' ready to collect':''));
  collectAll.hidden=ready.length<2;
  put(collectAll,'Collect all · '+ready.length+' ready');
  for(const r of rows){
   const src=$(r.id),isReady=ready.includes(r.id);
   put(r.titleEl,r.name());put(r.subEl,r.text());put(r.button,r.label());
   r.button.disabled=src.disabled;r.button.classList.toggle('is-ready',isReady);r.row.classList.toggle('is-ready',isReady);
  }
 }
 modal.addEventListener('click',()=>requestAnimationFrame(sync));setInterval(sync,250);sync();
}
