# Digital Performance & Project Management System (React + Vite)

A demo-grade, single-page application that showcases an integrated office productivity suite: KPI tracking, project collaboration, expense management, RTI portal, ticket management, and role-based dashboards. Built with React, TypeScript, Vite, Tailwind CSS, and shadcn/ui (Radix UI).

## Quick Start

```bash
npm ci
npm run dev
# Opens on http://localhost:8080 (also available on your LAN)
```

Additional scripts:

- `npm run build`: Production build to `dist/`
- `npm run build:dev`: Development-mode build
- `npm run preview`: Preview the production build locally
- `npm run lint`: Run ESLint

Vite dev server is configured to run on port `8080` and bind to all interfaces for LAN testing.

## Features

- Role-based dashboards: `Employee`, `Supervisor`, `Admin` views under `/dashboard/*`
- KPI management: KPI dashboard, definitions, and scoring models
- Performance tracking: Enter and visualize performance scores
- Project collaboration: Threads, tasks, and basic team co-ordination
- Expense management: Track project expenses and approvals
- RTI portal: Public information, requests, and processing metadata
- Ticket management: Simple issue/query tracking with status & priority
- iPPMS dashboard: Integrated workflow overview for office operations
- Modern UI/UX: shadcn/ui components, Radix primitives, Tailwind CSS
- Notifications: Toasts via `@/components/ui/toaster` and Sonner
- Client-side routing: `react-router-dom`
- Mock backend: In-memory services with sample data

## Architecture Overview

- UI components in `src/components` (feature widgets, dashboard cards, shadcn/ui primitives under `components/ui`)
- Pages in `src/pages` (route-level views)
- Context providers in `src/context` (auth and access control)
- Service layer in `src/services` (mock APIs for auth, KPI, projects, RTI, tickets, etc.)
- Global providers in `src/providers.tsx` (React Query, contexts, theming support)
- Routing and app shell in `src/App.tsx`

### Routing

Defined in `src/App.tsx`:

- `/` → `HomePage` (landing with hero, activities, milestones, vision, who-we-are)
- `/dashboard/employee` → Employee dashboard
- `/dashboard/supervisor` → Supervisor dashboard
- `/dashboard/admin` → Admin dashboard
- `/dashboard` → Protected consolidated performance dashboard
- `/kpi-dashboard` → Protected KPI dashboard
- `/expense-management` → Protected expenses module
- `/project-collaboration` → Protected collaboration hub
- `/rti-portal` → Protected RTI portal
- `/ticket-management` → Protected ticketing module
- `/ippms` → Protected integrated iPPMS dashboard
- `*` → 404

Protected routes require a logged-in user and, for some pages, specific permissions.

### Authentication

Located in `src/context/AuthContext.tsx` with a mock `api.login` call (see `src/services/api.ts`). The authenticated user is persisted to `localStorage`. The `LoginModal` on the home page simulates selecting a role and navigating to a relevant dashboard.

### Access Control (RBAC)

Implemented in `src/context/AccessControlContext.tsx`. Each role maps to a set of permissions (view/manage KPIs, projects, expenses, tickets, RTI, users). The `ProtectedRoute` component in `src/App.tsx` checks for authentication and, when specified, the required permission before rendering.

### Services (Mock Backend)

All data is in memory and resets on reload. Key modules:

- `src/services/api.ts`: Users, KPIs, performance scores, projects, expenses, tickets, plus auth helpers
- `src/services/kpiDefinitionService.ts`: Rich KPI definition types and helpers
- `src/services/rtiService.ts`: RTI requests and proactively disclosed public information
- `src/services/collaborationService.ts`: Collaboration threads, participants, and utilities
- `src/services/scoringModelService.ts`: KPI scoring model helpers

These services are designed to be swapped for real APIs later.

## Tech Stack

- React 18, TypeScript, Vite 5
- Tailwind CSS, shadcn/ui, Radix UI
- React Query (`@tanstack/react-query`) for data fetching/caching
- React Router v6

## Development

```bash
# Install exact deps from lockfile
npm ci

# Run the dev server (http://localhost:8080)
npm run dev

# Lint
npm run lint

# Build and preview
npm run build
npm run preview
```

Vite config: see `vite.config.ts` (port 8080, aliases `@ → ./src`).

## Deployment

The project includes `netlify.toml` and `vercel.json` for easy static hosting. Build with `npm run build` and deploy the `dist/` folder.

## Project Structure (high level)

```
src/
  components/         # Feature widgets and UI (shadcn in components/ui)
  context/            # Auth & Access Control contexts
  pages/              # Route-level views
  services/           # Mock API/services
  providers.tsx       # Global providers (React Query, contexts)
  App.tsx             # Routes and app shell
  main.tsx            # App bootstrap
```

## Notes

- This repository uses mock data for demonstration. No real backend calls are performed.
- Permissions and role names are set for demo purposes and can be adjusted in `AccessControlContext` and services.
# SIH2520
