# ============================================================
# ISX Build Script — run this on your local/dev machine
# Outputs a ready-to-deploy publish\ folder
# ============================================================

# --- Configuration ---
$RepoRoot        = 'C:\deploy\ISX'
$FrontendSource  = "$RepoRoot\inventory_management_frontend"
$BackendSource   = "$RepoRoot\inventory_management_backend"
$AngularDist     = "$FrontendSource\dist\inventory_management_frontend\browser"
$PublishDir      = "$RepoRoot\publish"

# --- Versions ---
$NodeVersion     = '22.14.0'    # Node.js LTS — update intentionally when upgrading

# --- Helpers ---
function Write-Step { param([string]$Msg) Write-Host "`n>>> $Msg" -ForegroundColor Cyan }
function Write-Ok   { param([string]$Msg) Write-Host "    [OK] $Msg" -ForegroundColor Green }
function Write-Fail { param([string]$Msg) Write-Host "`n[FAIL] $Msg" -ForegroundColor Red; exit 1 }

# ============================================================
# 1. Node.js
# ============================================================
Write-Step "Checking Node.js v$NodeVersion..."
$installedNode = node --version 2>$null
if ($installedNode -ne "v$NodeVersion") {
    Write-Host "    Installing Node.js v$NodeVersion..."
    $msi = "$env:TEMP\node-v$NodeVersion-x64.msi"
    Invoke-WebRequest -Uri "https://nodejs.org/dist/v$NodeVersion/node-v$NodeVersion-x64.msi" -OutFile $msi -UseBasicParsing
    Start-Process msiexec.exe -ArgumentList "/i `"$msi`" /quiet /norestart" -Wait
    Remove-Item $msi -Force
    Write-Host "    Node.js v$NodeVersion installed. Please close and re-run this script." -ForegroundColor Yellow
    pause; exit
}
Write-Ok "Node.js $installedNode"

# ============================================================
# 2. Build Angular
# ============================================================
Write-Step 'Building Angular frontend...'
Set-Location $FrontendSource
npm install
if ($LASTEXITCODE -ne 0) { Write-Fail 'npm install failed for frontend.' }

npx ng build --configuration=production
if ($LASTEXITCODE -ne 0) { Write-Fail 'Angular build failed.' }

if (-not (Test-Path $AngularDist)) { Write-Fail "Angular build output not found: $AngularDist" }
Write-Ok 'Angular build complete.'

# ============================================================
# 3. Build NestJS
# ============================================================
Write-Step 'Building NestJS backend...'
Set-Location $BackendSource
npm install
if ($LASTEXITCODE -ne 0) { Write-Fail 'npm install failed for backend.' }

npm run build
if ($LASTEXITCODE -ne 0) { Write-Fail 'NestJS build failed.' }
Write-Ok 'NestJS build complete.'

# ============================================================
# 4. Package into publish\
# ============================================================
Write-Step "Packaging artifacts to $PublishDir..."

# Clean and recreate publish folder
if (Test-Path $PublishDir) { Remove-Item $PublishDir -Recurse -Force }
New-Item -ItemType Directory -Path "$PublishDir\frontend" -Force | Out-Null
New-Item -ItemType Directory -Path "$PublishDir\backend"  -Force | Out-Null

# Frontend — copy browser build output
Copy-Item "$AngularDist\*" -Destination "$PublishDir\frontend" -Recurse -Force
Write-Ok 'Frontend files packaged.'

# Backend — copy compiled dist + package.json only
Copy-Item "$BackendSource\dist"         -Destination "$PublishDir\backend" -Recurse -Force
Copy-Item "$BackendSource\package.json" -Destination "$PublishDir\backend" -Force
Write-Ok 'Backend files packaged.'

# ============================================================
Write-Host ''
Write-Host '===========================================' -ForegroundColor Green
Write-Host '  Build complete!' -ForegroundColor Green
Write-Host "  Publish folder: $PublishDir" -ForegroundColor Green
Write-Host ''
Write-Host '  Next: copy the publish\ folder to the server' -ForegroundColor Yellow
Write-Host '  then run scripts\deploy.ps1 on the server.' -ForegroundColor Yellow
Write-Host '===========================================' -ForegroundColor Green
