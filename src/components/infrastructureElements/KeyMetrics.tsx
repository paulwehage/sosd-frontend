import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';

// Interface defining the shape of a single metric
interface KeyMetric {
  name: string; // Name of the metric
  value: number; // Numerical value of the metric
  dataType: string; // Type of the data (e.g., 'decimal' or other)
}

// Interface defining the props for `KeyMetrics`
interface KeyMetricsProps {
  metrics: {
    dailyCo2Consumption: number; // CO2 consumption for the day
    keyMetric1: KeyMetric; // Additional key metric
    keyMetric2: KeyMetric; // Another key metric
  };
}

// Functional component for rendering key metrics in a grid layout
const KeyMetrics: FC<KeyMetricsProps> = ({ metrics }) => {
  const { dailyCo2Consumption, keyMetric1, keyMetric2 } = metrics;

  // Organize metrics in a consistent order for display
  const orderedMetrics = [
    { name: 'Daily CO2 Consumption', value: dailyCo2Consumption, dataType: 'decimal' }, // Daily CO2 is always the first metric
    keyMetric1, // Second key metric
    keyMetric2 // Third key metric
  ];

  return (
    <>
      {/* Header for the metrics section */}
      <Typography variant="h6" gutterBottom>Key Metrics</Typography>

      {/* Grid container to lay out metrics in a responsive format */}
      <Grid container spacing={2}>
        {orderedMetrics.map((metric, index) => (
          <Grid item xs={4} key={index}>
            {/* Metric name */}
            <Typography variant="subtitle2">{metric.name}</Typography>

            {/* Metric value, formatted based on its data type */}
            <Typography variant="h5">
              {metric.dataType === 'decimal' ? metric.value.toFixed(2) : metric.value} {/* Format to 2 decimal places if dataType is 'decimal' */}
              {metric.dataType === 'decimal' ? ' g' : ''} {/* Append 'g' to decimal values */}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default KeyMetrics;
