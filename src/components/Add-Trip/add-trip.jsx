import { useState, useContext } from 'react';
import {
	Form,
	Button,
	Alert,
	Toast,
	ToastHeader,
	ToastBody,
} from 'react-bootstrap';
import axios from 'axios';
import { baseURL } from '../../App';
import { UserContext } from '../../contexts/UserContext';
import './add-trip.css';
import { useHistory } from 'react-router-dom';

export const areas = [
	'Select area',
	'Afeka',
	'Ajami',
	'Atidim',
	'Babli',
	'Bizron Veramat Israel',
	'Cochav Hazafon',
	'Ezor Sde Dov',
	'Ezor Taasuka - Zomet Hulon',
	'Ezra Vargzim',
	'Florentine',
	'Ganai Zahala Ramat Zahala',
	'Ganay Sharona',
	'Givat Herzel Ezor Hamalacha yafo',
	'Glilot',
	'Hadar Yosef',
	'Hamashtela',
	'Hatikva',
	'Hazafon Hahadash - Sviv kikar hamedina',
	'Hazafon Hayashan - Achelek Hadromi',
	'Hazafon Hayashan - Achelek Hazfoni',
	'Hazafon hahadash - Ahelek Hadromi',
	'Kerem Hatymanim',
	'Kfir',
	'Kiriat Shalom',
	'Kiriat Shaul',
	'Lev Tel Aviv',
	'Levne yedida',
	'Maoz Aviv',
	'Mercaz Hayeridim',
	'Michlelet Yafo Tel Aviv Vedkr',
	'Montefiore',
	'Nachalat Itzhak',
	'Nemal Tel Aviv',
	'Neot Afeka A',
	'Neot Afeka B',
	'Neve Avivim Vehasviva',
	'Neve Barbur, Kfar Shalom Maarav',
	'Neve Chen',
	'Neve Dan',
	'Neve Eliezer vekfar Shalom Mizrach',
	'Neve Shaanan',
	'Neve Sharet',
	'Neve Tzedek',
	'Nir Aviv',
	'Nof Yam',
	'Orot',
	'Park Darom',
	'Park Hayarkon',
	'Park Horshot',
	'Ramat Aviv',
	'Ramat Aviv Gimel',
	'Ramat Hahayal',
	'Ramat Hatayasim',
	'Ravivim',
	'Shapira',
	'Tel Baruch',
	'Tel Baruch Tzafon',
	'Tel Cabir, Neve Ofer, Yafo B',
	'Tel Chaim',
	'Tochnit Lamed',
	'Tzafon Yafo',
	'Tzamarot Ayalon',
	'Tzuk Aviv',
	'Universita Tel Aviv',
	'Yad Eliyhau',
	'Yafo Daled',
	'Yafo Hatika - Nama Yafo',
	'Yafo Neve Golan',
	'Zahala',
	'Zahalon Veshchuna Hiscon',
];

const AddTrip = () => {
	const [show, setShow] = useState(false);
	const history = useHistory();
	const { currentUser } = useContext(UserContext);
	const [time, setTime] = useState();
	const [date, setDate] = useState();
	const [store, setStore] = useState();
	const [quantity, setQuantity] = useState();
	const [area, setArea] = useState();
	const [message, setMessage] = useState();

	const handleSubmit = async e => {
		e.preventDefault();
		const addTrip = {
			email: currentUser.email,
			name: currentUser.firstName,
			area: area,
			time: time,
			date: date,
			store: store,
			quantity: quantity,
		};
		const response = await axios.post(`${baseURL}/api/newtrip`, addTrip);
		if (response) {
			setMessage(`Thank ${currentUser.firstName}! Your new trip was added.`);
			setTime('');
			setDate('');
			setStore('');
			setQuantity('');
			setArea('');
		}
		// history.push('/mytrips');
	};
	return (
		<div className='container mb-5 w-50'>
			{message && (
				<Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
					<ToastHeader>Thank You!</ToastHeader>
					<ToastBody>{message}</ToastBody>
				</Toast>
			)}
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId='Type'>
					<Form.Label className='mt-1'>Choose your area</Form.Label>
					<Form.Control
						as='select'
						placeholder='Select area'
						defaultValue='Select area'
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
				{time && date && store && quantity && area && currentUser.email ? (
					<Button
						onClick={handleSubmit}
						className='button mt-3 submit-button'
						type='submit'>
						Add new trip
					</Button>
				) : (
					<Button
						onClick={handleSubmit}
						className='button mt-3 submit-button'
						type='submit'
						disabled>
						Add new trip
					</Button>
				)}
			</Form>
		</div>
	);
};

export default AddTrip;
