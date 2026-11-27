function roadmap(area){
 const ls=areaLessons(area);
 return heading(academies[area].title,academies[area].description)+progress(ls.filter(l=>state.progress[l.id]?.done).length,ls.length)+section('Learning roadmap', [...new Set(ls.map(l=>l.module))].map((m,i)=>'<details class="panel" '+(i===0?'open':'')+'><summary>'+esc(m)+' · '+ls.filter(l=>l.module===m).length+' lessons</summary>'+projects.filter(p=>p.module===m).map(p=>link('Project · '+p.title,'Project',p.title)).join('')+list(ls.filter(l=>l.module===m).map(l=>(state.progress[l.id]?.done?'✓ ':'')+lessonLink(l)))+'</details>').join(''));
}
function lessonPage(l,tab){
 const entry=state.progress[l.id]||={};state.last=l.id;save();
 const tabs=['Learn','Practice','Quiz','Resources'];if(!tabs.includes(tab))tab='Learn';
 const p=l.practice,q=l.quiz,ls=areaLessons(l.area),i=ls.indexOf(l);
 let body;
 if(tab==='Learn')body=section('Learning objective','<p>'+esc(l.body)+'</p>')+'<div class="flow">Design → Develop → Test → Launch</div>'+section('Worked example','<pre>'+esc(l.code)+'</pre>')+'<details class="panel"><summary>Think it through</summary>'+esc(l.trace)+'</details>'+section('Apply it','<p>'+esc(l.lab)+'</p>'+lessonLink(l,'Start practice','Practice'));
 if(tab==='Practice')body=section('Practice challenge','<p>'+esc(p[0])+'</p><pre>'+esc(p[1])+'</pre><form id="attemptForm"><label>Your answer<input id="attempt" required value="'+esc(entry.attempt)+'"></label><button class="primary">Check answer</button></form><output id="result" aria-live="polite">'+(entry.solved?esc(p[4]):'')+'</output><details class="panel"><summary>Hint</summary>'+esc(p[3])+'</details>')+section('Workbook','<p>'+esc(l.lab)+'</p><p>'+esc(l.test||'Compare the result to your prediction.')+'</p><label>My observation<textarea id="workbook">'+esc(entry.notes)+'</textarea></label>'+lessonLink(l,'Take quiz','Quiz'));
 if(tab==='Practice'&&l.module==='Practical design projects')body+=section('Design review checklist',figmaTasks.map((text,i)=>'<label class="check"><input type="checkbox" data-design="'+i+'" '+(entry.review?.includes(i)?'checked':'')+'>'+esc(text)+'</label>').join(''));
 if(tab==='Quiz')body=section('Knowledge check','<p>'+esc(q[0])+'</p><div class="row">'+q[1].map((v,i)=>action(v,'answer',i)).join('')+'</div><output aria-live="polite" id="quizResult">'+(entry.passed?'1 / 1 · '+esc(q[3]):entry.passed===false?'0 / 1 · Try again.':'')+'</output>'+action('Retry','retry'));
 if(tab==='Resources')body=section('Further reading','<p><a href="'+resource(l)+'" target="_blank" rel="noreferrer">Official '+esc(l.module)+' documentation ↗</a></p>'+action(state.saved.includes('resource:'+l.id)?'Remove saved resource':'Save resource','bookmark','resource:'+l.id));
 return '<section class="crumb">'+link(academies[l.area].title,l.area)+' / '+esc(l.module)+'</section>'+heading(l.title,l.level+' · About '+(l.legacy?15:8)+' min · '+(entry.done?'Completed':'In progress'))+action(state.saved.includes(l.id)?'Remove bookmark':'Bookmark lesson','bookmark',l.id)+'<div class="tabs">'+tabs.map(t=>'<a class="btn" '+(tab===t?'aria-current="page"':'')+' href="'+url('Lesson',l.id,t)+'">'+t+'</a>').join('')+'</div><article class="card">'+body+'</article><section class="bar">'+(i?lessonLink(ls[i-1],'← Previous'):'')+action(entry.done?'Completed ✓':'Complete lesson','complete')+(i+1<ls.length?lessonLink(ls[i+1],'Next →'):'')+'</section><output id="completion" aria-live="polite"></output>';
}
function projectList(){return heading('Project laboratory','Design, develop, test and launch a project for your portfolio.')+['Beginner','Intermediate','Advanced'].map(level=>section(level,grid(projects.filter(p=>p.level===level).map(p=>card(p.title,'<p>Help a '+esc(p.flow)+'.</p>'+progress(state.projects[p.title]?.steps.length||0,p.steps.length)+link('Open project','Project',p.title))).join('')))).join('');}
function projectPage(p){
 if(!p)return heading('Project unavailable');
 const v=state.projects[p.title]||{steps:[]};
 return link('← Project laboratory','Project Laboratory')+heading(p.title,p.level+' · '+p.stack)+card('Design brief','<p>Build a flow where a '+esc(p.flow)+'.</p><p>'+esc(p.requirement||p.steps[0])+'</p><p>Show the entry, success and recovery states. Verify the flow on a narrow screen and record the result.</p>')+section('Milestones',progress(v.steps.length,p.steps.length)+p.steps.map((s,i)=>'<label class="check"><input type="checkbox" data-step="'+i+'" '+(v.steps.includes(i)?'checked':'')+'>'+esc(s)+'</label>').join(''))+card('Portfolio','<label>Project notes<textarea id="projectNotes">'+esc(v.notes)+'</textarea></label><label>Portfolio or screenshot URL<input type="url" id="portfolio" value="'+esc(v.url)+'"></label>');
}
function currentProject(){return projects.find(p=>url('Project',p.title)===location.hash);}
function installWorkspaceActions(){
 actions.bookmark=id=>{state.saved=state.saved.includes(id)?state.saved.filter(v=>v!==id):[...state.saved,id];save();route();};
 actions.answer=i=>{const l=lookup(state.last),q=l.quiz,ok=Number(i)===q[2];state.progress[l.id].passed=ok;save();document.querySelector('#quizResult').textContent=(ok?'1 / 1 · Correct. ':'0 / 1 · Try again. ')+q[3];};
 actions.retry=()=>{delete state.progress[state.last].passed;save();route();};
 actions.complete=()=>{const v=state.progress[state.last];if(v.done)return;if(lookup(state.last).module==='Practical design projects'&&v.review?.length!==figmaTasks.length){document.querySelector('#completion').textContent='Finish the design review checklist in Practice.';return;}if(!v.solved||!v.passed||!v.notes?.trim()){document.querySelector('#completion').textContent='Solve the practice challenge, add a workbook observation and pass the quiz to complete this lesson.';return;}v.done=true;v.date=new Date().toISOString();save();route();};
 document.addEventListener('submit',e=>{if(e.target.id!=='attemptForm')return;e.preventDefault();const l=lookup(state.last),p=l.practice,v=state.progress[l.id];v.solved=l.legacy?v.attempt?.trim()===p[2]:v.attempt?.trim().toLowerCase()===p[2].toLowerCase();save();document.querySelector('#result').textContent=v.solved?'Correct. '+p[4]:'Try again. '+p[3];});
 document.addEventListener('input',e=>{const t=e.target;
 if(t.hasAttribute('data-design')){const v=state.progress[state.last],i=Number(t.dataset.design);v.review=t.checked?[...new Set([...(v.review||[]),i])]:(v.review||[]).filter(n=>n!==i);save();}
 if(t.id==='attempt'||t.id==='workbook'){const v=state.progress[state.last];if(t.id==='attempt'){v.attempt=t.value;v.solved=false;document.querySelector('#result').textContent='';}else v.notes=t.value;save();}
 if(t.id==='projectNotes'||t.id==='portfolio'||t.hasAttribute('data-step')){
 const p=currentProject();if(!p)return;const v=state.projects[p.title]||={steps:[]};
 if(t.id==='projectNotes')v.notes=t.value;else if(t.id==='portfolio')v.url=t.value;else{const i=Number(t.dataset.step);v.steps=t.checked?[...new Set([...v.steps,i])]:v.steps.filter(n=>n!==i);route();}save();}
 });
}
