import { FC, useState, useMemo } from 'react';
import { CrossProjectHistoricalDataPoint } from '../../services/historicalData/historicalData.interface.ts';
import { LineChart } from '@mui/x-charts';
import {Box, Checkbox, FormGroup, FormControlLabel, Typography, Paper} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import {DATE_BEGIN, DATE_END} from '../../constants';

interface HistoricalDataChartProps {
  data: CrossProjectHistoricalDataPoint[];
}

const CrossProjectChart: FC<HistoricalDataChartProps> = ({ data }) => {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs(DATE_BEGIN));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs(DATE_END));
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
