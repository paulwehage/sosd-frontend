import React, { FC } from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

// Props interface for `IntegrationSteps`, replace `any[]` with the correct type for your data
interface IntegrationStepsProps {
  steps: any[]; // Array of integration step objects
}

// Functional component to render a table of integration steps
const IntegrationSteps: FC<IntegrationStepsProps> = ({ steps }) => {
  return (
    <>
      {/* Paper container for styling and layout */}
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        {/* Title for the integration steps table */}
        <Typography variant="h6">Integration</Typography>

        {/* Table for displaying integration step details */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Step</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Consumption</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Map through the steps array to render each integration step */}
            {steps.map((step, index) => (
              <TableRow key={index}> {/* Use index as key for each row */}
                {/* Display name of the integration sub-step */}
                <TableCell>{step.integrationSubStepName}</TableCell>

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

export default IntegrationSteps;

// Utility function to format duration in milliseconds into "HH:mm:ss"
function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000); // Convert milliseconds to seconds
  const minutes = Math.floor(seconds / 60); // Convert seconds to minutes
  const hours = Math.floor(minutes / 60); // Convert minutes to hours
  // Return formatted string as "HH:mm:ss"
  return `${hours.toString().padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
}
