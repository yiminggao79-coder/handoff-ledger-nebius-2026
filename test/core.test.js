import test from 'node:test';
import assert from 'node:assert/strict';
import { parseNotes, validateBrief, buildHandoff, SAMPLE_NOTES } from '../src/core.js';
test('stable note IDs ignore empty lines',()=>assert.deepEqual(parseNotes('one\n\n two').map(n=>n.id),['N1','N2']));
test('empty and oversized input is rejected',()=>{assert.throws(()=>parseNotes(''));assert.throws(()=>parseNotes('a'.repeat(24001)));});
test('unknown citations and uncited actions fail closed',()=>{
 const notes=parseNotes('one');
 assert.throws(()=>validateBrief({summary:'x',actions:[{title:'Check',priority:'high',evidence:['N99']}],open_questions:[]},notes),/N99/);
 assert.throws(()=>validateBrief({summary:'x',actions:[{title:'Check',priority:'high',evidence:[]}],open_questions:[]},notes),/evidence/);
});
test('fixture is explicitly synthetic and stays bound to sample input',async()=>{
 const r=await buildHandoff({notes:SAMPLE_NOTES,mode:'fixture'});
 assert.equal(r.provenance.mode,'fixture');assert.equal(r.validation.cited_actions,r.brief.actions.length);
 await assert.rejects(buildHandoff({notes:'other incident',mode:'fixture'}),/sample/);
});
test('live missing credentials never falls back to fixture',async()=>await assert.rejects(buildHandoff({notes:SAMPLE_NOTES,mode:'live'},{env:{}}),/NEBIUS_API_KEY/));
test('live verifies NVIDIA model catalog, records served model and validates output',async()=>{
 const calls=[];const fetcher=async(url,opts)=>{calls.push({url,opts});return {ok:true,json:async()=>url.endsWith('/models')?{data:[{id:'nvidia/test'}]}:{model:'nvidia/test',usage:{total_tokens:40},choices:[{finish_reason:'stop',message:{content:JSON.stringify({summary:'Check rollback recovery.',actions:[{title:'Verify metrics',priority:'high',owner:'Unassigned',evidence:['N2']}],open_questions:['Root cause unverified.']})}}]}};};
 const r=await buildHandoff({notes:SAMPLE_NOTES,mode:'live'},{env:{NEBIUS_API_KEY:'unit-test-only',NEBIUS_MODEL:'nvidia/test'},fetcher});
 assert.equal(calls.length,2);assert.equal(r.provenance.served_model,'nvidia/test');assert.equal(r.provenance.mode,'live');
 assert.equal(calls[1].opts.redirect,'error');assert.ok(!JSON.stringify(r).includes('unit-test-only'));
});
test('wrong served identity and truncated generation are rejected',async()=>{
 const env={NEBIUS_API_KEY:'unit-test-only',NEBIUS_MODEL:'nvidia/test'};
 const fetcher=async(url)=>({ok:true,json:async()=>url.endsWith('/models')?{data:[{id:env.NEBIUS_MODEL}]}:{model:'nvidia/other',choices:[{finish_reason:'length',message:{content:'{}'}}]}});
 await assert.rejects(buildHandoff({notes:SAMPLE_NOTES,mode:'live'},{env,fetcher}),/model|truncat/);
});
test('untrusted endpoint cannot receive a credential',async()=>{
 let called=false; await assert.rejects(buildHandoff({notes:SAMPLE_NOTES,mode:'live'},{env:{NEBIUS_API_KEY:'x',NEBIUS_BASE_URL:'https://attacker.example/v1'},fetcher:()=>{called=true;}}),/endpoint/);assert.equal(called,false);
});
