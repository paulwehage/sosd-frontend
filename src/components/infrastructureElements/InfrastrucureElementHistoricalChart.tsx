import React, { FC, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

// Interface defining the shape of the data passed into the chart component
interface BarPlotProps {
  data: { date: string; co2: number }[]; // Array of objects with `date` and `co2` consumption
}

// Functional component to render a historical bar chart of CO2 consumption
const InfrastructureElementHistoricalChart: FC<BarPlotProps> = ({ data }) => {
  // State for start and end dates to filter data
  const [startDate, setStartDate] = useState<Dayjs>(dayjs('2024-05-16'));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs('2024-07-25'));

  // Filter data based on the selected date range
  const filteredData = useMemo(() => {
    return data.filter(point => {
      const pointDate = dayjs(point.date);
      // Include points that fall within the selected date range
      return pointDate.isAfter(startDate.startOf('day')) && pointDate.isBefore(endDate.endOf('day'));
    });
  }, [data, startDate, endDate]);

  // Format the filtered data for the chart, converting dates to strings
  const chartData = useMemo(() => {
    return filteredData.map(item => ({
      date: dayjs(item.date).format('YYYY-MM-DD'), // Format date as a string
      co2: item.co2 // CO2 consumption value
    }));
  }, [filteredData]);

  // Display a message if there's no data available in the selected date range
  if (chartData.length === 0) {
    return <Typography>No data available for the selected date range</Typography>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ height: 500, width: '100%' }}>
        {/* Title for the chart */}
        <Typography variant="h6" gutterBottom>CO2 Consumption History</Typography>

        {/* Date pickers for selecting the start and end dates */}
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => newValue && setStartDate(newValue.startOf('day'))} // Set start date
          format="YYYY-MM-DD" // Date format
          sx={{ mr: 2 }} // Add margin to the right
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => newValue && setEndDate(newValue.endOf('day'))} // Set end date
          format="YYYY-MM-DD" // Date format
        />

        {/* Bar chart to visualize CO2 consumption over time */}
        <BarChart
          dataset={chartData} // Data to be visualized
          xAxis={[{
            scaleType: 'band', // X-axis as categorical bands
            dataKey: 'date', // Date field for x-axis
          }]}
          series={[{
            dataKey: 'co2', // CO2 consumption field for y-axis
            label: 'CO2 Consumption', // Series label
            valueFormatter: (value: number) => `${value.toFixed(2)}g CO2e`, // Format y-axis values
          }]}
          height={400} // Height of the chart
          width={700} // Width of the chart
          yAxis={[{ label: 'CO2 Consumption (g CO2e)' }]} // Y-axis label
          slotProps={{
            // Legend properties for the chart
            legend: {
              direction: 'row', // Legend items laid out in a row
              position: { vertical: 'top', horizontal: 'middle' }, // Position legend at the top-middle
              padding: { top: 0, bottom: 0 }, // Remove top and bottom padding
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default InfrastructureElementHistoricalChart;
