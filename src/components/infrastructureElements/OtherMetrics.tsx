import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';

// Interface defining the shape of each individual metric
interface Metric {
  name: string; // Name of the metric
  value: number; // Numerical value of the metric
  dataType: string; // Type of the data (e.g., 'decimal', 'integer')
}

// Interface defining the props for the `OtherMetrics` component
interface OtherMetricsProps {
  metrics: Metric[]; // Array of metrics to be displayed
}

// Functional component for rendering a list of other metrics
const OtherMetrics: FC<OtherMetricsProps> = ({ metrics }) => (
  <>
    {/* Header for the metrics section */}
    <Typography variant="h6" gutterBottom>Other Metrics</Typography>

    {/* Grid container to display each metric in a responsive layout */}
    <Grid container spacing={2}>
      {metrics.map((metric) => (
        <Grid item xs={6} key={metric.name}> {/* Each metric occupies half the grid width */}
          {/* Metric name */}
          <Typography variant="subtitle2">{metric.name}</Typography>

          {/* Metric value with conditional formatting based on `dataType` and `name` */}
          <Typography variant="body1">
            {metric.value} {/* Display the metric value */}
            {/* Add 'g' if the dataType is 'decimal' */}
            {metric.dataType === 'decimal' ? 'g' : ''}
            {/* Add 'ms' if the metric name contains 'duration' */}
            {metric.name.toLowerCase().includes('duration') ? 'ms' : ''}
          </Typography>
        </Grid>
      ))}
    </Grid>
  </>
);

export default OtherMetrics;
