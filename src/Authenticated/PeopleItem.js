import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { ReactComponent as AddFriend } from '../assets/addfriend.svg';
import { ReactComponent as RemoveFriend } from '../assets/removefriend.svg';

const PeopleItem = ({ auth, user, authHeader }) => {
	const navigate = useNavigate();
	const fullName = user.firstName + ' ' + user.lastName;
	const [friendRequest, setFriendRequest] = useState(false);
	const [isFriend, setIsFriend] = useState(false);

	useEffect(() => {
		if (
			user.sentFriendRequest.includes(auth().id) ||
			user.friendRequest.includes(auth().id) ||
			user.friends.includes(auth().id)
		) {
			setFriendRequest(true);
		}
	}, []);

	const sendFriendRequest = async () => {
		const putFriend = await fetch(`/api/friends/request`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authHeader(),
			},
			body: JSON.stringify({ user: auth().id, friend: user._id }),
		});
	};

	return (
		<ListGroup.Item
			className="text-light d-flex align-items-center justify-content-between"
			style={{ background: '#323232' }}
		>
			<Button
				variant="outline-dark text-light d-flex align-items-center w-100 p-3"
				onClick={() => navigate(`/profile/${user._id}`)}
				style={{ border: 'none', gap: '.5rem', width: 'max-content' }}
			>
				<img
					src={user.picture}
					alt={fullName + 'profile pic'}
					width={24}
					height={24}
					className="rounded-circle"
				/>
				{fullName}
			</Button>
			{!friendRequest && (
				<OverlayTrigger
					placement="bottom"
					overlay={<Tooltip>Add friend</Tooltip>}
				>
					<Button
						onClick={() => {
							setFriendRequest(true);
							sendFriendRequest();
						}}
						variant="outline-dark"
						style={{ border: 'none' }}
					>
						<AddFriend />
					</Button>
				</OverlayTrigger>
			)}
		</ListGroup.Item>
	);
};
export default PeopleItem;
