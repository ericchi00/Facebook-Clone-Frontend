import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { formatDistanceToNowStrict } from 'date-fns';
import { ReactComponent as Like } from '../../assets/like.svg';

const Comment = ({ comment }) => {
	return (
		<Card
			style={{
				background: '#323232',
				border: 'none',
			}}
		>
			<Card.Header
				className="d-flex justify-content-center p-3"
				style={{ gap: '.5rem', border: 'none' }}
			>
				<Link to={`/profile/${comment.name._id}`}>
					<img
						style={{ cursor: 'pointer' }}
						src={comment.name.picture}
						width={32}
						height={32}
						className="rounded-circle mt-2"
						alt=""
					/>
				</Link>
				<div className="w-100 rounded p-2" style={{ background: '#404040' }}>
					<Link
						className="text-light"
						to={`/profile/${comment.name._id}`}
						style={{ textDecoration: 'none', fontSize: '.8rem' }}
					>
						{comment.name.firstName + ' ' + comment.name.lastName}
					</Link>
					<p style={{ fontSize: '.8rem', margin: '0' }}>{comment.text}</p>
					<div className="d-flex justify-content-end align-items-center">
						<div style={{ fontSize: '.8rem' }}>
							{formatDistanceToNowStrict(new Date(comment.createdAt))} ago
						</div>
						<Button
							variant="outline-dark text-light"
							className="d-flex align-items-center float-end"
							style={{ border: 'none', gap: '.3rem' }}
						>
							<Like /> 0
						</Button>
					</div>
				</div>
			</Card.Header>
		</Card>
	);
};
export default Comment;
