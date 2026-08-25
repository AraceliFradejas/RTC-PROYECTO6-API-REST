# Taylor Swift Discography API REST

API REST y aplicación web para explorar y gestionar una selección de la discografía de Taylor Swift. Proyecto académico del módulo Backend Node + Mongo de Rock The Code, desarrollado con Node.js, Express, MongoDB Atlas y Mongoose.

[Ver aplicación](https://ret-proyecto6-api-rest.vercel.app/) · [Consultar la API](https://ret-proyecto6-api-rest.vercel.app/api) · [Repositorio](https://github.com/AraceliFradejas/RTC-PROYECTO6-API-REST)

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-deployed-000000?logo=vercel&logoColor=white)

## Versión en castellano

### Proyecto académico

La aplicación organiza álbumes y canciones en dos colecciones relacionadas. Cada álbum contiene un array de referencias a canciones y las consultas utilizan `populate` para devolver sus datos relacionados.

Incluye:

- servidor con Express y conexión a MongoDB Atlas mediante Mongoose;
- modelos `Album` y `Song` y CRUD completo de ambos;
- semilla con 16 álbumes y más de 90 canciones;
- relación uno a muchos entre álbumes y canciones;
- actualización de álbumes sin sobrescribir el array `songs`;
- prevención de duplicados mediante `$addToSet`;
- filtros por título, autor, año y era;
- frontend responsive bilingüe, gestión de errores y despliegue en Vercel.

### Demo

- Aplicación: <https://ret-proyecto6-api-rest.vercel.app/>
- Estado de la API: <https://ret-proyecto6-api-rest.vercel.app/api>
- Álbumes: <https://ret-proyecto6-api-rest.vercel.app/api/albums>
- Canciones: <https://ret-proyecto6-api-rest.vercel.app/api/songs>

### Modelos y relación

#### Album

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `title` | String, requerido y único | Título del álbum |
| `year` | Number, requerido | Año de publicación |
| `coverImage` | String | URL de la portada |
| `description` | String | Descripción del álbum |
| `era` / `eraColor` | String | Era y color asociado |
| `totalTracks` | Number | Número total de pistas |
| `songs` | Array de ObjectId | Referencias a `Song` |
| `label` | String | Sello discográfico |

#### Song

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `title` | String, requerido | Título de la canción |
| `author` | String, requerido | Autoría |
| `duration` / `trackNumber` | String / Number | Duración y posición |
| `album` | ObjectId, requerido | Referencia a `Album` |
| `isPopular` | Boolean | Canción destacada |
| `lyrics` / `year` | String / Number | Letra y año |
| `spotifyUrl` / `appleMusicUrl` | String | Enlaces de streaming |

`Song.album` referencia un álbum y `Album.songs` conserva el array relacionado. Al crear, mover o eliminar una canción se sincroniza el array del álbum. El `PUT` de álbumes ignora cualquier `songs` recibido en el body para evitar borrados accidentales y `$addToSet` evita referencias duplicadas.

### Endpoints

URL base: `https://ret-proyecto6-api-rest.vercel.app/api`

#### Álbumes

| Método | Endpoint | Acción |
| --- | --- | --- |
| `GET` | `/albums` | Obtener álbumes con sus canciones |
| `GET` | `/albums?title=folklore` | Filtrar por título |
| `GET` | `/albums?year=2020` | Filtrar por año |
| `GET` | `/albums?era=reputation` | Filtrar por era |
| `GET` | `/albums/:id` | Obtener un álbum |
| `POST` | `/albums` | Crear un álbum |
| `PUT` | `/albums/:id` | Actualizar sin borrar `songs` |
| `DELETE` | `/albums/:id` | Eliminar álbum y canciones |
| `POST` | `/albums/:id/songs/:songId` | Añadir referencia sin duplicados |
| `DELETE` | `/albums/:id/songs/:songId` | Quitar una referencia desvinculada |

#### Canciones

| Método | Endpoint | Acción |
| --- | --- | --- |
| `GET` | `/songs` | Obtener todas las canciones |
| `GET` | `/songs?title=love` | Filtrar por título |
| `GET` | `/songs?author=Jack%20Antonoff` | Filtrar por autor |
| `GET` | `/songs?year=2020` | Filtrar por año |
| `GET` | `/songs/:id` | Obtener una canción |
| `POST` | `/songs` | Crear y relacionar una canción |
| `PUT` | `/songs/:id` | Actualizar y sincronizar su álbum |
| `DELETE` | `/songs/:id` | Eliminar y retirar su referencia |

