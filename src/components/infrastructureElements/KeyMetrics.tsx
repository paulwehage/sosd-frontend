import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';

interface KeyMetric {
  name: string;
  value: number;
  dataType: string;
}

interface KeyMetricsProps {
  metrics: {
    dailyCo2Consumption: number;
    keyMetric1: KeyMetric;
    keyMetric2: KeyMetric;
  };
}

const KeyMetrics: FC<KeyMetricsProps> = ({ metrics }) => {
  const { dailyCo2Consumption, keyMetric1, keyMetric2 } = metrics;

  const orderedMetrics = [
    { name: 'Daily CO2 Consumption', value: dailyCo2Consumption, dataType: 'decimal' },
    keyMetric1,
    keyMetric2
  ];

  return (
    <>
      <Typography variant="h6" gutterBottom>Key Metrics</Typography>
      <Grid container spacing={2}>
        {orderedMetrics.map((metric, index) => (
          <Grid item xs={4} key={index}>
            <Typography variant="subtitle2">{metric.name}</Typography>
            <Typography variant="h5">
              {metric.dataType === 'decimal' ? metric.value.toFixed(2) : metric.value}
              {metric.dataType === 'decimal' ? ' g' : ''}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default KeyMetrics;