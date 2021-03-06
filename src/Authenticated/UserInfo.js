import React from 'react';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';

const className = 'text-light d-flex align-items-center justify-content-center';

const UserInfo = ({ auth }) => {
	const fullName = auth().firstName + ' ' + auth().lastName;
	const id = auth().id;
	const signOut = useSignOut();

	return (
		<Container
			fluid="sm mt-4"
			style={{
				maxWidth: '300px',
				padding: '0',
			}}
		>
			<ButtonGroup
				vertical
				className="w-100 rounded"
				style={{ background: '#323232' }}
			>
				<Button
					as={Link}
					to={'/'}
					className={className}
					variant="outline-dark"
					style={{ border: 'none', height: '56px' }}
				>
					Home
				</Button>
				<Button
					className={className}
					variant="outline-dark"
					as={Link}
					to={`/profile/${id}`}
					style={{ gap: '.5rem', border: 'none', height: '56px' }}
				>
					<img
						src={auth().picture}
						alt="your profile"
						width={32}
						height={32}
						className="rounded-circle"
					/>
					{' ' + fullName}
				</Button>
				<Button
					as={Link}
					to={'/people'}
					className={className}
					variant="outline-dark"
					style={{ border: 'none', height: '56px' }}
				>
					People
				</Button>
				<Button
					onClick={() => signOut()}
					className={className}
					variant="outline-dark"
					style={{ border: 'none', height: '56px' }}
				>
					Logout
				</Button>
			</ButtonGroup>
		</Container>
	);
};

export default UserInfo;
