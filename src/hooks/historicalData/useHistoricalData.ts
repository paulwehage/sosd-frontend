// src/hooks/historicalData/useHistoricalData.ts
import { useState, useEffect } from 'react';
import {
  getHistoricalProjectData,
  getHistoricalOperationsData,
  getHistoricalCICDData,
  getHistoricalCrossProjectData, getHistoricalInfrastructureElementData, getHistoricalPipelineData
} from '../../services/historicalData/historicalData.service';
import { HistoricalDataParams, ProjectHistoricalDataPoint } from '../../services/historicalData/historicalData.interface';

type HistoricalDataType = 'projects' | 'sdlc' | 'operations' | 'cicd' | 'infrastructureElement' | 'pipeline';

interface UseHistoricalDataParams extends HistoricalDataParams {
  type: HistoricalDataType;
  tags?: string[];
  ids?: number[];
}

const useHistoricalData = ({ type, startDate, endDate, tags, ids, serviceId, pipelineId }: UseHistoricalDataParams) => {
  const [data, setData] = useState<ProjectHistoricalDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let result;
        switch (type) {
          case 'projects':
              result = await getHistoricalCrossProjectData({ startDate, endDate });
              break;
          case 'sdlc':
            result = await getHistoricalProjectData({ startDate, endDate}, tags! );
            break;
          case 'operations':
            result = await getHistoricalOperationsData({ startDate, endDate}, tags! );
            break;
          case 'infrastructureElement':
            result = await getHistoricalInfrastructureElementData({ startDate, endDate, serviceId}, tags! );
            break;
          case 'cicd':
            result = await getHistoricalCICDData({ startDate, endDate}, tags!);
            break;
          case 'pipeline':
            result = await getHistoricalPipelineData({ startDate, endDate, pipelineId}, tags!);
            break;
          default:
            throw new Error('Invalid historical data type');
        }
        setData(result);
        setError(null);
      } catch (err) {
        setError('Failed to fetch historical data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, startDate, endDate, tags, ids]);

  return { data, loading, error };
};

export default useHistoricalData;