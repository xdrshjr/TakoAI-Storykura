# StoryKura 开发环境启动脚本

# 清理.next目录
if (Test-Path .next) {
    Write-Host "正在清理.next目录..." -ForegroundColor Yellow
    Remove-Item -Path ".next" -Recurse -Force
}

# 安装Python依赖
if (Test-Path "scripts/requirements.txt") {
    Write-Host "正在检查Python依赖..." -ForegroundColor Yellow
    pip install -r scripts/requirements.txt
}

# 启动Next.js开发服务器
Write-Host "启动开发服务器..." -ForegroundColor Green
npm run dev 