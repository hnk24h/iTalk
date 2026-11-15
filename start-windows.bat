@echo off
title iTalk - Language Shadowing Desktop
echo ===================================================
echo   iTalk - Khoi chay Desktop App tren Windows
echo ===================================================
echo.
cd /d "%~dp0"

echo [1/2] Kiem tra Node.js tren Windows...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [LOI] May Windows cua ban chua cai Node.js!
    echo Vui long tai va cai dat Node.js tai: https://nodejs.org
    echo Sau khi cai xong, hay chay lai file nay.
    echo.
    pause
    exit /b
)

echo [2/2] Dang khoi chay ung dung iTalk tren Windows...
echo (Neu la lan dau chay tren Windows, he thong co the tai them electron.exe...)
call npm run electron:dev

if %errorlevel% neq 0 (
    echo.
    echo Neu gap loi thieu thu vien, hay thu chay: npm install
    echo roi click lai file nay.
)

pause
