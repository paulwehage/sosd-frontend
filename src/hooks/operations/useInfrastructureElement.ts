import { useState, useEffect } from 'react';
import { getInfrastructureElement } from '../../services/operations/operations.service';
import { InfrastructureElementDetail } from '../../services/operations/operations.interface';

// Custom hook to fetch details of a specific infrastructure element by its ID
const useInfrastructureElement = (id: number) => {
  // State to store the fetched infrastructure element details
  const [data, setData] = useState<InfrastructureElementDetail>(null);
  // State to track the loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State to store any error messages that occur during the fetch
  const [error, setError] = useState<string | null>(null);

  // useEffect to fetch the infrastructure element data when the ID changes
  useEffect(() => {
    // Function to fetch the data asynchronously
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading state to true before starting the fetch
        // Fetch the infrastructure element by its ID
        const result = await getInfrastructureElement(id);
        setData(result); // Store the fetched data in the state
        setError(null); // Reset error state on successful fetch
      } catch (err) {
        // Set an error message if fetching fails
        setError('Failed to fetch infrastructure elements');
      } finally {
        // Set loading state to false once the fetch is complete
        setLoading(false);
      }
    };

    // Invoke the fetch function
    fetchData();
  }, [id]); // Dependency: re-fetch data if the `id` changes

  // Return the fetched data, loading state, and any error messages
  return { data, loading, error };
};

export default useInfrastructureElement;
