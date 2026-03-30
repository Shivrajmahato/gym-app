Write-Host "Starting Gym Manager Backend..." -ForegroundColor Green
Start-Process -FilePath "powershell.exe" -ArgumentList "-ExecutionPolicy Bypass -NoExit -Command `"cd backend; .\venv\Scripts\Activate.ps1; uvicorn main:app --reload`""

Write-Host "Starting Gym Manager Frontend..." -ForegroundColor Cyan
Start-Process -FilePath "powershell.exe" -ArgumentList "-ExecutionPolicy Bypass -NoExit -Command `"cd frontend; npm run dev`""

Write-Host "Both servers are starting in separate windows!" -ForegroundColor Yellow
Write-Host "- Frontend: http://localhost:5173" -ForegroundColor White
Write-Host "- Backend API Docs: http://127.0.0.1:8000/docs" -ForegroundColor White
