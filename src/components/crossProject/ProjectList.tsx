import React from 'react';
import { Grid } from '@mui/material';
import { Project } from '../../services/projects/project.interface';
import ProjectCard from './ProjectCard';

// Interface defining the props for the `ProjectList` component
interface ProjectListProps {
  projects: Project[]; // Array of project objects to be displayed in the list
  onEdit: (project: Project) => void; // Callback function to handle editing a project
  onDelete: (id: number) => void; // Callback function to handle deleting a project by its ID
}

// Functional component to render a list of project cards
const ProjectList: React.FC<ProjectListProps> = ({ projects, onEdit, onDelete }) => {
  return (
    <Grid container spacing={2}> {/* Container grid for project cards with spacing between them */}
      {projects.map((project) => (
        <Grid item xs={12} sm={6} key={project.id}> {/* Responsive grid items for each project */}
          <ProjectCard
            project={project} // Pass project data to `ProjectCard`
            onEdit={() => onEdit(project)} // Trigger `onEdit` callback with the current project
            onDelete={() => onDelete(project.id)} // Trigger `onDelete` callback with the project's ID
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectList;
