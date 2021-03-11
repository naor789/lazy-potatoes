import React, { useState, useContext } from 'react';
import { Button, Form, Row, Col, Modal, Alert } from 'react-bootstrap';
import './tripCardModal.css';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import { baseURL } from '../../App';

export default function TripCardModal(props) {
	const history = useHistory();
	const { currentUser } = useContext(UserContext);
	const { area, date, time, store, quantity, name, _id } = props.trip;

	const [reqItem1, setReqItem1] = useState('');
	const [reqItem2, setReqItem2] = useState('');
	const [reqItem3, setReqItem3] = useState('');
	const [reqDropOff, setReqDropOff] = useState('');
	const [error, setError] = useState(false);

	function handleSubmit() {
		if (!reqItem1 || !reqDropOff) {
			setError(true);
			return;
		}
		const userInfo = {
			firstName: currentUser.firstName,
			lastName: currentUser.lastName,
			email: currentUser.email,
			requesterId: currentUser._id,
			phone: currentUser.phoneNumber,
		};
		const requestObject = {
			tripId: _id,
			requestId: uuidv4(),
			requesterUser: userInfo,
			reqItem1,
			reqItem2,
			reqItem3,
			reqDropOff,
			accepted: null,
		};
		props.onHide();
		sendRequest(requestObject);
		history.push('/alltrips');
	}

	const sendRequest = async requestObject => {
		await axios.put(`${baseURL}/api/addRequest`, requestObject);
	};

	return (
		<Modal
			{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered>
			<Alert
				show={error}
				variant='danger'
				onClose={() => setError(false)}
				dismissible>
				<Alert.Heading>Oh no! You got an error 🙀</Alert.Heading>
				<p>
					You must fill out at least one requested item and your information in
					order to send a request...
				</p>
			</Alert>
			<Modal.Header>
				<Button variant='light' type='button'>
					x
				</Button>

				<Modal.Title id='request-title'>
					{name}'s trip in <b>{area}</b>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Row>
					<Col>
						Store: <b>{store}</b>
					</Col>
					<Col>
						Time:
						<b>
							{time}, {date}
						</b>
					</Col>
					<Col>
						<b> {name} </b>can carry<b> {quantity} </b>items
					</Col>
				</Row>
				{/* {requests.length > 0 && (
					<Row>
						<ListGroup variant='flush'>
							{requests.map(request => (
								<ListGroup.Item key={request.requestId}>
									<h3>{request.requesterUser.firstName}'s request</h3>
									<Row>
										<Col>
											Items requested: {request.reqItem1}, {request.reqItem2},
											{request.reqItem3}
										</Col>
										<Col>Drop-off: {request.reqDropOff}</Col>
										<Col>
											{request.accepted && <p> Request has been accepted</p>}
											{!request.accepted && <Button>Help this potato</Button>}
										</Col>
									</Row>
								</ListGroup.Item>
							))}
						</ListGroup>
					</Row>
				)} */}
				<Form>
					<Form.Group id='request'>
						<Form.Label>What do you need?</Form.Label>
						<Row>
							<Col>
								<Form.Control
									type='string'
									required
									name='reqItem1'
									onChange={e => setReqItem1(e.target.value)}
								/>
							</Col>
							<Col>
								<Form.Control
									type='string'
									name='reqItem2'
									onChange={e => setReqItem2(e.target.value)}
								/>
							</Col>
							<Col>
								<Form.Control
									type='string'
									name='reqItem3'
									onChange={e => setReqItem3(e.target.value)}
								/>
							</Col>
						</Row>
						<Row>
							<Col>
								<Form.Label>Drop-off location</Form.Label>
								<Form.Control
									type='string'
									required
									name='reqDropOff'
									placeholder='Please enter a specific address'
									onChange={e => setReqDropOff(e.target.value)}
								/>
							</Col>
							<Col>
								<Button onClick={handleSubmit} className='request-button'>
									Send Request
								</Button>
							</Col>
						</Row>
					</Form.Group>
				</Form>
			</Modal.Body>
		</Modal>
	);
}
