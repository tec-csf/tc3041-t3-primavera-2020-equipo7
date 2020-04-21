import React from 'react';
import { Icon, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const IndexSearch = (props) => {
	const searchByName = (e) => {
		const value = e.target.value;
		if (value.length === 0) {
			props.reloader();
		} else {
			switch (props.type) {
				case 'Artist':
					props.searcher('/artist/' + value);
					break;
				case 'Album':
					props.searcher('/album/' + value);
					break;
				case 'Song':
					props.searcher('/song/' + value);
					break;
				case 'Company':
					break;
				default:
					console.log('Algo anda mal');
					break;
			}
		}
	};

	return (
		<Input icon={<Icon name="search" inverted circular link />} placeholder="Buscar..." onChange={searchByName} />
	);
};

IndexSearch.propTypes = {
	searcher: PropTypes.func.isRequired,
	type: PropTypes.oneOf([ 'Album', 'Song', 'Company', 'Artist' ]).isRequired,
	reloader: PropTypes.func.isRequired
};

export default IndexSearch;
