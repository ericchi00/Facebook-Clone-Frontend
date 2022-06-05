import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import FriendRequest from './FriendRequest';
import FriendsList from './FriendsList';
import { useParams, useLocation } from 'react-router-dom';

const Friends = ({ auth, authHeader, width }) => {
	const { id } = useParams();
	const location = useLocation();
	const [rerender, setRerender] = useState(false);
	return (
		<Container
			fluid="sm mt-4 d-flex flex-column rounded"
			style={{
				maxWidth: width,
				background: '#323232',
				height: 'fit-content',
			}}
		>
			{(location.pathname === '/' ||
				id === auth().id ||
				location.pathname === '/people') && (
				<FriendRequest
					auth={auth}
					authHeader={authHeader}
					rerender={rerender}
					setRerender={setRerender}
				/>
			)}
			<FriendsList auth={auth} authHeader={authHeader} rerender={rerender} />
		</Container>
	);
};

export default Friends;
