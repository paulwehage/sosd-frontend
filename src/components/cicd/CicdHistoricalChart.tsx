import React, { FC, useState, useMemo } from 'react';
import { Box, Typography, Paper, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { LineChart } from '@mui/x-charts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

interface HistoricalDataPoint {
  date: string;
  pipelineName: string;
  cloudProvider: string;
  total_co2_consumption: number;
}

interface CicdHistoricalChartProps {
  data: HistoricalDataPoint[];
}

const CicdHistoricalChart: FC<CicdHistoricalChartProps> = ({ data }) => {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs('2024-05-16'));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs('2024-07-25'));
  const [activePipelines, setActivePipelines] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    return data.filter(point => {
      const pointDate = dayjs(point.date);
      return pointDate.isAfter(startDate) && pointDate.isBefore(endDate);
    });
  }, [data, startDate, endDate]);

  const processedData = useMemo(() => {
    const pipelineMap = new Map<string, { date: number; co2: number }[]>();

    filteredData.forEach((point) => {
      const key = `${point.pipelineName} (${point.cloudProvider})`;
      if (!pipelineMap.has(key)) {
        pipelineMap.set(key, []);
      }
      pipelineMap.get(key)!.push({
        date: dayjs(point.date).valueOf(),
        co2: point.total_co2_consumption
      });
    });

    if (activePipelines.length === 0) {
      setActivePipelines(Array.from(pipelineMap.keys()));
    }

    const allDates = [...new Set(filteredData.map(point => dayjs(point.date).valueOf()))].sort((a, b) => a - b);

    const dataset = allDates.map(date => {
      const dataPoint: { date: number } = { date };
      pipelineMap.forEach((points, key) => {
        if (activePipelines.includes(key)) {
          const point = points.find(p => p.date === date);
          dataPoint[key] = point ? point.co2 : null;
        }
      });
      return dataPoint;
    });

    const series = Array.from(pipelineMap.keys())
      .filter(key => activePipelines.includes(key))
      .map(key => ({
        dataKey: key,
        label: key,
        valueFormatter: (value: number) => `${value} g CO2e`,
      }));

    return { dataset, series, allPipelines: Array.from(pipelineMap.keys()) };
  }, [filteredData, activePipelines]);

  const handlePipelineToggle = (pipelineName: string) => {
    setActivePipelines(prev =>
      prev.includes(pipelineName)
        ? prev.filter(p => p !== pipelineName)
        : [...prev, pipelineName]
    );
  };

  if (processedData.dataset.length === 0) {
    return <Typography>No historical data available</Typography>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Box sx={{ height: 500, width: '100%' }}>
          <Typography variant="h6" gutterBottom>Historical CO2 Consumption</Typography>
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