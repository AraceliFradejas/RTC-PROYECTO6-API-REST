# Pruebas del CRUD con Insomnia

## Antes de empezar

1. Arranca la API con `npm start`.
2. Importa `docs/openapi.yaml` mediante **Import → File**.
3. Selecciona el entorno local `http://localhost:3000/api`.
4. Ejecuta las peticiones en el orden siguiente.

Los textos `:id` y `:songId` son marcadores, no identificadores reales. En la pestaña **Params**, dentro de **Path Parameters**, hay que sustituirlos por los valores `_id` devueltos por MongoDB.

## Recorrido recomendado

### 1. Comprobar la API

Ejecuta **Consultar el estado y los recursos de la API**. Debe responder `200`.

### 2. Crear un álbum temporal

Ejecuta **Crear un álbum** con este body:

```json
{
  "title": "API Test Album",
  "year": 2026,
  "description": "Recurso temporal para demostrar el CRUD",
  "era": "Testing",
  "totalTracks": 1,
  "label": "Academic Test"
}
```

Copia `data._id` de la respuesta. Este será el `albumId`. No incluyas un campo `songs` en esta petición.

### 3. Consultar y actualizar el álbum

Abre **Consultar un álbum por ID** y pega `albumId` en **Params → Path Parameters → id**.

En **Actualizar un álbum**, introduce el mismo `id` y usa:

```json
{
  "description": "Álbum actualizado sin perder sus canciones"
}
```

### 4. Crear una canción temporal

Ejecuta **Crear una canción y relacionarla con un álbum** sustituyendo `ID_DEL_ALBUM`:

```json
{
  "title": "API Test Song",
  "author": "Taylor Swift",
  "duration": "3:45",
  "trackNumber": 1,
  "album": "PEGA_AQUI_ALBUM_ID",
  "isPopular": false,
  "year": 2026
}
```

Copia `data._id`; este será el `songId`.

### 5. Demostrar la relación sin duplicados

Abre **Añadir una referencia sin duplicarla** y completa los dos Path Parameters:

- `id`: el `albumId`;
- `songId`: el `songId`.

Ejecuta dos veces la petición. Al consultar el álbum, la canción debe aparecer una sola vez porque el backend utiliza `$addToSet`.

### 6. Actualizar la canción

En **Actualizar una canción**, pega `songId` en el Path Parameter `id` y usa:

```json
{
  "isPopular": true,
  "duration": "3:50"
}
```

### 7. Limpiar los datos temporales

1. Ejecuta **Eliminar una canción** con `songId`.
2. Ejecuta **Eliminar un álbum** con `albumId`.

No ejecutes los `DELETE` con identificadores de los álbumes o canciones reales de la semilla.

## Qué significan los errores observados

- `Cast to ObjectId failed for value ":id"`: se envió el marcador `:id` sin sustituirlo.
- `Cast to ObjectId failed for value ":songId"`: se envió el marcador `:songId` sin sustituirlo.
- `songs.0 ... value "[ 'string' ]"`: Insomnia generó `songs: ["string"]`; elimina ese campo del body.

Estas respuestas `400` demuestran que el middleware de errores funciona, pero no sirven como prueba del CRUD correcto hasta utilizar IDs reales.
