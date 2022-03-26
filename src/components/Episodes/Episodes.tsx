import React, { useEffect, useState } from 'react';
import groupBy from 'lodash-es/groupBy';
import map from 'lodash-es/map';

import { fetchEpisodes } from '../../api/episodes';
import SeasonBlock from '../SeasonBlock/SeasonBlock';
import {
  Episode, 
  Season,
  Seasons,
} from '../../types/types';

const Episodes = () => {
  const [groupedEpisodes, setGroupedEpisodes] = useState<Seasons | []>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const fetchEpisodeData = async () => {
    const data: Episode[]  = await fetchEpisodes();

    const mappedEpisodesBySeason: Seasons = groupBy(data, 'season');
    setGroupedEpisodes(mappedEpisodesBySeason);
  }
  
  useEffect(() => {
    fetchEpisodeData();
    setIsLoading(false);
  }, []);

  const renderSeasons = () => map(groupedEpisodes, (seasonData: Season, key: string) => {
      return (
        <SeasonBlock
          seasonData={seasonData}
          key={key} />
      );
  });
  

  return (
    <div>
      {renderSeasons()}
    </div>
  );
}

export default Episodes;
