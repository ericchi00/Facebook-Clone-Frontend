import React, { useState, useEffect } from 'react';
import { ReactComponent as AddFriend } from '../../assets/addfriend.svg';
import { ReactComponent as RemoveFriend } from '../../assets/removefriend.svg';
import { ReactComponent as ProfilePic } from '../../assets/profilepic.svg';
import { ReactComponent as EditProfile } from '../../assets/editprofile.svg';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ProfileForm from './ProfileForm';
import Upload from '../Upload';

const ProfileCard = ({
	auth,
	authHeader,
	isUserProfile,
	info,
	id,
	setProfileChange,
}) => {
	const [editProfile, setEditProfile] = useState(false);
	const [editPicture, setEditPicture] = useState(false);
	const [isFriend, setIsFriend] = useState(false);
	const [friendRequest, setFriendRequest] = useState(null);

	useEffect(() => {
		if (!isUserProfile) {
			if (info.friendRequest.includes(auth().id)) {
				setFriendRequest(true);
			}
			if (info.friends.includes(auth().id)) {
				setIsFriend(true);
			}
		}
	}, [isFriend, friendRequest]);

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

	const removeFriend = async () => {
		const deleteFriend = await fetch(`/api/friends/${auth().id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authHeader(),
			},
			body: JSON.stringify({ user: auth().id, friend: id }),
		});
		if (deleteFriend.status === 200) {
			setIsFriend(false);
		}
	};

	return (
		<Container
			fluid="sm d-flex flex-column align-items-center mt-3"
			style={{ maxWidth: '600px' }}
		>
			<Card
				className="d-flex flex-column align-items-center p-3 w-100"
				style={{ background: '#323232', border: 'none' }}
			>
				{editProfile && (
					<ProfileForm
						setProfileChange={setProfileChange}
						setEditProfile={setEditProfile}
					/>
				)}
				{editPicture && (
					<Upload
						label="Profile Picture"
						setProfileChange={setProfileChange}
						setEditPicture={setEditPicture}
					/>
				)}
				{!editPicture && !editProfile && (
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
								<Button
									variant="light"
									onClick={() => setEditProfile(true)}
									className="d-flex align-items-center"
									style={{ gap: '.3rem' }}
								>
									<EditProfile /> Edit Profile
								</Button>
								<Button
									variant="light"
									onClick={() => setEditPicture(true)}
									className="d-flex align-items-center"
									style={{ gap: '.3rem' }}
								>
									<ProfilePic /> Edit Picture
								</Button>
							</div>
						)}
						{!isUserProfile && isFriend && (
							<Button
								variant="light"
								onClick={() => removeFriend()}
								className="d-flex align-items-center"
								style={{ gap: '.3rem' }}
							>
								<RemoveFriend /> Remove Friend
							</Button>
						)}
						{!isUserProfile && friendRequest && (
							<Button
								variant="danger"
								onClick={() => deleteFriendRequest()}
								className="d-flex align-items-center"
								style={{ gap: '.3rem' }}
							>
								<RemoveFriend /> Remove Friend Request
							</Button>
						)}
						{!isUserProfile && !friendRequest && !isFriend && (
							<Button
								variant="primary"
								onClick={() => sendFriendRequest()}
								className="d-flex align-items-center"
								style={{ gap: '.3rem' }}
							>
								<AddFriend /> Send Friend Request
							</Button>
						)}
					</>
				)}
			</Card>
		</Container>
	);
};

export default ProfileCard;
