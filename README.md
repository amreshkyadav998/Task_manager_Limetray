

# Task Manager App

A fully-featured **Task Manager Application** built with **React.js** and **Tailwind CSS**, focusing on clean architecture, performance optimization, and a responsive UI.

---

## Features

### Basic Features

* Add new tasks
* Mark tasks as completed
* Delete tasks
* Filter tasks: **All / Completed / Pending**
* Persist tasks using **Local Storage**

### React Challenges Implemented

* **Custom Hooks**: Created a reusable `useLocalStorage` hook for managing local storage operations.
* **Context API**: Used React Context to handle task data globally (avoiding prop drilling).
* **Performance Optimization**: Used `React.memo`, `useCallback`, and `useMemo` where applicable to avoid unnecessary re-renders.
* **Form Validation**: Prevent users from adding empty tasks.

### CSS & UI Challenges

* **Responsive Design**: Built with a mobile-first approach, ensuring smooth experience across devices.
* **Animations**: CSS transitions for adding and removing tasks for a better user experience.
* **Drag-and-Drop Support**: Implemented using **react-beautiful-dnd**, allowing easy task reordering.
* **React toast on success and failure**

---

## Tech Stack

* **React.js**
* **Tailwind CSS**
* **react-beautiful-dnd (another way)**
* **lucide-react icons**
* **react-hot-toast**

---

-
## Upcoming Features

* **Dark Mode / Light Mode Toggle** (will be added soon)

---

## Getting Started

1. Clone the repo

```bash
git clone [https://github.com/your-username/task-manager.git](https://github.com/amreshkyadav998/Task_manager_Limetray.git)
```

2. Install dependencies

```bash
npm install
```

3. Start development server

```bash
npm run dev
```

---
