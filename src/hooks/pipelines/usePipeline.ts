import { useState, useEffect } from 'react';
import {getInfrastructureElement, getInfrastructureElements} from '../../services/operations/operations.service';
import {InfrastructureElement, InfrastructureElementDetail} from '../../services/operations/operations.interface';
import {Pipeline} from '../../services/cicd/cicd.interface.ts';
import {getCicdPipeline} from '../../services/cicd/cicd.service.ts';

const usePipeline = ( id: number) => {
  const [data, setData] = useState<Pipeline>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getCicdPipeline(id);
        setData(result);
        setError(null);
      } catch (err) {
        setError('Failed to fetch infrastructure elements');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { data, loading, error };
};

export default usePipeline;