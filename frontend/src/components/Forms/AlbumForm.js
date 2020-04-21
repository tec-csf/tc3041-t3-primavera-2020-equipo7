import React from 'react';
import { Button, Form, FormGroup, Label, FormFeedback } from 'reactstrap';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
//own
import SearchBar from '../SearchBar/FastSearch';
import axios from '../../util/axios';

const AddEditAlbumForm = ({ item, toggle }) => {
	const { register, handleSubmit, errors } = useForm();

	const onSubmitHandler = (data) => {
		//console.log(data);
		axios
			.post(item ? '/albums/' : '/albums/' + item._id + '/', data)
			.then((res) => {
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
				<Label for="name">Título</Label>
				<input
					className={errors.name ? 'is-invalid form-control' : 'form-control'}
					type="text"
					name="name"
					id="name"
					ref={register({ required: true })}
					defaultValue={item ? item.name : null}
				/>
				{errors.name && <FormFeedback>Ingrese el título del álbum</FormFeedback>}
			</FormGroup>
			<FormGroup>
				<Label for="launch_date">Fecha de lanzamiento</Label>
				<input
					className={errors.launch_date ? 'is-invalid form-control' : 'form-control'}
					type="date"
					name="launch_date"
					id="launch_date"
					ref={register({ required: true })}
					defaultValue={item ? new Date(item.launch_date).toISOString().substr(0, 10) : null}
				/>
				{errors.launch_date && <FormFeedback>Ingrese la fecha de lanzamiento</FormFeedback>}
			</FormGroup>
			<FormGroup>
				<Label for="email">Artista</Label>
				<SearchBar
					type="Artist"
					name="id_artist"
					text={item ? item.artist.name : null}
					id={item ? item.artist._id : null}
					errors={errors}
					register={register}
				/>
			</FormGroup>
			<FormGroup>
				<Label for="phone">Disquera</Label>
				<SearchBar
					type="Company"
					name="id_company"
					text={item ? item.company.name : null}
					id={item ? item.company._id : null}
					errors={errors}
					register={register}
				/>
			</FormGroup>
			<Button color="primary">Confirmar</Button>
		</Form>
	);
};

AddEditAlbumForm.propTypes = {
	toggle: PropTypes.func,
	item: PropTypes.object
};

export default AddEditAlbumForm;
