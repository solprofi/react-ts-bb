import React from 'react';
import {
  render, 
  cleanup,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import fetch from 'jest-fetch-mock';

import { characterMockedData } from '../../mockData/Character';
import Character from './Character';

beforeEach(() => {
  // fetch.resetMocks();
  fetch.mockResponseOnce(JSON.stringify({ data: characterMockedData }));
})

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

// mocking use params hook to game 'name' param
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useParams: () => ({ name: 'Jesse Pinkman', })
}));

test('<Character /> renders data after mock request', async () => {
  const { debug } = render(
    <MemoryRouter>
      <Character />
    </MemoryRouter>
  );

  await waitForElementToBeRemoved(() => screen.getByTestId('character-loader'));

  expect(screen.getByTestId('character-image').getAttribute('src')).toBe(characterMockedData[0].img);
  
  expect(screen.getByTestId('dob')).toHaveTextContent(`DOB: ${characterMockedData[0].birthday}`);
});
