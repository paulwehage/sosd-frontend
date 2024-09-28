import {API_DOMAIN} from '../../constants';
import {
  CrossProjectHistoricalDataPoint,
  InfrastructureElementHistoricalDataPoint,
  OperationsHistoricalDataPoint,
  PipelineHistoricalDataPoint,
  ProjectHistoricalDataPoint
} from './historicalData.interface.ts';

/**
 * Fetches historical cross-project data.
 *
 * @param {Object} params - The parameters for fetching historical data.
 * @param {string} params.startDate - The start date for the historical data.
 * @param {string} params.endDate - The end date for the historical data.
 * @returns {Promise<CrossProjectHistoricalDataPoint[]>} A promise that resolves to an array of CrossProjectHistoricalDataPoint objects.
 * @throws Will throw an error if the fetch operation fails.
 */
export const getHistoricalCrossProjectData = async (params): Promise<CrossProjectHistoricalDataPoint[]> => {
  const response = await fetch(`${API_DOMAIN}/historical-data/cross-project?startDate=${params.startDate}&endDate=${params.endDate}`);
  if (!response.ok) {
    throw new Error('Failed to fetch historical data');
  }
  return response.json();
};

/**
 * Fetches historical project data.
 *
 * @param {Object} params - The parameters for fetching historical data.
 * @param {string} params.startDate - The start date for the historical data.
 * @param {string} params.endDate - The end date for the historical data.
 * @param {string[]} tags - The tags to filter the historical data by.
 * @returns {Promise<ProjectHistoricalDataPoint[]>} A promise that resolves to an array of ProjectHistoricalDataPoint objects.
 * @throws Will throw an error if the fetch operation fails.
 */
export const getHistoricalProjectData = async (params, tags: string[]): Promise<ProjectHistoricalDataPoint[]> => {
  const response = await fetch(`${API_DOMAIN}/historical-data/projects/sdlc?startDate=${params.startDate}&endDate=${params.endDate}&tags=${tags.join(',')}`);
  if (!response.ok) throw new Error('Failed to fetch project historical data');
  return response.json();
};

/**
 * Fetches historical operations data.
 *
 * @param {Object} params - The parameters for fetching historical data.
 * @param {string} params.startDate - The start date for the historical data.
 * @param {string} params.endDate - The end date for the historical data.
 * @param {string[]} tags - The tags to filter the historical data by.
 * @returns {Promise<OperationsHistoricalDataPoint[]>} A promise that resolves to an array of OperationsHistoricalDataPoint objects.
 * @throws Will throw an error if the fetch operation fails.
 */
export const getHistoricalOperationsData = async (params, tags: string[]): Promise<OperationsHistoricalDataPoint[]> => {
  const response = await fetch(`${API_DOMAIN}/historical-data/projects/operations?startDate=${params.startDate}&endDate=${params.endDate}&tags=${tags.join(',')}`);
  if (!response.ok) throw new Error('Failed to fetch operations historical data');
  return response.json();
};

/**
 * Fetches historical CICD data.
 *
 * @param {Object} params - The parameters for fetching historical data.
 * @param {string} params.startDate - The start date for the historical data.
 * @param {string} params.endDate - The end date for the historical data.
 * @param {string[]} tags - The tags to filter the historical data by.
 * @returns {Promise<ProjectHistoricalDataPoint[]>} A promise that resolves to an array of ProjectHistoricalDataPoint objects.
 * @throws Will throw an error if the fetch operation fails.
 */
export const getHistoricalCICDData = async (params, tags: string[]): Promise<ProjectHistoricalDataPoint[]> => {
  const response = await fetch(`${API_DOMAIN}/historical-data/projects/cicd?startDate=${params.startDate}&endDate=${params.endDate}&tags=${tags.join(',')}`);
  if (!response.ok) throw new Error('Failed to fetch cicd historical data');
  return response.json();
};

/**
 * Fetches historical infrastructure element data.
 *
 * @param {Object} params - The parameters for fetching historical data.
 * @param {string} params.serviceId - The unique identifier for the service.
 * @param {string} params.startDate - The start date for the historical data.
 * @param {string} params.endDate - The end date for the historical data.
 * @param {string[]} tags - The tags to filter the historical data by.
 * @returns {Promise<InfrastructureElementHistoricalDataPoint[]>} A promise that resolves to an array of InfrastructureElementHistoricalDataPoint objects.
 * @throws Will throw an error if the fetch operation fails.
 */
export const getHistoricalInfrastructureElementData = async (params, tags: string[]): Promise<InfrastructureElementHistoricalDataPoint[]> => {
    const response = await fetch(`${API_DOMAIN}/historical-data/projects/services/${params.serviceId}?startDate=${params.startDate}&endDate=${params.endDate}&tags=${tags.join(',')}`);
    if (!response.ok) throw new Error('Failed to fetch infrastructure element historical data');
    return response.json();
}

/**
 * Fetches historical pipeline data.
 *
 * @param {Object} params - The parameters for fetching historical data.
 * @param {string} params.pipelineId - The unique identifier for the pipeline.
 * @param {string} params.startDate - The start date for the historical data.
 * @param {string} params.endDate - The end date for the historical data.
 * @param {string[]} tags - The tags to filter the historical data by.
 * @returns {Promise<PipelineHistoricalDataPoint[]>} A promise that resolves to an array of PipelineHistoricalDataPoint objects.
 * @throws Will throw an error if the fetch operation fails.
 */
export const getHistoricalPipelineData = async (params, tags: string[]): Promise<PipelineHistoricalDataPoint[]> => {
  const response = await fetch(`${API_DOMAIN}/historical-data/projects/pipelines/${params.pipelineId}?startDate=${params.startDate}&endDate=${params.endDate}&tags=${tags.join(',')}`);
  if (!response.ok) throw new Error('Failed to fetch infrastructure element historical data');
  return response.json();
}