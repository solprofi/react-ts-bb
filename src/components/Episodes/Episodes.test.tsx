import React from 'react';
import { render } from '@testing-library/react';

import Episodes from './Episodes';

test('<Episodes /> renders without crashing', () => {
  render(<Episodes />);
});
