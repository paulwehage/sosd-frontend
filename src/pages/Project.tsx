import React, { useMemo, useEffect } from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { Box, Typography, Grid, CircularProgress } from '@mui/material';
import useProject from '../hooks/projects/useProject';
import useHistoricalData from '../hooks/historicalData/useHistoricalData';
import SDLCOverview from '../components/project/SDLCOverview';
import UserFlows from '../components/project/UserFlows';
import ProjectChart from '../components/project/ProjectChart';
import dayjs from 'dayjs';
import LoadingCircle from '../components/LoadingCircle.tsx';
import useProjectContext from '../hooks/context/useProjectContext.ts';

const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);
  const { project, userFlows, loading: projectLoading, error: projectError } = useProject(projectId);
  const { setActiveProject } = useProjectContext();

  const projectTags = useMemo(() => project?.tags.map(tag => tag.name) || [], [project?.tags]);

  useEffect(() => {
    if (project) {
      setActiveProject(project);
    }
  }, [project, setActiveProject]);

  const { data: historicalData, loading: historicalLoading, error: historicalError } = useHistoricalData({
    type: 'project',
    startDate: dayjs('2024-05-16').startOf('day').toISOString(),
    endDate: dayjs('2024-07-16').startOf('day').toISOString(),
    tags: projectTags
  });

  if (projectLoading) {
    return <LoadingCircle />;
  }

  if (projectError) {
    return <Typography color="error">Error loading project: {projectError}</Typography>;
  }

  if (!project) {
    return <Typography>Project not found</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>{project.name}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <SDLCOverview
            data={project.sdlcOverview}
            projectId={projectId}
            loading={!project.sdlcOverview}
          />
          <Box sx={{ mt: 2 }}>
            <UserFlows flows={userFlows} loading={!userFlows.length} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <ProjectChart
            data={historicalData}
            loading={historicalLoading}
            error={historicalError}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectPage;