import React from 'react';
import { useSignOut } from 'react-auth-kit';
import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ReactComponent as Profile } from '../assets/profile.svg';
import { ReactComponent as FaceBookIcon } from '../assets/facebook.svg';

const Header = ({ auth }) => {
	const fullName = auth().firstName + ' ' + auth().lastName;
	const id = auth().id;
	const navigate = useNavigate();
	const signOut = useSignOut();

	return (
		<Navbar style={{ background: '#30475E' }}>
			<Container fluid="xxl">
				<Navbar.Brand as={Link} to="/" style={{ color: '#fff', gap: '.5rem' }}>
					<FaceBookIcon />
					<Navbar.Text style={{ paddingLeft: '1rem', color: '#fff' }}>
						Facebook Clone
					</Navbar.Text>
				</Navbar.Brand>
				<NavDropdown
					title={<Profile />}
					id="nav-dropdown-settings"
					menuVariant="dark"
					align="end"
				>
					<NavDropdown.Item
						as={Link}
						to={`/profile/${id}`}
						className="d-flex align-items-center"
						style={{ gap: '.5rem' }}
					>
						<img
							width={30}
							height={30}
							alt="profile pic"
							src={auth().picture}
							className="rounded-circle"
						/>
						<div className="d-flex flex-column">
							{fullName}
							<small>See your profile</small>
						</div>
					</NavDropdown.Item>
					<NavDropdown.Item>Friends</NavDropdown.Item>
					<NavDropdown.Item>Messages</NavDropdown.Item>
					<NavDropdown.Item
						className="w-auto"
						onClick={() => {
							navigate('/');
							signOut();
						}}
					>
						Log Out
					</NavDropdown.Item>
				</NavDropdown>
			</Container>
		</Navbar>
	);
};

export default Header;
