# FitManager Gym App - Complete Running Guide (Windows)

This document provides a comprehensive, step-by-step guide to setting up and running the Gym Management Application on a new Windows laptop from scratch. Following these instructions will ensure you don't encounter any missing dependency errors.

## Prerequisites

Before starting, ensure you have the following standard development software installed on the new laptop:

1.  **Node.js (for the Frontend)**
    *   Download and install the "LTS" (Long Term Support) exact version from [nodejs.org](https://nodejs.org/).
    *   This will automatically install `npm` (Node Package Manager).
2.  **Python 3 (for the Backend)**
    *   Download and install the latest Python 3 release from [python.org](https://www.python.org/downloads/windows/).
    *   **CRITICAL:** During the installation wizard, ensure you check the box that says **"Add Python to PATH"** at the very bottom of the first installation screen.

---

## Automated Installation (Easy Way)

If you have both Node.js and Python installed, you can simply run the automated installer:
1. Double click the **`install.cmd`** file located in the root folder of this project.
2. It will automatically create environments, download all dependencies, and seed the database.
3. Once completed, you can skip straight to **Step 3** below to run the servers!

---

## Manual Installation (Step-by-Step)

### Step 1: Backend Setup (Python/FastAPI)

The backend is built with FastAPI and uses a local SQLite database, meaning no external database installation is required.

1.  **Open a Command Prompt or PowerShell** window and navigate entirely into the `backend` directory of the copied project:
    ```powershell
    cd path\to\your\gym-app\backend
    ```

2.  **Create a Virtual Environment** (This isolates dependencies to only this project):
    ```powershell
    python -m venv venv
    ```

3.  **Activate the Virtual Environment**:
    ```powershell
    .\venv\Scripts\activate
    ```
    *(You will know this worked if you see `(venv)` appear at the beginning of your command line prompt).*

4.  **Install the Required Python Dependencies**:
    While the virtual environment is active, run the following command exactly as shown. These are all the necessary packages for routing, databases, authentication handling, and password hashing:
    ```powershell
    pip install fastapi "uvicorn[standard]" sqlalchemy pydantic email-validator "python-jose[cryptography]" "passlib[bcrypt]" "bcrypt<4.0.0" python-multipart
    ```
    *(Note: Using `"bcrypt<4.0.0"` specifically is strictly required to avoid passlib compatibility issues on modern Python versions).*

5.  **Initialize the Database & Seed Default Data**:
    Run the included seeding script. This creates the local `database.db` file automatically and populates it with default gym membership plans, as well as test accounts.
    ```powershell
    python seed_admin.py
    ```

6.  **Start the Backend Server**:
    ```powershell
    uvicorn main:app --reload
    ```
    *The backend API is now running at `http://127.0.0.1:8000`. Leave this terminal window open and running.*

---

## Step 2: Frontend Setup (React/Vite)

The frontend is a React application built with the Vite build tool.

1.  **Open a NEW Command Prompt or PowerShell** window (keep the backend window open and running in the background) and navigate to the `frontend` directory:
    ```powershell
    cd path\to\your\gym-app\frontend
    ```

2.  **Install Node Dependencies**:
    Run the following command to download all required frontend libraries spanning UI icons, network requests, and routing capabilities:
    ```powershell
    npm install
    npm install react-router-dom lucide-react axios jwt-decode
    ```

3.  **Start the Frontend Development Server**:
    ```powershell
    npm run dev
    ```
    *The frontend is now running! It will typically be hosted at `http://localhost:5173`. The exact URL will be prominently displayed in your terminal.*

---

## Step 3: Accessing the Application

Open your web browser (Chrome/Edge/Firefox) and navigate to the frontend URL (usually `http://localhost:5173`).

### Demo Accounts

The `seed_admin.py` script you ran in Step 1 automatically created these two distinct accounts so you can immediately demo the role-based functionality:

**1. Admin Account** 
*(Has full access to the Members Directory, Global Stats, and Timings Management)*
*   **Email:** `admin@fitmanager.com`
*   **Password:** `admin`

**2. Client Account** 
*(Has a streamlined view showing personal Membership Status and Upcoming Booked Classes)*
*   **Email:** `client@fitmanager.com`
*   **Password:** `client`

Alternatively, you can skip logging in and use the **Register** button on the public landing page to test creating a brand new client account from scratch!
