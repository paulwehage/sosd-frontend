import {API_DOMAIN} from '../../constants';
import {Project, ProjectDetail, ProjectFormData} from './project.interface';

/**
 * Fetches all projects.
 *
 * @returns {Promise<Project[]>} A promise that resolves to an array of Project objects.
 * @throws Will throw an error if the fetch operation fails.
 */
export const getAllProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${API_DOMAIN}/projects`);
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
};

/**
 * Fetches a specific project by its ID.
 *
 * @param {number} id - The unique identifier of the project.
 * @returns {Promise<ProjectDetail>} A promise that resolves to a ProjectDetail object.
 * @throws Will throw an error if the fetch operation fails.
 */
export const getProject = async (id: number): Promise<ProjectDetail> => {
  try {
    const response = await fetch(`${API_DOMAIN}/projects/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};

/**
 * Creates a new project.
 *
 * @param {ProjectFormData} projectData - The data for the new project.
 * @returns {Promise<Project>} A promise that resolves to the created Project object.
 * @throws Will throw an error if the fetch operation fails.
 */
export const createProject = async (projectData: ProjectFormData): Promise<Project> => {
  const response = await fetch(`${API_DOMAIN}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...projectData,
      tags: projectData.tags  // Ensure tags are sent as an array of strings
    }),
  });
  if (!response.ok) {
    throw new Error('Failed to create project');
  }
  return response.json();
};

/**
 * Updates an existing project.
 *
 * @param {number} id - The unique identifier of the project.
 * @param {ProjectFormData} projectData - The updated data for the project.
 * @returns {Promise<Project>} A promise that resolves to the updated Project object.
 * @throws Will throw an error if the fetch operation fails.
 */
export const updateProject = async (id: number, projectData: ProjectFormData): Promise<Project> => {
  console.log(id, projectData)
  const response = await fetch(`${API_DOMAIN}/projects/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
  });
  return response.json();
};

/**
 * Deletes a project by its ID.
 *
 * @param {number} id - The unique identifier of the project.
 * @returns {Promise<void>} A promise that resolves when the project is deleted.
 * @throws Will throw an error if the fetch operation fails.
 */
export const deleteProject = async (id: number): Promise<void> => {
  const response = await fetch(`${API_DOMAIN}/projects/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
};