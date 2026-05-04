# ============================================================
# ISX Deploy Script — run this on the server (as Administrator)
# Expects a publish\ folder produced by scripts\build.ps1
# ============================================================

# --- Configuration (edit before running on server) ---
$PublishDir         = 'C:\deploy\ISX\publish'   # where you copied the publish\ folder
$FrontendDeployPath = 'C:\inetpub\wwwroot\isx'
$IISSiteName        = 'ISX-Frontend'
[int]$IISPort       = 4200
$IISHostname        = ''                         # e.g. 'isx.local', or leave empty
$BackendDeployPath  = 'C:\apps\isx-backend'
$BackendAppName     = 'isx-backend'
$BackendEntryScript = 'dist/main.js'

# --- Versions ---
$NodeVersion        = '22.14.0'    # Node.js LTS — update intentionally when upgrading
$PM2Version         = '5'          # PM2 major version

# --- Flags ---
# Set to $true to be prompted for database/app settings during deployment.
# Set to $false to skip prompts and use the defaults defined below.
$ConfigureEnv       = $false

# --- Env Defaults (used when $ConfigureEnv = $false, or as prompt defaults when $true) ---
$EnvDefaults = @{
    DB_HOST     = 'localhost'
    DB_PORT     = '3307'
    DB_USERNAME = 'root'
    DB_PASSWORD = 'my0dessa'
    DB_DATABASE = 'eisdata'
    PORT        = '3000'
    NODE_ENV    = 'production'
}

# --- Helpers ---
function Write-Step { param([string]$Msg) Write-Host "`n>>> $Msg" -ForegroundColor Cyan }
function Write-Ok   { param([string]$Msg) Write-Host "    [OK] $Msg" -ForegroundColor Green }
function Write-Fail { param([string]$Msg) Write-Host "`n[FAIL] $Msg" -ForegroundColor Red; exit 1 }

# Verify publish folder exists
if (-not (Test-Path "$PublishDir\frontend") -or -not (Test-Path "$PublishDir\backend")) {
    Write-Fail "Publish folder not found or incomplete at: $PublishDir`n  Run scripts\build.ps1 first and copy the publish\ folder here."
}

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
# 2. PM2
# ============================================================
Write-Step "Checking PM2 v$PM2Version..."
if (-not (Get-Command pm2 -ErrorAction SilentlyContinue)) {
    Write-Host "    Installing PM2 v$PM2Version..."
    npm install -g "pm2@$PM2Version"
}
Write-Ok 'PM2 found.'

# ============================================================
# 3. IIS
# ============================================================
Write-Step 'Checking IIS...'
$iis = Get-WindowsOptionalFeature -Online -FeatureName 'IIS-WebServerRole' -ErrorAction SilentlyContinue
if ($iis.State -ne 'Enabled') {
    Write-Host '    Enabling IIS (this may take a few minutes)...'
    Enable-WindowsOptionalFeature -Online -FeatureName 'IIS-WebServerRole' -All -NoRestart | Out-Null
    Write-Ok 'IIS enabled.'
} else {
    Write-Ok 'IIS already enabled.'
}
Import-Module WebAdministration

