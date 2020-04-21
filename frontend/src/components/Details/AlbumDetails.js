import React from 'react';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

const AlbumDetails = (props) => {

	console.log(props)

	return (
		<ListGroup>
			<ListGroupItem className="justify-content-between">
				Cancion 1 <Badge pill>14:10</Badge>
			</ListGroupItem>
			<ListGroupItem className="justify-content-between">
				Cancion 2<Badge pill>3:53</Badge>
			</ListGroupItem>
			<ListGroupItem className="justify-content-between">
				Cancion 3 <Badge pill>0:30</Badge>
			</ListGroupItem>
		</ListGroup>
	);
};

export default AlbumDetails;
