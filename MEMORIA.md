# Memoria del proyecto: Taylor Swift Discography API REST

## 1. Objetivo

El proyecto consiste en una API REST desarrollada con Node.js, Express, MongoDB Atlas y Mongoose. Gestiona una selección de la discografía de Taylor Swift mediante dos colecciones relacionadas: álbumes y canciones.

El objetivo principal fue demostrar la creación de un servidor, la persistencia de datos, el CRUD completo de dos modelos y el mantenimiento de una relación uno a muchos sin perder ni duplicar referencias.

## 2. Arquitectura

```text
Cliente / Insomnia
        |
        v
Express routes
        |
        v
Controllers ----> Error handler
        |
        v
Mongoose models
        |
        v
MongoDB Atlas
```

El proyecto separa configuración, modelos, controladores, rutas, middleware, semilla y frontend. Dentro del frontend también se separan componentes de interfaz, servicios, traducciones, utilidades y estilos por responsabilidad. La conexión se establece mediante `MONGO_URI`, almacenada fuera del repositorio.

## 3. Modelos y relación

### Album

Contiene título, año, portada, descripción, era, color, número de pistas, sello y un array `songs` de referencias a documentos `Song`.

### Song

Contiene título, autoría, duración, número de pista, popularidad, año, enlaces musicales y una referencia `album` a su documento `Album`.

```text
Album 1 ---- N Song
  songs[]       album
```

Las consultas utilizan `populate()` para devolver la información relacionada.

## 4. Integridad de la relación

El backend mantiene las dos direcciones de la relación:

- al crear una canción, su ID se añade al álbum;
- al cambiarla de álbum, se retira del anterior y se añade al nuevo;
- al eliminarla, se retira su referencia del álbum;
- al eliminar un álbum, se eliminan sus canciones;
- `$addToSet` impide referencias duplicadas;
- el `PUT` de álbum excluye `songs` del body para impedir que una actualización borre el array relacionado.

## 5. Semilla

La semilla carga 16 álbumes y más de 280 canciones. Utiliza operaciones `upsert`, por lo que puede ejecutarse repetidamente sin vaciar las colecciones. Las referencias se incorporan mediante `$addToSet`.

## 6. Documentación y herramientas de prueba

- `README.md`: instalación, modelos y tabla de endpoints.
- `docs/openapi.yaml`: especificación OpenAPI 3 importable en Insomnia.
- `docs/INSOMNIA.md`: recorrido manual del CRUD.
- `docs/api-tests.http`: recorrido alternativo para REST Client.

Las pruebas siguientes se realizaron contra el servidor local conectado a MongoDB Atlas. Los recursos temporales se eliminaron al terminar.

## 7. Evidencias de funcionamiento

### 7.1 Estado de la API

La ruta base confirma que Express está activo y presenta los recursos disponibles.

![Estado de la API](<screenshots/Insomnia1_Taylor Swift Discography API REST.png>)

### 7.2 Gestión de errores

Un identificador que no tiene el formato de ObjectId produce una respuesta controlada `400 Bad Request`.

![Identificador no válido](<screenshots/Insomnia2_ID de recurso no válido.png>)

### 7.3 Lectura de las colecciones

Los listados devuelven el total de documentos y sus relaciones pobladas.

![Listado de canciones](<screenshots/Insomnia3_Listar y filtrar canciones.png>)

![Listado de álbumes](<screenshots/Insomnia4_Listar y filtrar albumes.png>)

### 7.4 Creación, consulta y actualización de un álbum

Se crea un recurso temporal, se recupera mediante su ID y se modifican sus campos.

![Creación de álbum](<screenshots/Insomnia5_AltaDeAlbum.png>)

![Consulta de álbum](<screenshots/Insomnia6_ConsultaDeAlbum.png>)

![Actualización de álbum](<screenshots/Insomnia7_ActualizacionDeAlbum.png>)

### 7.5 Creación de una canción y relación

La canción se crea indicando el ObjectId del álbum. Al consultar el álbum, aparece dentro de `songs` mediante `populate()`.

![Creación de canción](<screenshots/Insomnia8_CrearUnaCancion.png>)

![Relación entre canción y álbum](<screenshots/Insomnia9_RelacionCancionyAlbum.png>)

### 7.6 Prevención de duplicados

Se solicita dos veces la incorporación de la misma referencia. La consulta posterior muestra una única canción en el array gracias a `$addToSet`.

![Petición para añadir la referencia](<screenshots/Insomnia10_AñadirReferenciasSinDuplicados.png>)

![Consulta sin referencias duplicadas](<screenshots/Insomnia11_ConsultaSinDuplicadosAlbum.png>)

### 7.7 Conservación del array relacionado

El álbum se actualiza enviando `songs: []`. El controlador ignora ese campo y la consulta posterior confirma que la canción continúa relacionada.

![Actualización que intenta vaciar songs](<screenshots/Insomnia12_ActualizacionAlbumNoBorraCanciones.png>)

![Comprobación de songs tras actualizar](<screenshots/Insomnia12_ActualizacionAlbumNoBorraCancionesComprobacion.png>)

### 7.8 Actualización y filtrado de canciones

Se modifican la duración y el estado de popularidad. Después, el filtro por título devuelve únicamente la canción esperada.

![Actualización de canción](<screenshots/Insomnia13_ActualizacionCancion.png>)

![Filtro por título](<screenshots/Insomnia14_ListaFiltraCanciones.png>)

### 7.9 Eliminación y sincronización

Al eliminar la canción, su referencia desaparece del álbum. Finalmente se elimina también el álbum temporal.

![Eliminación de canción](<screenshots/Insomnia15_EliminarCancion.png>)

