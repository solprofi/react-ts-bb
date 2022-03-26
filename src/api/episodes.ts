import { API_PATH } from './constants';

export const fetchEpisodes = async () => fetch(`${API_PATH}api/episodes`);

export const fetchEpisodeById = async (id: number) => fetch(`${API_PATH}api/episodes/${id}`);