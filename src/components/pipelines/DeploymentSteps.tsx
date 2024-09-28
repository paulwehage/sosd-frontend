import React, { FC } from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

// Props interface for `DeploymentSteps`, replace `any[]` with the proper type corresponding to your data structure
interface DeploymentStepsProps {
  steps: any[]; // Array of deployment step objects
}

// Functional component for rendering a table of deployment steps
const DeploymentSteps: FC<DeploymentStepsProps> = ({ steps }) => {
  return (
    <>
      {/* Paper container for elevation and padding */}
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        {/* Title for the deployment steps table */}
        <Typography variant="h6">Deployment</Typography>

        {/* Table to display deployment step details */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Stage</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Consumption</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Map through the steps array to render each deployment step */}
            {steps.map((step, index) => (
              <TableRow key={index}> {/* Use index as key for each row */}
                {/* Display deployment stage name */}
                <TableCell>{step.deploymentStage}</TableCell>

                {/* Display formatted duration */}
                <TableCell>{formatDuration(step.duration)}</TableCell>

                {/* Display CO2 consumption with two decimal places */}
                <TableCell>{step.co2Consumption.toFixed(2)}g CO2e</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </>
  );
};

export default DeploymentSteps;

// Utility function to format duration in milliseconds into "HH:mm:ss"
function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000); // Convert milliseconds to seconds
  const minutes = Math.floor(seconds / 60); // Convert seconds to minutes
  const hours = Math.floor(minutes / 60); // Convert minutes to hours
  // Return formatted string as "HH:mm:ss"
  return `${hours.toString().padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
}
