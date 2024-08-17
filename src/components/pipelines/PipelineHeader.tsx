import React, { FC } from 'react';
import { Typography, Select, MenuItem, Grid } from '@mui/material';
import { GitHub, Cloud } from '@mui/icons-material';

interface PipelineHeaderProps {
  pipeline: any; // Typ entsprechend Ihrer Datenstruktur anpassen
  selectedRunId: number | null;
  onRunChange: (runId: number) => void;
}

const PipelineHeader: FC<PipelineHeaderProps> = ({ pipeline, selectedRunId, onRunChange }) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={6}>
        <Typography variant="h5">{pipeline.pipelineName}</Typography>
        <Typography><GitHub /> {pipeline.repoName} ({pipeline.branch})</Typography>
        <Typography><Cloud /> {pipeline.cloudProvider}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Select
          value={selectedRunId || ''}
          onChange={(e) => onRunChange(Number(e.target.value))}
          fullWidth
        >
          {pipeline.cicdPipelineRuns.map((run: any) => (
            <MenuItem key={run.id} value={run.id}>
              Last run: {new Date(run.startTime).toLocaleString()}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};

export default PipelineHeader;