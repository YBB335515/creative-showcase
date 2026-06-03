@echo off
chcp 65001 >nul
echo ============================
echo   创意工坊 - 本地启动
echo ============================
echo.
echo 正在启动本地服务器...
start http://localhost:5173/
npm run dev
pause
