import http from 'node:http';import { readFile } from 'node:fs/promises';import { fileURLToPath } from 'node:url';
import { buildHandoff,SAMPLE_NOTES } from './core.js';
import {createLiveGate} from './live-limit.js';
const files={'/':['index.html','text/html; charset=utf-8'],'/app.js':['app.js','text/javascript; charset=utf-8'],'/style.css':['style.css','text/css; charset=utf-8']};
export function createServer() { const gate=createLiveGate();return http.createServer(async(req,res)=>{
  const reply=(status,data)=>{res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(data));};
  res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Content-Security-Policy',"default-src 'self'; connect-src 'self'; style-src 'self'; script-src 'self'; base-uri 'none'; frame-ancestors 'none'");
  if(req.method==='GET'&&req.url==='/api/status') return reply(200,{live_ready:!!process.env.NEBIUS_API_KEY,sample:SAMPLE_NOTES});
  if(req.method==='GET'&&files[req.url]) {const [name,type]=files[req.url];res.writeHead(200,{'Content-Type':type});return res.end(await readFile(new URL(`../public/${name}`,import.meta.url)));}
  if(req.method==='POST'&&req.url==='/api/handoff') {
    const origin=req.headers.origin; if(origin&&origin!==`http://${req.headers.host}`&&origin!==`https://${req.headers.host}`) return reply(403,{error:'Cross-origin request rejected.'});
    let body='';let release;try { for await(const chunk of req) { body+=chunk;if(Buffer.byteLength(body)>128000) return reply(413,{error:'Request too large.'}); }const input=JSON.parse(body);if(input.mode==='live'){try{release=gate.enter();}catch(e){return reply(429,{error:e.message});}}return reply(200,await buildHandoff(input)); }catch(e){return reply(400,{error:e.message});}finally{release?.();}
  }
  reply(404,{error:'Not found.'});
});}
if(process.argv[1]===fileURLToPath(import.meta.url)){const port=Number(process.env.PORT||4311);createServer().listen(port,process.env.HOST||'127.0.0.1',()=>console.log(`Handoff Ledger: http://localhost:${port}`));}
