import React, { useEffect, useState, createRef } from 'react';
import './App.css';
import { Nav, Navbar, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import Home from './components/Home';
import ModalLogIn from './components/ModalLogIn';
import ModalSignUp from './components/ModalSignUp';
import AddTrip from './components/Add-Trip/add-trip';
import AllTrips from './components/AllTrips/AllTrips';
import Footer from './components/Footer';
import SignOut from './components/SignOut';

//export const baseURL = 'http://localhost:5000';
export const baseURL = 'https://lazypotatoes.herokuapp.com';

function App() {
	const [currentUser, setCurrentUser] = useState('');
	const wrapper = createRef();

	useEffect(() => {
		const loggedInUser = localStorage.getItem('user');
		if (loggedInUser) {
			const foundUser = JSON.parse(loggedInUser);
			setCurrentUser(foundUser);
		}

		const node = wrapper.current;
	}, []);

	const value = { currentUser, setCurrentUser };

	return (
		<UserContext.Provider value={value}>
			<Router>
				<div className=' container-fluid w-100 '>
					<div className='row p-5'>
						<Navbar
							bg='dark'
							variant='dark'
							className='navbar-expand-lg navbar navbar-dark bg-primary shadow-lg'
							fixed='top'>
							<Nav className='collapse navbar-collapse d-flex justify-content-between'>
								<Link className='nav' to='/'>
									Home
								</Link>

								<Link className='nav' to='/alltrips'>
									All Trips
								</Link>
								<form className='form-inline my-2 my-lg-0 float-end'>
									<ModalLogIn />
									<ModalSignUp />
									<SignOut />
								</form>
							</Nav>
						</Navbar>
					</div>
					<Container m-4>
						<Switch>
							<Route exact path='/'>
								<Home />
							</Route>
							{currentUser && (
								<Route path='/add-trip'>
									<AddTrip />
								</Route>
							)}
							<Route path='/alltrips'>
								<AllTrips />
							</Route>
						</Switch>
					</Container>
				</div>
				<Footer />
			</Router>
		</UserContext.Provider>
	);
}

export default App;
