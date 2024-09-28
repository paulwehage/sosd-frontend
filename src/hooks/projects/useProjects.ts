import { useState, useEffect } from 'react';
import {
  getAllProjects,
  updateProject as updateProjectService,
  deleteProject as deleteProjectService,
  createProject as createProjectService,
} from '../../services/projects/project.service';
import { Project, ProjectFormData } from '../../services/projects/project.interface';

// Custom hook to manage project operations: fetch, create, update, and delete projects
const useProjects = () => {
  // State to store the list of projects
  const [projects, setProjects] = useState<Project[]>([]);
  // State to track the loading status of project operations
  const [loading, setLoading] = useState<boolean>(true);
  // State to store any error messages encountered during operations
  const [error, setError] = useState<string | null>(null);

  // Function to fetch all projects from the API
  const fetchProjects = async () => {
    try {
      setLoading(true); // Set loading state to true before starting fetch
      const data = await getAllProjects(); // Fetch all projects
      setProjects(data); // Store fetched projects in state
      setError(null); // Clear any previous error state
    } catch (err) {
      // Set error message if fetching fails
      setError('Failed to fetch projects');
    } finally {
      // Set loading state to false once fetching is complete
      setLoading(false);
    }
  };

  // Function to create a new project
  const createProject = async (projectData: ProjectFormData) => {
    try {
      // Call the service to create a new project
      const newProject = await createProjectService(projectData);
      // Add the new project to the existing list of projects
      setProjects(prevProjects => [...prevProjects, newProject]);
      return newProject; // Return the newly created project
    } catch (err) {
      console.error('Error creating project:', err); // Debug log for errors
      setError('Failed to create project'); // Set error message if creation fails
      throw err; // Rethrow error for further handling
    }
  };

  // Function to update an existing project
  const updateProject = async (id: number, projectData: ProjectFormData) => {
    try {
      // Call the service to update the project
      const updatedProject = await updateProjectService(id, projectData);
      // Update the list of projects with the updated project
      setProjects(prevProjects => prevProjects.map(p => p.id === id ? updatedProject : p));
      return updatedProject; // Return the updated project
    } catch (err) {
      setError('Failed to update project'); // Set error message if update fails
      throw err; // Rethrow error for further handling
    }
  };

  // Function to delete a project by its ID
  const deleteProject = async (id: number) => {
    try {
      // Call the service to delete the project
      await deleteProjectService(id);
      // Remove the deleted project from the list of projects
      setProjects(prevProjects => prevProjects.filter(p => p.id !== id));
    } catch (err) {
      setError('Failed to delete project'); // Set error message if deletion fails
      throw err; // Rethrow error for further handling
    }
  };

  // Fetch all projects when the component using this hook is mounted
  useEffect(() => {
    fetchProjects();
  }, []); // Empty dependency array ensures it runs only once on mount

  // Return state and CRUD functions for managing projects
  return {
    projects,
    loading,
    error,
    createProject,
    updateProject,
    deleteProject,
    refetchProjects: fetchProjects, // Allow manual refetching of projects
  };
};

export default useProjects;
