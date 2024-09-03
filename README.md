# E-commerce Backend Project

## Resumen

Esta aplicación backend fue desarrollada utilizando Node.js y Express.js para gestionar productos de una tienda de comercio electrónico. Se utilizó MySQL como base de datos y Sequelize como ORM para la interacción con la misma.

## Requisitos previos

- Docker y Docker Compose
- Node.js (versión recomendada: 14.x o superior)
- npm (normalmente viene con Node.js)

## Configuración inicial

1. Clonar el repositorio:
   ```
   git clone <url-del-repositorio>
   cd <nombre-del-directorio>
   ```

2. Instalar dependencias:
   ```
   npm install
   ```

3. Configurar variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=ecommerce_db
   JWT_SECRET=your_secret_key
   ```

## Iniciar la base de datos

La base de datos se configura utilizando Docker. Para iniciarla:

```
docker-compose up -d
```

Este comando levantará un contenedor con MySQL y ejecutará automáticamente un script para crear las tablas necesarias.

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

- POST `/auth/login`: Iniciar sesión y obtener token
- GET `/products`: Obtener todos los productos
- POST `/products`: Crear un nuevo producto
- PUT `/products/:id`: Actualizar un producto
- DELETE `/products/:id`: Eliminar un producto

Nota: Todos los endpoints de productos requieren autenticación mediante token JWT.

## Dependencias principales

- express: Framework web
- mysql2 y sequelize: ORM y driver para MySQL
- jsonwebtoken: Manejo de tokens JWT
- bcryptjs: Encriptación de contraseñas
- joi: Validación de datos
- cors: Manejo de CORS

## Scripts disponibles

- `npm start`: Inicia la aplicación en modo producción
- `npm run dev`: Inicia la aplicación en modo desarrollo con nodemon

## Estructura del proyecto

```
/
├── config/           # Configuraciones (base de datos, etc.)
├── controllers/      # Lógica de controladores
├── middlewares/      # Middlewares personalizados
├── models/           # Modelos de Sequelize
├── routes/           # Definiciones de rutas
├── utils/            # Utilidades y helpers
├── app.js            # Punto de entrada de la aplicación
├── docker-compose.yml # Configuración de Docker
└── README.md
```

## Contribución

Si deseas contribuir al proyecto, por favor:

1. Haz un fork del repositorio
2. Crea una nueva rama (`git checkout -b feature/AmazingFeature`)
3. Haz commit de tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la licencia ISC. Ver el archivo `LICENSE` para más detalles.