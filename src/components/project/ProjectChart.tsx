import React, {FC, useState, useMemo, useEffect} from 'react';
import {LineChart} from '@mui/x-charts';
import {Box, Grid, Paper, Checkbox, FormGroup, FormControlLabel, Typography} from '@mui/material';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers';
import dayjs, {Dayjs} from 'dayjs';
import LoadingCircle from '../LoadingCircle.tsx';

interface ProjectHistoricalDataPoint {
  sdlc_step: string;
  date: string;
  total_co2_consumption: number;
}

interface ProjectHistoricalChartProps {
  data: ProjectHistoricalDataPoint[];
  loading: boolean;
}

const ProjectHistoricalChart: FC<ProjectHistoricalChartProps> = ({data, loading}) => {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs('2024-05-16'));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs('2024-07-25'));
  const [activeSteps, setActiveSteps] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter(point => {
      const pointDate = dayjs(point.date);
      return pointDate.isAfter(startDate) && pointDate.isBefore(endDate);
    });
  }, [data, startDate, endDate]);

  const stepData = useMemo(() => {
    const stepMap = filteredData.reduce((acc, point) => {
      if (!acc[point.sdlc_step]) {
        acc[point.sdlc_step] = [];
      }
      acc[point.sdlc_step].push({
        date: dayjs(point.date).valueOf(),
        co2: point.total_co2_consumption
      });
      return acc;
    }, {} as Record<string, { date: number; co2: number }[]>);

    return stepMap;
  }, [filteredData]);

  useEffect(() => {
    if (Object.keys(stepData).length > 0 && activeSteps.length === 0) {
      setActiveSteps(Object.keys(stepData));
    }
  }, [stepData, activeSteps]);

  const allDates = useMemo(() => {
    return [...new Set(filteredData.map(point => dayjs(point.date).valueOf()))].sort((a, b) => a - b);
  }, [filteredData]);

  const series = useMemo(() => {
    return Object.entries(stepData)
      .filter(([stepName]) => activeSteps.includes(stepName))
      .map(([stepName, points]) => ({
        data: points.map(p => p.co2),
        label: stepName,
        valueFormatter: (value: number) => `${value}g CO2`,
      }));
  }, [stepData, activeSteps]);

  const handleStepToggle = (stepName: string) => {
    setActiveSteps(prev =>
      prev.includes(stepName)
        ? prev.filter(s => s !== stepName)
        : [...prev, stepName]
    );
  };

  if (loading) return <LoadingCircle/>;

  if (!data || data.length === 0) {
    return (
      <Paper elevation={3} sx={{p: 2}}>
        <Typography>No data available</Typography>
      </Paper>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{p: 4}}>
        <Box sx={{height: 500, width: '100%'}}>
          <Typography variant="h6" gutterBottom>Historical Project CO2 Consumption</Typography>
          <DatePicker
            label="Start Date"
            value={startDate}
            format="YYYY-MM-DD"
            onChange={(newValue) => newValue && setStartDate(newValue)}
            sx={{mr: 8, ml: 2}}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            format="YYYY-MM-DD"
            onChange={(newValue) => newValue && setEndDate(newValue)}
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
          <FormGroup row>
            {Object.keys(stepData).map(stepName => (
              <FormControlLabel
                key={stepName}
                control={
                  <Checkbox
                    checked={activeSteps.includes(stepName)}
                    onChange={() => handleStepToggle(stepName)}
                  />
                }
                label={stepName}
              />
            ))}
          </FormGroup>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default ProjectHistoricalChart;