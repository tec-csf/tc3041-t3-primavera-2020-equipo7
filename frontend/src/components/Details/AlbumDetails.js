import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Label, Icon } from 'semantic-ui-react';

const AlbumDetails = (props) => {
	//console.log(props.item);

	return (
		<ListGroup>
			{props.item ? (
				props.item.in_queue.map((song) => (
					<ListGroupItem className="justify-content-between" key={song._id}>
						{song.name}{' '}
						<Label color="blue" size="mini">
							<Icon name="play circle" />
							{(song.duration / 60).toFixed(0) + ':' + song.duration % 60}
						</Label>
					</ListGroupItem>
				))
			) : (
				<p> Aún no hay canciones en este álbum </p>
			)}
		</ListGroup>
	);
};

export default AlbumDetails;
