import { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid } from '@mui/material';
import useProject from '../hooks/projects/useProject';
import useHistoricalData from '../hooks/historicalData/useHistoricalData';
import SDLCOverview from '../components/project/SDLCOverview';
import UserFlows from '../components/project/UserFlows';
import ProjectChart from '../components/project/ProjectChart';
import dayjs from 'dayjs';
import LoadingCircle from '../components/LoadingCircle.tsx';
import { DATE_BEGIN, DATE_END } from '../constants';

// Main component for displaying details about a single project
const ProjectPage: FC = () => {
  // Get the project ID from the URL parameters
  const { id } = useParams<{ id: string }>();
  const projectId = Number(id); // Convert the ID to a number

  // Fetch project details and user flows using a custom hook
  const { project, userFlows, loading: projectLoading, error: projectError } = useProject(projectId);

  // Extract project tags for use in historical data filtering
  const projectTags = useMemo(() => project?.tags.map(tag => tag.name) || [], [project?.tags]);

  // Fetch historical data for the project's SDLC (Software Development Life Cycle)
  const { data: historicalData, loading: historicalLoading, error: historicalError } = useHistoricalData({
    type: 'sdlc', // Specify the type as 'sdlc'
    startDate: dayjs(DATE_BEGIN).startOf('day').toISOString(), // Start date formatted as ISO
    endDate: dayjs(DATE_END).startOf('day').toISOString(),     // End date formatted as ISO
    tags: projectTags // Use the project's tags to filter historical data
  });

  // Combine loading states for both project data and historical data
  const isLoading = projectLoading || historicalLoading;

  // Display a loading indicator if either project or historical data is still being fetched
  if (isLoading) {
    return <LoadingCircle />;
  }

  // Display an error message if there was an error fetching the project data
  if (projectError) {
    return <Typography color="error">Error loading project: {projectError}</Typography>;
  }

  // Display a message if the project could not be found
  if (!project) {
    return <Typography>Project not found</Typography>;
  }

  return (
    <Box>
      {/* Display project name as the page title */}
      <Typography variant="h4" gutterBottom>{project.name}</Typography>

      <Grid container spacing={2}>
        {/* Left Column: SDLC Overview and User Flows */}
        <Grid item xs={12} md={6}>
          {/* Conditionally render the SDLC overview if available */}
          {project.sdlcOverview && (
            <SDLCOverview
              data={project.sdlcOverview} // Pass SDLC data to the component
              projectId={projectId} // Pass project ID for any actions
              loading={false} // No loading state needed as it's already fetched
            />
          )}

          {/* Conditionally render user flows if there are any */}
          {userFlows.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <UserFlows flows={userFlows} loading={false} />
            </Box>
          )}
        </Grid>

        {/* Right Column: Project Chart */}
        <Grid item xs={12} md={6}>
          {/* Render the project chart with historical data */}
          <ProjectChart
            data={historicalData} // Pass the historical data to the chart
            loading={historicalLoading} // Pass loading state
            error={historicalError} // Pass error state if any
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectPage;
