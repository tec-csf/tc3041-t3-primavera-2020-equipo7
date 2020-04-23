import React from 'react';
import { Button, Form, FormGroup, Label, FormFeedback } from 'reactstrap';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
//own
import SearchBar from '../SearchBar/FastSearch';
import axios from '../../util/axios';

const AddEditSongsForm = ({ item, refresh, toggle }) => {
	const { register, handleSubmit, errors } = useForm();

	const onSubmitHandler = (data) => {
		//console.log({...data, genres: data.genres.split('\n')});
		axios
			.post(!item ? '/songs/' : '/songs/' + item._id + '/', {...data, genres: data.genres.split('\n')})
			.then(() => {
				toggle();
				refresh();
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
					ref={register({ required: true, pattern: /^[^-\s].*/ })}
					defaultValue={item ? item.name : null}
				/>
				{errors.name && <FormFeedback>Ingrese el título de la canción</FormFeedback>}
			</FormGroup>
			<FormGroup>
				<Label for="duration">Duración (s)</Label>
				<input
					className={errors.duration ? 'is-invalid form-control' : 'form-control'}
					type="text"
					name="duration"
					id="duration"
					ref={register({ required: true, pattern: /^[0-9]+/ })}
					defaultValue={item ? item.duration : null}
				/>
				{errors.duration && <FormFeedback>Ingrese la duración (sólo números)</FormFeedback>}
			</FormGroup>
			<FormGroup>
				<Label>Generos</Label>
				<textarea
					className={errors.genres ? 'is-invalid form-control' : 'form-control'}
					name="genres"
					placeholder="Ingrese los generos separados por salto de línea"
					ref={register({ required: true })}
					defaultValue={item ? item.genres.join('\n') : null}
				/>
				{errors.genres && <FormFeedback>Ingrese al menos un género</FormFeedback>}
			</FormGroup>
			<FormGroup>
				<Label>Artista</Label>
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
				<Label>Álbum</Label>
				<SearchBar
					type="Album"
					name="id_album"
					text={item ? item.album.name : null}
					id={item ? item.album._id : null}
					errors={errors}
					register={register}
				/>
			</FormGroup>
			<Button color="primary">Confirmar</Button>
		</Form>
	);
};

AddEditSongsForm.propTypes = {
	toggle: PropTypes.func.isRequired,
	item: PropTypes.object,
	refresh: PropTypes.func.isRequired
};

export default AddEditSongsForm;
