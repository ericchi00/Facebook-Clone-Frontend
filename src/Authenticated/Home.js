import React, { useEffect, useState } from 'react';
import Login from '../components/Login';
import PostForm from './Post/PostForm';
import UserInfo from './UserInfo';
import Friends from './Friends/Friends';
import Post from './Post/Post';
import { useIsAuthenticated } from 'react-auth-kit';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import useCheckMobileScreen from '../hooks/useCheckMobileScreen';

const Home = ({ auth, authHeader }) => {
	const [loading, setLoading] = useState(true);
	const [posts, setPosts] = useState([]);
	const [newPost, setNewPost] = useState(false);

	const isAuthenticated = useIsAuthenticated();
	const checkMobile = useCheckMobileScreen();

	useEffect(() => {
		document.title = 'One Piece FaceBook';
		if (isAuthenticated()) {
			getAllPosts();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newPost, isAuthenticated()]);

	const getAllPosts = async () => {
		const getPosts = await fetch(
			`https://infinite-ridge-47874.herokuapp.com/https://backend-facebookclone.herokuapp.com/api/posts`,
			{
				method: 'GET',
				headers: {
					Authorization: authHeader(),
				},
			}
		);
		if (getPosts.status === 200) {
			const response = await getPosts.json();
			setPosts(response);
			setLoading(false);
		}
	};
	return (
		<>
			{isAuthenticated() && (
				<>
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
						<Container
							fluid="lg"
							className="d-flex justify-content-between"
							style={{ gap: '1rem' }}
						>
							{!checkMobile && <UserInfo auth={auth} />}
							<div className="w-100 d-flex flex-column align-items-center">
								<PostForm
									auth={auth}
									authHeader={authHeader}
									newPost={newPost}
									setNewPost={setNewPost}
								/>
								{posts.map((postInfo) => {
									return (
										<Post
											auth={auth}
											authHeader={authHeader}
											postInfo={postInfo}
											key={postInfo._id}
										/>
									);
								})}
							</div>
							{!checkMobile && (
								<Friends auth={auth} authHeader={authHeader} width={'300px'} />
							)}
						</Container>
					)}
				</>
			)}
			{!isAuthenticated() && <Login />}
		</>
	);
};

export default Home;
