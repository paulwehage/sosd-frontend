import { useContext } from 'react';
import { ProjectContext } from '../../context/ProjectContext.tsx';

// Custom hook to access the ProjectContext
const useProjectContext = () => {
  // Get the current context value using React's useContext hook
  const context = useContext(ProjectContext);

  // If the context is not within a ProjectProvider, throw an error
  if (context === undefined) {
    throw new Error('useProjectContext must be used within a ProjectProvider');
  }

  // Return the context value if it is correctly provided
  return context;
};

export default useProjectContext;
