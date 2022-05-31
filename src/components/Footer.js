import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import useCheckMobileScreen from '../hooks/useCheckMobileScreen';
import { ReactComponent as Github } from '../assets/github.svg';

const Footer = () => {
	const check = useCheckMobileScreen();

	return (
		<>
			{!check && (
				<Navbar
					className="d-flex mt-auto justify-content-center"
					style={{ background: '#323232' }}
				>
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
						<Nav.Link
							href="https://github.com/ericchi00/Facebook-Clone-Frontend"
							style={{ color: 'white' }}
						>
							Source Code
						</Nav.Link>
						<Nav.Link
							href="https://github.com/ericchi00/Facebook-Clone-Backend"
							style={{ color: 'white' }}
						>
							Backend Source Code
						</Nav.Link>
					</Container>
				</Navbar>
			)}
		</>
	);
};

export default Footer;
