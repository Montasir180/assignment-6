# FitLog — Workout Library

FitLog is a modern and responsive workout management web application built with **Next.js**. Users can browse workouts, view detailed workout information, add workouts to their daily plan, save workouts for later, and manage their workout plan dynamically.

The project focuses on a clean, premium, glassy UI while implementing important Next.js concepts such as dynamic routes, API fetching, client components, context API, reusable components, and responsive design.

---

## 🚀 Live Website

**Live Link:**
Add your deployed website link here.

Example:

`https://your-project.vercel.app`

---

## 💻 GitHub Repository

**GitHub:**
Add your GitHub repository link here.

Example:

`https://github.com/your-username/fitlog`

---

## 📌 Project Features

### 1. Workout Library

* Browse available workouts dynamically from the API.
* Responsive workout cards.
* Workout image, name, category, duration, calories and rating are displayed.
* Premium glassy card design.
* View Details button for every workout.

### 2. Dynamic Workout Details

* Dynamic route using:

```text
/workout/[id]
```

* Displays complete workout information.
* Workout image.
* Categories.
* Description.
* Equipment.
* Difficulty.
* Sets.
* Reps.
* Duration.
* Calories.
* Rating.
* Step-by-step instructions.

### 3. My Plan

Users can:

* Add workouts to Today's Plan.
* See total exercises.
* See total workout duration.
* See total calories.
* Mark a workout as completed.
* Remove workouts from the plan.
* View workout details.
* Manage the plan dynamically.

When a workout is marked as completed, it is removed from the active plan.

### 4. Saved Workouts

Users can:

* Save workouts for later.
* View all saved workouts.
* Open workout details.
* Remove saved workouts.
* See the total number of saved workouts.

### 5. Smart Workout Actions

A workout cannot be added to both states at the same time.

For example:

* If a workout is added to Today's Plan, the Plan button becomes disabled.
* If a workout is saved, the Save button becomes disabled.
* The UI updates immediately after an action.

### 6. Responsive Design

The website is designed to work on:

* Desktop
* Laptop
* Tablet
* Mobile

Tailwind CSS responsive utilities are used throughout the project.

### 7. Reusable Components

The application uses reusable components such as:

* Navbar
* Footer
* Hero
* Library
* Workout Card
* Workout Actions
* Context Provider

This keeps the project organized and easier to maintain.

---

## 🛠️ Technologies Used

* **Next.js 16**
* **React**
* **JavaScript**
* **Tailwind CSS**
* **Next.js App Router**
* **Context API**
* **REST API**
* **HTML5**
* **CSS3**
* **Git & GitHub**

---

## 📂 Project Structure

```text
assa-six/
│
├── public/
│   ├── me.svg
│   ├── globe.svg
│   ├── next.svg
│   └── window.svg
│
├── src/
│   └── app/
│       │
│       ├── components/
│       │   ├── Hero.jsx
│       │   ├── Library.jsx
│       │   ├── Navbar.jsx
│       │   ├── Footer.jsx
│       │   ├── WorkoutCard.jsx
│       │   └── WorkoutActions.jsx
│       │
│       ├── context/
│       │   └── FitLogContext.jsx
│       │
│       ├── my-plan/
│       │   └── page.js
│       │
│       ├── saved/
│       │   └── page.js
│       │
│       ├── workout/
│       │   └── [id]/
│       │       └── page.js
│       │
│       ├── globals.css
│       ├── layout.js
│       └── page.js
│
├── .gitignore
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs
├── package.json
└── README.md
```

---

## 🔌 API

The workout data is fetched from the FitLog API.

```text
https://api.abcz.workers.dev/api/fitlog
```

Individual workouts are accessed using their ID:

```text
https://api.abcz.workers.dev/api/fitlog/{id}
```

Example:

```text
https://api.abcz.workers.dev/api/fitlog/1
```

The application handles API loading and error states so that invalid or unavailable workout data does not break the application.

---

## 🧠 State Management

The project uses **React Context API** for global workout state management.

The main context is:

```text
FitLogContext.jsx
```

It manages:

* `plan`
* `saved`
* `addToPlan`
* `removeFromPlan`
* `saveWorkout`
* `removeFromSaved`
* workout completion
* dynamic counters

This allows the Navbar, Workout Details, My Plan and Saved pages to stay synchronized.

---

## 🔄 Main User Flow

```text
Home
  │
  ├── Browse Workouts
  │       │
  │       └── View Details
  │              │
  │              ├── Add To Today's Plan
  │              │
  │              └── Save For Later
  │
  ├── My Plan
  │       │
  │       ├── View Details
  │       ├── Mark As Done
  │       └── Remove
  │
  └── Saved
          │
          ├── View Details
          └── Remove
```

---

## 🎨 UI Design

The application follows a dark premium fitness-dashboard style.

### Design characteristics

* Dark background
* Neon lime accent color
* Glassy cards
* Rounded corners
* Subtle borders
* Soft background gradients
* Responsive layouts
* Strong typography
* Interactive buttons
* Hover effects
* Consistent spacing

The design is inspired by the provided Figma reference while keeping the implementation responsive and functional.

---

## 📱 Responsive Behavior

The layout adapts based on screen size.

### Desktop

* Multi-column workout layout
* Large workout images
* Full navigation
* Dashboard-style plan cards

### Tablet

* Reduced spacing
* Flexible grid layouts
* Responsive typography

### Mobile

* Single-column layout
* Stacked buttons
* Responsive workout cards
* Mobile-friendly navigation
* Full-width content

---

## ⚙️ Installation & Setup

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Go to the project folder:

```bash
cd assa-six
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 📜 Available Scripts

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Lint

```bash
npm run lint
```

---

## ✨ Key Next.js Concepts Used

This project demonstrates several important Next.js concepts:

* App Router
* Dynamic Routes
* Server Components
* Client Components
* API Data Fetching
* `async` components
* `fetch()`
* `cache: "no-store"`
* Layout
* Nested routes
* Context API
* Reusable components
* Responsive Tailwind CSS

---

## 📚 Pages

| Page            | Route           | Purpose                    |
| --------------- | --------------- | -------------------------- |
| Home            | `/`             | Workout library            |
| Workout Details | `/workout/[id]` | Individual workout details |
| My Plan         | `/my-plan`      | Manage today's workouts    |
| Saved           | `/saved`        | Manage saved workouts      |

---

## 🎯 Assignment Requirements

The project includes the major required application functionality:

* Responsive user interface
* Navigation system
* Workout library
* Dynamic workout data
* Dynamic workout details
* Add workout to plan
* Save workout
* Remove workout from plan
* Remove saved workout
* Mark workout as completed
* Dynamic plan statistics
* Dynamic saved statistics
* Reusable React components
* Context API state management
* Responsive design
* GitHub-ready project structure

---

## 🔐 Error Handling

The application handles common errors such as:

* Invalid workout ID
* Missing workout data
* Failed API request
* Empty plan
* Empty saved list
* Undefined workout objects

For example, if a workout does not exist, the application displays a **Workout Not Found** message instead of crashing.

---

## 👨‍💻 Author

**Montasir Islam**

Frontend Developer
Interested in React, Next.js, JavaScript and modern web development.

---

## 📄 License

This project was created for educational and assignment purposes.
