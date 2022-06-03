import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
import PeopleItem from './PeopleItem';
import UserInfo from './UserInfo';
import Friends from './Friends/Friends';
import useCheckMobileScreen from '../hooks/useCheckMobileScreen';

const People = ({ auth, authHeader }) => {
	const checkMobile = useCheckMobileScreen();
	const [loading, setLoading] = useState(true);
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getUsers = async () => {
		const getUserProfiles = await fetch(`/api/profiles/${auth().id}`, {
			method: 'GET',
			headers: {
				Authorization: authHeader(),
			},
		});

		if (getUserProfiles.status === 200) {
			const response = await getUserProfiles.json();
			setUsers(response);
			setLoading(false);
		}
	};

	return (
		<>
			<Container
				fluid="lg"
				className="d-flex justify-content-between"
				style={{
					gap: '1rem',
				}}
			>
				{!checkMobile && <UserInfo auth={auth} />}
				{loading ? (
					<Container className="d-flex align-items-center justify-content-center">
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
					</Container>
				) : (
					<ListGroup className="w-100 mt-4 rounded" variant="flush">
						{users.map((user) => {
							return (
								<PeopleItem
									key={user._id}
									user={user}
									auth={auth}
									authHeader={authHeader}
								/>
							);
						})}
					</ListGroup>
				)}

				{!checkMobile && <Friends auth={auth} authHeader={authHeader} />}
			</Container>
		</>
	);
};

export default People;
