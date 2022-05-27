import React from 'react';
import { useAuthUser, useSignOut } from 'react-auth-kit';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import icon from '../assets/facebook.svg';

const Header = () => {
	const auth = useAuthUser();
	const fullName = auth().firstName + ' ' + auth().lastName;
	const id = auth().id;

	const navigate = useNavigate();
	const signOut = useSignOut();

	return (
		<Navbar bg="dark" className="w-100">
			<Container fluid>
				<Navbar.Brand as={Link} to="/" style={{ color: '#fff' }}>
					<img
						src={icon}
						alt="Bootstrap FaceBook Icon"
						className="pe-2"
						width="30"
						height="30"
					/>{' '}
					Facebook Clone
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
						signOut();
						navigate('/');
					}}
				>
					Logout
				</Button>
			</Container>
		</Navbar>
	);
};

export default Header;