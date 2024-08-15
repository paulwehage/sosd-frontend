import React, { FC, useState, useMemo, useEffect } from 'react';
import { LineChart } from '@mui/x-charts';
import { Box, Paper, Typography, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import dayjs from 'dayjs';
import LoadingCircle from '../LoadingCircle';

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

const OperationsHistoricalChart: FC<OperationsHistoricalChartProps> = ({ data, loading }) => {
  const [activeElements, setActiveElements] = useState<string[]>([]);

  const processedData = useMemo(() => {
    if (!data || data.length === 0) return { xAxis: [], series: [] };

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

    return { xAxis: sortedDates, series };
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

  if (loading) return <LoadingCircle />;

  if (!data || data.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography>No historical data available</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Historical CO2 Consumption</Typography>
      <Box sx={{ height: 500, width: '100%' }}>
        <LineChart
          xAxis={[{
            data: processedData.xAxis,
            scaleType: 'time',
            valueFormatter: (value: number) => dayjs(value).format('YYYY-MM-DD'),
          }]}
          yAxis={[{
            label: 'CO2 Consumption (g)',
          }]}
          series={filteredSeries.map(s => ({
            ...s,
            valueFormatter: (value: number | null) =>
              value !== null ? `${value.toFixed(2)}g CO2` : 'N/A',
          }))}
          height={400}
          width={800}
          margin={{ top: 20, right: 20, bottom: 30, left: 60 }}
          sx={{
            '.MuiLineElement-root': {
              strokeWidth: 2,
            },
            '.MuiMarkElement-root': {
              stroke: 'white',
              scale: '0.6',
              fill: 'white',
            },
          }}
        />
      </Box>
      <FormGroup row sx={{ mt: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
        {processedData.series.map(({ label }) => (
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
          />
        ))}
      </FormGroup>
    </Paper>
  );
};

export default OperationsHistoricalChart;