import React, { FC, useState, useMemo } from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface PipelineDataPoint {
  date: string;
  pipelineName: string;
  total_co2_consumption: number;
}

interface PipelineHistoricalChartProps {
  data: PipelineDataPoint[];
}

const PipelineHistoricalChart: FC<PipelineHistoricalChartProps> = ({ data }) => {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs('2024-05-16'));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs('2024-07-25'));

  const filteredData = useMemo(() => {
    return data.filter(point => {
      const pointDate = dayjs(point.date);
      return pointDate.isAfter(startDate) && pointDate.isBefore(endDate);
    });
  }, [data, startDate, endDate]);

  const chartData = useMemo(() => {
    return filteredData.map(item => ({
      date: new Date(item.date).toLocaleDateString(),
      co2: item.total_co2_consumption
    }));
  }, [filteredData]);

  const calculateAverageConsumption = (data: PipelineDataPoint[]): string => {
    const totalConsumption = data.reduce((sum, item) => sum + item.total_co2_consumption, 0);
    return (totalConsumption / data.length).toFixed(2);
  };

  const calculateSCI = (data: PipelineDataPoint[]): string => {
    // Diese Funktion muss entsprechend Ihrer Berechnungsmethode für SCI implementiert werden
    return "550"; // Placeholder
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Box>
          <Typography variant="h6">Historical Data</Typography>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => newValue && setStartDate(newValue.startOf('day'))}
            format="YYYY-MM-DD"
            sx={{ mr: 8, ml: 2 }}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => newValue && setEndDate(newValue.endOf('day'))}
            format="YYYY-MM-DD"
          />
          {chartData.length > 0 && (
            <BarChart
              dataset={chartData}
              xAxis={[{ scaleType: 'band', dataKey: 'date' }]}
              series={[{
                dataKey: 'co2',
                label: 'CO2 Consumption',
                valueFormatter: (value: number) => `${value}g CO2e`,
              }]}
              height={400}
              width={700}
              yAxis={[{ label: 'CO2 Consumption (g CO2e)' }]}
            />
          )}
          <Typography variant="h6">
            Average Pipeline Consumption 1 week: {calculateAverageConsumption(filteredData)} g CO2e
          </Typography>
          <Typography variant="h6">
            SCI per week: {calculateSCI(filteredData)} g CO2e
          </Typography>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default PipelineHistoricalChart;