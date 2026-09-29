import {CHAPTERS,currentChapter} from './journey.js';

export function mountJourney({getState,navigate,openGoals}) {
  const root=document.createElement('section');root.className='shop-story';root.setAttribute('aria-label','Your shop story');
  root.innerHTML='<div class="story-heading"><h3 id="storyTitle"></h3><span id="storyChapter"></span></div><div class="story-path" aria-hidden="true">'+CHAPTERS.map(()=>'<i></i>').join('')+'</div><p id="storyText"></p><div class="story-task"><span id="storyTask"></span><b id="storyCount"></b></div><progress id="storyProgress" max="100" aria-label="Current chapter progress"></progress><button type="button" id="storyAction"></button>';
  document.querySelector('.goals-story-view').prepend(root);
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
  }
  render();return {render};
}
