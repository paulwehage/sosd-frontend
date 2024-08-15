import { useState, useEffect } from 'react';
import {getInfrastructureElement, getInfrastructureElements} from '../../services/operations/operations.service';
import {InfrastructureElement, InfrastructureElementDetail} from '../../services/operations/operations.interface';

const useInfrastructureElement = ( id: number) => {
  const [data, setData] = useState<InfrastructureElementDetail>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getInfrastructureElement(id);
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

export default useInfrastructureElement;