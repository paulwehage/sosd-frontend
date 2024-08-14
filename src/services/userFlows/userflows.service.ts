import {API_DOMAIN} from '../../constants';
import {UserFlow} from './userflows.interface.ts';

export const getUserFlows = async (projectId: number): Promise<UserFlow[]> => {
  const response = await fetch(`${API_DOMAIN}/user-flows/${projectId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user flows');
  }
  return response.json();
};