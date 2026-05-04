@echo off

:: ============================================================
:: ISX Build Launcher — run on your LOCAL/DEV machine
:: Builds both apps and packages artifacts into publish\
:: ============================================================

:: Elevate to Administrator (required if Node.js needs to be installed)
net session >nul 2>&1
if %errorLevel% == 0 goto :run
echo Requesting Administrator privileges...
powershell -Command "Start-Process '%~f0' -Verb RunAs"
exit /b

:run
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0scripts\build.ps1"

echo.
pause
