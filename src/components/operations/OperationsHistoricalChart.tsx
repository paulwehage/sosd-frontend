import React, {FC, useState, useMemo, useEffect} from 'react';
import {LineChart} from '@mui/x-charts';
import {Box, Paper, Typography, FormGroup, FormControlLabel, Checkbox} from '@mui/material';
import dayjs, {Dayjs} from 'dayjs';
import LoadingCircle from '../LoadingCircle';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

interface HistoricalDataPoint {
  date: string;
  infrastructure_element_name: string;
  service_name: string;
  cloud_provider: string;
  total_co2_consumption: number;
}

interface OperationsHistoricalChartProps {
  data: HistoricalDataPoint[];
  loading: boolean;
}

const OperationsHistoricalChart: FC<OperationsHistoricalChartProps> = ({data, loading}) => {
  const [activeElements, setActiveElements] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Dayjs>(dayjs('2024-05-16'));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs('2024-07-25'));

  const processedData = useMemo(() => {
    if (!data || data.length === 0) return {xAxis: [], series: []};

    const elementMap = new Map<string, Map<number, number>>();
    const dateSet = new Set<number>();

    data.forEach((point) => {
      const elementKey = `${point.infrastructure_element_name} (${point.service_name} - ${point.cloud_provider})`;
      const dateValue = dayjs(point.date).valueOf();
      dateSet.add(dateValue);

      if (!elementMap.has(elementKey)) {
        elementMap.set(elementKey, new Map());
      }
      elementMap.get(elementKey)!.set(dateValue, point.total_co2_consumption);
    });

    const sortedDates = Array.from(dateSet).sort((a, b) => a - b);

    const series = Array.from(elementMap.entries()).map(([elementKey, dateValues]) => ({
      label: elementKey,
      data: sortedDates.map(date => dateValues.get(date) || null),
    }));

    return {xAxis: sortedDates, series};
  }, [data]);

  useEffect(() => {
    if (processedData.series.length > 0 && activeElements.length === 0) {
      setActiveElements(processedData.series.map(s => s.label));
    }
  }, [processedData.series, activeElements]);

  const filteredSeries = useMemo(() => {
    return processedData.series.filter(s => activeElements.includes(s.label));
  }, [processedData.series, activeElements]);

  const handleElementToggle = (elementName: string) => {
    setActiveElements(prev =>
      prev.includes(elementName)
        ? prev.filter(e => e !== elementName)
        : [...prev, elementName]
    );
  };

  if (loading) return <LoadingCircle/>;

  if (!data || data.length === 0) {
    return (
      <Paper elevation={3} sx={{p: 2}}>
        <Typography>No historical data available</Typography>
      </Paper>
    );
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{p: 2, pb: 2}}>
        <Box sx={{display: 'flex', flexDirection: 'column', height: '100%', width: '100%'}}>
          <Typography variant="h6" gutterBottom>Historical CO2 Consumption</Typography>
          <Box sx={{display: 'flex', justifyContent: 'flex-start', mb: 2}}>
            <DatePicker
              label="Start Date"
              value={startDate}
              format="YYYY-MM-DD"
              onChange={(newValue) => newValue && setStartDate(newValue)}
              sx={{mr: 2}}
            />
            <DatePicker
              label="End Date"
              value={endDate}
              format="YYYY-MM-DD"
              onChange={(newValue) => newValue && setEndDate(newValue)}
            />
          </Box>
          <Box sx={{flexGrow: 1, minHeight: 400, width: '100%', mb: 2}}>
            <LineChart
              xAxis={[{
                data: processedData.xAxis,
                scaleType: 'time',
                valueFormatter: (value: number) => dayjs(value).format('YYYY-MM-DD'),
              }]}
              yAxis={[{
                label: 'CO2 Consumption (g)',
                labelStyle: {marginRight: 50},
              }]}
              series={filteredSeries.map(s => ({
                ...s,
                valueFormatter: (value: number | null) =>
                  value !== null ? `${value.toFixed(2)}g CO2` : 'N/A',
              }))}
              height={500}
              width={700}
              margin={{top: 120}}
            />
          </Box>
          <FormGroup sx={{mt: 2, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
            {processedData.series.map(({label}) => (
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
                sx={{minWidth: '33%', flexGrow: 1}}
              />
            ))}
          </FormGroup>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default OperationsHistoricalChart;