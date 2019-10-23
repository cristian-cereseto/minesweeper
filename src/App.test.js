import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import App from './App';

afterEach(cleanup);

it('<App /> renders without crashing', () => {
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
