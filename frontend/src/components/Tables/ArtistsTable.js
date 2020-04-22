import React from 'react';
import { Card, Icon, Button, ButtonGroup } from 'semantic-ui-react';

import PropTypes from 'prop-types';
//own
import ModalForm from '../Modals/ModalForm';
import ArtistsForm from '../Forms/ArtistsForm';
import DeleteModal from '../Modals/DeleteModal';
import ShowModal from '../Modals/ShowModal';
import ArtistDetails from '../Details/ArtistDetails';

const ArtistsTable = (props) => {
	//console.log(props.items[0]);
	return (
		<Card.Group>
			{props.items.map((item) => (
				<Card key={item._id} centered>
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
						{item.albums.length === 0 ? (
							'Aún no hay álbumes disponibles'
						) : (
							<React.Fragment>
								<Icon name="play circle" /> {`${item.albums.length} Álbumes`}
							</React.Fragment>
						)}
					</Card.Content>
					<Card.Content extra>
						<ButtonGroup>
							<ShowModal title={item.name} Details={ArtistDetails} dontFetch item={item}>
								<Button basic color="blue">
									Mostrar
								</Button>
							</ShowModal>
							<ModalForm
								isCard
								isEditing
								updateState={props.updateState}
								AddEditForm={ArtistsForm}
								item={item}
							/>
							<DeleteModal isCard title={item.name} id={item._id} updateState={props.updateState} />
						</ButtonGroup>
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
