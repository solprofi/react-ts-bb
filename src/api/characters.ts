import { API_PATH } from './constants';

export const fetchCharacters = async () => fetch(`${API_PATH}api/characters`);

export const fetchCharacterById = async (id: number) => fetch(`${API_PATH}api/characters/${id}`);