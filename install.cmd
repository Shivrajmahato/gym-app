@echo off
title FitManager App Installer
echo ==============================================================
echo Installing FitManager Dependencies (Windows)
echo ==============================================================
echo.

echo [1/2] Setting up Python Backend API...
cd backend
if not exist "venv" (
    echo - Creating virtual environment...
    python -m venv venv
)
echo - Activating virtual environment...
call venv\Scripts\activate.bat

echo - Installing Python packages...
pip install fastapi "uvicorn[standard]" sqlalchemy pydantic email-validator "python-jose[cryptography]" "passlib[bcrypt]" "^"bcrypt<4.0.0"^" python-multipart

echo - Seeding local database...
python seed_admin.py
cd ..
echo.


echo [2/2] Setting up React Frontend...
cd frontend

echo - Installing Node dependencies...
call npm install
call npm install react-router-dom lucide-react axios jwt-decode
cd ..
echo.

echo ==============================================================
echo Installation Complete!
echo You can now run the app following the instructions in:
echo running_guide.md
echo ==============================================================
pause
