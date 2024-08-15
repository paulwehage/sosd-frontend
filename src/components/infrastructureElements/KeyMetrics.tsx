import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';

interface KeyMetric {
  name: string;
  value: number;
  dataType: string;
}

interface KeyMetricsProps {
  metrics: Record<string, KeyMetric>;
}

const KeyMetrics: FC<KeyMetricsProps> = ({ metrics }) => (
  <>
    <Typography variant="h6" gutterBottom>Key Metrics</Typography>
    <Grid container spacing={2}>
      {Object.entries(metrics).map(([key, metric]) => (
        <Grid item xs={4} key={key}>
          <Typography variant="subtitle2">{metric.name}</Typography>
          <Typography variant="h5">{metric.value} {metric.dataType === 'decimal' ? 'g' : ''}</Typography>
        </Grid>
      ))}
    </Grid>
  </>
);

export default KeyMetrics;