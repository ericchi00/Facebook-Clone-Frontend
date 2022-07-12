import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { formatDistanceToNowStrict } from 'date-fns';
import LikeSvg from '../../assets/LikeSvg';
import apiURL from '../../api';

const Comment = ({ auth, authHeader, comment }) => {
	const [likes, setLikes] = useState(comment.likes.length);
	const [userLiked, setUserLiked] = useState(
		comment.likes.includes(auth().id || false)
	);

	const handleLikes = async () => {
		if (userLiked) setLikes(likes - 1);
		if (!userLiked) setLikes(likes + 1);
		const putCommentLike = await fetch(
			apiURL + `/api/posts/comments/${comment._id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: authHeader(),
				},
				body: JSON.stringify({ name: auth().id }),
			}
		);
		if (putCommentLike.status === 200) {
			setUserLiked(!userLiked);
		}
	};

	return (
		<Card
			style={{
				background: '#323232',
				border: 'none',
			}}
		>
			<Card.Header
				className="d-flex justify-content-center p-3"
				style={{ gap: '.5rem', border: 'none' }}
			>
				<Link to={`/profile/${comment.name._id}`}>
					<img
						style={{ cursor: 'pointer' }}
						src={comment.name.picture}
						width={32}
						height={32}
						className="rounded-circle mt-2"
						alt=""
					/>
				</Link>
				<div className="w-100 rounded p-2" style={{ background: '#404040' }}>
					<Link
						className="text-light"
						to={`/profile/${comment.name._id}`}
						style={{ textDecoration: 'none', fontSize: '.8rem' }}
					>
						{comment.name.firstName + ' ' + comment.name.lastName}
					</Link>
					<p style={{ fontSize: '.8rem', margin: '0' }}>{comment.text}</p>
					<div className="d-flex justify-content-end align-items-center">
						<div style={{ fontSize: '.8rem' }}>
							{formatDistanceToNowStrict(new Date(comment.createdAt))} ago
						</div>
						<Button
							variant="outline-dark text-light"
							className="d-flex align-items-center float-end"
							style={{ border: 'none', gap: '.3rem' }}
							onClick={() => handleLikes()}
						>
							<LikeSvg
								{...(userLiked ? { color: 'green' } : { color: 'white' })}
							/>
							{likes}
						</Button>
					</div>
				</div>
			</Card.Header>
		</Card>
	);
};
export default Comment;
