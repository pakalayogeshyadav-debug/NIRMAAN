# NIRMAAN — Frontend

**Verified Community Action**

NIRMAAN is a civic-tech platform designed to turn waste observations into verified community action. This repository contains the frontend application.

> **DETECT → VERIFY → PRIORITIZE → ACT → CLEAN → PROVE → IMPACT**

---

## Overview

NIRMAAN connects citizens, volunteers, NGOs, and organizations in a closed-loop verified action system for waste management. A waste site is reported → evaluated → prioritized → someone takes action → cleanup evidence is submitted → action is verified → impact becomes measurable.

This frontend is designed to integrate with a separately developed FastAPI backend, PostgreSQL database, and authentication server.

---

## Technology Stack

| Category       | Technology                  |
| -------------- | --------------------------- |
| Framework      | React 19                    |
| Build Tool     | Vite 8                      |
| Language       | TypeScript 6                |
| Styling        | Tailwind CSS 4              |
| Routing        | React Router 7              |
| Icons          | Lucide React                |
| HTTP Client    | Axios (centralized)         |
| Linting        | ESLint                      |
| Formatting     | Prettier                    |

---

## Development Setup

### Prerequisites

- **Node.js** ≥ 20
- **npm** ≥ 10

### Installation

```bash
cd frontend
npm install
```

### Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

| Variable             | Description                     | Default                          |
| -------------------- | ------------------------------- | -------------------------------- |
| `VITE_API_BASE_URL`  | Backend API base URL            | `http://localhost:8000/api`      |
| `VITE_APP_NAME`      | Application name                | `NIRMAAN`                        |
| `VITE_APP_ENV`       | Environment (development/prod)  | `development`                    |

> ⚠️ Never commit the `.env` file. It is excluded via `.gitignore`.

### Run Locally

```bash
npm run dev
```

The application will start at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

Output is written to `dist/`.

### Lint & Format

```bash
npm run lint
npm run format
```

---

## Project Structure

```
frontend/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── navigation/       # Header, Footer
│   │   ├── shared/           # NirmaanLogo, NirmaanPattern
│   │   └── ui/               # Button, Input, Card, Badge, Modal, etc.
│   ├── config/               # Environment configuration
│   ├── context/              # React context providers (AuthContext)
│   ├── hooks/                # Custom hooks (useAuth)
│   ├── layouts/              # PublicLayout, AppLayout
│   ├── lib/                  # API client, utilities
│   ├── pages/
│   │   └── landing/          # Design system verification page
│   ├── routes/               # Route definitions
│   ├── services/             # API service layer (auth.service)
│   ├── types/                # TypeScript type definitions
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css             # Design system tokens & global styles
├── .env.example
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## Design System

### Colour Palette

- **NIRMAAN Green** `#3F6F5B` — Primary brand and action colour
- **Deep Green** `#315845` — Emphasis and hover states
- **Light Saffron** `#F3D5BD` — Indian accent (pattern, decoration)
- **Soft Terracotta** `#E8B08A` — Indian accent
- **Muted Gold** `#D8C08A` — Indian accent
- **Background** `#FFFFFF` — Primary background
- **Soft Background** `#FCFAF7` — Secondary/soft background

### Typography

**Inter** is the primary typeface with a scale from 11px (overline) to 36px (display).

### Indian Geometric Pattern

A flowing geometric system inspired by rangoli, jaali lattice architecture, and textile geometry. Rendered as multi-layer SVG with saffron, terracotta, and gold strokes at 3–7% perceived intensity. Available as the `<NirmaanPattern>` component with placement variants.

### Component Library

| Component    | Description                                 |
| ------------ | ------------------------------------------- |
| `Button`     | 5 variants, 3 sizes, loading, icon support  |
| `Input`      | Label, helper, error, icon slots            |
| `Textarea`   | Resizable with validation support           |
| `Select`     | Native with custom chevron                  |
| `Card`       | Header / Content / Footer compound          |
| `Badge`      | 6 variants + dot mode                       |
| `Avatar`     | Image with initials fallback                |
| `Modal`      | Native dialog-based                         |
| `Tooltip`    | Hover/focus activated                       |
| `Loading`    | Spinner with optional text                  |
| `EmptyState` | Geometric motif + message + action          |
| `Divider`    | Horizontal / vertical                       |

---

## Architecture

### API Layer

```
Component → Hook/Context → Service → apiClient → Backend
```

All backend communication flows through a centralized Axios instance (`src/lib/api-client.ts`) with request/response interceptors. Service modules (`src/services/`) define the API contracts. Components never call backend endpoints directly.

### Authentication

Authentication architecture is prepared but **not connected** to any backend. The `AuthContext` provider manages auth state, and the `authService` defines the expected API contract (login, register, logout, getCurrentUser). No fake auth mechanisms are implemented.

### Account Types

The system supports two primary account types:
- **USER** — Citizens and volunteers
- **ORGANIZATION** — NGOs, community organizations, corporate, CSR

Roles are designed to be extensible without hardcoding.

---

## Backend Integration

> ⚠️ Backend/API integration will be implemented in a future sprint with the backend developer.

The frontend is structured for clean integration with a FastAPI REST backend. The API base URL is configured via `VITE_API_BASE_URL`. All service methods are already structured with the expected endpoint paths.

---

## Routing

All routes are defined in `src/routes/index.tsx`. Currently, only the design system verification page is implemented. All other routes display placeholder content.

**Public routes:** `/`, `/how-it-works`, `/impact`, `/login`, `/register`

**User routes:** `/app`, `/app/report`, `/app/reports`, `/app/tasks`, `/app/drives`, `/app/impact`, `/app/profile`, `/app/settings`

**Organization routes:** `/organization`, `/organization/reports`, `/organization/drives`, `/organization/volunteers`, `/organization/funding`, `/organization/impact`, `/organization/profile`, `/organization/settings`
