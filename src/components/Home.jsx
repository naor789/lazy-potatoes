import React from 'react';
import imgA from '../components/img/‏‏imgA.png';
import imgD from './img/‏‏imgD.png';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export default function Home() {
	const { currentUser } = useContext(UserContext);

	return (
		<div className='container homePage'>
			<Row>
				<h1 className='home-heading'>Welcome {currentUser.firstName}</h1>
			</Row>
			<Row>
				<Col md='4'></Col>
				<Col md='4'>
					<p className='home-text'>
						Welcome to our platform. Here, you can post your trips to the
						makolet, ask a neighbor to bring you something from the makolet if
						you are in potato-mode, through a simple point system.
					</p>
				</Col>
				<Col md='4'></Col>
			</Row>
			<Row>
				<Col md='4'>
					<img src={imgA} alt='people' width='90%' />
				</Col>
				<Col md='4'>
					<h4>How does it work? </h4>
					<p>
						<h5>
							<strong>
								First, you need to log-in or sign up to participate
							</strong>
						</h5>
						<br />
						When you sign up, you are awarded 20 points. <br />
						Every time you ask for something, you give that person point. <br />
						Every time you bring something to a potato, you earn points. <br />
						Simple enough, isn't it?
					</p>
				</Col>
				<Col md='4'>
					<img src={imgD} alt='people' width='90%' />
				</Col>
			</Row>
			<Row>
				<Col md='4'></Col>
				<Col md='4'>
					<Link to='/alltrips'>
						<Button className='home-button m-4'> All trips </Button>
					</Link>
					<Link to='/add-trip'>
						{currentUser && (
							<Button className='home-button m-4'>Add a new trip</Button>
						)}
					</Link>
				</Col>
				<Col md='4'></Col>
			</Row>
		</div>
	);
}
