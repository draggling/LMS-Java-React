import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Spinner from '../Spinner';

it('renders without crashing', () => {
	const { asFragment } = render(Spinner());
	expect(asFragment()).toMatchSnapshot();
});

it('renders without crashing with key', () => {
	const { asFragment } = render(Spinner(111));
	expect(asFragment()).toMatchSnapshot();
});
