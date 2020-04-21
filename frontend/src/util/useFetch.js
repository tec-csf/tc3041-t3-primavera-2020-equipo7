import { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation /*useHistory*/ } from 'react-router-dom';
import axios from '../util/axios';

export const useFetch = (loadOnMount=true) => {
	//con useRef si el value cambia no causa un re-render
	const isCurrent = useRef(true);

	//data
	const [ data, setData ] = useState([]);
	const [ isLoading, setIsLoading ] = useState(loadOnMount);
	const [ isSearching, setIsSearching ] = useState(false);

	//location for pags
	const location = useLocation();
	const currentPage = new URLSearchParams(location.search).get('pag');
	const currentUrl = location.pathname;
	//const history = useHistory();

	const loadData = useCallback(
		() => {
			//setData([]);
			console.log('Axios:', currentUrl + (currentPage == null ? '1' : currentPage) + '/');
			setIsLoading(true);
			setIsSearching(false);
			axios
				.get(currentUrl + (currentPage == null ? '1' : currentPage) + '/')
				.then((res) => {
					//console.log(res.data);
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

	const searchByName = useCallback((pathname) => {
		console.log('posting: ', pathname);
		setIsSearching(true);
		setIsLoading(true);
		axios
			.post(pathname)
			.then((res) => {
				//console.log(res.data);
				if (isCurrent.current) {
					setData(res.data);
					setIsLoading(false);
				}
			})
			.catch((err) => console.log('searchByName:', err));
	}, []);

	// useEffect(
	// 	() => {
	// 		history.replace(currentUrl);
	// 	},
	// 	[ history, currentUrl ]
	// );

	// initial Load
	useEffect(
		() => {
			if(loadOnMount){
				loadData();
			}
		},
		[ loadData, loadOnMount ]
	);

	// to avoid set state when it is gone
	useEffect(() => {
		return () => {
			//cuando se va lo cambia
			isCurrent.current = false; //se accede con .current
		};
	}, []);

	return { data, isLoading, loadData, searchByName, isSearching };
};
