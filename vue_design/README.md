# Vue To-Do App

A multi-page todo application built with Vue 3, Vue Router, Pinia, and PrimeVue.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the local URL shown in the terminal, usually:

```bash
http://localhost:5173
```

If port 5173 is already in use, Vite will automatically choose another port.

## Features

- Vue 3 application built with the Composition API
- Client-side routing with Vue Router
- Four main views: Overview, Detail, Add Todo, and About
- Centralized state management with Pinia
- Five predefined todos loaded on startup
- Reusable todo card component
- Dynamic todo detail page based on todo ID
- Add Todo form with validation and inline error messages
- PrimeVue theme integration for modern styling
- Search and filter controls for the todo overview
- LocalStorage persistence for saved todos

## Notes

- The project is intended to run after `npm install` and `npm run dev`.
- The build script in `package.json` should be checked if you plan to use `npm run build`.
