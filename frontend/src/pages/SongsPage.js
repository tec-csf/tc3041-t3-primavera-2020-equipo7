import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import ModalForm from '../components/Modals/Modal';
import DataTable from '../components/Tables/DataTable';

const Songs = () => {
	const [ items, setItems ] = useState([]);

	const getItems = () => {
		fetch('http://localhost:3000/crud')
			.then((response) => response.json())
			.then((items) => setItems(items))
			.catch((err) => console.log(err));
	};

	const updateState = (item) => {
		const itemIndex = items.findIndex((data) => data.id === item.id);
		const newArray = [ ...items.slice(0, itemIndex), item, ...items.slice(itemIndex + 1) ];
		setItems(newArray);
	};

	const deleteItemFromState = (id) => {
		const updatedItems = items.filter((item) => item.id !== id);
		setItems(updatedItems);
	};

	useEffect(() => {
		getItems();
	}, []);

	return (
		<React.Fragment>
			<Row>
				<Col>
					<h1 style={{ margin: '20px 0' }}>Canciones</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<DataTable items={items} updateState={updateState} deleteItemFromState={deleteItemFromState} />
				</Col>
			</Row>
			<Row>
				<Col>
					<ModalForm buttonLabel="Add Item"  />
				</Col>
			</Row>
		</React.Fragment>
	);
};

export default Songs;
