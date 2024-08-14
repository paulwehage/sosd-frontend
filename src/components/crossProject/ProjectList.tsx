import React from 'react';
import { Grid } from '@mui/material';
import { Project } from '../../services/projects/project.interface';
import ProjectCard from './ProjectCard';

interface ProjectListProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: number) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onEdit, onDelete }) => {
  return (
    <Grid container spacing={2}>
      {projects.map((project) => (
        <Grid item xs={12} sm={6} key={project.id}>
          <ProjectCard
            project={project}
            onEdit={() => onEdit(project)}
            onDelete={() => onDelete(project.id)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectList;