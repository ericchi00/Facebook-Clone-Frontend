import React from 'react';
import { useSignOut } from 'react-auth-kit';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { ReactComponent as FaceBookIcon } from '../assets/facebook.svg';

const Header = ({ auth }) => {
	const fullName = auth().firstName + ' ' + auth().lastName;
	const id = auth().id;

	const navigate = useNavigate();
	const signOut = useSignOut();

	return (
		<Navbar bg="dark" className="w-100">
			<Container fluid>
				<Navbar.Brand as={Link} to="/" style={{ color: '#fff', gap: '.5rem' }}>
					<FaceBookIcon />
					<Navbar.Text style={{ paddingLeft: '1rem', color: '#fff' }}>
						Facebook Clone
					</Navbar.Text>
				</Navbar.Brand>
				<Nav className="me-auto"></Nav>
				<Navbar.Text style={{ color: '#fff', paddingRight: '1rem' }}>
					Signed in as:{' '}
					<Link style={{ color: '#fff' }} to={`/profile/${id}`}>
						{fullName}
					</Link>
				</Navbar.Text>
				<Button
					variant="light"
					onClick={() => {
						navigate('/');
						signOut();
					}}
				>
					Logout
				</Button>
			</Container>
		</Navbar>
	);
};

export default Header;
