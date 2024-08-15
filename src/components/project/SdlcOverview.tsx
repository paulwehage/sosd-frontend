import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { SdlcStep } from '../../services/projects/project.interface.ts';
import { Link as RouterLink } from 'react-router-dom';
import LoadingCircle from '../LoadingCircle.tsx';

interface SDLCOverviewProps {
  data?: {
    totalCo2: number;
    steps: SdlcStep[];
  };
  projectId: number;
  loading: boolean;
}

const SDLCOverview: React.FC<SDLCOverviewProps> = ({ data, projectId, loading }) => {
  const getStepPath = (stepName: string) => {
    return stepName.toLowerCase().replace('_', '-');
  };

  if (loading) return <LoadingCircle />;

  if (!data) {
    return (
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography>SDLC Overview data is not available</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Software Development Lifecycle</Typography>
      <Grid container spacing={1}>
        {data.steps.map((step) => (
          <Grid item xs={6} sm={4} key={step.name}>
            <Box
              component={RouterLink}
              to={`/projects/${projectId}/${getStepPath(step.name)}`}
              sx={{
                display: 'block',
                border: 1,
                borderColor: 'grey.300',
                p: 1,
                borderRadius: 1,
                textDecoration: 'none',
                color: 'inherit',
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <Typography variant="subtitle2">{step.name}</Typography>
              <Typography variant="body2" noWrap>
                {step.totalCo2 > 0 ? `${step.totalCo2}g CO2e this Week` : 'No measurements'}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 1, p: 1, border: 1, borderColor: 'grey.300', borderRadius: 1 }}>
        <Typography variant="subtitle2">CO2 consumed this week</Typography>
        <Typography variant="h6">~{(data.totalCo2 / 1000).toFixed(3)} kg CO2e</Typography>
      </Box>
    </Paper>
  );
};

export default SDLCOverview;