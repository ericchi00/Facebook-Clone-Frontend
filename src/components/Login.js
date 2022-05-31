import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Form as BootstrapForm } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Formik, Form } from 'formik';
import { useSignIn } from 'react-auth-kit';
import InputField from './InputField';
import Register from './Register';
import * as Yup from 'yup';

const Login = () => {
	const [error, setError] = useState(false);
	const [modalShow, setModalShow] = useState(false);
	const signIn = useSignIn();
	return (
		<>
			<Container
				fluid="md"
				className="d-flex flex-column align-items-center justify-content-center"
				style={{ marginTop: 'auto' }}
			>
				<h2 className="text-light">Facebook Clone</h2>
				<Formik
					initialValues={{
						email: '',
						password: '',
					}}
					validationSchema={Yup.object({
						email: Yup.string()
							.email('Invalid email address')
							.max(255)
							.required('Email is required.'),
						password: Yup.string()
							.min(5, 'Must be at least 5 characters')
							.required('Password is required'),
					})}
					onSubmit={async (values, { setSubmitting }) => {
						const loginPost = await fetch('/auth/login', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(values),
						});
						if (loginPost.status === 500) {
							return setError(true);
						}
						const message = await loginPost.json();
						if (
							signIn({
								token: message.token,
								expiresIn: message.expiresIn,
								tokenType: 'Bearer',
								authState: message.authState,
							})
						) {
						}
						setSubmitting(false);
					}}
				>
					<Form
						className="p-5 rounded d-flex flex-column"
						style={{ background: '#323232' }}
						data-testid="login-form"
					>
						<BootstrapForm.Group className="mb-3 w-auto">
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
							/>
						</BootstrapForm.Group>
						{error ? (
							<Alert variant="danger" className="p-2">
								Incorrect email or password.
							</Alert>
						) : null}
						<Button variant="primary" type="submit">
							Login
						</Button>
						<div className="border-top mt-3 border"></div>
						<Button
							variant="success"
							className="mt-3"
							onClick={() => setModalShow(true)}
						>
							Create new account
						</Button>
						<div className="border-top mt-3 border"></div>
						<Button className="mt-3" variant="warning" type="button">
							Test drive an existing account!
						</Button>
						<Register
							show={modalShow}
							onHide={() => setModalShow(false)}
							setModalShow={setModalShow}
						/>
					</Form>
				</Formik>
			</Container>
		</>
	);
};

export default Login;
