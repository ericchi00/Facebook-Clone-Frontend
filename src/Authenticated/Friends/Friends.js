import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import FriendRequest from './FriendRequest';
import FriendsList from './FriendsList';

const Friends = ({ auth, authHeader }) => {
	const [rerender, setRerender] = useState(null);

	useEffect(() => {}, [rerender]);

	return (
		<Container
			fluid="sm mt-4 d-flex flex-column"
			style={{ maxWidth: '300px', background: '#323232' }}
		>
			<FriendRequest
				auth={auth}
				authHeader={authHeader}
				setRerender={setRerender}
			/>
			<FriendsList auth={auth} authHeader={authHeader} rerender={rerender} />
		</Container>
	);
};

export default Friends;
