import React, { FC, useState, useMemo, useEffect } from 'react';
import { LineChart } from '@mui/x-charts';
import { Box, Grid, Paper, Checkbox, FormGroup, FormControlLabel, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import LoadingCircle from '../LoadingCircle.tsx';
import { DATE_BEGIN, DATE_END } from '../../constants';

// Interface defining the shape of a single historical data point for the project
interface ProjectHistoricalDataPoint {
  sdlc_step: string; // The specific SDLC step (Software Development Life Cycle)
  date: string; // The date associated with the data point
  total_co2_consumption: number; // The total CO2 consumption in grams
}

// Props interface for the `ProjectHistoricalChart` component
interface ProjectHistoricalChartProps {
  data: ProjectHistoricalDataPoint[]; // Array of historical data points
  loading: boolean; // Loading state to indicate whether data is being fetched
}

// Functional component to render a line chart for project CO2 consumption over time
const ProjectHistoricalChart: FC<ProjectHistoricalChartProps> = ({ data, loading }) => {
  // State for start and end dates of the chart's date range
  const [startDate, setStartDate] = useState<Dayjs>(dayjs(DATE_BEGIN)); // Default start date
  const [endDate, setEndDate] = useState<Dayjs>(dayjs(DATE_END)); // Default end date
  const [activeSteps, setActiveSteps] = useState<string[]>([]); // State for tracking active SDLC steps

  // Filter data based on the selected date range
  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter(point => {
      const pointDate = dayjs(point.date);
      return pointDate.isAfter(startDate) && pointDate.isBefore(endDate);
    });
  }, [data, startDate, endDate]);

  // Group data by SDLC step and prepare it for charting
  const stepData = useMemo(() => {
    const stepMap = filteredData.reduce((acc, point) => {
      if (!acc[point.sdlc_step]) {
        acc[point.sdlc_step] = [];
      }
      acc[point.sdlc_step].push({
        date: dayjs(point.date).valueOf(), // Convert date to a timestamp for charting
        co2: point.total_co2_consumption // CO2 consumption value
      });
      return acc;
    }, {} as Record<string, { date: number; co2: number }[]>);

    return stepMap; // Return the grouped data by SDLC step
  }, [filteredData]);

  // Automatically activate all SDLC steps when data is available
  useEffect(() => {
    if (Object.keys(stepData).length > 0 && activeSteps.length === 0) {
      setActiveSteps(Object.keys(stepData)); // Set all available SDLC steps as active
    }
  }, [stepData, activeSteps]);

  // Extract all unique dates from the filtered data, sorted in ascending order
  const allDates = useMemo(() => {
    return [...new Set(filteredData.map(point => dayjs(point.date).valueOf()))].sort((a, b) => a - b);
  }, [filteredData]);

  // Prepare series for the line chart based on active SDLC steps
  const series = useMemo(() => {
    return Object.entries(stepData)
      .filter(([stepName]) => activeSteps.includes(stepName)) // Filter series based on active steps
      .map(([stepName, points]) => ({
        data: points.map(p => p.co2), // Map CO2 consumption data for each point
        label: stepName, // Use the step name as the label for the series
        valueFormatter: (value: number) => `${value}g CO2`, // Format CO2 values
      }));
  }, [stepData, activeSteps]);

  // Toggle active state of an SDLC step
  const handleStepToggle = (stepName: string) => {
    setActiveSteps(prev =>
      prev.includes(stepName)
        ? prev.filter(s => s !== stepName) // Deactivate step if already active
        : [...prev, stepName] // Activate step if inactive
    );
  };

  // Show loading indicator while data is being fetched
  if (loading) return <LoadingCircle />;

  // Display message when there is no data available
  if (!data || data.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography>No data available</Typography>
      </Paper>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ height: 500, width: '100%' }}>
          {/* Title for the historical project CO2 consumption section */}
          <Typography variant="h6" gutterBottom>Historical Project CO2 Consumption</Typography>

          {/* Date pickers for selecting start and end date of the data range */}
          <DatePicker
            label="Start Date"
            value={startDate}
            format="YYYY-MM-DD" // ISO format
            onChange={(newValue) => newValue && setStartDate(newValue)}
            sx={{ mr: 8, ml: 2 }}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            format="YYYY-MM-DD" // ISO format
            onChange={(newValue) => newValue && setEndDate(newValue)}
          />

          {/* Line chart showing CO2 consumption over the selected date range */}
          <LineChart
            xAxis={[{
              data: allDates, // X-axis data representing dates
              scaleType: 'time', // Use time scale for dates
              valueFormatter: (value) => dayjs(value).format('YYYY-MM-DD'), // Format dates
            }]}
            yAxis={[{
              label: 'CO2 Consumption (g)', // Y-axis label
            }]}
            series={series} // Data series for each active SDLC step
            height={400} // Chart height
            width={700} // Chart width
          />

          {/* Checkbox controls for toggling visibility of each SDLC step */}
          <FormGroup row>
            {Object.keys(stepData).map(stepName => (
              <FormControlLabel
                key={stepName}
                control={
                  <Checkbox
                    checked={activeSteps.includes(stepName)} // Set checkbox state
                    onChange={() => handleStepToggle(stepName)} // Toggle step visibility
                  />
                }
                label={stepName} // Display SDLC step name
              />
            ))}
          </FormGroup>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default ProjectHistoricalChart;
