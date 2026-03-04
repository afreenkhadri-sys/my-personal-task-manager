# Personal Task Manager

A fully functional, self-contained task management web application built with React and Vite. Includes login, dashboard with live weather, and a feature-rich task manager — all running locally with zero backend.
Personal Task Manager with Weather Dashboard,,.

**What It Does**

A React task management app with login, task tracking, and real-time weather. Features persistent storage, protected routes, and a responsive dashboard.

**How to Run**

Clone the repository

Run npm install

Run npm run dev

Open http://localhost:5173

**Login Credentials**

Use any valid email format (e.g., user@example.com) with any password.

**Tech Stack**

React 18 with Vite

React Router for navigation

localStorage for data persistence

Open-Meteo API for weather (no API key required)

**How I Built It**

1. Set Up Routing First

I created all three pages (Login, Dashboard, Tasks) and connected them with React Router before adding features. This helped me understand the navigation flow clearly.

2. Built Protected Routes

I created a ProtectedRoute component that checks if the user is logged in. If not, it redirects to /login. This prevents unauthorized access to Dashboard and Tasks pages.

3. Implemented Authentication

Login validates email format and required fields, then saves isLoggedIn and userEmail to localStorage. On logout, I clear all data including tasks to ensure a clean slate.

4. Built Task Management

Taskss store title, description, priority, category, and completion status in localStorage. Users can add, delete, mark complete, and filter by category or status.

5. Added Weather Widget

I used browser geolocation and Open-Meteo API for real weather. When geolocation is denied, I show mock weather with a clear note: 'Location unavailable. Showing demo weather.' This ensures thee UI never breaks.

Key Decisions I Made

Component Structure

I kept components small and focused. Each page handles its own state using useState and useEffect hooks. No external state management library was needed for this project.

Data Persistence

localStorage was the right choice because it's simple, free, and works for this project scope. Tasks persist across page refreshes and only clear on logout.,

Weather Fallback

My laptop has geolocation disabled. Instead of treating this as an error, I created realistic mock weather so the app always works. Users see a small disclaimer if location is unavailable.,

Styling

Vanilla CSS with inline styles keeps the codebase lightweight and easier   to understand and modify.

Challenges & Solutions

Challenge: Understanding Protected Routes

Solution: I researched React Router patterns, understood the logic, then built my own ProtectedRoute component. It checks authentication state before rendering protected pages.

Challenge: Geolocation Not Working

Solution: I implemented a graceful fallback system with mock data and user notifications instead of showing errors.

Challenge: Keeping Tasks in Sync

Solution: I use localStorage as single source of truth and update it whenever tasks change. Statistics recalculate automatically from task state.
