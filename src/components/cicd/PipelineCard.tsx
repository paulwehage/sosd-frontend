import React, { FC } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useProjectContext from '../../hooks/context/useProjectContext.ts';

// Interface defining the shape of props for `PipelineCard`
interface PipelineCardProps {
  pipeline: {
    id: number; // Unique identifier for the pipeline
    repoName: string; // Repository name associated with the pipeline
    branch: string; // Git branch for the pipeline
    cloudProvider: string; // Cloud provider associated with the pipeline
    pipelineName: string; // Name of the pipeline
    totalCo2: number; // Total CO2 consumption
    keyMetrics: {
      weekly_co2_consumption: number; // CO2 consumption for the week
      integration_consumption_last_run: number; // CO2 consumption for the last integration run
      deployment_consumption_last_run: number; // CO2 consumption for the last deployment run
    };
  };
}

// Functional component to render a card representing a pipeline
const PipelineCard: FC<PipelineCardProps> = ({ pipeline }) => {
  const navigate = useNavigate(); // Hook to programmatically navigate between routes
  const { activeProject } = useProjectContext(); // Get the currently active project from context

  // Handler for card click - navigates to the integration/deployment details for the pipeline
  const handleClick = () => {
    navigate(`/projects/${activeProject!.id}/integration-deployment/${pipeline.id}`);
  };

  return (
    <Card
      // Styling and behavior for the card component
      sx={{
        cursor: 'pointer', // Change cursor to pointer to indicate clickability
        transition: '0.3s', // Smooth transition effect for hover
        marginBottom: 2, // Space between cards
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)', // Slight background color change on hover
        },
      }}
      onClick={handleClick} // Click event handler for navigation
    >
      <CardContent>
        {/* Display the name of the pipeline */}
        <Typography variant="h6" gutterBottom>{pipeline.pipelineName}</Typography>

        {/* Display the repo name and branch information */}
        <Typography variant="subtitle2">{`${pipeline.repoName} (${pipeline.branch})`}</Typography>

        {/* Display the cloud provider name */}
        <Typography variant="body2" color="textSecondary" gutterBottom>{pipeline.cloudProvider}</Typography>

        {/* Grid for displaying key metrics about the pipeline's CO2 consumption */}
        <Grid container spacing={2} sx={{ mt: 2 }}>
          {/* Integration Consumption */}
          <Grid item xs={4}>
            <Typography variant="caption">Integration Consumption</Typography>
            <Typography variant="body1">{`${pipeline.keyMetrics.integration_consumption_last_run.toFixed(2)} g CO2`}</Typography>
          </Grid>

          {/* Deployment Consumption */}
          <Grid item xs={4}>
            <Typography variant="caption">Deployment Consumption</Typography>
            <Typography variant="body1">{`${pipeline.keyMetrics.deployment_consumption_last_run.toFixed(2)} g CO2`}</Typography>
          </Grid>

          {/* Weekly CO2 Consumption */}
          <Grid item xs={4}>
            <Typography variant="caption">Weekly CO2</Typography>
            <Typography variant="body1">{`${pipeline.keyMetrics.weekly_co2_consumption.toFixed(2)} g CO2e`}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PipelineCard;
