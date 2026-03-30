# FitManager - Enterprise Gym Management Framework 🏋️‍♂️

FitManager is a full-stack, enterprise-grade gym management application. Featuring a modern, highly responsive React frontend and a powerful Python (FastAPI) backend. It is designed around robust software engineering practices, extending from core component building to comprehensive End-to-End (E2E) automation testing.

## System Architecture

* **Frontend:** React (Vite configuration), React Router DOM, strict ESLint enforcement, bespoke CSS with modern glassmorphism UI elements.
* **Backend:** Python 3.11+, FastAPI, SQLAlchemy ORM, raw local SQLite storage.
* **Security:** JWT-based authentication via Passlib (Bcrypt) and role-based access controls (RBAC) securely guarding backend endpoints and React routes.
* **Quality Assurance:** Integrated Microsoft Playwright E2E testing framework measuring regressions via Module-Service-Flow design patterns.
* **Continuous Integration:** GitHub Actions CI/CD pipelines configured for automated syntax linting, building, application spinning, and native Playwright artifact reporting. 

## E2E Automation Testing 🤖
We maintain extremely high code testing standards. 

The application encompasses an independent E2E testing rig running **Playwright**:
1. Navigate to the `e2e` folder.
2. Run tests to evaluate workflows like login and registration password mismatch logic: `npm run test`
3. View the generated professional metrics, error screenshots, and trace videos: `npm run report`

*These tests automatically execute in our GitHub CI/CD pipeline upon every push, capturing and uploading HTML reports directly to the GitHub Action artifacts UI.*

## Quick Start
If you have Node.js and Python installed:
1. Run **`install.cmd`** in this folder to install all dependencies and seed the local SQL database.
2. Run **`run.ps1`** (Right click -> Run with PowerShell) to automatically deploy front/back web servers cleanly.
3. Access the primary UI at `http://localhost:5173`. 

## Demo Accounts
- **Admin**: `admin@fitmanager.com` / `admin`
- **Client**: `client@fitmanager.com` / `client`
