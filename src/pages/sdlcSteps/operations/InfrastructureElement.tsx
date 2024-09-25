import React, {FC, useEffect, useMemo} from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Paper, Typography, Divider } from '@mui/material';
import dayjs from 'dayjs';
import useInfrastructureElement from '../../../hooks/operations/useInfrastructureElement.ts';
import useHistoricalData from '../../../hooks/historicalData/useHistoricalData.ts';
import LoadingCircle from '../../../components/LoadingCircle.tsx';
import KeyMetrics from '../../../components/infrastructureElements/KeyMetrics.tsx';
import OtherMetrics from '../../../components/infrastructureElements/OtherMetrics.tsx';
import InfrastructureElementHistoricalChart
  from '../../../components/infrastructureElements/InfrastrucureElementHistoricalChart.tsx';
import useProjectContext from '../../../hooks/context/useProjectContext.ts';

const InfrastructureElementPage: FC = () => {
  const { elementId } = useParams<{ id: string, elementId: string }>();
  const elementIdNumber = useMemo(() => Number(elementId), [elementId]);
  const { data: elementData, loading: elementLoading, error: elementError } = useInfrastructureElement(elementIdNumber);
  const elementTags = useMemo(() => elementData?.tags || [], [elementData]);
  const { setBreadcrumbInfo } = useProjectContext();

  useEffect(() => {
    if (elementData) {
      setBreadcrumbInfo({ elementName: elementData.name });
    }
    return () => {
      setBreadcrumbInfo({ elementName: '' });
    };
  }, [elementData, setBreadcrumbInfo]);

  const { data: historicalData, loading: historicalLoading, error: historicalError } =  useHistoricalData({
    type: 'infrastructureElement' as const,
    startDate: dayjs('2024-05-16').startOf('day').toISOString(),  // Start of day ISO format
    endDate: dayjs('2024-07-25').endOf('day').toISOString(),        // End of day ISO formatnpm run dev
    tags: elementTags,
    serviceId: elementIdNumber
  });
  
  if (elementLoading || historicalLoading) return <LoadingCircle />;
  if (elementError || historicalError) return <Typography color="error">Error loading data</Typography>;
  if (!elementData) return <Typography>No data available</Typography>;

  const { name, type, category, cloudProvider, keyMetrics, metrics } = elementData;

  const chartData = historicalData.map(item => ({
    date: dayjs(item.date).format('DD.MM.YY '),
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
            <InfrastructureElementHistoricalChart data={chartData} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InfrastructureElementPage;