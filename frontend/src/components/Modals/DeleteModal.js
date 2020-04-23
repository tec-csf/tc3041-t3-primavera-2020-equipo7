import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Spinner, Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Button as CardButton } from 'semantic-ui-react';
//own
import axios from '../../util/axios';

const DeleteModal = (props) => {
	const [ modal, setModal ] = useState(false);
	const toggle = () => setModal(!modal);
	const closeBtn = (
		<button className="close" onClick={toggle}>
			&times;
		</button>
	);

	//control the spinner
	const [ isDeleting, setIsDeleting ] = useState(false);
	const [ errorDeleting, setErrorDeleting ] = useState(false);

	const location = useLocation();

	const deleteRecord = () => {
		//console.log('Borrando:', location.pathname, props.id);

		axios
			.delete(location.pathname + props.id + '/')
			.then(() => {
				setErrorDeleting(false);
				setIsDeleting(false);
				props.updateState();
				//toggle();
			})
			.catch((err) => {
				console.log(err);
				setErrorDeleting(true);
				setIsDeleting(false);
			});
	};

	return (
		<div>
			{props.isCard ? (
				<CardButton basic color="red" onClick={toggle}>
					Eliminar
				</CardButton>
			) : (
				<Button outline color="danger" onClick={toggle}>
					<FontAwesomeIcon icon={faTrashAlt} />
				</Button>
			)}
			<Modal isOpen={modal} toggle={toggle} centered>
				<ModalHeader toggle={toggle} close={closeBtn}>
					{'¿Desea eliminar ' + props.title + '?'}
				</ModalHeader>
				<Row>
					<Col />
					<Col>
						{isDeleting ? (
							<ModalBody>
								<Spinner type="grow" color="danger" style={{ width: '3rem', height: '3rem' }} />
							</ModalBody>
						) : (
							errorDeleting && (
								<ModalBody>
									<p>Algo salio mal...</p>
								</ModalBody>
							)
						)}
					</Col>
					<Col />
				</Row>
				<ModalFooter>
					{!errorDeleting ? (
						<React.Fragment>
							<Button color="danger" onClick={deleteRecord}>
								Si, eliminar
							</Button>
							<Button color="secondary" onClick={toggle}>
								Cancelar
							</Button>
						</React.Fragment>
					) : (
						<Button color="secondary" onClick={toggle}>
							Cerrar
						</Button>
					)}
				</ModalFooter>
			</Modal>
		</div>
	);
};

DeleteModal.propTypes = {
	title: PropTypes.string.isRequired,
	id: PropTypes.string.isRequired,
	updateState: PropTypes.func.isRequired,
	isCard: PropTypes.bool
};

export default DeleteModal;
