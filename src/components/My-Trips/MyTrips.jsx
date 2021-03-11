import React, { useContext, useState, useEffect } from 'react';
import '../My-Trips/my-trips.css';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import TripCard from '../TripCard/TripCard';
import { Row } from 'react-bootstrap';
import { baseURL } from '../../App';
// import { v4 as uuidv4 } from 'uuid';

export default function MyTrips() {
	const { currentUser } = useContext(UserContext);
	const [allTrips, setAllTrips] = useState([]);
	const [myTrips, setMyTrips] = useState([]);

	useEffect(() => {
		const res = axios.get(`${baseURL}/api/alltrips`);
		setAllTrips(res.data);
		setMyTrips(allTrips.filter(trip => currentUser.email === trip.email));
	}, []);

	return (
		<div className='mytrips'>
			<h1>My Trips</h1>
			{myTrips && (
				<Row className='m-3'>
					{myTrips.map(trip => (
						<TripCard key={trip._id} trip={trip} />
					))}
				</Row>
			)}
		</div>
	);
}
