@echo off

@REM le chemin de base pour les diff packages
SET "base_path=E:\LLyam\tools\manager\commands"

@REM delegué le tous ce qui est js dans la partie node
IF "%1"=="node" goto:NODEJS
@REM delegué le tous ce qui est php dans la partie php
IF "%1"=="php" goto:PHP

@REM nodejs part
:NODEJS
    @REM faire appel au différents fichié de nodejs
    goto :%2
    goto:EOF

@REM nodejs packages
:minify
    node %base_path%\minify\minify.js %cd%
    goto:EOF
:scrapper_cleaner
    node %base_path%\scrapper\cleaner.js %cd% %3=%4
    goto:EOF
:scrapper_linter
    node %base_path%\scrapper\linter.js %cd% %3=%4 %5=%6
    goto:EOF

:scama_run
    node %base_path%\scama\run.js %cd% %3=%4 %5=%6
    goto:EOF

@REM php part
:PHP
    @echo 'php called'
    @echo 'php called 2'
    goto:EOF