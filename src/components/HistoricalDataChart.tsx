import React, { FC, useState, useMemo, ReactNode } from 'react';
import { Box, Typography, Paper, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { LineChart, BarChart } from '@mui/x-charts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';

interface DataPoint {
  date: string;
  [key: string]: any;
}

interface ChartSeries {
  dataKey: string;
  label: string;
  color?: string;
}

interface HistoricalChartProps {
  data: DataPoint[];
  title: string;
  yAxisLabel: string;
  series: ChartSeries[];
  chartType: 'line' | 'bar';
  showDatePicker?: boolean;
  showLegend?: boolean;
  extraContent?: ReactNode;
  processData?: (data: DataPoint[]) => any[];
  xAxisFormatter?: (value: any) => string;
  yAxisFormatter?: (value: any) => string;
}

const HistoricalChart: FC<HistoricalChartProps> = ({
                                                                     data,
                                                                     title,
                                                                     yAxisLabel,
                                                                     series,
                                                                     chartType,
                                                                     showDatePicker = true,
                                                                     showLegend = true,
                                                                     extraContent,
                                                                     processData,
                                                                     xAxisFormatter = (value: number) => dayjs(value).format('MMM DD'),
                                                                     yAxisFormatter = (value: number) => `${value.toFixed(2)}g CO2`,
                                                                   }) => {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs().subtract(30, 'days'));
  const [endDate, setEndDate] = useState<Dayjs>(dayjs());
  const [activeSeries, setActiveSeries] = useState<string[]>(series.map(s => s.dataKey));

  const filteredData = useMemo(() => {
    return data.filter(point => {
      const pointDate = dayjs(point.date);
      return pointDate.isAfter(startDate) && pointDate.isBefore(endDate);
    });
  }, [data, startDate, endDate]);

  const processedData = useMemo(() => {
    if (processData) {
      return processData(filteredData);
    }
    return filteredData;
  }, [filteredData, processData]);

  const chartSeries = useMemo(() =>
      series
        .filter(s => activeSeries.includes(s.dataKey))
        .map(s => ({
          ...s,
          valueFormatter: yAxisFormatter,
        })),
    [series, activeSeries, yAxisFormatter]
  );

  const handleSeriesToggle = (dataKey: string) => {
    setActiveSeries(prev =>
      prev.includes(dataKey)
        ? prev.filter(k => k !== dataKey)
        : [...prev, dataKey]
    );
  };

  const ChartComponent = chartType === 'line' ? LineChart : BarChart;

  if (processedData.length === 0) {
    return <Typography>No historical data available</Typography>;
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{ p: 2, pb: 16 }}>
        <Box sx={{ height: 500, width: '100%' }}>
          <Typography variant="h6" gutterBottom>{title}</Typography>
          {showDatePicker && (
            <>
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
            </>
          )}
          <ChartComponent
            dataset={processedData}
            xAxis={[{
              dataKey: 'date',
              scaleType: 'time',
              valueFormatter: xAxisFormatter,
            }]}
            yAxis={[{
              label: yAxisLabel,
            }]}
            series={chartSeries}
            height={400}
            width={700}
          />
          {showLegend && (
            <FormGroup row sx={{ mt: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
              {series.map(({ dataKey, label }) => (
                <FormControlLabel
                  key={dataKey}
                  control={
                    <Checkbox
                      checked={activeSeries.includes(dataKey)}
                      onChange={() => handleSeriesToggle(dataKey)}
                      size="small"
                    />
                  }
                  label={label}
                />
              ))}
            </FormGroup>
          )}
          {extraContent}
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default HistoricalChart;