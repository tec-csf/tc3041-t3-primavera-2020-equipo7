import React from 'react';
import { Table, ButtonGroup } from 'reactstrap';
import PropTypes from 'prop-types';
//own
import ModalForm from '../Modals/ModalForm';
import AlbumForm from '../Forms/AlbumForm';
import DeleteModal from '../Modals/DeleteModal';
import ShowModal from '../Modals/ShowModal';
import AlbumDetails from '../Details/AlbumDetails';

const AlbumsTable = (props) => {
	return (
		<Table hover size="sm">
			<thead>
				<tr>
					<th>Título</th>
					<th>Fecha de lanzamiento</th>
					<th>Disquera</th>
					<th>Artista</th>
				</tr>
			</thead>
			<tbody>
				{props.items.map((item) => (
					<tr key={item._id}>
						<th scope="row">
							<ShowModal
								//field={}
								title={item.name}
								Details={AlbumDetails}
								path={'/album/' + item._id + '/'}
							>
								<p style={{ cursor: 'pointer', textDecoration: 'underline' }}>
									{item.name.length <= 27 ? item.name : item.name.slice(0, 26) + '...'}
								</p>
							</ShowModal>
						</th>
						<td>{item.launch_date.replace('T00:00:00.000Z', '')}</td>
						<td>
							{item.artist.name.length <= 16 ? item.artist.name : item.artist.name.slice(0, 16) + '...'}
						</td>
						<td>{item.company.name}</td>
						<td>
						<ButtonGroup>

								<ModalForm
									isEditing
									updateState={props.updateState}
									AddEditForm={AlbumForm}
									item={item}
									/>
								<DeleteModal title={item.name} id={item._id} updateState={props.updateState} />
									</ButtonGroup>
							
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

AlbumsTable.propTypes = {
	/** Info para rendear */
	items: PropTypes.array.isRequired,
	/** refetch data */
	updateState: PropTypes.func.isRequired
};

export default AlbumsTable;
