@echo off
chcp 65001
title DBMS
if not exist databases md databases
cd databases
echo .exit | ..\bin\sqlite3.exe -init ../DBMS.inf
if not exist sqlite3.bat (
    echo @echo off                                  > sqlite3.bat
    echo ..\bin\sqlite3.exe -header -column %%1.db  >> sqlite3.bat
)
cmd
