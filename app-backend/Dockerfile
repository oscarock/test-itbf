FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    libpq-dev \
    && docker-php-ext-install pdo pdo_pgsql

WORKDIR /var/www

COPY . .

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN composer install

# Establecer el directorio de trabajo
WORKDIR /var/www/html

# Copiar archivos del proyecto al contenedor
COPY . .

# Instalar dependencias de Composer y generar clave de la aplicación
RUN composer install --no-interaction --prefer-dist --optimize-autoloader && \
    php artisan key:generate

# Establecer permisos
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Exponer el puerto 9000 para PHP-FPM
EXPOSE 9000

CMD ["php-fpm"]
