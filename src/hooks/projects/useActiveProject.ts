import { useContext } from 'react';
import {ProjectContext} from '../../context/ProjectContext.tsx';

const useActiveProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useActiveProject must be used within a ProjectProvider');
  }
  return context.activeProject;
};

export default useActiveProject;