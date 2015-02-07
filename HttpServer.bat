@echo off
chcp 65001
set /p ServerBackend=ServerBackend: 
:: since this program kill all nginx instances
echo This program is intended for developement use only!
:main
title HttpServer
taskkill /f /im nginx.exe 2>NUL
start bin\nginx
java -Duser.language=en -Dfile.encoding=UTF-8 -XX:+UnlockCommercialFeatures -XX:+FlightRecorder -jar %ServerBackend%.jar
title - HttpServer
taskkill /f /im nginx.exe
echo Terminated
echo Press any key to reload
pause>NUL
goto main
