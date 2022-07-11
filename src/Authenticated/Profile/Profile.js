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

	const checkMobile = useCheckMobileScreen();

	useEffect(() => {
		setLoading(true);
		if (id === auth().id) {
			setIsUserProfile(true);
		} else {
			setIsUserProfile(false);
		}
		getUserInfo();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, profileChange]);

	const getUserInfo = async () => {
		const [userInfo, userPost] = await Promise.all([
			fetch(
				`https://infinite-ridge-47874.herokuapp.com/https://backend-facebookclone.herokuapp.com/api/profile/${id}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: authHeader(),
					},
				}
			),
			fetch(
				`https://infinite-ridge-47874.herokuapp.com/https://backend-facebookclone.herokuapp.com/api/profile/${id}/posts`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: authHeader(),
					},
				}
			),
		]);
		if (userInfo.status === 500 || userPost.status === 500) {
			return navigate('*');
		}
		const userInfoResponse = await userInfo.json();
		const userPostResponse = await userPost.json();
		setInfo(userInfoResponse);
		setUserPosts(userPostResponse);
		document.title =
			userInfoResponse.firstName + ' ' + userInfoResponse.lastName;
		setLoading(false);
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
							: 'd-flex flex-column align-items-center'
					}
					style={{ gap: '1rem' }}
				>
					<div className="w-100">
						<ProfileCard
							auth={auth}
							authHeader={authHeader}
							isUserProfile={isUserProfile}
							info={info}
							profileChange={profileChange}
							setProfileChange={setProfileChange}
						/>
						<Friends auth={auth} authHeader={authHeader} width={'600px'} />
					</div>
					{userPosts.length > 0 && (
						<div className="w-100 d-flex flex-column align-items-center">
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
