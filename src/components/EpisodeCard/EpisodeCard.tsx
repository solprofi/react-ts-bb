import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Episode } from '../../types/types';
import { PATHS } from '../../constants/paths';

type EpisodeCardProps = {
  episodeData: Episode
}

const EpisodeCard = (props: EpisodeCardProps) => {
  const navigate = useNavigate();

  const {
    episodeData: {
      air_date,
      title,
      episode_id
    }
  } = props;

  const handleCardClick = () => {
    navigate(PATHS.EPISODE(episode_id));
  }

  return (
    <Card
      style={{ cursor: 'pointer' }}
      onClick={handleCardClick}
    >
      <CardContent>
        <Typography
          variant='h6'
          gutterBottom
        >
          {title}
        </Typography>
        <Typography
          variant='caption'
        >
          {air_date}
        </Typography>
        <Divider light />
      </CardContent>
    </Card>
  );
}

export default EpisodeCard;
