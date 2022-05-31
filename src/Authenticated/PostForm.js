import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

const formStyle = {
	resize: 'none',
	border: 'none',
	outline: 'none',
	background: '#404040',
	color: '#fff',
};

const PostForm = ({ auth, authHeader }) => {
	const id = auth().id;
	const [disabled, setDisabled] = useState(true);
	const [post, setPost] = useState('');

	useEffect(() => {
		if (post.length > 1) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [post]);

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
		<Container fluid="sm mt-4" style={{ maxWidth: '600px' }}>
			<Form
				className="rounded d-flex flex-column p-3"
				style={{ background: '#323232' }}
			>
				<Form.Group
					className="p-3 d-flex align-items-center"
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
				</Form.Group>
				<Button variant="light" disabled={disabled} type="submit">
					Post
				</Button>
			</Form>
		</Container>
	);
};

export default PostForm;
