import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import ProfileForm from './ProfileForm';
import Upload from '../Upload';
import PostForm from '../PostForm';
import { ReactComponent as AddFriend } from '../../assets/addfriend.svg';
import { ReactComponent as RemoveFriend } from '../../assets/removefriend.svg';
import { ReactComponent as FriendsList } from '../../assets/friendslist.svg';

const Profile = ({ auth, authHeader }) => {
	document.title = auth().firstName + ' ' + auth().lastName;
	const { id } = useParams();
	const [info, setInfo] = useState(null);
	const [loading, setLoading] = useState(true);
	const [editProfile, setEditProfile] = useState(false);
	const [editPicture, setEditPicture] = useState(false);
	const [isUserProfile, setIsUserProfile] = useState(false);
	const [isFriend, setIsFriend] = useState(false);
	const [friendRequest, setFriendRequest] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		getInfo();
		if (id === auth().id) {
			setIsUserProfile(true);
		} else {
			setIsUserProfile(false);
		}
	}, [id, loading]);

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
		if (profileInfo.friendRequest.includes(auth().id)) {
			setFriendRequest(true);
		}

		setLoading(false);
	};

	const sendFriendRequest = async () => {
		const putFriend = await fetch(`/api/friends/request`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authHeader(),
			},
			body: JSON.stringify({ user: auth().id, friend: id }),
		});
		if (putFriend.status === 200) {
			setFriendRequest(true);
		}
	};

	const deleteFriendRequest = async () => {
		const deleteFriend = await fetch('/api/friends/request', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authHeader(),
			},
			body: JSON.stringify({ user: auth().id, friend: id }),
		});

		if (deleteFriend.status === 200) {
			setFriendRequest(false);
		}
	};

	return (
		<Container
			fluid="sm"
			className="d-flex flex-column align-items-center mt-3"
		>
			{loading ? (
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
			) : (
				<Card
					className="d-flex flex-column align-items-center p-3"
					style={{ width: '600px', background: '#323232' }}
				>
					{editProfile && (
						<ProfileForm
							setLoading={setLoading}
							setEditProfile={setEditProfile}
						/>
					)}
					{editPicture && (
						<Upload
							label="Profile Picture"
							buttonName="Save"
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
							<Card.Title className="p-3 text-light">
								{info.firstName + ' ' + info.lastName}
							</Card.Title>
							{isUserProfile && (
								<div className="d-flex" style={{ gap: '1rem' }}>
									<Button variant="light" onClick={() => setEditProfile(true)}>
										Edit Profile
									</Button>
									<Button variant="light" onClick={() => setEditPicture(true)}>
										Edit Picture
									</Button>
								</div>
							)}
							{!isUserProfile && isFriend && (
								<Button variant="light">
									<RemoveFriend /> Remove Friend
								</Button>
							)}
							{!isUserProfile && friendRequest && (
								<Button variant="danger" onClick={() => deleteFriendRequest()}>
									<RemoveFriend /> Remove Friend Request
								</Button>
							)}
							{!isUserProfile && !friendRequest && (
								<Button variant="primary" onClick={() => sendFriendRequest()}>
									<AddFriend /> Send Friend Request
								</Button>
							)}
						</>
					) : null}
				</Card>
			)}
			<PostForm auth={auth} />
		</Container>
	);
};
export default Profile;
