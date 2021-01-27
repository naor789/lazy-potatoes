import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function ModalSignUp() {
	const [phoneNumber, setPhoneNumber] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [email, setEmail] = useState('');
	const [modalSignUp, setModalSignUp] = useState(false);
	const history = useHistory();

	const openModalSignUp = () => setModalSignUp(true);

	const handleClose = () => setModalSignUp(false);

	const handleSubmit = async event => {
		event.preventDefault();
		const response = await axios.post(
			'http://localhost:5000/api/users/register',
			{
				email: email,
				password: password,
				confirmPassword: confirmPassword,
				firstName: firstName,
				lastName: lastName,
				phoneNumber: phoneNumber,
				points: 20,
			}
		);
		console.log(response);
		setModalSignUp(false);
		const logIn = await axios.post('http://localhost:5000/api/users/login', {
			email: email,
			password: password,
		});
		if (logIn.status === 200) {
			localStorage.setItem('token', response.data);
		}

		history.push('/');
		// const reload = window.location.reload();
	};

	return (
		<>
			<Button
				className='buttons-login-signup button btn btn-secondary my-2 my-sm-0 mr-4'
				type='button'
				onClick={openModalSignUp}>
				Sign Up{' '}
			</Button>

			<Modal show={modalSignUp} onHide={handleClose}>
				<Modal.Header>
					<Modal.Title>Sign Up</Modal.Title>
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
						<Form.Group id='confirmPassword'>
							<Form.Label>Confirm Password</Form.Label>
							<Form.Control
								type='password'
								value={confirmPassword}
								required
								onChange={event => setConfirmPassword(event.target.value)}
							/>
						</Form.Group>
						<Form.Group id='firsName'>
							<Form.Label>First Name</Form.Label>
							<Form.Control
								type='email'
								value={firstName}
								required
								onChange={event => setFirstName(event.target.value)}
							/>
						</Form.Group>
						<Form.Group id='lastName'>
							<Form.Label>Last Name</Form.Label>
							<Form.Control
								type='email'
								value={lastName}
								required
								onChange={event => setLastName(event.target.value)}
							/>
						</Form.Group>
						<Form.Group id='phoneNumber'>
							<Form.Label>Phone Number</Form.Label>
							<Form.Control
								type='email'
								value={phoneNumber}
								required
								onChange={event => setPhoneNumber(event.target.value)}
							/>
						</Form.Group>
						<Button
							onClick={handleSubmit}
							className='button w-100'
							type='submit'>
							Log In
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
		</>
	);
}
