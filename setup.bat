@echo off
chcp 65001 >nul
echo.
echo  === PDF Chinese Translator - Setup ===
echo  Downloading PDF.js library...
echo.

if not exist lib mkdir lib

powershell -NoProfile -Command "Invoke-WebRequest -Uri 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.min.js' -OutFile 'lib\pdf.min.js' -UseBasicParsing; Write-Host '  OK: pdf.min.js'"
powershell -NoProfile -Command "Invoke-WebRequest -Uri 'https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js' -OutFile 'lib\pdf.worker.min.js' -UseBasicParsing; Write-Host '  OK: pdf.worker.min.js'"

echo.
echo  Download complete. Next steps:
echo.
echo  [Load extension in Chrome]
echo    1. Open chrome://extensions
echo    2. Enable Developer mode (top-right toggle)
echo    3. Click "Load unpacked"
echo    4. Select this folder: %CD%
echo.
echo  [Enable Chrome built-in AI - first time only]
echo    A. chrome://flags - enable "Prompt API" and "Translator API"
echo    B. Restart Chrome
echo    C. chrome://components - update "Optimization Guide On Device Model" (~2.4GB)
echo.
pause
