#!/bin/bash
# Fix nginx config for enesteke.me
cat > /tmp/enesteke-nginx.conf << 'EOF'
server {
    server_name enesteke.me www.enesteke.me;

    root /var/www/enesteke.me;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;
    gzip_min_length 256;
    gzip_vary on;

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000";
    }

    location ~* \.(svg|ico|jpg|jpeg|png|gif|webp|woff2|woff|ttf)$ {
        expires 30d;
        add_header Cache-Control "public";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    listen [::]:443 ssl;
    listen 443 ssl;
    ssl_certificate /etc/letsencrypt/live/enesteke.me/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/enesteke.me/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
}

server {
    if ($host = www.enesteke.me) {
        return 301 https://$host$request_uri;
    }
    if ($host = enesteke.me) {
        return 301 https://$host$request_uri;
    }
    listen 80;
    listen [::]:80;
    server_name enesteke.me www.enesteke.me;
    return 404;
}
EOF

sudo cp /tmp/enesteke-nginx.conf /etc/nginx/sites-available/enesteke.me
sudo nginx -t && sudo systemctl reload nginx && echo "=== SUCCESS ==="
