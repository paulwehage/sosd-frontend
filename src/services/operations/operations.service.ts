import { API_DOMAIN } from '../../constants';
import { InfrastructureElement, GetInfrastructureElementsParams } from './operations.interface';

export const getInfrastructureElements = async (params: GetInfrastructureElementsParams): Promise<InfrastructureElement[]> => {
  const response = await fetch(`${API_DOMAIN}/operations/infrastructure-elements?tags=${params.tags.join(',')}&matchAll=${params.matchAll}`);
  if (!response.ok) {
    throw new Error('Failed to fetch infrastructure elements');
  }
  return response.json();
};