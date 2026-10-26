import assert from 'node:assert/strict';import {writeFile,mkdir} from 'node:fs/promises';import {createServer} from '../src/server.js';
const server=createServer();await new Promise(r=>server.listen(0,'127.0.0.1',r));const base=`http://127.0.0.1:${server.address().port}`;let count=0;
try{const status=await(await fetch(`${base}/api/status`)).json();assert.ok(status.sample);count++;
const html=await(await fetch(base)).text();assert.match(html,/Handoff Ledger/);count++;
const post=(value,headers={})=>fetch(`${base}/api/handoff`,{method:'POST',headers:{'Content-Type':'application/json',...headers},body:JSON.stringify(value)});
const response=await post({notes:status.sample,mode:'fixture'});assert.equal(response.status,200);const data=await response.json();assert.equal(data.provenance.mode,'fixture');assert.equal(data.brief.actions.length,3);count++;
assert.equal((await post({notes:'another incident',mode:'fixture'})).status,400);count++;
assert.equal((await post({notes:status.sample,mode:'fixture'},{Origin:'https://other.example'})).status,403);count++;
assert.equal((await fetch(`${base}/.env`)).status,404);count++;
assert.equal((await fetch(`${base}/app.js`)).status,200);count++;
const evidence={created_at:new Date().toISOString(),checks:count,mode:'fixture',sponsor_live_tested:false,result:data};const path=new URL('../artifacts/smoke-evidence.json',import.meta.url);await mkdir(new URL('../artifacts/',import.meta.url),{recursive:true});await writeFile(path,JSON.stringify(evidence,null,2));console.log(JSON.stringify({checks:count,passed:true,sponsor_live_tested:false,evidence:path.pathname}));
}finally{await new Promise(r=>server.close(r));}
