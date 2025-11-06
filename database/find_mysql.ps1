# Script tìm MySQL trên Windows
Write-Host "Dang tim MySQL tren may tinh cua ban..." -ForegroundColor Yellow
Write-Host ""

$possiblePaths = @(
    "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe",
    "C:\Program Files\MySQL\MySQL Server 8.4\bin\mysql.exe",
    "C:\Program Files\MySQL\MySQL Server 5.7\bin\mysql.exe",
    "C:\Program Files (x86)\MySQL\MySQL Server 8.0\bin\mysql.exe",
    "C:\xampp\mysql\bin\mysql.exe",
    "C:\wamp64\bin\mysql\mysql8.0.27\bin\mysql.exe",
    "C:\wamp\bin\mysql\mysql8.0.27\bin\mysql.exe"
)

$found = $false
foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        Write-Host "[FOUND] MySQL tai: $path" -ForegroundColor Green
        $found = $true
    }
}

if (-not $found) {
    Write-Host "[NOT FOUND] Khong tim thay MySQL trong cac vi tri pho bien!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Hay thu cac cach sau:" -ForegroundColor Yellow
    Write-Host "1. Su dung MySQL Workbench (GUI) de import file SQL"
    Write-Host "2. Kiem tra xem ban da cai MySQL chua"
    Write-Host "3. Neu da cai, tim file mysql.exe va ghi lai duong dan"
} else {
    Write-Host ""
    Write-Host "De import database, dung lenh:" -ForegroundColor Cyan
    Write-Host '& "DUONG_DAN_MYSQL" -u root -p -e "source C:\Users\HAD\Desktop\DB\E-Commerce\database\shopeelike.sql"'
}

Write-Host ""
Read-Host "Press Enter to exit"
