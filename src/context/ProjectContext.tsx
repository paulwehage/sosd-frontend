import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { ProjectDetail } from '../services/projects/project.interface';

// Interface for breadcrumb information in the context
interface BreadcrumbInfo {
  pipelineName: string;
  elementName: string;
}

// Interface defining the shape of the context's value
interface ProjectContextType {
  activeProject: ProjectDetail | null; // The currently active project
  setActiveProject: (project: ProjectDetail | null) => void; // Function to set the active project
  breadcrumbInfo: BreadcrumbInfo; // Information used for breadcrumb navigation
  setBreadcrumbInfo: (info: Partial<BreadcrumbInfo>) => void; // Function to update breadcrumb information
}

// Create the context with an initial value of `undefined`
export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Interface for the provider's props, expecting `children` nodes
interface ProjectProviderProps {
  children: ReactNode; // The child components wrapped by the provider
}

// Context provider component that supplies project-related data to its children
export const ProjectProvider: React.FC<ProjectProviderProps> = ({ children }) => {
  // State to store the currently active project
  const [activeProject, setActiveProject] = useState<ProjectDetail | null>(null);

  // State to store breadcrumb information for navigation
  const [breadcrumbInfo, setBreadcrumbInfo] = useState<BreadcrumbInfo>({
    pipelineName: '',
    elementName: '',
  });

  // Wrapper function for setting the active project, using `useCallback` to avoid unnecessary re-renders
  const setActiveProjectWrapper = useCallback((project: ProjectDetail | null) => {
    setActiveProject(project);
  }, []);

  // Wrapper function for updating breadcrumb information, using `useCallback` for performance optimization
  const setBreadcrumbInfoWrapper = useCallback((info: Partial<BreadcrumbInfo>) => {
    setBreadcrumbInfo(prev => ({ ...prev, ...info }));
  }, []);

  return (
    // Provide the context values to child components
    <ProjectContext.Provider
      value={{
        activeProject,
        setActiveProject: setActiveProjectWrapper,
        breadcrumbInfo,
        setBreadcrumbInfo: setBreadcrumbInfoWrapper
      }}
    >
      {children} {/* Render child components wrapped by this provider */}
    </ProjectContext.Provider>
  );
};

// Custom hook to use the ProjectContext in functional components
export const useProjectContext = () => {
  const context = React.useContext(ProjectContext);

  // Throw an error if the hook is used outside of the `ProjectProvider`
  if (context === undefined) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }

  return context; // Return the context value
};
