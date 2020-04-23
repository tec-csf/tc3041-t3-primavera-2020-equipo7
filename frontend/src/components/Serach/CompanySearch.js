import React, { useState } from 'react';
import { Form, Button, Icon } from 'semantic-ui-react';
import { FormFeedback } from 'reactstrap';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
//import axios from '../../util/axios';

const CompanySearch = (props) => {
	const [ km, setKm ] = useState(3);
	const { register, handleSubmit, errors } = useForm();

	const onSubmitHandler = (data) => {
		//console.log({ lat: parseFloat(data.lat), long: parseFloat(data.long), kms: km });
		// axios
		// 	.post('/compsearch/', { kms: km, lat: parseFloat(data.lat), long: parseFloat(data.long) })
		// 	.then((res) => {
		// 		console.log(res);
		// 	})
		// 	.catch((err) => console.log(err));
		props.searcher('/compsearch/', { kms: km, lat: parseFloat(data.lat), long: parseFloat(data.long) });
	};

	return (
		<Form onSubmit={handleSubmit(onSubmitHandler)} autoComplete="off">
			<Form.Group widths="5">
				<Form.Field>
					<input
						className={errors.lat ? 'is-invalid form-control' : 'form-control'}
						placeholder="Latitud"
						type="text"
						name="lat"
						ref={register({
							required: true,
							pattern: /^-?[0-9]+\.[0-9]+/,
							validate: (n) => parseFloat(n) >= -90 && parseFloat(n) <= 90
						})}
					/>
					{errors.lat && <FormFeedback>Ingrese una coordenada válida [-90.00,90.00]</FormFeedback>}
				</Form.Field>
				<Form.Field>
					<input
						className={errors.long ? 'is-invalid form-control' : 'form-control'}
						type="text"
						name="long"
						placeholder="Longitud"
						ref={register({
							required: true,
							pattern: /^-?[0-9]+\.[0-9]+/,
							validate: (n) => parseFloat(n) >= -180 && parseFloat(n) <= 180
						})}
					/>
					{errors.long && <FormFeedback>Ingrese una coordenada válida [-180.00, 180.00]</FormFeedback>}
				</Form.Field>
				<Form.Field>
					<input
						min={1}
						max={500}
						type="range"
						className="custom-range"
						value={km}
						onChange={(e) => setKm(+e.target.value)}
					/>
					<p>Buscando {km} km's al rededor</p>
				</Form.Field>
				<Button icon labelPosition="left" primary>
					<Icon name="search" />
					Buscar
				</Button>
			</Form.Group>
		</Form>
	);
};

CompanySearch.propTypes = {
	searcher: PropTypes.func.isRequired
};

export default CompanySearch;
