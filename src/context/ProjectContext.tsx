import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { ProjectDetail } from '../services/projects/project.interface';

interface BreadcrumbInfo {
  pipelineName: string;
  elementName: string;
}

interface ProjectContextType {
  activeProject: ProjectDetail | null;
  setActiveProject: (project: ProjectDetail | null) => void;
  breadcrumbInfo: BreadcrumbInfo;
  setBreadcrumbInfo: (info: Partial<BreadcrumbInfo>) => void;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

interface ProjectProviderProps {
  children: ReactNode;
}

export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);
  const [breadcrumbInfo, setBreadcrumbInfo] = useState<BreadcrumbInfo>({
    pipelineName: '',
    elementName: '',
  });

  const setActiveProjectWrapper = useCallback((project: ProjectDetail | null) => {
    setActiveProject(project);
  }, []);

  const setBreadcrumbInfoWrapper = useCallback((info: Partial<BreadcrumbInfo>) => {
    setBreadcrumbInfo(prev => ({ ...prev, ...info }));
  }, []);

  return (
    <ProjectContext.Provider
      value={{
        activeProject,
        setActiveProject: setActiveProjectWrapper,
        breadcrumbInfo,
        setBreadcrumbInfo: setBreadcrumbInfoWrapper
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjectContext = () => {
  const context = React.useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }
  return context;
};