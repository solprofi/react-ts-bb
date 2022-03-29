import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';

import Toast from './Toast';

const setIsToastOpen = jest.fn();

test('<Toast /> renders without crashing', () => {
  const alertText = '123';

  const { container, debug } = render(
    <Toast
      isToastOpen={true}
      setIsToastOpen={setIsToastOpen}
      text={alertText}
      autoHideDuration={1}
    />
  );

  expect(container.firstChild).toMatchSnapshot();

  expect(screen.getByTestId('alert')).toHaveTextContent(alertText);
});
