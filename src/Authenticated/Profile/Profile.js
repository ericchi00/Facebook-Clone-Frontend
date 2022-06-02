import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import PostForm from '../PostForm';
import ProfileCard from './ProfileCard';

const Profile = ({ auth, authHeader }) => {
	const { id } = useParams();
	const [info, setInfo] = useState('');
	const [loading, setLoading] = useState(true);
	const [isUserProfile, setIsUserProfile] = useState(false);
	const [profileChange, setProfileChange] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		setLoading(true);
		if (id === auth().id) {
			setIsUserProfile(true);
		} else {
			setIsUserProfile(false);
		}
		getInfo();
	}, [id, profileChange]);

	const getInfo = async () => {
		const response = await fetch(`/api/profile/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authHeader(),
			},
		});
		if (response.status === 500) {
			return navigate('*');
		}
		const profileInfo = await response.json();
		setInfo(profileInfo);
		document.title = profileInfo.firstName + ' ' + profileInfo.lastName;
		setLoading(false);
	};

	return (
		<>
			{loading ? (
				<Container className="d-flex align-items-center justify-content-center">
					<Spinner
						animation="border"
						variant="light"
						role="status"
						style={{
							width: '4rem',
							height: '4rem',
							marginTop: '10rem',
						}}
					>
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</Container>
			) : (
				<>
					<ProfileCard
						auth={auth}
						authHeader={authHeader}
						isUserProfile={isUserProfile}
						info={info}
						setProfileChange={setProfileChange}
					/>
				</>
			)}
		</>
	);
};
export default Profile;
