import React from 'react';
import { Card, CardContent, Typography, Chip, Box, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Project } from '../../services/projects/project.interface';

interface ProjectCardProps {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/projects/${project.id}`);
  };

  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: '0.3s',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
      }}
      onClick={handleClick}
    >
      <CardContent>
        <Typography variant="h6" component="div" noWrap>
          {project.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {project.description.length > 100
            ? `${project.description.substring(0, 100)}...`
            : project.description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
          {project.tags.map((tag, index) => (
            <Chip key={index} label={tag.name} size="small" />
          ))}
        </Box>
        <Typography variant="caption" display="block">
          Created: {new Date(project.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="caption" display="block">
          Last Updated: {new Date(project.lastUpdated).toLocaleDateString()}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          <IconButton onClick={(e) => { e.stopPropagation(); onEdit(); }} size="small">
            <EditIcon />
          </IconButton>
          <IconButton onClick={(e) => { e.stopPropagation(); onDelete(); }} size="small">
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;