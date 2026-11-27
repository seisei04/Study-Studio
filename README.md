# Study Studio

A personal learning workspace for web development, Flutter and Dart, and Figma UI/UX. The site uses HTML, CSS and vanilla JavaScript. It runs without npm, a build step, an account or API credentials.

## Run locally

From the repository root, run `python3 -m http.server 8000 --bind 127.0.0.1` and open port 8000 in your browser. Keep the same browser profile and address to retain progress.

## Publish to GitHub Pages

Commit the site files to the publishing branch. In repository Settings → Pages, select **Deploy from a branch**, the branch containing the site (normally **main**), and **/ (root)**. After deployment succeeds, use **Visit site**. Assets use relative paths and navigation uses URL fragments so lesson links survive refreshes under a repository subpath.

## Project structure

- `index.html` and `styles.css` define the responsive shell, theme and shared components.
- `studio.js` handles navigation, dashboard, activity and achievements.
- `course.js` and `data/original.js` retain the original web and React Native workbook materials.
- `data/` contains the academy topics, worked examples, projects and lesson model.
- `pages/workspace.js` handles lessons, quizzes, practice and projects.
- `pages/tools.js` contains the playground, planner, knowledge center and personal settings.
- `store.js` validates backups, reads previous progress and persists workspace data.

## Study workflow

Open an academy roadmap and choose a lesson. Read the example, complete the practice challenge, write an observation and pass the quiz. Design projects also require the review checklist. Project milestones record your own assessment of work completed externally. Flutter device builds, React projects, Figma editing and backend deployments use their respective development tools. The sandboxed playground runs browser HTML, CSS and JavaScript.

Visible time spent in lessons, projects and the playground contributes to activity totals. Planner reminders run while the studio is open. System notifications require browser permission and support. GitHub hosts the course files. Notes, links, project checklists and quiz progress stay in the browser profile. Data Management exports and imports JSON backups for moving between devices. Review backup contents before sharing them.
