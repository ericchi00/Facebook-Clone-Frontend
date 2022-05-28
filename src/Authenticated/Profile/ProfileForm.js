import React, { useState } from 'react';
import { Form as BootstrapForm } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/InputField';
import { useAuthUser, useAuthHeader, useSignIn } from 'react-auth-kit';
import { useParams } from 'react-router-dom';
import { Convert } from 'mongo-image-converter';

const ProfileForm = ({ setEditProfile }) => {
	const { id } = useParams();
	const [error, setError] = useState(false);
	const [imageError, setImageError] = useState(false);
	const [image, setImage] = useState('');

	const auth = useAuthUser();
	const authHeader = useAuthHeader();
	const signIn = useSignIn();

	const convertImage = async (image) => {
		try {
			// reset error if user reuploads
			setImageError(false);
			if (image.size < 10e7) {
				const convertedImage = await Convert(image);
				if (convertedImage) {
					setImage(convertedImage);
					return;
				} else {
					setImage('');
					setImageError(true);
					return;
				}
			}
			throw Error('Image is too big or not the correct format');
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Formik
			initialValues={{
				firstName: auth().firstName,
				lastName: auth().lastName,
				email: auth().email,
				password: '',
				picture: '',
			}}
			validationSchema={Yup.object({
				firstName: Yup.string()
					.max(15, 'Must be 15 characters or less')
					.trim()
					.matches(/^[a-zA-Z]+$/, 'Only letters allowed')
					.required('First name required'),
				lastName: Yup.string()
					.max(20, 'Must be 20 characters or less')
					.trim()
					.matches(/^[a-zA-Z]+$/, 'Only letters allowed')
					.required('Last name required'),
				email: Yup.string()
					.email('Invalid email address')
					.max(255)
					.required('Email is required.'),
				password: Yup.string()
					.min(5, 'Must be at least 5 characters')
					.required('Password is required'),
			})}
			onSubmit={async (values, { setSubmitting }) => {
				convertImage();
				values.picture = image;
				const putUserInfo = await fetch(`/users/profile/${id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: authHeader(),
					},
					body: JSON.stringify(values),
				});
				const response = await putUserInfo.json();
				if (putUserInfo.status === 401) {
					return setError(true);
				}
				if (putUserInfo.status === 200) {
					// update auth token to new token to ensure user is still authenticated
					if (
						signIn({
							token: response.token,
							expiresIn: response.expiresIn,
							tokenType: 'Bearer',
							authState: response.authState,
						})
					) {
						setEditProfile(false);
					} else {
						const error = new Error('An error has occurred.');
						console.error(error);
					}
				}
				setSubmitting(false);
			}}
		>
			<Form className="w-75">
				<BootstrapForm.Group className="mb-3">
					<InputField
						label="First Name"
						name="firstName"
						type="text"
						className="form-control"
					/>
				</BootstrapForm.Group>
				<BootstrapForm.Group className="mb-3">
					<InputField
						label="Last Name"
						name="lastName"
						type="text"
						className="form-control"
					/>
				</BootstrapForm.Group>
				<BootstrapForm.Group className="mb-3">
					<InputField
						label="Email"
						name="email"
						type="email"
						className="form-control"
					/>
				</BootstrapForm.Group>
				<BootstrapForm.Group className="mb-3">
					<InputField
						label="Password"
						name="password"
						type="password"
						className="form-control"
						placeholder="Enter your current password"
					/>
				</BootstrapForm.Group>
				<BootstrapForm.Group className="mb-3">
					<BootstrapForm.Label>Profile Picture</BootstrapForm.Label>
					<input
						className="form-control"
						name="picture"
						type="file"
						accpet="image/png, image/jpeg"
						onChange={(e) => convertImage(e.target.files[0])}
					/>
				</BootstrapForm.Group>
				{error ? (
					<Alert variant="danger" className="p-2">
						Email is already in use.
					</Alert>
				) : null}
				{imageError ? (
					<Alert variant="danger" className="p-2">
						Image must be in png or jpeg format and smaller than 10 MB.
					</Alert>
				) : null}
				<div className="d-flex justify-content-center" style={{ gap: '1rem' }}>
					<Button variant="primary" type="submit" disabled={imageError}>
						Save Changes
					</Button>
					<Button
						variant="danger"
						type="button"
						onClick={() => setEditProfile(false)}
					>
						Cancel Changes
					</Button>
				</div>
			</Form>
		</Formik>
	);
};

export default ProfileForm;
