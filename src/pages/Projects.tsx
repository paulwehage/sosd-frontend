import React, { FC, useState, useMemo } from 'react';
import { Box, Button, CircularProgress, Grid, TextField } from '@mui/material';
import useProjects from '../hooks/projects/useProjects';
import useHistoricalData from '../hooks/historicalData/useHistoricalData.ts';
import ProjectList from '../components/crossProject/ProjectList';
import ProjectForm from '../components/crossProject/ProjectForm';
import CrossProjectChart from '../components/crossProject/CrossProjectChart';
import { Project, ProjectFormData } from '../services/projects/project.interface';
import dayjs from 'dayjs';
import { DATE_BEGIN, DATE_END } from '../constants';

// Starting Page (Layer 1)
const Projects: FC = () => {
  // Destructure state and methods from custom hook to manage projects
  const { projects, loading: projectsLoading, error: projectsError, createProject, updateProject, deleteProject } = useProjects();
  // State for controlling the form visibility and handling the editing state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  // State for storing search input to filter projects
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch historical data for projects with start and end dates, formatted as ISO strings
  const { data: historicalData, loading: historicalDataLoading, error: historicalDataError } = useHistoricalData({
    type: 'projects',
    startDate: dayjs(DATE_BEGIN).startOf('day').toISOString(),  // Start of day ISO format
    endDate: dayjs(DATE_END).endOf('day').toISOString()         // End of day ISO format
  });

  // Memoized filter function for searching projects based on the search term
  const filteredProjects = useMemo(() => {
    return projects.filter(project =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [projects, searchTerm]);

  // Handler for creating a new project; closes form on success
  const handleCreateProject = async (projectData: ProjectFormData) => {
    try {
      await createProject(projectData);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

  // Handler for updating an existing project; resets editing state on success
  const handleUpdateProject = async (projectData: ProjectFormData) => {
    if (editingProject) {
      try {
        await updateProject(editingProject.id, projectData);
        setEditingProject(null);
      } catch (error) {
        console.error('Failed to update project:', error);
      }
    }
  };

  // Handler for deleting a project by its ID
  const handleDeleteProject = async (id: number) => {
    try {
      await deleteProject(id);
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  // Opens the form to either create a new project or edit an existing one
  const handleOpenForm = (project?: Project) => {
    setEditingProject(project || null);
    setIsFormOpen(true);
  };

  // Closes the form and resets the editing state
  const handleCloseForm = () => {
    setEditingProject(null);
    setIsFormOpen(false);
  };

  // Display loading spinner if either projects or historical data are being fetched
  if (projectsLoading || historicalDataLoading) {
    return (
      <Box width="100%" display="flex">
        <CircularProgress style={{ margin: "0 auto" }} />
      </Box>
    );
  }

  // Display error message if there's an error fetching projects or historical data
  if (projectsError || historicalDataError) return <div>Error: {projectsError || historicalDataError}</div>;

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Projects List on the left */}
          <Grid item xs={12} md={6}>
            {/* TextField for searching/filtering projects */}
            <TextField
              fullWidth
              label="Search projects"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ mb: 2 }}
            />
            {/* Button to add a new project */}
            <Button
              variant="contained"
              onClick={() => handleOpenForm()}
              sx={{ mb: 2 }}
            >
              Add New Project
            </Button>
            {/* List component to display and manage projects */}
            <ProjectList
              projects={filteredProjects}
              onEdit={handleOpenForm}
              onDelete={handleDeleteProject}
            />
          </Grid>

          {/* CrossProjectChart on the right displaying historical data */}
          <Grid item xs={12} md={6}>
            <CrossProjectChart data={historicalData} />
          </Grid>
        </Grid>
        {/* Form component for creating or editing a project */}
        <ProjectForm
          project={editingProject}
          open={isFormOpen}
          onClose={handleCloseForm}
          onSubmit={editingProject ? handleUpdateProject : handleCreateProject}
        />
      </Box>
    </>
  );
};

export default Projects;
