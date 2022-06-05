import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { ReactComponent as AddFriend } from '../assets/addfriend.svg';
import RemoveSvg from '../assets/RemoveSvg';

const PeopleItem = ({ auth, user, authHeader }) => {
	const navigate = useNavigate();
	const fullName = user.firstName + ' ' + user.lastName;
	const [friendRequest, setFriendRequest] = useState(false);
	const [isFriend, setIsFriend] = useState(false);

	useEffect(() => {
		if (
			user.sentFriendRequest.includes(auth().id) ||
			user.friendRequest.includes(auth().id)
		) {
			setFriendRequest(true);
		} else if (user.friends.includes(auth().id)) {
			setIsFriend(true);
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
		if (putFriend.status === 200) {
			setFriendRequest(!friendRequest);
		}
	};

	const removeFriend = async () => {
		const deleteFriend = await fetch(`/api/friends/${auth().id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authHeader(),
			},
			body: JSON.stringify({ user: auth().id, friend: user._id }),
		});
		if (deleteFriend.status === 200) {
			setIsFriend(!isFriend);
		}
	};

	const cancelFriendRequest = async () => {
		const deleteFriend = await fetch('/api/friends/request', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authHeader(),
			},
			body: JSON.stringify({ user: auth().id, friend: user._id }),
		});
		if (deleteFriend.status === 200) {
			setFriendRequest(!friendRequest);
		}
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
			{!friendRequest && !isFriend && (
				<OverlayTrigger
					placement="bottom"
					overlay={<Tooltip>Send friend request</Tooltip>}
				>
					<Button
						onClick={() => {
							sendFriendRequest();
						}}
						variant="outline-dark"
						style={{ border: 'none' }}
					>
						<AddFriend />
					</Button>
				</OverlayTrigger>
			)}
			{isFriend && (
				<OverlayTrigger
					placement="bottom"
					overlay={<Tooltip>Unfriend</Tooltip>}
				>
					<Button
						onClick={() => removeFriend()}
						variant="outline-dark"
						style={{ border: 'none' }}
					>
						<RemoveSvg color="red" />
					</Button>
				</OverlayTrigger>
			)}
			{friendRequest && (
				<OverlayTrigger
					placement="bottom"
					overlay={<Tooltip>Cancel Friend Request</Tooltip>}
				>
					<Button
						onClick={() => cancelFriendRequest()}
						variant="outline-dark"
						style={{ border: 'none' }}
					>
						<RemoveSvg color="#0dcaf0" />
					</Button>
				</OverlayTrigger>
			)}
		</ListGroup.Item>
	);
};
export default PeopleItem;
