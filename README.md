# Personal Task Manager

A fully functional, self-contained task management web application built with React and Vite. Includes login, dashboard with live weather, and a feature-rich task manager — all running locally with zero backend.

## Features

- Secure login with email validation (no real authentication server)
- Dashboard with personalized greeting, task statistics, and live weather from Open-Meteo API
- Task management with title, description, priority (Low/Medium/High), and category (Work/Personal/Shopping)
- Mark tasks as complete/incomplete, delete tasks, and filter by status or category
- Sort tasks by priority or date added
- All data persists in browser localStorage
- Responsive design that works on mobile and desktop

## How to Run Locally

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the development server
4. Open `http://localhost:5173` in your browser

## Login Credentials

This app uses mock authentication:
- Email: Any valid email address (e.g., `user@example.com`)
- Password: Any non-empty string

There is no database or backend — login state is stored in `localStorage`.

## Technical Decisions

- **Routing**: Uses React Router v6 with a custom `ProtectedRoute` component to enforce authentication.
- **Weather API**: Uses Open-Meteo (free, no API key required) with automatic geolocation and graceful fallback.
- **State Management**: Local state for UI interactions; `localStorage` for for persistent task and auth data.
- **Styling**: Plain CSS-in-JS (no external CSS files or frameworks) for simplicity and full control.
- **Error Handling**: Input validation on login and task forms; graceful degradation for weather API failures.

## Challenges Encountered

- Geolocation permissions vary across browsers — added fallback to London coordinates.
- Open-Meteo returns weather codes instead of strings — mapped to human-readable conditions.s
- Sorting tasks by priority required defining an explicit order (Low < Medium < High).
- Ensuring localStorage updates reliably required careful placement of `useEffect` hooks.

l
