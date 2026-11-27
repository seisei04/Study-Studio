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
const challenges = {
 Web: [
  ['Connect the label to the input. Which ID belongs in the blank?', '<label for="___">Study task</label>\n<input id="task">', 'task', 'Look at the id on the input.', 'Clicking the label now focuses the task field.'],
  ['Center the planner horizontally. Fill in the horizontal margin.', 'body { max-width: 36rem; margin: 0 ___; }', 'auto', 'Let the browser divide the spare space between both sides.', 'Automatic side margins share the remaining width.'],
  ['Remove spaces around the task title before saving it.', 'const title = field.value.___();', 'trim', 'Look for the string method in the submission handler.', 'trim() also turns a spaces-only entry into an empty string.'],
  ['Convert stored JSON back into an array.', 'const tasks = JSON.___(savedText);', 'parse', 'This is the reverse of stringify.', 'parse() reconstructs the array from its JSON text.'],
  ['Choose the SQL column that identifies exactly one row.', 'UPDATE tasks SET done = 1 WHERE ___ = 2;', 'id', 'Several tasks can share a title. Look for the primary key.', 'The primary key identifies the task to update.']
 ],
 Mobile: [
  ['Choose the React Native component that renders a sentence.', '<___>Study today</___>', 'Text', 'Component names start with a capital letter.', 'Text renders the sentence on the mobile screen.'],
  ['Connect typing to the state setter.', 'const [draft, setDraft] = useState("");\n<TextInput value={draft} onChangeText={___} />', 'setDraft', 'Use the second name returned by useState.', 'Each edit updates draft and renders the new value.'],
  ['Keep the old tasks when appending the next title. Fill in the operator.', 'setTasks(previous => [___previous, title]);', '...', 'The spread operator uses three punctuation marks.', 'Spreading previous copies its items into the new array.'],
  ['Show the empty message when the list has zero items.', 'tasks.___ === 0 ? <Text>Add a task</Text> : <Text>Study tasks</Text>', 'length', 'Which array property counts its elements?', 'length is zero when the list is empty.'],
  ['Keep only unfinished tasks. Which array method selects matching items?', 'const open = tasks.___(task => !task.done);', 'filter', 'The callback returns true for each item to keep.', 'filter returns an array containing the unfinished tasks.']
 ]
};

