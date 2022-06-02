import React, { useEffect } from 'react';
import Login from '../components/Login';
import PostForm from './PostForm';
import UserInfo from './UserInfo';
import Friends from './Friends/Friends';
import { useIsAuthenticated } from 'react-auth-kit';
import Container from 'react-bootstrap/Container';
import useCheckMobileScreen from '../hooks/useCheckMobileScreen';

const Home = ({ auth, authHeader }) => {
	const checkMobile = useCheckMobileScreen();
	const isAuthenticated = useIsAuthenticated();

	useEffect(() => {
		document.title = 'Facebook Clone';
	});

	if (isAuthenticated()) {
		return (
			<Container
				fluid="lg"
				className="d-flex justify-content-between"
				style={{
					gap: '1rem',
				}}
			>
				{!checkMobile && <UserInfo auth={auth} />}
				<PostForm auth={auth} authHeader={authHeader} />
				{!checkMobile && <Friends auth={auth} authHeader={authHeader} />}
			</Container>
		);
	} else {
		return (
			<>
				<Login />
			</>
		);
	}
};

export default Home;
