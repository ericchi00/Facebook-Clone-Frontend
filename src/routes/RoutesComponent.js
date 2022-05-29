import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import {
	RequireAuth,
	useIsAuthenticated,
	useAuthUser,
	useAuthHeader,
} from 'react-auth-kit';
import Header from '../Authenticated/Header';
import Home from '../Authenticated/Home';
import Profile from '../Authenticated/Profile/Profile';
import Footer from '../components/Footer';
import ErrorPage from '../components/ErrorPage';

const RoutesComponent = () => {
	const isAuthenticated = useIsAuthenticated();
	const auth = useAuthUser();
	const authHeader = useAuthHeader();

	return (
		<>
			<BrowserRouter basename="/facebook-clone-frontend">
				{isAuthenticated() ? <Header auth={auth} /> : null}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/profile/:id"
						element={
							<RequireAuth loginPath="/">
								<Profile auth={auth} authHeader={authHeader} />
							</RequireAuth>
						}
					/>
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</BrowserRouter>
			<Footer />
		</>
	);
};

export default RoutesComponent;
