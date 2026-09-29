# My Todo App

A full-stack todo application with a TypeScript backend and a Next.js frontend.

## Features

- Create, edit, delete todos
- Mark todos as completed or incomplete
- Filter todos by status (Active / Completed / All)
- Light and dark theme toggle
- Persistent storage in a local JSON file

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router), React, TypeScript, Tailwind CSS v4 |
| Backend | Node.js, Express 4, TypeScript |
| Storage | JSON file (`server/data/todos.json`) |
| Tooling | tsx, Prettier, ESLint, Git |

## Project Structure

```
my-todo-app/
├── server/               # Express + TypeScript backend
│   ├── src/
│   │   ├── server.ts     # Express entry point
│   │   ├── db.ts         # JSON file storage + Todo type
│   │   └── routes/
│   │       └── todos.ts  # REST endpoints
│   ├── data/
│   │   └── todos.json    # The database
│   ├── package.json
│   └── tsconfig.json
└── client/               # Next.js frontend
    ├── app/
    │   ├── page.tsx      # Main UI
    │   ├── layout.tsx    # Root layout
    │   └── globals.css   # Tailwind + dark mode config
    └── package.json
```

## API Endpoints

| Method | Path | Description |
|---|---|---|
| `GET` | `/todos` | List all todos. Optional `?status=active\|completed` filter |
| `POST` | `/todos` | Create a todo. Body: `{ title: string }` |
| `PATCH` | `/todos/:id` | Update title and/or completed. Body: `{ title?, completed? }` |
| `DELETE` | `/todos/:id` | Delete a todo |

## Getting Started

**Requirements:** Node.js 18+ and npm.

### 1. Clone the repo

```bash
git clone https://github.com/Hanan-3450/my-todo-app.git
cd my-todo-app
```

### 2. Start the backend

```bash
cd server
npm install
npm run dev
```

Runs on **http://localhost:4000**.

### 3. Start the frontend

In a new terminal:

```bash
cd client
npm install
npm run dev
```

Runs on **http://localhost:3000**.

Open http://localhost:3000 in your browser.

## Build for Production

**Backend:**

```bash
cd server
npm run build   # compiles TypeScript to dist/
npm start       # runs the compiled JS
```

**Frontend:**

```bash
cd client
npm run build
npm start
```

## Notes

- Data is stored in `server/data/todos.json` and persists across restarts.
- The frontend and backend run on different ports. CORS is enabled on the backend to allow the browser to call it.
- The dark mode toggle uses Tailwind v4's `@custom-variant` directive and the `.dark` class on `<html>`.

## Author

Hanan — built as a mentoring project.