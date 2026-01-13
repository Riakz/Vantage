$pathsToSearch = @(
    "C:\Program Files\CMake\bin\cmake.exe",
    "C:\Program Files\Microsoft Visual Studio\2022\Community\Common7\IDE\CommonExtensions\Microsoft\CMake\CMake\bin\cmake.exe",
    "C:\Program Files\Microsoft Visual Studio\2022\Professional\Common7\IDE\CommonExtensions\Microsoft\CMake\CMake\bin\cmake.exe",
    "C:\Program Files\Microsoft Visual Studio\2022\Enterprise\Common7\IDE\CommonExtensions\Microsoft\CMake\CMake\bin\cmake.exe",
    "C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\Common7\IDE\CommonExtensions\Microsoft\CMake\CMake\bin\cmake.exe"
)

$cmakePath = $null

Write-Host "[Vantage] Searching for CMake..."
foreach ($path in $pathsToSearch) {
    if (Test-Path $path) {
        $cmakePath = $path
        break
    }
}

if ($null -eq $cmakePath) {
    # Try generic search in Program Files if specific paths fail (slow but necessary)
    Write-Host "[Vantage] Custom search in Program Files..."
    $cmakePath = Get-ChildItem -Path "C:\Program Files" -Filter "cmake.exe" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1 -ExpandProperty FullName
}

if ($null -eq $cmakePath) {
    Write-Error "[ERROR] Could not find cmake.exe. Please verify Visual Studio or CMake is installed."
    exit 1
}

Write-Host "[Vantage] Found CMake at: $cmakePath"

# Create build dir
$buildDir = "d:\Vantage\vantage-core\build"
if (-not (Test-Path $buildDir)) {
    New-Item -ItemType Directory -Path $buildDir | Out-Null
}

# Run CMake
Set-Location $buildDir
& $cmakePath ..

if ($LASTEXITCODE -eq 0) {
    Write-Host "[SUCCESS] Project configured successfully!"
} else {
    Write-Error "[ERROR] CMake configuration failed."
}
