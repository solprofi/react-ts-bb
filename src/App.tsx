import React, { lazy, Suspense } from 'react';
import {
  Routes,
  Route,
  BrowserRouter,
  Navigate
} from 'react-router-dom';

import './App.css';
import { PATHS } from './constants/paths';

const Episodes = lazy(() => import('./components/Episodes/Episodes'));
const Episode = lazy(() => import('./components/Episode/Episode'));
const Character = lazy(() => import('./components/Character/Character'));

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div></div>}>
        <Routes>
          <Route
            path={PATHS.EPISODES}
            element={<Episodes />}
          />
          <Route
            path={PATHS.EPISODE_TEMPLATE}
            element={<Episode />}
          />
          <Route
            path={PATHS.CHARACTER_TEMPLATE}
            element={<Character />}
          />
          <Route
            path='*'
            element={
              <Navigate
                to={PATHS.EPISODES}
                replace
              />
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
