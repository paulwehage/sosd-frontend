import React, { FC } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';

interface DeploymentStepsProps {
  steps: any[]; // Typ entsprechend Ihrer Datenstruktur anpassen
}

const DeploymentSteps: FC<DeploymentStepsProps> = ({ steps }) => {
  return (
    <>
      <Typography variant="h6">Deployment</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Stage</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Consumption</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {steps.map((step, index) => (
            <TableRow key={index}>
              <TableCell>{step.deploymentStage}</TableCell>
              <TableCell>{formatDuration(step.duration)}</TableCell>
              <TableCell>{step.co2Consumption.toFixed(2)}g CO2e</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default DeploymentSteps;

function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  return `${hours.toString().padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
}