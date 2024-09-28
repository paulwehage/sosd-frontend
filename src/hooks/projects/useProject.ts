import { useState, useEffect } from 'react';
import { getProject } from '../../services/projects/project.service';
import { UserFlow } from '../../services/userFlows/userflows.interface.ts';
import { getUserFlows } from '../../services/userFlows/userflows.service.ts';
import useProjectContext from '../context/useProjectContext.ts';

// Custom hook to fetch project details and user flows by project ID
const useProject = (projectId: number) => {
  // Access the active project context and a function to update it
  const { activeProject, setActiveProject } = useProjectContext();

  // State to store user flows associated with the project
  const [userFlows, setUserFlows] = useState<UserFlow[]>([]);
  // State to track the loading status
  const [loading, setLoading] = useState(true);
  // State to store any error messages encountered during the fetch
  const [error, setError] = useState<string | null>(null);

  // useEffect to fetch project details and user flows when the project ID changes
  useEffect(() => {
    // Function to fetch project and user flow data asynchronously
    const fetchProjectData = async () => {
      try {
        setLoading(true); // Set loading state to true before starting fetch
        // Fetch project data and user flows in parallel
        const [projectData, userFlowsData] = await Promise.all([
          getProject(projectId), // Fetch project details
          getUserFlows(projectId) // Fetch user flows associated with the project
        ]);
        // Update context with the active project data
        setActiveProject(projectData);
        // Store user flows in state
        setUserFlows(userFlowsData);
        // Clear any previous error
        setError(null);
      } catch (err) {
        // Log the error and set an error message if fetching fails
        console.error('Error fetching project data:', err);
        setError('Failed to fetch project data');
      } finally {
        // Set loading state to false once fetching is complete
        setLoading(false);
      }
    };

    // Invoke the fetch function
    fetchProjectData();
  }, [projectId, setActiveProject]); // Dependencies: re-fetch data if `projectId` changes or `setActiveProject` changes

  // Return the active project, user flows, loading state, and any error messages
  return { project: activeProject, userFlows, loading, error };
};

export default useProject;
