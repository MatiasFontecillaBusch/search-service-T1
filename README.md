## Descripción

Esta API está construida con **Express.js** y permite buscar estudiantes, sus notas y restricciones. 

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (versión 20.17.0 o superior)
- **npm** (gestor de paquetes de Node.js)

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/MatiasFontecillaBusch/search-service-T1.git
```

2. Navega al directorio del proyecto:

```bash
cd tu_repositorio
```

3. Instala las dependencias:

```bash
npm install
```

## Configuración

1. **Variables de Entorno**: Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables:

```plaintext
NODE_ENV=production
DATABASE="mongodb+srv://<USER>:<PASSWORD>@{DATABASE_HOST}/?retryWrites=true&w=majority&appName={DATABASE_NAME}"
DATABASE_PASSWORD="password"
DATABASE_USER="admin"
PORT=5000
SERVER_URL=http://localhost
```

Asegúrate de reemplazar los valores de las variables por los correspondientes a tu configuración.

## Uso

Para iniciar la API, ejecuta el siguiente comando:

```bash
npm start
```

La API se ejecutará en `http://localhost:5000`.

## Documentación
La documentación de la API se encuentra en el archivo `Search API.postman_collection.json`, esta fue hecha con Postman.