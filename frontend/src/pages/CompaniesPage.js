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
import CompanySearch from '../components/Serach/CompanySearch';
import NoRegs from '../components/UI/NoRegs';

const CompaniesPage = () => {
	const { loadData, isLoading, data, searchByName, isSearching, totalPages } = useFetch();

	return (
		<React.Fragment>
			<Row>
				<Col>
					<h1 style={{ margin: '20px 0' }}>Disqueras</h1>
				</Col>
			</Row>
			<Row>
				<Col>
					<ModalForm buttonLabel="Agregar Disquera" AddEditForm={CompaniesForm} updateState={loadData} />
				</Col>
				<Col>
					<IndexSearch searcher={searchByName} type="Company" reloader={loadData} />
				</Col>
				<Col>{!isSearching && <Pagination totalPages={totalPages} />}</Col>
			</Row>

			<div style={{ marginTop: '50px' }} />
			<Col>
				<CompanySearch searcher={searchByName} />
			</Col>

			{isLoading ? (
				<Loader />
			) : (
				<div style={{ marginTop: '50px' }}>
					{data.length === 0 ? <NoRegs /> : <DataTable items={data} updateState={loadData} />}
				</div>
			)}
		</React.Fragment>
	);
};

export default CompaniesPage;
