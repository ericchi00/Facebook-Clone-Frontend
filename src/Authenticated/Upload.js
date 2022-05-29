import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import AWS from 'aws-sdk';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useAuthHeader, useAuthUser } from 'react-auth-kit';

AWS.config.update({
	accessKeyId: process.env.REACT_APP_ACCESS,
	secretAccessKey: process.env.REACT_APP_SECRET,
});

const bucket = new AWS.S3({
	params: { Bucket: process.env.REACT_APP_BUCKET_NAME },
	region: process.env.REACT_APP_REGION,
});

const Upload = ({ buttonName, setEditPicture, label }) => {
	const [file, setFile] = useState();
	const [disabled, setDisabled] = useState(false);
	const [showError, setShowError] = useState(false);

	const authHeader = useAuthHeader();
	const auth = useAuthUser();

	useEffect(() => {
		if (file) {
			if (file.type === 'image/png' || file.type === 'image/jpeg') {
				return setDisabled(false);
			}
		}
		setDisabled(true);
		setShowError(false);
	}, [file]);

	const uploadFile = async () => {
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

		const putUserPicture = await fetch(`/users/profile/picture/${auth().id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: authHeader(),
			},
			body: JSON.stringify({ picture: s3URL }),
		});

		if (putUserPicture.status !== 200) {
			console.error(new Error('An error has occurred while uploading'));
			setShowError(true);
		}

		// closes profile picture form
		setEditPicture(false);
	};

	return (
		<Form className="w-75">
			<Form.Group className="mb-3" controlId="uploadProfilePicture">
				<Form.Label>{label}</Form.Label>
				<input
					className="form-control"
					name="picture"
					type="file"
					accpet="image/png, image/jpeg, image/jpg"
					onChange={(e) => {
						setFile(e.target.files[0]);
						setDisabled(false);
					}}
				/>
				<Form.Text className="text-muted">.PNG OR JPEG ONLY</Form.Text>
			</Form.Group>
			{showError && (
				<Alert variant="danger">Error whle uploading. Please try again.</Alert>
			)}
			<div className="d-flex justify-content-center" style={{ gap: '1rem' }}>
				<Button
					variant="outline-primary"
					type="button"
					onClick={() => uploadFile()}
					disabled={disabled}
				>
					{buttonName}
				</Button>
				<Button variant="outline-danger" onClick={() => setEditPicture(false)}>
					Cancel Update
				</Button>
			</div>
		</Form>
	);
};

export default Upload;
