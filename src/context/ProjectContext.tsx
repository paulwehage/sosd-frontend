// src/contexts/ProjectContext.tsx
import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { ProjectDetail } from '../services/projects/project.interface';

interface ProjectContextType {
  activeProject: ProjectDetail | null;
  setActiveProject: (project: ProjectDetail | null) => void;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

interface ProjectProviderProps {
  children: ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);

  const setActiveProjectWrapper = useCallback((project: ProjectDetail | null) => {
    setActiveProject(project);
  }, []);

  return (
    <ProjectContext.Provider value={{ activeProject, setActiveProject: setActiveProjectWrapper }}>
      {children}
    </ProjectContext.Provider>
  );
};