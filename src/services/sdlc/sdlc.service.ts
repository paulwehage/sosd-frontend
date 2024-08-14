import {API_DOMAIN} from '../../constants';
import {SDLCOverview} from './sdlc.interface.ts';

export const getSDLCOverview = async (projectId: number): Promise<SDLCOverview> => {
  const response = await fetch(`${API_DOMAIN}/projects/${projectId}/sdlc`);
  if (!response.ok) {
    throw new Error('Failed to fetch SDLC overview');
  }
  return response.json();
};