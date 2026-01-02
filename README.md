# TaskFlow ✅

A modern, feature-rich task management application built with React, TypeScript, and Tailwind CSS. Designed to help you organize your day and achieve your goals with style.

![TaskFlow Preview](https://img.shields.io/badge/React-18.3-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwindcss)


## 🚀 Live Demo

**[View Live Demo →](https://ntiyisopicasso.github.io/taskflow)**

> 

---

## ✨ Features

### Core Task Management
- ✅ **Add, Edit, Delete Tasks** - Full CRUD operations with inline editing
- 🎯 **Priority Levels** - High, Medium, Low with color-coded indicators
- 📁 **Categories** - Organize tasks by Work, Personal, Study, Health
- 📅 **Due Dates** - Set deadlines with smart date formatting
- ⚠️ **Overdue Alerts** - Visual warnings for past-due tasks

### Subtasks & Checklists
- 📋 **Nested Subtasks** - Break down complex tasks into smaller steps
- 📊 **Progress Tracking** - Visual progress bar for subtask completion
- ✏️ **Inline Editing** - Quick edit subtask titles without modals

### Filtering & Search
- 🔍 **Search** - Find tasks by title or description
- 🏷️ **Status Filters** - View All, Active, or Completed tasks
- 📂 **Category Filters** - Filter by Work, Personal, Study, Health

### User Experience
- 🌙 **Dark Mode** - Beautiful light and dark themes with smooth transitions
- 💾 **Local Storage** - Tasks persist across browser sessions
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- ⚡ **Smooth Animations** - Delightful micro-interactions throughout

### Dashboard
- 📈 **Task Statistics** - Overview of total, active, completed, and overdue tasks
- 📊 **Completion Rate** - Track your productivity at a glance

---

## 📸 Screenshots

### Light Mode
![Light Mode Dashboard](light.png/800x500/f5f5f4/1a1a1a?text=TaskFlow+Light+Mode)

### Dark Mode
![Dark Mode Dashboard](dark.png/800x500/1a1a1a/f5f5f4?text=TaskFlow+Dark+Mode)

### Task with Subtasks
![Subtasks Feature](list.png/800x400/f5f5f4/1a1a1a?text=Subtasks+Feature)

> 

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI library with hooks for state management |
| **TypeScript** | Type-safe JavaScript for better DX and fewer bugs |
| **Vite** | Lightning-fast build tool and dev server |
| **Tailwind CSS** | Utility-first CSS framework for rapid styling |
| **shadcn/ui** | Beautifully designed, accessible component library |
| **Radix UI** | Unstyled, accessible primitives for complex components |
| **Lucide React** | Beautiful, consistent icon set |
| **date-fns** | Modern JavaScript date utility library |
| **React Router** | Client-side routing |
| **TanStack Query** | Powerful data fetching and caching (ready for API integration) |

### Architecture Highlights

- **Custom Hooks** - Reusable logic with `useTasks` and `useTheme`
- **Component-Based** - Modular, maintainable component structure
- **Design System** - Consistent theming with CSS variables
- **Type Safety** - Full TypeScript coverage with strict mode

---

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm, yarn, or bun

### Quick Start

```bash
# Clone the repository
git clone https://github.com/ntiyisopicasso/taskflow.git

# Navigate to project directory
cd taskflow

# Install dependencies
npm install
# or
yarn install
# or
bun install

# Start development server
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── AddTaskForm.tsx  # Task creation form
│   ├── TaskCard.tsx     # Individual task display
│   ├── TaskFilters.tsx  # Search and filter controls
│   ├── TaskStats.tsx    # Statistics dashboard
│   ├── SubtaskList.tsx  # Subtask management
│   ├── ThemeToggle.tsx  # Dark mode switch
│   └── EmptyState.tsx   # Empty list placeholder
├── hooks/
│   ├── useTasks.ts      # Task CRUD operations
│   └── useTheme.ts      # Theme management
├── types/
│   └── task.ts          # TypeScript interfaces
├── pages/
│   └── Index.tsx        # Main application page
├── lib/
│   └── utils.ts         # Utility functions
└── index.css            # Global styles & design tokens
```

---

## 🚀 Deployment

### GitHub Pages

```bash
# Build for production
npm run build

# Deploy to GitHub Pages (using gh-pages)
npm install -D gh-pages
npx gh-pages -d dist
```

### Netlify

1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy!

### Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

---

## 🎨 Customization

### Changing Colors

Edit `src/index.css` to modify the design tokens:

```css
:root {
  --primary: 174 72% 40%;        /* Teal accent */
  --priority-high: 0 84% 60%;    /* Red for high priority */
  --priority-medium: 38 92% 50%; /* Amber for medium */
  --priority-low: 142 71% 45%;   /* Green for low */
}
```

### Adding Categories

Update `src/types/task.ts`:

```typescript
export type Category = 'work' | 'personal' | 'study' | 'health' | 'your-new-category';
```

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


---

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful component library
- [Lucide](https://lucide.dev/) for the icon set
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

<p align="center">
  Built by <a href="ntiyiso-picasso.vercel.app">Ntiyiso Picasso</a>
</p>