### Ejemplo de creación

```http
POST /api/songs
Content-Type: application/json
```

```json
{
  "title": "Example Song",
  "author": "Taylor Swift",
  "duration": "3:45",
  "trackNumber": 1,
  "album": "ID_DEL_ALBUM",
  "isPopular": false,
  "year": 2026
}
```

### Instalación local

Requisitos: Node.js 18 o posterior y MongoDB Atlas.

```bash
git clone https://github.com/AraceliFradejas/RTC-PROYECTO6-API-REST.git
cd RTC-PROYECTO6-API-REST
npm install
```

Crea un archivo `.env` en la raíz:

```env
PORT=3000
MONGO_URI=mongodb+srv://USUARIO:CONTRASEÑA@CLUSTER.mongodb.net/taylorswift-db?retryWrites=true&w=majority
NODE_ENV=development
```

En Atlas, configura el acceso de red que necesite el entorno de corrección. Si utilizas `0.0.0.0/0`, usa permisos mínimos y una contraseña exclusiva para esta entrega.

```bash
npm run seed
npm start
```

La aplicación estará en `http://localhost:3000` y la API en `http://localhost:3000/api`. Para desarrollo con recarga automática, utiliza `npm run dev`.

> El `.env` contiene credenciales y no se publica. Las variables de producción se configuran en Vercel y las credenciales de corrección se comparten únicamente por el canal privado del centro.

### Estructura

```text
.
├── frontend/
│   ├── css/styles.css
│   ├── js/app.js
│   └── index.html
├── src/
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/errorHandler.js
│   ├── models/
│   ├── routes/
│   └── seeds/seed.js
├── index.js
├── package.json
└── vercel.json
```

### Tecnologías

Node.js · Express · MongoDB Atlas · Mongoose · HTML5 · CSS3 · JavaScript · Vercel

### Autora

Araceli Fradejas Muñoz — [GitHub](https://github.com/AraceliFradejas)

Proyecto realizado para The Power Tech School, máster Rock The Code.

---

## English version

### Academic project

This REST API and web application organize albums and songs in two related MongoDB collections. Each album contains an array of song references, and album queries use Mongoose `populate` to return the related data.

It includes an Express server, MongoDB Atlas with Mongoose, `Album` and `Song` models, complete CRUD operations, a seed with 16 albums and more than 90 songs, search filters, centralized error handling, a responsive Spanish/English frontend and Vercel deployment.

### Live demo

- Application: <https://ret-proyecto6-api-rest.vercel.app/>
- API status: <https://ret-proyecto6-api-rest.vercel.app/api>
- Albums: <https://ret-proyecto6-api-rest.vercel.app/api/albums>
- Songs: <https://ret-proyecto6-api-rest.vercel.app/api/songs>

### Relationship behavior

`Song.album` references an album, while `Album.songs` stores the related song IDs. Creating, moving or deleting a song keeps the album array synchronized. Album updates ignore a `songs` property in the request body, preventing accidental replacement, and `$addToSet` prevents duplicate references.

### API endpoints

Base URL: `https://ret-proyecto6-api-rest.vercel.app/api`

| Resource | Methods and routes |
| --- | --- |
| Albums | `GET/POST /albums`, `GET/PUT/DELETE /albums/:id` |
| Album filters | `GET /albums?title=`, `?year=`, `?era=` |
| Relationship | `POST/DELETE /albums/:id/songs/:songId` |
| Songs | `GET/POST /songs`, `GET/PUT/DELETE /songs/:id` |
| Song filters | `GET /songs?title=`, `?author=`, `?year=` |

### Run locally

Requirements: Node.js 18 or later and MongoDB Atlas.

```bash
git clone https://github.com/AraceliFradejas/RTC-PROYECTO6-API-REST.git
cd RTC-PROYECTO6-API-REST
npm install
```

Create `.env` in the project root:

```env
PORT=3000
MONGO_URI=mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/taylorswift-db?retryWrites=true&w=majority
NODE_ENV=development
```

Then run:

```bash
npm run seed
npm start
```

The app will be available at `http://localhost:3000`, with the API at `http://localhost:3000/api`.

> `.env` contains credentials and is not published. Production variables belong in Vercel, and submission credentials should only be shared through the school's private channel.

### Technologies

Node.js · Express · MongoDB Atlas · Mongoose · HTML5 · CSS3 · JavaScript · Vercel

### Author

Araceli Fradejas Muñoz — [GitHub](https://github.com/AraceliFradejas)

Academic project for The Power Tech School's Rock The Code program.
