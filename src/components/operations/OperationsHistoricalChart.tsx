import React, { FC, useMemo } from 'react';
import { LineChart } from '@mui/x-charts';
import { Box, Paper, Typography } from '@mui/material';
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
  const processedData = useMemo(() => {
    if (!data || data.length === 0) return { dates: [], series: [] };

    const serviceMap = new Map<string, { [date: string]: number }>();
    const dateSet = new Set<string>();

    data.forEach((point) => {
      if (!point.date || !point.infrastructure_element_name || !point.service_name || !point.cloud_provider) {
        console.warn('Invalid data point:', point);
        return;
      }

      const serviceKey = `${point.infrastructure_element_name} (${point.service_name} - ${point.cloud_provider})`;
      dateSet.add(point.date);

      if (!serviceMap.has(serviceKey)) {
        serviceMap.set(serviceKey, {});
      }
      serviceMap.get(serviceKey)![point.date] = point.total_co2_consumption;
    });

    const sortedDates = Array.from(dateSet).sort();

    const series = Array.from(serviceMap.entries()).map(([serviceKey, dateValues]) => ({
      label: serviceKey,
      data: sortedDates.map(date => dateValues[date] || 0)
    }));

    return { dates: sortedDates, series };
  }, [data]);

  if (loading) return <LoadingCircle />;

  if (!data || data.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography>No historical data available</Typography>
      </Paper>
    );
  }

  if (processedData.dates.length === 0 || processedData.series.length === 0) {
    return (
      <Paper elevation={3} sx={{ p: 2 }}>
        <Typography>Unable to process historical data</Typography>
      </Paper>
    );
  }

  const safeValueFormatter = (value: any) => {
    if (value === null || value === undefined) {
      console.warn('Null or undefined value encountered in valueFormatter');
      return 'N/A';
    }
    return dayjs(value).format('YYYY-MM-DD');
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>Historical CO2 Consumption</Typography>
      <Box sx={{ height: 600, width: '100%' }}>
        <LineChart
          xAxis={[{
            data: processedData.dates,
            scaleType: 'time',
            valueFormatter: safeValueFormatter,
          }]}
          yAxis={[{
            label: 'CO2 Consumption (g)',
          }]}
          series={processedData.series.map(s => ({
            ...s,
            valueFormatter: (value: number) =>
              value !== null && value !== undefined
                ? `${value.toFixed(2)}g CO2`
                : 'N/A',
          }))}
          height={600}
          margin={{ top: 20, right: 40, bottom: 70, left: 60 }}
        />
      </Box>
    </Paper>
  );
};

export default OperationsHistoricalChart;