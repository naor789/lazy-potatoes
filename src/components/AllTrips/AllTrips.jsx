import { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Form, Button, Col } from 'react-bootstrap';
import TripCard from '../TripCard/TripCard';
import { areas } from '../Add-Trip/add-trip';
import { baseURL } from '../../App';
import './allTrips.css';

export default function AllTrips() {
	const [allTrips, setAllTrips] = useState([]);
	const [showAllTrips, setShowAllTrips] = useState([]);
	const [searchArea, setSearchArea] = useState();

	useEffect(() => {
		const showAllTrips = async () => {
			const res = await axios.get(`${baseURL}/api/alltrips`);
			setAllTrips(res.data);
			setShowAllTrips(allTrips.reverse());
		};
		showAllTrips();
	}, []);

	const handleSearch = async event => {
		event.preventDefault();
		const res = await axios.get(
			`http://localhost:5000/api/alltrips/search?area=${searchArea}`
		);
		setAllTrips(res.data);
	};

	return (
		<>
			<div className='container mb-5 '>
				<h1>Available Trips</h1>
				<Form>
					<Form.Group controlId='searchArea'>
						<Row className='justify-content-md-center'>
							<Col xs lg='2'></Col>
							<Col md='auto'>
								<Form.Control
									aria-label='Select your area'
									style={{ width: '200px' }}
									as='select'
									defaultValue='Choose your area'
									value={searchArea}
									required
									onChange={e => setSearchArea(e.target.value)}>
									{areas.map(area => (
										<option key={area.id} area={{ area }}>
											{area}
										</option>
									))}
								</Form.Control>
							</Col>
							<Col md='auto'>
								<Button
									className='searchBtn'
									onClick={handleSearch}
									type='submit'>
									Search
								</Button>
							</Col>
							<Col xs lg='2'></Col>
						</Row>
					</Form.Group>
				</Form>
				{allTrips && (
					<Row className='m-3'>
						{allTrips.map(trip => (
							<TripCard key={trip._id} trip={trip} />
						))}
					</Row>
				)}
				{showAllTrips && (
					<Row className='m-3'>
						{showAllTrips.map(trip => (
							<TripCard key={trip._id} trip={trip} />
						))}
					</Row>
				)}
			</div>
		</>
	);
}
