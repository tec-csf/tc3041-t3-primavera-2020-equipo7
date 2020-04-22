import React from 'react';
import { List, Icon } from 'semantic-ui-react';

const ArtistDetails = (props) => {
	//console.log(props);

	if (props.item.albums.length === 0) {
		return <p> No hay álbums para mostrar </p>;
	}

	return (
		<List relaxed="very">
			{props.item.albums.map((album) => (
				<List.Item key={album._id}>
					<Icon name="play circle outline" />
					<List.Content>
						<List.Header>{album.name}</List.Header>
						<List.Description>{album.launch_date.replace('T00:00:00.000Z', '')}</List.Description>
					</List.Content>
				</List.Item>
			))}
		</List>
	);
};

export default ArtistDetails;
