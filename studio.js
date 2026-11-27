const quizzes = {
 Web: [
  ['Which attribute connects a label to its field?', ['for matching the input id','class matching the button'],0,'The label uses the field’s id to move focus.'],
  ['Which change helps a form fit a narrow screen?', ['Fix the field at 700px','Let the grid size the field'],1,'A flexible column adapts to the available width.'],
  ['What does trim() return for three spaces?', ['Three spaces','An empty string'],1,'Trimming removes whitespace from both ends.'],
  ['Where is the refreshed list recovered from?', ['Storage for this browser and origin','A shared phone database'],0,'The saved JSON belongs to this browser and origin.'],
  ['Which condition updates one specific task?', ['WHERE title IS NOT NULL','WHERE id = 1'],1,'A primary key identifies a single row.']
 ],
 Mobile: [
  ['Which component displays a sentence?', ['View','Text'],1,'Text renders the string. View groups components.'],
  ['What updates the draft as you type?', ['setDraft','The placeholder'],0,'onChangeText calls the setter and React renders the new draft.'],
  ['Why copy the old array when adding a title?', ['To store it on disk','To preserve existing tasks in a new array'],1,'The new array contains previous tasks and the new title.'],
  ['What survives a full reload in this example?', ['The initial empty state','Every task from memory'],0,'Component state starts fresh when the app restarts.'],
  ['A request succeeds with zero tasks. What should appear?', ['Retry error','Empty list guidance'],1,'An empty result is a successful response.']
 ]
};
const el = id => document.getElementById(id);
let data = {};
try { data = JSON.parse(localStorage.getItem('study-studio-v1')) || {}; } catch {}
let track = Object.hasOwn(course,data.track) ? data.track : 'Web';
let index = Number.isInteger(data.index) && data.index >= 0 && data.index < 5 ? data.index : 0;
function save() {
 data.track=track; data.index=index;
 try {localStorage.setItem('study-studio-v1',JSON.stringify(data));}
 catch {el('warning').textContent='Browser storage is unavailable. This session’s work is held in memory.';}
}
function button(parent,label,action,selected) {
 const b=document.createElement('button'); b.textContent=label; b.onclick=action;
 if(selected!==undefined)b.setAttribute('aria-pressed',String(selected));
 el(parent).append(b);
}
function render(){
 const key=track+index, entry=data[key] ||= {}, lesson=course[track][index];
 const [question,options,correct,reason]=quizzes[track][index];
 for(const id of ['tracks','lessons','answers'])el(id).replaceChildren();
 for(const t of Object.keys(course))button('tracks',t+' development',()=>{track=t;index=0;save();render()},t===track);
 course[track].forEach((l,i)=>button('lessons',(data[track+i]?.done?'✓ ':'')+(i+1)+'. '+l.title,()=>{index=i;save();render();el('title').scrollIntoView({block:'nearest'})},i===index));
 const count=course[track].filter((_,i)=>data[track+i]?.done).length;
 el('status').textContent=count+' of 5 lessons complete';el('progress').value=count;
 el('meta').textContent=track.toUpperCase()+' DEVELOPMENT  /  LESSON '+(index+1);
 for(const id of ['title','body','trace','lab','test'])el(id).textContent=lesson[id];
 el('example').textContent=lesson.code;el('question').textContent=question;
 el('notes').value=entry.notes || '';el('notes').oninput=e=>{entry.notes=e.target.value;save()};
 el('feedback').textContent=entry.passed?'Correct. '+reason:'';
 options.forEach((s,i)=>button('answers',s,()=>{entry.passed=i===correct;save();el('feedback').textContent=entry.passed?'Correct. '+reason:'Try again. '+reason;}));
 el('finish').textContent=entry.done?'Lesson complete ✓':'Complete lesson';
 el('finish').onclick=()=>{if(!entry.passed || !entry.notes?.trim()){el('feedback').textContent='Record your workbook observation and answer the check correctly first.';return}entry.done=true;save();render()};
}
render();
