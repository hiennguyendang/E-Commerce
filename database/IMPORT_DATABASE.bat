@echo off
chcp 65001 >nul
echo ============================================
echo   IMPORT DATABASE - E-COMMERCE PROJECT
echo ============================================
echo.
echo Dang import schema (shopeelike.sql)...
echo Nhap password MySQL cua ban:
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p < shopeelike.sql
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Import schema FAILED!
    echo Kiem tra lai:
    echo - Password MySQL co dung khong?
    echo - MySQL Server co dang chay khong?
    pause
    exit /b 1
)
echo [OK] Schema imported successfully!
echo.

echo Dang import seed data (mockup_data_shopeelike.sql)...
echo Nhap password MySQL cua ban lan nua:
"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -u root -p shopeelike < mockup_data_shopeelike.sql
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Import seed data FAILED!
    pause
    exit /b 1
)
echo [OK] Seed data imported successfully!
echo.

echo ============================================
echo   DATABASE SETUP HOAN THANH! ✓
echo ============================================
echo.
echo Tai khoan co san:
echo   Email: seller1@demo.com
echo   Password: password123
echo.
echo Tiep theo:
echo   1. cd ..\backend
echo   2. npm install
echo   3. copy .env.example .env
echo   4. Sua DB_PASSWORD trong .env
echo   5. npm run dev
echo.
pause
