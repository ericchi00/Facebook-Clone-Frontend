import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import PictureForm from './PictureForm';
import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';
import Alert from 'react-bootstrap/Alert';

AWS.config.update({
	accessKeyId: process.env.REACT_APP_ACCESS,
	secretAccessKey: process.env.REACT_APP_SECRET,
});

const bucket = new AWS.S3({
	params: { Bucket: process.env.REACT_APP_BUCKET_NAME },
	region: process.env.REACT_APP_REGION,
});

const formStyle = {
	resize: 'none',
	border: 'none',
	outline: 'none',
	background: '#404040',
	color: '#fff',
};

const PostForm = ({ auth, authHeader, newPost, setNewPost }) => {
	const [disabled, setDisabled] = useState(false);
	const [post, setPost] = useState('');
	const [picture, setPicture] = useState();
	const [errorMessage, setErrorMessage] = useState('');
	const [error, setError] = useState(false);
	const [show, setShow] = useState(false);

	const handleSubmit = async () => {
		let pictureURL = '';

		if (picture) {
			const randomFileName = uuidv4();
			const params = {
				Body: picture,
				Bucket: process.env.REACT_APP_BUCKET_NAME,
				Key: randomFileName,
				ContentType: 'image/png',
				ACL: 'public-read',
			};
			bucket.putObject(params, (error, data) => {
				if (error) {
					console.error(error);
				}
			});

			pictureURL = process.env.REACT_APP_S3_URL + randomFileName;
		}
		const postPost = await fetch(`/api/posts/${auth().id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authHeader(),
			},
			body: JSON.stringify({ userPost: post, picture: pictureURL }),
		});
		if (postPost.status === 400) {
			setError(true);
			const error = await postPost.json();
			setErrorMessage(error);
		}
		if (postPost.status === 200) {
			setNewPost(!newPost);
		}
		document.getElementById('post-submission').reset();
	};

	return (
		<Container fluid="sm mt-4" style={{ maxWidth: '600px', padding: '0' }}>
			<Form
				id="post-submission"
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
						className="rounded-circle"
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
				<div className="d-flex justify-content-center" style={{ gap: '.5rem' }}>
					<Button variant="light" onClick={() => setShow(!show)}>
						Add Image
					</Button>
					<Button
						variant="light"
						disabled={disabled}
						type="button"
						onClick={() => handleSubmit()}
					>
						Submit
					</Button>
				</div>
				{error && <Alert variant="danger">{errorMessage}</Alert>}
				{show && (
					<PictureForm
						picture={picture}
						setPicture={setPicture}
						setShow={setShow}
						auth={auth}
						authHeader={authHeader}
						setDisabled={setDisabled}
					/>
				)}
			</Form>
		</Container>
	);
};

export default PostForm;
