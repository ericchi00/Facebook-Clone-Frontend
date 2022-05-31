import React, { useState } from 'react';
import { Form as BootstrapForm } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from '../../components/InputField';
import { useAuthUser, useAuthHeader, useSignIn } from 'react-auth-kit';
import { useParams } from 'react-router-dom';

const ProfileForm = ({ setSubmitChanges, setEditProfile }) => {
	const { id } = useParams();
	const [error, setError] = useState(false);

	const auth = useAuthUser();
	const authHeader = useAuthHeader();
	const signIn = useSignIn();

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
				const putUserInfo = await fetch(`/api/profile/${id}`, {
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
						setSubmitChanges(true);
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
				{error ? (
					<Alert variant="danger" className="p-2">
						Email is already in use.
					</Alert>
				) : null}
				<div className="d-flex justify-content-center" style={{ gap: '1rem' }}>
					<Button variant="primary" type="submit">
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
