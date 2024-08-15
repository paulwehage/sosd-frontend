import { API_DOMAIN } from '../../constants';
import {
  InfrastructureElement,
  GetInfrastructureElementsParams,
  InfrastructureElementDetail
} from './operations.interface';

export const getInfrastructureElements = async (params: GetInfrastructureElementsParams): Promise<InfrastructureElement[]> => {
  const response = await fetch(`${API_DOMAIN}/operations/infrastructure-elements?tags=${params.tags.join(',')}&matchAll=${params.matchAll}`);
  if (!response.ok) {
    throw new Error('Failed to fetch infrastructure elements');
  }
  return response.json();
};

export const getInfrastructureElement = async (elementId: number): Promise<InfrastructureElementDetail> => {
    const response = await fetch(`${API_DOMAIN}/operations/infrastructure-elements/${elementId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch infrastructure element');
    }
    return response.json();
}