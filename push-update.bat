@echo off
cd /d C:\Users\dangl\baby-care-assistant
"C:\Program Files\Git\bin\git.exe" add -A
"C:\Program Files\Git\bin\git.exe" commit -m "Update: Add baby check, expand details, colors, supplement"
"C:\Program Files\Git\bin\git.exe" push origin main
pause