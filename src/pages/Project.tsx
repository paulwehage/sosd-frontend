import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {Box, Typography, Grid} from '@mui/material';
import useProject from '../hooks/projects/useProject';
import useHistoricalData from '../hooks/historicalData/useHistoricalData';
import SDLCOverview from '../components/project/SDLCOverview';
import UserFlows from '../components/project/UserFlows';
import ProjectChart from '../components/project/ProjectChart';
import dayjs from 'dayjs';
import LoadingCircle from '../components/LoadingCircle.tsx';

const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);
  const { project, userFlows, loading: projectLoading, error: projectError } = useProject(projectId);
  const projectTags = useMemo(() => project?.tags.map(tag => tag.name) || [], [project?.tags]);

  const { data: historicalData, loading: historicalLoading, error: historicalError } = useHistoricalData({
    type: 'sdlc',
    startDate: dayjs('2024-05-16').startOf('day').toISOString(),
    endDate: dayjs('2024-07-16').startOf('day').toISOString(),
    tags: projectTags
  });

  const isLoading = projectLoading || historicalLoading;

  if (isLoading) {
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
          {project.sdlcOverview && (
            <SDLCOverview
              data={project.sdlcOverview}
              projectId={projectId}
              loading={false}
            />
          )}
          {userFlows.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <UserFlows flows={userFlows} loading={false} />
            </Box>
          )}
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