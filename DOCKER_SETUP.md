# 🐳 DOCKER SETUP

## LOCAL BUILD TEST
```bash
# Build image
docker build -t gomanic-app .

# Run container
docker run -p 3000:3000 --env-file .env.local gomanic-app

# Or use compose
docker-compose up --build
```

## PRODUCTION VPS SETUP
```bash
# Install Docker on VPS
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo systemctl start docker
sudo systemctl enable docker

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Create user zardes
sudo useradd -m -s /bin/bash zardes
echo 'zardes:5783544Zz' | sudo chpasswd
sudo usermod -aG docker zardes

# Deploy
git clone https://github.com/OlgaMakeikina/gomanic-landing-br.git
cd gomanic-landing-br
cp .env.example .env.local
# Edit .env.local with production values
docker-compose up -d
```

## NGINX CONFIG
```nginx
server {
    listen 80;
    server_name gomanic.com.br;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
