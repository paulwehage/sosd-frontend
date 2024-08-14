import React, {useMemo} from 'react';
import { useParams, Outlet } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import useProject from '../hooks/projects/useProject';
import useHistoricalData from '../hooks/historicalData/useHistoricalData';
import SDLCOverview from '../components/project/SDLCOverview';
import UserFlows from '../components/project/UserFlows';
import ProjectChart from '../components/project/ProjectChart';
import dayjs from 'dayjs';

const ProjectPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id);
  const { project, userFlows, loading: projectLoading, error: projectError } = useProject(projectId);
  const projectTags = useMemo(() => project?.tags.map(tag => tag.name) || [], [project?.tags]);

  const { data: historicalData, loading: historicalLoading, error: historicalError } = useHistoricalData({
    type: 'project',
    startDate: dayjs('2024-05-16').startOf('day').toISOString(),
    endDate: dayjs('2024-07-16').startOf('day').toISOString(),
    tags: projectTags
  });

  if (projectLoading || historicalLoading) return <div>Loading...</div>;
  if (projectError || historicalError) return <div>Error: {projectError || historicalError}</div>;
  if (!project) return <div>Project not found</div>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>{project.name}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <SDLCOverview data={project.sdlcOverview} projectId={projectId} />
          <Box sx={{ mt: 2 }}>
            <UserFlows flows={userFlows} />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <ProjectChart data={historicalData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectPage;