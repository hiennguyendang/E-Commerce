# Cleanup script - Remove temporary and test files

Write-Host "🧹 Cleaning up project..." -ForegroundColor Cyan

# Remove test scripts in backend
$testFiles = @(
    "backend/test-one-product.js",
    "backend/test-api.js", 
    "backend/simple-test.js",
    "backend/create-mock-products-direct.js",
    "backend/generate-mock-data.js",
    "backend/create-products-via-api.js",
    "backend/fix-password.js"
)

foreach ($file in $testFiles) {
    $path = Join-Path $PSScriptRoot $file
    if (Test-Path $path) {
        Remove-Item $path -Force
        Write-Host "  ✓ Deleted: $file" -ForegroundColor Green
    }
}

# Remove temporary SQL files
$tempSqlFiles = @(
    "database/check_data.sql",
    "database/check_users.sql",
    "database/update_password_instructions.sql",
    "database/test_connection.sql",
    "database/fix_password.sql",
    "database/delete_seller1.sql",
    "database/create_test_seller.sql",
    "database/create_buyer_account.sql",
    "database/cleanup_duplicates.sql",
    "database/generate_mock_products.sql"
)

foreach ($file in $tempSqlFiles) {
    $path = Join-Path $PSScriptRoot $file
    if (Test-Path $path) {
        Remove-Item $path -Force
        Write-Host "  ✓ Deleted: $file" -ForegroundColor Green
    }
}

# Remove node_modules from root (if exists)
$rootNodeModules = Join-Path $PSScriptRoot "node_modules"
if (Test-Path $rootNodeModules) {
    Write-Host "`n⚠️  Found node_modules in root (should only be in backend/ and frontend/)" -ForegroundColor Yellow
    Write-Host "  Consider removing it manually if not needed" -ForegroundColor Yellow
}

Write-Host "`n✅ Cleanup completed!" -ForegroundColor Green
Write-Host "`nKept files:" -ForegroundColor Cyan
Write-Host "  • database/schema.sql - Database schema" -ForegroundColor White
Write-Host "  • database/shopeelike.sql - Full database setup" -ForegroundColor White
Write-Host "  • database/mockup_data.sql - Sample data" -ForegroundColor White
Write-Host "  • database/insert_categories.sql - Category setup" -ForegroundColor White
Write-Host "  • All source code in backend/src/ and frontend/src/" -ForegroundColor White
