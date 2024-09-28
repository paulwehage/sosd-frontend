import React, { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Paper, Typography, Divider } from '@mui/material';
import dayjs from 'dayjs';
import useInfrastructureElement from '../../../hooks/operations/useInfrastructureElement.ts';
import useHistoricalData from '../../../hooks/historicalData/useHistoricalData.ts';
import LoadingCircle from '../../../components/LoadingCircle.tsx';
import KeyMetrics from '../../../components/infrastructureElements/KeyMetrics.tsx';
import OtherMetrics from '../../../components/infrastructureElements/OtherMetrics.tsx';
import InfrastructureElementHistoricalChart from '../../../components/infrastructureElements/InfrastrucureElementHistoricalChart.tsx';
import useProjectContext from '../../../hooks/context/useProjectContext.ts';

// Main component to display details and metrics for a specific infrastructure element
const InfrastructureElementPage: FC = () => {
  // Get the infrastructure element ID from the URL parameters
  const { elementId } = useParams<{ id: string, elementId: string }>();
  // Convert element ID to a number and memoize it
  const elementIdNumber = useMemo(() => Number(elementId), [elementId]);

  // Fetch details for the specific infrastructure element
  const { data: elementData, loading: elementLoading, error: elementError } = useInfrastructureElement(elementIdNumber);

  // Extract tags from the element data and memoize for efficiency
  const elementTags = useMemo(() => elementData?.tags || [], [elementData]);

  // Set breadcrumb information for navigation context based on element data
  const { setBreadcrumbInfo } = useProjectContext();
  useEffect(() => {
    if (elementData) {
      setBreadcrumbInfo({ elementName: elementData.name });
    }
    // Cleanup breadcrumb info when the component is unmounted or elementData changes
    return () => {
      setBreadcrumbInfo({ elementName: '' });
    };
  }, [elementData, setBreadcrumbInfo]);

  // Fetch historical data related to the infrastructure element
  const { data: historicalData, loading: historicalLoading, error: historicalError } = useHistoricalData({
    type: 'infrastructureElement' as const, // Specify the type as 'infrastructureElement'
    startDate: dayjs('2024-05-16').startOf('day').toISOString(), // Start date in ISO format
    endDate: dayjs('2024-07-25').endOf('day').toISOString(),     // End date in ISO format
    tags: elementTags, // Filter historical data by element tags
    serviceId: elementIdNumber // Use the element ID to filter data
  });

  // Display a loading spinner if either the element details or historical data is being fetched
  if (elementLoading || historicalLoading) return <LoadingCircle />;

  // Display error message if there was an error fetching the element details or historical data
  if (elementError || historicalError) return <Typography color="error">Error loading data</Typography>;

  // Display a message if no element data is available
  if (!elementData) return <Typography>No data available</Typography>;

  // Destructure necessary fields from the element data
  const { name, type, category, cloudProvider, keyMetrics, metrics } = elementData;

  // Format historical data for the chart, mapping each data point to a new structure
  const chartData = historicalData.map(item => ({
    date: dayjs(item.date).format('DD.MM.YY '), // Format date for display
    co2: item.total_co2_consumption // Extract CO2 consumption for the chart
  }));

  return (
    <Box sx={{ p: 3 }}>
      {/* Display name and type/category information for the infrastructure element */}
      <Typography variant="h4" gutterBottom>{name}</Typography>
      <Typography variant="subtitle1" gutterBottom>{`${type} - ${category} (${cloudProvider})`}</Typography>

      <Grid container spacing={3}>
        {/* Left Column: Key and other metrics */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            {/* Component to display key metrics of the infrastructure element */}
            <KeyMetrics metrics={keyMetrics} />
            {/* Divider between key metrics and other metrics */}
            <Divider sx={{ my: 2 }} />
            {/* Component to display other metrics */}
            <OtherMetrics metrics={metrics} />
          </Paper>
        </Grid>

        {/* Right Column: Historical data chart */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            {/* Component to render historical data chart */}
            <InfrastructureElementHistoricalChart data={chartData} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default InfrastructureElementPage;