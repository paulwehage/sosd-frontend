// src/hooks/projects/useProject.ts
import { useState, useEffect } from 'react';
import { getProject } from '../../services/projects/project.service';
import {UserFlow} from '../../services/userFlows/userflows.interface.ts';
import {getUserFlows} from '../../services/userFlows/userflows.service.ts';
import useProjectContext from '../context/useProjectContext.ts';

const useProject = (projectId: number) => {
  const { activeProject, setActiveProject } = useProjectContext();
  const [userFlows, setUserFlows] = useState<UserFlow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      if (activeProject && activeProject.id === projectId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const [projectData, userFlowsData] = await Promise.all([
          getProject(projectId),
          getUserFlows(projectId)
        ]);
        setActiveProject(projectData);
        setUserFlows(userFlowsData);
        setError(null);
      } catch (err) {
        console.error('Error fetching project data:', err);
        setError('Failed to fetch project data');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [projectId, activeProject, setActiveProject]);

  return { project: activeProject, userFlows, loading, error };
};

export default useProject;