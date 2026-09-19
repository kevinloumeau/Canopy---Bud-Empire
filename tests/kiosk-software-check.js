// Run in an isolated, paused browser fixture with $200,000, no kiosks and software level 0.
export async function runKioskSoftwareChecks(){
  const $=selector=>document.querySelector(selector);
  const saved=()=>JSON.parse(localStorage.getItem('shift-save'));
  const check=(condition,message)=>{if(!condition)throw new Error(message)};
  const click=selector=>{const button=$(selector);check(button&&!button.disabled,'Available control: '+selector);button.click()};
  check(saved().gameSpeed===0&&saved().money===200000&&!saved().kiosk&&saved().kioskSpeedLevel===0,'Fresh paused kiosk fixture');
  if($('[data-pane="boosts"]').hidden||$('#sheet').classList.contains('collapsed'))click('[data-tray="boosts"]');
  click('[data-shop-category="1"]');
  function paired(){
    const hardware=$('#buyKiosk').closest('.shop-item'),software=$('#componentBuy5').closest('.shop-item');
    check(hardware.nextElementSibling===software,'Hardware and software are adjacent in reading order');
    const a=hardware.getBoundingClientRect(),b=software.getBoundingClientRect();
    check(Math.abs(a.top-b.top)<1&&b.left>=a.right,'Kiosk cards are side by side');
  }
  paired();
  check($('#componentBuy5').disabled,'Software is disabled without a kiosk');
  check($('#componentBenefit5').textContent==='Install a kiosk first','Software explains its prerequisite');
  // Deliberately bypass the disabled button to verify the purchase handler also enforces the rule.
  $('#componentBuy5').onclick();
  check(saved().money===200000&&saved().kioskSpeedLevel===0,'Blocked software purchase preserves cash and level');
  click('#buyKiosk');
  check(saved().kiosk&&saved().money===175000,'First kiosk costs $25,000');
  check(!$('#componentBuy5').disabled,'Installing a kiosk unlocks its software immediately');
  click('#componentBuy5');
  check(saved().kioskSpeedLevel===1&&saved().money===172000,'Software charges $3,000 for the first level');
  check($('#componentBenefit5').textContent.includes('+15% → +30%'),'Software preview advances');
  click('#buyKiosk');click('#buyKiosk');paired();
  check(saved().thirdKiosk&&saved().money===22000,'Remaining hardware tiers retain their prices');
  check($('#buyKiosk').disabled&&!$('#componentBuy5').disabled,'Maxed hardware leaves software available beside it');
  check(document.documentElement.scrollWidth<=innerWidth,'No page overflow');
  return {passed:true,viewport:[innerWidth,innerHeight],cash:saved().money,kiosks:3,softwareLevel:saved().kioskSpeedLevel};
}
