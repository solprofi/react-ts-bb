import React from 'react';
import {
  render,
  cleanup,
  screen,
  fireEvent,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import { mockSeasonData } from '../../mockData/SeasonBlock';
import SeasonBlock from './SeasonBlock';

afterEach(cleanup);

const seasonNumber = '1';

test('<SeasonBlock /> renders without crashing', () => {
  render(
    <MemoryRouter>
      <SeasonBlock
        seasonData={mockSeasonData}
        seasonNumber={seasonNumber}
      />
    </MemoryRouter>
  );
});

test('<SeasonBlock /> hides season data after heading click', () => {

  const { debug } = render(
    <MemoryRouter>
      <SeasonBlock
        seasonData={mockSeasonData}
        seasonNumber={seasonNumber}
      />
    </MemoryRouter>
  );

  // debug();

  const heading = screen.getByTestId('season-heading');
  const collapseComponent = screen.getByTestId('season-collapse');
  const expandArrow = screen.getByTestId('season-expand-arrow');

  // shows correct heading
  expect(heading).toHaveTextContent(`Season ${seasonNumber}`);
  
  // expand arrow is closed
  expect(expandArrow.getAttribute('class')).toContain('closed');
  
  // collapse is closed
  expect(collapseComponent).toHaveClass('MuiCollapse-hidden');
  
  fireEvent.click(heading);
  //expand arrow is open
  expect(expandArrow.getAttribute('class')).toContain('open');

  // collapse arrow is open
  expect(collapseComponent).not.toHaveClass('MuiCollapse-hidden');
});
