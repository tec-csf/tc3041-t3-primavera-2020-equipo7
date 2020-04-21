import React from 'react';
import { Button, Form, FormGroup, Label, FormFeedback } from 'reactstrap';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
//own
import axios from '../../util/axios';

const AddEditArtistsForm = ({ item, toggle }) => {
	const { register, handleSubmit, errors } = useForm();

	const onSubmitHandler = (data) => {
		console.log(data);
		axios
			.post(!item ? '/artists/' : '/artists/' + item._id + '/', data)
			.then((/*res*/) => {
				//console.log(res);
				toggle();
			})
			.catch((err) => console.log(err));
	};

	//console.log(item);
	//console.log(errors);

	return (
		<Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
			<FormGroup>
				<Label for="name">Nombre</Label>
				<input
					className={errors.name ? 'is-invalid form-control' : 'form-control'}
					type="text"
					name="name"
					id="name"
					ref={register({ required: true, pattern: /^[^-\s].*/ })}
					defaultValue={item ? item.name : null}
				/>
				{errors.name && <FormFeedback>Ingrese el nombre del artista</FormFeedback>}
			</FormGroup>
			<FormGroup>
				<Label for="start_date">Inicio como artista</Label>
				<input
					className={errors.start_date ? 'is-invalid form-control' : 'form-control'}
					type="date"
					name="start_date"
					id="start_date"
					ref={register({ required: true })}
					defaultValue={item ? new Date(item.start_date).toISOString().substr(0, 10) : null}
				/>
				{errors.start_date && <FormFeedback>Ingrese la fecha de inicio</FormFeedback>}
			</FormGroup>
			<FormGroup>
				<Label for="birth_country">País de origen</Label>
				<input
					className={errors.birth_country ? 'is-invalid form-control' : 'form-control'}
					type="text"
					name="birth_country"
					id="birth_country"
					ref={register({ required: true, pattern: /^[^-\s].*/ })}
					defaultValue={item ? item.name : null}
				/>
				{errors.birth_country && <FormFeedback>Ingrese el país de origen</FormFeedback>}
			</FormGroup>
			<FormGroup>
				<Label for="birth_date">Inicio como artista</Label>
				<input
					className={errors.birth_date ? 'is-invalid form-control' : 'form-control'}
					type="date"
					name="birth_date"
					id="birth_date"
					ref={register({ required: true })}
					defaultValue={item ? new Date(item.birth_date).toISOString().substr(0, 10) : null}
				/>
				{errors.birth_date && <FormFeedback>Ingrese la fecha de nacimiento</FormFeedback>}
			</FormGroup>
			<Button color="primary">Confirmar</Button>
		</Form>
	);
};

AddEditArtistsForm.propTypes = {
	toggle: PropTypes.func,
	item: PropTypes.object
};

export default AddEditArtistsForm;
