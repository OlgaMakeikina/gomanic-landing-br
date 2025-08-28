#!/bin/bash

# Gomanic Brasil VPS Deploy Script
# Server: 38.210.209.153

echo "🚀 Starting Gomanic Brasil deployment..."

# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker if not present
if ! command -v docker &> /dev/null; then
    echo "📦 Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo systemctl start docker
    sudo systemctl enable docker
    rm get-docker.sh
fi

# Install Docker Compose
if ! command -v docker-compose &> /dev/null; then
    echo "📦 Installing Docker Compose..."
    sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
fi

# Create zardes user if not exists
if ! id "zardes" &>/dev/null; then
    echo "👤 Creating zardes user..."
    sudo useradd -m -s /bin/bash zardes
    echo 'zardes:5783544Zz' | sudo chpasswd
    sudo usermod -aG docker zardes
fi

# Clone/update repository
APP_DIR="/home/zardes/gomanic-landing-br"
if [ ! -d "$APP_DIR" ]; then
    echo "📥 Cloning repository..."
    sudo -u zardes git clone https://github.com/OlgaMakeikina/gomanic-landing-br.git $APP_DIR
else
    echo "🔄 Updating repository..."
    cd $APP_DIR
    sudo -u zardes git pull origin main
fi

cd $APP_DIR

# Setup environment
if [ ! -f ".env.local" ]; then
    echo "⚙️ Setting up environment..."
    sudo -u zardes cp .env.production .env.local
    echo "✏️ Please edit .env.local with your credentials"
fi

# Create data directory
sudo -u zardes mkdir -p data
sudo chmod 755 data

# Build and start
echo "🐳 Building and starting containers..."
sudo -u zardes docker-compose down --remove-orphans
sudo -u zardes docker-compose up --build -d

echo "✅ Deployment complete!"
echo "📊 Check status: docker-compose ps"
echo "📋 Check logs: docker-compose logs -f"
echo "🌐 Site: https://gomanic.com.br"
