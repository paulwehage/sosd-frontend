import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';

interface InfrastructureElementHistoricalChartProps {
  data: { date: string; co2: number }[];
}

const InfrastructureElementHistoricalChart: FC<InfrastructureElementHistoricalChartProps> = ({ data }) => (
  <Box sx={{ height: 400, width: '100%' }}>
    <Typography variant="h6" gutterBottom>CO2 Consumption History</Typography>
    <BarChart
      xAxis={[{ scaleType: 'band', data: data.map(d => d.date) }]}
      series={[{ data: data.map(d => d.co2) }]}
      height={350}
      width={500}
    />
  </Box>
);

export default InfrastructureElementHistoricalChart;