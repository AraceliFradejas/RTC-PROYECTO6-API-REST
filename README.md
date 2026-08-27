# Taylor Swift Discography API REST

API REST para gestionar una selección de la discografía de Taylor Swift, acompañada de un frontend como anexo visual para explorar sus datos. Proyecto académico del módulo Backend Node + Mongo de Rock The Code, desarrollado con Node.js, Express, MongoDB Atlas y Mongoose.

El frontend representa la experiencia de una persona usuaria que consulta la información sin acceder directamente al backend. Está organizado con módulos ES y componentes reutilizables en Vanilla JavaScript, manteniendo separadas la interfaz, la lógica de negocio, el acceso a la API y las utilidades.

En esta versión se han aplicado de forma consciente correcciones y lecciones aprendidas en proyectos anteriores del máster gracias a las recomendaciones del profesorado: componentización, archivos más pequeños, una única estrategia segura para crear DOM, eliminación de código y recursos sin uso, estilos organizados por responsabilidad, semántica HTML, foco accesible, contenido bilingüe coherente y metadatos SEO.

[Ver aplicación](https://ret-proyecto6-api-rest.vercel.app/) · [Consultar la API](https://ret-proyecto6-api-rest.vercel.app/api) · [Repositorio](https://github.com/AraceliFradejas/RTC-PROYECTO6-API-REST)

[Memoria y evidencias del proyecto](MEMORIA.md)

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
- semilla idempotente con 16 álbumes y más de 90 canciones;
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

### Demostración y pruebas del CRUD

El archivo [`docs/api-tests.http`](docs/api-tests.http) contiene un recorrido reproducible por el backend: estado de la API, lecturas, creación y actualización de ambos modelos, filtros, respuestas de error y eliminación de los recursos temporales.

Para probarla con Insomnia, importa [`docs/openapi.yaml`](docs/openapi.yaml) mediante **Import → File**. Insomnia creará una colección con todos los endpoints y permitirá seleccionar el servidor local o el desplegado. El recorrido paso a paso y el uso de los IDs está explicado en [`docs/INSOMNIA.md`](docs/INSOMNIA.md). Para las operaciones de escritura se recomienda utilizar el servidor local.

La prueba también demuestra expresamente los dos requisitos de la relación:

- volver a relacionar la misma canción no duplica su referencia porque se utiliza `$addToSet`;
- actualizar un álbum enviando `"songs": []` no borra las relaciones existentes.

Puede ejecutarse desde VS Code con la extensión REST Client. Arranca primero la aplicación con `npm start` y ejecuta las peticiones en orden. El archivo utiliza recursos temporales y termina eliminándolos.

> La API es pública con fines académicos. Las operaciones de escritura modifican datos reales; utiliza el flujo de pruebas en local o sobre una base de datos de desarrollo.

### Evidencias con Insomnia

Las siguientes capturas resumen el recorrido principal. La secuencia completa y la explicación de cada comprobación están disponibles en la [memoria del proyecto](MEMORIA.md#7-evidencias-de-funcionamiento).

#### Consulta de las colecciones

![Listado de álbumes con sus canciones relacionadas](<screenshots/Insomnia4_Listar y filtrar albumes.png>)

#### Creación de un álbum

![Alta de un álbum temporal](<screenshots/Insomnia5_AltaDeAlbum.png>)

#### Creación y relación de una canción

![Creación de una canción relacionada](<screenshots/Insomnia8_CrearUnaCancion.png>)

![Consulta de la relación entre álbum y canción](<screenshots/Insomnia9_RelacionCancionyAlbum.png>)

#### Prevención de duplicados

![Comprobación del array sin referencias duplicadas](<screenshots/Insomnia11_ConsultaSinDuplicadosAlbum.png>)

#### Actualización sin borrar relaciones

![Comprobación de las canciones después de actualizar el álbum](<screenshots/Insomnia12_ActualizacionAlbumNoBorraCancionesComprobacion.png>)

#### Filtrado y eliminación

![Filtro de canciones por título](<screenshots/Insomnia14_ListaFiltraCanciones.png>)

![Eliminación del álbum temporal](<screenshots/Insomnia17_AlbumEliminado.png>)

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

La semilla utiliza operaciones `upsert`: puede ejecutarse varias veces sin vaciar las colecciones, duplicar referencias ni eliminar datos añadidos manualmente.

La aplicación estará en `http://localhost:3000` y la API en `http://localhost:3000/api`. Para desarrollo con recarga automática, utiliza `npm run dev`.

> El `.env` contiene credenciales y no se publica. Las variables de producción se configuran en Vercel y las credenciales de corrección se comparten únicamente por el canal privado del centro.

### Estructura

```text
.
├── frontend/
│   ├── css/
│   │   ├── components/   # Estilos separados por área visual
│   │   ├── base.css      # Reset, variables y utilidades globales
│   │   └── styles.css    # Punto de entrada de la cascada
│   ├── js/
│   │   ├── components/    # Componentes y controladores de interfaz
│   │   ├── services/      # API, búsqueda y portadas
│   │   ├── utils/         # DOM y tratamiento de texto
│   │   ├── app.js         # Punto de entrada
│   │   └── i18n.js        # Textos ES/EN
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

El punto de entrada solo compone las dependencias. Las tarjetas de álbum, resultados, modal, buscador, navegación y carrusel son módulos independientes; el acceso HTTP está centralizado en `services/api.js`. Esta separación permite modificar o probar cada responsabilidad sin convertir `app.js` en un archivo monolítico.

### Tecnologías

Node.js · Express · MongoDB Atlas · Mongoose · HTML5 · CSS3 · JavaScript · Vercel

### Autora

Araceli Fradejas Muñoz

Proyecto realizado para The Power Tech School, máster Rock The Code.

### Redes sociales y enlaces

- GitHub: <https://github.com/AraceliFradejas>
- LinkedIn: <https://www.linkedin.com/in/araceli-fradejas-munoz-transformaciondigital/>
- Instagram: <https://www.instagram.com/goldilocks1013x/>
- X (Twitter): <https://x.com/AraceliFradejas>
- TikTok: <https://www.tiktok.com/@arucci1>
- YouTube: <https://www.youtube.com/@aracelifradejasmunoz2758>
- Medium: <https://medium.com/@araceli.fradejas>

### Nota final

Este proyecto es una entrega académica desarrollada con fines de formación dentro del máster Rock The Code de The Power Tech y no representa ninguna aplicación oficial de Taylor Swift. Es una aplicación creada exclusivamente con fines educativos.

---

## English version

### Academic project

This REST API and web application organize albums and songs in two related MongoDB collections. Each album contains an array of song references, and album queries use Mongoose `populate` to return the related data.

It includes an Express server, MongoDB Atlas with Mongoose, `Album` and `Song` models, complete CRUD operations, an idempotent seed with 16 albums and more than 90 songs, search filters, centralized error handling, a responsive Spanish/English frontend and Vercel deployment.

This version consciously applies corrections and lessons learned from earlier projects in the master's program thanks to the teaching staff's feedback: reusable components, smaller files, consistent and safe DOM creation, removal of unused code and assets, responsibility-based CSS organization, semantic HTML, accessible focus states, coherent bilingual rendering and SEO metadata.

The frontend uses native ES modules. UI components, API and search services, translations and shared utilities are kept in separate folders, while `app.js` is limited to composing and initializing them.

### Live demo

- Application: <https://ret-proyecto6-api-rest.vercel.app/>
- API status: <https://ret-proyecto6-api-rest.vercel.app/api>
- Albums: <https://ret-proyecto6-api-rest.vercel.app/api/albums>
- Songs: <https://ret-proyecto6-api-rest.vercel.app/api/songs>

### Relationship behavior

`Song.album` references an album, while `Album.songs` stores the related song IDs. Creating, moving or deleting a song keeps the album array synchronized. Album updates ignore a `songs` property in the request body, preventing accidental replacement, and `$addToSet` prevents duplicate references.

### CRUD test flow

[`docs/api-tests.http`](docs/api-tests.http) provides a reproducible request sequence covering both CRUDs, filters, error responses, relationship deduplication and preservation of the `songs` array during album updates. Start the local server and run the requests in order with VS Code REST Client. The sequence creates temporary resources and removes them at the end.

For Insomnia, import [`docs/openapi.yaml`](docs/openapi.yaml) using **Import → File**. Insomnia will generate a request collection for every endpoint and offer both the local and deployed servers. The ID-based workflow is documented in [`docs/INSOMNIA.md`](docs/INSOMNIA.md). Use the local server for write operations.

> This is a public academic API. Write operations change real data, so run the test flow locally or against a development database.

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

The seed uses `upsert` operations, so it can run repeatedly without emptying collections, duplicating references or deleting manually added data.

The app will be available at `http://localhost:3000`, with the API at `http://localhost:3000/api`.

> `.env` contains credentials and is not published. Production variables belong in Vercel, and submission credentials should only be shared through the school's private channel.

### Technologies

Node.js · Express · MongoDB Atlas · Mongoose · HTML5 · CSS3 · JavaScript · Vercel

### Author

Araceli Fradejas Muñoz

Academic project for The Power Tech School's Rock The Code program.

### Social links and profiles

- GitHub: <https://github.com/AraceliFradejas>
- LinkedIn: <https://www.linkedin.com/in/araceli-fradejas-munoz-transformaciondigital/>
- Instagram: <https://www.instagram.com/goldilocks1013x/>
- X (Twitter): <https://x.com/AraceliFradejas>
- TikTok: <https://www.tiktok.com/@arucci1>
- YouTube: <https://www.youtube.com/@aracelifradejasmunoz2758>
- Medium: <https://medium.com/@araceli.fradejas>

### Final note

This project is an academic submission created for educational purposes as part of The Power Tech's Rock The Code master's program. It does not represent any official Taylor Swift application and was developed exclusively as an educational project.
