@echo off

:: ============================================================
:: ISX Deployment Launcher — run on the SERVER
:: Double-click to deploy — handles UAC and execution policy.
:: ============================================================

:: Check if already running as Administrator
net session >nul 2>&1
if %errorLevel% == 0 goto :run

:: Not admin — re-launch elevated via UAC prompt
echo Requesting Administrator privileges...
powershell -Command "Start-Process '%~f0' -Verb RunAs"
exit /b

:run
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\deploy.ps1"

:: Keep window open so the user can read the output
echo.
pause
