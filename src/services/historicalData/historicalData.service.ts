import {API_DOMAIN} from '../../constants';
import {
  CrossProjectHistoricalDataPoint,
  ProjectHistoricalDataPoint
} from './historicalData.interface.ts';

export const getHistoricalCrossProjectData = async (params): Promise<CrossProjectHistoricalDataPoint[]> => {
  const response = await fetch(`${API_DOMAIN}/historical-data/cross-project?startDate=${params.startDate}&endDate=${params.endDate}`);
  if (!response.ok) {
    throw new Error('Failed to fetch historical data');
  }
  return response.json();
};

export const getHistoricalProjectData = async (params, tags: string[]): Promise<ProjectHistoricalDataPoint[]> => {
  const response = await fetch(`${API_DOMAIN}/historical-data/projects/sdlc?startDate=${params.startDate}&endDate=${params.endDate}&tags=${tags.join(',')}`);
  if (!response.ok) throw new Error('Failed to fetch project historical data');
  return response.json();
};

export const getHistoricalSDLCData = async (params): Promise<ProjectHistoricalDataPoint[]> => {
  const response = await fetch(`${API_DOMAIN}/historical-data/sdlc?startDate=${params.startDate}&endDate=${params.endDate}`);
  if (!response.ok) throw new Error('Failed to fetch sdlc historical data');
  return response.json();
};

export const getHistoricalOperationsData = async (params): Promise<ProjectHistoricalDataPoint[]> => {
  const response = await fetch(`${API_DOMAIN}/historical-data/operations?startDate=${params.startDate}&endDate=${params.endDate}`);
  if (!response.ok) throw new Error('Failed to fetch operations historical data');
  return response.json();
};

export const getHistoricalCICDData = async (params): Promise<ProjectHistoricalDataPoint[]> => {
  const response = await fetch(`${API_DOMAIN}/historical-data/cicd?startDate=${params.startDate}&endDate=${params.endDate}`);
  if (!response.ok) throw new Error('Failed to fetch cicd historical data');
  return response.json();
};