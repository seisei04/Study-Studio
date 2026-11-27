const storageKey='study-studio-v2';
const emptyState=()=>({version:2,name:'',theme:'system',last:'',progress:{},projects:{},tasks:[],notes:[],saved:[],activity:{},editor:null});
const dayKey=(d=new Date())=>[d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-');
const record=x=>x!==null && typeof x==='object' && !Array.isArray(x);
const str=x=>typeof x==='string';
function validState(s){
 const strings=(o,keys)=>keys.every(k=>o[k]===undefined||str(o[k]));
 return record(s)&&s.version===2&&str(s.name)&&['system','dark','light'].includes(s.theme)&&str(s.last)&&(!s.last||lookup(s.last))&&
 record(s.progress)&&Object.entries(s.progress).every(([id,v])=>lookup(id)&&record(v)&&strings(v,['attempt','notes','date'])&&(v.review===undefined||Array.isArray(v.review)&&new Set(v.review).size===v.review.length&&v.review.every(n=>Number.isInteger(n)&&n>=0&&n<4))&&['passed','done','solved'].every(k=>v[k]===undefined||typeof v[k]==='boolean'))&&
 record(s.projects)&&Object.entries(s.projects).every(([k,v])=>projects.some(p=>p.title===k)&&record(v)&&Array.isArray(v.steps)&&v.steps.every(x=>Number.isInteger(x)&&x>=0&&x<projects.find(p=>p.title===k).steps.length)&&strings(v,['notes','url']))&&
 Array.isArray(s.tasks)&&s.tasks.every(t=>record(t)&&['id','title','date','area','priority'].every(k=>str(t[k]))&&typeof t.done==='boolean')&&
 Array.isArray(s.notes)&&s.notes.every(n=>record(n)&&['id','title','text','area','tags','kind'].every(k=>str(n[k])))&&
 Array.isArray(s.saved)&&s.saved.every(x=>str(x)&&lookup(x.replace(/^resource:/,'')))&&record(s.activity)&&Object.entries(s.activity).every(([k,v])=>/^\d{4}-\d{2}-\d{2}$/.test(k)&&Number.isFinite(v)&&v>=0)&&
 (s.editor===null||record(s.editor)&&['html','css','js'].every(k=>str(s.editor[k])));
}
let storageMessage='';
function loadState(){
 try{
  const raw=localStorage.getItem(storageKey);
  if(raw){const s=JSON.parse(raw);if(!validState(s))throw Error();return s;}
  const old=JSON.parse(localStorage.getItem('study-studio-v1')||'{}'),s=emptyState();
  for(const l of lessons.filter(l=>l.legacy)){
   const v=old?.[l.legacy];if(!record(v))continue;
   s.progress[l.id]={notes:str(v.notes)?v.notes:'',attempt:str(v.attempt)?v.attempt:'',passed:!!v.passed,done:!!v.done,solved:!!v.practiceSolved};
   if(l.legacy===old.track+old.index)s.last=l.id;
  }
  return s;
 }catch{storageMessage='Saved data could not be read. Export a backup before resetting your workspace.';return emptyState();}
}
let state=loadState();
function save(){try{localStorage.setItem(storageKey,JSON.stringify(state));}catch{document.querySelector('#notice').textContent='Storage is unavailable. Export your work before closing this tab.';}}
