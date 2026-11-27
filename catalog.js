// Each field gives the topic, a practical decision, the term to recall and a plausible distractor.
const syllabus = {
Web: [
['Web fundamentals', `Introduction to Web Development|Separate the page structure from its presentation so headings remain meaningful without color.|HTML|CSS
How Websites Work|Inspect the Network panel on reload. The browser requests a document before it can discover its linked stylesheet.|HTTP|SQL
HTML Fundamentals|Give a page one descriptive top-level heading so readers can identify its purpose.|h1|span
HTML Elements and Attributes|Give each field a unique address that a label can reference.|id|class
Semantic HTML|Wrap the primary page content in a landmark for keyboard and screen-reader navigation.|main|div
Forms and Inputs|Associate visible text with a field so clicking the text focuses the control.|label|placeholder
CSS Fundamentals|Set the foreground of a paragraph without changing its background.|color|opacity
CSS Selectors|Style every reusable task card using one class selector.|.task|#task
Box Model|Add space inside the card border while keeping neighboring cards in place.|padding|margin
Flexbox|Lay out a toolbar along one axis and let items wrap as space runs out.|flex|block
CSS Grid|Align cards to shared rows and columns with a two-dimensional layout.|grid|inline
Responsive Web Design|Change the layout when available space crosses a threshold.|media query|fixed width`],
['JavaScript development', `JavaScript Introduction|Read a button click and update a task count without reloading the document.|JavaScript|CSS
Variables and Data Types|Declare a count that will be reassigned after each click.|let|const
Operators|Compare the count to a numeric limit without converting strings.|===|==
Conditional Statements|Show an empty state only when the task list is empty.|if|while
Loops|Visit each title in a list once and print its value.|for...of|for...in
Functions|Pass the cleaned title back to the calling code from a helper.|return|console.log
Arrays|Append one item to the end of a mutable list.|push|shift
Objects|Read a task's title by name rather than its position.|property|index
DOM Manipulation|Display a learner's typed title as literal text inside a list item.|textContent|innerHTML
Events|Respond when a form is sent by either keyboard or pointer.|submit|mouseover
ES6+|Copy items from an old array into a new array before appending a task.|spread|delete
Asynchronous JavaScript|Pause an async function until a pending request settles.|await|yield
Fetch API|Check whether the HTTP response status is successful before decoding a task list.|response.ok|response.body
Error Handling|Recover from a rejected request and show a retry action.|catch|finally`],
['Modern frontend', `React Fundamentals|Describe the view from current data and let React reconcile the DOM.|declarative rendering|manual DOM patching
Components|Encapsulate a task card as a reusable function that returns UI.|component|selector
Props and State|Pass a read-only title from a parent into a TaskCard.|props|local state
Hooks|Keep a draft input value across renders of one component.|useState|useMemo
Routing|Give each task detail view an address that can be bookmarked.|route|tooltip
Forms|Bind the input value to state and update it on each edit.|controlled input|static label
API Integration|Display a waiting indicator between starting a request and receiving data.|loading state|empty state
TypeScript Fundamentals|Describe the shape of a Task object during development.|interface|fetch
Frontend Architecture|Keep data access in one place so the view can be tested with sample records.|service module|inline styles
Performance Optimization|Measure the slow interaction before choosing a rendering optimization.|profiling|minification`],
['Backend development', `Backend Fundamentals|Enforce data rules on the machine that accepts requests from every client.|server|browser
Node.js|Run JavaScript outside the browser to serve task data.|Node.js|React DOM
Express.js|Process requests through shared functions before they reach a route.|middleware|stylesheet
REST APIs|Represent the collection of tasks with a stable plural URL.|/tasks|/drawButton
HTTP Methods|Create a task by submitting data to its collection endpoint.|POST|GET
Authentication|Verify which account is making a request.|authentication|pagination
Authorization|Check that the signed-in user owns the requested task.|authorization|serialization
Database Integration|Bind input values separately from SQL text.|parameterized query|string concatenation
Validation|Reject a blank title before it reaches persistent storage.|validation|compression
Error Handling|Return a missing-resource status when a valid task ID has no matching row.|404|500`],
['Full-stack development', `Database Fundamentals|Choose one stable identifier for each task row.|primary key|display title
SQL|Read matching tasks without changing the underlying table.|SELECT|UPDATE
MySQL|Make a group of writes succeed or roll back together.|transaction|index
Database Relationships|Connect each task to an existing owner row.|foreign key|column alias
Database Normalization|Keep owner details in one table and reference them from many tasks.|normalization|duplication
CRUD Operations|Change the done flag on an existing row.|UPDATE|INSERT
Full-Stack Architecture|Place shared validation between the client UI and persistent data.|API|stylesheet
Connecting Frontend and Backend|Choose a portable text format for task records in HTTP responses.|JSON|JSX
Authentication Integration|Use a cookie attribute that prevents scripts from reading a session cookie.|HttpOnly|Max-Age
Application Deployment|Record a known release in Git so you can return to that exact revision.|tag|working tree`]],
Mobile: [
['Dart fundamentals', `Introduction to Dart|Start a Dart program at its conventional entry function.|main|build
Variables and Data Types|Declare a variable that receives a value once at runtime.|final|var
Operators|Provide a fallback title only when the first value is null.|??|&&
Conditional Statements|Choose one of two labels based on a boolean condition.|if|for
Loops|Process every task in a collection without tracking an index.|for-in|switch
Functions|Declare a function that performs an action without returning a value.|void|bool
Lists and Maps|Look up a task by a unique string key.|Map|List
Classes and Objects|Initialize the fields when creating a new Task instance.|constructor|getter
Object-Oriented Programming|Hide a library implementation detail by prefixing its name.|underscore|hyphen
Null Safety|Declare a title that may have no value.|String?|String
Asynchronous Programming|Represent a single result that will arrive later.|Future|List`],
['Flutter fundamentals', `Introduction to Flutter|Describe the UI as a composition of immutable building blocks.|widget|table
Flutter Installation|Check the installed SDK and device toolchain before starting a project.|flutter doctor|flutter clean
Project Structure|Find the usual Dart entry file in a new Flutter app.|lib/main.dart|pubspec.yaml
Widgets|Describe a widget's visible subtree in its rendering method.|build|dispose
StatelessWidget|Display a title entirely determined by constructor inputs.|StatelessWidget|State
StatefulWidget|Keep a changing counter across builds using a companion State object.|StatefulWidget|Text
Containers|Combine padding, decoration and sizing around one child.|Container|Navigator
Rows and Columns|Stack a title above a description.|Column|Row
Layouts|Let a child use the remaining space in a Row.|Expanded|Opacity
Styling and Themes|Define colors and typography once at the app level.|ThemeData|SizedBox
Images and Assets|Declare bundled image paths in the Flutter project manifest.|pubspec.yaml|main.dart
Forms and Validation|Return an error message for a blank field using its validation callback.|validator|builder`],
['Mobile applications', `Navigation and Routing|Place a details route on top of the current screen.|push|pop
Lists and Grids|Build visible rows lazily for a long scrolling task list.|ListView.builder|Column
State Management|Notify the framework that local screen state changed.|setState|dispose
Local Storage|Persist a small theme preference across app restarts.|key-value storage|widget field
SQLite|Store searchable structured records on the device.|SQLite|ListView
API Integration|Convert a JSON map into a typed task at the application boundary.|deserialization|navigation
HTTP Requests|Read a remote task list without changing it.|GET|DELETE
Authentication|Keep a session credential in OS-backed protected storage.|secure storage|source code
Firebase Fundamentals|Use a collection of documents for synchronized task records.|Firestore|Crashlytics
Notifications|Ask for the user's permission before showing system alerts.|notification permission|camera permission
Application Architecture|Hide the source of data behind a consistent interface.|repository|widget theme`],
['Advanced mobile', `Clean Architecture|Keep business rules independent of Flutter widgets.|domain layer|presentation layer
State Management Patterns|Represent loading, success and failure as distinct possible states.|sealed class|magic number
Application Performance|Inspect slow frames with Flutter's profiling tools.|DevTools|pubspec
Testing|Verify that tapping a button changes the rendered label.|widget test|lint rule
Error Handling|Offer a second attempt after a temporary network failure.|retry|silent discard
Security Fundamentals|Store privileged service credentials on infrastructure you control.|backend|mobile bundle
App Optimization|Inspect what contributes to the release bundle size.|size analysis|hot reload
Android Build Generation|Produce the Android distribution bundle using the Flutter build target.|appbundle|web
Application Publishing|Release to a limited audience first and watch crash reports.|staged rollout|debug build`]],
Figma: [
['Design fundamentals', `Introduction to UI and UX|Evaluate whether a learner can finish a task without assistance.|usability|decoration
Design Principles|Group related controls by placing them closer together.|proximity|rotation
Color Theory|Choose a contrasting accent across the color wheel.|complementary|monochromatic
Typography|Improve readability of multi-line text by adjusting vertical distance between baselines.|line height|letter spacing
Spacing|Reuse a small set of distances between elements.|spacing scale|random offsets
Alignment|Give labels a shared starting edge to make scanning easier.|alignment|shadow
Visual Hierarchy|Make the most important action the easiest to notice.|emphasis|uniform weight
Contrast|Compare the relative luminance of foreground and background.|contrast ratio|hue count
Layout Principles|Use shared columns to organize content across a page.|grid|overlay
Design Consistency|Reuse the same control for the same action throughout a flow.|component|one-off shape`],
['User experience', `User-Centered Design|Test a proposed solution with people who actually perform the task.|user testing|team vote
User Research|Ask people to describe the last time they tried a task.|interview|leading question
User Personas|Summarize research-supported patterns of goals and constraints.|persona|stereotype
User Journey Maps|Map actions and frustrations over the full study session.|journey map|color palette
Information Architecture|Group content into categories that users can predict.|taxonomy|animation
User Flows|Connect decision points and screens needed to complete a goal.|user flow|type scale
Wireframing|Test layout and sequence before choosing final colors.|wireframe|brand guide
Usability Principles|Show an immediate confirmation after a save.|feedback|decoration
Accessibility Fundamentals|Give a focused control a clearly visible indicator.|focus ring|hover color`],
['Figma fundamentals', `Introduction to Figma|Keep one shared design file for collaborators to inspect.|design file|bitmap export
Figma Workspace|Locate nested elements using the hierarchy panel.|Layers|Assets
Frames|Define a screen boundary that can contain other objects.|frame|line
Layers|Place a dialog above its scrim by adjusting their relative order.|stacking order|font weight
Shapes|Use a rounded rectangle as the base of a button.|rectangle|vector network
Text Tools|Reuse font size, weight and line height through a named setting.|text style|effect style
Images|Crop a photo to a card by applying it as a shape's paint.|image fill|stroke
Components|Edit a source button to propagate changes to linked copies.|main component|detached group
Auto Layout|Keep consistent spacing when a button label grows.|auto layout|absolute position
Constraints|Anchor a close control to the right edge as its frame resizes.|right constraint|left constraint
Variants|Group default and pressed button states within one component set.|variant|page
Reusable Components|Place a linked copy of a component into a screen.|instance|flattened vector`],
['Advanced UI design', `High-Fidelity Design|Use final typography and realistic content to evaluate the finished interface.|high fidelity|thumbnail sketch
Responsive Design|Choose a layout change based on available space.|breakpoint|device brand
Mobile UI Design|Increase the tappable area around a small icon.|touch target|image resolution
Web Dashboard Design|Put the metric that informs the user's next decision first.|priority metric|decorative chart
Design Systems|Document reusable components alongside principles for when to use them.|design system|mood board
Design Tokens|Name a design decision by purpose so its underlying value can change.|semantic token|raw hex
Component Libraries|Publish reusable components for other files to consume.|library|screenshot
Interactive Prototypes|Connect a button to its destination frame.|prototype interaction|export setting
Transitions|Use motion continuity to explain how a card becomes a detail view.|smart animate|random delay
Developer Handoff|Record behavior and edge cases alongside component measurements.|annotation|thumbnail`]]
};
