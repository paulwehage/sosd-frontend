import { API_DOMAIN } from '../../constants';
import {
  InfrastructureElement,
  GetInfrastructureElementsParams,
  InfrastructureElementDetail
} from './operations.interface';

/**
 * Fetches infrastructure elements based on provided parameters.
 *
 * @param {GetInfrastructureElementsParams} params - The parameters for fetching infrastructure elements.
 * @param {string[]} params.tags - An array of tags to filter the infrastructure elements.
 * @param {boolean} params.matchAll - Whether to match all tags or any tag.
 * @returns {Promise<InfrastructureElement[]>} A promise that resolves to an array of InfrastructureElement objects.
 * @throws Will throw an error if the fetch operation fails.
 */
export const getInfrastructureElements = async (params: GetInfrastructureElementsParams): Promise<InfrastructureElement[]> => {
  const response = await fetch(`${API_DOMAIN}/operations/infrastructure-elements?tags=${params.tags.join(',')}&matchAll=${params.matchAll}`);
  if (!response.ok) {
    throw new Error('Failed to fetch infrastructure elements');
  }
  return response.json();
};

/**
 * Fetches a specific infrastructure element by its ID.
 *
 * @param {number} elementId - The unique identifier of the infrastructure element.
 * @returns {Promise<InfrastructureElementDetail>} A promise that resolves to an InfrastructureElementDetail object.
 * @throws Will throw an error if the fetch operation fails.
 */
export const getInfrastructureElement = async (elementId: number): Promise<InfrastructureElementDetail> => {
    const response = await fetch(`${API_DOMAIN}/operations/infrastructure-elements/${elementId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch infrastructure element');
    }
    return response.json();
}