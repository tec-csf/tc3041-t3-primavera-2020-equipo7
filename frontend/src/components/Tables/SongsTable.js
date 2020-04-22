import React from 'react';
import { Card, CardHeader, CardFooter, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { Label,Icon, ButtonGroup } from 'semantic-ui-react';
import PropTypes from 'prop-types';
//own
import ModalForm from '../Modals/ModalForm';
import SongsForm from '../Forms/SongsForm';
import DeleteModal from '../Modals/DeleteModal';

const SongsTable = (props) => {
	//console.log(props.items[0]);

	return (
		<Row>
			{props.items.map((item) => (
				<Col sm="4" key={item._id}>
					<Card style={{ marginTop: '10px', marginBottom: '10px' }}>
						<CardHeader tag="h3">
							<Icon size='small' name='music'/>
							{item.name}</CardHeader>

						<CardBody>
							<CardTitle>
								<b>Álbum: </b>
								{item.album.name}
							</CardTitle>
							<b>Autor: </b>
							{item.artist.name}
						</CardBody>
						<CardFooter>
							<Label color="blue" size="mini">
								<Icon name="play circle" />
								{(item.duration / 60).toFixed(0) + ':' + item.duration % 60}
							</Label>
							<Label color="red" size="mini">
								<Icon name="heart" />
								{Math.floor(Math.random() * 750) + 100}
							</Label>
							<Label color="teal" size="mini">
								<Icon name="chart bar" />
								{Math.floor(Math.random() * 10000) + 1000}
							</Label>
						</CardFooter>
						<CardFooter className="text-muted">
							{item.genres.map((gender, i) => (
								<Label key={i} tag size="mini">
									{gender}
								</Label>
							))}
						</CardFooter>
						<CardFooter>
							<ButtonGroup>

								<ModalForm
								isCard
									isEditing
									updateState={props.updateState}
									AddEditForm={SongsForm}
									item={item}
									/>
								<DeleteModal isCard title={item.name} id={item._id} updateState={props.updateState} />
							
									</ButtonGroup>
						</CardFooter>
					</Card>
				</Col>
			))}
		</Row>
	);
};

SongsTable.propTypes = {
	/** Info para rendear */
	items: PropTypes.array.isRequired,
	/** refetch data */
	updateState: PropTypes.func.isRequired
};

export default SongsTable;
