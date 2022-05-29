import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import ProfileForm from './ProfileForm';
import Upload from '../Upload';
import Post from '../Post';
import { ReactComponent as AddFriend } from '../../assets/addfriend.svg';
import { ReactComponent as RemoveFriend } from '../../assets/removefriend.svg';

const Profile = ({ auth, authHeader }) => {
	const { id } = useParams();
	const [info, setInfo] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isUserProfile, setIsUserProfile] = useState(false);
	const [editProfile, setEditProfile] = useState(false);
	const [editPicture, setEditPicture] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		getInfo();
		if (id === auth().id) {
			setIsUserProfile(true);
		} else {
			setIsUserProfile(false);
		}
	}, [id, editProfile, editPicture]);

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
		<Container
			fluid="sm"
			className="d-flex flex-column align-items-center mt-3"
		>
			{loading ? (
				<Spinner
					animation="border"
					role="status"
					style={{
						width: '4rem',
						height: '4rem',
						marginTop: '10rem',
					}}
				>
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			) : (
				<Card
					className="d-flex flex-column align-items-center p-3"
					style={{ width: '600px' }}
				>
					{editProfile && <ProfileForm setEditProfile={setEditProfile} />}
					{editPicture && (
						<Upload
							label="Profile Picture"
							buttonName="Save Profile Picture"
							setLoading={setLoading}
							setEditPicture={setEditPicture}
						/>
					)}
					{!editPicture && !editProfile ? (
						<>
							<img
								alt="Profile"
								src={info.picture}
								width="150"
								height="150"
								className="rounded-circle pe-auto"
							/>
							<Card.Title className="p-3">
								{info.firstName + ' ' + info.lastName}
							</Card.Title>
							<div className="d-flex" style={{ gap: '1rem' }}>
								<Button variant="dark" onClick={() => setEditProfile(true)}>
									Edit Profile
								</Button>
								<Button variant="dark" onClick={() => setEditPicture(true)}>
									Edit Picture
								</Button>
							</div>
						</>
					) : null}
				</Card>
			)}
			<Post />
		</Container>
	);
};
export default Profile;
