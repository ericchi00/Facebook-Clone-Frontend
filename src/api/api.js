const API =
	'https://infinite-ridge-47874.herokuapp.com/https://backend-facebookclone.herokuapp.com/api';

const getAllPosts = async (authHeader) => {
	try {
		const getPosts = await fetch(API + '/posts', {
			method: 'GET',
			headers: {
				Authorization: authHeader,
			},
		});
		if (getPosts.status === 200) {
			return await getPosts.json();
		}
	} catch (error) {
		return error;
	}
};

const getFriends = async (authHeader, ID) => {
	const getAllFriends = await fetch(API + '/friends/' + ID, {
		method: 'GET',
		headers: {
			Authorization: authHeader,
		},
	});
	if (getAllFriends.status === 200) {
		return await getAllFriends.json();
	}
};

export { getAllPosts, getFriends };
