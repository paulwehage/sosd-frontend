import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { SdlcStep } from '../../services/projects/project.interface.ts';
import { Link as RouterLink } from 'react-router-dom';
import LoadingCircle from '../LoadingCircle.tsx';

// Props interface for `SDLCOverview` component
interface SDLCOverviewProps {
  data?: {
    totalCo2: number; // Total CO2 consumption across all steps
    steps: SdlcStep[]; // Array of SDLC steps
  };
  projectId: number; // ID of the project associated with the SDLC steps
  loading: boolean; // Loading state indicating whether data is being fetched
}

// Functional component to render an overview of the Software Development Lifecycle (SDLC)
const SDLCOverview: React.FC<SDLCOverviewProps> = ({ data, projectId, loading }) => {
  // Helper function to create a URL-friendly path from the step name
  const getStepPath = (stepName: string) => {
    return stepName.toLowerCase().replace('_', '-'); // Replace underscores with hyphens and convert to lowercase
  };

  // Show loading spinner while data is being fetched
  if (loading) return <LoadingCircle />;

  // Display a message if data is unavailable
  if (!data) {
    return (
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography>SDLC Overview data is not available</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      {/* Section title */}
      <Typography variant="h6" gutterBottom>Software Development Lifecycle</Typography>

      {/* Grid layout to display each SDLC step */}
      <Grid container spacing={1}>
        {data.steps.map((step) => (
          <Grid item xs={6} sm={4} key={step.name}>
            {/* Each step is a link to a detailed page */}
            <Box
              component={RouterLink}
              to={`/projects/${projectId}/${getStepPath(step.name)}`} // Link to step-specific path
              sx={{
                display: 'block',
                border: 1,
                borderColor: 'grey.300',
                p: 1,
                borderRadius: 1,
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                  backgroundColor: 'action.hover', // Hover effect
                },
              }}
            >
              {/* Step name and CO2 consumption */}
              <Typography variant="subtitle2">{step.name}</Typography>
              <Typography variant="body2" noWrap>
                {step.totalCo2 > 0 ? `${step.totalCo2}g CO2e this Week` : 'No measurements'} {/* CO2 or fallback text */}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Summary section showing total CO2 consumption */}
      <Box sx={{ mt: 1, p: 1, border: 1, borderColor: 'grey.300', borderRadius: 1 }}>
        <Typography variant="subtitle2">CO2 consumed this week</Typography>
        <Typography variant="h6">~{(data.totalCo2 / 1000).toFixed(3)} kg CO2e</Typography> {/* Convert g to kg */}
      </Box>
    </Paper>
  );
};

export default SDLCOverview;
