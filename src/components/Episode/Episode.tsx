import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import map from 'lodash-es/map';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  Chip,
  Stack,
} from '@mui/material';
import FaceIcon from '@mui/icons-material/Face';

import { fetchEpisodeById } from '../../api/episodes';
import { Episode } from '../../types/types';
import { PATHS } from '../../constants/paths';
import Toast from '../Toast/Toast';

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
        <Grid
          container
          spacing={2}
          justifyContent='center'
        >
          <Grid
            item
            xs={10}
          >
            <Card>
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

                <Stack
                  direction='row'
                  spacing={1}
                >
                  {renderCharacterChips(characters)}
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      );
    }

    return null;
  }, [renderCharacterChips, episodeData]);

  return (
    <div>
      {renderEpisodeData()}

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
