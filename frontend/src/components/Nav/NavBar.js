import React from 'react';
import { Nav, NavItem, Navbar } from 'reactstrap';
import { NavLink } from 'react-router-dom';
//own

const TopNavBar = (props) => {
	return (
		<div>
			<Navbar color="light" light expand="md">
				<NavLink to="/" className='navbar-brand'>
					Kubermusik
				</NavLink>
				<Nav className="mr-auto" navbar>
					<NavItem>
						<NavLink  to="/songs/" className='nav-link'>
							Canciones
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink  to="/albums/" className='nav-link'>
							Álbumes
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink  to="/artists/" className='nav-link'>
							Artistas
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink  to="/disqueras/" className='nav-link'>
							Disqueras
						</NavLink>
					</NavItem>
				</Nav>
			</Navbar>
		</div>
	);
};

export default TopNavBar;
