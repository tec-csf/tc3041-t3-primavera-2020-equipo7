import React from 'react';
import { Jumbotron, Button } from 'reactstrap';

const Main = (props) => {
	return (
		<div>
			<Jumbotron>
				<h1 className="display-3">Kubermusik</h1>
				<p className="lead">
					Este sitio ...
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam sagittis orci eget nulla dictum porta. Duis congue eleifend auctor. Nulla nunc enim, cursus eget suscipit varius, auctor nec felis. Quisque bibendum purus semper justo consectetur, sit amet tincidunt lacus gravida. Proin in enim ligula. Integer id nisi a lorem faucibus vulputate. Fusce volutpat sit amet augue at ornare. Mauris eget imperdiet erat, nec mattis ante. Aenean interdum, elit nec congue faucibus, magna tellus mollis arcu, nec volutpat nibh nunc non diam. Suspendisse interdum et leo ut feugiat.
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
