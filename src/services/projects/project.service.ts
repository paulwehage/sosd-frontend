import {API_DOMAIN} from '../../constants';
import {Project, ProjectDetail, ProjectFormData} from './project.interface';

export const getAllProjects = async (): Promise<Project[]> => {
  const response = await fetch(`${API_DOMAIN}/projects`);
  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }
  return response.json();
};

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

export const createProject = async (projectData: ProjectFormData): Promise<Project> => {
  const response = await fetch(`${API_DOMAIN}/projects`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
  });
  return response.json();
};

export const updateProject = async (id: number, projectData: ProjectFormData): Promise<Project> => {
  const response = await fetch(`${API_DOMAIN}/projects/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(projectData),
  });
  return response.json();
};

export const deleteProject = async (id: number): Promise<void> => {
  const response = await fetch(`${API_DOMAIN}/projects/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }
};