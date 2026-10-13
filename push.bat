@echo off
setlocal
set "PATH=C:\Users\jesse\AppData\Local\Microsoft\WinGet\Packages\Git.MinGit_Microsoft.Winget.Source_8wekyb3d8bbwe\cmd;%PATH%"

echo ========================================================
echo   AuraArcade HUB - Envio para o GitHub
echo ========================================================
echo.

git push -u origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo [SUCESSO] Projeto enviado para o GitHub com exito!
) else (
    echo.
    echo [AVISO] Se o GitHub pedir autenticacao, insira seu Personal Access Token (PAT).
)

echo.
pause
