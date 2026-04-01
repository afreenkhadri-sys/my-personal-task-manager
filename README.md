Personal Task Manager

## Recent Updates
- **Fixed GitHub Pages routing:** Configured Vite base path and added a custom 404 fallback to ensure deep links work correctly on GitHub Pages.
- **Dev server optimization:** Updated configuration for smoother local development.

A task management web application built with React and Vite. It has a login system, a dashboard with weather, and a full task manager. It runs entirely in the browser using localStorage, so no backend or database is needed.

What It Does
This app helps you keep track of daily tasks. After logging in, you can see a dashboard with current weather and stats on your productivity. You can add tasks, set their priority (High, Medium, Low), choose a category, and mark them as finished. Everything you do is saved to your browser so it stays there even if you refresh the page.

Live Demo
Try it here: https://afreenkhadri-sys.github.io/my-personal-task-manager/

How to Run Locally
Clone this repository: git clone https://github.com/afreenkhadri-sys/my-personal-task-manager.git
Go into the folder: cd my-personal-task-manager
Install the dependencies (I included a package-lock.json for consistent builds): npm install
Start the development server: npm run dev
Open your browser to http://localhost:5173
Login Credentials
There is no real database, so you can log in with:

Email: Any email address (e.g., test@test.com)
Password: Any password you want (it just needs to be filled out)
The app validates the email format and saves your session to the browser until you click logout.

Tech Stack
React 19 and Vite
React Router for navigating between pages
localStorage for saving your tasks and login state
Open-Meteo API for real-time weather data
Regular CSS for styling

How I Built It
Routing and Security: I used React Router to create the pages. I built a ProtectedRoute component that checks if you are logged in. If you aren't, it sends you back to the login page so you can't see the dashboard.
Task System: I made the task list update in real-time. When you add or delete a task, it updates the state and the localStorage at the same time.
Weather Logic: I used the browser's geolocation to find your coordinates and fetch weather data. If your browser blocks location, I added a fallback that shows demo weather so the dashboard doesn't look empty.

Decisions and Challenges
LocalStorage: I chose this because it's the easiest way to save data without needing a server. It makes the app fast and easy for anyone to run locally.
Mock Data: One challenge was that my own laptop blocks location access. I decided to write a function that detects this and shows "Demo Weather" instead of an error message.
Syncing Stats: It was tricky to get the dashboard stats (like "Tasks Completed") to stay in sync with the actual task list. I solved this by having the dashboard read the same localStorage data whenever it loads.
Clean Styles: I used regular CSS files instead of a big framework like Bootstrap. This helped me practice my CSS skills and kept the project lightweight.

Project Structure
src/components/Login.jsx: Handles email validation and session start.
src/components/Dashboard.jsx: Shows weather API data and task stats.
src/components/Tasks.jsx: The main logic for adding, filtering, and deleting tasks.
src/components/ProtectedRoute.jsx: Simple check to keep the app private.
