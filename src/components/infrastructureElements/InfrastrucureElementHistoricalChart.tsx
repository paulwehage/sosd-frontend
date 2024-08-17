// src/components/BarPlot.tsx
import React, {FC, useState} from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import dayjs, {Dayjs} from 'dayjs';

interface BarPlotProps {
  data: { date: string; co2: number }[];
}

const InfrastructureElementHistoricalChart: FC<BarPlotProps> = ({ data }) => {

  const [startDate, setStartDate] = useState<Dayjs>(dayjs().subtract(30, 'days'));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs());

  if (data.length === 0) {
    return <Typography>No data available for the chart</Typography>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Box sx={{ height: 500, width: '100%' }}>
      <Typography variant="h6" gutterBottom>CO2 Consumption History</Typography>
      <DatePicker
        label="Start Date"
        value={startDate}
        onChange={(newValue) => newValue && setStartDate(newValue)}
        format="YYYY-MM-DD"
        sx={{ mr: 8, ml: 2 }}
      />
      <DatePicker
        label="End Date"
        value={endDate}
        onChange={(newValue) => newValue && setEndDate(newValue)}
        format="YYYY-MM-DD"
      />
      <BarChart
        dataset={data}
        xAxis={[{ scaleType: 'band', dataKey: 'date' }]}
        series={[{ dataKey: 'co2', label: 'CO2 Consumption' }]}
        height={400}
        width={700}
      />
    </Box>
    </LocalizationProvider>
  );
};

export default InfrastructureElementHistoricalChart;