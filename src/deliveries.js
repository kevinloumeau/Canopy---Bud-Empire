// Delivery requests: web orders that wait to be dispatched. Pure functions over the save so they can be tested.
export const REQUEST_BASE_CAP=12, REQUEST_MAX_CAP=40, REQUEST_MAX_RATE=.2, REQUEST_BASE_SECONDS=45;
export function requestCap(completed){return REQUEST_BASE_CAP+Math.min(REQUEST_MAX_CAP-REQUEST_BASE_CAP,Math.floor(Math.max(0,completed||0)/10));}
// One request every 45s at first, faster with completed orders, never faster than one every 5s. No order desk, no requests.
export function requestRate(completed,deskLevel){return deskLevel>0?Math.min(REQUEST_MAX_RATE,(1+Math.max(0,completed||0)/20)/REQUEST_BASE_SECONDS):0;}
export function accrueRequests(state,seconds){const cap=requestCap(state.onlineCompleted);state.onlineRequests=Math.min(cap,Math.max(0,(state.onlineRequests||0)+requestRate(state.onlineCompleted,state.lines&&state.lines[4])*Math.max(0,seconds||0)));return state.onlineRequests;}
export function requestsReady(state){return Math.floor(Math.max(0,state.onlineRequests||0));}
export function consumeRequests(state,count){state.onlineRequests=Math.max(0,(state.onlineRequests||0)-Math.max(0,count||0));return state.onlineRequests;}
export function requestHeat(count){return count>=6?3:count>=3?2:count>=1?1:0;}
