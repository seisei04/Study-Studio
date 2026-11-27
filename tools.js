const samples={html:'<main>\n  <h1>Study planner</h1>\n  <button>Finish task</button>\n  <p>Ready to study</p>\n</main>',css:'body { font: 18px system-ui; padding: 1rem; color: #164e49; }\nbutton { padding: .6rem 1rem; }',js:"document.querySelector('button').onclick = () => {\n  document.querySelector('p').textContent = 'Task complete';\n};"};
function playground(){
 const v=state.editor||samples;
 return heading('Code playground','Edit the sample and run it. Your draft saves as you type.')+card('Practice challenge','Add a second button that resets the task status. Test both buttons in the preview.')+section('Editors',grid(Object.keys(samples).map(k=>'<label>'+k.toUpperCase()+'<textarea spellcheck="false" class="code" data-editor="'+k+'">'+esc(v[k])+'</textarea></label>').join('')))+'<div class="row">'+action('Run preview','run')+action('Reset sample','resetEditor')+action('Clear output','clearPreview')+'<label><input id="live" type="checkbox"> Live preview</label></div><iframe class="preview" id="preview" title="Sandboxed code preview" sandbox="allow-scripts"></iframe>';
}
function runPreview(){const f=document.querySelector('#preview');if(!f)return;const v=state.editor||samples;
 f.srcdoc='<meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src &apos;none&apos;; script-src &apos;unsafe-inline&apos;; style-src &apos;unsafe-inline&apos;; img-src data:"><style>'+v.css+'</style>'+v.html+'<script>'+v.js+'<\/script>';
}
let editingTask='',editingNote='',noteQuery='',plannerDay='',noteArea='';
const options=(items,selected)=>items.map(s=>'<option '+(s===selected?'selected':'')+'>'+esc(s)+'</option>').join('');
let weekOffset=0;
function weekCalendar(){
 const monday=new Date();monday.setDate(monday.getDate()-(monday.getDay()+6)%7+7*weekOffset);
 const days=Array.from({length:7},(_,i)=>{const d=new Date(monday);d.setDate(d.getDate()+i);const key=dayKey(d),count=state.tasks.filter(t=>t.date===key).length;
 return '<button data-action="pickDay" data-value="'+key+'" aria-pressed="'+(plannerDay===key)+'"><small>'+d.toLocaleDateString(undefined,{weekday:'short'})+'</small><b>'+d.getDate()+'</b><small>'+count+' goals</small></button>';});
 return '<div class="card"><div class="bar"><h2>Week of '+monday.toLocaleDateString(undefined,{month:'short',day:'numeric'})+'</h2><div class="row">'+action('Previous week','week','-1')+action('Next week','week','1')+'</div></div><div class="week">'+days.join('')+'</div></div>';
}
function planner(){
 const t=state.tasks.find(x=>x.id===editingTask)||{};
 const visible=state.tasks.filter(x=>!plannerDay||x.date===plannerDay).sort((a,b)=>a.date.localeCompare(b.date));
 return heading('Study planner','Schedule a study goal and check it off when you finish.')+weekCalendar()+grid(card(t.id?'Edit goal':'New study goal','<form id="taskForm"><label>Goal<input name="title" required value="'+esc(t.title)+'"></label><label>Study date<input name="date" type="date" required value="'+esc(t.date||plannerDay||dayKey())+'"></label><label>Academy<select name="area">'+options(Object.keys(academies),t.area)+'</select></label><label>Priority<select name="priority">'+options(['Normal','High','Low'],t.priority)+'</select></label><label>Reminder time (while Studio is open)<input name="reminder" type="time" value="'+esc(t.reminder)+'"></label><button class="primary">Save goal</button></form>')+card('Schedule','<label>Filter by day<input type="date" id="plannerDay" value="'+esc(plannerDay)+'"></label>'+action('Show all dates','allDates')+list(visible.map(x=>'<strong>'+esc(x.title)+'</strong><p>'+esc(x.date+' · '+x.area+' · '+x.priority)+'</p><div class="row">'+action(x.done?'✓ Done · reopen':'Mark done','toggleTask',x.id)+action('Edit','editTask',x.id)+action('Delete','deleteTask',x.id)+'</div>'))));
}
function noteResults(){return list(state.notes.filter(n=>(!noteArea||n.area===noteArea)&&[n.title,n.text,n.tags].join(' ').toLowerCase().includes(noteQuery.toLowerCase())).map(n=>'<small>'+esc(n.area+' · '+n.kind+' · '+n.tags)+'</small><h3>'+esc(n.title)+'</h3>'+(n.kind==='Flashcard'?'<details><summary>Reveal answer</summary><p>'+esc(n.text)+'</p></details>':'<p style="white-space:pre-wrap">'+esc(n.text)+'</p>')+action('Edit','editNote',n.id)+action('Delete','deleteNote',n.id)));}
function notesPage(){
 const n=state.notes.find(x=>x.id===editingNote)||{};
 return heading('My notes','Collect study summaries, snippets, glossary entries and flashcards.')+grid(card(n.id?'Edit note':'New note','<form id="noteForm"><label>Title or question<input required name="title" value="'+esc(n.title)+'"></label><label>Note or answer<textarea required name="text">'+esc(n.text)+'</textarea></label><label>Academy<select name="area">'+options(Object.keys(academies),n.area)+'</select></label><label>Type<select name="kind">'+options(['Summary','Snippet','Glossary','Flashcard'],n.kind)+'</select></label><label>Tags<input name="tags" value="'+esc(n.tags)+'"></label><button class="primary">Save note</button></form>')+card('Knowledge center','<label>Search notes<input id="noteQuery" value="'+esc(noteQuery)+'"></label><label>Filter academy<select id="noteArea"><option value="">All academies</option>'+options(Object.keys(academies),noteArea)+'</select></label><div id="noteResults">'+noteResults()+'</div>'));
}
function settings(view){
 if(view==='Appearance')return heading(view)+card('Theme','<label>Color scheme<select id="theme">'+options(['system','light','dark'],state.theme)+'</select></label>');
 if(view==='Settings')return heading(view)+card('Personal profile','<label>Your display name<input id="profileName" maxlength="80" value="'+esc(state.name)+'"></label>')+section('Preferences',link('Appearance','Appearance')+' '+link('Data management','Data Management'));
 return heading(view,'Your workspace saves in this browser. Export a backup to move to another device.')+card('Backup and restore',action('Export JSON','exportData')+'<label>Import a Study Studio backup<input type="file" accept=".json,application/json" id="importFile"></label><output id="importStatus" aria-live="polite"></output>')+section('Reset workspace',action('Reset all study data','resetData'));
}
function installToolActions(){
 actions.run=runPreview;actions.clearPreview=()=>document.querySelector('#preview').srcdoc='';actions.resetEditor=()=>{if(confirm('Replace your editor draft with the sample?')){state.editor=null;save();route();}};
 actions.week=n=>{weekOffset+=Number(n);route();};actions.pickDay=d=>{plannerDay=d;route();};
 setInterval(()=>{const now=new Date(),time=String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');
 for(const task of state.tasks){if(task.done||task.date!==dayKey(now)||!task.reminder||task.reminder>time||task.notified===task.date+task.reminder)continue;
 document.querySelector('#notice').textContent='Study reminder · '+task.title;
 if('Notification' in window&&Notification.permission==='granted'){try{new Notification('Study Studio',{body:task.title});}catch{}}
 task.notified=task.date+task.reminder;save();}
 },15000);
 actions.editTask=id=>{editingTask=id;route();};actions.allDates=()=>{plannerDay='';route();};
 actions.toggleTask=id=>{const t=state.tasks.find(t=>t.id===id);t.done=!t.done;save();route();};
 actions.editNote=id=>{editingNote=id;route();};
 for(const [actionName,key] of [['deleteTask','tasks'],['deleteNote','notes']])actions[actionName]=id=>{if(confirm('Delete this item?')){state[key]=state[key].filter(v=>v.id!==id);editingNote='';editingTask='';save();route();}};
 actions.exportData=()=>{const a=document.createElement('a');a.download='study-studio-'+dayKey()+'.json';const u=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));a.href=u;a.click();setTimeout(()=>URL.revokeObjectURL(u),1000);};
 actions.resetData=()=>{if(confirm('Erase all study progress, notes, projects and preferences in this browser?')){state=emptyState();save();route();}};
 document.addEventListener('submit',e=>{if(!['noteForm','taskForm'].includes(e.target.id))return;e.preventDefault();
 const note=e.target.id==='noteForm',key=note?'notes':'tasks',id=(note?editingNote:editingTask)||crypto.randomUUID(),old=state[key].find(v=>v.id===id);
 const values=Object.fromEntries(new FormData(e.target));if(!values.title.trim())return;
 if(!note&&values.reminder&&'Notification' in window&&Notification.permission==='default')Notification.requestPermission().catch(()=>{});
 if(old)Object.assign(old,values);else state[key].push({id,...(note?{}:{done:false}),...values});
 editingTask='';editingNote='';save();route();});
 let timer;document.addEventListener('input',e=>{const t=e.target;
 if(t.dataset.editor){state.editor||={...samples};state.editor[t.dataset.editor]=t.value;save();clearTimeout(timer);if(document.querySelector('#live')?.checked)timer=setTimeout(runPreview,350);}
 if(t.id==='noteArea'||t.id==='noteQuery'){if(t.id==='noteArea')noteArea=t.value;else noteQuery=t.value;document.querySelector('#noteResults').innerHTML=noteResults();}
 if(t.id==='profileName'){state.name=t.value;save();}
 });
 document.addEventListener('change',async e=>{const t=e.target;
 if(t.id==='theme'){state.theme=t.value;save();theme();}
 if(t.id==='plannerDay'){plannerDay=t.value;route();}
 if(t.id==='importFile'&&t.files[0]){try{const s=JSON.parse(await t.files[0].text());if(!validState(s))throw Error();if(confirm('Replace current study data with this backup?')){state=s;save();route();document.querySelector('#importStatus').textContent='Backup restored.';}}catch{document.querySelector('#importStatus').textContent='Invalid Study Studio backup. Current data was preserved.';}t.value='';}
 });
}
