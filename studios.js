// Examples follow the order of the topics within each learning module.
const workedExamples = {
'Web fundamentals':[
'<main><h1>My study plan</h1></main>', 'GET /index.html → 200 OK → browser parses HTML → GET /styles.css', '<h1>Weekly study plan</h1>','<input id="task-name" name="title">','<main><article><h1>Today’s lesson</h1></article></main>','<label for="task">Task title</label><input id="task">','p { color: #164e49; }','.task { border-radius: 8px; }','.card { padding: 1rem; margin: .5rem; }','.toolbar { display: flex; flex-wrap: wrap; gap: .5rem; }','.cards { display: grid; grid-template-columns: repeat(2, 1fr); }','@media (max-width: 40rem) { .cards { grid-template-columns: 1fr; } }'],
'JavaScript development':[
"button.onclick = () => { status.textContent = 'Saved'; };","let count = 0; count += 1;","3 === '3' // false","if (!tasks.length) showEmptyState();","for (const title of titles) console.log(title);","function clean(title) { return title.trim(); }","tasks.push({ title: 'Study grid' });","const label = task.title;","row.textContent = field.value;","form.addEventListener('submit', event => event.preventDefault());","const next = [...tasks, newTask];","const response = await fetch('/tasks');","if (!response.ok) throw Error('Could not load tasks');","try { await loadTasks(); } catch { showRetry(); }"],
'Modern frontend':[
'return <p>{tasks.length} open tasks</p>;','function TaskCard({ title }) { return <article>{title}</article>; }','<TaskCard title="Learn props" />','const [draft, setDraft] = useState("");','/tasks/42 → task detail view for record 42','<input value={draft} onChange={e => setDraft(e.target.value)} />','if (pending) return <p role="status">Loading tasks…</p>;','interface Task { id: number; title: string; done: boolean }','TaskList → taskService.list() → HTTP client','Record typing in React Profiler → inspect slow renders → measure again'],
'Backend development':[
'Browser sends task → server validates title → database stores record','node server.js','app.use(express.json());','GET /tasks → collection; GET /tasks/42 → single task','POST /tasks with {"title":"Study"} → 201 Created','Credentials → verify identity → issue session','Read session user → match task owner → allow update','SELECT * FROM tasks WHERE owner_id = ?','if (!title.trim()) return res.sendStatus(400);','if (!task) return res.sendStatus(404);'],
'Full-stack development':[
'CREATE TABLE tasks (id INTEGER PRIMARY KEY, title VARCHAR(100));','SELECT title FROM tasks WHERE done = 0;','START TRANSACTION; UPDATE tasks SET done = 1 WHERE id = 4; COMMIT;','FOREIGN KEY (owner_id) REFERENCES users(id)','users(id, name) ← tasks(id, owner_id, title)','UPDATE tasks SET done = 1 WHERE id = 4;','Web client → tasks API → SQL database','{"id":4,"title":"Practice SQL","done":true}','Set-Cookie: session=example; HttpOnly; Secure; SameSite=Lax','git tag v1.0.0'],
'Dart fundamentals':[
"void main() { print('Study Studio'); }","final started = DateTime.now();","final title = draft ?? 'Untitled';","if (done) { print('Finished'); }","for (final task in tasks) { print(task); }","void greet(String name) { print(name); }","final byId = {1: 'Practice Dart'};","class Task { final String title; Task(this.title); }","class Session { int _minutes = 0; }","String? selectedTitle;","Future<int> countTasks() async => 3;"],
'Flutter fundamentals':[
"runApp(const MaterialApp(home: Text('Study')));","flutter doctor -v","lib/main.dart → main() → runApp()","Widget build(BuildContext context) => const Text('Study');","class TitleText extends StatelessWidget { const TitleText({super.key}); @override Widget build(BuildContext context) => const Text('Tasks'); }","StatefulWidget → createState() → State.build()","Container(padding: const EdgeInsets.all(16), child: const Text('Study'))","Column(children: const [Text('Today'), Text('Practice Flutter')])","Row(children: [const Icon(Icons.book), Expanded(child: Text(title))])","MaterialApp(theme: ThemeData(colorSchemeSeed: Colors.teal))","flutter:\n  assets:\n    - assets/planner.png","validator: (s) => s == null || s.trim().isEmpty ? 'Enter a title' : null"],
'Mobile applications':[
'Navigator.push(context, MaterialPageRoute(builder: (_) => Details()));','ListView.builder(itemCount: tasks.length, itemBuilder: (_, i) => Text(tasks[i]))','setState(() { done = true; });','Save theme → close app → reopen → read saved theme','SELECT title FROM tasks ORDER BY id DESC;','Task.fromJson(jsonDecode(response.body))','GET /tasks/42 → 200 → decode response body','Sign in → receive session → store using platform secure storage','users/{uid}/tasks/{taskId}','Explain reminder → request permission → schedule if granted','TaskScreen → TaskRepository → local or remote data source'],
'Advanced mobile':[
'Widget → use case → repository interface ← SQLite implementation','Loading → Loaded(tasks) | Failed(message)','Profile on device → inspect frame timings → change one widget','await tester.tap(find.text("Finish")); await tester.pump();','Network timeout → display Retry → repeat safe read','App → authenticated API → protected upstream service','flutter build apk --analyze-size --target-platform android-arm64','flutter build appbundle --release','Internal test → closed test → staged release → monitor failures']
};
const workshops=[
 ['Dart fundamentals','Study-session calculator','Dart','Convert a session length to completed study intervals.','Write a typed function with duration and interval parameters.','Test zero minutes, an exact interval and leftover minutes.'],
 ['Flutter fundamentals','Flutter study dashboard','Flutter','Display a responsive daily study goal.','Build a widget tree with a title, progress bar and action.','Check the layout with large text on a narrow device.'],
 ['Mobile applications','Offline Flutter planner','Flutter · SQLite','Keep tasks after an app restart.','Build a form, a repository and a local task table.','Add a task, restart the app and verify the saved row.'],
 ['Advanced mobile','Flutter release lab','Flutter · Android','Prepare a tested Android build.','Write a widget test for the primary flow and build a release bundle.','Run a release build on a test device and record the version.']
];
for(const [module,title,stack,objective,build,test] of workshops){
 projects.push({title,level:module==='Dart fundamentals'?'Beginner':module==='Advanced mobile'?'Advanced':'Intermediate',stack,flow:'learner completes the '+title.toLowerCase()+' workflow',module,steps:[objective,build,test,'Record results and attach the portfolio link.']});
}
const figmaTasks=[
 'Write the user goal and sketch the shortest successful flow.',
 'Create labeled frames for entry, success and recovery.',
 'Connect the primary actions in a clickable prototype.',
 'Ask a learner to try it. Record the first hesitation and revise.'
];
Object.assign(workedExamples,{
 'Design fundamentals':[
 'Test brief: “Find your next unfinished lesson.” Observe the first click, time to success and any requests for help.',
 'Before: eight fields at equal distances. After: group email and password together, then leave a larger gap before preferences.',
 'Pair the green study header with a warm amber action. Check the pair in grayscale and label the action explicitly.',
 'Set body text at 16 px. Compare 18 px and 24 px line heights using a three-line lesson description.',
 'Use 8 px between a label and input, 16 px between fields and 32 px between form sections.',
 'Place the heading, lesson description and primary action on one left guide. Compare how quickly you can scan their starts.',
 'Make Continue the filled primary action. Keep View syllabus as a text link beneath it.',
 'Test small text against its actual background. For standard WCAG AA body text, aim for at least 4.5:1.',
 'Draw four columns on a mobile frame and twelve on a desktop frame. Align card edges to their column boundaries.',
 'Place one shared lesson card in two screens. Change the title length and verify the same wrapping behavior.'
 ],
 'User experience':[
 'Goal: schedule a study session. Recruit a learner, give them the goal, and observe before offering help.',
 'Ask “Walk me through your last study session.” Record their words separately from your interpretation.',
 'Evidence: three commuters mentioned unreliable mobile data. Design implication: make saved notes available offline.',
 'Discover lesson → schedule → study → review. Under each stage, record the learner’s goal and one observed friction.',
 'Ask learners to group lesson cards. Compare their labels with your proposed navigation headings.',
 'Open planner → choose a day → enter goal → save → confirmation. Add a branch for a missing goal.',
 'Sketch a planner in gray boxes. Test whether someone can locate the Add goal control without reading an explanation.',
 'After a save, display the new task in its chosen day and announce confirmation to assistive technology.',
 'Tab through a form. Record focus order and mark any point where the focused control becomes hard to see.'
 ],
 'Figma fundamentals':[
 'Create a file with Research, Wireframes and Prototype pages. Add one representative learner goal to Research.',
 'Name the card frame Lesson card. Nest Title and Progress inside it, then select each through the Layers panel.',
 'Place a phone-sized frame beside a desktop frame. Move the phone frame and observe which objects move with it.',
 'Place a dialog over a scrim. Move the scrim above the dialog and compare which controls remain visible.',
 'Draw a rectangle with consistent corner radius and a text label. Convert the pair into a reusable button.',
 'Define Body and Section heading text styles. Apply Body to two cards and change the shared line height.',
 'Add a wide photo to a square frame. Compare Fill and Fit and inspect what happens to the subject.',
 'Make a main button component. Place two instances, then change the main button padding and inspect both.',
 'Wrap a label in auto layout. Give the frame horizontal padding, switch its width to Hug, then lengthen the label.',
 'Anchor a close icon to Top and Right. Widen the frame and measure its distance from the right edge.',
 'Create Default, Focused and Disabled variants. Give each an explicit State property.',
 'Use instances for all list rows. Override one title and then update the main component’s spacing.'
 ],
 'Advanced UI design':[
 'Replace placeholder names with realistic short and long titles. Test truncation before finalizing your polished screen.',
 'Try a two-column layout at 900 px and 600 px. Switch to one column when the content becomes hard to read.',
 'Draw a visible 20 px icon inside a larger touch area. Prototype taps near the icon’s edges.',
 'Choose one decision: “What should I study next?” Place the next lesson and its action before historical statistics.',
 'For a button, document its anatomy, variants, keyboard behavior and examples of appropriate usage.',
 'Define color.action.primary and color.text.muted. Change their values for dark mode and check every instance.',
 'Publish a small button set. Insert an instance from another file and test how library updates propagate.',
 'Connect Add goal to the creation frame. Add a cancel path, then try both outcomes from the starting frame.',
 'Keep layer names consistent between frames. Preview the transition and check whether it clarifies the state change.',
 'Annotate loading, empty, error and success states. Include keyboard order and behavior for long text.'
 ]
});
