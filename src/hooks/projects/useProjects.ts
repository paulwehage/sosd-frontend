import { useState, useEffect } from 'react';
import { getAllProjects, updateProject as updateProjectService, deleteProject as deleteProjectService, createProject as createProjectService, getProject } from '../../services/projects/project.service';
import { Project, ProjectFormData } from '../../services/projects/project.interface';

const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getAllProjects();
      setProjects(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch projects');
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData: ProjectFormData) => {
    try {
      const newProject = await createProjectService(projectData);
      setProjects(prevProjects => [...prevProjects, newProject]);
      return newProject;
    } catch (err) {
      console.error('Error creating project:', err);  // Debug log
      setError('Failed to create project');
      throw err;
    }
  };

  const updateProject = async (id: number, projectData: ProjectFormData) => {
    try {
      const updatedProject = await updateProjectService(id, projectData);
      setProjects(prevProjects => prevProjects.map(p => p.id === id ? updatedProject : p));
      return updatedProject;
    } catch (err) {
      setError('Failed to update project');
      throw err;
    }
  };

  const deleteProject = async (id: number) => {
    try {
      await deleteProjectService(id);
      setProjects(prevProjects => prevProjects.filter(p => p.id !== id));
    } catch (err) {
      setError('Failed to delete project');
      throw err;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    refetchProjects: fetchProjects,
  };
};

export default useProjects;