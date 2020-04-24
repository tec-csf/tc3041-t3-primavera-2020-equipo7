# Tarea 3. Bases de datos NoSQL (MongoDB)

---

##### Integrantes:
1. *[Poner aquí Nombre y Apellidos del integrante 1]* - *[Poner aquí su Matrícula]* - *Campus Santa Fe*
2. *Alejandra Nissan Leizorek* - *A01024682* - *Campus Santa Fe*
3. *Yann Le Lorier Bárcena* - *A01025977* - *Campus Santa Fe*
4. *[Poner aquí Nombre y Apellidos del integrante 4]* - *[Poner aquí su Matrícula]* - *Campus Santa Fe*

---
## 1. Aspectos generales

Las orientaciones de la tarea se encuentran disponibles en la plataforma **Canvas**.

Este documento es una guía sobre qué información debe entregar como parte de la tarea, qué requerimientos técnicos debe cumplir y la estructura que debe seguir para organizar su entrega.


### 1.1 Requerimientos técnicos

A continuación se mencionan los requerimientos técnicos mínimos de la tarea, favor de tenerlos presente para que cumpla con todos.

* El equipo tiene la libertad de elegir las tecnologías de desarrollo a utilizar en la tarea, sin embargo, debe tener presente que la solución final se deberá ejecutar en una plataforma en la nube. Puede ser  [Google Cloud Platform](https://cloud.google.com/?hl=es), [Azure](https://azure.microsoft.com/en-us/), [AWS](https://aws.amazon.com/es/free/) u otra.
* La arquitectura de la solución deberá estar separada claramente por capas (*frontend*, *backend*, datos y almacenamiento).
* Todo el código, *scripts* y la documentación de la tarea debe alojarse en este repositorio de GitHub, siguiendo la estructura que aparece a continuación.

### 1.2 Estructura del repositorio

El proyecto debe seguir la siguiente estructura de carpetas:
```
- / 			        # Raíz de toda la tarea
    - README.md			# Archivo con la información general de la tarea (este archivo)
    - frontend			# Carpeta con la solución del frontend (Web app)
    - backend			# Carpeta con la solución del backend (API)
    - scripts		        # Carpeta con los scripts necesarios para generar la base de datos, cargar datos y ejecutar las consultas
    - database			# Carpeta con el modelo de la bases de datos utilizando JSON Schema

```

### 1.3 Documentación de la tarea

Como parte de la entrega de la tarea, se debe incluir la siguiente información:

* Diagrama del *Modelo de la base de datos utilizando JSON Schema*.
* *Scripts* para generar la base de datos, cargar datos y ejecutar consultas.
* Guía de configuración, instalación y despliegue de la aplicación en la plataforma en la nube  seleccionada.
* El código debe estar documentado siguiendo los estándares definidos para el lenguaje de programación seleccionado.

## 2. Solución

MERN Stack Development

Se trata de tecnologías basadas en JavaScript para desarrollar aplicaciones web en:
- **M** : MongoDB
- **E** : Express JS
- **R** : React JS
- **N** : Node JS

Al usar estas herramientas, es muy fácil construir aplicaciones web, permite flexibilidad porque el desarrollador puede elegir qué plug-ins necesita para su caso de uso específico.

### 2.1 Modelo de la *base de datos* 


Songs
```json
{
  "$id": "kubermusik schema
  "$schema": "kubermusik”,
  "title": "Songs",
  "type": "object",
  "properties": {
    "_id": {
      "type": "ObjectId",
      "description": "The unique key for the object."
    },
    "name": {
      "type": "string",
      "description": "The songs name."
    },
    "duration": {
      "description": "The duration of the song",
      "type": "double",
    }, 
   “next_song”: {
      "description": "Makes reference to the next song to play",
      "type": "ObjectId",
   },
   “id_artist”: {
      "description": "Makes reference to the artist, author of this song",
      "type": "ObjectId",
   },
   “id_album”: {
      "description": "Makes reference to the album it belongs to",
      "type": "ObjectId",
   }
  }
}


```
Albums
```json
{
  "$id": "kubermusik schema
  "$schema": "kubermusik”,
  "title": "Albums",
  "type": "object",
  "properties": {
    "_id": {
      "type": "ObjectId",
      "description": "The unique key for the object."
    },
    "name": {
      "type": "string",
      "description": "The albums name."
    },
    "launch_date": {
      "description": "The day it was launched",
      "type": "date",
    }, 
   “id_company”: {
      "description": "Makes reference to the company that supported this album. ",
      "type": "ObjectId",
   },
   “id_artist”: {
      "description": "Makes reference to the artist of the album",
      "type": "ObjectId",
   }
  }
}
```
Artists
```
{
  "$id": "kubermusik schema
  "$schema": "kubermusik”,
  "title": "Artists",
  "type": "object",
  "properties": {
    "_id": {
      "type": "ObjectId",
      "description": "The unique key for the object."
    },
    "name": {
      "type": "string",
      "description": "The artists name."
    },
    "start_date": {
      "description": "The day the artist started his artistic career",
      "type": "date",
    },
   "birth_date": {
      "description": "His birth date",
      "type": "date",
    }, 
 
   “birth_country”: {
      "description": "His country of birth. ",
      "type": "String",
   }
  }
}
```

Companies
```json
{
  "$id": "kubermusik schema
  "$schema": "kubermusik”,
  "title": "Companies",
  "type": "object",
  "properties": {
    "_id": {
      "type": "ObjectId",
      "description": "The unique key for the object."
    },
    "name": {
      "type": "string",
      "description": "The companies name."
    },
    "coordinates": {
      "description": "The location of the company",
      "type": "array",
      "items": {
        "latitude": "double",
        “longitude”: “double”
      }
    }
  }
}
```

### 2.2 Arquitectura de la solución

![Arquitectura general de la solución](./images/arch.JPG)

### 2.3 Frontend

#### 2.3.1 Lenguaje de programación
El lenguaje de programación utilizado es JavaScript
#### 2.3.2 Framework
El framework utilizado es el de React, que permite construir la interfaz gráfica de la aplicación, finalmente hace las operaciones lógicas para pedir información al API.

#### 2.3.3 Librerías de funciones o dependencias

En el caso del frontend, se encuentran las siguientes dependencias:

```json

"dependencies": {
    "@fortawesome/fontawesome-svg-core": "^1.2.28",
    "@fortawesome/free-solid-svg-icons": "^5.13.0",
    "@fortawesome/react-fontawesome": "^0.1.9",
    "axios": "^0.19.2",
    "bootstrap": "^4.3.1",
    "prop-types": "^15.7.2",
    "react": "^16.8.5",
    "react-dom": "^16.8.5",
    "react-hook-form": "^5.5.1",
    "react-router-dom": "^5.1.2",
    "react-scripts": "2.1.8",
    "reactstrap": "^8.4.1",
    "semantic-ui-react": "^0.88.2"
}
```

### 2.4 Backend
Utilizamos como backend JavaScript, con el ambiente de Node, express y el framework de Mongoose. La conexión con Mongo por medio de Mongoose permite el uso del Aggregation framework. Está implementado de manera a que es muy simple establecer conectividad por medio del código, sobre todo que se puede hacer el deploy de la base de datos directamente de MongoDB Compass.

En gran parte, el modelo que utilizamos para la organización de las rutas fue inspirado en el tutorial que se encuentra [aquí](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes).

#### 2.4.1 Lenguaje de programación
El lenguage de programación utilizado es JavaScript.
#### 2.4.2 Framework
https://mongoosejs.com/docs/

Mongoose es un framework que permite la conectividad de manera simple a MongoDB. Dentro de sus funciones que más utilizamos están:
- updateOne()
- deleteOne()
- deleteMany()

Se trata de funciones que ya están optimizadas para el funcionamiento de MongoDB, asegurando consultas rápidas.
#### 2.4.3 Librerías de funciones o dependencias
```json
"dependencies": {
    "body-parser": "^1.19.0",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "mongoose": "^5.9.7",
    "nodemon": "^2.0.3"
  }
```


## 2.5 Pasos a seguir para utilizar la aplicación

### 2.5.1 Descargar MongoDB Compass
Se puede encontrar en la página de Mongo:
https://www.mongodb.com/products/compass

Se necesitará registrar con usuario y contraseña.

### 2.5.2 Creando un Cluster de MongoDB
Una vez la instalación aplicada, es necesario crear la base de datos:

![Creación del cluster](./images/buildCluster.png)

### 2.5.3 Escogiendo los proveedores de servicio

Puede elegir entre AWS, GCP o Azure, y también puede elegir la región en la que quiere tener el cluster. Este paso es gratis si no tiene aún ningún Cluster.

![Elección del proveedor](./images/cloudProv.png)


### 2.5.4 Inserción de datos

Puede jalar información de un archivo CSV o bien de un .json, que encuentra en el siguiente [path](./scripts):

![Importación de datos](./images/importData.png)

### 2.5.5 Deploy
MISSING

## 3. Referencias

- https://mongoosejs.com/docs/
- https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
- https://mongoosejs.com/docs/geojson.html
