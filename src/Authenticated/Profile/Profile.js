import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import ProfileCard from './ProfileCard';
import Post from '../Post/Post';
import Friends from '../Friends/Friends';
import useCheckMobileScreen from '../../hooks/useCheckMobileScreen';

const Profile = ({ auth, authHeader }) => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [info, setInfo] = useState('');
	const [loading, setLoading] = useState(true);
	const [isUserProfile, setIsUserProfile] = useState(false);
	const [profileChange, setProfileChange] = useState(false);
	const [userPosts, setUserPosts] = useState([]);

	const [style, setStyle] = useState();
	const checkMobile = useCheckMobileScreen();

	useEffect(() => {
		setLoading(true);
		if (id === auth().id) {
			setIsUserProfile(true);
		} else {
			setIsUserProfile(false);
		}
		getInfo();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, profileChange]);

	const getInfo = async () => {
		const response = await fetch(`/api/profile/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authHeader(),
			},
		});
		if (response.status === 500) {
			return navigate('*');
		}
		const profileInfo = await response.json();
		setInfo(profileInfo);
		document.title = profileInfo.firstName + ' ' + profileInfo.lastName;
		getUserPosts();
		setLoading(false);
	};

	const getUserPosts = async () => {
		const getPosts = await fetch(`/api/profile/${id}/posts`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authHeader(),
			},
		});
		if (getPosts.status === 200) {
			const response = await getPosts.json();
			setUserPosts(response);
		}
	};

	return (
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
					className={
						!checkMobile
							? 'd-flex justify-content-center'
							: 'd-flex flex-column'
					}
					style={{ gap: '1rem' }}
				>
					<div>
						<ProfileCard
							auth={auth}
							authHeader={authHeader}
							isUserProfile={isUserProfile}
							info={info}
							setProfileChange={setProfileChange}
						/>
						<Friends auth={auth} authHeader={authHeader} width={'600px'} />
					</div>
					{userPosts.length > 0 && (
						<div style={{ minWidth: '300px' }}>
							{userPosts.map((postInfo) => {
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
					)}
				</Container>
			)}
		</>
	);
};
export default Profile;
