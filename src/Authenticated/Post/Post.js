import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { ReactComponent as Like } from '../../assets/like.svg';
import { ReactComponent as Comment } from '../../assets/comment.svg';
import { formatDistanceToNow } from 'date-fns';

const Post = ({ postInfo }) => {
	return (
		<Container fluid="sm mt-4" style={{ maxWidth: '600px', padding: '0' }}>
			<Card className="text-light m-3" style={{ background: '#323232' }}>
				<Card.Header className="d-flex align-items-center">
					picture{' '}
					<div>
						eric chi
						<p>time</p>
					</div>
				</Card.Header>
				<Card.Body>comment Text</Card.Body>
				{/* {postInfo.picture.length > 0 && <Card.Img></Card.Img>} */}
				{/* <Card.Img>card img</Card.Img> */}

				<Card.Footer
					className="d-flex justify-content-center"
					style={{ gap: '1rem' }}
				>
					<Button
						variant="outline-dark text-light"
						className="d-flex align-items-center"
						style={{ gap: '.3rem', border: 'none' }}
					>
						<Like />
						Like
					</Button>
					<Button
						variant="outline-dark text-light"
						className="d-flex align-items-center"
						style={{ gap: '.3rem', border: 'none' }}
					>
						<Comment />
						Comment
					</Button>
				</Card.Footer>
			</Card>
		</Container>
	);
};

export default Post;
