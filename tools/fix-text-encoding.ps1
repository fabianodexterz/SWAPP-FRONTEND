# tools/fix-text-encoding.ps1
# Corrige arquivos redecodificando de Windows-1252 para UTF-8 sem BOM
Param(
  [string[]]$Roots = @("src","public"),
  [string[]]$Include = @("*.ts","*.tsx","*.js","*.jsx","*.json","*.css","*.md","*.txt","*.html")
)

function Get-Utf8NoBom { return (New-Object System.Text.UTF8Encoding($false)) }
$Utf8 = Get-Utf8NoBom
$Enc1252 = [System.Text.Encoding]::GetEncoding(1252)
$pattern = "Ã.|Â.|â€|â€“|â€”|â€¢"

foreach($root in $Roots) {
  if (-not (Test-Path $root)) { continue }
  Get-ChildItem -Path $root -Recurse -Include $Include -File | ForEach-Object {
    try {
      $bytes = [System.IO.File]::ReadAllBytes($_.FullName)
      $asUtf8 = [System.Text.Encoding]::UTF8.GetString($bytes)
      if ($asUtf8 -match $pattern) {
        $text1252 = $Enc1252.GetString($bytes)
        [System.IO.File]::WriteAllText($_.FullName, $text1252, $Utf8)
        Write-Host "fixed (ps1): $($_.FullName)"
      }
    } catch {
      Write-Warning ("skip: {0} => {1}" -f $_.FullName, $_.Exception.Message)
    }
  }
}
