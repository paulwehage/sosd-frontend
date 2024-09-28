import React, { FC } from 'react';
import { Typography, Select, MenuItem, Grid, Paper, SelectChangeEvent } from '@mui/material';
import { GitHub, Cloud } from '@mui/icons-material';

// Props interface for `PipelineHeader`, replace `any` with the correct type for your data structure
interface PipelineHeaderProps {
  pipeline: any; // The pipeline object containing details like name, runs, etc.
  selectedRunId: number | null; // ID of the currently selected pipeline run
  onRunChange: (runId: number) => void; // Function to handle changes in run selection
}

// Functional component for rendering the header information of a pipeline
const PipelineHeader: FC<PipelineHeaderProps> = ({ pipeline, selectedRunId, onRunChange }) => {
  // Handle changes in the selected run from the dropdown
  const handleRunChange = (event: SelectChangeEvent<number>) => {
    onRunChange(event.target.value as number);
  };

  // Sort pipeline runs in descending order based on their ID
  const sortedRuns = [...pipeline.cicdPipelineRuns].sort((a, b) => b.id - a.id);
  // Find the selected run based on the provided ID or default to the first run if not found
  const selectedRun = sortedRuns.find(run => run.id === selectedRunId) || sortedRuns[0];

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 3 }}> {/* Container with elevation and padding */}
      <Grid container spacing={2} alignItems="center">
        {/* Left Section: Pipeline details */}
        <Grid item xs={12} md={6}>
          {/* Display pipeline name */}
          <Typography variant="h5">{pipeline.pipelineName}</Typography>
          {/* Display repository name and branch with GitHub icon */}
          <Typography><GitHub /> {pipeline.repoName} ({pipeline.branch})</Typography>
          {/* Display cloud provider with cloud icon */}
          <Typography><Cloud /> {pipeline.cloudProvider}</Typography>
        </Grid>

        {/* Right Section: Run selection dropdown */}
        <Grid item xs={12} md={6}>
          {/* Dropdown to select a pipeline run */}
          <Select
            value={selectedRun.id} // Set current value to the selected run's ID
            onChange={handleRunChange} // Handle selection changes
            displayEmpty
            fullWidth
            sx={{ mt: 2 }} // Top margin for spacing
          >
            {/* Map over sorted runs to create dropdown menu items */}
            {sortedRuns.map((run: PipelineRun) => (
              <MenuItem key={run.id} value={run.id}>
                Run {run.id} - {new Date(run.startTime).toLocaleString()} {/* Display run ID and start time */}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PipelineHeader;
