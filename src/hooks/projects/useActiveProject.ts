import { useContext } from 'react';
import { ProjectContext } from '../../context/ProjectContext.tsx';

// Custom hook to access the active project from the ProjectContext
const useActiveProject = () => {
  // Get the current context value using React's useContext hook
  const context = useContext(ProjectContext);

  // If the context is not provided by a ProjectProvider, throw an error
  if (context === undefined) {
    throw new Error('useActiveProject must be used within a ProjectProvider');
  }

  // Return the active project from the context
  return context.activeProject;
};

export default useActiveProject;
