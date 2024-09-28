import React, { FC, useState, useMemo, useEffect } from 'react';
import { LineChart } from '@mui/x-charts';
import { Box, Paper, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import LoadingCircle from '../LoadingCircle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Interface defining the shape of the historical data
interface HistoricalDataPoint {
  date: string;
  infrastructure_element_name: string;
  service_name: string;
  cloud_provider: string;
  total_co2_consumption: number;
}

// Props interface for the `OperationsHistoricalChart` component
interface OperationsHistoricalChartProps {
  data: HistoricalDataPoint[]; // Array of data points to display in the chart
  loading: boolean; // Loading state to display a loading indicator
}

// Functional component to render a historical chart of CO2 consumption for infrastructure elements
const OperationsHistoricalChart: FC<OperationsHistoricalChartProps> = ({ data, loading }) => {
  const [activeElements, setActiveElements] = useState<string[]>([]); // State to track which elements are active for display
  const [startDate, setStartDate] = useState<Dayjs>(dayjs('2024-05-16')); // Start date for filtering data
  const [endDate, setEndDate] = useState<Dayjs>(dayjs('2024-07-25')); // End date for filtering data

  // Filter data based on the selected date range
  const filteredData = useMemo(() => {
    return data.filter(point => {
      const pointDate = dayjs(point.date);
      return pointDate.isAfter(startDate) && pointDate.isBefore(endDate); // Include points within the start and end dates
    });
  }, [data, startDate, endDate]);

  // Process data for chart display, grouping by infrastructure element
  const processedData = useMemo(() => {
    if (!filteredData || filteredData.length === 0) return { xAxis: [], series: [] };

    const elementMap = new Map<string, Map<number, number>>(); // Map to group data by element
    const dateSet = new Set<number>(); // Set to keep track of unique dates

    filteredData.forEach((point) => {
      // Create a unique key for each infrastructure element
      const elementKey = `${point.infrastructure_element_name} (${point.service_name} - ${point.cloud_provider})`;
      const dateValue = dayjs(point.date).valueOf();
      dateSet.add(dateValue); // Track the date

      // Add data point to the element map
      if (!elementMap.has(elementKey)) {
        elementMap.set(elementKey, new Map());
      }
      elementMap.get(elementKey)!.set(dateValue, point.total_co2_consumption);
    });

    // Sort dates to ensure chronological order
    const sortedDates = Array.from(dateSet).sort((a, b) => a - b);

    // Format series data for the chart
    const series = Array.from(elementMap.entries()).map(([elementKey, dateValues]) => ({
      label: elementKey, // Series label for the chart
      data: sortedDates.map(date => dateValues.get(date) || null), // Data points for each date
    }));

    return { xAxis: sortedDates, series };
  }, [filteredData]);

  // Initialize active elements to display all series initially
  useEffect(() => {
    if (processedData.series.length > 0 && activeElements.length === 0) {
      setActiveElements(processedData.series.map(s => s.label));
    }
  }, [processedData.series, activeElements]);

  // Filter series based on active elements selected for display
  const filteredSeries = useMemo(() => {
    return processedData.series.filter(s => activeElements.includes(s.label));
  }, [processedData.series, activeElements]);

  // Handle toggle for displaying/hiding elements in the chart
  const handleElementToggle = (elementName: string) => {
    setActiveElements(prev =>
      prev.includes(elementName)
        ? prev.filter(e => e !== elementName) // Remove if already active
        : [...prev, elementName] // Add if not active
    );
  };

  // Display loading indicator while data is being fetched
  if (loading) return <LoadingCircle />;

  // Display message if no data is available
  if (!data || data.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography>No historical data available</Typography>
      </Paper>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{ p: 2, pb: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
          <Typography variant="h6" gutterBottom>Historical CO2 Consumption</Typography>

          {/* Date pickers for filtering data based on date range */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
            <DatePicker
              label="Start Date"
              value={startDate}
              format="YYYY-MM-DD"
              onChange={(newValue) => newValue && setStartDate(newValue)}
              sx={{ mr: 2 }}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              format="YYYY-MM-DD"
              onChange={(newValue) => newValue && setEndDate(newValue)}
            />
          </Box>

          {/* Line chart displaying CO2 consumption over time */}
          <Box sx={{ flexGrow: 1, minHeight: 400, width: '100%', mb: 2 }}>
            <LineChart
              xAxis={[{
                data: processedData.xAxis,
                scaleType: 'time', // Use time scale for x-axis
                valueFormatter: (value: number) => dayjs(value).format('YYYY-MM-DD'), // Format dates on x-axis
              }]}
              yAxis={[{
                label: 'CO2 Consumption (g)', // Label for y-axis
                labelStyle: { marginRight: 50 }, // Add margin to y-axis label
              }]}
              series={filteredSeries.map(s => ({
                ...s,
                valueFormatter: (value: number | null) =>
                  value !== null ? `${value.toFixed(2)}g CO2` : 'N/A', // Format y-axis values
              }))}
              height={500}
              width={700}
              margin={{ top: 120 }}
            />
          </Box>

          {/* Checkbox controls to toggle visibility of series */}
          <FormGroup sx={{ mt: 2, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            {processedData.series.map(({ label }) => (
              <FormControlLabel
                key={label}
                control={
                  <Checkbox
                    checked={activeElements.includes(label)}
                    onChange={() => handleElementToggle(label)}
                    size="small"
                  />
                }
                label={label}
                sx={{ minWidth: '33%', flexGrow: 1 }}
              />
            ))}
          </FormGroup>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default OperationsHistoricalChart;
