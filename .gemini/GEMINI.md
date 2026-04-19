# Project Structure: Personality Analysis

This project is an Angular 20 application integrated with Firebase.

## Directory Overview

- `/`: Root directory containing Firebase configuration and global settings.
  - `.firebaserc`, `firebase.json`: Firebase configuration for deployment.
  - `firebase.ts`: Firebase utility or initialization (root level).
  - `app/`: The main Angular frontend application.
  - `.github/workflows/`: GitHub Actions for Firebase Hosting deployment.

## Frontend Application (`/app`)

The Angular application is located in the `app/` directory and uses standalone components, signals, and modern Angular v20+ patterns.

### Core Structure (`app/src/app/`)

- `auth/`: Authentication logic and UI components (e.g., `auth-button`).
- `beer/`: Beer management and visualization.
  - `beer-graph/`: Charting components for beer data.
  - `beer-rank/`: Ranking system with dialogs.
  - `beer-summary/`: Overview of beer stats.
- `discussion/`: Social or analysis features.
  - `judge/`: Evaluation or "judging" logic.
- `sake/`: Sake management and visualization.
- `todo/`: Task management features.
- `dump/`: Export or data visualization components for Beer, Sake, and Discussions.
- `recommend/`: Recommendation engine UI.
- `services/`: Global singleton services:
  - `auth-service.ts`: Firebase authentication.
  - `database-service.ts`: Data persistence and retrieval.
  - `json-service.ts`: JSON data handling.
  - `theme.service.ts`: Application theme (light/dark) management.
- `components/`: Reusable shared components (e.g., `theme-switcher`).

### Key Technologies

- **Frontend:** Angular v20, TypeScript, Tailwind CSS, Angular Material, CDK.
- **Backend/Platform:** Firebase (Hosting, Auth, Database).
- **Charts:** Chart.js with `ng2-charts`.
- **Testing:** Playwright (E2E), Vitest.
