## Tecnologías Usadas
![Node.js](https://nodejs.org/static/images/logo.svg)
![MySQL](https://www.mysql.com/common/logos/logo-mysql-170x115.png)

Este proyecto utiliza las siguientes tecnologías:
- **Node.js**: Un entorno de ejecución para JavaScript en el servidor, basado en el motor V8 de Chrome.
- **MySQL**: Un sistema de gestión de bases de datos relacional de código abierto, muy popular para aplicaciones web.

## Descripción ##
API básica para una aplicación de pedidos que permite a los usuarios realizar las siguientes acciones:

- POST /register – Registrar un nuevo usuario.
- POST /login – Iniciar sesión y devolver un token de autenticación.
- GET /orders – Listar todos los pedidos del usuario autenticado.
- POST /orders – Crear un nuevo pedido.
- PUT /orders/:id – Actualizar un pedido existente (e.g., cambiar la cantidad de artículos).
- DELETE /orders/:id – Eliminar un pedido.
- GET /orders/:id/status – Consultar el estado de un pedido.


## Instrucciones para Ejecutar la Aplicación
Sigue estos pasos para ejecutar la aplicación en tu entorno local:

### Requisitos Previos

Asegúrate de tener instalados los siguientes programas en tu computador si todavía no los tienes:

- **Node.js**: [Descargar Node.js](https://nodejs.org/)
- **MySQL**: [Descargar MySQL](https://dev.mysql.com/downloads/)

### Paso 1: Clonar el Repositorio
- En la ubicación donde quieras clonar el repositorio abre una terminal y ejecuta el comando 
  ```bash
  git clone https://github.com/CarlosYick/API-Pedidos.git

### Paso 2: Instalar las Dependencias
- Entra ahora en la carpeta del proyecto y ejecuta el siguiente comando en una terminal.
  ```bash
  npm install

### Paso 3: Instalar las Dependencias
- Crea un archivo **.env** en el directorio raíz del proyecto con el siguiente contenido:
  - DB_HOST=localhost
  - DB_USER=root
  - DB_PASSWORD=your_password
  - DB_NAME=my_database
  - PORT=3000
  - JWT_SECRET=your_jwt_secret

### Paso 4: Crea la base de datos
- En la raíz del proyecto hay un archivo llamado **bd.sql** que contiene codigo sql listo para crear la base de datos y sus tablas, copia el contenido de ese archivo y ejecutalo en tu herramienta de administración de base de datos MySQL.

### Paso 5: Inicia el servidor de desarrollo local
- En la misma carpeta del proyecto ejecuta el siguiente comando en una terminal
  ```bash
  npm run dev

## Como Probar Endpoints ##
La API estará disponible en http://localhost:3000

- Registrar un usuario: **http://localhost:3000/api/users/register**
    URL: /api/users/register
    Método: POST
    Cuerpo de la solicitud:
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123"
    }

- Iniciar sesión: **http://localhost:3000/api/users/login**
  URL: /api/users/login
  Método: POST
  Cuerpo de la solicitud:
    {
      "email": "john@example.com",
      "password": "password123"
    }

- Obtener todas las órdenes de un usuario: **http://localhost:3000/api/orders**
  URL: /api/orders
  Método: GET
  Encabezados:
  Authorization: Bearer jwt_token

- Crear una orden: **http://localhost:3000/api/orders**
  URL: /api/orders
  Método: POST
  Encabezados:
  Authorization: Bearer jwt_token
  Cuerpo de la solicitud:
  {
      "product": "queso",
      "amount": 2,
      "status": "En preparacion"
  }

- Eliminar una orden: **http://localhost:3000/api/orders/:id**
  URL: /api/orders/:id
  Método: DELETE
  Encabezados:
  Authorization: Bearer jwt_token

- Obtener el estado de una orden: **http://localhost:3000/api/orders/:id/status**
  URL: /api/orders/:id/status
  Método: GET
  Encabezados:
  Authorization: Bearer jwt_token

- Actualizar una orden: **http://localhost:3000/api/orders/:id**
  URL: /api/orders/:id
  Método: PUT
  Encabezados:
  Authorization: Bearer jwt_token
  Cuerpo de la solicitud:
  {
      "product": "queso",
      "amount": 2,
      "status": "Entregado"
  }

