import {API_DOMAIN} from '../../constants';
import {Pipeline} from './cicd.interface.ts';

/**
 * Fetches CICD pipelines filtered by tags.
 *
 * @param {Object} params - The parameters for filtering pipelines.
 * @param {boolean} [params.matchAll] - Whether to match all tags or any tag.
 * @param {string[]} params.tags - The tags to filter pipelines by.
 * @returns {Promise<Pipeline[]>} A promise that resolves to an array of Pipeline objects.
 * @throws Will throw an error if the fetch operation fails.
 */
export const getCicdPipelinesByTags = async (params: {
  matchAll: undefined | boolean;
  tags: string[]
}): Promise<Pipeline[]> => {
  const response = await fetch(`${API_DOMAIN}/integration-deployment/cicd-pipelines?tags=${params.tags.join(',')}&matchAll=${params.matchAll}`);
  if (!response.ok) {
    throw new Error('Failed to fetch infrastructure elements');
  }
  return response.json();
};

/**
 * Fetches a specific CICD pipeline by its ID.
 *
 * @param {number} pipelineId - The unique identifier of the pipeline.
 * @returns {Promise<Pipeline>} A promise that resolves to a Pipeline object.
 * @throws Will throw an error if the fetch operation fails.
 */
export const getCicdPipeline = async (pipelineId: number): Promise<Pipeline> => {
  const response = await fetch(`${API_DOMAIN}/integration-deployment/cicd-pipelines/${pipelineId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch infrastructure element');
  }
  return response.json();
};