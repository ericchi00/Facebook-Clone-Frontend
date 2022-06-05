import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useSignOut } from 'react-auth-kit';
import { useNavigate } from 'react-router-dom';

const ConfirmDelete = ({ show, setShow, auth, authHeader }) => {
	const signOut = useSignOut();
	const navigate = useNavigate();
	const deleteAccount = async () => {
		const deleteFriend = await fetch(
			`https://backend-facebookclone.herokuapp.com/api/profile/${auth().id}`,
			{
				method: 'DELETE',
				headers: {
					Authorization: authHeader(),
				},
			}
		);
		if (deleteFriend.status !== 200) {
			throw new Error('An error has occurred');
		}
	};
	return (
		<Modal show={show} onHide={() => setShow(false)} centered>
			<Modal.Body>
				Are you sure you want to delete your account?
				<strong> This is irreversible.</strong>
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="danger"
					onClick={() => {
						deleteAccount();
						setShow(false);
						navigate('/');
						signOut();
					}}
				>
					Delete
				</Button>
				<Button variant="secondary" onClick={() => setShow(false)}>
					Cancel
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ConfirmDelete;
