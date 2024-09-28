import {API_DOMAIN} from '../../constants';
import {UserFlow} from './userflows.interface.ts';

/**
 * Fetches user flows for a specific project.
 *
 * @param {number} projectId - The unique identifier of the project.
 * @returns {Promise<UserFlow[]>} A promise that resolves to an array of UserFlow objects.
 * @throws Will throw an error if the fetch operation fails.
 */
export const getUserFlows = async (projectId: number): Promise<UserFlow[]> => {
  const response = await fetch(`${API_DOMAIN}/user-flows/${projectId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user flows');
  }
  return response.json();
};