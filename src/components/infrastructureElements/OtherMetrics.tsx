import React, { FC } from 'react';
import { Grid, Typography } from '@mui/material';

interface Metric {
  name: string;
  value: number;
  dataType: string;
}

interface OtherMetricsProps {
  metrics: Metric[];
}

const OtherMetrics: FC<OtherMetricsProps> = ({ metrics }) => (
  <>
    <Typography variant="h6" gutterBottom>Other Metrics</Typography>
    <Grid container spacing={2}>
      {metrics.map((metric) => (
        <Grid item xs={6} key={metric.name}>
          <Typography variant="subtitle2">{metric.name}</Typography>
          <Typography variant="body1">
            {metric.value}
            {metric.dataType === 'decimal' ? 'g' : metric.name.toLowerCase().includes('duration') ? 'ms' : ''}
          </Typography>
        </Grid>
      ))}
    </Grid>
  </>
);

export default OtherMetrics;