import React, {
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { PATHS } from '../../constants/paths';
import { Character } from '../../types/types';
import { fetchCharacterByName } from '../../api/characters';

const CharacterPage = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const [characterData, setCharacterData] = useState<Character | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const redirectHome = useCallback(() => {
    navigate(PATHS.EPISODES);
  }, [navigate]);

  const fetchCharacterData = useCallback(async () => {
    try {
      if (name) {
        const mappedName = name.replace(' ', '+');
        const data: Character[] = await fetchCharacterByName(mappedName);
        
        if (data.length) {
            setCharacterData(data[0]);
        } else {
          return redirectHome();
        }
      }
    } catch (e) {
      
    } finally {
      setIsLoading(false);
    }
  }, [name, redirectHome]);

  useEffect(() => {
    fetchCharacterData();
    setIsLoading(false);

    return () => {};
  }, [fetchCharacterData]);

  return (
    <div>
      {name}
    </div>
  );
}

export default CharacterPage;
