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
  // mock global fetch that is used in character component
  fetch.mockResponseOnce(JSON.stringify({ data: characterMockedData }));
})

afterEach(() => {
  cleanup();
  jest.restoreAllMocks();
});

// mocking use params hook to game 'name' param
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), 
  useParams: () => ({ name: 'Jesse Pinkman', })
}));

test('<Character /> renders data after mock request', async () => {
  const { debug } = render(
    <MemoryRouter>
      <Character />
    </MemoryRouter>
  );

  // wait for character loader to disappear after the fetch call
  await waitForElementToBeRemoved(() => screen.getByTestId('character-loader'));

  // character image attribute should have correct src from the mock data
  expect(screen.getByTestId('character-image').getAttribute('src')).toBe(characterMockedData[0].img);
  
  // character date of birth should contain correct string
  expect(screen.getByTestId('dob')).toHaveTextContent(`DOB: ${characterMockedData[0].birthday}`);
});
