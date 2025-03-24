# Pasos para ejecutar la aplicación

## Clonar el repositorio
```sh
git clone https://github.com/oscarock/test-itbf
```

## Ingresar a la carpeta del proyecto
```sh
cd test-itbf
```

## Configurar el backend
Ingresar a la carpeta `app-backend` y modificar el archivo `.env` en la sección de configuración de la base de datos:

```env
DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=prueba_hoteles
DB_USERNAME=postgres
DB_PASSWORD=secret
```

## Levantar el proyecto con Docker
```sh
docker compose up -d
```

Se crearán tres contenedores: frontend, backend y base de datos.

## Verificar los contenedores
```sh
docker ps -a
```

## Ejecutar migraciones en el backend
```sh
docker exec -it ID_CONTENEDOR bash
php artisan migrate
```

## Acceder a la aplicación
Si no se cambiaron los puertos por defecto, las URLs serán:

- **Backend:** [localhost:85](http://localhost:85/)
- **Frontend:** [localhost:3000](http://localhost:3000/)

## Ejecutar acciones desde el frontend
Una vez configurado todo, ya puede interactuar con la aplicación desde el frontend.

