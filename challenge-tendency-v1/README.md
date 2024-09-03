# E-commerce Backend Project

## Resumen

Esta aplicación backend fue desarrollada utilizando Node.js y Express.js para gestionar productos de una tienda de comercio electrónico. Se utilizó MySQL como base de datos y Sequelize como ORM para la interacción con la misma.

## Requisitos previos

- Docker y Docker Compose
- Node.js (versión recomendada: 14.x o superior)

## Instalación de Docker y Docker Compose
Primero, necesitas instalar Docker y Docker Compose en tu sistema.

Docker

Para Windows y Mac: Descarga e instala Docker Desktop desde https://www.docker.com/products/docker-desktop
Para Linux: Sigue las instrucciones específicas de tu distribución en https://docs.docker.com/engine/install/

Docker Compose

Docker Compose viene incluido con Docker Desktop para Windows y Mac.
Para Linux, sigue las instrucciones en https://docs.docker.com/compose/install/


## Configuración inicial

1. Clonar el repositorio:
   ```
   git clone https://github.com/ninefingers-logen/tendencys-challenge
   cd challenge-tendencys
  
   ```
2. Levantar el contenedor de Docker
   docker-compose up -d 
   `Esto creará y iniciará los contenedores, incluyendo la base de datos MySQL, y ejecutará el script init.sql para crear las tablas.`
   

3. Instalar dependencias:
   ```
   npm install
   ```

4. Configurar variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables que estan en el .env.example.

  ` O puedes modificarlo y poner tus variables pero recuerda que entonces debes modificar tambien el docker-compose.yml`
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=ecommerce_db
   JWT_SECRET=your_secret_key
   ```

## Iniciar la aplicación

Para desarrollo:
```
npm run dev
```

Para producción:
```
npm start
```

## Endpoints principales

- POST `/auth`: Registrarse uno o varios usuarios y obtener token
- GET `/products`: Obtener todos los productos
- POST `/products`: Crear un nuevo producto y varios
- PUT `/products/:id`: Actualizar un producto
- DELETE `/products/:id`: Eliminar un producto

Nota: Todos los endpoints de productos requieren autenticación mediante token JWT(auth no requiere) y la creacion de usuarios asi como la de productos se pueden hacer en lote.

## Dependencias principales

- express: Framework web
- mysql2 y sequelize: ORM y driver para MySQL
- jsonwebtoken: Manejo de tokens JWT
- bcryptjs: Encriptación de contraseñas
- joi: Validación de datos
- cors: Manejo de CORS
- node-schedule: fue utilizado para programar la eliminación de tokens

## Scripts disponibles

- `npm start`: Inicia la aplicación en modo producción
- `npm run dev`: Inicia la aplicación en modo desarrollo con nodemon