import React, { FC, useState, useMemo } from 'react';
import { Box, Typography, Paper, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { DATE_BEGIN, DATE_END } from '../../constants';

// Interface for the historical data points being used in the chart
interface HistoricalDataPoint {
  date: string;
  pipelineName: string;
  cloudProvider: string;
  total_co2_consumption: number; // CO2 consumption value for the pipeline at a given date
}

// Props interface for the `CicdHistoricalChart` component
interface CicdHistoricalChartProps {
  data: HistoricalDataPoint[]; // Array of data points for plotting the chart
}

// Component to render a historical CO2 consumption line chart for CICD pipelines
const CicdHistoricalChart: FC<CicdHistoricalChartProps> = ({ data }) => {
  // States for managing the start and end dates for filtering data
  const [startDate, setStartDate] = useState<Dayjs>(dayjs(DATE_BEGIN));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs(DATE_END));

  // State for managing which pipelines are active in the chart
  const [activePipelines, setActivePipelines] = useState<string[]>([]);

  // Memoized function to filter data based on the selected start and end dates
  const filteredData = useMemo(() => {
    return data.filter(point => {
      const pointDate = dayjs(point.date);
      return pointDate.isAfter(startDate) && pointDate.isBefore(endDate);
    });
  }, [data, startDate, endDate]);

  // Memoized function to process filtered data into a format suitable for the chart
  const processedData = useMemo(() => {
    // Create a map to group data points by pipeline and cloud provider
    const pipelineMap = new Map<string, { date: number; co2: number }[]>();

    // Group data by pipeline name and cloud provider
    filteredData.forEach((point) => {
      const key = `${point.pipelineName} (${point.cloudProvider})`;
      if (!pipelineMap.has(key)) {
        pipelineMap.set(key, []);
      }
      pipelineMap.get(key)!.push({
        date: dayjs(point.date).valueOf(), // Convert date to timestamp
        co2: point.total_co2_consumption // Store CO2 consumption
      });
    });

    // Initialize active pipelines if none are set
    if (activePipelines.length === 0) {
      setActivePipelines(Array.from(pipelineMap.keys()));
    }

    // Get all unique dates for the x-axis of the chart
    const allDates = [...new Set(filteredData.map(point => dayjs(point.date).valueOf()))].sort((a, b) => a - b);

    // Create the dataset for the chart, aligning data points by date
    const dataset = allDates.map(date => {
      const dataPoint: { date: number } = { date };
      pipelineMap.forEach((points, key) => {
        if (activePipelines.includes(key)) {
          const point = points.find(p => p.date === date);
          dataPoint[key] = point ? point.co2 : null; // Use `null` for missing data
        }
      });
      return dataPoint;
    });

    // Prepare series information for each active pipeline
    const series = Array.from(pipelineMap.keys())
      .filter(key => activePipelines.includes(key))
      .map(key => ({
        dataKey: key,
        label: key,
        valueFormatter: (value: number) => `${value} g CO2e`, // Format CO2 consumption values
      }));

    return { dataset, series, allPipelines: Array.from(pipelineMap.keys()) };
  }, [filteredData, activePipelines]);

  // Function to toggle the visibility of a pipeline in the chart
  const handlePipelineToggle = (pipelineName: string) => {
    setActivePipelines(prev =>
      prev.includes(pipelineName)
        ? prev.filter(p => p !== pipelineName)
        : [...prev, pipelineName]
    );
  };

  // If there is no data to display, show a message
  if (processedData.dataset.length === 0) {
    return <Typography>No historical data available</Typography>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Box sx={{ height: 500, width: '100%' }}>
          <Typography variant="h6" gutterBottom>Historical CO2 Consumption</Typography>

          {/* Date pickers for selecting the start and end date */}
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

          {/* Line chart displaying CO2 consumption data */}
          <LineChart
            dataset={processedData.dataset}
            xAxis={[{
              dataKey: 'date',
              scaleType: 'time',
              valueFormatter: (value: number) => dayjs(value).format('MMM DD'),
            }]}
            yAxis={[{
              label: 'CO2 Consumption (g CO2e)',
            }]}
            series={processedData.series}
            height={400}
            width={700}
          />
        </Box>

        {/* Checkbox list to toggle which pipelines are displayed in the chart */}
        <FormGroup row>
          {processedData.allPipelines.map(pipelineName => (
            <FormControlLabel
              key={pipelineName}
              control={
                <Checkbox
                  checked={activePipelines.includes(pipelineName)}
                  onChange={() => handlePipelineToggle(pipelineName)}
                />
              }
              label={pipelineName}
            />
          ))}
        </FormGroup>
      </Paper>
    </LocalizationProvider>
  );
};

export default CicdHistoricalChart;
