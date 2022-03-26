export const PATHS = {
  EPISODES: '/episodes',
  EPISODE_TEMPLATE: '/episodes/:id',
  EPISODE: (id: number) => `/episodes/${id}`,
  
  CHARACTER_TEMPLATE: '/characters/:id',
  CHARACTER: (id: number) => `/characters/${id}`,
}