# FitManager - Gym Management Application

FitManager is a modern, full-stack gym management web application. It features a React frontend and a Python (FastAPI) backend. The application manages user authentication, gym memberships, and integrates a visually appealing user interface with role-based views for administrators and clients.

## Features
- **Frontend**: Built with React and Vite. Features a responsive, modern UI with curated color palettes and dynamic design elements.
- **Backend**: Built with FastAPI, SQLAlchemy, and a local SQLite database.
- **Authentication**: Secure JWT-based authentication with role-based access control.
- **Dashboards**: Dedicated interfaces for Clients (viewing progress/bookings) and Administrators (managing members/stats).

## Quick Start (Automated)
If you have Node.js and Python installed on Windows:
1. Double-click **`install.cmd`** in this folder to set up environments, install runtime dependencies, and seed the database.
2. Run **`run.ps1`** (Right click -> Run with PowerShell) to launch both the frontend and backend servers simultaneously.

For detailed manual installation steps, please read the included `running_guide.md`.

## Demo Accounts
- **Admin**: `admin@fitmanager.com` / `admin`
- **Client**: `client@fitmanager.com` / `client`
