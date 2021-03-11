import React, { useContext } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import TripCardModal from '../TripCardModal/TripCardModal';
import './tripCard.css';
import { UserContext } from '../../contexts/UserContext';
import axios from 'axios';
import { baseURL } from '../../App';

export default function TripCard(props) {
	const { currentUser } = useContext(UserContext);

	const [modalShow, setModalShow] = React.useState(false);

	const {
		_id,
		area,
		time,
		store,
		quantity,
		name,
		requests,
		date,
		email,
	} = props.trip;

	function handleAccept(requestId) {
		const updateReqObject = {
			acceptRequest: true,
			tripId: _id,
			requestId: requestId,
		};
		console.log('object', updateReqObject);
		sendRequest(updateReqObject);
	}

	function handleDeny(requestId) {
		const updateReqObject = {
			acceptRequest: false,
			tripId: _id,
			requestId: requestId,
		};
		console.log('object', updateReqObject);
		sendRequest(updateReqObject);
	}

	const sendRequest = async updateReqObject => {
		const res = await axios.put(`${baseURL}/api/handleAccept`, updateReqObject);
		console.log(res);
	};

	return (
		<Card className='m-3 tripCard' style={{ width: '18rem' }} key={_id}>
			<Card.Body>
				<Card.Title>{name}'s trip</Card.Title>
				<Card.Subtitle className='mb-2 text-muted'>Area: {area}</Card.Subtitle>
				<Card.Text>
					Store: <b>{store}</b>
				</Card.Text>
				<Card.Text>
					Time:
					<b>
						{time}, {date}
					</b>
				</Card.Text>
				<Card.Text>
					Able to carry: <b>{quantity}</b>
				</Card.Text>
				<Button className='buttons' onClick={() => setModalShow(true)}>
					Open
				</Button>

				{requests.length > 0 && email === currentUser.email && (
					<div className='div'>
						<Card.Header>Current requests</Card.Header>
						<ListGroup variant='flush'>
							{requests.map(request => (
								<ListGroup.Item key={request.requestId}>
									<h3>{request.requesterUser.firstName}'s request</h3>
									<p>
										Items requested:
										{request.reqItem1}, {request.reqItem2}, {request.reqItem3}
									</p>
									<p>Drop-off location: {request.reqDropOff}</p>
									{request.accepted === true && (
										<p> Request has been accepted</p>
									)}
									{request.accepted === false && (
										<p> Request has been denied</p>
									)}
									{request.accepted === null && (
										<div>
											<button onClick={() => handleAccept(request.requestId)}>
												Accept request
											</button>
											<button onClick={() => handleDeny(request.requestId)}>
												Deny request
											</button>
										</div>
									)}
								</ListGroup.Item>
							))}
						</ListGroup>
					</div>
				)}

				<TripCardModal
					trip={props.trip}
					requests={props.requests}
					show={modalShow}
					onHide={() => setModalShow(false)}
				/>
			</Card.Body>
		</Card>
	);
}
