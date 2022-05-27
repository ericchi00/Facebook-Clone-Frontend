import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthHeader } from 'react-auth-kit';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ProfileForm from './ProfileForm';
import Modal from 'react-bootstrap/Modal';

const Profile = () => {
	const { id } = useParams();
	const [info, setInfo] = useState(null);
	const [loading, setLoading] = useState(true);
	const [show, setShow] = useState(true);

	const navigate = useNavigate();
	const authHeader = useAuthHeader();

	useEffect(() => {
		getInfo();
	}, []);

	const getInfo = async () => {
		const response = await fetch(`/api/profile/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authHeader(),
			},
		});
		if (response.status === 500) {
			navigate('*');
		}
		const profileInfo = await response.json();
		setInfo(profileInfo);
		document.title = profileInfo.firstName + ' ' + profileInfo.lastName;
		setLoading(false);
	};

	return (
		<>
			{loading ? (
				<p>loading</p>
			) : (
				<Container fluid="sm" className="d-flex justify-content-center mt-3">
					<Card
						className="d-flex flex-column align-items-center p-3"
						style={{ width: '600px' }}
					>
						<img
							alt=""
							src={`data:image/png;base64, ${info.picture}`}
							width="100"
							className="rounded-circle"
						/>
						<Card.Title className="p-3">
							{info.firstName + ' ' + info.lastName}
						</Card.Title>
						<Button variant="dark">Edit Profile</Button>
					</Card>
				</Container>
			)}
		</>
	);
};
export default Profile;
