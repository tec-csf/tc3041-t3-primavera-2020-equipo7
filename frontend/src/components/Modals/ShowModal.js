import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Spinner } from 'reactstrap';
import PropTypes from 'prop-types';
//own
import { useFetchDetails } from '../../util/useFetchDetails';

const ShowModal = (props) => {

	//controles de modal
	const [ modal, setModal ] = useState(false);
	const toggle = () => setModal(!modal);

	const { isLoading, data, loadData } = useFetchDetails(props.path);

	useEffect(
		() => {
			if (modal) {
				loadData();
			}
		},
		[ modal ]
	);


	return (
		<div>
			<p onClick={toggle} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
				{props.field}
			</p>
			<Modal
				isOpen={modal}
				modalTransition={{ timeout: 700 }}
				backdropTransition={{ timeout: 1300 }}
				toggle={toggle}
			>
				<ModalHeader toggle={toggle}>{props.title}</ModalHeader>
				<ModalBody>
										{isLoading ? (
						<Row>
							<Col />
							<Col>
								<Spinner type="grow" color="success" style={{ width: '3rem', height: '3rem' }} />
								<Spinner type="grow" color="success" style={{ width: '3rem', height: '3rem' }} />
								<Spinner type="grow" color="success" style={{ width: '3rem', height: '3rem' }} />
							</Col>
							<Col />
						</Row>
					) : (
						<props.Details item={data[0]} />
					)}
				</ModalBody>
				<ModalFooter>
					<Button color="info" onClick={toggle}>
						Ok
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

ShowModal.propTypes = {
	field: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
	Details: PropTypes.elementType.isRequired,
	path: PropTypes.string.isRequired
};

export default ShowModal;
