import React from 'react';
import {
  render,
  cleanup,
  screen,
} from '@testing-library/react';

import Episodes from './Episodes';

afterEach(cleanup);

test('<Episodes /> renders without crashing', () => {
  render(<Episodes />);
});

test('<Episodes /> loading skeleton should render', () => {
  render(<Episodes />);
  expect(screen.getAllByTestId('skeleton-loader')).toBeTruthy();
});
