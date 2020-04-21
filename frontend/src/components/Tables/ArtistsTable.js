import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
//own
import ModalForm from '../Modals/ModalForm';
import ArtistsForm from '../Forms/ArtistsForm';
import DeleteModal from '../Modals/DeleteModal';

//import ShowModal from '../Modals/ShowModal';
//import AlbumDetails from '../Details/AlbumDetails';

const ArtistsTable = (props) => {
	console.log(props.items[0]);
	return (
		<Card.Group>
			{props.items.map((item) => (
				<Card key={item._id}>
					<Card.Content>
						<Card.Header>{item.name.length <= 27 ? item.name : item.name.slice(0, 26) + '...'}</Card.Header>
						<Card.Meta>
							<span className="date">Inicio en {item.start_date.replace('T00:00:00.000Z', '')}</span>
							<br />
							<span className="date">
								Fecha de nacimiento {item.birth_date.replace('T00:00:00.000Z', '')}
							</span>
						</Card.Meta>
						<Card.Description>
							<b>País de origen:</b> {item.birth_country}
						</Card.Description>
					</Card.Content>
					<Card.Content extra>
						<Icon name="play circle" />
						22 Canciones
					</Card.Content>
					<Card.Content extra>
						<div style={{ width: '110px' }}>
							<ModalForm
								isEditing
								updateState={props.updateState}
								AddEditForm={ArtistsForm}
								item={item}
							/>
							<DeleteModal title={item.name} id={item._id} updateState={props.updateState} />
						</div>
					</Card.Content>
				</Card>
			))}
		</Card.Group>
	);
};

ArtistsTable.propTypes = {
	/** Info para rendear */
	items: PropTypes.array.isRequired,
	/** refetch data */
	updateState: PropTypes.func.isRequired
};

export default ArtistsTable;
