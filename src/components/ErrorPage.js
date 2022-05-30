import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const ErrorPage = () => {
	document.title = 'Error 404';

	return (
		<Container fluid className="d-flex mt-5 pt-5 justify-content-center">
			<div className="text-center text-light">
				<h1 className="display-1 fw-bold text-light">404</h1>
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
