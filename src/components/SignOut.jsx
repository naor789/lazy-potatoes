import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

function SignOut() {
	const { setCurrentUser } = useContext(UserContext);
	const history = useHistory();

	const logOut = async event => {
		localStorage.clear();
		setCurrentUser('');
		window.location.reload();
		history.push('/');
	};
	return (
		<Button
			className='signout btn-secondary my-2 my-sm-0 mx-3'
			type='button'
			onClick={logOut}>
			Log Out
		</Button>
	);
}

export default SignOut;
