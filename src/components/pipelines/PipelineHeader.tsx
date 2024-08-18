import React, { FC } from 'react';
import {Typography, Select, MenuItem, Grid, Paper, SelectChangeEvent} from '@mui/material';
import { GitHub, Cloud } from '@mui/icons-material';

interface PipelineHeaderProps {
  pipeline: any; // Typ entsprechend Ihrer Datenstruktur anpassen
  selectedRunId: number | null;
  onRunChange: (runId: number) => void;
}

const PipelineHeader: FC<PipelineHeaderProps> = ({ pipeline, selectedRunId, onRunChange }) => {

  const handleRunChange = (event: SelectChangeEvent<number>) => {
    onRunChange(event.target.value as number);
  };

  const sortedRuns = [...pipeline.cicdPipelineRuns].sort((a, b) => b.id - a.id);
  const selectedRun = sortedRuns.find(run => run.id === selectedRunId) || sortedRuns[0];

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={6}>
        <Typography variant="h5">{pipeline.pipelineName}</Typography>
        <Typography><GitHub /> {pipeline.repoName} ({pipeline.branch})</Typography>
        <Typography><Cloud /> {pipeline.cloudProvider}</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Select
          value={selectedRun.id}
          onChange={handleRunChange}
          displayEmpty
          fullWidth
          sx={{ mt: 2 }}
        >
          {sortedRuns.map((run: PipelineRun) => (
            <MenuItem key={run.id} value={run.id}>
              Run {run.id} - {new Date(run.startTime).toLocaleString()}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
    </Paper>
  );
};

export default PipelineHeader;