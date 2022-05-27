import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { RequireAuth, useIsAuthenticated } from 'react-auth-kit';
import Header from '../Authenticated/Header';
import Home from '../Authenticated/Home';
import Profile from '../Authenticated/Profile/Profile';
import Footer from '../components/Footer';
import ErrorPage from '../components/ErrorPage';

const RoutesComponent = () => {
	const isAuthenticated = useIsAuthenticated();

	return (
		<>
			<BrowserRouter basename="/facebook-clone-frontend">
				{isAuthenticated() ? <Header /> : null}
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/profile/:id"
						element={
							<RequireAuth loginPath="/">
								<Profile />
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