# ============================================================
# 4. URL Rewrite Module
# ============================================================
Write-Step 'Checking URL Rewrite module...'
if (-not (Test-Path "$env:SystemRoot\System32\inetsrv\rewrite.dll")) {
    Write-Host '    Downloading URL Rewrite module...'
    $msi = "$env:TEMP\rewrite_amd64.msi"
    Invoke-WebRequest -Uri 'https://download.microsoft.com/download/1/2/8/128E2E22-C1B9-44A4-BE2A-5859ED1D4592/rewrite_amd64_en-US.msi' -OutFile $msi -UseBasicParsing
    Start-Process msiexec.exe -ArgumentList "/i `"$msi`" /quiet /norestart" -Wait
    Remove-Item $msi -Force
    Write-Ok 'URL Rewrite installed.'
} else {
    Write-Ok 'URL Rewrite already installed.'
}

# ============================================================
# 5. Deploy Frontend
# ============================================================
Write-Step 'Deploying frontend to IIS folder...'
if (-not (Test-Path $FrontendDeployPath)) { New-Item -ItemType Directory -Path $FrontendDeployPath -Force | Out-Null }
Get-ChildItem -Path $FrontendDeployPath -Exclude 'web.config' | Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item "$PublishDir\frontend\*" -Destination $FrontendDeployPath -Recurse -Force

# web.config — replace content here if you have a custom one
@'
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="Angular SPA" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile"      negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory"  negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
    <staticContent>
      <remove fileExtension=".json" />
      <mimeMap fileExtension=".json"  mimeType="application/json" />
      <remove fileExtension=".woff" />
      <mimeMap fileExtension=".woff"  mimeType="application/font-woff" />
      <remove fileExtension=".woff2" />
      <mimeMap fileExtension=".woff2" mimeType="font/woff2" />
    </staticContent>
    <httpErrors errorMode="Custom" existingResponse="PassThrough" />
  </system.webServer>
</configuration>
'@ | Set-Content -Path "$FrontendDeployPath\web.config" -Encoding UTF8

Write-Ok "Frontend deployed to $FrontendDeployPath"

# ============================================================
# 6. IIS Site
# ============================================================
Write-Step "Configuring IIS site '$IISSiteName'..."
$site = Get-Website -Name $IISSiteName -ErrorAction SilentlyContinue
if (-not $site) {
    $params = @{ Name = $IISSiteName; Port = $IISPort; PhysicalPath = $FrontendDeployPath; Force = $true }
    if ($IISHostname) { $params['HostHeader'] = $IISHostname }
    New-Website @params | Out-Null
    Write-Ok 'IIS site created.'
} else {
    Set-ItemProperty "IIS:\Sites\$IISSiteName" -Name physicalPath -Value $FrontendDeployPath
    Write-Ok 'IIS site updated.'
}
if ((Get-WebsiteState -Name $IISSiteName).Value -ne 'Started') { Start-Website -Name $IISSiteName }
Write-Ok 'IIS site running.'

# ============================================================
# 7. Backend .env
# ============================================================
Write-Step 'Configuring .env...'

$envPath = "$BackendDeployPath\.env"
$env = $EnvDefaults.Clone()

# Load existing .env values if file already exists
if (Test-Path $envPath) {
    Get-Content $envPath | ForEach-Object {
        if ($_ -match '^\s*([^#=][^=]*)=(.*)$') { $env[$Matches[1].Trim()] = $Matches[2].Trim() }
    }
}

$configure = $ConfigureEnv
if (-not $configure) {
    Write-Host ''
    $answer = Read-Host '    Configure database settings? (y/N)'
    $configure = $answer -match '^[Yy]$'
    Write-Host ''
}

if ($configure) {
    function Read-EnvVar {
        param([string]$Key, [bool]$Secret = $false)
        $cur  = $env[$Key]
        $hint = if ($Secret -and $cur) { '********' } else { $cur }
        $val  = Read-Host "    $Key [$hint]"
        if (-not [string]::IsNullOrWhiteSpace($val)) { $env[$Key] = $val }
    }

    Read-EnvVar 'DB_HOST'
    Read-EnvVar 'DB_PORT'
    Read-EnvVar 'DB_USERNAME'
    Read-EnvVar 'DB_PASSWORD' -Secret $true
    Read-EnvVar 'DB_DATABASE'
    Write-Host ''
} else {
    Write-Host '    Using defaults.' -ForegroundColor Yellow
}

if (-not (Test-Path $BackendDeployPath)) { New-Item -ItemType Directory -Path $BackendDeployPath -Force | Out-Null }

@"
DB_HOST=$($env['DB_HOST'])
DB_PORT=$($env['DB_PORT'])
DB_USERNAME=$($env['DB_USERNAME'])
DB_PASSWORD=$($env['DB_PASSWORD'])
DB_DATABASE=$($env['DB_DATABASE'])
PORT=$($env['PORT'])
NODE_ENV=$($env['NODE_ENV'])
"@ | Set-Content -Path $envPath -Encoding UTF8

Write-Ok '.env saved.'

# ============================================================
# 8. Deploy Backend
# ============================================================
Write-Step 'Deploying backend...'
if (Test-Path "$BackendDeployPath\dist") { Remove-Item "$BackendDeployPath\dist" -Recurse -Force }
Copy-Item "$PublishDir\backend\dist"         -Destination $BackendDeployPath -Recurse -Force
Copy-Item "$PublishDir\backend\package.json" -Destination $BackendDeployPath -Force

Write-Host '    Installing production dependencies...'
Set-Location $BackendDeployPath
npm install --omit=dev
if ($LASTEXITCODE -ne 0) { Write-Fail 'npm install (production) failed.' }

Write-Ok "Backend deployed to $BackendDeployPath"

# ============================================================
# 9. PM2
# ============================================================
Write-Step 'Starting backend with PM2...'
pm2 delete $BackendAppName 2>&1 | Out-Null
pm2 start $BackendEntryScript --name $BackendAppName
if ($LASTEXITCODE -ne 0) { Write-Fail 'PM2 failed to start the backend.' }
pm2 save
Write-Ok 'Backend running.'

# ============================================================
$url = 'http://' + $(if ($IISHostname) { $IISHostname } else { 'localhost' }) + $(if ($IISPort -ne 80) { ':' + $IISPort } else { '' })
Write-Host ''
Write-Host '===========================================' -ForegroundColor Green
Write-Host '  Deployment complete!' -ForegroundColor Green
Write-Host "  Frontend : $url" -ForegroundColor Green
Write-Host "  Backend  : pm2 status / pm2 logs $BackendAppName" -ForegroundColor Green
Write-Host '===========================================' -ForegroundColor Green
