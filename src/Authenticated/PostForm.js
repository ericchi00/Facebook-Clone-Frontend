import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const formStyle = {
	resize: 'none',
	border: 'none',
	outline: 'none',
};

const PostForm = ({ auth, authHeader }) => {
	const id = auth().id;
	const [disabled, setDisabled] = useState(true);
	const [post, setPost] = useState('');

	useEffect(() => {
		if (post.length > 1) {
			setDisabled(false);
		}
	});

	const submitPost = async () => {
		const postUserPost = await fetch(`/api/posts/${id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authHeader(),
			},
		});
	};

	return (
		<Form
			className="mt-4 rounded"
			style={{ width: '600px', background: '#323232' }}
		>
			<Form.Group
				className="m-3 p-3 d-flex align-items-center"
				style={{ gap: '.5rem' }}
				controlId="formStatusPost"
			>
				<Form.Label className="visually-hidden">Post</Form.Label>
				<img
					src={auth().picture}
					alt="your profile"
					width={50}
					height={50}
					className="rounded-circle pe-auto"
				/>
				<Form.Control
					className="rounded"
					as="textarea"
					placeholder={`What's on your mind, ${auth().firstName}?`}
					rows="4"
					style={formStyle}
					onChange={(e) => setPost(e.target.value)}
					name="userPost"
					minLength={1}
					required
				/>
				<Button variant="light" disabled={disabled} type="submit">
					Post
				</Button>
			</Form.Group>
		</Form>
	);
};

export default PostForm;
