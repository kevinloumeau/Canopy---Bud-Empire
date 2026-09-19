// Browser-only regression check for a paused, isolated fixture with $20,000,
// legacy counter data, Orders level 1 and Orders staff level 0.
export async function runOrderCounterChecks(){
  const $=selector=>document.querySelector(selector);
  const save=()=>JSON.parse(localStorage.getItem('shift-save'));
  const check=(value,message)=>{if(!value)throw new Error(message)};
  const click=async selector=>{const button=$(selector);check(button&&!button.disabled,'Available control: '+selector);button.click();await new Promise(resolve=>setTimeout(resolve,280))};
  check(save().gameSpeed===0,'Fixture is paused');check(save().money===20000,'Fixture has exactly $20,000');
  await click('#markers button:nth-child(5)');
  check(save().orderCounters===1,'Legacy save starts with one counter');
  const expansion=$('#orderCounterExpansion').getBoundingClientRect(),upgrade=$('.station-upgrade').getBoundingClientRect();
  check(expansion.top>=upgrade.bottom,'Counter expansion follows the main station upgrades');
  check($('#orderCounterSlots').children.length===3&&$('#orderCounterSlots .is-open')!==null,'Three visual counter slots show the initial staffed counter');
  await click('#expandOrderCounter');check(save().orderCounters===2&&save().money===17500,'Second counter charges $2,500');
  check(document.querySelectorAll('#orderCounterSlots .is-open').length===2,'Expansion opens a second visual slot');
  await click('[data-tray="boosts"]');await click('[data-shop-category="1"]');
  await click('#buyOrderCounter');check(save().orderCounters===3&&save().money===5000,'Third counter charges $12,500');
  check($('#expandOrderCounter').disabled&&$('#buyOrderCounter').disabled,'Both controls cap at three');
  check($('#expandOrderCounter').hidden&&document.querySelectorAll('#orderCounterSlots .is-open').length===3,'Completed expansion shows three staffed slots without a redundant button');
  $('#expandOrderCounter').click();check(save().money===5000,'A maxed purchase cannot charge again');
  await click('[data-tray="employees"]');await click('[data-staff="4"]');
  check(save().staff[4]===1&&save().orderCounters===3,'Orders training retains the whole counter team');
  await click('[data-tray="factory"]');await click('#markers button:nth-child(5)');await click('#buyMachine');
  check(save().lines[4]===2&&save().orderCounters===3,'Station upgrades retain expanded counters');
  await click('#zoomIn');await click('#centerView');
  check(document.documentElement.scrollWidth<=innerWidth,'No horizontal overflow');
  return {passed:true,viewport:[innerWidth,innerHeight],saved:{money:save().money,counters:save().orderCounters,orders:save().lines[4],staff:save().staff[4]}};
}
