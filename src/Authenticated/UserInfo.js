import React from 'react';
import Container from 'react-bootstrap/Container';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useSignOut } from 'react-auth-kit';

const className = 'text-light d-flex align-items-center justify-content-center';

const UserInfo = ({ auth }) => {
	const id = auth().id;
	const signOut = useSignOut();
	const fullName = auth().firstName + ' ' + auth().lastName;
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
					className={className}
					variant="outline-dark"
					as={Link}
					to={`/profile/${id}`}
					style={{ gap: '.5rem', border: 'none', height: '56px' }}
				>
					<img
						src={auth().picture}
						alt="your profile"
						width={24}
						height={24}
						className="rounded-circle"
					/>
					{' ' + fullName}
				</Button>
				<Button
					className={className}
					variant="outline-dark"
					as={Link}
					to={`/profile/${id}`}
					style={{ border: 'none', height: '56px' }}
				>
					Account
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
