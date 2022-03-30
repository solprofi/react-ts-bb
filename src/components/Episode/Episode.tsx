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
  Box,
  Skeleton,
  Fade,
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
  const [error, setError] = useState<string | boolean>(false);

  const redirectHome = useCallback(() => {
    navigate(PATHS.EPISODES);
  }, [navigate]);

  const fetchEpisodeData = useCallback(async () => {
    // episode number is incorrect, go to home page
    if (isNaN(Number(id))) {
      return redirectHome();
    }

    try {
      const data: Episode[] = await fetchEpisodeById(Number(id));
      
      if (data.length) {
        setEpisodeData(data[0]);
      } else {
        // no episode data, go to home page
        return redirectHome();
      }
    } catch (e) {
      setError('Error while loading episode data');
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
      <Box
        gridColumn='span 3'
        key={character}
      >
        <Chip
          className='character-chip'
          icon={<FaceIcon />}
          label={character}
          variant='outlined'
          onClick={() => handleCharacterClick(character)}
        />
      </Box>
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
        <Fade
          appear
          in
        >
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

              <Box
                display='grid'
                gridTemplateColumns='repeat(12, 1fr)'
                gap={2}
                sx={{ p: 2 }}
              >
                {renderCharacterChips(characters)}
              </Box>

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
        </Fade>
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
      <div className='card-wrapper'>
        {isLoading ? renderLoader() : renderEpisodeData()}
      </div>

      <Toast
        isToastOpen={Boolean(error)}
        setIsToastOpen={setError}
        text={error}
        type='error'
      />
    </div>
  );
}

export default EpisodePage;
