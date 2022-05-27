import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const ErrorPage = () => {
	document.title = 'Error 404';

	return (
		<Container fluid style={{ marginTop: 'auto', marginBottom: 'auto' }}>
			<div className="text-center">
				<h1 className="display-1 fw-bold">404</h1>
				<p className="fs-3">
					<span className="text-danger">Opps!</span> Page not found.
				</p>
				<p className="lead">The page you’re looking for doesn’t exist.</p>
				<Button as={Link} to="/" variant="secondary">
					Go Home
				</Button>
			</div>
		</Container>
	);
};

export default ErrorPage;
