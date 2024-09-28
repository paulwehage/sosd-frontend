import React from 'react';
import { Card, CardContent, Typography, Chip, Box, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Project } from '../../services/projects/project.interface';
import useProjectContext from '../../hooks/context/useProjectContext.ts';

// Interface defining the props for the `ProjectCard` component
interface ProjectCardProps {
  project: Project; // Project data to display
  onEdit: () => void; // Callback function for editing the project
  onDelete: () => void; // Callback function for deleting the project
}

// Functional component that displays a card with project information and actions
const ProjectCard: React.FC<ProjectCardProps> = ({ project, onEdit, onDelete }) => {
  const navigate = useNavigate(); // Hook to navigate between routes
  const { setActiveProject } = useProjectContext(); // Access context to set the active project

  // Handles card click to set the active project and navigate to the project's details page
  const handleClick = () => {
    setActiveProject(project);
    navigate(`/projects/${project.id}`);
  };

  return (
    <Card
      // Styling for the card component
      sx={{
        cursor: 'pointer', // Changes cursor to indicate clickability
        transition: '0.3s', // Smooth transition effect on hover
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)', // Changes background color on hover
        },
      }}
      onClick={handleClick} // Sets click event to handle project selection
    >
      <CardContent>
        {/* Project name, truncated if too long */}
        <Typography variant="h6" component="div" noWrap>
          {project.name}
        </Typography>

        {/* Project description, truncated to 100 characters if too long */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {project.description.length > 100
            ? `${project.description.substring(0, 100)}...`
            : project.description}
        </Typography>

        {/* Display project tags using Chip components */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
          {project.tags.map((tag, index) => (
            <Chip key={index} label={tag.name} size="small" />
          ))}
        </Box>

        {/* Display project creation and last updated dates */}
        <Typography variant="caption" display="block">
          Created: {new Date(project.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="caption" display="block">
          Last Updated: {new Date(project.lastUpdated).toLocaleDateString()}
        </Typography>

        {/* Edit and delete buttons with their own click handlers */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
          <IconButton
            onClick={(e) => { e.stopPropagation(); onEdit(); }} // Stop propagation to avoid triggering the card's onClick
            size="small"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={(e) => { e.stopPropagation(); onDelete(); }} // Stop propagation to avoid triggering the card's onClick
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
