API de Productos y Carritos
Este proyecto consiste en una API  construida con Node.js y Express, que permite gestionar productos y carritos de compras. A través de los endpoints GET, POST, PUT y DELETE, puedes agregar, eliminar y consultar productos y carritos.

Descripción
La API está diseñada para manejar las operaciones básicas de un carrito de compras en una tienda online. Permite lo siguiente:

Gestionar productos: Puedes agregar productos a un carrito.
Gestionar carritos: Crear un nuevo carrito, agregar o eliminar productos de un carrito existente.
Leer datos: Consultar los productos de un carrito o listar todos los carritos.
Endpoints
Carritos
POST /carts/: Crea un nuevo carrito.
GET /carts/:cid: Obtiene los productos de un carrito específico.
POST /carts/:cid/product/:pid: Agrega un producto al carrito con el ID cid.
DELETE /carts/:cid/product/:pid: Elimina un producto del carrito con el ID cid.
Productos
GET /products/: Listar todos los productos disponibles.
Dependencias
Este proyecto utiliza las siguientes dependencias:

express: Framework para crear la API en Node.js.
uuid: Generación de identificadores únicos.

Levantar Proyecto:

Instalando las dependencias
npm install

Levantando el servidor en modo desarrollo 
npm run dev
