import React, { useState /*useEffect*/ } from 'react';
import { Button, Modal, ModalHeader, ModalBody /*Spinner, Row, Col*/ } from 'reactstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Button as CardButton, Card } from 'semantic-ui-react';

const ModalForm = (props) => {
	//console.log(props.isCard);

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
		button = !props.isCard ? (
			<Button outline  onClick={toggle} style={{ float: 'left', marginRight: '10px' }}>
				<FontAwesomeIcon icon={faPen} />
			</Button>
		) : (
			<CardButton basic color="black" onClick={toggle}>
				Editar
			</CardButton>
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
			{props.isCard ? <Card.Content extra> {button} </Card.Content> : button}
			<Modal isOpen={modal} toggle={toggle} className={props.className}>
				<ModalHeader toggle={toggle} close={closeBtn}>
					{title}
				</ModalHeader>
				<ModalBody>
					<props.AddEditForm toggle={toggle} item={props.item} refresh={props.updateState} />
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
	// if is card
	isCard: PropTypes.bool,

	item: PropTypes.object,
	AddEditForm: PropTypes.elementType.isRequired,
	updateState: PropTypes.func.isRequired
};

export default ModalForm;
