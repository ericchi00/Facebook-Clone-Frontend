import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Form as BootstrapForm } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import ListGroup from 'react-bootstrap/ListGroup';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import InputField from './InputField';
import apiURL from '../api';

const Register = ({ show, onHide, setModalShow }) => {
	const [errors, setErrors] = useState(null);
	const [showError, setShowError] = useState(false);
	const [registerSuccess, setRegisterSuccess] = useState(false);

	return (
		<Modal
			show={show}
			onHide={() => onHide()}
			size="md"
			aria-labelledby="contained-modal-title-vcenter"
			centered
		>
			<Modal.Header style={{ background: '#323232' }} closeButton>
				<Modal.Title id="contained-modal-title-vcenter" className="text-light">
					Sign up
				</Modal.Title>
			</Modal.Header>
			<Modal.Body style={{ background: '#323232' }}>
				<Formik
					initialValues={{
						firstName: '',
						lastName: '',
						email: '',
						password: '',
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
						const registerPost = await fetch(apiURL + '/auth/register', {
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify(values),
						});
						const message = await registerPost.json();
						if ('errors' in message) {
							setErrors(message.errors);
							setShowError(true);
						} else {
							setRegisterSuccess(true);
							setTimeout(() => {
								setModalShow(false);
								setRegisterSuccess(false);
								setErrors(null);
							}, 1100);
						}
						setSubmitting(false);
					}}
				>
					<Form style={{ background: '#323232' }}>
						<BootstrapForm.Group className="mb-1">
							<InputField
								label="Email*"
								name="email"
								type="email"
								className="form-control"
							/>
							<BootstrapForm.Text className="text-muted">
								Email is only used for logging in.
							</BootstrapForm.Text>
						</BootstrapForm.Group>
						<BootstrapForm.Group className="mb-3">
							<InputField
								label="First Name*"
								name="firstName"
								type="text"
								className="form-control"
							/>
						</BootstrapForm.Group>
						<BootstrapForm.Group className="mb-3">
							<InputField
								label="Last Name*"
								name="lastName"
								type="text"
								className="form-control"
							/>
						</BootstrapForm.Group>
						<BootstrapForm.Group className="mb-3">
							<InputField
								label="Password*"
								name="password"
								type="password"
								className="form-control"
							/>
						</BootstrapForm.Group>
						{showError ? (
							<ListGroup>
								{errors.map((error, i) => {
									return (
										<Alert variant="danger" key={i} className="p-2">
											{error.msg}
										</Alert>
									);
								})}
							</ListGroup>
						) : null}
						<div className="d-flex justify-content-center">
							<Button variant="success" type="submit">
								Sign Up
							</Button>
						</div>
						{registerSuccess ? (
							<Alert className="mt-2 text-center" variant="success">
								Reigster successful!
							</Alert>
						) : null}
					</Form>
				</Formik>
			</Modal.Body>
		</Modal>
	);
};

export default Register;
