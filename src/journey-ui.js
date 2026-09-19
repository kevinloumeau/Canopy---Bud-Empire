import {CHAPTERS,currentChapter} from './journey.js';

export function mountJourney({getState,navigate,openGoals}) {
  const root=document.createElement('section');root.className='shop-story';root.setAttribute('aria-label','Your shop story');
  root.innerHTML='<div class="story-heading"><h3 id="storyTitle"></h3><span id="storyChapter"></span></div><div class="story-path" aria-hidden="true">'+CHAPTERS.map(()=>'<i></i>').join('')+'</div><p id="storyText"></p><div class="story-task"><span id="storyTask"></span><b id="storyCount"></b></div><progress id="storyProgress" max="100" aria-label="Current chapter progress"></progress><button type="button" id="storyAction"></button><details class="story-history"><summary>Earlier chapters</summary><ol></ol></details>';
  document.querySelector('.goals-body').prepend(root);
  const entry=document.createElement('button');entry.type='button';entry.className='story-entry';
  entry.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 20V4h14v16M5 17h14M9 4v8l3-2 3 2V4"/></svg><span><small>Your shop story</small><b></b></span><span class="story-entry-count"></span><span aria-hidden="true">›</span>';
  document.querySelector('[data-screen=home]').prepend(entry);entry.onclick=openGoals;
  const $=id=>root.querySelector('#'+id);let signature='';
  $('storyAction').onclick=()=>{const chapter=currentChapter(getState());navigate(chapter?chapter.destination:'empire');};
  function render(){
    const s=getState(),chapter=currentChapter(s),completed=s.journey.completed;
    const sig=completed.join('|')+':'+(chapter?chapter.progress:'done');if(sig===signature)return;signature=sig;
    const title=chapter?chapter.title:'A neighborhood of your own';
    $('storyTitle').textContent=title;$('storyChapter').textContent=chapter?(chapter.index+1)+' / '+CHAPTERS.length:'Complete';
    $('storyText').textContent=chapter?chapter.story:'The first chapter of Canopy is written. Keep developing your stores, friendships and flagship collection. There is still room to grow.';
    $('storyTask').textContent=chapter?chapter.task:'Every neighborhood has a familiar face.';
    $('storyCount').textContent=chapter?chapter.progress+' / '+chapter.target:'';
    $('storyProgress').hidden=!chapter;$('storyProgress').value=chapter?chapter.progress/chapter.target*100:100;
    $('storyProgress').setAttribute('aria-valuetext',chapter?chapter.task+': '+chapter.progress+' of '+chapter.target:'All chapters complete');
    $('storyAction').textContent=chapter?chapter.action:'Return to your empire';
    root.querySelectorAll('.story-path i').forEach((el,i)=>{el.classList.toggle('done',completed.includes(CHAPTERS[i].id));el.classList.toggle('current',!!chapter&&i===chapter.index)});
    const history=root.querySelector('.story-history');history.hidden=!completed.length;
    history.querySelector('ol').innerHTML=CHAPTERS.filter(c=>completed.includes(c.id)).map(c=>'<li><b>'+c.title+'</b><p>'+c.memory+'</p></li>').join('');
    entry.querySelector('b').textContent=title;entry.querySelector('.story-entry-count').textContent=completed.length+'/'+CHAPTERS.length;
  }
  render();return {render};
}
