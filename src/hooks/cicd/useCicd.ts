import { useState, useEffect } from 'react';
import {Pipeline} from '../../services/cicd/cicd.interface.ts';
import {getCicdPipelinesByTags} from '../../services/cicd/cicd.service.ts';

interface UseCicdParams {
  tags: string[];
  matchAll?: boolean;
}

const useCicd = ({ tags, matchAll = false }: UseCicdParams) => {
  const [data, setData] = useState<Pipeline[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getCicdPipelinesByTags({ tags, matchAll });
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

export default useCicd;