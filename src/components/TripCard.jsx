import React from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';
import TripCardModal from './TripCardModal';
import './tripCard.css';

export default function TripCard(props) {
	const [modalShow, setModalShow] = React.useState(false);
	const { id, area, time, store, quantity, name, requests, date } = props.trip;

	return (
		<Card className='m-3 tripCard' style={{ width: '18rem' }} key={id}>
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

				{requests.length > 0 && (
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
									{request.accepted && <p> Request has been accepted</p>}
									{!request.accepted && <button>Accept this Request</button>}
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