![Álbum sin la canción eliminada](<screenshots/Insomnia16_AlbumConCancionE,liminada.png>)

![Eliminación de álbum](<screenshots/Insomnia17_AlbumEliminado.png>)

## 8. Anexo visual: frontend

El frontend no forma parte del CRUD ni sustituye las pruebas realizadas con Insomnia. Se incorporó como un anexo visual para facilitar la exploración de los datos devueltos por la API y presentar de forma más accesible la relación entre álbumes y canciones. Su finalidad es ofrecer el punto de vista de una persona usuaria que interactúa con la información sin ver directamente el backend ni sus respuestas JSON.

El anexo está desplegado en Vercel y puede consultarse en [Taylor Swift Discography API REST](https://ret-proyecto6-api-rest.vercel.app/). Desde la misma aplicación se accede a los datos servidos por la API desplegada.

Está desarrollado con HTML, CSS y JavaScript nativo y consume exclusivamente las rutas de lectura. Permite:

- visualizar las eras y los álbumes en tarjetas;
- consultar las canciones relacionadas mediante un modal;
- buscar por título, autor o año;
- mostrar un carrusel de portadas;
- alternar el contenido entre castellano e inglés;
- comunicar estados de carga, resultados vacíos y errores de conexión.

La creación de elementos dinámicos se centraliza en una función auxiliar basada en `document.createElement()`, `textContent` y atributos DOM, sin inyectar plantillas HTML mediante strings. Las tarjetas de álbum, resultados, acciones de canciones, modal, buscador, navegación y carrusel son componentes independientes. Los servicios de API, búsqueda y resolución de portadas tampoco están mezclados con la representación visual. El archivo `app.js` queda limitado a componer e inicializar estas piezas.

El CSS se divide en un punto de entrada, estilos base y módulos por área visual. Esta organización evita un archivo monolítico y facilita localizar los estilos del hero, navegación, búsqueda, álbumes, modal, canciones, sección informativa y responsive. Las imágenes se validan antes de mostrarse: si una portada está vacía o contiene una URL inválida, se utiliza una imagen de sustitución para conservar el diseño de las tarjetas, el carrusel y el modal.

Como apoyo a la accesibilidad y al posicionamiento, el anexo emplea HTML semántico, textos alternativos, atributos ARIA, metadatos sociales, `robots.txt` y `sitemap.xml`.

### Experimento de aprendizaje con `llms.txt`

Como parte de mi aprendizaje sobre GEO (*Generative Engine Optimization*), incorporé también [`public/llms.txt`](public/llms.txt). Me interesaba experimentar con un archivo de texto que ofreciera a sistemas basados en modelos de lenguaje un resumen estructurado del proyecto, sus modelos, relaciones y endpoints.

Su inclusión es exploratoria: `llms.txt` no sustituye el README, la especificación OpenAPI, el sitemap ni las prácticas habituales de SEO, y su interpretación puede variar entre herramientas. En este proyecto se utiliza como ejercicio práctico para estudiar nuevas formas de hacer que la documentación técnica resulte comprensible y localizable tanto para personas como para asistentes de IA.

La interfaz está deliberadamente separada del recorrido de evaluación del backend: las operaciones `POST`, `PUT` y `DELETE` se documentan y demuestran con Insomnia. Aunque se mantiene como anexo porque el objetivo académico principal es construir y demostrar la API REST, el frontend se ha refactorizado para que sea mantenible y escalable.

Esta revisión aplica de forma consciente correcciones y lecciones aprendidas en proyectos anteriores del máster gracias a los consejos del profesorado. Entre ellas se encuentran la componentización, la reducción de archivos extensos, la reutilización de utilidades, una estrategia DOM coherente y segura, la eliminación de código o recursos sin uso, el CSS separado por responsabilidades, la semántica HTML, los estados de foco accesibles, el cambio real de idioma y el uso de metadatos SEO. Las observaciones específicas de otros tipos de aplicación, como reinicios de puntuación o estados de partidas, no se trasladan artificialmente porque no corresponden al alcance de este proyecto.

## 9. Cumplimiento de requisitos

| Requisito | Implementación |
| --- | --- |
| Servidor Express | `index.js` |
| MongoDB Atlas y Mongoose | `src/config/db.js` |
| Dos modelos | `Album` y `Song` |
| Semilla | `src/seeds/seed.js` |
| Array relacionado | `Album.songs` |
| CRUD completo | Rutas y controladores de ambos recursos |
| Documentación | README, memoria, OpenAPI y guía de Insomnia |
| Conservar relacionados al actualizar | Exclusión de `songs` en `updateAlbum` |
| Evitar duplicados | `$addToSet` |

## 10. Conclusiones

El proyecto cumple los requisitos de una API REST con dos colecciones relacionadas y aporta comprobaciones reproducibles de sus operaciones. La principal dificultad fue mantener sincronizadas las dos direcciones de la relación sin borrar ni duplicar referencias. El recorrido de Insomnia demuestra tanto los casos correctos como el tratamiento centralizado de errores. La revisión final del anexo visual demuestra además cómo el feedback acumulado durante el máster se ha convertido en decisiones concretas de arquitectura, accesibilidad, mantenibilidad y calidad del frontend.

Tras la revisión final del profesorado, que confirmó el cumplimiento completo de los requisitos, se incorporaron también sus dos observaciones técnicas: `updateSong` devuelve el álbum relacionado mediante `populate`, igual que el resto de consultas equivalentes, y la semilla dejó de contener canciones repetidas usadas para completar algunos tracklists. Como medida preventiva, la propia semilla valida ahora la unicidad de títulos y números de pista y la correspondencia entre cada array y `totalTracks` antes de conectarse a MongoDB.
