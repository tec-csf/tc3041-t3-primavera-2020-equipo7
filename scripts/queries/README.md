# Queries

## Consultas Para Album

### Despliegue de toda la lista de albums
```mql
albumsCollection.aggregate([
        {
            '$skip': 30 * (page_no - 1)
        }, {
            '$limit': 30
        }, {
            '$sort': {
                'name': 1
            }
        }, {
            '$lookup': {
                'from': 'artists',
                'localField': 'id_artist',
                'foreignField': '_id',
                'as': 'artist'
            }
        }, {
            '$lookup': {
                'from': 'companies',
                'localField': 'id_company',
                'foreignField': '_id',
                'as': 'company'
            }
        }, {
            '$unwind': {
                'path': '$artist'
            }
        }, {
            '$unwind': {
                'path': '$company'
            }
        }, {
            '$project': {
                'id_company': 0,
                'id_artist': 0
            }
        }
    ])
```

### Despliegue de las canciones pertenecientes a un album con orden de lista
```mql
songsCollection.aggregate(
        [
            {
                '$match': {
                    'id_album': ObjectId(id_album)
                }
            }, {
                '$graphLookup': {
                    'from': 'songs',
                    'startWith': '$next_song',
                    'connectFromField': 'next_song',
                    'connectToField': '_id',
                    'as': 'in_queue',
                    'maxDepth': 5
                }
            }
        ]
    )
```

### Búsqueda de album por nomber usando expresiones regulares
```mql
albumsCollection.aggregate([
        {
            '$match': {
                'name': {
                    '$regex': '(?i)' + desired_name
                }
            }
        }, {
            '$limit': 20
        },{
          '$lookup': {
              'from': 'artists',
              'localField': 'id_artist',
              'foreignField': '_id',
              'as': 'artist'
          }
      }, {
          '$lookup': {
              'from': 'companies',
              'localField': 'id_company',
              'foreignField': '_id',
              'as': 'company'
          }
      }, {
          '$unwind': {
              'path': '$artist'
          }
      }, {
          '$unwind': {
              'path': '$company'
          }
      }, {
          '$project': {
              'id_company': 0,
              'id_artist': 0
          }
      },
      {
        '$sort': {
          'name': -1
        }
      }
    ]
)
```


## Consultas para artistas

### Lista de artistas

```mql
artistsCollection
    .aggregate([
      {
        $skip: (page_no - 1) * 30
      },
      {
        $limit: 30
      },
      {
        $sort: {
          name: -1
        }
      },
      {
        $lookup: {
          from: 'albums',
          localField: '_id',
          foreignField: 'id_artist',
          as: 'albums'
        }
      }
    ])
```

### Búsqueda de artistas por nombre usando expresiones regulares

```mql
artistsCollection
    .aggregate([
      {
        $match: {
          name: {
            $regex: '(?i)' + desired_name
          }
        }
      },
      {
        $limit: 20
      },
      {
        $sort: {
          name: -1
        }
      },
      {
        $lookup: {
          from: 'albums',
          localField: '_id',
          foreignField: 'id_artist',
          as: 'albums'
        }
      }
    ])
```

## Consultas para compañías (disqueras)

### Lista de compañías
```mql
companiesCollection.aggregate([
    {
      '$skip': 30 * (page_no - 1)
    }, {
      '$limit': 30
    }, {
      '$sort' : 1
    }
  ])
```

### Detalles de una compañía
```mql
companiesCollection.aggregate([
    {
      '$match': {
        '_id': ObjectId(id)
      }
    }, {
      '$project': {
        '_id': 1,
        'name': 1,
        'start_date': 1,
        'coordinates': 1
      }
    }
  ])
```

### Búsqueda de disqueras dado un punto (long, lat) y un radio de búsqueda (kms) usando geoNear
```mql
companiesCollection.aggregate([
    {
      '$geoNear': {
        'near': {
          'type': 'Point', 
          'coordinates': [
            long, lat
          ]
        }, 
        'distanceField': 'dist.calculated', 
        'maxDistance': kms, 
        'includeLocs': 'dist.location', 
        'spherical': true
      }
    }, {
      '$project': {
        '_id': 1, 
        'name': 1, 
        'start_date': 1, 
        'coordinates': 1, 
        'distance': '$dist.calculated'
      }
    }, {
      '$sort': {
        'distance': 1
      }
    }
  ])
```

## Consultas para canciones

### Listado de todas las canciones dado un numero de página
```mql
songsCollection.aggregate([
        {
            '$skip': 30 * (page_no - 1)
        }, {
            '$limit': 30
        }, {
            '$sort': {
                'name': 1
            }
        }, {
            '$lookup': {
                'from': 'artists',
                'localField': 'id_artist',
                'foreignField': '_id',
                'as': 'artist'
            }
        }, {
            '$lookup': {
                'from': 'albums',
                'localField': 'id_album',
                'foreignField': '_id',
                'as': 'album'
            }
        }, {
            '$unwind' : {
                'path' : '$album'
            }
        }, {
            '$unwind' : {
                'path' : '$artist'
            }
        }, {
            '$project' : {
                'id_artist' : 0,
                'id_album' : 0
            }
        }
    ])
```

### Despliegue de detalles de una canción
```mql
songsCollection.aggregate([
        {
            '$match': {
                '_id': parseInt(id_song)
            }
        }, {
            '$lookup': {
                'from': 'artists',
                'localField': 'id_artist',
                'foreignField': '_id',
                'as': 'artist'
            }
        }, {
            '$lookup': {
                'from': 'albums',
                'localField': 'id_album',
                'foreignField': '_id',
                'as': 'album'
            }
        }, {
            '$unwind' : {
                'path' : '$album'
            }
        }, {
            '$unwind' : {
                'path' : '$artist'
            }
        }
    ])
```

### Búsqueda de una canción dado un nombre
```mql
songsCollection.aggregate([
        {
            '$match': {
                'name': {
                    '$regex': '(?i)' + desired_name
                }
            }
        }, {
            '$limit': 20
        }, {
          '$lookup': {
              'from': 'artists',
              'localField': 'id_artist',
              'foreignField': '_id',
              'as': 'artist'
          }
      }, {
          '$lookup': {
              'from': 'albums',
              'localField': 'id_album',
              'foreignField': '_id',
              'as': 'album'
          }
      }, {
          '$unwind' : {
              'path' : '$album'
          }
      }, {
          '$unwind' : {
              'path' : '$artist'
          }
      }, {
          '$project' : {
              'id_artist' : 0,
              'id_album' : 0
          }
      }
    ])
```
### Canciones organizadas por género, por página
```mql
songsCollection.aggregate([
        {
            '$skip': 30 * (page_no - 1)

        }, {
            '$limit': 30
        }, {
            '$facet': {
                'CategorizeByGenre': [
                    {
                        '$unwind': '$genres'
                    }, {
                        '$sortByCount': '$genres'
                    }
                ],
            }
        }
    ])
```

## $lookup

- Cuando se despliega la lista completa de las canciones | /songs/:no_page/
- Cuando se despliega el detalle de una de las canciones | /song/:id/

## $unwind

- 

## $graphLookup

- Album Detail con las canciones que pertenecen a ese album en orden

## $geoNear

- Cuando puedes buscar disqueras cerca de ti

## $facet


