import React from 'react';
import { Table } from 'reactstrap';
import { Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
//own
import ModalForm from '../Modals/ModalForm';
import CompaniesForm from '../Forms/CompaniesForm';
import DeleteModal from '../Modals/DeleteModal';
import ShowModal from '../Modals/ShowModal';
import Map from '../Maps/Map';

const CompaniesTable = (props) => {
	//console.log(props.items[0]);
	return (
		<Table hover size="sm">
			<thead>
				<tr>
					<th>Nombre</th>
					<th>Fecha de inicio</th>
					<th>Ubicación</th>
					<th>#####</th>
				</tr>
			</thead>
			<tbody>
				{props.items.map((item) => (
					<tr key={item._id}>
						<th scope="row">{item.name}</th>
						<td>{item.start_date.replace('T00:00:00.000Z', '')}</td>
						<td>
							<ShowModal title={item.name} Details={Map} dontFetch item={item}>
								<Button icon labelPosition="right">
									Ver mapa
									<Icon name="map marker alternate" />
								</Button>
							</ShowModal>
						</td>
						<td>
							<div style={{ width: '110px' }}>
								<ModalForm
									isEditing
									updateState={props.updateState}
									AddEditForm={CompaniesForm}
									item={item}
								/>
								<DeleteModal title={item.name} id={item._id} updateState={props.updateState} />
							</div>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
};

CompaniesTable.propTypes = {
	/** Info para rendear */
	items: PropTypes.array.isRequired,
	/** refetch data */
	updateState: PropTypes.func.isRequired
};

export default CompaniesTable;
