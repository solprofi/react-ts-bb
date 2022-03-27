export const PATHS = {
  EPISODES: '/episodes',
  EPISODE_TEMPLATE: '/episodes/:id',
  EPISODE: (id: number) => `/episodes/${id}`,
  
  CHARACTER_TEMPLATE: '/characters/:name',
  CHARACTER: (name: string) => `/characters/${name}`,
}