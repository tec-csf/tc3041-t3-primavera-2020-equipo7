import React from 'react';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//own
import Navbar from './components/Nav/NavBar';
import MainPage from './pages/MainPage';
import SongsPage from './pages/SongsPage';
import ArtistsPage from './pages/ArtistsPage';
import AlbumsPage from './pages/AlbumsPage';
import CompaniesPage from './pages/CompaniesPage';

const App = () => {
	return (
		<Router>
			<Container>
				<Navbar />
				<Switch>
					<Route path="/" exact component={MainPage} />
					<Route path="/canciones/" exact component={SongsPage} />
					<Route path="/albums/" exact component={AlbumsPage} />
					<Route path="/artistas/" exact component={ArtistsPage} />
					<Route path="/disqueras/" exact component={CompaniesPage} />
				</Switch>
			</Container>
		</Router>
	);
};

export default App;
