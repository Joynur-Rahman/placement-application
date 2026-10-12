# 🎓 Smart Campus Placement & Skill Gap Analyzer

> An intelligent, data-driven web platform connecting academic learning with industry standards through continuous skill assessment, automated skill gap visualization, and smart opportunity matching.

[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.3-purple?logo=vite)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2.13-purple?logo=redux)](https://redux-toolkit.js.org/)
[![Vitest](https://img.shields.io/badge/Tests-18%20Passed-brightgreen?logo=vitest)](https://vitest.dev/)

---

## 📖 Overview

The **Smart Campus Placement & Skill Gap Analyzer** bridges the gap between student competencies and employer hiring requirements. It establishes three specialized portals:

1. **Student Portal**: Manage profiles and verified credentials, take adaptive skill evaluations, visualize competency radar charts against target roles, and discover high-compatibility job listings.
2. **Recruiter Desk**: Post opportunities with granular skill requirements, source pre-evaluated candidates, and filter applicants ranked by real-time match percentages.
3. **Admin Console**: Monitor university-wide placement drives, assess departmental skill trends, generate institutional audit reports, and export compliance data.

---

## 🚀 Key Features Implemented

### 1. Foundation & Architecture (Phase FE1)
- **Vite 8 + React 19 + TypeScript** build toolchain with path alias resolution (`@/*`).
- **Centralized Redux Store** (`@reduxjs/toolkit`) with modular slices:
  - `authSlice`: User session, authentication token, and role states.
  - `profileSlice`: Student resume data, academic milestones, and documents.
  - `opportunitySlice`: Job listings, dynamic filter parameters, and selections.
  - `notificationSlice`: System alerts and real-time unread counter.
- **Tailwind CSS Design System** tailored with dark-mode glassmorphic aesthetics, glowing accents, and responsive layout classes.
- **Resilient HTTP Client** (`axios`) configured with request authorization interceptors and automated 401 token revocation.

### 2. Authentication & Role-Based Access Control (Phase FE2)
- **Validated Login & Register UI**: Built using `react-hook-form` and schema enforcement via `zod`.
- **Interactive Multi-Role Selector**: Dedicated registration modes for `Student`, `Recruiter`, and `Campus Admin`.
- **Custom Auth Hook & Context**: `useAuth` hook and `AuthContext` providing cross-tab session synchronization (`storage` event listeners).
- **Route Protection**: `ProtectedRoute` wrapper guarding portal paths according to user roles (RBAC) with fallback unauthorized views.
- **Fault Tolerance**: `AuthErrorBoundary` and dismissible alert banners (`AuthErrorAlert`) preventing UI crashes on auth errors.

### 3. Layout & Portal Navigation (Phase FE3)
- **Master Layout (`Layout.tsx`)**: Integrates top navigation, slide-out drawer, desktop sidebar, and footer.
- **Glassmorphic Header (`Header.tsx`)**: Real-time user profile dropdown, initials avatar, role badge, notification bell, and mobile hamburger trigger.
- **Role-Aware Sidebar & Navigation (`Sidebar.tsx` / `Navigation.tsx`)**: Contextual menu items adapted to active credentials (`/student/*`, `/recruiter/*`, `/admin/*`).
- **Slide-Over Mobile Drawer (`MobileNav.tsx`)**: Optimized for responsive touch screens with backdrop blur and ESC key dismissal.
- **Branded Footer (`Footer.tsx`)**: Links to campus resources, security indicators, and version tracking.
- **Portal Dashboards**:
  - `StudentDashboard`: Readiness progress, verified documents, test summaries, and matched drives.
  - `RecruiterDashboard`: Active openings, candidate applicants, and shortlist pipelines.
  - `AdminDashboard`: Total eligible candidates, placement conversion rates, and partner statistics.
- **Custom 404 Experience (`NotFound.tsx`)**: Interactive error page with recovery navigation.

---

## 🛠️ Technology Stack

| Category | Technology |
| :--- | :--- |
| **Frontend Framework** | React 19 (TypeScript) |
| **Build & Bundler** | Vite 8 + Rolldown/Rollup chunk optimization |
| **State Management** | Redux Toolkit & React-Redux |
| **Styling & UI** | Tailwind CSS + Lucide Icons + Glassmorphism |
| **Form Management** | React Hook Form + Zod Resolvers |
| **HTTP Client** | Axios (with bearer token interceptors) |
| **Unit Testing** | Vitest + React Testing Library + Jest-DOM |
| **Utilities** | Lodash, Date-fns, UUID |

---

## 📂 Project Structure

```
campus_seller/
├── .kiro/                          # Product requirements & task specifications
│   └── specs/smart-campus-placement-analyzer/
│       ├── requirements.md
│       ├── design.md
│       └── tasks.md
├── public/                         # Public static assets
├── src/
│   ├── components/                 # Reusable layout & form components
│   │   ├── AuthErrorAlert.tsx
│   │   ├── AuthErrorBoundary.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Layout.tsx
│   │   ├── LoginForm.tsx
│   │   ├── MobileNav.tsx
│   │   ├── Navigation.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── RegisterForm.tsx
│   │   └── Sidebar.tsx
│   ├── context/                    # React Context providers (AuthContext)
│   ├── hooks/                      # Custom hooks (useAuth, useAppDispatch, etc.)
│   ├── pages/                      # Page views and portal dashboards
│   │   ├── admin/AdminDashboard.tsx
│   │   ├── recruiter/RecruiterDashboard.tsx
│   │   ├── student/StudentDashboard.tsx
│   │   ├── Home.tsx
│   │   ├── NotFound.tsx
│   │   └── Unauthorized.tsx
│   ├── services/                   # API clients (apiClient, authService)
│   ├── store/                      # Redux store configuration & slices
│   │   ├── slices/                 # profileSlice, opportunitySlice, notificationSlice
│   │   ├── authSlice.ts
│   │   └── index.ts
│   ├── styles/                     # Global CSS & Tailwind utilities
│   │   └── globals.css
│   ├── test/                       # Unit tests & test utilities
│   │   ├── LoginForm.test.tsx
│   │   ├── Navigation.test.tsx
│   │   ├── RegisterForm.test.tsx
│   │   ├── setup.ts
│   │   └── test-utils.tsx
│   ├── types/                      # TypeScript definitions (auth, profile, opps)
│   ├── utils/                      # Helper utilities (formatDate, currency, cn)
│   ├── App.tsx                     # Nested Route hierarchy & portal mapping
│   └── main.tsx                    # Application entrypoint with Providers
├── package.json
├── tailwind.config.js
├── tsconfig.app.json
├── vite.config.ts
└── vitest.config.ts
```

---

## 💻 Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or later (v22+ recommended)
- **npm**: v9.0.0 or later

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd campus_seller

# 2. Install dependencies
npm install

# 3. Configure environment variables (optional)
cp .env.example .env
```

### Development Server

Run the development server locally:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Running Tests

Execute the Vitest test suite:
```bash
npm test
```

### Production Build

Compile the production bundle:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

---

## 📋 Implementation Roadmap

- [x] **Phase FE1**: Foundation & Setup
- [x] **Phase FE2**: Authentication UI & Session Management
- [x] **Phase FE3**: Layout & Navigation
- [ ] **Phase FE4**: Shared Components Library
- [ ] **Phase FE5**: Student Profile Page
- [ ] **Phase FE6**: Assessment Engine UI
- [ ] **Phase FE7**: Skill Gap Visualization (Radar & Charts)
- [ ] **Phase FE8**: Opportunity Discovery
- [ ] **Phase FE9**: Student Application History
- [ ] **Phase FE10**: Recruiter Portal & Job Posting
- [ ] **Phase FE11**: Search & Advanced Filtering
- [ ] **Phase FE12**: Notification Center
- [ ] **Phase FE13**: Admin Analytics & Reports
- [ ] **Phase FE14**: Responsive Design Polish
- [ ] **Phase FE15**: Comprehensive Frontend Testing

---

## 📄 License
This project is licensed under the MIT License.
