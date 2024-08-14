import React, { FC, useState, useMemo } from 'react';
import { LineChart } from '@mui/x-charts';
import { Box, Grid, Paper, Checkbox, FormGroup, FormControlLabel } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

interface DataPoint {
  date: string | number;
  [key: string]: number | string;
}

interface HistoricalDataChartProps {
  data: DataPoint[];
  dateKey: string;
  valueKeys: string[];
  yAxisLabel: string;
}

const HistoricalDataChart: FC<HistoricalDataChartProps> = ({ data, dateKey, valueKeys, yAxisLabel }) => {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs('2024-05-16'));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs('2024-07-25'));
  const [activeKeys, setActiveKeys] = useState<string[]>(valueKeys);

  const filteredData = useMemo(() => {
    return data.filter(point => {
      const pointDate = dayjs(point[dateKey]);
      return pointDate.isAfter(startDate) && pointDate.isBefore(endDate);
    });
  }, [data, dateKey, startDate, endDate]);

  const allDates = useMemo(() => {
    return [...new Set(filteredData.map(point => dayjs(point[dateKey]).valueOf()))].sort((a, b) => a - b);
  }, [filteredData, dateKey]);

  const series = useMemo(() => {
    return valueKeys
      .filter(key => activeKeys.includes(key))
      .map(key => ({
        data: filteredData.map(point => Number(point[key])),
        label: key,
        valueFormatter: (value: number) => `${value}g CO2`,
      }));
  }, [filteredData, valueKeys, activeKeys]);

  const handleKeyToggle = (key: string) => {
    setActiveKeys(prev =>
      prev.includes(key)
        ? prev.filter(k => k !== key)
        : [...prev, key]
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={6}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) => newValue && setStartDate(newValue)}
            />
          </Grid>
          <Grid item xs={6}>
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
              label: yAxisLabel,
            }]}
            series={series}
            width={600}
            height={400}
            margin={{ top: 20, right: 40, bottom: 70, left: 60 }}
          />
        </Box>
        <FormGroup row>
          {valueKeys.map(key => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  checked={activeKeys.includes(key)}
                  onChange={() => handleKeyToggle(key)}
                />
              }
              label={key}
            />
          ))}
        </FormGroup>
      </Paper>
    </LocalizationProvider>
  );
};

export default HistoricalDataChart;