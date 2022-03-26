import { API_PATH } from '../constants/api';
import { Episode } from '../types/types';
import { request } from './utils';

export const fetchEpisodes = () => request<Episode[]>(`${API_PATH}api/episodes`);

export const fetchEpisodeById = (id: number) => request<Episode[]>(`${API_PATH}api/episodes/${id}`);