const page=document.querySelector('#page');
const groups={'Workspace':['Dashboard','My Learning','Study Planner','My Progress'],'Learning academies':Object.keys(academies),'Practice & resources':['Code Playground','Project Laboratory','My Notes','Quizzes and Exercises','Saved Resources','Achievements'],'Personal':['Settings','Appearance','Data Management']};
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const url=(...parts)=>'#'+parts.map(encodeURIComponent).join('/');
const link=(label,...parts)=>'<a class="btn" href="'+url(...parts)+'">'+esc(label)+'</a>';
const action=(label,fn,value='')=>'<button data-action="'+fn+'" data-value="'+esc(value)+'">'+esc(label)+'</button>';
const card=(title,body)=>'<div class="card"><h3>'+esc(title)+'</h3>'+body+'</div>';
const grid=html=>'<div class="grid">'+html+'</div>';
const section=(title,body)=>'<section><h2>'+esc(title)+'</h2>'+body+'</section>';
const heading=(title,sub='')=>'<section><h1>'+esc(title)+'</h1><p>'+esc(sub)+'</p></section>';
const list=rows=>rows.length?'<div class="list">'+rows.map(x=>'<div class="item">'+x+'</div>').join('')+'</div>':'<p>No items yet.</p>';
const areaLessons=a=>lessons.filter(l=>l.area===a);
const completed=()=>lessons.filter(l=>state.progress[l.id]?.done);
const resume=a=>areaLessons(a).find(l=>l.id===state.last)||areaLessons(a).find(l=>!state.progress[l.id]?.done)||areaLessons(a)[0];
const lessonLink=(l,label=l.title,tab='Learn')=>link(label,'Lesson',l.id,tab);
const pct=(n,t)=>Math.round(n*100/t)||0;
const progress=(n,t)=>'<progress aria-label="Completion" max="'+t+'" value="'+n+'"></progress><small>'+n+' / '+t+' complete · '+pct(n,t)+'%</small>';
const projectDone=p=>p.steps.every((_,i)=>state.projects[p.title]?.steps.includes(i));
function streak(){let d=new Date(),n=0;if(!state.activity[dayKey(d)])d.setDate(d.getDate()-1);while(state.activity[dayKey(d)]){n++;d.setDate(d.getDate()-1);}return n;}
function badges(){const done=completed();return [
 ['First lesson',done.length>0],['HTML beginner',done.some(l=>l.title==='HTML Fundamentals')],['CSS explorer',done.some(l=>l.title==='CSS Fundamentals')],['JavaScript starter',done.some(l=>l.title==='JavaScript Introduction')],['Figma beginner',done.some(l=>l.area==='Figma')],['First prototype',done.some(l=>l.module==='Practical design projects')],['First web application',projects.slice(0,6).some(projectDone)],['First Flutter app',projects.filter(p=>p.title==='Flutter study dashboard').some(projectDone)],['First mobile application',projects.filter(p=>p.title==='Mobile Expense Tracker').some(projectDone)],['Full-stack milestone',projects.filter(p=>p.level==='Advanced'&&p.title.includes('Full-Stack')).some(projectDone)] ]; }
