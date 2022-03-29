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

  expect(heading).toHaveTextContent(`Season ${seasonNumber}`);
  
  expect(expandArrow.getAttribute('class')).toContain('closed');
  
  expect(collapseComponent).toHaveClass('MuiCollapse-hidden');
  
  fireEvent.click(heading);
  expect(collapseComponent).not.toHaveClass('MuiCollapse-hidden');
  
  expect(expandArrow.getAttribute('class')).toContain('open');
});
