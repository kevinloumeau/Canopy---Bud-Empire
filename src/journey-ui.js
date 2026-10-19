import {CHAPTERS,currentChapter} from './journey.js';

export function mountJourney({getState,navigate,openGoals}) {
  // The story sits under the shift goals as one compact card; the whole card is the chapter's action.
  const root=document.createElement('button');root.type='button';root.className='shop-story';root.id='storyAction';
  root.innerHTML='<span class="story-copy"><small>Shop story <span id="storyChapter"></span></small><b id="storyTitle"></b><span class="story-task"><span id="storyTask"></span><b id="storyCount"></b></span><progress id="storyProgress" max="100" aria-hidden="true"></progress></span><span class="story-go" aria-hidden="true">›</span>';
  document.querySelector('.goals-body').append(root);
  const entry=document.createElement('button');entry.type='button';entry.className='story-entry';
  entry.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 20V4h14v16M5 17h14M9 4v8l3-2 3 2V4"/></svg><span><small>Your shop story</small><b></b></span><span class="story-entry-count"></span><span aria-hidden="true">›</span>';
  document.querySelector('[data-screen=home]').prepend(entry);entry.onclick=openGoals;
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
    entry.querySelector('b').textContent=title;entry.querySelector('.story-entry-count').textContent=completed.length+'/'+CHAPTERS.length;
  }
  render();return {render};
}
