import React from 'react';
import { Card, CardHeader, CardFooter, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { Label, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
//own
import ModalForm from '../Modals/ModalForm';
import SongsForm from '../Forms/SongsForm';
import DeleteModal from '../Modals/DeleteModal';
// import ShowModal from '../Modals/ShowModal';
// import AlbumDetails from '../Details/AlbumDetails';

const SongsTable = (props) => {
	//console.log(props.items[0]);

	return (
		<Row>
			{props.items.map((item) => (
				<Col sm="4" key={item._id}>
					<Card style={{ marginTop: '10px', marginBottom: '10px' }}>
						<CardHeader tag="h3">{item.name}</CardHeader>

						<CardBody>
							<CardTitle>
								<b>Álbum: </b>
								{item.album.name}
							</CardTitle>
							<b>Autor: </b>
							{/* <Label size="medium">
								<Icon name="microphone" /> */}
							{item.artist.name}
							{/* </Label> */}
						</CardBody>
						<CardFooter>
							<Label color="grey" size="mini">
								<Icon name="play circle" />
								{(item.duration / 60).toFixed(0) + ':' + item.duration % 60}
							</Label>
							<Label color="grey" size="mini">
								<Icon name="heart" />
								{Math.floor(Math.random() * 750) + 100}
							</Label>
							<Label color="grey" size="mini">
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
							<div style={{ width: '110px' }}>
								<ModalForm
									isEditing
									updateState={props.updateState}
									AddEditForm={SongsForm}
									item={item}
								/>
								<DeleteModal title={item.name} id={item._id} updateState={props.updateState} />
							</div>
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
