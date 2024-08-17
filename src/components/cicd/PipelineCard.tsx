import React, { FC } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import useProjectContext from '../../hooks/context/useProjectContext.ts';

interface PipelineCardProps {
  pipeline: {
    id: number;
    repoName: string;
    branch: string;
    cloudProvider: string;
    pipelineName: string;
    totalCo2: number;
    keyMetrics: {
      weekly_co2_consumption: number;
      integration_consumption_last_run: number;
      deployment_consumption_last_run: number;
    };
  };
}

const PipelineCard: FC<PipelineCardProps> = ({ pipeline }) => {
  const navigate = useNavigate();
  const { activeProject } = useProjectContext();

  const handleClick = () => {
    navigate(`/projects/${activeProject!.id}/operations/${pipeline.id}`)
  };

  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: '0.3s',
        '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
      }}
      onClick={handleClick}>
      <CardContent>
        <Typography variant="h6" gutterBottom>{pipeline.pipelineName}</Typography>
        <Typography variant="subtitle2">{`${pipeline.repoName} (${pipeline.branch})`}</Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>{pipeline.cloudProvider}</Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={4}>
            <Typography variant="caption">Integration Consumption</Typography>
            <Typography variant="body1">{`${pipeline.keyMetrics.integration_consumption_last_run.toFixed(2)} g CO2`}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="caption">Deployment Consumption</Typography>
            <Typography variant="body1">{`${pipeline.keyMetrics.deployment_consumption_last_run.toFixed(2)} g CO2`}</Typography>
          </Grid>
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