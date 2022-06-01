import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { ReactComponent as Accept } from '../../assets/accept.svg';
import { ReactComponent as Decline } from '../../assets/decline.svg';

const FriendRequest = ({
	auth,
	authHeader,
	deleteFriendRequest,
	setFriendsUpdate,
}) => {
	const [friendRequestList, setFriendRequestList] = useState([]);
	const [rerender, setRerender] = useState(false);

	useEffect(() => {
		getFriendRequest();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rerender]);

	const getFriendRequest = async () => {
		const getFriendReq = await fetch(`/api/friends/request/${auth().id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authHeader(),
			},
		});
		const response = await getFriendReq.json();
		setFriendRequestList(response.friendRequest);
	};

	const acceptFriendRequest = async (friendID) => {
		const putFriend = await fetch(`/api/friends/request/${auth().id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authHeader(),
			},
			body: JSON.stringify({ user: auth().id, friend: friendID }),
		});
		if (putFriend.status === 200) {
			setRerender(true);
			setFriendsUpdate(true);
		}
	};

	const declineFriendRequest = async (friendID) => {
		const deleteFriendRequest = await fetch(`/api/friends/request`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authHeader(),
			},
			body: JSON.stringify({ user: auth().id, friend: friendID }),
		});
		if (deleteFriendRequest.status === 200) setRerender(true);
	};

	return (
		<>
			{friendRequestList.length > 0 && (
				<Container
					fluid="sm mt-4 d-flex flex-column align-items-center"
					style={{
						maxWidth: '600px',
					}}
				>
					<div className="w-100 h-100 p-3" style={{ background: '#323232' }}>
						<h5 className="text-center text-light">Friend Requests</h5>
						<div
							className="d-flex flex-wrap justify-content-around"
							style={{ gap: '.8rem' }}
						>
							{friendRequestList.map((request, i) => {
								return (
									<div
										key={i}
										className="d-flex p-2 text-light justify-content-between align-items-center"
										style={{ background: '#404040', width: '280px' }}
									>
										<Button
											as={Link}
											to={`/profile/${request._id}`}
											className="d-flex p-2 text-light justify-content-between
										align-items-center"
											style={{
												background: '#404040',
												width: '280px',
												gap: '.5rem',
												border: 'none',
											}}
										>
											{request.firstName + ' ' + request.lastName}
										</Button>
										<div className="d-flex" style={{ gap: '.3rem' }}>
											<Accept
												onClick={() => acceptFriendRequest(request._id)}
												style={{ cursor: 'pointer' }}
											/>
											<Decline
												onClick={() => declineFriendRequest(request._id)}
												style={{ cursor: 'pointer' }}
											/>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</Container>
			)}
		</>
	);
};

export default FriendRequest;
