import React, { useState } from 'react';
import {
  Collapse,
  Typography,
  Grid,
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
      <Grid
        item
        xs={3}
        key={index}
      >
        <EpisodeCard episodeData={episodeData} />
      </Grid>
    ))
  }

  return (
    <>
      <Typography
        variant='h4'
        component='h4'
        onClick={toggleCollapseOpen}
        className='season-heading'
      >
        Season {seasonNumber} 
        <ArrowForwardIosIcon className={`arrow ${isCollapseOpen ? 'open' : 'closed'}`} />
      </Typography>

      <Collapse
        in={isCollapseOpen}
        timeout='auto'
        unmountOnExit
        className='season-content'
      >
        <Grid
          container
          spacing={2}
          >
          {renderEpisodes()}
        </Grid>
      </Collapse>
    </>
  );
}

export default SeasonBlock;