function metrics(){const done=completed().length;return '<div class="metrics">'+[[done,'Lessons complete'],[new Set(lessons.filter(l=>state.progress[l.id]).map(l=>l.module)).size,'Active courses'],[pct(done,lessons.length)+'%','Overall progress'],[Math.floor(Object.values(state.activity).reduce((a,b)=>a+b,0)/60)+'m','Study time'],[streak(),'Day streak'],[projects.filter(projectDone).length,'Projects finished']].map(([n,s])=>'<div class="metric"><b>'+n+'</b><small>'+s+'</small></div>').join('')+'</div>';}
function academyCards(){return grid(Object.entries(academies).map(([a,v])=>{const ls=areaLessons(a);return '<div class="card"><span class="academyIcon" aria-hidden="true">'+v.icon+'</span><h3>'+v.title+'</h3><p>'+v.description+'</p><small>Beginner to advanced · '+ls.length+' lessons</small>'+progress(ls.filter(l=>state.progress[l.id]?.done).length,ls.length)+'<div class="tabs">'+link('Roadmap',a)+lessonLink(resume(a),'Study')+'</div></div>';}).join(''));}
function activity(){let days=[];for(let i=6;i>=0;i--){let d=new Date();d.setDate(d.getDate()-i);days.push([d.toLocaleDateString(undefined,{weekday:'short'}),state.activity[dayKey(d)]||0]);}const max=Math.max(60,...days.map(d=>d[1]));return '<div class="chart">'+days.map(([d,s])=>'<div><small>'+Math.floor(s/60)+'m</small><i style="height:'+Math.max(2,65*s/max)+'px"></i><small>'+d+'</small></div>').join('')+'</div>';}
function dashboard(){const l=lookup(state.last)||lessons[0],next=areaLessons(l.area).find(x=>!state.progress[x.id]?.done)||l;return '<section class="hero"><div class="art" aria-hidden="true"></div><p class="eyebrow">Design. Develop. Create.</p><h1>Welcome'+(state.name?', '+esc(state.name):' to your studio')+'.</h1><p>Pick up your next lesson and put one idea into practice.</p>'+lessonLink(l,state.last?'Continue learning':'Start learning')+'</section>'+metrics()+section('Your academies',academyCards())+grid(card('Continue learning','<small>'+academies[l.area].title+' / '+esc(l.module)+'</small><h3>'+esc(l.title)+'</h3>'+progress(completed().filter(x=>x.module===l.module).length,lessons.filter(x=>x.module===l.module).length)+lessonLink(l,'Open lesson'))+card('Weekly activity',activity())+card('Today’s goals',list(state.tasks.filter(t=>t.date===dayKey()).map(t=>(t.done?'✓ ':'○ ')+esc(t.title)))+link('Plan study','Study Planner')))+section('Your workspace',grid(card('Recommended next',lessonLink(next))+card('Upcoming tasks',list(state.tasks.filter(t=>!t.done&&t.date>dayKey()).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,3).map(t=>esc(t.date+' · '+t.title))))+card('Recently completed',list(completed().sort((a,b)=>(state.progress[b.id].date||'').localeCompare(state.progress[a.id].date||'')).slice(0,3).map(l=>lessonLink(l))))+card('Active projects',list(projects.filter(p=>state.projects[p.title]&&!projectDone(p)).map(p=>link(p.title,'Project',p.title))))+card('Earned achievements',list(badges().filter(b=>b[1]).map(b=>esc(b[0]))))));}
function theme(){document.documentElement.toggleAttribute('data-dark',state.theme==='dark'||state.theme==='system'&&matchMedia('(prefers-color-scheme: dark)').matches);}
function route(){
 const [view='Dashboard',key='',tab='Learn']=(location.hash.slice(1)||'Dashboard').split('/').map(s=>{try{return decodeURIComponent(s)}catch{return ''}});
 const academy=Object.hasOwn(academies,view);
 const active=view==='Lesson'?lookup(key)?.area:view==='Project'?'Project Laboratory':view;
 document.querySelector('nav').innerHTML=Object.entries(groups).map(([g,items])=>'<h2>'+g+'</h2>'+items.map(k=>'<a '+(active===k?'aria-current="page"':'')+' href="'+url(k)+'">'+(academies[k]?.title||k)+'</a>').join('')).join('');
 document.querySelector('aside').classList.remove('open');document.querySelector('#menu').setAttribute('aria-expanded','false');
 theme();let html;
 if(academy)html=roadmap(view);
 else switch(view){
 case 'Dashboard':html=dashboard();break;
 case 'My Learning':html=heading('My learning')+academyCards()+section('In progress',list(lessons.filter(l=>state.progress[l.id]&&!state.progress[l.id].done).map(l=>lessonLink(l))));break;
 case 'Lesson':html=lookup(key)?lessonPage(lookup(key),tab):heading('Lesson unavailable');break;
 case 'Project Laboratory':html=projectList();break;
 case 'Project':html=projectPage(projects.find(p=>p.title===key));break;
 case 'Study Planner':html=planner();break;
 case 'My Notes':html=notesPage();break;
 case 'Code Playground':html=playground();break;
 case 'Quizzes and Exercises':html=heading(view,'Choose a lesson to practice or check your understanding.')+Object.keys(academies).map(a=>'<details class="panel"><summary>'+academies[a].title+'</summary>'+list(areaLessons(a).map(l=>esc(l.title)+' '+lessonLink(l,'Practice','Practice')+' '+lessonLink(l,'Quiz','Quiz')))+'</details>').join('');break;
 case 'My Progress':html=heading(view)+metrics()+section('Weekly activity',activity())+section('Academy progress',academyCards())+section('Quiz results',list(lessons.filter(l=>typeof state.progress[l.id]?.passed==='boolean').map(l=>lessonLink(l)+' · '+(state.progress[l.id].passed?'1 / 1':'0 / 1'))));break;
 case 'Achievements':html=heading(view,'Earn milestones by completing lessons and projects.')+grid(badges().map(([s,ok])=>card(s,ok?'✓ Earned':'In progress')).join(''))+section('Experience',completed().length*25+projects.filter(projectDone).length*100+' XP · 25 per lesson and 100 per project');break;
 case 'Saved Resources':html=heading(view)+list(state.saved.map(id=>{let l=lookup(id.replace(/^resource:/,''));return (id.startsWith('resource:')?'<a href="'+resource(l)+'">'+esc(l.title)+' documentation</a>':lessonLink(l))+' '+action('Remove','bookmark',id)}));break;
 case 'Settings':case 'Appearance':case 'Data Management':html=settings(view);break;
 default: html=heading('Page unavailable')+link('Dashboard','Dashboard');}
 page.innerHTML=html;document.title=(academy?academies[view].title:view)+' · Study Studio';
 if(view==='Code Playground')runPreview();
}
const actions={};
document.addEventListener('click',e=>{const b=e.target.closest('[data-action]');if(b&&Object.hasOwn(actions,b.dataset.action))actions[b.dataset.action](b.dataset.value,b);});
document.querySelector('#menu').onclick=e=>e.target.setAttribute('aria-expanded',document.querySelector('aside').classList.toggle('open'));
document.querySelector('#today').textContent=new Date().toLocaleDateString(undefined,{weekday:'short',month:'long',day:'numeric'});
document.querySelector('#notice').textContent=storageMessage;
window.addEventListener('hashchange',()=>{route();window.scrollTo(0,0);document.querySelector('main').focus({preventScroll:true});});
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',theme);
let lastTick=Date.now(),timedView=/^#(Lesson\/|Project\/|Code%20Playground)/.test(location.hash);
function tick(){let now=Date.now(),seconds=Math.min(30,Math.floor((now-lastTick)/1000));lastTick=now;if(seconds>0&&!document.hidden&&timedView){const d=dayKey();state.activity[d]=(state.activity[d]||0)+seconds;save();}}
window.addEventListener('hashchange',()=>{tick();timedView=/^#(Lesson\/|Project\/|Code%20Playground)/.test(location.hash);});setInterval(tick,15000);document.addEventListener('visibilitychange',()=>{lastTick=Date.now()});window.addEventListener('pagehide',tick);
installWorkspaceActions();installToolActions();route();
