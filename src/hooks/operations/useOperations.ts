import { useState, useEffect } from 'react';
import { getInfrastructureElements } from '../../services/operations/operations.service';
import { InfrastructureElement } from '../../services/operations/operations.interface';

interface UseOperationsParams {
  tags: string[];
  matchAll?: boolean;
}

const useOperations = ({ tags, matchAll = false }: UseOperationsParams) => {
  const [data, setData] = useState<InfrastructureElement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getInfrastructureElements({ tags, matchAll });
        setData(result);
        setError(null);
      } catch (err) {
        setError('Failed to fetch infrastructure elements');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tags, matchAll]);

  return { data, loading, error };
};

export default useOperations;