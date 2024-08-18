import React, {FC, useState} from 'react';
import {Typography, Box} from '@mui/material';
import {BarChart} from '@mui/x-charts';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs, {Dayjs} from 'dayjs';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';

interface PipelineHistoricalChartProps {
  data: any[]; // Typ entsprechend Ihrer Datenstruktur anpassen
}

const PipelineHistoricalChart: FC<PipelineHistoricalChartProps> = ({data}) => {

  const [startDate, setStartDate] = useState<Dayjs>(dayjs('2024-05-16'));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs('2024-07-25'));

  const chartData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString(),
    co2: item.total_co2_consumption
  }));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        <Typography variant="h6">Historical Data</Typography>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => newValue && setStartDate(newValue.startOf('day'))}  // Start of day
          format="YYYY-MM-DD"  // ISO format
          sx={{mr: 8, ml: 2}}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => newValue && setEndDate(newValue.endOf('day'))}  // End of day
          format="YYYY-MM-DD"  // ISO format
        />
        <BarChart
          dataset={chartData}
          xAxis={[{scaleType: 'band', dataKey: 'date'}]}
          series={[{dataKey: 'co2', label: 'CO2 Consumption'}]}
          height={400}
          width={700}
        />
        <Typography variant="h6">
          Average Pipeline Consumption 1 week: {calculateAverageConsumption(data)}g CO2e
        </Typography>
        <Typography variant="h6">
          SCI per week: {calculateSCI(data)}g CO2e
        </Typography>
      </Box>
    </LocalizationProvider>
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