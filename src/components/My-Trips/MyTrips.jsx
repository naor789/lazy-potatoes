import React, { useContext, useState, useEffect } from 'react';
import '../My-Trips/my-trips.css';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import TripCard from '../TripCard/TripCard';
import { Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

export default function MyTrips() {
	const { currentUser, baseURL } = useContext(UserContext);

	const [myTrips, setMyTrips] = useState([]);
	const [allTrips, setAllTrips] = useState([]);

	const getAllTrips = async () => {
		const res = await axios.get(`${baseURL}/api/alltrips`);
		setAllTrips(res.data);
		const findMyTrips = () =>
			allTrips.filter(trip => {
				return trip.email === currentUser.email;
			});
		setMyTrips(findMyTrips);
	};

	useEffect(() => {
		getAllTrips();
	}, []);

	return (
		<div>
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
