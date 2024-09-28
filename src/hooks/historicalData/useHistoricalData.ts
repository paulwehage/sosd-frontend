import { useState, useEffect } from 'react';
import {
  getHistoricalProjectData,
  getHistoricalOperationsData,
  getHistoricalCICDData,
  getHistoricalCrossProjectData,
  getHistoricalInfrastructureElementData,
  getHistoricalPipelineData
} from '../../services/historicalData/historicalData.service';
import { HistoricalDataParams, ProjectHistoricalDataPoint } from '../../services/historicalData/historicalData.interface';

// Define possible types of historical data that can be fetched
type HistoricalDataType = 'projects' | 'sdlc' | 'operations' | 'cicd' | 'infrastructureElement' | 'pipeline';

// Interface for the parameters to be passed to the hook
interface UseHistoricalDataParams extends HistoricalDataParams {
  type: HistoricalDataType; // Specifies the type of data to fetch
  tags?: string[]; // Optional tags for filtering data
  ids?: number[]; // Optional IDs for additional filtering
}

// Custom hook to fetch historical data based on provided parameters
const useHistoricalData = ({ type, startDate, endDate, tags, ids, serviceId, pipelineId }: UseHistoricalDataParams) => {
  // State to store the fetched historical data points
  const [data, setData] = useState<ProjectHistoricalDataPoint[]>([]);
  // State to track loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State to store any error messages
  const [error, setError] = useState<string | null>(null);

  // useEffect to fetch data when any dependency changes
  useEffect(() => {
    // Function to fetch historical data based on type and other parameters
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading state to true before fetching
        let result; // Variable to store fetched data
        // Choose the appropriate data fetching function based on the `type`
        switch (type) {
          case 'projects':
            result = await getHistoricalCrossProjectData({ startDate, endDate });
            break;
          case 'sdlc':
            result = await getHistoricalProjectData({ startDate, endDate }, tags!);
            break;
          case 'operations':
            result = await getHistoricalOperationsData({ startDate, endDate }, tags!);
            break;
          case 'infrastructureElement':
            result = await getHistoricalInfrastructureElementData({ startDate, endDate, serviceId }, tags!);
            break;
          case 'cicd':
            result = await getHistoricalCICDData({ startDate, endDate }, tags!);
            break;
          case 'pipeline':
            result = await getHistoricalPipelineData({ startDate, endDate, pipelineId }, tags!);
            break;
          default:
            throw new Error('Invalid historical data type'); // Error handling for unsupported types
        }
        setData(result); // Store the fetched data in state
        setError(null); // Reset error state if fetching is successful
      } catch (err) {
        // Set error message if fetching fails
        setError('Failed to fetch historical data');
      } finally {
        // Set loading state to false once fetching is complete
        setLoading(false);
      }
    };

    // Invoke the fetch function
    fetchData();
  }, [type, startDate, endDate, tags, ids]); // Dependencies: re-fetch data if any of these change

  // Return the fetched data, loading state, and any error messages
  return { data, loading, error };
};

export default useHistoricalData;
