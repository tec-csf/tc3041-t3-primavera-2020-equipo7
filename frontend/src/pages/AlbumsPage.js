import React from 'react';
import { Row, Col } from 'reactstrap';
//own
import ModalForm from '../components/Modals/ModalForm';
import DataTable from '../components/Tables/AlbumsTable';
import AlbumForm from '../components/Forms/AlbumForm';
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
					<h1 style={{ margin: '20px 0' }}>Álbumes</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<ModalForm buttonLabel="Agregar Álbum" AddEditForm={AlbumForm} updateState={loadData} />
				</Col>
				<Col>
					<IndexSearch searcher={searchByName} type="Album" reloader={loadData} />
				</Col>
				<Col>{!isSearching && <Pagination totalPages={totalPages} />}</Col>
			</Row>
			<Row>
				{isLoading ? (
					<Loader />
				) : (
					<Col>
						<Col>{data.length === 0 ? <NoRegs /> : <DataTable items={data} updateState={loadData} />}</Col>
					</Col>
				)}
			</Row>
		</React.Fragment>
	);
};

export default Albums;
