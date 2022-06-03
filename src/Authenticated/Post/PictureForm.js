import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

const PictureForm = ({
	auth,
	authHeader,
	setShow,
	setPicture,
	picture,
	setDisabled,
}) => {
	const [errorMessage, setErrorMessage] = useState('');
	const [showError, setShowError] = useState(false);

	useEffect(() => {
		checkFile();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [picture]);

	const checkFile = () => {
		setShowError(false);
		setErrorMessage('');
		if (picture) {
			if (picture.type === 'image/png' || picture.type === 'image/jpeg') {
				setDisabled(false);
				return;
			} else if (picture.size > 10e6) {
				setErrorMessage('File size is too big');
				setShowError(true);
				setDisabled(true);
				return;
			}
			setErrorMessage('File must be png or jpeg.');
			setShowError(true);
		}
	};

	return (
		<>
			<Form.Group className="m-3" controlId="uploadPostImage">
				<Form.Label className="text-light visually-hidden">
					Upload Image to Post
				</Form.Label>
				<input
					className="form-control"
					name="picture"
					type="file"
					accept="image/png, image/jpeg, image/jpg"
					onChange={(e) => {
						setPicture(e.target.files[0]);
					}}
				/>
				<Form.Text className="text-muted">.PNG OR JPEG ONLY</Form.Text>
			</Form.Group>
			{showError && <Alert variant="danger">{errorMessage}</Alert>}
			<div className="d-flex justify-content-center" style={{ gap: '.5rem' }}>
				<Button variant="primary" type="reset">
					Clear Image
				</Button>
				<Button variant="secondary" type="reset" onClick={() => setShow(false)}>
					Cancel Image Upload
				</Button>
			</div>
		</>
	);
};

export default PictureForm;
