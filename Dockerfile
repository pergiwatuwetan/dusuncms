FROM php:8.2-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    unzip \
    zip \
    nginx \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    nodejs \
    npm \
    && docker-php-ext-install \
        pdo_mysql \
        mbstring \
        exif \
        pcntl \
        bcmath \
        gd \
        zip

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy project
COPY . .

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Install Node dependencies
RUN npm install

# Build Vite
RUN npm run build

# Laravel cache
RUN php artisan config:clear || true
RUN php artisan route:clear || true
RUN php artisan view:clear || true

# Permission
RUN chown -R www-data:www-data storage bootstrap/cache

# Copy nginx config
COPY docker/nginx.conf /etc/nginx/sites-enabled/default

EXPOSE 10000

CMD service nginx start && php-fpm