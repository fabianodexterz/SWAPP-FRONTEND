# tools/run-fix-utf8.ps1
Param([switch]$OverwriteNextConfig)

$ToolsDir    = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectRoot = Split-Path $ToolsDir -Parent

Write-Host "Instalando iconv-lite..." -ForegroundColor Cyan
npm i iconv-lite | Out-Null

Write-Host "Node latin1->utf8..." -ForegroundColor Cyan
node "$ToolsDir\fix-encoding.cjs"

Write-Host "PowerShell reencode 1252->UTF-8..." -ForegroundColor Cyan
try {
  powershell -ExecutionPolicy Bypass -File "$ToolsDir\fix-text-encoding.ps1"
} catch {
  Write-Warning "Falha no fix-text-encoding.ps1 (prosseguindo assim mesmo). $_"
}

if ($OverwriteNextConfig) {
  $cfgPath = Join-Path $ProjectRoot "next.config.js"
  if (Test-Path $cfgPath) { $cfg = Get-Content $cfgPath -Raw } else { $cfg = "module.exports = {}" }
  if ($cfg -notmatch "headers:\s*async") {
    $hdr = @"
headers: async () => [
  {
    source: "/(.*)",
    headers: [
      { key: "Content-Type", value: "text/html; charset=utf-8" }
    ]
  }
],
"@
    $cfg = $cfg -replace "module\.exports\s*=\s*\{", "module.exports = {`n$hdr"
    Set-Content -Encoding utf8 $cfgPath $cfg
    Write-Host "next.config.js atualizado com headers charset." -ForegroundColor Yellow
  } else {
    Write-Host "next.config.js já possui headers." -ForegroundColor Yellow
  }
}

Write-Host "Limpando caches..." -ForegroundColor Cyan
Remove-Item -Recurse -Force (Join-Path $ProjectRoot ".next") -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force (Join-Path $ProjectRoot "node_modules\.cache") -ErrorAction SilentlyContinue

Write-Host "Buildando..." -ForegroundColor Cyan
npm run build
