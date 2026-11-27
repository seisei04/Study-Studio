const projectGroups = {
 Beginner: ['Personal Portfolio|visitor reads a project case study','Landing Page|visitor follows the primary call to action','Calculator|learner evaluates a two-number calculation','Digital Clock|reader switches between time formats','To-Do List|learner adds and completes a task','Login Interface|user corrects a validation error'],
 Intermediate: ['Expense Tracker|user categorizes a purchase and sees the new total','Weather Application|user finds a city and reads its forecast','Notes Application|writer saves and retrieves a note','E-commerce Interface|shopper changes the quantity in a cart','Student Management System|teacher finds and edits a student record','Food Ordering Application|customer orders a meal and reviews the total'],
 Advanced: ['Full-Stack Inventory System|manager reconciles stock after a sale','E-commerce Platform|shopper places an order that reserves inventory','Task Management System|team member assigns and completes a task','Complete Student Portal|student enrolls and checks their schedule','Mobile Expense Tracker|traveler logs an expense offline and syncs later','Full-Stack Application|learner saves a study session across devices']
};
const projects = Object.entries(projectGroups).flatMap(([level, rows]) => rows.map(row => {
 const [title, flow] = row.split('|');
 const signature = title === 'Food Ordering Application';
 const stack = signature ? 'Figma · React · Flutter · REST · SQL' : level === 'Advanced' ? 'Figma · JavaScript · Node.js · SQL' : 'Figma · HTML · CSS · JavaScript';
 const steps = ['Sketch the screens and decisions for the flow.', 'Build the primary interaction with realistic sample data.', 'Test the flow with empty and invalid input.', 'Document a successful run and publish a portfolio example.'];
 if (signature) steps.splice(1,1,'Build a responsive React menu and cart.','Build the same checkout flow in Flutter.','Connect both clients to one orders API and database.');
 return {title, level, flow, stack, steps};
}));
const designBriefs = ['Login and Registration Interface|create an account and recover from a password error','Personal Portfolio Design|find a case study and contact the designer','Admin Dashboard|locate an overdue item and assign an owner','E-commerce Website|filter products and review a cart','Food Ordering Application|customize a meal and check out','Mobile Banking Interface|review a transfer before confirming','Student Management System|find a learner and edit their enrollment','Complete Mobile Application Prototype|onboard a learner and schedule a study session'];
const projectRequirements=[
 ['Include an introduction, one project case study and a contact action.','Verify the case study and contact action using only the keyboard.'],
 ['Present one offer with a clear heading and call to action.','Check that the action remains visible and usable at 320 px.'],
 ['Implement addition, subtraction, multiplication and division.','Test zero, a decimal input and division by zero.'],
 ['Show current hours and minutes, with a 12/24-hour toggle.','Check the display at midnight, noon and a single-digit minute.'],
 ['Add, finish and reopen tasks. Preserve the list on refresh.','Try a blank title, duplicate names and an empty list.'],
 ['Label every field and provide field-specific validation feedback.','Submit empty fields, correct an error and confirm keyboard focus.'],
 ['Track amount, date and category and calculate category totals.','Compare the calculated total with a hand calculation after editing a purchase.'],
 ['Search for a city and display temperature with its unit and observation time.','Test a missing city and an unavailable forecast service.'],
 ['Create, edit, search and delete persistent notes.','Reload after editing, then search for a word in the updated note.'],
 ['Show product prices, editable quantities and a computed cart total.','Remove the last item and verify that checkout is disabled for an empty cart.'],
 ['Give every student a stable ID and provide searchable enrollment records.','Give two students the same name and update only the selected ID.'],
 ['Support menu choices, item quantities, order review and an order confirmation.','Verify that the web and mobile clients show the same saved order total.'],
 ['Track stock movements and reject changes that would make stock negative.','Simulate two requests for the last item and verify the final quantity.'],
 ['Create an order and reserve inventory as one consistent operation.','Retry a checkout and confirm that it cannot create a duplicate order.'],
 ['Support task ownership, assignment and completion with authorization checks.','Test with two accounts and verify their respective permissions.'],
 ['Model students, course sections and enrollments as related records.','Try a duplicate enrollment and verify the schedule after a registration change.'],
 ['Store expenses locally, queue offline edits and surface synchronization status.','Add an expense offline and verify it appears exactly once after reconnecting.'],
 ['Persist a study session through a validated API and display it on a second client.','Test denied access, malformed input and a successful reload.']
];
projects.forEach((p,i)=>{
 const [requirement,test]=projectRequirements[i];
 p.requirement=requirement;
 if(p.title==='Food Ordering Application')p.steps.splice(-1,0,test);
 else {p.steps[1]=requirement;p.steps[2]=test;}
});
