import React, { FC, useState, useMemo } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import useProjects from '../hooks/projects/useProjects';
import useHistoricalData from '../hooks/historicalData/useHistoricalData.ts';
import ProjectList from '../components/crossProject/ProjectList';
import ProjectForm from '../components/crossProject/ProjectForm';
import CrossProjectChart from '../components/crossProject/CrossProjectChart';
import Navbar from '../components/navbar/Navbar';
import { Project, ProjectFormData } from '../services/projects/project.interface';
import dayjs from 'dayjs';

const Projects: FC = () => {
  const { projects, loading: projectsLoading, error: projectsError, createProject, updateProject, deleteProject } = useProjects();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { data: historicalData, loading: historicalDataLoading, error: historicalDataError } = useHistoricalData({
    type: 'crossProject',
    startDate: dayjs('2024-05-16').startOf('day').toISOString(),  // Start of day ISO format
    endDate: dayjs('2024-07-25').endOf('day').toISOString()        // End of day ISO format
  });

  const filteredProjects = useMemo(() => {
    return projects.filter(project =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [projects, searchTerm]);

  const handleCreateProject = async (projectData: ProjectFormData) => {
    try {
      await createProject(projectData);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to create project:', error);
    }
  };

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

  const handleDeleteProject = async (id: number) => {
    try {
      await deleteProject(id);
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  const handleOpenForm = (project?: Project) => {
    setEditingProject(project || null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setEditingProject(null);
    setIsFormOpen(false);
  };

  if (projectsLoading || historicalDataLoading) return <div>Loading...</div>;
  if (projectsError || historicalDataError) return <div>Error: {projectsError || historicalDataError}</div>;

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {/* Projects List on the left */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search projects"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              onClick={() => handleOpenForm()}
              sx={{ mb: 2 }}
            >
              Add New Project
            </Button>
            <ProjectList
              projects={filteredProjects}
              onEdit={handleOpenForm}
              onDelete={handleDeleteProject}
            />
          </Grid>

          {/* CrossProjectChart on the right */}
          <Grid item xs={12} md={6}>
            <CrossProjectChart data={historicalData} />
          </Grid>
        </Grid>

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
