import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import FriendRequest from './FriendRequest';
import FriendsList from './FriendsList';

const Friends = ({ auth, authHeader }) => {
	const [rerender, setRerender] = useState(false);
	return (
		<Container
			fluid="sm mt-4 d-flex flex-column"
			style={{
				maxWidth: '300px',
				background: '#323232',
				height: 'fit-content',
			}}
		>
			<FriendRequest
				auth={auth}
				authHeader={authHeader}
				rerender={rerender}
				setRerender={setRerender}
			/>
			<FriendsList auth={auth} authHeader={authHeader} rerender={rerender} />
		</Container>
	);
};

export default Friends;
