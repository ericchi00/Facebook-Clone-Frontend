import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { ReactComponent as Accept } from '../../assets/accept.svg';
import { ReactComponent as Decline } from '../../assets/decline.svg';

const FriendRequest = ({ auth, authHeader, setRerender }) => {
	const [friendRequestList, setFriendRequestList] = useState([]);
	const [reload, setReload] = useState(null);

	useEffect(() => {
		setReload(false);
		getFriendRequest();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reload]);

	const getFriendRequest = async () => {
		const getFriendReq = await fetch(`/api/friends/request/${auth().id}`, {
			method: 'GET',
			headers: {
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
			setReload(true);
			setRerender(true);
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
		if (deleteFriendRequest.status === 200) {
			setReload(true);
			setRerender(true);
		}
	};

	return (
		<>
			{friendRequestList.length > 0 && (
				<div className="p-2 mt-1" style={{ background: '#323232' }}>
					<h5 className="text-center text-light">Friend Requests</h5>
					<div
						className="d-flex flex-wrap justify-content-around"
						style={{ gap: '.8rem' }}
					>
						{friendRequestList.length > 0 &&
							friendRequestList.map((request, i) => {
								return (
									<div
										key={i}
										className="d-flex p-2 text-light justify-content-between align-items-center rounded"
										style={{ background: '#404040', width: '280px' }}
									>
										<Button
											variant="dark"
											as={Link}
											to={`/profile/${request._id}`}
											className="d-flex p-2 text-light"
											style={{
												background: '#404040',
												gap: '.5rem',
												border: 'none',
											}}
										>
											<img
												src={request.picture}
												alt={request.firstName + ' profile picture'}
												width={24}
												height={24}
												className="rounded-circle pe-auto"
											/>
											{request.firstName + ' ' + request.lastName}
										</Button>
										<div className="d-flex" style={{ gap: '.5rem' }}>
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
			)}
		</>
	);
};

export default FriendRequest;
