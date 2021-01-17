import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddTrip = () => {
	const [time, setTime] = useState();
	const [store, setStore] = useState();
	const [quantity, setQuantity] = useState();

	const handleSubmit = e => {
		e.preventDefault();
	};

	return (
		<>
			<Form onSubmit={handleSubmit}>
				<Form.Group id='time'>
					<Form.Label>When?</Form.Label>
					<Form.Control
						type='number'
						value={time}
						required
						onChange={e => setTime(e.target.value)}
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
					<Form.Label>How much are you willing to shlep?</Form.Label>
					<Form.Control
						type='number'
						value={quantity}
						required
						inline
						onChange={e => setQuantity(e.target.value)}
					/>
					<Form.Check inline label='item(s)' type='radio' />
					<Form.Check inline label='bag(s)' type='radio' />
					<Form.Check inline label='truck(s)' type='radio' />
				</Form.Group>

				<Button onClick={handleSubmit} className='button' type='submit'>
					Submit
				</Button>
			</Form>
		</>
	);
};

export default AddTrip;
