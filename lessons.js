const academies = {
 Web:{title:'Web Development',icon:'〈/〉',description:'Build accessible interfaces, connect APIs and ship full-stack applications.',docs:'https://developer.mozilla.org/en-US/docs/Learn_web_development'},
 Mobile:{title:'Mobile Development',icon:'▣',description:'Build for small screens with Dart, Flutter and device-aware layouts.',docs:'https://docs.flutter.dev/'},
 Figma:{title:'Figma UI/UX Design',icon:'❖',description:'Turn research into reusable components and testable prototypes.',docs:'https://help.figma.com/hc/en-us/'}
};
const lessons = [];
function register(area, module, level, item) {
 lessons.push({...item,area,module,level,id:area+'-'+lessons.filter(l=>l.area===area).length});
}
for (const [area, modules] of Object.entries(syllabus)) {
 modules.forEach(([module,rows], m) => rows.split('\n').forEach((row,i) => {
  const [title,decision,answer,other] = row.split('|');
  const level = m<1?'Beginner':m<3?'Intermediate':'Advanced';
  const options = i%2 ? [answer,other] : [other,answer];
  register(area,module,level,{title,body:decision,code:workedExamples[module]?.[i]||('Design decision → '+answer+'\nReview question → '+decision),trace:'Compare '+answer+' with '+other+'. Which one serves this goal, and why?',lab: area==='Figma'?'Apply this decision to a study planner frame. Describe what changed and how you would test it.': 'Apply this decision to a small study planner example. Record one input and the result you expect.',
   practice:['Recall the term or expression for this decision.',decision,answer,'Starts with “'+answer[0]+'”.',decision],quiz:[decision,options,options.indexOf(answer),answer+' fits this decision.']});
 }));
}
designBriefs.forEach(row=>{
 const [title,flow]=row.split('|');
 register('Figma','Practical design projects','Advanced',{title,body:'Design a flow that lets someone '+flow+'.',code:'Entry screen → Decision → Confirmation',trace:'Inspect a familiar app with this flow. Record one useful pattern and one obstacle.',lab:'Create frames for entry, success and recovery. Link the primary action and observe someone trying the prototype.',practice:['Name the artifact that lets someone click through your frames.','Frames + interactions → ___','prototype','Starts with p.','A prototype lets you test the sequence before implementation.'],quiz:['What evidence best validates the design?',['A matching color palette','A user completing the flow'],1,'Observe the task and record where assistance was needed.']});
});
for (const area of Object.keys(course)) course[area].forEach((item,i)=>register(area,area==='Mobile'?'React Native workbook':'Web planner workbook','Beginner',{...item,legacy:area+i,practice:challenges[area][i],quiz:quizzes[area][i]}));
const lookup = id => lessons.find(l=>l.id===id);
function resource(l) {
 if(l.legacy && l.area==='Mobile') return 'https://reactnative.dev/docs/getting-started';
 if(l.module==='Dart fundamentals') return 'https://dart.dev/language';
 if(l.module==='Modern frontend') return 'https://react.dev/learn';
 if(l.module==='Backend development') return 'https://nodejs.org/en/learn';
 if(l.module==='Full-stack development') return 'https://dev.mysql.com/doc/';
 return academies[l.area].docs;
}
