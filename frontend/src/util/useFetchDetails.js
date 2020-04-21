import { useEffect, useState, useRef, useCallback } from 'react';
import axios from './axios';

export const useFetchDetails = (path) => {
	//con useRef si el value cambia no causa un re-render
	const isCurrent = useRef(true);

	//data
	const [ data, setData ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(true);

	const loadData = useCallback(
		() => {
			console.log('Axios Details: ', path);
			setIsLoading(true);
			axios
				.get(path)
				.then((res) => {
					//console.log(res.data[0]);
					if (isCurrent.current) {
						setData(res.data);
						setIsLoading(false);
					}
				})
				.catch((err) => console.log(err));
		},
		[ path ]
	);

	useEffect(() => {
		return () => {
			//cuando se va lo cambia
			isCurrent.current = false; //se accede con .current
		};
	}, []);

	return { data, isLoading, loadData };
};
