import { API_PATH } from '../constants/api';

export const fetchCharacters = async () => fetch(`${API_PATH}api/characters`);

export const fetchCharacterByName = async (name: string) => fetch(`${API_PATH}api/characters/${name}`);