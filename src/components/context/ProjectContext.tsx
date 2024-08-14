// src/contexts/ProjectContext.tsx
import React, {createContext, useContext, useState, ReactNode, useCallback} from 'react';
import {ProjectDetail} from '../../services/projects/project.interface.ts';

interface ProjectContextType {
  activeProject: ProjectDetail | null;
  setActiveProject: (project: ProjectDetail | null) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjectContext = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};

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