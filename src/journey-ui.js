import {CHAPTERS,currentChapter} from './journey.js';

export function mountJourney({getState,navigate}) {
  // The story sits under the shift goals in the Goals tab as one compact card; the whole card is the chapter's action.
  const root=document.createElement('button');root.type='button';root.className='shop-story';root.id='storyAction';
  root.innerHTML='<span class="story-copy"><small>Shop story <span id="storyChapter"></span></small><b id="storyTitle"></b><span class="story-task"><span id="storyTask"></span><b id="storyCount"></b></span><progress id="storyProgress" max="100" aria-hidden="true"></progress></span><span class="story-go" aria-hidden="true">›</span>';
  document.querySelector('.goals-body').append(root);
  const $=id=>root.querySelector('#'+id);let signature='';
  root.onclick=()=>{const chapter=currentChapter(getState());navigate(chapter?chapter.destination:'empire');};
  function render(){
    const s=getState(),chapter=currentChapter(s),completed=s.journey.completed;
    const sig=completed.join('|')+':'+(chapter?chapter.progress:'done');if(sig===signature)return;signature=sig;
    const title=chapter?chapter.title:'A neighborhood of your own';
    $('storyTitle').textContent=title;$('storyChapter').textContent=chapter?'· '+(chapter.index+1)+' / '+CHAPTERS.length:'· Complete';
    $('storyTask').textContent=chapter?chapter.task:'Every neighborhood has a familiar face.';
    $('storyCount').textContent=chapter?chapter.progress+' / '+chapter.target:'';
    $('storyProgress').hidden=!chapter;$('storyProgress').value=chapter?chapter.progress/chapter.target*100:100;
    root.setAttribute('aria-label',chapter?'Shop story, chapter '+(chapter.index+1)+' of '+CHAPTERS.length+': '+title+'. '+chapter.task+', '+chapter.progress+' of '+chapter.target+'. '+chapter.action:'Shop story complete. Return to your empire');
  }
  render();return {render};
}
