import React, { FC, useState, useMemo } from 'react';
import { LineChart } from '@mui/x-charts';
import { Box, Grid, Paper, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

interface ProjectHistoricalDataPoint {
  sdlc_step: string;
  date: string;
  total_co2_consumption: number;
}

interface ProjectHistoricalChartProps {
  data: ProjectHistoricalDataPoint[];
}

const ProjectHistoricalChart: FC<ProjectHistoricalChartProps> = ({ data }) => {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs('2024-05-16'));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs('2024-07-25'));
  const [activeSteps, setActiveSteps] = useState<string[]>([]);

  const filteredData = useMemo(() => {
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

    // Initialize activeSteps if it's empty
    if (activeSteps.length === 0) {
      setActiveSteps(Object.keys(stepMap));
    }

    return stepMap;
  }, [filteredData, activeSteps]);

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

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={4}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => newValue && setStartDate(newValue)}
            />
          </Grid>
          <Grid item xs={4}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => newValue && setEndDate(newValue)}
            />
          </Grid>
        </Grid>
        <Box sx={{ height: 400, width: '100%', mb: 4 }}>
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
            height={450}
            width={900}
            margin={{ top: 20, right: 40, bottom: 70, left: 60 }}
          />
        </Box>
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
      </Paper>
    </LocalizationProvider>
  );
};

export default ProjectHistoricalChart;