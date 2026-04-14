@echo off
cd /d C:\Users\dangl\baby-care-assistant
"C:\Program Files\Git\bin\git.exe" add .
"C:\Program Files\Git\bin\git.exe" commit -m "Update: Add baby check, expand details, colors, supplement"
"C:\Program Files\Git\bin\git.exe" push -u origin main
pause
