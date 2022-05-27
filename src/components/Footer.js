import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const Footer = () => {
	return (
		<Navbar bg="dark" variant="dark" className="w-100" fixed="bottom">
			<Container fluid className="justify-content-center">
				<Navbar.Text>Built by Eric Chi.</Navbar.Text>
				<Nav.Link href="">Backend API</Nav.Link>
				<Nav.Link href="">Backend API Source Code</Nav.Link>
			</Container>
		</Navbar>
	);
};

export default Footer;
