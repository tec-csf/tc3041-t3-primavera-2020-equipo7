import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
//own
import ModalForm from '../components/Modals/Modal';
import DataTable from '../components/Tables/AlbumsTable';
import AlbumForm from '../components/Forms/AlbumForm';
import { useFetch } from '../util/useFetch';
import Loader from '../components/Loader';

const Albums = () => {
	
	const { loadData, isLoading, data } = useFetch();

	// const updateState = (item) => {
	// 	const itemIndex = items.findIndex((data) => data.id === item.id);
	// 	const newArray = [ ...items.slice(0, itemIndex), item, ...items.slice(itemIndex + 1) ];
	// 	setItems(newArray);
	// };

	// const deleteItemFromState = (id) => {
	// 	const updatedItems = items.filter((item) => item.id !== id);
	// 	setItems(updatedItems);
	// };

	return (
		<React.Fragment>
			<Row>
				<Col>
					<h1 style={{ margin: '20px 0' }}>Álbumes</h1>
				</Col>
			</Row>
			<Row>
				{isLoading ? <Loader /> :
				<Col>
					<DataTable
						items={data}
						updateState={loadData}
						/*deleteItemFromState={deleteItemFromState}*/ />
				</Col>}
			</Row>
			<Row>
				<Col>
					<ModalForm buttonLabel="Agregar Álbum" AddEditForm={AlbumForm} />
				</Col>
			</Row>
		</React.Fragment>
	);
};

export default Albums;
