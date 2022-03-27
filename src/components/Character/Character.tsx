import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Skeleton,
  Fade
} from '@mui/material';
import map from 'lodash-es/map';

import { Character } from '../../types/types';
import { fetchCharacterByName } from '../../api/characters';
import './Character.css';
import EmptyState from '../EmptyState/EmptyState';

const CharacterPage = () => {
  const { name } = useParams();

  const [characterData, setCharacterData] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchCharacterData = useCallback(async () => {
    try {
      if (name) {
        const mappedName = name.replace(' ', '+');
        const data: Character[] = await fetchCharacterByName(mappedName);

        if (data.length) {
          setCharacterData(data[0]);
        }
      }
    } catch (e) {

    }
  }, [name]);

  useEffect(() => {
    fetchCharacterData().then(() => {
      setIsLoading(false);
    });
  }, [fetchCharacterData]);

  const renderOccupationList = (occupations: string[]) => {
    return map(occupations, job => (
      <Typography
        variant='body2'
        color='text.secondary'
        key={job}
      >
        - {job}
      </Typography>
    ))
  }

  const renderLoader = useCallback(() => {
    return (
      <Skeleton
        className='card-skeleton'
        variant='rectangular'
        width={345}
        height={650}
        animation='wave'
      />
    )
  }, []);

  const renderCharacterData = useCallback(() => {
    if (characterData) {
      const {
        name,
        birthday,
        nickname,
        img,
        status,
        occupation
      } = characterData;

      return (
        <Fade
          appear
          in
        >
          <Card
            className='character-card'
            raised
          >
            <CardMedia
              component='img'
              height='450'
              image={img}
              alt={name}
            />
            <CardContent>
              <Typography
                variant='h5'
                component='div'
              >
                {name}
              </Typography>
              <Typography
                variant='h6'
                component='div'
              >
                a.k.a. "{nickname}"
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
              >
                Status: {status}
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
              >
                DOB: {birthday}
              </Typography>

              <Typography
                variant='body2'
                color='text.secondary'
              >
                Occupation(s):
              </Typography>
              {renderOccupationList(occupation)}
            </CardContent>
          </Card>
        </Fade>
      );
    }
  }, [characterData]);

  if (!isLoading && !characterData) {
    return (
      <div className='character-wrapper'>
        <EmptyState
          className='empty-state-block'
          elevation={3}
          text='There is no data available for this character'
        />
      </div>
    )
  }

  return (
    <div className='character-wrapper'>
      {isLoading ? renderLoader() : renderCharacterData()}
    </div>
  )
}

export default CharacterPage;
