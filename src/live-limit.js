// A small global demo budget, not a replacement for provider-side spending caps.
export function createLiveGate(env=process.env, now=Date.now) {
 const read=(name,fallback)=>{const raw=env[name]??String(fallback);if(!/^[1-9]\d*$/.test(raw)||!Number.isSafeInteger(Number(raw)))throw new Error(`${name} must be a positive integer.`);return Number(raw);};
 const hourly=read('LIVE_HOURLY_LIMIT',12),daily=read('LIVE_DAILY_LIMIT',48);
 const requests=[];let active=false;let last=-Infinity;
 return {enter(){const t=now();while(requests.length&&requests[0]<=t-86400000)requests.shift();
  if(active||t-last<15000)throw new Error('Live demo is busy or cooling down. Retry in 15 seconds.');
  if(requests.length>=daily||requests.filter(s=>s>t-3600000).length>=hourly)throw new Error('The shared live demo budget is exhausted. Retry later; fixture preview remains available.');
  requests.push(t);last=t;active=true;let released=false;return ()=>{if(!released){active=false;released=true;}};
 }};
}
