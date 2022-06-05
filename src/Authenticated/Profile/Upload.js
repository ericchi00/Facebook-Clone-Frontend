import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';

AWS.config.update({
	accessKeyId: process.env.REACT_APP_ACCESS,
	secretAccessKey: process.env.REACT_APP_SECRET,
});

const bucket = new AWS.S3({
	params: { Bucket: process.env.REACT_APP_BUCKET_NAME },
	region: process.env.REACT_APP_REGION,
});

const Upload = ({ setEditPicture }) => {
	const [file, setFile] = useState();
	const [disabled, setDisabled] = useState(false);
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [showError, setShowError] = useState(false);

	const authHeader = useAuthHeader();
	const auth = useAuthUser();

	useEffect(() => {
		checkFile();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [file]);

	const checkFile = () => {
		setShowError(false);
		setErrorMessage('');
		setDisabled(true);
		if (file) {
			if (file.type === 'image/png' || file.type === 'image/jpeg') {
				setDisabled(false);
				return;
			} else if (file.size > 10e6) {
				setErrorMessage('File size is too big');
				setShowError(true);
				setDisabled(true);
				return;
			}
			setErrorMessage('File must be png or jpeg.');
			setShowError(true);
		}
	};

	const uploadProfilePicture = async () => {
		const randomFileName = uuidv4();
		const params = {
			Body: file,
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

		const s3URL = process.env.REACT_APP_S3_URL + randomFileName;

		const putUserPicture = await fetch(
			`https://infinite-ridge-47874.herokuapp.com/https://backend-facebookclone.herokuapp.com/api/profile/picture/${
				auth().id
			}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: authHeader(),
				},
				body: JSON.stringify({ picture: s3URL }),
			}
		);

		if (putUserPicture.status !== 200) {
			console.error(new Error('An error has occurred while uploading'));
			setErrorMessage('An error occurred while uploading. Please try again.');
			setShowError(true);
		}

		// update picture link in localStorage
		const authState = JSON.parse(localStorage.getItem('_auth_state'));
		authState['picture'] = s3URL;
		localStorage.setItem('_auth_state', JSON.stringify(authState));

		setDisabled(true);
		setLoading(true);
		// set timeout as picture won't update if page is reloaded instantly
		setTimeout(() => {
			window.location.reload();
		}, 2000);
	};

	return (
		<Form className="w-75">
			<Form.Group className="mb-3" controlId="uploadProfilePicture">
				<Form.Label className="text-light">Profile Picture</Form.Label>
				<input
					className="form-control"
					name="picture"
					type="file"
					accept="image/png, image/jpeg, image/jpg"
					onChange={(e) => {
						setFile(e.target.files[0]);
						setDisabled(false);
					}}
				/>
				<Form.Text className="text-muted">.PNG OR JPEG ONLY</Form.Text>
			</Form.Group>
			{showError && <Alert variant="danger">{errorMessage}</Alert>}
			<div className="d-flex justify-content-center" style={{ gap: '1rem' }}>
				<Button
					variant="primary"
					type="button"
					onClick={() => uploadProfilePicture()}
					disabled={disabled}
				>
					{loading ? (
						<>
							<Spinner
								as="span"
								animation="grow"
								size="sm"
								role="status"
								aria-hidden="true"
							/>
							Loading...
						</>
					) : (
						'Save'
					)}
				</Button>
				<Button variant="secondary" onClick={() => setEditPicture(false)}>
					Cancel
				</Button>
			</div>
		</Form>
	);
};

export default Upload;
