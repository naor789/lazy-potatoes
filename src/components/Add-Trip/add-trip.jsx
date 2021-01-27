import { useState, useContext } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import './add-trip.css';
export const areas = [
	'Choose your area',
	'Glilot',
	'Tzuk Aviv',
	'Ezor Sde Dov',
	'Nof Yam',
	'Tochnit Lamed',
	'Cochav Hazafon',
	'Ramat Aviv Gimel',
	'Afeka',
	'Neve Avivim Vehasviva',
	'Ramat Aviv',
	'Universita Tel Aviv',
	'Mercaz Hayeridim',
	'Park Hayarkon',
	'Tel Baruch Tzafon',
	'Tel Baruch',
	'Maoz Aviv',
	'Neot Afeka B',
	'Neot Afeka A',
	'Hadar Yosef',
	'Kiriat Shaul',
	'Hamashtela',
	'Ganai Zahala Ramat Zahala',
	'Zahala',
	'Neve Sharet',
	'Ravivim',
	'Neve Dan',
	'Ramat Hahayal',
	'Atidim',
	'Nemal Tel Aviv',
	'Hazafon Hayashan - Achelek Hazfoni',
	'Hazafon Hayashan - Achelek Hadromi',
	'Babli',
	'Hazafon Hahadash - Sviv kikar hamedina',
	'Hazafon hahadash - Ahelek Hadromi',
	'Tzamarot Ayalon',
	'Lev Tel Aviv',
	'Kerem Hatymanim',
	'Neve Tzedek',
	'Ganay Sharona',
	'Montefiore',
	'Tzafon Yafo',
	'Givat Herzel Ezor Hamalacha yafo',
	'Yafo Hatika - Nama Yafo',
	'Ajami',
	'Zahalon Veshchuna Hiscon',
	'Yafo Neve Golan',
	'Michlelet Yafo Tel Aviv Vedkr',
	'Yafo Daled',
	'Tel Cabir, Neve Ofer, Yafo B',
	'Ezor Taasuka - Zomet Hulon',
	'Florentine',
	'Neve Shaanan',
	'Shapira',
	'Park Horshot',
	'Kiriat Shalom',
	'Nachalat Itzhak',
	'Bizron Veramat Israel',
	'Tel Chaim',
	'Ramat Hatayasim',
	'Orot',
	'Yad Eliyhau',
	'Hatikva',
	'Ezra Vargzim',
	'Levne yedida',
	'Park Darom',
	'Kfir',
	'Neve Barbur, Kfar Shalom Maarav',
	'Neve Eliezer vekfar Shalom Mizrach',
	'Neve Chen',
	'Nir Aviv',
];

const AddTrip = () => {
	
	const { currentUser, baseURL } = useContext(UserContext);
	
	const [time, setTime] = useState();
	const [date, setDate] = useState();
	const [store, setStore] = useState();
	const [quantity, setQuantity] = useState();
	const [area, setArea] = useState();

	const handleSubmit = async e => {
		e.preventDefault();
		const addTrip = {
			//we need to add the username to the trip card
			name: currentUser.firstName,
			area: area,
			time: time,
			date: date,
			store: store,
			quantity: quantity,
		};
		const response = await axios.post(`${baseURL}/api/newtrip`, addTrip);
	};

	return (
		<div className='container mb-5 w-50'>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId='Type'>
					<Form.Label className='mt-1'>Area</Form.Label>
					<Form.Control
						as='select'
						defaultValue='Glilot'
						value={area}
						required
						onChange={e => setArea(e.target.value)}>
						{areas.map(area => (
							<option key={area.id} area={{ area }}>
								{area}
							</option>
						))}
					</Form.Control>
				</Form.Group>

				<Form.Group id='time'>
					<Form.Label>When?</Form.Label>
					<Form.Control
						type='time'
						value={time}
						required
						onChange={e => setTime(e.target.value)}
					/>
				</Form.Group>
				<Form.Group id='date'>
					<Form.Label>choose a day</Form.Label>
					<Form.Control
						type='date'
						value={date}
						required
						onChange={e => setDate(e.target.value)}
					/>
				</Form.Group>
				<Form.Group id='store'>
					<Form.Label>Where?</Form.Label>
					<Form.Control
						type='text'
						value={store}
						required
						onChange={e => setStore(e.target.value)}
					/>
				</Form.Group>
				<Form.Group id='quantity' inline>
					<Form.Label>How many items are you willing to shlep?</Form.Label>
					<Form.Control
						type='number'
						value={quantity}
						max={3}
						required
						inline
						onChange={e => setQuantity(e.target.value)}
					/>
					{quantity > 3 && (
						<Alert variant='danger'>can't add more than 3 items!</Alert>
					)}
				</Form.Group>
				<Button
					onClick={handleSubmit}
					className='button mt-3 submit-button'
					type='submit'>
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default AddTrip;
