import React, { useState } from 'react';
import {
  Collapse,
  Typography,
  Box
} from '@mui/material';
import map from 'lodash-es/map';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { Season } from '../../types/types';
import EpisodeCard from '../EpisodeCard/EpisodeCard';
import './SeasonBlock.css';

type SeasonBlockProps = {
  seasonData: Season
  seasonNumber: string
}

const SeasonBlock = (props: SeasonBlockProps) => {
  const [isCollapseOpen, setIsCollapseOpen] = useState<boolean>(false);

  const toggleCollapseOpen = () => {
    setIsCollapseOpen(!isCollapseOpen);
  }

  const { seasonData, seasonNumber } = props;

  const renderEpisodes = () => {
    return map(seasonData, (episodeData, index) => (
      <Box
        gridColumn='span 3'
        key={index}
      >
        <EpisodeCard episodeData={episodeData} />
      </Box>
    ))
  }

  return (
    <>
      <Typography
        className='season-heading'
        variant='h4'
        component='h4'
        onClick={toggleCollapseOpen}
      >
        Season {seasonNumber}
        <ArrowForwardIosIcon className={`arrow ${isCollapseOpen ? 'open' : 'closed'}`} />
      </Typography>

      <Collapse
        className='season-content'
        in={isCollapseOpen}
        timeout='auto'
      >
        <Box
          display='grid'
          gridTemplateColumns='repeat(12, 1fr)'
          gap={2}
          sx={{ p: 2}}
        >
          {renderEpisodes()}
        </Box>
      </Collapse>
    </>
  );
}

export default SeasonBlock;
