import React, { FC, useState, useMemo } from 'react';
import { CrossProjectHistoricalDataPoint } from '../../services/historicalData/historicalData.interface.ts';
import { LineChart } from '@mui/x-charts';
import { Box, Grid, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

interface HistoricalDataChartProps {
  data: CrossProjectHistoricalDataPoint[];
}

const CrossProjectChart: FC<HistoricalDataChartProps> = ({ data }) => {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs('2024-05-16'));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs('2024-07-25'));
  const [activeProjects, setActiveProjects] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    return data.filter(point => {
      const pointDate = dayjs(point.date);
      return pointDate.isAfter(startDate) && pointDate.isBefore(endDate);
    });
  }, [data, startDate, endDate]);

  const projectData = useMemo(() => {
    const projectMap = filteredData.reduce((acc, point) => {
      if (!acc[point.project_name]) {
        acc[point.project_name] = [];
      }
      acc[point.project_name].push({
        date: dayjs(point.date).valueOf(),
        co2: point.total_co2_consumption
      });
      return acc;
    }, {} as Record<string, { date: number; co2: number }[]>);

    if (activeProjects.length === 0) {
      setActiveProjects(Object.keys(projectMap));
    }

    return projectMap;
  }, [filteredData, activeProjects]);

  const allDates = useMemo(() => {
    return [...new Set(filteredData.map(point => dayjs(point.date).valueOf()))].sort((a, b) => a - b);
  }, [filteredData]);

  const series = useMemo(() => {
    return Object.entries(projectData)
      .filter(([projectName]) => activeProjects.includes(projectName))
      .map(([projectName, points]) => ({
        data: points.map(p => p.co2),
        label: projectName,
        valueFormatter: (value: number) => `${value}g CO2`,
      }));
  }, [projectData, activeProjects]);

  const handleProjectToggle = (projectName: string) => {
    setActiveProjects(prev =>
      prev.includes(projectName)
        ? prev.filter(p => p !== projectName)
        : [...prev, projectName]
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ p: 2, height: '100%' }}>
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={6}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => newValue && setStartDate(newValue.startOf('day'))}  // Start of day
              format="YYYY-MM-DD"  // ISO format
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) => newValue && setEndDate(newValue.endOf('day'))}  // End of day
              format="YYYY-MM-DD"  // ISO format
            />
          </Grid>
        </Grid>
        <Box sx={{ height: '400px', width: '100%', mb: 8 }}>
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
            height={500}
            width={800}
            margin={{ top: 20, right: 40, bottom: 80, left: 60 }}
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
      </Box>
    </LocalizationProvider>
  );
};

export default CrossProjectChart;
