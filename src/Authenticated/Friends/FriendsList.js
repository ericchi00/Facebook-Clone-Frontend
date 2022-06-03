import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

const FriendsList = ({ auth, authHeader, rerender }) => {
	const id = auth().id;
	const [friends, setFriends] = useState([]);

	const getFriends = async () => {
		const getAllFriends = await fetch(`/api/friends/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authHeader(),
			},
		});
		if (getAllFriends.status === 200) {
			const friends = await getAllFriends.json();
			setFriends(friends.friends);
		}
	};

	useEffect(() => {
		getFriends();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rerender]);

	return (
		<div className="w-100 h-100 p-3 " style={{ background: '#323232' }}>
			<h5 className="text-center text-light">Friends</h5>
			{friends.length === 0 ? (
				<p className="text-center text-light">No friends yet</p>
			) : (
				<div
					className="d-flex flex-wrap justify-content-around"
					style={{ gap: '.8rem' }}
				>
					{friends.map((friend, i) => {
						return (
							<Button
								as={Link}
								to={`/profile/${friend._id}`}
								key={i}
								className="d-flex p-2 text-light justify-content-center
										align-items-center w-100"
								style={{
									background: '#404040',
									gap: '.5rem',
									border: 'none',
								}}
							>
								<img
									src={friend.picture}
									alt={'profile of ' + friend.firstName}
									height={32}
									width={32}
									className="rounded-circle"
								/>
								{friend.firstName + ' ' + friend.lastName}
							</Button>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default FriendsList;
