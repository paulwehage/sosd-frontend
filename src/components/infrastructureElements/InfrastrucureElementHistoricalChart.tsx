import React, { FC, useMemo, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';

interface BarPlotProps {
  data: { date: string; co2: number }[];
}

const InfrastructureElementHistoricalChart: FC<BarPlotProps> = ({ data }) => {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs('2024-05-16'));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs('2024-07-25'));

  const filteredData = useMemo(() => {
    return data.filter(point => {
      const pointDate = dayjs(point.date);
      return pointDate.isAfter(startDate.startOf('day')) && pointDate.isBefore(endDate.endOf('day'));
    });
  }, [data, startDate, endDate]);

  const chartData = useMemo(() => {
    return filteredData.map(item => ({
      date: dayjs(item.date).format('YYYY-MM-DD'),
      co2: item.co2
    }));
  }, [filteredData]);

  if (chartData.length === 0) {
    return <Typography>No data available for the selected date range</Typography>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ height: 500, width: '100%' }}>
        <Typography variant="h6" gutterBottom>CO2 Consumption History</Typography>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => newValue && setStartDate(newValue.startOf('day'))}
          format="YYYY-MM-DD"
          sx={{ mr: 2 }}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => newValue && setEndDate(newValue.endOf('day'))}
          format="YYYY-MM-DD"
        />
        <BarChart
          dataset={chartData}
          xAxis={[{
            scaleType: 'band',
            dataKey: 'date',
          }]}
          series={[{
            dataKey: 'co2',
            label: 'CO2 Consumption',
            valueFormatter: (value: number) => `${value.toFixed(2)}g CO2e`,
          }]}
          height={400}
          width={700}
          yAxis={[{ label: 'CO2 Consumption (g CO2e)' }]}
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'top', horizontal: 'middle' },
              padding: { top: 0, bottom: 0 },
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default InfrastructureElementHistoricalChart;