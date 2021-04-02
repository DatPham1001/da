:loop
java -Xmx1024m  -classpath "lib/*;" com.example.demo.DemoApplication --spring.config.location=resource/application.yml
if %ERRORLEVEL% EQU 1 goto loop