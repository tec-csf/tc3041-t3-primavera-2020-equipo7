import React from 'react';
import { Button, Form, FormGroup, Label, FormFeedback } from 'reactstrap';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
//own
import axios from '../../util/axios';

const AddEditCompaniesForm = ({ item, toggle, refresh }) => {
	const { register, handleSubmit, errors } = useForm();

	const onSubmitHandler = (data) => {
		//console.log({...data, lat: parseFloat(data.lat), long: parseFloat(data.long)});
		axios
			.post(!item ? '/companies/' : '/companies/' + item._id + '/', {
				...data,
				lat: parseFloat(data.lat),
				long: parseFloat(data.long)
			})
			.then(
				(/*res*/) => {
					//console.log(res);
					toggle();
					refresh();
				}
			)
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
				{errors.name && <FormFeedback>Ingrese el título el nombre de la compañia</FormFeedback>}
			</FormGroup>
			<FormGroup>
				<Label for="launch_date">Fecha de inicio</Label>
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
				<Label for="lat">Latitud</Label>
				<input
					className={errors.lat ? 'is-invalid form-control' : 'form-control'}
					type="text"
					name="lat"
					id="lat"
					ref={register({
						required: true,
						pattern: /^-?[0-9]+\.[0-9]+$/,
						validate: (n) => parseFloat(n) >= -90 && parseFloat(n) <= 90
					})}
					defaultValue={item ? item.coordinates.coordinates[0] : null}
				/>
				{errors.lat && <FormFeedback>Ingrese una coordenada válida [-90.00,90.00]</FormFeedback>}
			</FormGroup>
			<FormGroup>
				<Label for="long">Longitud</Label>
				<input
					className={errors.long ? 'is-invalid form-control' : 'form-control'}
					type="text"
					name="long"
					id="long"
					ref={register({
						required: true,
						pattern: /^-?[0-9]+\.[0-9]+/,
						validate: (n) => parseFloat(n) >= -180 && parseFloat(n) <= 180
					})}
					defaultValue={item ? item.coordinates.coordinates[1] : null}
				/>
				{errors.long && <FormFeedback>Ingrese una coordenada válida [-180.00, 180.00]</FormFeedback>}
			</FormGroup>
			<Button color="primary">Confirmar</Button>
		</Form>
	);
};

AddEditCompaniesForm.propTypes = {
	toggle: PropTypes.func.isRequired,
	item: PropTypes.object,
	refresh: PropTypes.func.isRequired
};

export default AddEditCompaniesForm;
