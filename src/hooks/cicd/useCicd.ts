import { useState, useEffect } from 'react';
import { Pipeline } from '../../services/cicd/cicd.interface.ts';
import { getCicdPipelinesByTags } from '../../services/cicd/cicd.service.ts';

// Interface for the hook's parameters
interface UseCicdParams {
  tags: string[]; // Tags to filter pipelines by
  matchAll?: boolean; // Whether to match all tags (AND logic) or any tags (OR logic)
}

// Custom hook to fetch CICD pipelines filtered by tags
const useCicd = ({ tags, matchAll = false }: UseCicdParams) => {
  // State to store fetched pipeline data
  const [data, setData] = useState<Pipeline[]>([]);
  // State to track loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State to store any error messages
  const [error, setError] = useState<string | null>(null);

  // useEffect to fetch CICD pipelines whenever the tags or matchAll flag changes
  useEffect(() => {
    // Function to fetch pipeline data asynchronously
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading state to true before fetching data
        // Fetch CICD pipelines using the provided tags and matchAll flag
        const result = await getCicdPipelinesByTags({ tags, matchAll });
        setData(result); // Store the fetched data in state
        setError(null); // Reset error state if fetching is successful
      } catch (err) {
        // Set error message if fetching fails
        setError('Failed to fetch infrastructure elements');
      } finally {
        // Set loading state to false once fetching is complete
        setLoading(false);
      }
    };

    // Invoke the fetch function
    fetchData();
  }, [tags, matchAll]); // Dependencies: Re-fetch data if tags or matchAll changes

  // Return the fetched data, loading state, and any error messages
  return { data, loading, error };
};

export default useCicd;
