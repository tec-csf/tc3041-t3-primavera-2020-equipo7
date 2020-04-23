import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const Main = (props) => {
	return (
		<div>
			<Jumbotron>
				<h1 className="display-3">Kubermusik</h1>
				<p className="lead">
					<text>
					Kubermusik es una aplicación para manejar la música que más te gusta. A continuación se menciona la estructura de nuestra página. Existen canciones, albumes, artistas y compañias. <br/>  <br/>

                    En la página de canciones se puede encontrar información de nombre, duración, géneros a los que pertenece, artista y album. {"\n"} <br/>

                    En la página de albums el nombre, fecha de lanzamiento, compañía y artista. Además del orden en que van a sonar las canciones del mismo cuando se presiona para ver detalles.  <br/>
                    
                    En la página de artistas el nombre, inicio de carrera artista, fecha de nacimiento y lugar de nacimiento.  <br/>
                
                    En la página de compañías se puede ver el nombre, fecha de inicio, y sus coordenadas. Además se muestra un mapa con sus ubicaciones.  <br/>  <br/>
                   
                    Hay algunas funciones interesantes, se mencionará lo que hacen y dónde pueden ser localizadas: <br/>
                 
                    -Unwind lo que hace es sacar los elementos de un arreglo. Esto se utiliza en varios lugares, por ejemplo: para desplegar la lista de albumes existentes, ya que se debe hacer lookups para mostrar al artista y a la compañía.  <br/>
                    -Lookup sirve para hacer joins, de igual manera se encuentra en varias consultas. Como en el ejemplo anterior.  <br/>
                    -GraphLookup lo que hace es hacer una búsqueda recursiva, la manera en que lo implementamos es haciendo un orden en que las canciones de un album se reproducen. Por lo que hay una cola entre ellas.  <br/>
                    -GeoNear sirve para realizar geo consultas. Nosotros lo implementamos para saber qué compañías estaban a 30km a la redonda de un punto.  <br/>
                    -Facet sirve para hacer filtrar en varias subcategorías. Aplicamos esto en una consulta de canciones: filtra por género y cuenta con cuántas cuenta cada uno.  <br/>
					</text>
				</p>
				<hr className="my-2" />
				<p>Tarea 3 | Bases de Datos Avanzadas | ITESM CSF 2020 |</p>
				<p className="lead">
					<a href="https://github.com/tec-csf/tc3041-t3-primavera-2020-equipo7">
						<Button color="primary">Github</Button>
					</a>
				</p>
			</Jumbotron>
		</div>
	);
};

export default Main;
