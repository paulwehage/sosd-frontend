import React, { FC, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Paper, Typography, Divider } from '@mui/material';
import dayjs from 'dayjs';
import useInfrastructureElement from '../hooks/operations/useInfrastructureElement.ts';
import useHistoricalData from '../hooks/historicalData/useHistoricalData.ts';
import LoadingCircle from '../components/LoadingCircle.tsx';
import KeyMetrics from '../components/infrastructureElements/KeyMetrics.tsx';
import OtherMetrics from '../components/infrastructureElements/OtherMetrics.tsx';
import {BarPlot} from '@mui/x-charts';

const InfrastructureElementPage: FC = () => {
  const { id, infraElementId } = useParams<{ id: string; infraElementId: string }>();
  const projectId = Number(id);
  const elementId = Number(infraElementId);

  const { data: elementData, loading: elementLoading, error: elementError } = useInfrastructureElement(elementId);

  const historicalDataParams = useMemo(() => ({
    type: 'infrastructureElement' as const,
    startDate: dayjs().subtract(30, 'day').startOf('day').toISOString(),
    endDate: dayjs().endOf('day').toISOString(),
    tags: elementData?.tags || [],
    serviceId: elementId
  }), [elementId, elementData?.tags]);

  const { data: historicalData, loading: historicalLoading, error: historicalError } = useHistoricalData(historicalDataParams);

  if (elementLoading || historicalLoading) return <LoadingCircle />;
  if (elementError || historicalError) return <Typography color="error">Error loading data</Typography>;
  if (!elementData) return <Typography>No data available</Typography>;

  const { name, type, category, cloudProvider, keyMetrics, metrics } = elementData;

  const chartData = historicalData.map(item => ({
    date: dayjs(item.date).format('MMM DD'),
    co2: item.total_co2_consumption
  }));

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>{name}</Typography>
      <Typography variant="subtitle1" gutterBottom>{`${type} - ${category} (${cloudProvider})`}</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <KeyMetrics metrics={keyMetrics} />
            <Divider sx={{ my: 2 }} />
            <OtherMetrics metrics={metrics} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <BarPlot data={chartData} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InfrastructureElementPage;