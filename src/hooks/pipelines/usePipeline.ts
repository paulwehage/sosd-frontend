import { useState, useEffect } from 'react';
import { Pipeline } from '../../services/cicd/cicd.interface.ts';
import { getCicdPipeline } from '../../services/cicd/cicd.service.ts';

// Custom hook to fetch details of a specific CICD pipeline by its ID
const usePipeline = (id: number) => {
  // State to store the fetched pipeline details
  const [data, setData] = useState<Pipeline>(null);
  // State to track the loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State to store any error messages that occur during the fetch
  const [error, setError] = useState<string | null>(null);

  // useEffect to fetch pipeline details when the ID changes
  useEffect(() => {
    // Function to fetch the data asynchronously
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading state to true before starting fetch
        // Fetch the CICD pipeline details by its ID
        const result = await getCicdPipeline(id);
        setData(result); // Store the fetched data in state
        setError(null); // Reset error state on successful fetch
      } catch (err) {
        // Set an error message if fetching fails
        setError('Failed to fetch CICD pipeline details');
      } finally {
        // Set loading state to false once the fetch is complete
        setLoading(false);
      }
    };

    // Invoke the fetch function
    fetchData();
  }, [id]); // Dependency: Re-fetch data if the `id` changes

  // Return the fetched data, loading state, and any error messages
  return { data, loading, error };
};

export default usePipeline;
