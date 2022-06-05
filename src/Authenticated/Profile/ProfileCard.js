import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ReactComponent as AddFriend } from '../../assets/addfriend.svg';
import { ReactComponent as ProfilePic } from '../../assets/profilepic.svg';
import { ReactComponent as EditProfile } from '../../assets/editprofile.svg';
import { ReactComponent as Delete } from '../../assets/delete.svg';
import RemoveSvg from '../../assets/RemoveSvg';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ProfileForm from './ProfileForm';
import ConfirmDelete from './ConfirmDelete';
import Upload from './Upload';

const ProfileCard = ({
	auth,
	authHeader,
	isUserProfile,
	info,
	setProfileChange,
}) => {
	const { id } = useParams();
	const [editProfile, setEditProfile] = useState(false);
	const [editPicture, setEditPicture] = useState(false);
	const [isFriend, setIsFriend] = useState(false);
	const [pendingRequest, setPendingRequest] = useState(false);
	const [acceptButton, setAcceptButton] = useState(false);

	const [show, setShow] = useState(false);

	useEffect(() => {
		if (!isUserProfile) {
			if (info.friends.includes(auth().id)) {
				setIsFriend(true);
			}
			if (info.friendRequest.includes(auth().id)) {
				setPendingRequest(true);
			}
			if (info.sentFriendRequest.includes(auth().id)) {
				setPendingRequest(true);
				setAcceptButton(true);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, isUserProfile]);

	const sendFriendRequest = async () => {
		const putFriend = await fetch(
			`https://backend-facebookclone.herokuapp.com/api/friends/request`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: authHeader(),
				},
				body: JSON.stringify({ user: auth().id, friend: id }),
			}
		);
		if (putFriend.status === 200) {
			setPendingRequest(true);
		}
	};

	const cancelFriendRequest = async () => {
		const deleteFriend = await fetch(
			'https://infinite-ridge-47874.herokuapp.com/https://backend-facebookclone.herokuapp.com/api/friends/request',
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: authHeader(),
				},
				body: JSON.stringify({ user: auth().id, friend: id }),
			}
		);
		if (deleteFriend.status === 200) {
			setPendingRequest(false);
		}
	};

	const acceptFriendRequest = async () => {
		const putFriend = await fetch(
			`https://backend-facebookclone.herokuapp.com/api/friends/request/${
				auth().id
			}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: authHeader(),
				},
				body: JSON.stringify({ user: auth().id, friend: id }),
			}
		);
		if (putFriend.status === 200) {
			setPendingRequest(false);
			setIsFriend(true);
		}
	};

	const removeFriend = async () => {
		const deleteFriend = await fetch(
			`https://backend-facebookclone.herokuapp.com/api/friends/${
				auth().id
			}`,
			{
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: authHeader(),
				},
				body: JSON.stringify({ user: auth().id, friend: id }),
			}
		);
		if (deleteFriend.status === 200) {
			setIsFriend(false);
		}
	};

	return (
		<Container
			fluid="sm d-flex flex-column align-items-center mt-4 p-0"
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
				{editPicture && <Upload setEditPicture={setEditPicture} />}
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
									variant="outline-danger"
									className="d-flex align-items-center"
									style={{ gap: '.3rem' }}
									onClick={() => setShow(true)}
								>
									<Delete />
									Delete Account
								</Button>
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
								<RemoveSvg color="black" /> Remove Friend
							</Button>
						)}
						<div className="d-flex" style={{ gap: '.5rem' }}>
							{!isUserProfile && pendingRequest && acceptButton && (
								<Button
									variant="primary"
									onClick={() => acceptFriendRequest()}
									className="d-flex align-items-center"
									style={{ gap: '.3rem' }}
								>
									<AddFriend /> Accept Friend Request
								</Button>
							)}
							{!isUserProfile && pendingRequest && (
								<Button
									variant="danger"
									onClick={() => cancelFriendRequest()}
									className="d-flex align-items-center"
									style={{ gap: '.3rem' }}
								>
									<RemoveSvg color="white" /> Cancel Friend Request
								</Button>
							)}
						</div>
						{!isUserProfile && !pendingRequest && !isFriend && (
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
			<ConfirmDelete
				show={show}
				setShow={setShow}
				auth={auth}
				authHeader={authHeader}
			/>
		</Container>
	);
};

export default ProfileCard;
