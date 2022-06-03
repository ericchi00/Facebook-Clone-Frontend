import React, { useEffect, useState } from 'react';
import Login from '../components/Login';
import PostForm from './Post/PostForm';
import UserInfo from './UserInfo';
import Friends from './Friends/Friends';
import Post from './Post/Post';
import { useIsAuthenticated } from 'react-auth-kit';
import Container from 'react-bootstrap/Container';
import useCheckMobileScreen from '../hooks/useCheckMobileScreen';

const Home = ({ auth, authHeader }) => {
	const [posts, setPosts] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
	const checkMobile = useCheckMobileScreen();
	const isAuthenticated = useIsAuthenticated();

	useEffect(() => {
		document.title = 'Facebook Clone';
	});

	return (
		<>
			{isAuthenticated() && (
				<Container
					fluid="lg"
					className="d-flex justify-content-between"
					style={{
						gap: '1rem',
					}}
				>
					{!checkMobile && <UserInfo auth={auth} />}
					<div className="w-100">
						<PostForm auth={auth} authHeader={authHeader} />
						{posts.map((userInfo, i) => {
							return <Post key={i} />;
						})}
					</div>

					{!checkMobile && <Friends auth={auth} authHeader={authHeader} />}
				</Container>
			)}
			{!isAuthenticated() && <Login />}
		</>
	);
};

export default Home;
