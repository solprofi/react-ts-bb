import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import map from 'lodash-es/map';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Divider,
  Chip,
  Stack,
  Skeleton,
} from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';

import { fetchEpisodeById } from '../../api/episodes';
import { Episode } from '../../types/types';
import { PATHS } from '../../constants/paths';
import Toast from '../Toast/Toast';
import './Episode.css';

const EpisodePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [episodeData, setEpisodeData] = useState<Episode | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);

  const raiseAlert = () => {
    setIsToastOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setIsToastOpen(false);
  };

  const redirectHome = useCallback(() => {
    navigate(PATHS.EPISODES);
  }, [navigate]);

  const fetchEpisodeData = useCallback(async () => {
    if (isNaN(Number(id))) {
      return redirectHome();
    }

    try {
      const data: Episode[] = await fetchEpisodeById(Number(id));

      if (data.length) {
        setEpisodeData(data[0]);
      } else {
        return redirectHome();
      }
    } catch (e) {
      raiseAlert();
    } finally {
      setIsLoading(false);
    }
  }, [id, redirectHome]);

  useEffect(() => {
    fetchEpisodeData()
      .then(() => {
        setIsLoading(false);
      });

    return () => { };
  }, [fetchEpisodeData]);

  const handleCharacterClick = useCallback((character: string) => {
    return navigate(PATHS.CHARACTER(character));
  }, [navigate]);

  const renderCharacterChips = useCallback((characters: string[]) => {
    return map(characters, character => (
      <Chip
        className='character-chip'
        icon={<FaceIcon />}
        label={character}
        variant='outlined'
        key={character}
        onClick={() => handleCharacterClick(character)}
      />
    ))
  }, [handleCharacterClick]);

  const renderEpisodeData = useCallback(() => {
    if (episodeData) {
      const {
        title,
        air_date,
        characters,
      } = episodeData;

      return (
        <Card
          className='episode-card'
          raised
        >
          <CardContent>
            <Typography
              variant='h4'
              gutterBottom
            >
              Episode: "{title}"
            </Typography>

            <Typography
              variant='h6'
            >
              Air Date: {air_date}
            </Typography>

            <Divider variant='middle'>Characters</Divider>

            <Stack
              className='character-row'
              direction='row'
              spacing={1}
            >
              {renderCharacterChips(characters)}
            </Stack>
            <CardActions className='actions-wrapper'>
              <Button
                size='small'
                onClick={redirectHome}
              >
                All episodes
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      );
    }

    return null;
  }, [renderCharacterChips, episodeData, redirectHome]);

  const renderLoader = useCallback(() => {
    return (
      <Skeleton
        className='card-skeleton'
        variant='rectangular'
        width={600}
        height={350}
        animation='wave'
      />
    )
  }, []);

  return (
    <div className='episode-wrapper'>
      {isLoading ? renderLoader() : renderEpisodeData()}

      <Toast
        isToastOpen={isToastOpen}
        type='error'
        onClose={handleClose}
        text='Error while loading an episode'
      />
    </div>
  );
}

export default EpisodePage;
