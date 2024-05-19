@echo off

set host=%1
shift
set cmd=%*

:loop
timeout /t 1 >nul
psql -h %host% -U postgres -c "\q" >nul 2>&1
if errorlevel 1 (
  echo PostgreSQL is unavailable - sleeping
  goto loop
)

echo PostgreSQL is up - executing command
%cmd%
