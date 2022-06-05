import React, { useState } from 'react';
import Comment from './Comment';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import LikeSvg from '../../assets/LikeSvg';
import { ReactComponent as CommentIcon } from '../../assets/comment.svg';
import { formatDistanceToNow } from 'date-fns';

const Post = ({ auth, authHeader, postInfo }) => {
	const [comment, setComment] = useState();
	const [newComment, setNewComment] = useState(false);
	const [commentList, setCommentList] = useState(postInfo.comments);
	const [showCommentBox, setShowCommentBox] = useState(false);
	const [error, setError] = useState(false);

	const [likes, setLikes] = useState(postInfo.likes.length);
	const [userLiked, setUserLiked] = useState(
		postInfo.likes.includes(auth().id) || false
	);

	const getComments = async () => {
		const postComment = await fetch(`/api/posts/${postInfo._id}/comments`, {
			method: 'GET',
			headers: {
				Authorization: authHeader(),
			},
		});
		if (postComment.status === 200) {
			const response = await postComment.json();
			setCommentList(response.comments);
		}
	};

	const handleComment = async () => {
		const postComment = await fetch(`/api/posts/${postInfo._id}/comments`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authHeader(),
			},
			body: JSON.stringify({ name: auth().id, text: comment }),
		});
		if (postComment.status === 400) {
			const response = await postComment.json();
			console.log(response);
			setError(true);
		}
		if (postComment.status === 200) {
			setNewComment(!newComment);
		}
		document.getElementById('post-comment').value = '';
		// grabs comments again after posting comment
		getComments();
	};

	const handleLikes = async () => {
		if (!userLiked) setLikes(likes + 1);
		if (userLiked) setLikes(likes - 1);
		const putPostLike = await fetch(`/api/posts/${postInfo._id}/`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authHeader(),
			},
			body: JSON.stringify({ name: auth().id }),
		});
		if (putPostLike.status === 200) {
			setUserLiked(!userLiked);
		}
	};

	return (
		<Card
			className="text-light mb-4 w-100"
			style={{ background: '#323232', maxWidth: '600px' }}
		>
			<Card.Header
				className="d-flex align-items-center"
				style={{ gap: '.5rem' }}
			>
				<Link to={`/profile/${postInfo.name._id}`}>
					<img
						style={{ cursor: 'pointer' }}
						src={postInfo.name.picture}
						width={32}
						height={32}
						className="rounded-circle"
						alt={`${postInfo.name.firstName} + profile pic`}
					/>
				</Link>
				<div>
					<Link
						className="text-light"
						to={`/profile/${postInfo.name._id}`}
						style={{ textDecoration: 'none' }}
					>
						{postInfo.name.firstName + ' ' + postInfo.name.lastName}
					</Link>

					<p>
						<small>
							{formatDistanceToNow(new Date(postInfo.createdAt), {
								includeSeconds: true,
								addSuffix: true,
							})}
						</small>
					</p>
				</div>
			</Card.Header>
			<Card.Body>
				<Card.Text>{postInfo.text}</Card.Text>
				{postInfo.picture.length > 0 && (
					<Card.Img
						src={postInfo.picture}
						alt={`${postInfo.name.firstName} + 'post pic'`}
					/>
				)}
				<Card.Text className="mt-1">
					<small style={{ fontSize: '.8rem' }}>{likes} Likes</small>
				</Card.Text>
			</Card.Body>
			<Card.Footer
				className="d-flex justify-content-center"
				style={{ gap: '1rem' }}
			>
				<Button
					variant="outline-dark text-light"
					className="d-flex align-items-center"
					style={{ gap: '.3rem', border: 'none' }}
					onClick={() => handleLikes()}
				>
					<LikeSvg color="white" />
					{userLiked ? 'Unlike' : 'Like'}
				</Button>

				<Button
					variant="outline-dark text-light"
					className="d-flex align-items-center"
					style={{ gap: '.3rem', border: 'none' }}
					onClick={() => setShowCommentBox(!showCommentBox)}
				>
					<CommentIcon />
					Comment
				</Button>
			</Card.Footer>
			{showCommentBox && (
				<>
					<Card.Footer className="d-flex" style={{ gap: '.5rem' }}>
						<Form.Label className="visually-hidden">Comment</Form.Label>
						<Form.Control
							onChange={(e) => {
								setComment(e.target.value);
								setError(false);
							}}
							type="text"
							placeholder="Write a comment..."
							id="post-comment"
							style={{
								background: '#404040',
								color: '#fff',
								border: 'none',
							}}
						/>
						<Button variant="light" onClick={() => handleComment()}>
							Post
						</Button>
					</Card.Footer>
					{error && (
						<Alert variant="danger">
							Comment must be longer than one character.
						</Alert>
					)}
				</>
			)}
			{commentList.length > 0 && (
				<Card.Footer className="p-0">
					{commentList.map((comment) => {
						return (
							<Comment
								key={comment._id}
								comment={comment}
								auth={auth}
								authHeader={authHeader}
							/>
						);
					})}
				</Card.Footer>
			)}
		</Card>
	);
};

export default Post;
