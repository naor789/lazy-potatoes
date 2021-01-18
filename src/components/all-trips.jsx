import { useEffect, useState } from 'react';
import { axios } from 'axios';
import { baseURL } from '../axios-routes';
import { ListGroup, Button, ListGroupItem } from 'react-bootstrap';

const TripList = async () => {
	const [allTrips, setAllTrips] = useState(null);
	useEffect(() => {
		axios.get(`${baseURL}/all-trips`).then(res => setAllTrips(res.data));
	}, []);

	return (
		<>
			{allTrips && (
				<ListGroup variant='flush'>
					{allTrips.map(trip => (
						<ListGroup.Item key={trip._id}>
							<p>store: {trip.store}</p>
							<p>time: {trip.time}</p>
							<p>quantity: {trip.quantity}</p>
							<Button>Map</Button>
							<Button>Request</Button>
						</ListGroup.Item>
					))}
				</ListGroup>
			)}
		</>
	);
};

export default TripList;
