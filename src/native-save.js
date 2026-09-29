// Start the native write in the same turn as the save, including background departure.
// Keep only the newest waiting snapshot while a previous bridge call is in flight.
export function createNativeSaveWriter(store,key){
  let busy=false,pending=null;
  function drain(){
    if(!store||busy||pending===null)return;
    const value=pending;pending=null;busy=true;
    let result;
    try{result=store.set({key,value})}catch{busy=false;return}
    Promise.resolve(result).catch(()=>{}).finally(()=>{busy=false;drain()});
  }
  return value=>{pending=value;drain()};
}
