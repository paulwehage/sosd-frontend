import React, { FC } from 'react';
import { Typography, Box } from '@mui/material';
import { BarChart } from '@mui/x-charts';

interface PipelineHistoricalChartProps {
  data: any[]; // Typ entsprechend Ihrer Datenstruktur anpassen
}

const PipelineHistoricalChart: FC<PipelineHistoricalChartProps> = ({ data }) => {
  const chartData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString(),
    co2: item.total_co2_consumption
  }));

  return (
    <Box>
      <Typography variant="h6">Historical Data</Typography>
      <BarChart
        dataset={chartData}
        xAxis={[{ scaleType: 'band', dataKey: 'date' }]}
        series={[{ dataKey: 'co2', label: 'CO2 Consumption' }]}
        height={300}
        width={600}
      />
      <Typography>Pipeline Runs weekly</Typography>
      <Typography variant="h6">
        Average Pipeline Consumption 1 week: {calculateAverageConsumption(data)}g CO2e
      </Typography>
      <Typography variant="h6">
        SCI per week: {calculateSCI(data)}g CO2e
      </Typography>
    </Box>
  );
};

export default PipelineHistoricalChart;

function calculateAverageConsumption(data: any[]): string {
  const totalConsumption = data.reduce((sum, item) => sum + item.total_co2_consumption, 0);
  return (totalConsumption / data.length).toFixed(2);
}

function calculateSCI(data: any[]): string {
  // Diese Funktion muss entsprechend Ihrer Berechnungsmethode für SCI implementiert werden
  return "550"; // Placeholder
}