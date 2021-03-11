import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export default function ModalLogIn() {
	const { setCurrentUser } = useContext(UserContext);

	const [modalLogIn, setModalLogIn] = useState(false);
	const [password, setPassword] = useState();
	const [email, setEmail] = useState();
	const history = useHistory();

	const openModalLogIn = () => setModalLogIn(true);

	const handleClose = () => setModalLogIn(false);

	const handleSubmit = async event => {
		event.preventDefault();
		const response = await axios.post('http://localhost:5000/api/users/login', {
			email: email,
			password: password,
		});

		const logIn = await axios.post('http://localhost:5000/api/users/login', {
			email: email,
			password: password,
		});
		if (logIn.status === 200) {
			localStorage.setItem('token', response.data);
		}
		console.log('login', logIn);
		setModalLogIn(false);
		history.push('/');

		setCurrentUser(logIn.data);
		localStorage.setItem('user', JSON.stringify(logIn.data));
		window.location.reload();
	};

	return (
		<>
			<Button
				className='buttons-login-signup button btn btn-secondary my-2 my-sm-0 mx-3'
				type='button'
				onClick={openModalLogIn}>
				{' '}
				Log In{' '}
			</Button>

			<Modal show={modalLogIn} onHide={handleClose}>
				<Modal.Header>
					<Modal.Title>Log In</Modal.Title>
					<Button variant='light' onClick={handleClose} type='button'>
						x
					</Button>
				</Modal.Header>
				<Modal.Body>
					<Form onSubmit={handleSubmit}>
						<Form.Group id='email'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								type='email'
								value={email}
								required
								onChange={event => setEmail(event.target.value)}
							/>
						</Form.Group>
						<Form.Group id='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								type='password'
								value={password}
								required
								onChange={event => setPassword(event.target.value)}
							/>
						</Form.Group>
						<Button
							onClick={handleSubmit}
							className='button w-100'
							type='submit'>
							Log In{' '}
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
}
