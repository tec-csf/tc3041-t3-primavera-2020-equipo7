import React from 'react';
import { Row, Col } from 'reactstrap';
//own
import ModalForm from '../components/Modals/ModalForm';
import DataTable from '../components/Tables/CompaniesTable';
import CompaniesForm from '../components/Forms/CompaniesForm';
import { useFetch } from '../util/useFetch';
import Loader from '../components/Loader';
import Pagination from '../components/UI/Pagination';
import IndexSearch from '../components/SearchBar/IndexSearch';

const CompaniesPage = () => {

	const { loadData, isLoading, data, searchByName, isSearching } = useFetch();

	return (
		<React.Fragment>
			<Row>
				<Col>
					<h1 style={{ margin: '20px 0' }}>Disqueras</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<ModalForm buttonLabel="Agregar Disquera" AddEditForm={CompaniesForm} updateState={loadData}/>
				</Col>
				<Col>
					<IndexSearch searcher={searchByName} type='Company' reloader={loadData}/>
				</Col>
				<Col>
				{
					!isSearching &&
					<Pagination totalPages={Math.ceil(100060/30)}/>
				}
				</Col>
			</Row>
			
				{isLoading ? (
					<Loader />
				) : (
					<div style={{marginTop:'50px'}}>
						<DataTable
							items={data}
							updateState={loadData}
						/>
					</div>
				)}
		</React.Fragment>
	);
};

export default CompaniesPage;
