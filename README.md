# 🎵 Taylor Swift Discography — API REST

> API REST completa sobre la discografía de Taylor Swift, construida con **Node.js**, **Express** y **MongoDB Atlas**.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue)

## 📋 Descripción

Proyecto 6 del módulo Backend de **The Power Education**. Una API REST que permite gestionar la discografía de Taylor Swift con la línea oficial de lanzamientos, incluidas las regrabaciones y los álbumes más recientes. Incluye un frontend web visual con búsqueda en tiempo real.

## 🛠️ Tech Stack

| Tecnología | Uso |
|---|---|
| **Node.js** | Runtime |
| **Express** | Framework HTTP |
| **MongoDB Atlas** | Base de datos en la nube |
| **Mongoose** | ODM para MongoDB |
| **HTML5 + CSS3 + JS** | Frontend |
| **Vercel** | Despliegue |

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/AraceliFradejas/RTC-PROYECTO6-API-REST.git
cd RTC-PROYECTO6-API-REST
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copia `.env.example` a `.env` y rellena tu URI de MongoDB Atlas:

```bash
cp .env.example .env
```

```env
PORT=3000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/taylorswift-db?retryWrites=true&w=majority
```

> ⚠️ **IMPORTANTE**: Asegúrate de tener la IP `0.0.0.0/0` en **MongoDB Atlas → Network Access** para que el evaluador pueda acceder.

### 4. Cargar datos de ejemplo (seed)

```bash
npm run seed
```

Esto cargará la base de la discografía oficial de Taylor Swift en el proyecto, con los lanzamientos más representativos y sus regrabaciones principales.

### 5. Iniciar el servidor

```bash
# Producción
npm start

# Desarrollo (con auto-reload)
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## 📐 Modelos

### Album

| Campo | Tipo | Descripción |
|---|---|---|
| `title` | String (required, unique) | Título del álbum |
| `year` | Number (required) | Año de publicación |
| `coverImage` | String | URL de la portada |
| `description` | String | Descripción / era |
| `era` | String | Nombre de la era |
| `eraColor` | String | Color hex de la era |
| `totalTracks` | Number | Nº total de pistas |
| `songs` | [ObjectId] → Song | **Array relacionado** con canciones |
| `label` | String | Sello discográfico |

### Song

| Campo | Tipo | Descripción |
|---|---|---|
| `title` | String (required) | Título de la canción |
| `author` | String (required) | Compositor(es) |
| `duration` | String | Duración (ej. "3:45") |
| `trackNumber` | Number | Número de pista |
| `album` | ObjectId → Album | Referencia al álbum |
| `isPopular` | Boolean | ¿Es un single/popular? |
| `lyrics` | String | Fragmento de la letra |
| `year` | Number | Año |

**Relación**: `Album.songs` contiene un array de ObjectIds que referencian `Song` (relación 1:N con populate).

## 🔗 Endpoints API

### Albums — `/api/albums`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/albums` | Obtener todos los álbumes (con populate de songs) |
| `GET` | `/api/albums?title=folklore` | Buscar álbumes por título |
| `GET` | `/api/albums?year=2020` | Buscar álbumes por año |
| `GET` | `/api/albums?era=reputation` | Buscar álbumes por era |
| `GET` | `/api/albums/:id` | Obtener un álbum por ID |
| `POST` | `/api/albums` | Crear un álbum nuevo |
| `PUT` | `/api/albums/:id` | Actualizar un álbum (**sin borrar el array songs**) |
| `DELETE` | `/api/albums/:id` | Eliminar un álbum y sus canciones |
| `POST` | `/api/albums/:id/songs/:songId` | Añadir canción al álbum (**sin duplicados**) |
| `DELETE` | `/api/albums/:id/songs/:songId` | Quitar canción del álbum |

### Songs — `/api/songs`

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/api/songs` | Obtener todas las canciones |
| `GET` | `/api/songs?title=love` | Buscar canciones por título |
| `GET` | `/api/songs?author=Max+Martin` | Buscar canciones por autor |
| `GET` | `/api/songs?year=2014` | Buscar canciones por año |
| `GET` | `/api/songs/:id` | Obtener una canción por ID |
| `POST` | `/api/songs` | Crear una canción nueva |
| `PUT` | `/api/songs/:id` | Actualizar una canción |
| `DELETE` | `/api/songs/:id` | Eliminar una canción |

### Ejemplos de Body (JSON)

**Crear álbum:**
```json
{
  "title": "The Tortured Poets Department",
  "year": 2024,
  "era": "TTPD Era",
  "eraColor": "#f5f5f5",
  "description": "El undécimo álbum de estudio de Taylor Swift",
  "label": "Republic Records"
}
```

**Crear canción:**
```json
{
  "title": "Fortnight",
  "author": "Taylor Swift, Post Malone, Jack Antonoff",
  "duration": "3:48",
  "trackNumber": 1,
  "album": "<album_id>",
  "isPopular": true
}
```

## ✅ Requisitos cumplidos

| Requisito | Estado | Detalle |
|---|---|---|
| Servidor con Express | ✅ | `index.js` |
| Conexión Mongo Atlas + Mongoose | ✅ | `src/config/db.js` |
| 2 modelos | ✅ | `Album` y `Song` |
| Semilla de datos | ✅ | `npm run seed` con la discografía oficial y las regrabaciones principales |
| Relación entre colecciones | ✅ | `Album.songs = [ObjectId]` → populate |
| CRUD completo (ambas) | ✅ | GET, POST, PUT, DELETE |
| README con endpoints | ✅ | Este archivo |
| PUT sin borrar array | ✅ | Se excluye `songs` del body al actualizar |
| Sin duplicados en array | ✅ | Se usa `$addToSet` de MongoDB |

## 🌐 Frontend

El proyecto incluye un frontend web accesible en `http://localhost:3000/` con:

- 🎨 Diseño oscuro y elegante con colores por era
- 🔍 Buscador de canciones en tiempo real
- 📱 Diseño responsive
- ♿ Accesibilidad (ARIA, focus, skip-nav, contraste)
- 📊 SEO (meta tags, JSON-LD, sitemap)

## 👩‍💻 Autora

**Araceli Fradejas** — [GitHub](https://github.com/AraceliFradejas)

Proyecto realizado para **The Power Education** — Módulo 5 Backend (Node | Mongo | API REST)
