import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { ReactComponent as Github } from '../assets/github.svg';

const Footer = () => {
	return (
		<Navbar bg="dark" variant="dark" className="w-100" fixed="bottom">
			<Container
				fluid
				className="justify-content-center"
				style={{ color: '#fff' }}
			>
				<Github />
				<Nav.Link
					href="https://github.com/ericchi00"
					style={{ color: 'white' }}
				>
					Eric Chi
				</Nav.Link>
				<Nav.Link href="" style={{ color: 'white' }}>
					Source Code
				</Nav.Link>
			</Container>
		</Navbar>
	);
};

export default Footer;
