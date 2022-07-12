import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import apiURL from '../../api';

const FriendsList = ({ auth, authHeader, rerender }) => {
	const { id } = useParams();
	const [friends, setFriends] = useState([]);
	const [userID, setUserID] = useState(auth().id || id);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getFriends();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rerender, userID]);

	const getFriends = async () => {
		const getAllFriends = await fetch(apiURL + `/api/friends/${auth().id}`, {
			method: 'GET',
			headers: {
				Authorization: authHeader(),
			},
		});
		if (getAllFriends.status === 200) {
			const response = await getAllFriends.json();
			setFriends(response.friends);
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return (
			<Container className="d-flex justify-content-center h-auto p-5">
				<Spinner
					animation="border"
					variant="light"
					role="status"
					style={{
						width: '4rem',
						height: '4rem',
					}}
				>
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			</Container>
		);
	} else {
		return (
			<div className="w-100 h-100 p-3 " style={{ background: '#323232' }}>
				<h5 className="text-center text-light">Friends</h5>
				{friends.length === 0 ? (
					<p className="text-center text-light">No friends yet :(</p>
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
	}
};

export default FriendsList;
