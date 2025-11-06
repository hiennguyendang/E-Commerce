@echo off
echo ============================================
echo    SHOPEELIKE E-COMMERCE SETUP SCRIPT
echo ============================================

echo.
echo [1/5] Installing root dependencies...
call npm install

echo.
echo [2/5] Installing backend dependencies...
cd backend
call npm install
cd ..

echo.
echo [3/5] Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo.
echo [4/5] Database setup instructions:
echo 1. Make sure MySQL is running
echo 2. Create database: CREATE DATABASE shopeelike;
echo 3. Import schema: mysql -u root -p shopeelike ^< database/shopeelike.sql
echo 4. Update backend/.env with your database credentials

echo.
echo [5/5] Setup completed!
echo.
echo To start the application:
echo - Development mode: npm run dev
echo - Backend only: npm run server  
echo - Frontend only: npm run client
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.

pause