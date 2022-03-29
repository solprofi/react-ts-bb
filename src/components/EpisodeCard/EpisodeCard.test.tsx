import React from 'react';
import {
  render,
  cleanup,
  screen,
  fireEvent,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import { mockEpisodeData } from '../../mockData/EpisodeCard';
import { PATHS } from '../../constants/paths';
import EpisodeCard from './EpisodeCard';

afterEach(cleanup);

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockHistoryPush,
}));

test('<EpisodeCard /> navigates to an episode page on card click', async () => {
  const { debug } = render(
    <MemoryRouter>
      <EpisodeCard
        episodeData={mockEpisodeData}
      />
    </MemoryRouter>
  );

  const episodeCard = screen.getByTestId('episode-card');

  fireEvent.click(episodeCard);

  expect(mockHistoryPush).toHaveBeenCalledTimes(1);
  expect(mockHistoryPush).toHaveBeenCalledWith(`${PATHS.EPISODES}/${mockEpisodeData.episode_id}`);
});

