import { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from '../util/axios';

export const useFetch = () => {
	//con useRef si el value cambia no causa un re-render
	const isCurrent = useRef(true);

	//data
	const [ data, setData ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(true);

	//location for pags
	const location = useLocation();
	const currentPage = new URLSearchParams(location.search).get('pag');
	const currentUrl = location.pathname;
	const history = useHistory();

	const loadData = useCallback(
		() => {
			//setData([]);
			setIsLoading(true);
			axios
				.get(
					//currentUrl + (currentPage == null ? '1' : currentPage), '/'
					'/songs/1'
				)
				.then((res) => {
					console.log(res);
					if (isCurrent.current) {
						setData(res.data);
						setIsLoading(false);
					}
				})
				.catch((err) => {
					console.log(err);
				});
		},
		[ currentPage, currentUrl ]
	);

	useEffect(
		() => {
			history.replace(currentUrl);
		},
		[ history, currentUrl ]
	);

	useEffect(
		() => {
			loadData();
		},
		[ loadData ]
	);

	useEffect(() => {
		return () => {
			//cuando se va lo cambia
			isCurrent.current = false; //se accede con .current
		};
	}, []);

	return { data, isLoading, loadData };
};
