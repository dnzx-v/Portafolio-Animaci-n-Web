@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo Instala Node.js para abrir el portafolio con reproduccion de video.
  pause
  exit /b 1
)

start "Servidor del portafolio" /min node server.js
timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:4174/"
