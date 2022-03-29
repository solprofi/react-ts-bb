import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';
import groupBy from 'lodash-es/groupBy';
import map from 'lodash-es/map';
import { Skeleton } from '@mui/material';

import { fetchEpisodes } from '../../api/episodes';
import SeasonBlock from '../SeasonBlock/SeasonBlock';
import {
  Episode,
  Season,
  Seasons,
} from '../../types/types';
import './Episodes.css';
import Toast from '../Toast/Toast';

const Episodes = () => {
  const [groupedEpisodes, setGroupedEpisodes] = useState<Seasons | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | boolean>(false);

  const fetchEpisodesData = async () => {
    try {
      const data: Episode[] = await fetchEpisodes();

      const mappedEpisodesBySeason: Seasons = groupBy(data, episode => Number(episode.season));
      setGroupedEpisodes(mappedEpisodesBySeason);
    } catch (e) {
      setError('Error while loading seasons data');
    }
  }

  useEffect(() => {
    fetchEpisodesData()
      .then(() => {
        setIsLoading(false);
      });
  }, []);

  const renderSeasons = useCallback(() => map(groupedEpisodes, (seasonData: Season, seasonNumber: string) => {
    return (
      <SeasonBlock
        seasonData={seasonData}
        seasonNumber={seasonNumber}
        key={seasonNumber}
      />
    );
  }), [groupedEpisodes]);

  const renderLoader = useCallback(() => {
    const skeletons = new Array(5);

    return map(skeletons, (el, index) => (
      <Skeleton
        variant='text'
        width={150}
        height={50}
        key={index}
        animation='wave'
        data-testid='skeleton-loader'
      />
    ))
  }, []);

  return (
    <div className='home-wrapper'>
      {
        isLoading ? renderLoader() : renderSeasons()
      }

      <Toast
        isToastOpen={Boolean(error)}
        setIsToastOpen={setError}
        text={error}
        type='error'
      />
    </div>
  );
}

export default Episodes;
