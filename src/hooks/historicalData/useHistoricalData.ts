// src/hooks/historicalData/useHistoricalData.ts
import { useState, useEffect } from 'react';
import {
  getHistoricalProjectData,
  getHistoricalSDLCData,
  getHistoricalOperationsData,
  getHistoricalCICDData,
  getHistoricalCrossProjectData
} from '../../services/historicalData/historicalData.service';
import { HistoricalDataParams, ProjectHistoricalDataPoint } from '../../services/historicalData/historicalData.interface';

type HistoricalDataType = 'crossProject' | 'project' | 'sdlc' | 'operations' | 'cicd';

interface UseHistoricalDataParams extends HistoricalDataParams {
  type: HistoricalDataType;
  tags?: string[];
  ids?: number[];
}

const useHistoricalData = ({ type, startDate, endDate, tags, ids }: UseHistoricalDataParams) => {
  const [data, setData] = useState<ProjectHistoricalDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let result;
        switch (type) {
          case 'crossProject':
              result = await getHistoricalCrossProjectData({ startDate, endDate });
              break;
          case 'project':
            result = await getHistoricalProjectData({ startDate, endDate }, tags!);
            break;
          case 'sdlc':
            result = await getHistoricalSDLCData({ startDate, endDate, tags });
            break;
          case 'operations':
            result = await getHistoricalOperationsData({ startDate, endDate, tags, ids });
            break;
          case 'cicd':
            result = await getHistoricalCICDData({ startDate, endDate, tags, ids });
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