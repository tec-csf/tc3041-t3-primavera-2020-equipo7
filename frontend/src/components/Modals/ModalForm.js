import React, { useState, /*useEffect*/ } from 'react';
import { Button, Modal, ModalHeader, ModalBody, /*Spinner, Row, Col*/ } from 'reactstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const ModalForm = (props) => {

	//console.log(props);

	//modal controls
	const [ modal, setModal ] = useState(false);
	const toggle = () => {
		setModal(!modal);
	};
	const closeBtn = (
		<button className="close" onClick={toggle}>
			&times;
		</button>
	);

	let button = '';
	let title = '';

	if (props.isEditing) {
		button = (
			<Button color="warning" onClick={toggle} style={{ float: 'left', marginRight: '10px' }}>
				<FontAwesomeIcon icon={faPen} />
			</Button>
		);
		title = 'Editar';
	} else {
		button = (
			<Button color="success" onClick={toggle} style={{ float: 'left', marginRight: '10px' }}>
				{props.buttonLabel}
			</Button>
		);
		title = 'Agregar';
	}

	return (
		<div>
			{button}
			<Modal isOpen={modal} toggle={toggle} className={props.className}>
				<ModalHeader toggle={toggle} close={closeBtn}>
					{title}
				</ModalHeader>
				<ModalBody>
					<props.AddEditForm toggle={toggle} item={props.item} />
				</ModalBody>
			</Modal>
		</div>
	);
};

ModalForm.propTypes = {
	// only for create
	buttonLabel: PropTypes.string,
	// know if editing
	isEditing: PropTypes.bool,
	// if path
	//path: PropTypes.string,

	item: PropTypes.object,
	AddEditForm: PropTypes.elementType.isRequired,
	updateState: PropTypes.func.isRequired
};

export default ModalForm;
