import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { ReactComponent as Github } from '../assets/github.svg';

const Footer = () => {
	return (
		<Navbar className="w-100" fixed="bottom" style={{ background: '#323232' }}>
			<Container
				fluid
				className="justify-content-center"
				style={{ color: 'white' }}
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
