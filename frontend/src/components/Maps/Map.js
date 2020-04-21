import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
//css
import './styles.css';


// https://developers.google.com/maps/documentation/javascript/tutorial?hl=es

const Map = (props) => {

	const center = {
		lat: props.item.coordinates.coordinates[0],
		lng: props.item.coordinates.coordinates[1]
	}
	
	const mapRef = useRef();

	useEffect(
		() => {
			const map = new window.google.maps.Map(mapRef.current, {
				center: center,
				zoom: 3
			});
			//marker
			new window.google.maps.Marker({ position: center, map: map });
		},
		[ center ]
	);

	return <div className="map" ref={mapRef} />;
};

Map.propTypes = {
	item: PropTypes.object.isRequired,
}

export default Map;
