import React from 'react';
import { Row, Col } from 'reactstrap';
//own
import ModalForm from '../components/Modals/ModalForm';
import DataTable from '../components/Tables/ArtistsTable';
import ArtistsForm from '../components/Forms/ArtistsForm';
import { useFetch } from '../util/useFetch';
import Loader from '../components/Loader';
import Pagination from '../components/UI/Pagination';
import IndexSearch from '../components/SearchBar/IndexSearch';
import NoRegs from '../components/UI/NoRegs';

const Albums = () => {

	const { loadData, isLoading, data, searchByName, isSearching, totalPages } = useFetch();

	return (
		<React.Fragment>
			<Row>
				<Col>
					<h1 style={{ margin: '20px 0' }}>Artistas</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<ModalForm buttonLabel="Agregar Artista" AddEditForm={ArtistsForm} updateState={loadData}/>
				</Col>
				<Col>
					<IndexSearch searcher={searchByName} type='Artist' reloader={loadData}/>
				</Col>
				<Col>
				{
					!isSearching &&
					<Pagination totalPages={totalPages}/>
				}
				</Col>
			</Row>
			<Row>
				{isLoading ? (
					<Loader />
				) : (
					<Col>
						{data.length === 0 ? (
							<NoRegs />
						) : (
							<DataTable items={data} updateState={loadData} />
						)}
					</Col>
				)}
			</Row>
		</React.Fragment>
	);
};

export default Albums;
