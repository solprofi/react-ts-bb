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

const Episodes = () => {
  const [groupedEpisodes, setGroupedEpisodes] = useState<Seasons | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchEpisodesData = async () => {
    const data: Episode[] = await fetchEpisodes();

    const mappedEpisodesBySeason: Seasons = groupBy(data, episode => Number(episode.season));
    setGroupedEpisodes(mappedEpisodesBySeason);
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
      />
    ))
  }, []);

  return (
    <div className='home-wrapper'>
      {
        isLoading ? renderLoader() : renderSeasons()
      }
    </div>
  );
}

export default Episodes;
