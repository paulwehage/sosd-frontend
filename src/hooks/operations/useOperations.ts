import { useState, useEffect } from 'react';
import { getInfrastructureElements } from '../../services/operations/operations.service';
import { InfrastructureElement } from '../../services/operations/operations.interface';

// Interface for the hook parameters to filter infrastructure elements
interface UseOperationsParams {
  tags: string[]; // Tags to filter infrastructure elements by
  matchAll?: boolean; // If true, match all tags (AND logic); otherwise, match any tag (OR logic)
}

// Custom hook to fetch a list of infrastructure elements filtered by tags
const useOperations = ({ tags, matchAll = false }: UseOperationsParams) => {
  // State to store the fetched list of infrastructure elements
  const [data, setData] = useState<InfrastructureElement[]>([]);
  // State to track the loading status
  const [loading, setLoading] = useState<boolean>(true);
  // State to store any error messages encountered during the fetch
  const [error, setError] = useState<string | null>(null);

  // useEffect to fetch infrastructure elements whenever `tags` or `matchAll` changes
  useEffect(() => {
    // Function to asynchronously fetch the data
    const fetchData = async () => {
      try {
        setLoading(true); // Set loading state to true before starting fetch
        // Fetch infrastructure elements based on the tags and matchAll parameter
        const result = await getInfrastructureElements({ tags, matchAll });
        setData(result); // Store the fetched data in state
        setError(null); // Clear any existing error state
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
  }, [tags, matchAll]); // Dependencies: Re-fetch data if `tags` or `matchAll` changes

  // Return the fetched data, loading state, and any error messages
  return { data, loading, error };
};

export default useOperations;
