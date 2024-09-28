import { FC, useState, useMemo } from 'react';
import { CrossProjectHistoricalDataPoint } from '../../services/historicalData/historicalData.interface.ts';
import { LineChart } from '@mui/x-charts';
import {Box, Checkbox, FormGroup, FormControlLabel, Typography, Paper} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import {DATE_BEGIN, DATE_END} from '../../constants';

// Interface defining the shape of props for the `CrossProjectChart` component
interface HistoricalDataChartProps {
  data: CrossProjectHistoricalDataPoint[]; // Array of data points for cross-project CO2 consumption
}

// Functional component to render a line chart for cross-project CO2 consumption
const CrossProjectChart: FC<HistoricalDataChartProps> = ({ data }) => {
  // States for managing the selected start and end dates for data filtering
  const [startDate, setStartDate] = useState<Dayjs>(dayjs(DATE_BEGIN));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs(DATE_END));

  // State for managing which projects' data is actively displayed on the chart
  const [activeProjects, setActiveProjects] = useState<string[]>([]);

  // Filter data based on the selected start and end dates
  const filteredData = useMemo(() => {
    return data.filter(point => {
      const pointDate = dayjs(point.date);
      return pointDate.isAfter(startDate) && pointDate.isBefore(endDate);
    });
  }, [data, startDate, endDate]);

  // Process the filtered data into a map by project name
  const projectData = useMemo(() => {
    const projectMap = filteredData.reduce((acc, point) => {
      if (!acc[point.project_name]) {
        acc[point.project_name] = [];
      }
      acc[point.project_name].push({
        date: dayjs(point.date).valueOf(), // Convert date to timestamp
        co2: point.total_co2_consumption, // CO2 consumption value
      });
      return acc;
    }, {} as Record<string, { date: number; co2: number }[]>);

    // Set all projects as active initially if no projects are active
    if (activeProjects.length === 0) {
      setActiveProjects(Object.keys(projectMap));
    }

    return projectMap;
  }, [filteredData, activeProjects]);

  // Get all unique dates in the filtered data for the x-axis of the chart
  const allDates = useMemo(() => {
    return [...new Set(filteredData.map(point => dayjs(point.date).valueOf()))].sort((a, b) => a - b);
  }, [filteredData]);

  // Prepare series data for each active project to display on the chart
  const series = useMemo(() => {
    return Object.entries(projectData)
      .filter(([projectName]) => activeProjects.includes(projectName)) // Only include active projects
      .map(([projectName, points]) => ({
        data: points.map(p => p.co2), // Array of CO2 values for the project
        label: projectName, // Use project name as label
        valueFormatter: (value: number) => `${value}g CO2`, // Format CO2 values
      }));
  }, [projectData, activeProjects]);

  // Toggle the visibility of a project's data on the chart
  const handleProjectToggle = (projectName: string) => {
    setActiveProjects(prev =>
      prev.includes(projectName)
        ? prev.filter(p => p !== projectName) // Remove if already active
        : [...prev, projectName] // Add if not active
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{p: 4}}>
      <Box sx={{ height: 500, width: '100%' }}>
        <Typography variant="h6" gutterBottom>Cross Project CO2 Consumption</Typography>
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
          <LineChart
            xAxis={[{
              data: allDates,
              scaleType: 'time',
              valueFormatter: (value) => dayjs(value).format('YYYY-MM-DD'),
            }]}
            yAxis={[{
              label: 'CO2 Consumption (g)',
            }]}
            series={series}
            height={400}
            width={700}
          />
        </Box>
        <FormGroup row>
          {Object.keys(projectData).map(projectName => (
            <FormControlLabel
              key={projectName}
              control={
                <Checkbox
                  checked={activeProjects.includes(projectName)}
                  onChange={() => handleProjectToggle(projectName)}
                />
              }
              label={projectName}
            />
          ))}
        </FormGroup>
        </Paper>
    </LocalizationProvider>
  );
};

export default CrossProjectChart;
