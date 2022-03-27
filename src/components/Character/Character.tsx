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
  Skeleton
} from '@mui/material';
import map from 'lodash-es/map';

import { Character } from '../../types/types';
import { fetchCharacterByName } from '../../api/characters';

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

  if (isLoading) {
    return (
      <Skeleton
        variant='rectangular'
        width={345}
        height={450}
        animation='wave'
      />
    )
  }

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
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          component='img'
          height='450'
          image={img}
          alt={name}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant='h5'
            component='div'
          >
            {name}
          </Typography>
          <Typography
            gutterBottom
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
    );
  }

  return <div>There is no data for this character</div>;
}

export default CharacterPage;
