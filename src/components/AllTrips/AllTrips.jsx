import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {
	Row,
	Form,
	Button,
	Col,
	Toast,
	ToastBody,
	ToastHeader,
} from 'react-bootstrap';
import TripCard from '../TripCard/TripCard';
import { areas } from '../Add-Trip/add-trip';
import { baseURL } from '../../App';
import './allTrips.css';
import { UserContext } from '../../contexts/UserContext';

export default function AllTrips() {
	const [allTrips, setAllTrips] = useState([]);
	const [showAllTrips, setShowAllTrips] = useState([]);
	const [searchArea, setSearchArea] = useState();
	const { currentUser } = useContext(UserContext);
	const [message, setMessage] = useState('');
	const [show, setShow] = useState(false);

	useEffect(() => {
		handleAllTrips();
		// eslint-disable-next-line
	}, []);

	const handleSearchArea = async event => {
		event.preventDefault();
		const res = await axios.get(
			`${baseURL}/api/alltrips/search?area=${searchArea}`
		);
		setAllTrips(res.data);
	};

	const handleMyTrips = async e => {
		e.preventDefault();
		if (currentUser.email === undefined) setMessage(`You aren't logged in!`);
		else {
			const res = await axios.get(
				`${baseURL}/api/alltrips/search?email=${currentUser.email}`
			);
			setAllTrips(res.data);
		}
	};

	const handleAllTrips = async () => {
		const res = await axios.get(`${baseURL}/api/alltrips`);
		setAllTrips(res.data);
		setShowAllTrips(allTrips.reverse());
	};

	return (
		<>
			<div className='container mb-5 '>
				<h1>Available Trips</h1>
				<Form>
					<Form.Group controlId='searchArea'>
						<Row className='justify-content-md-center'>
							<Col xs lg='2'>
								<Button onClick={handleAllTrips}>All Trips</Button>
							</Col>

							<Col xs lg='2'>
								<Button onClick={handleMyTrips}>My Trips</Button>
							</Col>
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
									onClick={handleSearchArea}
									type='submit'>
									Search
								</Button>
							</Col>
							<Col xs lg='2'></Col>
						</Row>
					</Form.Group>
				</Form>

				{message && (
					<Toast
						onClose={() => setShow(false)}
						show={show}
						delay={5000}
						autohide>
						<ToastHeader>Oops!</ToastHeader>
						<ToastBody>{message}</ToastBody>
					</Toast>
				)}

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
