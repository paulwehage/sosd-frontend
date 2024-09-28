import React, { FC, useState, useMemo } from 'react';
import { Typography, Box } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// Interface defining the shape of a single pipeline data point
interface PipelineDataPoint {
  date: string; // The date of the data point
  pipelineName: string; // The name of the pipeline
  total_co2_consumption: number; // CO2 consumption in grams
}

// Props interface for the `PipelineHistoricalChart` component
interface PipelineHistoricalChartProps {
  data: PipelineDataPoint[]; // Array of pipeline data points to be displayed
}

// Functional component to render a bar chart for pipeline CO2 consumption over time
const PipelineHistoricalChart: FC<PipelineHistoricalChartProps> = ({ data }) => {
  // State for start and end dates of the chart's date range
  const [startDate, setStartDate] = useState<Dayjs>(dayjs('2024-07-03')); // Default start date
  const [endDate, setEndDate] = useState<Dayjs>(dayjs('2024-07-25')); // Default end date

  // Filter data based on the selected date range
  const filteredData = useMemo(() => {
    return data.filter(point => {
      const pointDate = dayjs(point.date);
      return pointDate.isAfter(startDate) && pointDate.isBefore(endDate);
    });
  }, [data, startDate, endDate]);

  // Prepare data for the chart with formatted dates and CO2 values
  const chartData = useMemo(() => {
    return filteredData.map(item => ({
      date: new Date(item.date).toLocaleDateString(), // Convert date to local date string
      co2: item.total_co2_consumption // CO2 consumption value
    }));
  }, [filteredData]);

  // Function to calculate the average CO2 consumption
  const calculateAverageConsumption = (data: PipelineDataPoint[]): string => {
    const totalConsumption = data.reduce((sum, item) => sum + item.total_co2_consumption, 0);
    return (totalConsumption / data.length).toFixed(2); // Calculate average and format to two decimal places
  };

  // Function to calculate SCI (Software Carbon Intensity) - currently a placeholder
  const calculateSCI = (data: PipelineDataPoint[]): string => {
    // Implement this function based on your SCI calculation method
    return "550"; // Placeholder value
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box>
        {/* Title for the historical data section */}
        <Typography variant="h6">Historical Data</Typography>

        {/* Date pickers for selecting start and end date of the data range */}
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => newValue && setStartDate(newValue.startOf('day'))} // Start of day
          format="YYYY-MM-DD" // ISO format
          sx={{ mr: 8, ml: 2 }}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => newValue && setEndDate(newValue.endOf('day'))} // End of day
          format="YYYY-MM-DD" // ISO format
        />

        {/* Bar chart showing CO2 consumption if data is available */}
        {chartData.length > 0 && (
          <BarChart
            dataset={chartData} // Pass the prepared data to the chart
            xAxis={[{ scaleType: 'band', dataKey: 'date' }]} // X-axis representing dates
            series={[{
              dataKey: 'co2',
              label: 'CO2 Consumption', // Label for the series
              valueFormatter: (value: number) => `${value}g CO2e`, // Format for CO2 values
            }]}
            height={400} // Chart height
            width={700} // Chart width
            yAxis={[{ label: 'CO2 Consumption (g CO2e)' }]} // Y-axis representing CO2 values
          />
        )}

        {/* Display average CO2 consumption over a week */}
        <Typography variant="h6">
          Average Pipeline Consumption 1 week: {calculateAverageConsumption(filteredData)} g CO2e
        </Typography>

        {/* Display SCI (Software Carbon Intensity) per week */}
        <Typography variant="h6">
          SCI per week: {calculateSCI(filteredData)} g CO2e
        </Typography>
      </Box>
    </LocalizationProvider>
  );
};

export default PipelineHistoricalChart;
