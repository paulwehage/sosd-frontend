import {API_DOMAIN} from '../../constants';
import {Pipeline} from './cicd.interface.ts';

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

export const getCicdPipeline = async (pipelineId: number): Promise<Pipeline> => {
  const response = await fetch(`${API_DOMAIN}/integration-deployment/cicd-pipelines/${pipelineId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch infrastructure element');
  }
  return response.json();
};