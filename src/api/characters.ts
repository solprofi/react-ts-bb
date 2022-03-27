import { API_PATH } from '../constants/api';
import { Character } from './../types/types';
import { request } from './utils';

export const fetchCharacterByName = (name: string) => request<Character[]>(`${API_PATH}api/characters?name=${name}`);