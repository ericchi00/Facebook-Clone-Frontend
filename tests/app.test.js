/**
 * @jest-environment jsdom
 */
import { jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../src/App';
import '@testing-library/jest-dom/extend-expect';

test('renders login form', () => {
	render(<App />);
	const loginForm = screen.getByTestId('login-form');
	expect(loginForm).toBeInTheDocument();
});

