import React from 'react';
import { Row, Col } from 'reactstrap';
//own
import ModalForm from '../components/Modals/ModalForm';
import DataTable from '../components/Tables/SongsTable';
import SongsForm from '../components/Forms/SongsForm';
import { useFetch } from '../util/useFetch';
import Loader from '../components/Loader';
import Pagination from '../components/UI/Pagination';
import IndexSearch from '../components/SearchBar/IndexSearch';
import NoRegs from '../components/UI/NoRegs';

const SongsPage = () => {
	const { loadData, isLoading, data, searchByName, isSearching, totalPages } = useFetch();
	//console.log(data)

	return (
		<React.Fragment>
			<Row>
				<Col>
					<h1 style={{ margin: '20px 0' }}>Canciones</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<ModalForm buttonLabel="Agregar Canción" AddEditForm={SongsForm} updateState={loadData} />
				</Col>
				<Col>
					<IndexSearch searcher={searchByName} type="Song" reloader={loadData} />
				</Col>
				<Col>{!isSearching && <Pagination totalPages={totalPages} />}</Col>
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

export default SongsPage;
